from pydantic import BaseModel

from server.model.CardData import CardData
from server.model.Player import Player
from enum import Enum

class Event(Enum):
    BATTLE = 'battle'
    LOOT_ONE = 'loot_one'
    LOOT_ANY = 'loot_any'
    PATH = 'path'

class GameEvent(BaseModel):
    event: Event = Event.LOOT_ONE
    event_option_list: list[str] = []
    selected_option: int = 0  # Stores the option the player has chosen

class CurrentSceneModel(BaseModel):
    scene: str = 'ShowNeow'
    player: Player = Player()
    event: Event = Event.LOOT_ONE
    loot_card_list: list[CardData] = []
    game_event_list : list[GameEvent] = []
 
class ChooseModel(BaseModel):
    choose_id: int = 0
