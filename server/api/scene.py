from fastapi import APIRouter, Request
from pydantic import BaseModel
from server.model.Game import CurrentSceneModel
from server.po.cache import game_cache
from server.model.CardData import card_map
from server.service.Card import Card

router = APIRouter()


@router.post("/current")
def current(request: Request) -> CurrentSceneModel:
    public_key = request.state.public_key
    game = game_cache[public_key]
    return game


class LootOneModel(BaseModel):
    loot_id: int


@router.post("/loot_one")
def loot_one(request: Request, loot_one_model: LootOneModel) -> CurrentSceneModel:
    public_key = request.state.public_key
    current_scene_model = game_cache[public_key]
    card_data = current_scene_model.loot_card_list[loot_one_model.loot_id]
    specific_card_class = globals().get(f"{card_data.id}", Card)
    card = specific_card_class(**card_data.model_dump())
    card.when_pick(current_scene_model)
    return current_scene_model


class LootAnyModel(BaseModel):
    loot_id_list: list[int]


@router.post("/loot_any")
def loot_any(request: Request, loot_any_model: LootAnyModel) -> CurrentSceneModel:
    public_key = request.state.public_key
    current_scene_model = game_cache[public_key]
    for loot_id in loot_any_model.loot_id_list:
        card_data = current_scene_model.loot_card_list[loot_id]
        card = card_map[card_data.id]
        card.when_pick(current_scene_model.player)
    return current_scene_model
