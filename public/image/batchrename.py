# public/image/sls/ui/map/bossOutline

import os

# 指定要处理的文件夹路径
folder_path = "sls/ui/map/bossOutline"

# 检查文件夹是否存在
if not os.path.exists(folder_path):
    print(f"文件夹 {folder_path} 不存在!")
    exit(1)

# 遍历文件夹中的所有文件
for filename in os.listdir(folder_path):
    # 检查是否为图片文件
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
        # 获取文件名和扩展名
        name, ext = os.path.splitext(filename)
        
        # 新文件名 = 原文件名 + "BossOutline" + 扩展名
        new_filename = name + "BossOutline" + ext
        
        # 构建完整的文件路径
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_filename)
        
        # 重命名文件
        os.rename(old_path, new_path)
        print(f"已重命名: {filename} -> {new_filename}")

print("重命名完成!")