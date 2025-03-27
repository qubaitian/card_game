from pydantic import BaseModel


class Game(BaseModel):
    public_key: str
    mode: str
    next_scene: str
