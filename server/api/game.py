from fastapi import APIRouter, Request
from server.model.Game import Game
from server.model.Player import Player
from server.model.Card import Card, card_map
from server.po.cache import game_cache

router = APIRouter()


@router.get("/STS/hero/list")
def hero_list() -> list[Card]:
    res = []
    res.append(card_map["sts"]["sts_Ironclad_101"])
    res.append(card_map["sts"]["sts_Silent_102"])
    res.append(card_map["sts"]["sts_Defect_103"])
    return res


@router.post("/card")
def card(request: Request) -> list[Card]:
    public_key = request.state.public_key
    room = game_cache[public_key]['room']
    if room == 'select_mode':
        return [card_map["sts"]["sts_Ironclad_101"]]
    return []


