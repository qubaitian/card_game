from server.model.Card import Card
from server.model.Game import CurrentSceneModel, Event
from server.model.Player import Player
from server.model.Color import Color

class Ironclad_1101(Card):
    def when_pick(self, current_scene_model: CurrentSceneModel):
        super().when_pick(current_scene_model)
        current_scene_model.player.color.append(Color.RED)
        current_scene_model.event = Event.PATH
        current_scene_model.path = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

class Silent_1102(Card):
    def when_pick(self, current_scene_model: CurrentSceneModel):
        super().when_pick(current_scene_model)
        current_scene_model.player.color.append(Color.GREEN)
        current_scene_model.event = Event.PATH
        current_scene_model.path = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

class Defect_1103(Card):
    def when_pick(self, current_scene_model: CurrentSceneModel):
        super().when_pick(current_scene_model)
        current_scene_model.player.color.append(Color.BLUE)
        current_scene_model.event = Event.PATH
        current_scene_model.path = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

class Watcher_1104(Card):
    def when_pick(self, current_scene_model: CurrentSceneModel):
        super().when_pick(current_scene_model)
        current_scene_model.player.color.append(Color.PURPLE)
        current_scene_model.event = Event.PATH
        current_scene_model.path = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
