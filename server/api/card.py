from fastapi import APIRouter
from server.model.CardData import CardData, card_map

router = APIRouter()


@router.get("/card_map")
def get() -> dict[str, CardData]:
    return card_map
