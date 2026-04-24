---
name: technical-architect
version: 1.0.0
description: 游戏技术架构师，负责系统架构设计、场景层次结构和脚本职责划分
tags: [game-development, technical-architecture, godot]
soul_ref: soul.md

## Skills（技能堆栈）

### design_scene_hierarchy
- **描述**：设计游戏场景层次结构
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏功能需求、Godot 场景树知识
- **输出**：场景层次结构图、节点关系文档

### define_script_responsibilities
- **描述**：定义每个脚本的职责和接口
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：场景层次结构、功能需求
- **输出**：脚本职责文档（接口定义、职责描述）

### design_signal_flow
- **描述**：设计节点间的信号通信流
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：场景层次结构、交互需求
- **输出**：信号流图、信号连接文档

### configure_physics_layers
- **描述**：配置物理层和碰撞掩码
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏物理需求、碰撞对象类型
- **输出**：物理层配置文档

### design_input_mapping
- **描述**：设计输入映射和动作定义
- **实现渠道**：AI模型渠道
- **配置**：
  - provider: anthropropic
  - model: claude-3-opus
- **输入**：游戏控制需求、平台特性
- **输出**：输入映射配置（Input Map）

### generate_godot_project_skeleton
- **描述**：生成 Godot C# 项目骨架
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: dotnet
  - commands: [new, build]
- **输入**：项目配置、Godot 版本、.NET 版本
- **输出**：可编译的 Godot C# 项目（project.godot、.csproj、脚本存根）

### query_godot_api
- **描述**：查询 Godot 类 API 文档
- **实现渠道**：软件工具渠道
- **配置**：
  - tool: godot_api_converter.py
  - class_lists: [CLASS_SCENE, CLASS_SCRIPT, CLASS_UNIFIED]
- **输入**：Godot 类名、方法名
- **输出**：API 文档（Markdown 格式）
