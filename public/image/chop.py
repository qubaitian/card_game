import cv2
import numpy as np
import os
from pathlib import Path

def split_texture_atlas(atlas_path, output_dir, threshold=10):
    """
    将纹理图集按照空白区域分割成单独的图像
    
    参数:
        atlas_path: 纹理图集的路径
        output_dir: 保存分割结果的目录
        threshold: 用于区分空白和非空白区域的阈值
    """
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 读取图像
    atlas = cv2.imread(atlas_path, cv2.IMREAD_UNCHANGED)
    if atlas is None:
        print(f"无法读取图像: {atlas_path}")
        return
    
    # 检查图像是否有alpha通道，如果没有则添加
    if atlas.shape[2] == 3:
        atlas = cv2.cvtColor(atlas, cv2.COLOR_BGR2BGRA)
    
    # 提取alpha通道或创建二值化掩码
    if atlas.shape[2] == 4:
        # 使用alpha通道
        gray = atlas[:, :, 3]
    else:
        # 转换为灰度图，然后二值化
        gray = cv2.cvtColor(atlas, cv2.COLOR_BGR2GRAY)
    
    # 二值化图像以检测非空白区域
    _, binary = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
    
    # 查找轮廓
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # 文件名基础
    base_name = Path(atlas_path).stem
    
    # 提取每个轮廓对应的图像
    for i, contour in enumerate(contours):
        # 获取边界矩形
        x, y, w, h = cv2.boundingRect(contour)
        
        # 忽略太小的区域
        if w < 10 or h < 10:
            continue
        
        # 裁剪图像
        cropped = atlas[y:y+h, x:x+w]
        
        # 保存图像
        output_path = os.path.join(output_dir, f"{base_name}_{i}.png")
        cv2.imwrite(output_path, cropped)
        
        print(f"已保存: {output_path} (坐标: {x}, {y}, 大小: {w}x{h})")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="将纹理图集分割成单独的图像")
    parser.add_argument("atlas", help="纹理图集的路径")
    parser.add_argument("--output", "-o", default="output", help="输出目录")
    parser.add_argument("--threshold", "-t", type=int, default=10, help="二值化阈值")
    
    args = parser.parse_args()
    
    split_texture_atlas(args.atlas, args.output, args.threshold)
