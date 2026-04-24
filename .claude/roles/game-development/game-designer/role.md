---
name: game-designer
version: 1.0.0
description: 游戏策划，负责游戏机制设计、关卡进度设计和用户体验设计
tags: [game-development, game-design, game-mechanics]
soul_ref: soul.md

## Skills（技能堆栈）

### design_game_mechanics
- **描述**：设计游戏核心机制和玩法系统
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏概念、目标受众、平台特性
- **输出**：机制设计文档（核心机制、次要机制、交互方式）

### design_level_progression
- **描述**：设计关卡进度和难度曲线
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏机制、目标游戏时长
- **输出**：关卡设计文档（关卡列表、难度曲线、解锁条件）

### balance_gameplay
- **描述**：平衡游戏数值和难度
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏机制、数值系统、测试数据
- **输出**：平衡性报告（数值调整建议、难度曲线优化）

### design_user_experience
- **描述**：设计用户体验流程和界面
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏机制、目标用户
- **输出**：UX 设计文档（用户流程、界面布局、反馈机制）

### create_game_design_document
- **描述**：创建完整的游戏设计文档（GDD）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏概念、机制设计、关卡设计、UX 设计
- **输出**：游戏设计文档（GDD）
