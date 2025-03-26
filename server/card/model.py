from typing import Optional
from pydantic import BaseModel

class Player(BaseModel):
    event: list[str] = []
    deck: list[str] = []
    color: str = ""

class CardText(BaseModel):
    title: str
    content: str

class Card(BaseModel):
    id: str
    tag: list[str]
    en: CardText
    zh: CardText
    data: Optional[list[str]] = None

    def when_pick(self, player: Player):
        if 'event' in self.tag:
            player.event.append(self.id)
        if 'deck' in self.tag:
            player.deck.append(self.id)
