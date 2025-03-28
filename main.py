from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import time
from nacl.public import PrivateKey, Box
import nacl
import base64

from server.api.keypair import router as keypair_router
from server.api.card import router as card_router
from server.api.hero import router as hero_router
from server.api.game import router as game_router

from server.po.db import ServerKey, User, session
from server.po.cache import game_cache

server_key = session.query(ServerKey).first()
if not server_key:
    private_key = "2ff44da770473f99a51f9413cadc0b369088422f15529566782d7dba00b523ce"
else:
    private_key = server_key.private_key
skserver = PrivateKey(bytes.fromhex(private_key))
pkserver = skserver.public_key

app = FastAPI()
app.version = "0.1.1"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserResponse(BaseModel):
    id: int
    public_key: str
    login_time: int

    class Config:
        from_attributes = True  # This enables ORM model parsing


@app.get("/users")
def get_users() -> list[UserResponse]:
    users = session.query(User).all()
    return users


class LoginRequest(BaseModel):
    private_key: str

class LoginResponse(BaseModel):
    access_token: str


@app.post("/login")
def login(request: LoginRequest) -> LoginResponse:
    global pkserver
    global skserver
    private_key = PrivateKey(bytes.fromhex(request.private_key))
    public_key = private_key.public_key

    box = Box(private_key, pkserver)

    login_time = int(time.time())
    message = str(login_time).encode()
    encrypted = box.encrypt(
        message
    )  # This includes nonce and other data needed for decryption

    access_token = (
        public_key.encode().hex() + "." + base64.b64encode(encrypted).decode()
    )  # Use base64 encoding

    # save to db
    user = User(public_key=public_key.encode().hex(), login_time=login_time)
    session.add(user)
    session.commit()

    game_cache[public_key.encode().hex()] = {
        'room': 'select_mode',
    }

    return {
        "access_token": access_token,
    }


async def verify_token_middleware(request: Request, call_next):
    if request.method == "OPTIONS":
        return JSONResponse(
            status_code=200,
            content={},
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
            },
        )

    # List of paths that don't require authentication
    public_paths = ["/login", "/keypair", "/users", "/docs", "/openapi.json"]
    if request.url.path in public_paths:
        return await call_next(request)

    token = request.headers.get("Authorization")
    print(token)
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")

    # Parse token from header
    token_parts = token.split(".")
    if len(token_parts) != 2:
        raise HTTPException(status_code=401, detail="Invalid token format")

    public_key, signature = token_parts

    # Decode the signature from base64 instead of hex
    signature_bytes = base64.b64decode(signature)

    # Convert bytes to PublicKey object
    client_public_key = nacl.public.PublicKey(bytes.fromhex(public_key))
    request.state.public_key = public_key
    server_box = Box(skserver, client_public_key)
    plaintext = server_box.decrypt(signature_bytes)
    print(plaintext)
    if (
        int(plaintext.decode())
        != session.query(User).filter(User.public_key == public_key).first().login_time
    ):
        raise HTTPException(status_code=401, detail="Invalid signature")

    return await call_next(request)


# Include the hero router
app.include_router(hero_router, prefix="/api/hero", tags=["hero"])
app.include_router(card_router, prefix="/card", tags=["card"])
app.include_router(game_router, prefix="/game", tags=["game"])
app.include_router(keypair_router, tags=["keypair"])
# app.middleware("http")(verify_token_middleware)

# Add exception handlers before running the app
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"code": exc.status_code, "message": exc.detail},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"code": 500, "message": "Internal server error", "detail": str(exc)},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
