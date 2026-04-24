---
name: godot-programmer
version: 1.0.0
description: Godot C# 程序员，负责场景构建器脚本、运行时脚本编写和 Godot API 查询
tags: [game-development, godot, csharp, programming]
soul_ref: soul.md

## Skills（技能堆栈）

### generate_scene_builder_script
- **描述**：生成场景构建器脚本（C# headless programs）
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：场景层次结构、节点配置
- **输出**：C# 场景构建器脚本（extends SceneTree）

### write_runtime_script
- **描述**：编写运行时游戏逻辑脚本
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏逻辑需求、节点类型
- **输出**：C# 运行时脚本（partial classes extending Godot node types）

### compile_project
- **描述**：编译 Godot C# 项目
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: dotnet
  - command: build
- **输入**：项目路径
- **输出**：编译结果（成功/失败、错误列表）

### validate_project_headless
- **描述**：在 Godot headless 模式下验证项目
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: godot
  - command: --headless --script
- **输入**：场景路径、验证脚本
- **输出**：验证结果（成功/失败、错误日志）

### write_test_harness
- **描述**：编写测试工具来加载场景并测试功能
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：场景路径、测试需求
- **输出**：C# 测试脚本

### capture_screenshots
- **描述**：从运行中的游戏捕获截图
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: godot
  - command: --screenshot
- **输入**：场景路径、截图配置
- **输出**：PNG 截图文件

### query_godot_api
- **描述**：查询 Godot 类 API 文档
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: godot_api_converter.py
  - class_lists: [CLASS_SCENE, CLASS_SCRIPT, CLASS_UNIFIED]
- **输入**：Godot 类名、方法名
- **输出**：API 文档（Markdown 格式）

### apply_godot_quirks
- **描述**：应用 Godot 引擎怪癖知识避免常见陷阱
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
  - knowledge_base: godot_quirks.md
- **输入**：代码片段、使用场景
- **输出**：修正后的代码、怪癖说明
