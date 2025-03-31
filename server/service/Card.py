import importlib
import os
from pathlib import Path

import yaml

from server.model.CardData import CardData
from server.model.Game import CurrentSceneModel
from server.model.Player import Player, Target


class Card(CardData):
    def when_pick(self, current_scene_model: CurrentSceneModel):
        if "event" in self.tag:
            current_scene_model.player.event.append(self.id)
        if "deck" in self.tag:
            current_scene_model.player.deck.append(self.id)

    def when_play(
        self,
        player: Player,
        target: Target,
        deck: list[int],
        discard: list[int],
        hand: list[int],
        draw: list[int],
    ):
        played_card = player.hand.pop(hand[0])
        player.discard.append(played_card)
        target.life -= self.level_data[self.level].damage
        target.vulnerable += self.level_data[self.level].vulnerable
        for _ in range(self.level_data[self.level].draw):
            card = player.deck.pop(0)
            player.hand.append(card)
