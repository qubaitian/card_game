import os
import json
from pathlib import Path


def generate_pack_json():
    # Path to the card directory (adjust if needed)
    card_dir = Path("public/assets/card")

    # Supported image extensions
    image_extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]

    # Dictionary to store card data
    pack_data = {
        "all": {
            "files": [
            ]
        }
    }

    # Check if directory exists
    if not card_dir.exists():
        print(f"Error: Directory {card_dir} not found.")
        return

    # Loop through all files in the card directory
    for file_path in sorted(card_dir.iterdir()):
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            # Get filename without extension as card ID
            card_id = file_path.stem

            # Create relative path from public directory
            relative_path = str(file_path.relative_to(Path("public")))

            # Add card info to pack
            card_info = {
                "type": "image",
                "key": card_id,
                "url": relative_path.replace("\\", "/"),
            }

            pack_data["all"]["files"].append(card_info)

    # Write to pack.json
    output_file = Path("public/assets/pack.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(pack_data, f, indent=2)

    print(f"Successfully created pack.json with {len(pack_data['all']['files'])} cards")


if __name__ == "__main__":
    generate_pack_json()
