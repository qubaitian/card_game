
from fastapi import APIRouter, Request
from pydantic import BaseModel
from nacl.public import PrivateKey
router = APIRouter()


class Keypair(BaseModel):
    public_key: str
    private_key: str


@router.get("/rename")
def get(request: Request) -> Keypair:
    public_key = request.state.public_key
    
    private_key = PrivateKey.generate()
    public_key = private_key.public_key
    return Keypair(public_key=public_key.encode().hex(), private_key=private_key.encode().hex())

