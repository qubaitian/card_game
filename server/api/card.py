from fastapi import APIRouter
from server.model.Player import Player
from server.model.Card import Card, card_map

router = APIRouter()

@router.get("/card_map")
def get() -> dict[str, dict[str, Card]]:
    print(card_map)
    return card_map
