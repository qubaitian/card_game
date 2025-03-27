from fastapi import APIRouter
from server.model.Player import Player
from server.model.Card import Card, card_map


router = APIRouter()


@router.post("/")
def card() -> dict[str, Card]:
    return card_map


if __name__ == "__main__":
    print(card_map["Ironclad_101"])
    player = Player()
    card_map["Ironclad_101"].when_pick(player)
    print(player)
