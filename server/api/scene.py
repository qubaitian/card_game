from fastapi import APIRouter, Request
from server.model.Game import CurrentSceneModel
from server.po.cache import game_cache
router = APIRouter()

@router.post("/current")
def current(request: Request) -> CurrentSceneModel:
    public_key = request.state.public_key
    game = game_cache[public_key]
    print(game)
    return game

@router.post("/loot_one")
def loot_one(request: Request, loot_id: int) -> CurrentSceneModel:
    public_key = request.state.public_key
    current_scene_model = game_cache[public_key]
    current_scene_model.loot_card_list[loot_id].when_pick(current_scene_model.player)
    return current_scene_model

@router.post("/loot_any")
def loot_any(request: Request, loot_id_list: list[int]) -> CurrentSceneModel:
    public_key = request.state.public_key
    current_scene_model = game_cache[public_key]
    for loot_id in loot_id_list:
        current_scene_model.loot_card_list[loot_id].when_pick(current_scene_model.player)
    return current_scene_model
