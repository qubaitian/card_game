from model import Card, Player

class Ironclad_101(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
        player.color = "red"
        player.deck = (
            ["Strike_201"] * 16 +
            ["Defend_202"] * 12 +
            ["Bash_203"] * 2
        )

class Silent_102(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
        player.color = "green"
        player.deck = (
            ["Strike_301"] * 16 +
            ["Defend_302"] * 10 +
            ["Neutralize_303"] * 2 +
            ["Survivor_304"] * 2
        )

class Defect_103(Card):
    def when_pick(self, player: Player):
        super().when_pick(player)
        player.color = "gray"
        player.deck = (
            ["Strike_401"] * 12 +
            ["Defend_402"] * 12 +
            ["Dualcast_406"] * 2 +
            ["Zap_407"] * 2
        )