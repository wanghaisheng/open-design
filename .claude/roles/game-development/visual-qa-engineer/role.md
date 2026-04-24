---
name: visual-qa-engineer
version: 1.0.0
description: 视觉 QA 工程师，负责视觉质量保证、多模态视觉分析和缺陷检测
tags: [game-development, visual-qa, quality-assurance]
soul_ref: soul.md

## Skills（技能堆栈）

### visual_quality_assurance_static
- **描述**：静态模式视觉 QA（参考图 + 单个游戏截图）
- **实现渠道**：AI模型渠道 + 软件工具渠道
- **配置**：
  - ai_model: gemini-3-flash-preview / claude-vision
  - tool: visual_qa.py
  - mode: static
- **输入**：参考图像、游戏截图、任务上下文
- **输出**：QA 报告（视觉缺陷、渲染错误、实现捷径）

### visual_quality_assurance_dynamic
- **描述**：动态模式视觉 QA（参考图 + 帧序列 2 FPS）
- **实现渠道**：AI模型渠道 + 软件工具渠道
- **配置**：
  - ai_model: gemini-3-flash-preview / claude-vision
  - tool: visual_qa.py
  - mode: dynamic
  - frame_rate: 2 FPS
- **输入**：参考图像、帧序列、任务上下文
- **输出**：QA 报告（运动异常、物理问题、时序一致性）

### visual_quality_assurance_question
- **描述**：问题模式视觉 QA（自由提问 + 任意数量截图）
- **实现渠道**：AI模型渠道 + 软件工具渠道
- **配置**：
  - ai_model: gemini-3-flash-preview / claude-vision
  - tool: visual_qa.py
  - mode: question
- **输入**：问题、截图（单张或多张）
- **输出**：问题回答、问题定位、修复建议

### detect_visual_defects
- **描述**：检测视觉缺陷（z-fighting、纹理拉伸、裁剪、悬浮物体）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏截图
- **输出**：缺陷列表、位置标记、严重程度

### detect_rendering_bugs
- **描述**：检测渲染错误（缺失纹理、剔除错误、光照泄漏）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏截图
- **输出**：渲染错误列表、技术原因、修复建议

### detect_motion_anomalies
- **描述**：检测运动异常（卡顿实体、抖动、滑动动画、物理爆炸）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：帧序列
- **输出**：运动异常列表、帧位置、原因分析
