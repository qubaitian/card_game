from dataclasses import dataclass
from typing import Optional
import yaml
import os
from pathlib import Path
from pydantic import BaseModel

class CardText(BaseModel):
    title: str
    content: str

class Card(BaseModel):
    tag: list[str]
    en: CardText
    zh: CardText
    data: Optional[list[str]] = None

def read_all_cards():
    """
    Reads all card_*.yaml files in the current directory and returns a map of their contents.

    Returns:
        dict: A dictionary where keys are card types (from filename) and values are the parsed YAML content
    """
    card_map = {}
    # Get current working directory and convert to Path object
    current_dir = Path(os.getcwd())

    # Find all files matching pattern card_*.yaml
    for yaml_file in current_dir.glob("card_*.yaml"):
        # Extract card type from filename (e.g., 'event' from 'card_event.yaml')
        card_type = yaml_file.stem.replace("card_", "")
        # Read and parse YAML file
        with open(yaml_file, "r", encoding="utf-8") as f:
            try:
                card_data = yaml.safe_load(f)
                for card_id, card_info in card_data.items():
                    card_map[card_info["en"]["title"] + "#" + str(card_id)] = Card(**card_info)
            except yaml.YAMLError as e:
                print(f"Error parsing {yaml_file}: {e}")

    return card_map

class Player:
    def __init__(self):
        self.deck = {}  # 存储卡牌的字典

def when_pick(card_id, player, card_pool):
    if card_id == "Ironclad#101":
        # 获取初始卡组列表
        initial_cards = card_pool[card_id]['data'][0]
        for base_card_id in initial_cards:
            # 使用当前deck长度作为新key
            player.deck[len(player.deck)] = Card(
                card_id=base_card_id,
                card_info=card_pool[base_card_id]
            )

if __name__ == "__main__":
    card_map = read_all_cards()
    print(card_map["Ironclad#101"])
    # player = Player()
    # when_pick("Ironclad#101", player, card_map)
    # # 打印玩家牌组中的所有卡牌
    # for i in range(len(player.deck)):
    #     print(f"Card {i}: {player.deck[i].card_info['en']['title']}")
