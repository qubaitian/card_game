import os
from pathlib import Path
import json

def find_png_files():
    """
    查找指定目录下的所有PNG文件
    
    参数:
        directory_path (str): 要搜索的目录路径
        
    返回:
        list: 包含所有PNG文件路径的列表
    """
    directory_path = os.path.dirname(os.path.abspath(__file__))
    png_files = []
    
    # 检查目录是否存在
    if not os.path.exists(directory_path):
        print(f"目录 '{directory_path}' 不存在")
        return png_files
    
    # 遍历目录及其子目录
    for root, _, files in os.walk(directory_path):
        for file in files:
            # 检查文件是否是PNG
            if file.lower().endswith('.png'):
                # 获取完整路径并添加到列表
                full_path = os.path.join(root, file)
                full_path = Path(full_path)  # Convert to Path object

                # Get filename without extension
                card_id = Path(file).stem

                # Create relative path from public directory
                relative_path = str(full_path.relative_to(Path("/Users/qubaitian/card_game_0314_1551/public")))

                # Add card info to pack
                card_info = {
                    "type": "image",
                    "key": card_id,
                    "url": relative_path.replace("\\", "/"),
                }
                png_files.append(card_info)
    png_files_list = png_files
        # 打印结果
    if png_files_list:
        print(f"找到 {len(png_files_list)} 个PNG文件:")
    else:
        print("未找到PNG文件")

    pack_data = {"all": {"files": png_files_list}}
    with open(f"{directory_path}/pack.json", "w", encoding="utf-8") as f:
        json.dump(pack_data, f, indent=2)


def delete_little_png_files():
    directory = os.path.dirname(os.path.abspath(__file__))
    png_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.png'):
                full_path = os.path.join(root, file)
                # 删除小于 1k 的文件
                if os.path.getsize(full_path) < 1024:
                    os.remove(full_path)
    


# 使用示例
if __name__ == "__main__":
    # 指定要搜索的目录路径，这里使用当前脚本所在目录

    # 查找所有PNG文件
    find_png_files()
    # delete_little_png_files()
