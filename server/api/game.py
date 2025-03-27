from fastapi import APIRouter, Request
from server.model.Game import Game
from server.model.Player import Player
from server.model.Card import Card, card_map

router = APIRouter()

@router.get("/STS/hero/list")
def hero_list() -> list[Card]:
    res = []
    res.append(card_map["sts"]["sts_Ironclad_101"])
    res.append(card_map["sts"]["sts_Silent_102"])
    res.append(card_map["sts"]["sts_Defect_103"])
    return res
