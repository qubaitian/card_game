from pydantic import BaseModel

from server.model.CardData import CardData
from server.model.Player import Player
from enum import Enum

class Event(Enum):
    BATTLE = 'battle'
    LOOT_ONE = 'loot_one'
    LOOT_ANY = 'loot_any'
    PATH = 'path'

class CurrentSceneModel(BaseModel):
    player: Player = None
    event: Event = Event.LOOT_ONE
    loot_card_list: list[CardData] = []

