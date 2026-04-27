---
description: 游戏开发专用工作流 - 基于RAMS Game框架的七阶段管道编排，支持多角色协作、Git-like版本控制和阶段分离机制
---

# 游戏开发工作流

## 概述

游戏开发工作流是基于RAMS Game框架的专用工作流，针对游戏开发领域的特殊性进行了深度定制。它支持多角色协作（40-50个专业角色）、七阶段管道编排、Git-like版本控制和阶段分离机制（概念验证vs生产开发）。

## 适用场景

- 游戏概念验证和原型开发
- 完整游戏项目开发
- 游戏资产生产（角色、场景、UI等）
- 游戏机制设计和实现
- 技术架构设计和实现

---

## 核心特性

### 1. 阶段分离机制

游戏开发工作流引入了独特的阶段分离机制：

**概念验证阶段（Concept Validation Phase）**
- 时间预算：1-3天等效工作量
- 参与角色：8-10个核心角色
- 代码隔离：原型代码不从生产源文件导入，生产代码不从原型目录导入
- 目标：快速验证核心玩法是否有趣
- 质量标准：放宽编码标准，追求速度

**生产开发阶段（Production Phase）**
- 时间预算：3-24个月
- 参与角色：40-50个角色
- 质量标准：严格遵循编码标准，完整测试覆盖
- 目标：完整实现游戏，达到发布标准
- 质量门：gate-check, release-checklist, launch-checklist

### 2. 七阶段管道编排

基于Godogen架构的七阶段管道编排：

```
Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration
```

**阶段1：Visual Target（视觉目标）**
- 参与角色：Visual Designer, Art Director
- 核心技能：generate_visual_reference, design_art_direction
- 输出：视觉参考图像、艺术方向定义

**阶段2：Decomposition（分解）**
- 参与角色：Technical Designer, System Architect
- 核心技能：assess_implementation_risks, create_task_plan, prioritize_tasks
- 输出：PLAN.md（风险任务 vs 主构建任务）

**阶段3：Architecture（架构）**
- 参与角色：Technical Architect, Godot Programmer
- 核心技能：design_scene_hierarchy, generate_godot_project_skeleton
- 输出：STRUCTURE.md（完整架构蓝图）

**阶段4：Asset Generation（资产生成）**
- 参与角色：Asset Planner, Technical Artist
- 核心技能：manage_asset_budget, generate_image_asset, convert_image_to_3d_model
- 输出：ASSETS.md（资产清单 + 尺寸 + 动画表）

**阶段5：Task Execution（任务执行）**
- 参与角色：Godot Programmer, Technical Artist
- 核心技能：generate_scene_builder_script, write_runtime_script, compile_project
- 输出：可运行的游戏构建

**阶段6：Visual Quality Assurance（视觉质量保证）**
- 参与角色：Visual QA Engineer, Technical Artist
- 核心技能：visual_quality_assurance_static, visual_quality_assurance_dynamic
- 输出：QA报告、修复建议

**阶段7：Orchestration（编排）**
- 参与角色：Project Manager, Technical Director
- 核心技能：orchestrate_pipeline, handle_resume_logic, communicate_progress
- 输出：演示视频、项目状态报告

### 3. Git-like版本控制系统

RAMS Game内置完整的版本控制系统：

```bash
# 查看执行历史
open-design execution log --instance <instance-name>

# 撤销操作
open-design execution undo --instance <instance-name> --steps 1

# 重做操作
open-design execution redo --instance <instance-name> --steps 1

# 切换到指定版本
open-design execution checkout --instance <instance-name> --commit <commit-id>

# 创建分支
open-design execution branch create --instance <instance-name> --name <branch-name>

# 切换分支
open-design execution branch switch --instance <instance-name> --name <branch-name>

# 合并分支
open-design execution merge --instance <instance-name> --source <source-branch> --target <target-branch>

# 创建标签
open-design execution tag create --instance <instance-name> --name <tag-name>

# 暂存当前工作状态
open-design execution stash save --instance <instance-name>
```

### 4. 多角色协作架构

游戏开发采用多角色协作架构，包含40-50个专业角色：

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

### 5. 多后端存储支持

- **文件系统后端**：基于YAML文件存储，适合小规模项目
- **libsql后端**：基于SQLite数据库存储，适合大规模项目

---

## 工作序列

### 概念验证阶段

#### 1. 视觉目标设定
```
调用skill: generate_visual_reference
角色: Visual Designer
输出: 视觉参考图像、艺术方向定义
```

#### 2. 技术风险评估
```
调用skill: assess_implementation_risks
角色: Technical Designer
输出: 风险任务识别、验证标准定义
```

#### 3. 快速架构设计
```
调用skill: design_scene_hierarchy
角色: Technical Architect
输出: 简化架构蓝图
```

#### 4. 核心资产生成
```
调用skill: generate_image_asset
角色: Technical Artist
输出: 核心资产（原型质量）
```

#### 5. 原型实现
```
调用skill: generate_scene_builder_script
角色: Godot Programmer
输出: 可运行原型（代码质量放宽）
```

#### 6. 核心玩法验证
```
调用skill: visual_quality_assurance_static
角色: Visual QA Engineer
输出: 核心玩法验证报告
```

#### 7. 决策：是否进入生产开发
```
调用skill: decision-making
角色: Creative Director
输出: Go/No-Go决策
```

### 生产开发阶段

#### 1. 完整架构设计
```
调用skill: design_technical_architecture
角色: System Architect
输出: 完整技术架构文档
```

#### 2. 详细任务规划
```
调用skill: create_task_plan
角色: Technical Designer
输出: 详细任务列表（PLAN.md）
```

#### 3. 完整资产生成
```
调用skill: manage_asset_budget
调用skill: generate_image_asset
调用skill: convert_image_to_3d_model
角色: Asset Planner, Technical Artist
输出: 完整资产清单（ASSETS.md）
```

#### 4. 完整实现
```
调用skill: generate_scene_builder_script
调用skill: write_runtime_script
调用skill: compile_project
角色: Godot Programmer
输出: 生产级代码
```

#### 5. 全面QA
```
调用skill: visual_quality_assurance_static
调用skill: visual_quality_assurance_dynamic
调用skill: functional-testing
角色: Visual QA Engineer, QA Tester
输出: 完整QA报告
```

#### 6. 质量门控
```
调用skill: gate-check
调用skill: release-checklist
角色: QA Lead, Release Manager
输出: 质量门控报告
```

#### 7. 发布准备
```
调用skill: launch-checklist
角色: Release Manager
输出: 发布准备度报告
```

---

## 质量门控

### 概念验证阶段质量门

- 核心玩法验证通过
- 技术可行性确认
- 视觉方向明确
- Go/No-Go决策明确

### 生产开发阶段质量门

- 代码质量标准通过
- 完整测试覆盖
- 视觉QA通过
- 性能指标达标
- 发布检查清单通过

---

## 退出条件

### 概念验证阶段退出条件

- 核心玩法验证完成
- Go/No-Go决策明确
- 如为Go，进入生产开发阶段
- 如为No-Go，项目终止或重新定义

### 生产开发阶段退出条件

- 所有质量门控通过
- 发布检查清单通过
- 演示视频完成
- 项目状态报告完成

---

## 与其他工作流的关系

### 与BMM工作流的关系

游戏开发工作流可以视为BMM工作流在游戏开发领域的特化版本：
- 继承BMM的里程碑设计理念
- 添加游戏开发特有的阶段分离机制
- 集成七阶段管道编排
- 支持多角色协作

### 与Quick工作流的关系

游戏开发工作流的单个阶段可以降级为Quick工作流：
- 当某个阶段范围明确时，使用Quick工作流
- 保持质量门控
- 维护文档同步

---

## 示例：角色资产生产工作流

```bash
# 1. 实例化角色艺术家
open-design role instantiate --role character-artist --instance my-character-artist

# 2. 创建概念设计分支
open-design execution branch create --instance my-character-artist --name concept-dalle

# 3. 执行概念设计skill
open-design skill execute --instance my-character-artist --skill character-concept-dalle3

# 4. 创建建模分支
open-design execution branch create --instance my-character-artist --name modeling-blender

# 5. 执行建模skill
open-design skill execute --instance my-character-artist --skill character-modeling-blender

# 6. 合并分支
open-design execution merge --instance my-character-artist --source modeling-blender --target concept-dalle

# 7. 标记最终版本
open-design execution tag create --instance my-character-artist --name v1.0-character-final
```

---

## Worktree集成

游戏开发工作流与feature-dev工作流集成，实现1 Feature = 1 Worktree = 1 游戏开发阶段：

### 概念验证阶段Worktree

**创建概念验证worktree：**
```bash
# 创建概念验证分支和worktree
git worktree add -b concept-feature/[feature-name] ../game-concept-[feature-name]

# 初始化游戏开发环境
cd ../game-concept-[feature-name]
npm install

# 加载RAMS Game角色配置
open-design role instantiate --role visual-designer --instance concept-visual-designer
open-design role instantiate --role technical-designer --instance concept-technical-designer
# ... 加载8-10个核心角色

# 初始化Git-like版本控制
open-design execution init --instance concept-visual-designer --backend filesystem
```

**概念验证阶段执行：**
```bash
# Visual Target阶段
open-design skill execute --instance concept-visual-designer --skill generate_visual_reference
open-design execution commit --instance concept-visual-designer --message "完成Visual Target阶段"
open-design execution tag create --instance concept-visual-designer --name v0.1-visual-target

# Decomposition阶段
open-design skill execute --instance concept-technical-designer --skill assess_implementation_risks
open-design skill execute --instance concept-technical-designer --skill create_task_plan
open-design execution commit --instance concept-technical-designer --message "完成Decomposition阶段"
open-design execution tag create --instance concept-technical-designer --name v0.2-decomposition

# ... 继续其他阶段
```

**完成概念验证：**
```bash
# Go/No-Go决策
open-design skill execute --instance concept-creative-director --skill decision-making

# 如果Go，创建生产开发worktree
# 如果No-Go，清理worktree
cd ../game
git merge concept-feature/[feature-name]
git worktree remove ../game-concept-[feature-name]
```

### 生产开发阶段Worktree

**创建生产开发worktree：**
```bash
# 创建生产开发分支和worktree
git worktree add -b prod-feature/[feature-name] ../game-prod-[feature-name]

# 初始化游戏开发环境
cd ../game-prod-[feature-name]
npm install

# 加载RAMS Game角色配置（40-50个专业角色）
open-design role instantiate --role creative-director --instance prod-creative-director
open-design role instantiate --role technical-director --instance prod-technical-director
# ... 加载所有40-50个角色

# 初始化Git-like版本控制
open-design execution init --instance prod-creative-director --backend libsql
```

**生产开发阶段执行：**
```bash
# Visual Target阶段
open-design skill execute --instance prod-visual-designer --skill generate_visual_reference
open-design execution commit --instance prod-visual-designer --message "完成Visual Target阶段"
open-design execution tag create --instance prod-visual-designer --name v1.0-visual-target

# Decomposition阶段
open-design skill execute --instance prod-technical-designer --skill assess_implementation_risks
open-design skill execute --instance prod-technical-designer --skill create_task_plan
open-design execution commit --instance prod-technical-designer --message "完成Decomposition阶段"
open-design execution tag create --instance prod-technical-designer --name v1.1-decomposition

# Architecture阶段
open-design skill execute --instance prod-technical-architect --skill design_technical_architecture
open-design skill execute --instance prod-technical-architect --skill design_scene_hierarchy
open-design skill execute --instance prod-technical-architect --skill generate_godot_project_skeleton
open-design execution commit --instance prod-technical-architect --message "完成Architecture阶段"
open-design execution tag create --instance prod-technical-architect --name v1.2-architecture

# Asset Generation阶段
open-design skill execute --instance prod-asset-planner --skill manage_asset_budget
open-design skill execute --instance prod-technical-artist --skill generate_image_asset
open-design skill execute --instance prod-technical-artist --skill convert_image_to_3d_model
open-design execution commit --instance prod-technical-artist --message "完成Asset Generation阶段"
open-design execution tag create --instance prod-technical-artist --name v1.3-asset-generation

# Task Execution阶段
open-design skill execute --instance prod-godot-programmer --skill generate_scene_builder_script
open-design skill execute --instance prod-godot-programmer --skill write_runtime_script
open-design skill execute --instance prod-godot-programmer --skill compile_project
open-design execution commit --instance prod-godot-programmer --message "完成Task Execution阶段"
open-design execution tag create --instance prod-godot-programmer --name v1.4-task-execution

# Visual QA阶段
open-design skill execute --instance prod-visual-qa-engineer --skill visual_quality_assurance_static
open-design skill execute --instance prod-visual-qa-engineer --skill visual_quality_assurance_dynamic
open-design execution commit --instance prod-visual-qa-engineer --message "完成Visual QA阶段"
open-design execution tag create --instance prod-visual-qa-engineer --name v1.5-visual-qa

# Orchestration阶段
open-design skill execute --instance prod-project-manager --skill orchestrate_pipeline
open-design skill execute --instance prod-project-manager --skill communicate_progress
open-design execution commit --instance prod-project-manager --message "完成Orchestration阶段"
open-design execution tag create --instance prod-project-manager --name v1.6-orchestration
```

**完成生产开发：**
```bash
# 质量门控
open-design skill execute --instance prod-qa-lead --skill gate-check
open-design skill execute --instance prod-release-manager --skill release-checklist
open-design skill execute --instance prod-release-manager --skill launch-checklist

# 合并到主分支
cd ../game
git merge prod-feature/[feature-name]
git push origin main

# 清理worktree
git worktree remove ../game-prod-[feature-name]

# 归档执行历史
open-design execution archive --instance prod-creative-director
```

### 并行开发

多个游戏特性可以同时推进，每个特性在独立的worktree中：

```bash
# 特性1：角色系统
git worktree add -b prod-feature/character-system ../game-prod-character-system

# 特性2：战斗系统
git worktree add -b prod-feature/combat-system ../game-prod-combat-system

# 特性3：关卡设计
git worktree add -b prod-feature/level-design ../game-prod-level-design
```

每个worktree有独立的RAMS Game角色实例和Git-like版本控制，互不干扰。

### 分支策略

**概念验证分支：**
- 命名：`concept-feature/[feature-name]`
- 时间：1-3天
- 角色：8-10个核心角色
- 代码质量：relaxed

**生产开发分支：**
- 命名：`prod-feature/[feature-name]`
- 时间：根据里程碑
- 角色：40-50个专业角色
- 代码质量：strict

**里程碑分支：**
- 命名：`milestone/[milestone-name]`
- 时间：根据里程碑计划
- 角色：相关角色子集
- 代码质量：strict

### 标签策略

**概念验证标签：**
- `v0.1-visual-target`
- `v0.2-decomposition`
- `v0.3-architecture`
- `v0.4-asset-generation`
- `v0.5-task-execution`
- `v0.6-visual-qa`
- `v0.7-orchestration`
- `v0.8-concept-validation-complete`

**生产开发标签：**
- `v1.0-visual-target`
- `v1.1-decomposition`
- `v1.2-architecture`
- `v1.3-asset-generation`
- `v1.4-task-execution`
- `v1.5-visual-qa`
- `v1.6-orchestration`
- `v1.7-milestone-1-complete`

**发布标签：**
- `v2.0-mvp`
- `v2.1-alpha`
- `v2.2-beta`
- `v3.0-ga`

### 与feature-dev工作流的关系

游戏开发工作流是feature-dev工作流在游戏开发领域的特化：

- 继承feature-dev的worktree隔离原则
- 继承feature-dev的6维度文档审查
- 继承feature-dev的Gherkin验收标准
- 添加游戏开发特有的七阶段管道编排
- 添加游戏开发特有的阶段分离机制
- 添加游戏开发特有的多角色协作
- 添加游戏开发特有的Git-like版本控制
- 添加游戏开发特有的视觉QA系统

详见 [feature-dev.md](./feature-dev.md)
