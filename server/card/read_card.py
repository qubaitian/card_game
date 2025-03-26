from dataclasses import dataclass
from typing import Optional
import yaml
import os
from pathlib import Path
from pydantic import BaseModel
import importlib.util

from model import Card, Player


def import_card_modules():
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
            if not attr_name.startswith('_'):  # Skip private attributes
                globals()[attr_name] = getattr(module, attr_name)


def read_all_cards():
    """
    Reads all card_*.yaml files in the current directory and returns a map of their contents.

    Returns:
        dict: A dictionary where keys are card types (from filename) and values are the parsed YAML content
    """
    # Import all Card_*.py files first
    import_card_modules()
    
    card_map = {}
    # Get current working directory and convert to Path object
    current_dir = Path(os.getcwd())
    # Find all files matching pattern card_*.yaml
    for yaml_file in current_dir.glob("Card_*.yaml"):
        # Read and parse YAML file
        with open(yaml_file, "r", encoding="utf-8") as f:
            try:
                card_data = yaml.safe_load(f)
                for card_id, card_info in card_data.items():
                    # Try to find specific card class (e.g., Card_101) or fallback to base Card
                    specific_card_class = globals().get(f"{card_id}", Card)
                    card_data = specific_card_class(**card_info)
                    card_map[card_id] = card_data
            except yaml.YAMLError as e:
                print(f"Error parsing {yaml_file}: {e}")

    return card_map

if __name__ == "__main__":
    card_map = read_all_cards()
    print(card_map["Ironclad_101"])
    player = Player()   
    card_map["Ironclad_101"].when_pick(player)
    print(player.deck)
