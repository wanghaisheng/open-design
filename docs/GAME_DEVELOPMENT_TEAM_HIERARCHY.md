# 游戏开发团队-角色-技能-工具层级关系文档

本文档说明游戏开发中团队、角色、技能、工具的层级关系，以及概念验证阶段与生产开发阶段的区别。

---

## 一、层级架构概述

### 四层架构

```
团队（Team）
  └─ 角色（Role）
      └─ 技能（Skill）
          └─ 工具（Tool）
```

**层级说明**：
- **团队（Team）**：最高级组织单位，按职能划分
- **角色（Role）**：团队内的具体职位，具有明确的职责和 Soul 定义
- **技能（Skill）**：角色具备的能力单元，通过 AI 模型或软件工具实现
- **工具（Tool）**：技能的具体实现渠道（AI 模型或外部软件）

---

## 二、阶段划分

### 2.1 概念验证阶段（Concept Validation Phase）

**目标**：验证游戏概念是否可行，核心循环是否有趣

**时间范围**：1-4 周

**核心活动**：
- 创意头脑风暴
- 游戏概念定义
- 核心循环设计
- 快速原型制作
- 可玩性测试

**成功标准**：
- 核心循环验证通过
- 目标玩家类型明确
- 技术可行性确认
- 艺术方向确定

---

### 2.2 生产开发阶段（Production Development Phase）

**目标**：完整实现游戏，达到发布标准

**时间范围**：3-24 个月

**核心活动**：
- 详细系统设计
- 完整资产生产
- 代码实现
- 全面测试
- 发布准备

**成功标准**：
- 所有系统实现完成
- 质量门控通过
- 平台认证通过
- 发布就绪

---

## 三、团队组织结构

### 3.1 Leadership Team（领导团队）

**颜色标识**：紫色渐变 (#667eea → #764ba2)

**团队职责**：
- 制定游戏愿景和战略方向
- 协调各部门工作
- 做出高层决策
- 维护项目一致性

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Creative Director | 创意总监，最高创意权威 | 愿景守护、支柱方法论、决策框架 |
| Technical Director | 技术总监，技术战略决策 | 技术领导力、架构决策、性能标准 |
| Producer | 制作人，项目管理和交付 | 调度管理、资源分配、风险控制 |
| Art Director | 艺术总监，视觉方向决策 | 艺术指导、视觉一致性、资产审批 |
| Audio Director | 音频总监，音频方向决策 | 音频设计、声音协调、音频团队管理 |
| Narrative Director | 叙事总监，故事方向决策 | 故事愿景、叙事一致性、剧本审批 |
| Game Vision Architect | 游戏愿景架构师，长期愿景维护 | 愿景维护、战略决策、愿景一致性 |

**核心技能**：
- brainstorm（创意头脑风暴）
- design-review（设计评审）
- architecture-decision（架构决策）
- sprint-plan（冲刺计划）
- milestone-review（里程碑评审）

**工具配置**：
- AI 模型：opus（创意决策）、sonnet（实现）
- 工具：Read, Glob, Grep, Write, Edit, WebSearch, Task, AskUserQuestion

---

### 3.2 Design Team（设计团队）

**颜色标识**：粉红渐变 (#f093fb → #f5576c)

**团队职责**：
- 设计游戏机制和系统
- 创建关卡和遭遇
- 编写叙事内容
- 维护设计文档

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Game Designer | 游戏设计师，机制和系统设计 | 核心循环设计、平衡框架、玩家体验映射 |
| Systems Designer | 系统设计师，详细系统设计 | 系统设计、交互系统、系统平衡 |
| Level Designer | 关卡设计师，关卡和遭遇设计 | 关卡创建、空间设计、遭遇设计 |
| Economy Designer | 经济设计师，经济系统设计 | 经济系统、战利品表、进阶曲线 |
| World Builder | 世界构建者，世界创建 | 世界创建、环境设计、世界逻辑 |
| Writer | 编剧，叙事内容编写 | 叙事内容、对话编写、故事设计 |
| Live-Ops Designer | 运营设计师，实时运营 | 实时运营、活动设计、长期内容更新 |
| Aesthetic Direction Framework | 美学方向框架，美学哲学 | 美学哲学、美学一致性、美学决策 |
| Core Loop Designer | 核心循环设计师，核心循环优化 | 核心循环设计、玩家留存、循环优化 |
| Design Coherence Engine | 设计一致性引擎，系统对齐 | 系统对齐、设计质量、一致性检查 |
| Competitive Analysis Specialist | 竞争分析专家，市场分析 | 市场分析、竞争分析、定位分析 |
| Narrative Game Generator | 叙事游戏生成器，叙事生成 | 叙事生成、故事设计、叙事系统 |

**核心技能**：
- design-review（设计评审）
- balance-check（平衡检查）
- brainstorm（创意头脑风暴）
- design-systems（设计系统分解）
- core-loop-designer（核心循环设计）
- narrative-systems-designer（叙事系统设计）

**工具配置**：
- AI 模型：sonnet（设计实现）、opus（创意）
- 工具：Read, Glob, Grep, Write, Edit, WebSearch

---

### 3.3 Programming Team（编程团队）

**颜色标识**：蓝色渐变 (#4facfe → #00f2fe)

**团队职责**：
- 实现游戏代码
- 开发引擎功能
- 优化性能
- 维护代码质量

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Lead Programmer | 首席程序员，技术领导 | 技术领导力、代码标准、架构指导 |
| Gameplay Programmer | 游戏玩法程序员，玩法实现 | 游戏机制实现、玩法系统、游戏逻辑 |
| Engine Programmer | 引擎程序员，引擎开发 | 引擎级编程、渲染系统、性能优化 |
| AI Programmer | AI 程序员，AI 系统实现 | AI 系统实现、行为树、AI 性能 |
| Network Programmer | 网络程序员，多人游戏系统 | 多人游戏系统、网络同步、安全性 |
| UI Programmer | UI 程序员，UI 系统实现 | UI 系统实现、用户界面、可访问性 |
| Tools Programmer | 工具程序员，开发工具 | 开发工具、编辑器扩展、自动化工具 |

**引擎专家角色**：

| 角色名称 | 引擎 | 主要职责 |
|---------|------|---------|
| Unity Specialist | Unity | Unity 专家、Unity 最佳实践 |
| Unity DOTS Specialist | Unity | Unity DOTS/ECS 专家 |
| Unity Addressables Specialist | Unity | Unity Addressables 专家 |
| Unity Shader Specialist | Unity | Unity Shader 专家 |
| Unity UI Specialist | Unity | Unity UI 专家 |
| Godot Specialist | Godot | Godot 专家、Godot 最佳实践 |
| Godot GDScript Specialist | Godot | Godot GDScript 专家 |
| Godot GDExtension Specialist | Godot | Godot GDExtension 专家 |
| Godot Shader Specialist | Godot | Godot Shader 专家 |
| Unreal Specialist | Unreal | Unreal 专家、Unreal 最佳实践 |
| UE Blueprint Specialist | Unreal | UE Blueprint 专家 |
| UE GAS Specialist | Unreal | UE GAS 专家 |
| UE Replication Specialist | Unreal | UE Replication 专家 |
| UE UMG Specialist | Unreal | UE UMG 专家 |
| Cocos Creator Specialist | Cocos Creator | Cocos Creator 专家 |

**核心技能**：
- code-review（代码评审）
- prototype（原型制作）
- setup-engine（引擎设置）
- perf-profile（性能分析）
- godot（Godot 技能）
- unity-skills（Unity 技能）
- unreal-skills（Unreal 技能）

**工具配置**：
- AI 模型：sonnet（代码实现）
- 工具：Read, Glob, Grep, Write, Edit, Bash, Task
- 软件工具：引擎 IDE、版本控制、构建工具

---

### 3.4 Art Team（艺术团队）

**颜色标识**：橙黄渐变 (#fa709a → #fee140)

**团队职责**：
- 创建游戏资产
- 设计视觉风格
- 制作动画和特效
- 优化视觉性能

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Technical Artist | 技术美术，桥接艺术和工程 | Shader 开发、VFX 系统、渲染优化 |
| UX Designer | UX 设计师，用户体验设计 | 用户体验设计、用户流程、可访问性 |
| Accessibility Specialist | 无障碍专家，无障碍功能 | 无障碍功能、包容性设计、辅助技术 |
| Sound Designer | 声音设计师，音效设计 | 音效设计、音频资产、声音实现 |

**增强角色**：
- Enhanced Art Director（增强艺术总监）
- Enhanced Composer（增强作曲家）
- Enhanced Sound Designer（增强声音设计师）
- Enhanced Technical Artist（增强技术美术）
- Enhanced UI Specialist（增强 UI 专家）
- Enhanced UX Designer（增强 UX 设计师）

**核心技能**：
- asset-audit（资产审计）
- perf-profile（性能分析）
- design-review（设计评审）

**工具配置**：
- AI 模型：sonnet（实现）
- 工具：Read, Glob, Grep, Write, Edit, Bash
- 软件工具：图像编辑器、3D 建模软件、音频编辑器

---

### 3.5 QA Team（质量保证团队）

**颜色标识**：青粉渐变 (#a8edea → #fed6e3)

**团队职责**：
- 制定测试策略
- 执行测试
- Bug 分类和追踪
- 发布质量门控

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| QA Lead | QA 负责人，测试策略和质量门控 | 测试策略、Bug 分类、质量门控 |
| QA Tester | QA 测试员，测试执行 | 测试用例编写、测试执行、Bug 报告 |
| Performance Analyst | 性能分析师，性能分析 | 性能测试、性能分析、优化建议 |
| Game Quality Gates Specialist | 游戏质量门控专家，质量标准 | 质量标准、质量门控、质量自动化 |

**增强角色**：
- Enhanced Performance Analyst（增强性能分析师）
- Enhanced QA Tester（增强 QA 测试员）

**核心技能**：
- bug-report（Bug 报告）
- release-checklist（发布检查清单）
- playtest-report（试玩报告）
- gate-check（门控检查）
- perf-profile（性能分析）

**工具配置**：
- AI 模型：sonnet（分析）
- 工具：Read, Glob, Grep, Write, Edit, Bash
- 软件工具：测试框架、性能分析工具、Bug 追踪系统

---

### 3.6 Production Team（制作团队）

**颜色标识**：粉红渐变 (#ff9a9e → #fecfef)

**团队职责**：
- 项目管理
- 资源调度
- 风险管理
- 发布协调

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Release Manager | 发布经理，发布管道管理 | 发布管道、认证检查清单、版本管理 |
| Localization Lead | 本地化负责人，本地化管理 | 本地化管理、翻译协调、文化适配 |
| Community Manager | 社区经理，社区管理 | 社区管理、社区参与、社区沟通 |
| Analytics Engineer | 分析工程师，玩家分析 | 玩家分析、数据分析、分析报告 |
| DevOps Engineer | DevOps 工程师，部署操作 | 部署操作、CI/CD 管道、基础设施 |
| Security Engineer | 安全工程师，安全措施 | 安全措施、安全审计、漏洞修复 |
| Prototyper | 原型制作者，快速原型制作 | 持续原型制作、功能原型、快速验证 |

**增强角色**：
- Enhanced Community Manager（增强社区经理）
- Enhanced DevOps Engineer（增强 DevOps 工程师）
- Enhanced Prototyper（增强原型制作者）
- Enhanced Release Manager（增强发布经理）
- Enhanced Security Engineer（增强安全工程师）

**核心技能**：
- sprint-plan（冲刺计划）
- milestone-review（里程碑评审）
- estimate（工作量估算）
- retrospective（回顾）
- release-checklist（发布检查清单）
- changelog（变更日志）
- patch-notes（补丁说明）

**工具配置**：
- AI 模型：sonnet（实现）
- 工具：Read, Glob, Grep, Write, Edit, Bash
- 软件工具：项目管理工具、CI/CD 系统、分析平台

---

### 3.7 Publish Team（发布团队）

**颜色标识**：紫粉渐变 (#a18cd1 → #fbc2eb)

**团队职责**：
- 商店提交
- 平台认证
- 发布协调
- 商店页面优化

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Store Submission Specialist | 商店提交专家，商店提交 | 商店提交、商店政策、提交流程 |
| Platform Certification Specialist | 平台认证专家，平台认证 | 平台认证、TRC/TCR/Lotcheck、认证要求 |
| Release Coordinator | 发布协调员，发布协调 | 发布协调、发布计划、发布执行 |
| Publish Quality Gates | 发布质量门控，发布质量标准 | 发布质量标准、质量门控、发布验证 |
| Store Page Optimizer | 商店页面优化师，商店页面优化 | 商店页面优化、转化率优化、页面设计 |
| Platform Relationship Manager | 平台关系经理，平台关系 | 平台关系、平台沟通、平台合作 |

**核心技能**：
- launch-checklist（启动检查清单）
- release-checklist（发布检查清单）
- gate-check（门控检查）
- localize（本地化）

**工具配置**：
- AI 模型：sonnet（实现）
- 工具：Read, Glob, Grep, Write, Edit, Bash
- 软件工具：商店后台、认证工具、本地化工具

---

### 3.8 Support Team（支持团队）

**团队职责**：
- 提供技术支持
- 数据分析支持
- 网络支持

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Enhanced Analytics Engineer | 增强分析工程师，高级分析 | 高级分析、数据挖掘、预测分析 |
| Enhanced Network Engineer | 增强网络工程师，高级网络 | 高级网络、网络架构、网络安全 |

**核心技能**：
- analytics-engineering（分析工程）
- network-architecture（网络架构）

**工具配置**：
- AI 模型：sonnet（分析）
- 工具：Read, Glob, Grep, Write, Edit, Bash

---

### 3.9 Enhanced Team（增强团队）

**团队职责**：
- 提供高级专业支持
- 推动创新
- 领导特定领域

**团队角色**：

| 角色名称 | 主要职责 | Soul 特质 |
|---------|---------|----------|
| Enhanced Game Designer | 增强游戏设计师，高级游戏设计 | 高级游戏设计、设计创新、设计领导 |
| Enhanced Tool Developer | 增强工具开发者，高级工具开发 | 高级工具开发、工具创新、工具架构 |
| Enhanced Art Director | 增强艺术总监，高级艺术指导 | 高级艺术指导、艺术创新、艺术领导 |
| Enhanced Network Engineer | 增强网络工程师，高级网络工程 | 高级网络工程、网络架构、网络安全 |

**核心技能**：
- skill-creation（技能创建）
- design-innovation（设计创新）
- art-innovation（艺术创新）

**工具配置**：
- AI 模型：opus（创新）、sonnet（实现）
- 工具：Read, Glob, Grep, Write, Edit, Bash, Task

---

## 四、阶段角色参与矩阵

### 4.1 概念验证阶段角色参与

| 团队 | 角色 | 参与程度 | 核心技能 | 关键输出 |
|-----|------|---------|---------|---------|
| Leadership | Creative Director | 高 | brainstorm, design-review | 游戏愿景、支柱定义 |
| Leadership | Technical Director | 中 | architecture-decision | 技术可行性 |
| Leadership | Producer | 高 | sprint-plan, estimate | 项目计划、资源评估 |
| Design | Game Designer | 高 | brainstorm, design-review | 核心循环设计 |
| Design | Systems Designer | 中 | design-review | 系统概念 |
| Design | Core Loop Designer | 高 | core-loop-designer | 核心循环优化 |
| Programming | Gameplay Programmer | 中 | prototype | 原型实现 |
| Programming | Engine Programmer | 低 | setup-engine | 引擎选择 |
| Art | Technical Artist | 中 | asset-audit | 资产规划 |
| Art | UX Designer | 中 | design-review | UX 概念 |
| Production | Prototyper | 高 | prototype | 快速原型 |
| QA | QA Lead | 低 | playtest-report | 测试计划 |
| QA | Performance Analyst | 低 | perf-profile | 性能基准 |

**概念验证阶段特点**：
- 角色参与数量少（约 8-10 个核心角色）
- 重点是创意验证，非完整实现
- 快速迭代，接受不完美
- 重点技能：brainstorm, prototype, design-review

---

### 4.2 生产开发阶段角色参与

| 团队 | 角色 | 参与程度 | 核心技能 | 关键输出 |
|-----|------|---------|---------|---------|
| Leadership | Creative Director | 中 | design-review | 设计一致性 |
| Leadership | Technical Director | 高 | architecture-decision | 架构决策 |
| Leadership | Producer | 高 | sprint-plan, milestone-review | 项目管理 |
| Leadership | Art Director | 高 | design-review | 视觉一致性 |
| Leadership | Audio Director | 高 | design-review | 音频一致性 |
| Leadership | Narrative Director | 高 | design-review | 叙事一致性 |
| Design | Game Designer | 高 | design-review, balance-check | 完整系统设计 |
| Design | Systems Designer | 高 | design-review, design-systems | 详细系统设计 |
| Design | Level Designer | 高 | design-review | 关卡设计 |
| Design | Economy Designer | 中 | balance-check | 经济系统 |
| Design | World Builder | 中 | design-review | 世界构建 |
| Design | Writer | 中 | design-review | 叙事内容 |
| Programming | Lead Programmer | 高 | code-review, architecture-decision | 技术领导 |
| Programming | Gameplay Programmer | 高 | code-review, prototype | 游戏玩法实现 |
| Programming | Engine Programmer | 高 | setup-engine, perf-profile | 引擎开发 |
| Programming | AI Programmer | 中 | code-review | AI 系统实现 |
| Programming | Network Programmer | 中 | code-review | 网络系统 |
| Programming | UI Programmer | 高 | code-review | UI 实现 |
| Programming | Tools Programmer | 中 | code-review | 工具开发 |
| Programming | [Engine Specialists] | 高 | [engine-skills] | 引擎特定实现 |
| Art | Technical Artist | 高 | asset-audit, perf-profile | 视觉优化 |
| Art | UX Designer | 高 | design-review | UX 实现 |
| Art | Accessibility Specialist | 中 | design-review | 无障碍功能 |
| Art | Sound Designer | 高 | asset-audit | 音频资产 |
| QA | QA Lead | 高 | bug-report, release-checklist | 测试策略 |
| QA | QA Tester | 高 | bug-report, playtest-report | 测试执行 |
| QA | Performance Analyst | 高 | perf-profile, scope-check | 性能分析 |
| QA | Game Quality Gates Specialist | 高 | gate-check | 质量门控 |
| Production | Release Manager | 高 | release-checklist, changelog | 发布管理 |
| Production | Localization Lead | 中 | localize, patch-notes | 本地化 |
| Production | Community Manager | 中 | retrospective, onboard | 社区管理 |
| Production | Analytics Engineer | 中 | analytics-engineering | 数据分析 |
| Production | DevOps Engineer | 高 | release-checklist | CI/CD |
| Production | Security Engineer | 中 | security-audit | 安全审计 |
| Publish | Store Submission Specialist | 高 | launch-checklist | 商店提交 |
| Publish | Platform Certification Specialist | 高 | gate-check, launch-checklist | 平台认证 |
| Publish | Release Coordinator | 高 | release-checklist | 发布协调 |
| Publish | Publish Quality Gates | 高 | gate-check | 发布质量门控 |
| Publish | Store Page Optimizer | 中 | launch-checklist | 商店页面 |
| Publish | Platform Relationship Manager | 低 | launch-checklist | 平台关系 |

**生产开发阶段特点**：
- 角色参与数量多（约 40-50 个角色）
- 完整实现所有系统
- 严格质量标准
- 重点技能：code-review, design-review, release-checklist, perf-profile

---

## 五、技能分类与工具映射

### 5.1 技能分类

| 技能类别 | 编码 | 主要技能 | 实现渠道 |
|---------|------|---------|---------|
| Creative（创意） | [1] | brainstorm, aesthetic-direction-framework, core-loop-designer | AI 模型 |
| Reviews & Analysis（评审与分析） | [2] | design-review, code-review, balance-check, asset-audit | AI 模型 |
| Project Management（项目管理） | [3] | sprint-plan, milestone-review, estimate, retrospective | AI 模型 |
| Production（制作） | [4] | prototype, setup-engine, perf-profile, asset-audit | AI 模型 + 软件工具 |
| Release（发布） | [5] | release-checklist, launch-checklist, changelog, patch-notes | AI 模型 |
| Team Orchestration（团队编排） | [6] | team-combat, team-narrative, team-ui, team-release | AI 模型 |

### 5.2 工具分类

| 工具类型 | 具体工具 | 用途 |
|---------|---------|------|
| 基础工具 | Read, Glob, Grep, Write, Edit | 文件操作 |
| 高级工具 | Bash, WebSearch, Task, AskUserQuestion | 高级功能 |
| AI 模型 | opus（创意）、sonnet（实现） | AI 推理 |
| 软件工具 | 图像编辑器、3D 建模软件、音频编辑器、IDE、版本控制、CI/CD 系统 | 专业工具 |

---

## 六、协作关系

### 6.1 委托关系

**Creative Director 委托给**：
- Game Designer（机械设计）
- Art Director（视觉执行）
- Audio Director（音频执行）
- Narrative Director（叙事执行）

**Technical Director 委托给**：
- Lead Programmer（技术实现）
- Engine Specialists（引擎特定任务）

**Producer 委托给**：
- Release Manager（发布管理）
- QA Lead（质量保证）
- DevOps Engineer（基础设施）

**Lead Programmer 委托给**：
- Gameplay Programmer（游戏玩法）
- Engine Programmer（引擎开发）
- Engine Specialists（引擎特定）

**QA Lead 委托给**：
- QA Tester（测试执行）
- Performance Analyst（性能分析）

---

### 6.2 升级路径

**升级到 Creative Director**：
- Game Designer vs Narrative Director 冲突（ludonarrative alignment）
- Art Director vs Audio Director 冲突（aesthetic coherence）
- 任何"改变游戏身份"的决策
- 无法解决的支柱冲突

**升级到 Technical Director**：
- 引擎版本升级
- 插件/工具决策
- 重大技术选择

**升级到 Producer**：
- 范围变更请求
- 调度冲突
- 资源不足

---

## 七、工作流集成

### 7.1 Quick 模式（快速工作流）

**适用场景**：清晰有界的编码工作

**核心文档**：
- harness.md（工具配置）
- task-sizing.md（任务规模）
- milestone-design.md（里程碑设计）
- work-breakdown.md（工作分解）
- validation-matrix.md（验证矩阵）
- closeout-loop.md（关闭循环）

**工作序列**：
1. 检查受影响的代码路径
2. 检查任务规模和工作分解
3. 将任务写为一个里程碑
4. 实现有界里程碑
5. 运行相关验证
6. 应用硬门控
7. 更新文档
8. 关闭循环

---

### 7.2 BMM 模式（端到端工作流）

**适用场景**：需求发现到实现的较大更改

**核心文档**：Quick 模式文档 + openspec-sync.md

**变更记录**：
- openspec/changes/{change-name}/
- 最小文件：README.md, proposal.md, tasks.md
- 设计文档：design.md（架构变更时）

**工作序列**：
1. 检查当前代码和文档
2. 定义问题、非目标、范围、验收标准
3. 起草变更记录
4. 声明验证包
5. 工作分解为里程碑
6. 设计每个里程碑
7. 记录里程碑
8. 一次实现一个里程碑
9. 记录架构决策
10. 角色评审
11. 同步里程碑进度
12. 验证和归档

---

## 八、总结

### 8.1 关键要点

1. **团队是最高级组织单位**：一个团队包含多个角色
2. **角色具有明确职责**：每个角色有 Soul 定义和技能堆栈
3. **技能通过工具实现**：AI 模型或外部软件工具
4. **阶段决定参与度**：概念验证阶段角色少，生产开发阶段角色多
5. **协作关系清晰**：委托和升级路径明确

### 8.2 应用场景

**概念验证阶段**：
- 专注于创意验证
- 快速迭代
- 使用 brainstorm、prototype、design-review
- 约 8-10 个核心角色参与

**生产开发阶段**：
- 完整实现
- 严格质量标准
- 使用 code-review、design-review、release-checklist、perf-profile
- 约 40-50 个角色参与

---

*文档创建完成*
*创建时间：2026-04-24*
*基于：OpenAgenticGame-Studios RAMS 分析*
