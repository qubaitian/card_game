import importlib
from pathlib import Path


def import_all_cards():
    """Dynamically imports all Card_*.py files in the current directory"""
    current_dir = Path(__file__).parent  # Use file's directory instead of cwd
    for card_file in current_dir.glob("Card_*.py"):
        module_name = card_file.stem  # Gets filename without extension
        spec = importlib.util.spec_from_file_location(module_name, card_file)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        # Import all names from the module into global namespace
        for attr_name in dir(module):
            if not attr_name.startswith("_"):  # Skip private attributes
                globals()[attr_name] = getattr(module, attr_name)

import_all_cards()
