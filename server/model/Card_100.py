from server.model.Card import Card
from server.model.Player import Player
from server.model.Color import Color

class Ironclad_101(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
        player.color.append(Color.RED)
        player.deck = (
            ["Strike_201"] * 16 +
            ["Defend_202"] * 12 +
            ["Bash_203"] * 2
        )

class Silent_102(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
        player.color.append(Color.GREEN)
        player.deck = (
            ["Strike_301"] * 16 +
            ["Defend_302"] * 10 +
            ["Neutralize_303"] * 2 +
            ["Survivor_304"] * 2
        )

class Defect_103(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
        player.color.append(Color.BLUE)
        player.deck = (
            ["Strike_401"] * 12 +
            ["Defend_402"] * 12 +
            ["Dualcast_406"] * 2 +
            ["Zap_407"] * 2
        )