from pydantic import BaseModel

from server.model.Color import Color

class Target(BaseModel):
    life: int = 0
    damage: int = 0
    vulnerable: int = 0

class Player(Target):
    username: str = ''
    event: list[str] = []
    deck: list[str] = []
    choice: list[str] = []
    color: list[Color] = []
