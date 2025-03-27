from typing import Optional
from pydantic import BaseModel
from enum import Enum


class Color(Enum):
    RED = "red"
    BLUE = "blue"
    GREEN = "green"
    YELLOW = "yellow"
    # 可以根据需要添加更多颜色


class Target(BaseModel):
    life: int = 0
    damage: int = 0
    vulnerable: int = 0


class Player(Target):
    event: list[str] = []
    deck: list[str] = []
    color: list[Color] = []


class CardText(BaseModel):
    title: str
    content: str


class CardData(BaseModel):
    damage: int
    vulnerable: int
    draw: int


class Card(BaseModel):
    id: str
    tag: list[str]
    en: CardText
    zh: CardText
    level: int = 0
    level_data: list[CardData] = []
    data: Optional[list[str]] = None

    def when_pick(self, player: Player):
        if "event" in self.tag:
            player.event.append(self.id)
        if "deck" in self.tag:
            player.deck.append(self.id)

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
