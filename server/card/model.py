from typing import Optional
from pydantic import BaseModel

class Player(BaseModel):
    deck: list[str] = []
    color: str = ""

class CardText(BaseModel):
    title: str
    content: str

class Card(BaseModel):
    tag: list[str]
    en: CardText
    zh: CardText
    data: Optional[list[str]] = None

    def when_pick(self, player: Player):
        pass
