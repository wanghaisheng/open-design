---
name: project-manager
version: 1.0.0
description: 游戏项目经理，负责管道编排、进度沟通和元决策
tags: [game-development, project-management, orchestration]
soul_ref: soul.md

## Skills（技能堆栈）

### orchestrate_pipeline
- **描述**：编排整个游戏开发管道
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：项目需求、角色配置
- **输出**：管道执行计划、阶段顺序

### handle_resume_logic
- **描述**：处理恢复逻辑（从断点续传）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：当前状态文件（PLAN.md、STRUCTURE.md、MEMORY.md、ASSETS.md）
- **输出**：恢复点、跳过阶段、继续阶段

### communicate_progress
- **描述**：向用户沟通进度（Telegram/Slack/其他服务）
- **实现渠道**：软件工具渠道
- **配置**：
  - tools: [telegram-api, slack-api, webhook]
- **输入**：进度信息、截图、QA 结果
- **输出**：进度通知发送

### make_meta_decisions
- **描述**：做出元决策（何时重新规划、何时重新脚手架、何时重新生成资产）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：当前进度、QA 结果、错误日志
- **输出**：元决策（继续/回滚/重新规划）

### manage_context_hygiene
- **描述**：管理上下文卫生（文件状态持久化）
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: file-system
- **输入**：状态数据
- **输出**：文件写入（PLAN.md、STRUCTURE.md、MEMORY.md、ASSETS.md）

### generate_demo_video
- **描述**：生成游戏演示视频（~30秒电影级 MP4）
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: ffmpeg
  - duration: ~30s
- **输入**：游戏录制、剪辑脚本
- **输出**：MP4 演示视频
