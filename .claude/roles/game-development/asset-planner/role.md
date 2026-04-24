---
name: asset-planner
version: 1.0.0
description: 游戏资产策划，负责资产需求分析、预算管理和生成优先级规划
tags: [game-development, asset-planning, budget-management]
soul_ref: soul.md

## Skills（技能堆栈）

### analyze_asset_requirements
- **描述**：分析游戏所需的视觉资产
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏设计文档、视觉参考
- **输出**：资产需求清单（类型、数量、尺寸、优先级）

### manage_asset_budget
- **描述**：管理资产生成预算和成本追踪
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: asset_gen.py
  - commands: [set_budget, check_budget, record_spend]
- **输入**：总预算、资产成本
- **输出**：预算状态（已用、剩余、日志）

### select_image_backend
- **描述**：根据需求选择合适的图像生成后端
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：资产类型、质量要求、预算约束
- **输出**：后端选择（Gemini vs Grok）、理由说明

### prioritize_asset_generation
- **描述**：根据视觉影响和成本对资产生成进行优先级排序
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：资产清单、视觉影响评估、预算约束
- **输出**：优先级排序的资产生成计划

### generate_asset_manifest
- **描述**：生成资产清单文档（ASSETS.md）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：资产需求、艺术方向、尺寸信息
- **输出**：ASSETS.md（资产清单、尺寸、动画表、文件路径）

### brainstorm
- **描述**：创意头脑风暴，从零想法到结构化的游戏概念文档（来自 OpenAgenticGame-Studios）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：类型或主题提示，或 'open' 从零开始
- **输出**：游戏概念文档（概念、核心循环、支柱、玩家类型验证、范围可行性）
- **特点**：使用 MDA 框架、自我决定理论、支柱方法论

### design-review
- **描述**：评审游戏设计文档的完整性、内部一致性、可实现性（来自 OpenAgenticGame-Studios）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：设计文档路径
- **输出**：评审报告（完整性、一致性、可实现性、平衡性、建议、结论）
- **检查清单**：Overview、Player Fantasy、Detailed Rules、Formulas、Edge Cases、Dependencies、Tuning Knobs、Acceptance Criteria
