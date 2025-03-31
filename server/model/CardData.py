import os
from pathlib import Path
from pydantic import BaseModel
from typing import Optional

import yaml


class CardText(BaseModel):
    title: str
    content: str


class LevelData(BaseModel):
    damage: int = 0
    vulnerable: int = 0
    draw: int = 0


class CardData(BaseModel):
    id: str
    tag: list[str]
    text: dict[str, CardText]
    level: int = 0
    level_data: list[LevelData] = []
    data: Optional[list[str]] = None

def read_all_cards() -> dict[str, CardData]:
    card_map = {}
    current_dir = Path(os.getcwd())
    current_dir = current_dir / "card"

    for yaml_file in current_dir.glob("*.yaml"):
        with open(yaml_file, "r", encoding="utf-8") as f:
            card_data = yaml.safe_load(f)
            for card_id, card_info in card_data.items():
                card_data = CardData(**card_info)
                card_map[card_id] = card_data
    return card_map


card_map = read_all_cards()