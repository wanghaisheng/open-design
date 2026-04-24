---
name: technical-artist
version: 1.0.0
description: 游戏技术美术，负责图像处理、3D资产生成和动画处理
tags: [game-development, technical-art, asset-generation]
soul_ref: soul.md

## Skills（技能堆栈）

### generate_image_asset
- **描述**：生成游戏图像资产
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: asset_gen.py
  - commands: [image]
  - backends: [gemini, grok]
  - costs: {gemini: "5-15¢", grok: "2¢"}
- **输入**：提示词、尺寸、宽高比、参考图像（可选）
- **输出**：PNG 图像文件

### generate_animated_sprite
- **描述**：生成动画精灵（视频生成 + 帧提取 + 循环检测）
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: asset_gen.py + find_loop_frame.py
  - commands: [video, find_loop_frame]
  - cost: "5¢/sec"
- **输入**：参考图像、动画描述、时长
- **输出**：PNG 帧序列、循环点信息

### convert_image_to_3d_model
- **描述**：将图像转换为 3D 模型
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: asset_gen.py + tripo3d.py
  - commands: [glb]
  - costs: {default: "30¢", hd: "60¢"}
- **输入**：PNG 图像、质量预设、面数限制
- **输出**：GLB 3D 模型文件

### rig_character_model
- **描述**：为角色模型添加双足骨骼绑定
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: asset_gen.py + tripo3d.py
  - commands: [rig]
  - cost: "+25¢"
- **输入**：PNG 角色图像、质量预设
- **输出**：绑定的 GLB 模型文件

### retarget_animation
- **描述**：将预设动画重定向到绑定模型
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: asset_gen.py + tripo3d.py
  - commands: [retarget]
  - cost: "10¢"
- **输入**：绑定的 GLB 模型、动画预设（preset:biped:*）
- **输出**：带动画的 GLB 文件

### remove_background
- **描述**：移除图像背景（BiRefNet 软遮罩 + 颜色抠图）
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: rembg_matting.py
  - modes: [trust, adapt, color]
  - gpu_acceleration: true
- **输入**：PNG 图像、模式选择
- **输出**：带透明通道的 PNG 图像

### slice_grid_assets
- **描述**：将网格图像切片为独立资产
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: grid_slice.py
  - grid_layouts: [2x2, 3x3, 2x4]
- **输入**：网格图像、网格布局、命名规则
- **输出**：独立的 PNG 文件

### detect_video_loop_point
- **描述**：检测视频的最佳循环帧
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: find_loop_frame.py
  - algorithm: "7-frame window similarity"
- **输入**：帧序列目录
- **输出**：循环帧索引、相似度分数
