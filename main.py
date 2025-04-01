from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import time
from nacl.public import PrivateKey, Box
import nacl
import base64

from server.api.keypair import router as keypair_router
from server.api.card import router as card_router
from server.api.scene import router as scene_router

from server.model.Player import Player
from server.model.Game import CurrentSceneModel, Event
from server.po.db import ServerKey, User, session
from server.po.cache import game_cache
from server.model.CardData import card_map
from server.service.import_all_card import import_all_cards
from server.api.websocket_manager import manager

import_all_cards()

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


# Add exception handlers before running the app
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    print(exc.__traceback__)
    print("hello")
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    }
    # 首先检查是否为 HTTPException
    # if isinstance(exc, HTTPException):
    #     return JSONResponse(
    #         headers=headers,
    #         status_code=exc.status_code,
    #         content={"code": exc.status_code, "message": exc.detail},
    #     )
    # 处理其他所有异常
    return JSONResponse(
        headers=headers,
        status_code=500,
        content={"code": 500, "message": "Internal server error", "detail": str(exc)},
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
    public_key: str


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

    if public_key.encode().hex() not in game_cache:
        game_cache[public_key.encode().hex()] = CurrentSceneModel(
            player=Player(public_key=public_key.encode().hex())
        )

    game_cache[public_key.encode().hex()].event = Event.LOOT_ONE
    game_cache[public_key.encode().hex()].loot_card_list = [
        card_map["Continue_1001"],
        card_map["STS_1002"],
        card_map["PVP_1003"],
    ]

    # print(game_cache)
    return LoginResponse(
        access_token=access_token,
        public_key=public_key.encode().hex(),
    )


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast the message to all connected clients
            await manager.broadcast(f"Client #{client_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")


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

    return await call_next(request)


# Include the hero router
app.include_router(card_router, prefix="/card", tags=["card"])
app.include_router(scene_router, prefix="/scene", tags=["scene"])
app.include_router(keypair_router, tags=["keypair"])
app.middleware("http")(verify_token_middleware)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
