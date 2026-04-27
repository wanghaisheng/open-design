---
description: 从一句话需求到游戏任务完成的RAMS Game角色召集与执行指南，说明如何使用RAMS Game的skills和roles通过RAMS框架召集角色、选择演员、创建实例、完成任务
---

# 从一句话需求到游戏任务完成：RAMS Game角色召集与执行指南

本文档说明如何从一句话需求开始，使用RAMS Game的skills和roles，通过RAMS框架召集角色、选择演员、创建实例、完成任务。

---

## 概述

### 核心概念

RAMS Game采用RAMS（Role-Actor Marketplace System）框架，将AI能力组织为：

- **角色（Role）**：40-50个游戏开发专业角色
- **技能（Skills）**：游戏开发专业技能（101个技能）
- **演员（Actor）**：具体的LLM模型（GPT-4, Claude等）
- **实例（Instance）**：角色 + 演员的具体实例

### 工作流程概览

```
一句话需求
    ↓
七阶段管道编排（pipeline-orchestration）
    ↓
Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration
    ↓
多角色协作执行
    ↓
Git-like版本控制
    ↓
任务完成
```

---

## 完整流程详解

### 阶段1：需求分析

#### 输入
一句话需求，例如：
- "设计一个2D平台跳跃游戏"
- "创建一个RPG游戏的战斗系统"
- "生成一个游戏角色资产"

#### 执行：pipeline-orchestration

**Skill**：`pipeline-orchestration`

**作用**：分析需求，规划七阶段管道，定义阶段输出

**执行方式**：
```
调用skill: pipeline-orchestration
参数: 
  - 需求描述: "设计一个2D平台跳跃游戏"
  - 管道阶段: Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration
  - 阶段分离: concept-validation / production
```

**输出**：
- 管道计划
- 阶段划分
- 角色分配
- 停止条件

---

### 阶段2：Visual Target（视觉目标）

#### 执行：generate_visual_reference

**Skill**：`generate_visual_reference`

**角色**：Visual Designer, Art Director

**作用**：生成视觉参考图像，定义艺术方向

**执行方式**：
```
调用skill: generate_visual_reference
参数:
  - 游戏类型: 2D平台跳跃
  - 视觉风格: 像素艺术
  - 参考图像: [可选]
```

**输出**：
- 视觉参考图像
- 艺术方向定义
- 视觉锚点设定

---

### 阶段3：Decomposition（分解）

#### 执行：assess_implementation_risks

**Skill**：`assess_implementation_risks`

**角色**：Technical Designer, System Architect

**作用**：评估技术风险，识别风险任务

**执行方式**：
```
调用skill: assess_implementation_risks
参数:
  - 玩法机制: 平台跳跃机制
  - 技术约束: Godot 4.x
  - 平台要求: PC
```

**输出**：
- 风险任务识别
- 实现难度分析
- 验证标准定义

#### 执行：create_task_plan

**Skill**：`create_task_plan`

**角色**：Technical Designer

**作用**：创建任务计划，分解任务

**执行方式**：
```
调用skill: create_task_plan
参数:
  - 风险任务: [从风险评估提取]
  - 主构建任务: [常规功能]
  - 时间预算: [从阶段分离提取]
```

**输出**：
- PLAN.md（风险任务 vs 主构建任务）
- 任务优先级排序
- 任务依赖关系

---

### 阶段4：Architecture（架构）

#### 执行：design_scene_hierarchy

**Skill**：`design_scene_hierarchy`

**角色**：Technical Architect, Godot Programmer

**作用**：设计场景层次结构

**执行方式**：
```
调用skill: design_scene_hierarchy
参数:
  - 游戏世界: [从需求提取]
  - 场景类型: [从需求提取]
  - 简化模式: [从阶段分离提取]
```

**输出**：
- 场景层次结构设计
- 脚本职责划分
- 信号流设计

#### 执行：generate_godot_project_skeleton

**Skill**：`generate_godot_project_skeleton`

**角色**：Technical Architect

**作用**：生成Godot项目骨架

**执行方式**：
```
调用skill: generate_godot_project_skeleton
参数:
  - 架构蓝图: [从design_scene_hierarchy提取]
  - 版本配置: Godot 4.x / .NET 8
```

**输出**：
- Godot项目骨架
- 版本敏感字段配置
- STRUCTURE.md（完整架构蓝图）

---

### 阶段5：Asset Generation（资产生成）

#### 执行：manage_asset_budget

**Skill**：`manage_asset_budget`

**角色**：Asset Planner

**作用**：管理资产预算

**执行方式**：
```
调用skill: manage_asset_budget
参数:
  - 资产需求: [从需求提取]
  - 预算限制: [从项目预算提取]
  - 成本优化: true
```

**输出**：
- 预算报告
- 成本优化建议

#### 执行：generate_image_asset

**Skill**：`generate_image_asset`

**角色**：Technical Artist

**作用**：生成图像资产

**执行方式**：
```
调用skill: generate_image_asset
参数:
  - 资产类型: 角色、场景、UI
  - 质量预设: default / hd
  - 后端选择: Gemini / Grok
```

**输出**：
- 图像资产文件
- 资产元数据

#### 执行：convert_image_to_3d_model

**Skill**：`convert_image_to_3d_model`

**角色**：Technical Artist

**作用**：将图像转换为3D模型

**执行方式**：
```
调用skill: convert_image_to_3d_model
参数:
  - 图像资产: [从generate_image_asset提取]
  - 质量预设: default / hd
  - 面数限制: [可选]
```

**输出**：
- 3D模型文件
- 模型元数据

#### 执行：rig_character_model

**Skill**：`rig_character_model`

**角色**：Technical Artist

**作用**：为角色模型绑定骨骼

**执行方式**：
```
调用skill: rig_character_model
参数:
  - 3D模型: [从convert_image_to_3d_model提取]
  - rigging类型: biped / quadruped
  - 质量预设: +25¢
```

**输出**：
- 绑定后的角色模型
- 动画准备状态

**输出文档**：
- ASSETS.md（资产清单 + 尺寸 + 动画表）

---

### 阶段6：Task Execution（任务执行）

#### 执行：generate_scene_builder_script

**Skill**：`generate_scene_builder_script`

**角色**：Godot Programmer

**作用**：生成场景构建器脚本

**执行方式**：
```
调用skill: generate_scene_builder_script
参数:
  - 架构蓝图: [从STRUCTURE.md提取]
  - 资产清单: [从ASSETS.md提取]
  - 代码质量: relaxed / strict
```

**输出**：
- 场景构建器脚本（C# headless programs）
- 场景构建配置

#### 执行：write_runtime_script

**Skill**：`write_runtime_script`

**角色**：Godot Programmer

**作用**：编写运行时脚本

**执行方式**：
```
调用skill: write_runtime_script
参数:
  - 游戏机制: [从需求提取]
  - 平台要求: [从需求提取]
  - 代码质量: relaxed / strict
```

**输出**：
- 运行时脚本（partial classes extending Godot node types）
- 脚本文档

#### 执行：compile_project

**Skill**：`compile_project`

**角色**：Godot Programmer

**作用**：编译项目

**执行方式**：
```
调用skill: compile_project
参数:
  - 项目配置: [从架构提取]
  - 优化级别: debug / release
```

**输出**：
- 编译后的游戏构建
- 编译日志

---

### 阶段7：Visual Quality Assurance（视觉质量保证）

#### 执行：visual_quality_assurance_static

**Skill**：`visual_quality_assurance_static`

**角色**：Visual QA Engineer

**作用**：静态视觉质量保证

**执行方式**：
```
调用skill: visual_quality_assurance_static
参数:
  - 参考图像: [从Visual Target提取]
  - 游戏截图: [从游戏构建捕获]
  - QA模式: 静态模式
  - 后端: Gemini Flash / Claude Native
```

**输出**：
- 视觉对比分析
- 视觉缺陷检测
- 修复建议

#### 执行：visual_quality_assurance_dynamic

**Skill**：`visual_quality_assurance_dynamic`

**角色**：Visual QA Engineer

**作用**：动态视觉质量保证

**执行方式**：
```
调用skill: visual_quality_assurance_dynamic
参数:
  - 参考图像: [从Visual Target提取]
  - 帧序列: [从游戏构建捕获，2 FPS采样]
  - QA模式: 动态模式
  - 后端: Gemini Flash / Claude Native
```

**输出**：
- 运动异常检测
- 动画质量评估
- 修复建议

#### 执行：visual_quality_assurance_question

**Skill**：`visual_quality_assurance_question`

**角色**：Visual QA Engineer

**作用**：自由提问模式QA

**执行方式**：
```
调用skill: visual_quality_assurance_question
参数:
  - 问题: [自由提问]
  - 游戏截图: [任意数量]
  - QA模式: 问题模式
  - 后端: Gemini Flash / Claude Native
```

**输出**：
- 问题回答
- 详细分析
- 修复建议

---

### 阶段8：Orchestration（编排）

#### 执行：orchestrate_pipeline

**Skill**：`orchestrate_pipeline`

**角色**：Project Manager

**作用**：编排管道序列

**执行方式**：
```
调用skill: orchestrate_pipeline
参数:
  - 管道计划: [从pipeline-orchestration提取]
  - 当前阶段: [当前执行阶段]
  - 上下文状态: [文件状态持久化]
```

**输出**：
- 管道进度报告
- 下一阶段决策

#### 执行：handle_resume_logic

**Skill**：`handle_resume_logic`

**角色**：Project Manager

**作用**：处理恢复逻辑

**执行方式**：
```
调用skill: handle_resume_logic
参数:
  - 文件状态: [PLAN.md, STRUCTURE.md, MEMORY.md, ASSETS.md]
  - 当前进度: [从执行历史提取]
```

**输出**：
- 恢复决策
- 跳过阶段决策

#### 执行：communicate_progress

**Skill**：`communicate_progress`

**角色**：Project Manager

**作用**：通信进度

**执行方式**：
```
调用skill: communicate_progress
参数:
  - 进度信息: [从管道进度提取]
  - 通信渠道: Telegram / Slack
```

**输出**：
- 进度通知
- 状态更新

---

## 角色实例化与演员选择

### 角色定义

RAMS Game有40-50个游戏开发专业角色，按团队组织：

**Leadership Team（领导团队）**
- Creative Director, Technical Director, Producer, Art Director, Audio Director, Narrative Director

**Design Team（设计团队）**
- Game Designer, Systems Designer, Level Designer, Economy Designer, Writer, Core Loop Designer, World Builder, Live Ops Designer

**Programming Team（编程团队）**
- Lead Programmer, Engine Programmer, Gameplay Programmer, Backend Programmer, Network Programmer, UI Programmer

**Art Team（美术团队）**
- Concept Artist, Environment Artist, Character Artist, UI Designer, VFX Artist, Technical Artist

**QA Team（质量保证团队）**
- QA Lead, QA Tester, Automation Engineer, Visual QA Engineer

**Production Team（制作团队）**
- Release Manager, Localization Lead, Community Manager, DevOps Engineer, Analytics Engineer, Security Engineer, Prototyper

**Publish Team（发布团队）**
- Platform Certification Specialist, Platform Relationship Manager, Release Coordinator, Store Page Optimizer, Store Submission Specialist

### 角色定义示例

#### Visual Designer

```yaml
role_id: "visual-designer"
soul: |
  你是一名专业视觉设计师，负责游戏视觉概念设计和艺术方向设定。
  
  核心职责：
  1. 生成视觉参考图像
  2. 定义艺术方向
  3. 维护视觉一致性
  4. 成本意识（选择合适的图像后端）

skills:
  - generate_visual_reference
  - design_art_direction
  - maintain_visual_consistency
```

#### Godot Programmer

```yaml
role_id: "godot-programmer"
soul: |
  你是一名专业Godot程序员，负责游戏功能实现和技术支持。
  
  核心职责：
  1. 生成场景构建器脚本
  2. 编写运行时脚本
  3. 编译和验证项目
  4. 应用Godot引擎怪癖知识

skills:
  - generate_scene_builder_script
  - write_runtime_script
  - compile_project
  - validate_project_headless
  - query_godot_api
  - apply_godot_quirks
```

#### Visual QA Engineer

```yaml
role_id: "visual-qa-engineer"
soul: |
  你是一名专业视觉QA工程师，负责游戏视觉质量保证。
  
  核心职责：
  1. 静态视觉质量保证
  2. 动态视觉质量保证
  3. 自由提问模式QA
  4. 视觉缺陷检测

skills:
  - visual_quality_assurance_static
  - visual_quality_assurance_dynamic
  - visual_quality_assurance_question
  - detect_visual_defects
  - detect_rendering_bugs
  - detect_motion_anomalies
```

### 演员配置

**模型配置文件**：
```yaml
actors:
  openai_gpt4:
    provider: "openai"
    model: "gpt-4-turbo"
    api_key_env: "OPENAI_API_KEY"
    default_temperature: 0.7
    
  anthropic_claude:
    provider: "anthropic"
    model: "claude-3-opus-20240229"
    api_key_env: "ANTHROPIC_API_KEY"
    default_temperature: 0.7
```

### 角色实例化

```python
from rams_game import RoleInstantiator

# 初始化实例化器
instantiator = RoleInstantiator(
    config_path="config",
    skills_path=".claude/skills/game-development-role/skills"
)

# 实例化角色：使用GPT-4扮演视觉设计师
role_instance = instantiator.instantiate_role(
    role_id="visual-designer",
    actor_id="openai_gpt4"
)

# 执行任务
result = role_instance.execute_skill(
    skill_name="generate_visual_reference",
    task="设计一个2D平台跳跃游戏的视觉风格"
)
```

---

## Git-like版本控制

### 分支管理

```bash
# 创建分支
open-design execution branch create --instance <instance-name> --name <branch-name>

# 切换分支
open-design execution branch switch --instance <instance-name> --name <branch-name>

# 查看分支
open-design execution branch list --instance <instance-name>

# 删除分支
open-design execution branch delete --instance <instance-name> --name <branch-name>
```

### 标签管理

```bash
# 创建标签
open-design execution tag create --instance <instance-name> --name <tag-name>

# 查看标签
open-design execution tag list --instance <instance-name>

# 删除标签
open-design execution tag delete --instance <instance-name> --name <tag-name>
```

### 暂存管理

```bash
# 保存当前工作状态
open-design execution stash save --instance <instance-name>

# 查看暂存
open-design execution stash list --instance <instance-name>

# 恢复暂存
open-design execution stash apply --instance <instance-name> --index <index>

# 删除暂存
open-design execution stash drop --instance <instance-name> --index <index>
```

### 撤销/重做

```bash
# 撤销操作
open-design execution undo --instance <instance-name> --steps 1

# 重做操作
open-design execution redo --instance <instance-name> --steps 1

# 切换到指定版本
open-design execution checkout --instance <instance-name> --commit <commit-id>
```

---

## 实战案例：从一句话到2D平台跳跃游戏

### 输入
"设计一个2D平台跳跃游戏"

### 完整执行流程

#### Step 1: 管道编排
```
调用: pipeline-orchestration
输入: "设计一个2D平台跳跃游戏"
输出: 
  - 管道计划
  - 阶段: Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration
  - 阶段分离: concept-validation
```

#### Step 2: Visual Target
```
调用: generate_visual_reference
角色: Visual Designer
输入: 2D平台跳跃游戏
输出: 视觉参考图像、艺术方向定义
```

#### Step 3: Decomposition
```
调用: assess_implementation_risks
角色: Technical Designer
输入: 平台跳跃机制
输出: 风险任务识别、验证标准定义

调用: create_task_plan
角色: Technical Designer
输入: 风险任务
输出: PLAN.md
```

#### Step 4: Architecture
```
调用: design_scene_hierarchy
角色: Technical Architect
输入: 游戏世界
输出: 场景层次结构设计

调用: generate_godot_project_skeleton
角色: Technical Architect
输入: 架构蓝图
输出: Godot项目骨架、STRUCTURE.md
```

#### Step 5: Asset Generation
```
调用: manage_asset_budget
角色: Asset Planner
输入: 资产需求
输出: 预算报告

调用: generate_image_asset
角色: Technical Artist
输入: 角色资产
输出: 角色图像资产

调用: convert_image_to_3d_model
角色: Technical Artist
输入: 角色图像
输出: 角色3D模型

调用: rig_character_model
角色: Technical Artist
输入: 角色3D模型
输出: 绑定后的角色模型

输出: ASSETS.md
```

#### Step 6: Task Execution
```
调用: generate_scene_builder_script
角色: Godot Programmer
输入: 架构蓝图、资产清单
输出: 场景构建器脚本

调用: write_runtime_script
角色: Godot Programmer
输入: 游戏机制
输出: 运行时脚本

调用: compile_project
角色: Godot Programmer
输入: 项目配置
输出: 编译后的游戏构建
```

#### Step 7: Visual QA
```
调用: visual_quality_assurance_static
角色: Visual QA Engineer
输入: 参考图像、游戏截图
输出: 视觉对比分析、缺陷检测

调用: visual_quality_assurance_dynamic
角色: Visual QA Engineer
输入: 参考图像、帧序列
输出: 运动异常检测、动画质量评估
```

#### Step 8: Orchestration
```
调用: orchestrate_pipeline
角色: Project Manager
输入: 管道计划
输出: 管道进度报告

调用: communicate_progress
角色: Project Manager
输入: 进度信息
输出: 进度通知
```

---

## 技能调用决策树

```
开始
  │
  ├─ 需要管道编排？
  │   ├─ 是 → pipeline-orchestration
  │   └─ 否 → 直接进入Visual Target
  │
  ├─ Visual Target阶段
  │   └─ generate_visual_reference
  │
  ├─ Decomposition阶段
  │   ├─ assess_implementation_risks
  │   └─ create_task_plan
  │
  ├─ Architecture阶段
  │   ├─ design_scene_hierarchy
  │   └─ generate_godot_project_skeleton
  │
  ├─ Asset Generation阶段
  │   ├─ manage_asset_budget
  │   ├─ generate_image_asset
  │   ├─ convert_image_to_3d_model
  │   └─ rig_character_model
  │
  ├─ Task Execution阶段
  │   ├─ generate_scene_builder_script
  │   ├─ write_runtime_script
  │   └─ compile_project
  │
  ├─ Visual QA阶段
  │   ├─ visual_quality_assurance_static
  │   ├─ visual_quality_assurance_dynamic
  │   └─ visual_quality_assurance_question
  │
  └─ Orchestration阶段
      ├─ orchestrate_pipeline
      ├─ handle_resume_logic
      └─ communicate_progress
```

---

## 最小可行流程（MVP Path）

如果时间有限，可以采用最小可行流程：

```
一句话需求
    ↓
pipeline-orchestration
    ↓
Visual Target (generate_visual_reference)
    ↓
Asset Generation (generate_image_asset)
    ↓
Task Execution (generate_scene_builder_script)
    ↓
Visual QA (visual_quality_assurance_static)
```

**适用场景**：
- 快速原型验证
- 概念Demo
- 早期设计探索

---

## 总结

RAMS Game通过RAMS框架，将一句话需求转化为完整的游戏任务：

1. **角色召集**：根据管道阶段自动召集所需角色
2. **演员选择**：根据任务需求选择合适的模型
3. **实例创建**：创建角色实例，加载技能
4. **七阶段管道**：Visual Target → Orchestration系统化执行
5. **Git-like版本控制**：完整的版本管理能力
6. **多角色协作**：40-50个专业角色协作

核心优势：
- **七阶段管道**：系统化的游戏开发流程
- **阶段分离**：概念验证vs生产开发
- **多角色协作**：40-50个专业角色
- **Git-like版本控制**：完整的版本管理
- **视觉QA系统**：静态/动态/问题三种模式
