---
description: 工具配置 - 定义可用的工具和配置
---

# Harness - 工具配置

## 概述

Harness 定义了工作流中可用的工具和配置。它确保所有角色使用一致的工具集和配置。

## 可用工具

### 基础工具

- **Read** - 读取文件内容
- **Write** - 写入文件内容
- **Edit** - 编辑文件内容
- **Glob** - 文件模式匹配
- **Grep** - 文本搜索
- **Bash** - 命令行执行

### AI 模型

- **Claude Opus** - 高级创意和分析任务
- **Claude Sonnet** - 标准实现任务
- **GPT-4 Turbo** - 备用 AI 模型

### 软件工具

- **Python** - Python 脚本执行
- **Node.js** - JavaScript 执行
- **Bun** - 快速 JavaScript 运行时

### 工具渠道

- **Asset Generation Channel** - 资产生成（Gemini, Grok, Tripo3D）
- **Image Processing Channel** - 图像处理（背景移除、网格切片）
- **Godot API Channel** - Godot 引擎操作
- **Visual QA Channel** - 视觉质量保证

## 工具配置

### AI 模型配置

```yaml
default_model: claude-sonnet
creative_model: claude-opus
backup_model: gpt-4-turbo
```

### 工具渠道配置

```yaml
asset_generation:
  backends:
    - gemini
    - grok
    - tripo3d
  default_backend: gemini

image_processing:
  tools:
    - rembg_matting
    - grid_slice
    - find_loop_frame

godot_api:
  version: "4.x"
  language: "C#"

visual_qa:
  modes:
    - static
    - dynamic
    - question
  default_mode: static
```

## 工具使用规则

1. **优先使用默认模型**：除非任务需要高级创意能力，使用默认模型
2. **工具渠道选择**：根据任务需求选择合适的工具渠道
3. **成本意识**：在满足需求的前提下选择成本最低的方案
4. **性能考虑**：对于性能敏感任务，选择高性能工具

## 工具可用性检查

在使用工具前，检查工具是否可用：

- 检查工具是否已安装
- 检查工具版本是否符合要求
- 检查工具配置是否正确

## 工具错误处理

当工具执行失败时：

1. 记录错误信息
2. 尝试备用工具
3. 如果所有工具都失败，升级问题
