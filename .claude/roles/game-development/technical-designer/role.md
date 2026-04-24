---
name: technical-designer
version: 1.0.0
description: 游戏技术策划，负责技术风险评估、任务分解和验证标准定义
tags: [game-development, technical-design, risk-assessment]
soul_ref: soul.md

## Skills（技能堆栈）

### assess_implementation_risks
- **描述**：评估游戏功能的技术实现风险
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏功能描述、技术栈信息
- **输出**：风险评估报告（高风险任务列表、风险等级、缓解策略）

### define_verification_criteria
- **描述**：为每个任务定义明确的验证标准
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：任务描述、技术要求
- **输出**：验证标准文档（成功指标、失败条件、测试方法）

### create_task_plan
- **描述**：创建任务执行计划（PLAN.md）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：风险评估、功能需求
- **输出**：PLAN.md（风险任务 vs 主构建、执行顺序、依赖关系）

### prioritize_tasks
- **描述**：根据风险和依赖关系对任务进行优先级排序
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：任务列表、风险评估、依赖关系
- **输出**：优先级排序的任务列表
