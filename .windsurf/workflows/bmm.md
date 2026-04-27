---
description: BMM 工作流 - 用于需要需求发现到实现的较大更改
---

# BMM 工作流

## 概述

BMM（Big Multi-Milestone）工作流用于需要需求发现、变更框架和实现的较大更改。适用于范围较大、需要问题框架化的任务。

## 适用场景

- 需要需求发现
- 需要变更框架
- 较大的更改
- 需要架构变更
- 需要多里程碑实现

## 核心文档

在开始工作前，加载以下内部文档（包含 Quick 工作流的所有文档）：

- `harness.md` - 工具配置
- `task-sizing.md` - 任务规模
- `milestone-design.md` - 里程碑设计
- `work-breakdown.md` - 工作分解
- `validation-matrix.md` - 验证矩阵
- `closeout-loop.md` - 关闭循环
- `openspec-sync.md` - OpenSpec 同步

## 工作目标

- 从问题框架化到实现的端到端更改
- 明确的问题定义和非目标
- 清晰的范围和验收标准
- 完整的变更记录

## 变更记录

变更记录存储在 `openspec/changes/{change-name}/` 目录下。

### 最小文件

每个变更记录至少包含：

- `README.md` - 变更概述
- `proposal.md` - 变更提案
- `tasks.md` - 任务列表

### 可选文件

对于架构变更，添加：

- `design.md` - 架构设计文档

## 工作序列

### 1. 检查（Inspection）

检查当前代码和文档：
- 识别受影响的代码路径
- 检查现有文档状态
- 确认问题范围

### 2. 问题定义

定义问题、非目标、范围、验收标准：

- **问题**：清晰描述要解决的问题
- **非目标**：明确不包含的内容
- **范围**：定义变更边界
- **验收标准**：明确的成功条件

### 3. 起草变更记录

创建变更记录文件：
- `openspec/changes/{change-name}/README.md`
- `openspec/changes/{change-name}/proposal.md`
- `openspec/changes/{change-name}/tasks.md`

如果需要架构变更，添加：
- `openspec/changes/{change-name}/design.md`

### 4. 声明验证包

声明验证包（使用 `validation-matrix.md`）：
- 定义验证方法
- 确认验证标准
- 建立验证流程

### 5. 工作分解

将工作分解为里程碑：
- 使用 `work-breakdown.md` 分解任务
- 使用 `task-sizing.md` 评估每个里程碑
- 确保里程碑大小合理

### 6. 里程碑设计

设计每个里程碑：
- 使用 `milestone-design.md` 设计里程碑
- 定义每个里程碑的验收标准
- 确保里程碑之间的依赖关系

### 7. 记录里程碑

在变更记录中记录里程碑：
- 更新 `tasks.md` 包含里程碑列表
- 为每个里程碑创建子任务
- 定义里程碑完成标准

### 8. 实现

一次实现一个里程碑：
- 遵循 Quick 工作流实现每个里程碑
- 确保里程碑验收标准通过
- 完成后记录进度

### 9. 记录架构决策

如果涉及架构变更：
- 记录架构决策（ADR）
- 更新 `design.md`
- 确保决策理由清晰

### 10. 角色评审

进行角色评审：
- 相关角色评审变更
- 确认变更符合角色职责
- 处理角色反馈

### 11. 同步里程碑进度

同步里程碑进度：
- 更新变更记录
- 同步 OpenSpec 文档
- 通知相关角色

### 12. 验证和归档

验证和归档变更：
- 运行完整验证
- 确认所有验收标准通过
- 归档变更记录

## 质量门控

在完成每个步骤时，确保：

- 问题定义清晰
- 变更记录完整
- 里程碑设计合理
- 实现符合标准
- 验证全部通过
- 文档已同步

## 退出条件

当以下条件满足时，可以退出 BMM 工作流：

- 所有里程碑完成
- 所有验收标准通过
- 变更记录已归档
- OpenSpec 已同步
- 无阻塞问题

## 降级到 Quick

如果变更范围缩小，可以考虑降级到 Quick 工作流：

- 需求明确且稳定
- 不需要架构变更
- 可以在单个里程碑内完成

---

## 游戏开发变体

对于游戏开发项目，BMM工作流需要进行特化：

### 阶段分离机制

游戏开发引入独特的阶段分离：

**概念验证阶段（Concept Validation Phase）**
- 时间预算：1-3天等效工作量
- 参与角色：8-10个核心角色
- 代码隔离：原型代码不从生产源文件导入
- 目标：快速验证核心玩法是否有趣
- 质量标准：放宽编码标准，追求速度

**生产开发阶段（Production Phase）**
- 时间预算：3-24个月
- 参与角色：40-50个角色
- 质量标准：严格遵循编码标准，完整测试覆盖
- 目标：完整实现游戏，达到发布标准
- 质量门：gate-check, release-checklist, launch-checklist

### 七阶段管道编排

游戏开发采用七阶段管道编排替代传统DAG解析：

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

### 多角色协作

游戏开发采用多角色协作架构（40-50个专业角色）：

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

### Git-like版本控制

游戏开发工作流集成Git-like版本控制系统：

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

### 变更记录扩展

对于游戏开发项目，变更记录应包含：

- `game-design.md` - 游戏设计文档（GDD）
- `technical-architecture.md` - 技术架构文档
- `asset-manifest.md` - 资产清单
- `milestone-reports/` - 里程碑报告目录

### 质量门控扩展

游戏开发项目需要额外的质量门控：

- **视觉QA门控**：visual_quality_assurance_static, visual_quality_assurance_dynamic
- **性能门控**：performance-testing, perf-profile
- **发布门控**：release-checklist, launch-checklist
- **平台认证门控**：platform-certification

### 使用游戏开发工作流

对于游戏开发项目，推荐使用专门的游戏开发工作流：

```bash
# 使用游戏开发工作流
/workflow game-development-workflow
```

详见 [game-development-workflow.md](./game-development-workflow.md)
