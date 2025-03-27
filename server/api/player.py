from fastapi import APIRouter
from pydantic import BaseModel

from server.model.model import Player

player_router = APIRouter()


@player_router.post("/player")
def get() -> Player:
    
    return Player()