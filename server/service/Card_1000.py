from server.service.Card import Card
from server.model.Game import Event, CurrentSceneModel
from server.model.Player import Player
from server.model.CardData import card_map

class Slay_the_Spire_1002(Card):
    def when_pick(self, current_scene_model: CurrentSceneModel):
        current_scene_model.event = Event.LOOT_ONE
        current_scene_model.loot_card_list = [card_map['Ironclad_1101'], card_map['Silent_1102'], card_map['Defect_1103'], card_map['Watcher_1104']]

class PVP_1003(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
    
    