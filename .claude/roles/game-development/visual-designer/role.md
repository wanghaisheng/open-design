---
name: visual-designer
version: 1.0.0
description: 游戏视觉设计师，负责视觉概念设计、艺术方向设定和视觉风格一致性把控
tags: [game-development, visual-design, art-direction]
soul_ref: soul.md

## Skills（技能堆栈）

### generate_visual_reference
- **描述**：生成游戏视觉参考图像
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic/google/xai
  - model: claude-3-opus/gemini-3.1-flash/grok-imagine-image
  - cost: 5-15 cents (Gemini) / 2 cents (Grok)
- **输入**：游戏概念描述、艺术风格偏好
- **输出**：PNG 参考图像

### design_art_direction
- **描述**：设计整体艺术方向和视觉风格指南
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏类型、目标受众、视觉参考
- **输出**：艺术方向文档（色彩方案、风格指南）

### maintain_visual_consistency
- **描述**：确保所有视觉资产符合统一的视觉风格
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：视觉参考、新生成的资产
- **输出**：一致性评估报告、修改建议
