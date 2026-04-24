---
name: system-architect
version: 1.0.0
description: 系统架构师，负责技术架构设计、技术栈选择和集成规划
tags: [game-development, system-architecture, tech-stack]
soul_ref: soul.md

## Skills（技能堆栈）

### design_technical_architecture
- **描述**：设计整体技术架构
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：项目需求、技术约束
- **输出**：技术架构文档（模块划分、接口定义、数据流）

### select_tech_stack
- **描述**：选择合适的技术栈
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：项目需求、技术选项
- **输出**：技术栈选择文档（引擎、语言、框架、第三方服务）

### design_integration_points
- **描述**：设计系统集成点
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：系统架构、第三方服务
- **输出**：集成设计文档（API 接口、数据格式、错误处理）

### plan_scalability
- **描述**：规划系统扩展性
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：当前架构、未来需求
- **输出**：扩展性规划文档（扩展点、预留接口、性能优化）
