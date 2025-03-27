import importlib
import os
from pathlib import Path
from pydantic import BaseModel
from typing import Optional

import yaml

from server.model.Player import Player, Target


class CardText(BaseModel):
    title: str
    content: str


class CardData(BaseModel):
    damage: int = 0
    vulnerable: int = 0
    draw: int = 0


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

def read_all_cards():
    """
    Reads all card_*.yaml files in the current directory and returns a map of their contents.

    Returns:
        dict: A dictionary where keys are card types (from filename) and values are the parsed YAML content
    """
    # Import all Card_*.py files first
    """Dynamically imports all Card_*.py files in the current directory"""
    current_dir = Path(__file__).parent  # Use file's directory instead of cwd
    for card_file in current_dir.glob("Card_*.py"):
        print(card_file)
        module_name = card_file.stem  # Gets filename without extension
        spec = importlib.util.spec_from_file_location(module_name, card_file)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        # Import all names from the module into global namespace
        for attr_name in dir(module):
            if not attr_name.startswith("_"):  # Skip private attributes
                globals()[attr_name] = getattr(module, attr_name)

    card_map = {}
    # Get current working directory and convert to Path object
    current_dir = Path(os.getcwd())
    current_dir = current_dir / "card"
    for folder in current_dir.iterdir():
        if folder.is_dir():
            card_map[folder.stem] = {}
            for yaml_file in folder.glob("*.yaml"):
                with open(yaml_file, "r", encoding="utf-8") as f:
                    card_data = yaml.safe_load(f)
                    for card_id, card_info in card_data.items():
                        specific_card_class = globals().get(f"{card_id}", Card)
                        card_data = specific_card_class(**card_info)
                        card_map[folder.stem][card_id] = card_data
    return card_map


card_map = read_all_cards()