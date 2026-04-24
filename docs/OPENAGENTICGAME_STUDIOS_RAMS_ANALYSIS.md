# OpenAgenticGame-Studios RAMS 框架分析

基于 OpenAgenticGame-Studios 项目的 RAMS 框架映射分析，提取游戏开发策划领域的 Soul、Role、Skill、Tool 等元素。

---

## 一、项目概述

### 项目信息
- **项目名称**：OpenAgenticGame-Studios
- **架构特点**：通用参考系统（Universal Reference System）
- **AI 平台兼容**：Claude Code、Cursor、Windsurf 及未来 AI IDE
- **开发框架**：BMAD + OpenSpec + Harness

### 统计数据
- **角色（Agents）**：85 个，组织成 9 个团队
- **技能（Skills）**：72 个通用技能
- **规则（Rules）**：12 个编码标准和质量规则
- **工作流（Workflows）**：Quick/BMM 模式 + 支持工作流
- **引擎支持**：Unity、Godot、Unreal、Cocos Creator

---

## 二、角色（Agents）分类与 RAMS 映射

### 2.1 Leadership Team（领导团队）- 7 个角色

#### creative-director（创意总监）
**RAMS Role 映射**：创意总监
**Soul 特质**：
- 最高创意权威，维护游戏愿景一致性
- 基于玩家心理学、设计理论做决策
- 支柱方法论：3-5 个不可协商的设计原则
- 决策框架：MDA 美学层次、自我决定理论、心流状态设计
- 范围仲裁：支柱邻近度测试

**Skills**：
- brainstorm（创意头脑风暴）
- design-review（设计评审）

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**Model**：opus
**协作关系**：委托给 game-designer、art-director、audio-director、narrative-director

---

#### technical-director（技术总监）
**RAMS Role 映射**：技术总监
**Soul 特质**：
- 技术战略和架构决策
- 引擎版本、技术栈选择
- 技术债务管理
- 性能预算和质量标准

**Tools**：Read, Glob, Grep, Write, Edit, Bash, Task
**协作关系**：报告给 producer，协调 lead-programmer

---

#### producer（制作人）
**RAMS Role 映射**：制作人
**Soul 特质**：
- 项目管理和交付
- 调度、资源分配
- 跨部门协调
- 风险管理

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：协调所有部门

---

#### art-director（艺术总监）
**RAMS Role 映射**：艺术总监
**Soul 特质**：
- 视觉方向和艺术风格
- 资产审批
- 艺术团队协调

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 creative-director

---

#### audio-director（音频总监）
**RAMS Role 映射**：音频总监
**Soul 特质**：
- 音频方向和声音设计
- 音乐和音效协调
- 音频团队管理

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 creative-director

---

#### narrative-director（叙事总监）
**RAMS Role 映射**：叙事总监
**Soul 特质**：
- 故事和叙事愿景
- 剧本和对话审批
- 叙事团队协调

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 creative-director

---

#### game-vision-architect（游戏愿景架构师）
**RAMS Role 映射**：游戏愿景架构师
**Soul 特质**：
- 长期愿景维护
- 战略决策
- 愿景一致性

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：跨阶段支持

---

### 2.2 Programming Team（编程团队）- 29 个角色

#### 核心编程角色

##### lead-programmer（首席程序员）
**RAMS Role 映射**：首席程序员
**Soul 特质**：
- 技术领导力
- 代码标准和架构
- 团队技术指导

**Tools**：Read, Glob, Grep, Write, Edit, Bash, Task
**协作关系**：报告给 technical-director

---

##### gameplay-programmer（游戏玩法程序员）
**RAMS Role 映射**：游戏玩法程序员
**Soul 特质**：
- 游戏机制实现
- 玩法系统开发
- 游戏逻辑编程

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 lead-programmer

---

##### engine-programmer（引擎程序员）
**RAMS Role 映射**：引擎程序员
**Soul 特质**：
- 引擎级编程
- 渲染系统
- 性能优化

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 lead-programmer

---

##### ai-programmer（AI 程序员）
**RAMS Role 映射**：AI 程序员
**Soul 特质**：
- AI 系统实现
- 行为树、状态机
- AI 性能优化

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 lead-programmer

---

##### network-programmer（网络程序员）
**RAMS Role 映射**：网络程序员
**Soul 特质**：
- 多人游戏系统
- 网络同步
- 安全性

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 lead-programmer

---

##### ui-programmer（UI 程序员）
**RAMS Role 映射**：UI 程序员
**Soul 特质**：
- UI 系统实现
- 用户界面编程
- 可访问性

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 lead-programmer

---

##### tools-programmer（工具程序员）
**RAMS Role 映射**：工具程序员
**Soul 特质**：
- 开发工具
- 编辑器扩展
- 自动化工具

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 lead-programmer

---

#### 引擎专家角色

##### Unity 专家系列
- **unity-specialist**：Unity 专家
- **unity-dots-specialist**：Unity DOTS/ECS 专家
- **unity-addressables-specialist**：Unity Addressables 专家
- **unity-shader-specialist**：Unity Shader 专家
- **unity-ui-specialist**：Unity UI 专家
- **unity-development-specialist**：Unity 开发专家
- **unity-skills-automation**：Unity 技能自动化
- **unity-asset-guidelines-specialist**：Unity 资产指南专家

##### Godot 专家系列
- **godot-specialist**：Godot 专家
- **godot-gdscript-specialist**：Godot GDScript 专家
- **godot-gdextension-specialist**：Godot GDExtension 专家
- **godot-shader-specialist**：Godot Shader 专家
- **godot-full-stack-specialist**：Godot 全栈专家

##### Unreal 专家系列
- **unreal-specialist**：Unreal 专家
- **ue-blueprint-specialist**：UE Blueprint 专家
- **ue-gas-specialist**：UE GAS 专家
- **ue-replication-specialist**：UE Replication 专家
- **ue-umg-specialist**：UE UMG 专家

##### Cocos Creator 专家系列
- **cocos-creator-specialist**：Cocos Creator 专家
- **cocos-skills-automation**：Cocos 技能自动化

#### 其他编程角色
- **skill-creation-specialist**：技能创建专家

---

### 2.3 Design Team（设计团队）- 13 个角色

#### game-designer（游戏设计师）
**RAMS Role 映射**：游戏设计师
**Soul 特质**：
- 机制和系统设计
- 核心循环设计
- 平衡框架
- 玩家体验映射
- 边缘情况文档化

**Skills**：design-review, balance-check, brainstorm
**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**Model**：sonnet
**协作关系**：报告给 creative-director，委托给 systems-designer、level-designer、economy-designer

---

#### systems-designer（系统设计师）
**RAMS Role 映射**：系统设计师
**Soul 特质**：
- 游戏系统设计
- 交互系统
- 系统平衡

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 game-designer

---

#### level-designer（关卡设计师）
**RAMS Role 映射**：关卡设计师
**Soul 特质**：
- 关卡创建
- 空间设计
- 遭遇设计

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 game-designer

---

#### economy-designer（经济设计师）
**RAMS Role 映射**：经济设计师
**Soul 特质**：
- 经济系统设计
- 战利品表
- 进阶曲线校准

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 game-designer

---

#### world-builder（世界构建者）
**RAMS Role 映射**：世界构建者
**Soul 特质**：
- 世界创建
- 环境设计
- 世界逻辑

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 game-designer

---

#### writer（编剧）
**RAMS Role 映射**：编剧
**Soul 特质**：
- 叙事内容
- 对话编写
- 故事设计

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 narrative-director

---

#### live-ops-designer（运营设计师）
**RAMS Role 映射**：运营设计师
**Soul 特质**：
- 实时运营
- 活动设计
- 长期内容更新

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 game-designer

---

#### 设计框架角色
- **aesthetic-direction-framework**：美学方向框架
- **core-loop-designer**：核心循环设计师
- **design-coherence-engine**：设计一致性引擎
- **competitive-analysis-specialist**：竞争分析专家
- **narrative-game-generator**：叙事游戏生成器

---

### 2.4 Art Team（艺术团队）- 11 个角色

#### technical-artist（技术美术）
**RAMS Role 映射**：技术美术
**Soul 特质**：
- 桥接艺术和工程
- Shader 开发
- VFX 系统设计
- 渲染优化
- 资产管道
- 视觉质量/性能平衡

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**Model**：sonnet
**协作关系**：报告给 art-director 和 lead-programmer

---

#### ux-designer（UX 设计师）
**RAMS Role 映射**：UX 设计师
**Soul 特质**：
- 用户体验设计
- 用户流程
- 可访问性

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 art-director

---

#### accessibility-specialist（无障碍专家）
**RAMS Role 映射**：无障碍专家
**Soul 特质**：
- 无障碍功能
- 包容性设计
- 辅助技术

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 ux-designer

---

#### sound-designer（声音设计师）
**RAMS Role 映射**：声音设计师
**Soul 特质**：
- 音效设计
- 音频资产
- 声音实现

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 audio-director

---

#### Enhanced 艺术角色
- **enhanced-art-director**：增强艺术总监
- **enhanced-composer**：增强作曲家
- **enhanced-sound-designer**：增强声音设计师
- **enhanced-technical-artist**：增强技术美术
- **enhanced-ui-specialist**：增强 UI 专家
- **enhanced-ux-designer**：增强 UX 设计师

---

### 2.5 QA Team（质量保证团队）- 7 个角色

#### qa-lead（QA 负责人）
**RAMS Role 映射**：QA 负责人
**Soul 特质**：
- 测试策略
- Bug 分类
- 发布质量门控
- 测试流程设计

**Skills**：bug-report, release-checklist
**Tools**：Read, Glob, Grep, Write, Edit, Bash
**Model**：sonnet
**协作关系**：报告给 producer 和 technical-director，委托给 qa-tester

---

#### qa-tester（QA 测试员）
**RAMS Role 映射**：QA 测试员
**Soul 特质**：
- 测试用例编写
- 测试执行
- Bug 报告

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 qa-lead

---

#### performance-analyst（性能分析师）
**RAMS Role 映射**：性能分析师
**Soul 特质**：
- 性能测试
- 性能分析
- 优化建议

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 qa-lead

---

#### game-quality-gates-specialist（游戏质量门控专家）
**RAMS Role 映射**：游戏质量门控专家
**Soul 特质**：
- 质量标准
- 质量门控
- 质量自动化

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：跨阶段支持

---

#### Enhanced QA 角色
- **enhanced-performance-analyst**：增强性能分析师
- **enhanced-qa-tester**：增强 QA 测试员

---

### 2.6 Production Team（制作团队）- 13 个角色

#### release-manager（发布经理）
**RAMS Role 映射**：发布经理
**Soul 特质**：
- 发布管道
- 认证检查清单
- 商店提交
- 平台要求
- 版本号管理
- 发布日协调

**Skills**：release-checklist, changelog, patch-notes
**Tools**：Read, Glob, Grep, Write, Edit, Bash
**Model**：sonnet
**协作关系**：报告给 producer，协调 devops-engineer、qa-lead、community-manager

---

#### localization-lead（本地化负责人）
**RAMS Role 映射**：本地化负责人
**Soul 特质**：
- 本地化管理
- 翻译协调
- 文化适配

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 producer

---

#### community-manager（社区经理）
**RAMS Role 映射**：社区经理
**Soul 特质**：
- 社区管理
- 社区参与
- 社区沟通

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 producer

---

#### analytics-engineer（分析工程师）
**RAMS Role 映射**：分析工程师
**Soul 特质**：
- 玩家分析
- 数据分析
- 分析报告

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 producer

---

#### devops-engineer（DevOps 工程师）
**RAMS Role 映射**：DevOps 工程师
**Soul 特质**：
- 部署操作
- CI/CD 管道
- 基础设施

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 producer

---

#### security-engineer（安全工程师）
**RAMS Role 映射**：安全工程师
**Soul 特质**：
- 安全措施
- 安全审计
- 漏洞修复

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 producer

---

#### prototyper（原型制作者）
**RAMS Role 映射**：原型制作者
**Soul 特质**：
- 持续原型制作
- 功能原型
- 快速验证

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 producer

---

#### Enhanced 制作角色
- **enhanced-community-manager**：增强社区经理
- **enhanced-devops-engineer**：增强 DevOps 工程师
- **enhanced-prototyper**：增强原型制作者
- **enhanced-release-manager**：增强发布经理
- **enhanced-security-engineer**：增强安全工程师

---

### 2.7 Publish Team（发布团队）- 7 个角色

#### store-submission-specialist（商店提交专家）
**RAMS Role 映射**：商店提交专家
**Soul 特质**：
- 商店提交
- 商店政策
- 提交流程

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 release-manager

---

#### platform-certification-specialist（平台认证专家）
**RAMS Role 映射**：平台认证专家
**Soul 特质**：
- 平台认证
- TRC/TCR/Lotcheck
- 认证要求

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 release-manager

---

#### release-coordinator（发布协调员）
**RAMS Role 映射**：发布协调员
**Soul 特质**：
- 发布协调
- 发布计划
- 发布执行

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 release-manager

---

#### publish-quality-gates（发布质量门控）
**RAMS Role 映射**：发布质量门控
**Soul 特质**：
- 发布质量标准
- 质量门控
- 发布验证

**Tools**：Read, Glob, Grep, Write, Edit
**协作关系**：报告给 release-manager

---

#### store-page-optimizer（商店页面优化师）
**RAMS Role 映射**：商店页面优化师
**Soul 特质**：
- 商店页面优化
- 转化率优化
- 页面设计

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 release-manager

---

#### platform-relationship-manager（平台关系经理）
**RAMS Role 映射**：平台关系经理
**Soul 特质**：
- 平台关系
- 平台沟通
- 平台合作

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 release-manager

---

### 2.8 Support Team（支持团队）- 2 个角色

#### enhanced-analytics-engineer（增强分析工程师）
**RAMS Role 映射**：增强分析工程师
**Soul 特质**：
- 高级分析
- 数据挖掘
- 预测分析

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 analytics-engineer

---

#### enhanced-network-engineer（增强网络工程师）
**RAMS Role 映射**：增强网络工程师
**Soul 特质**：
- 高级网络
- 网络架构
- 网络安全

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 network-programmer

---

### 2.9 Enhanced Team（增强团队）- 4 个角色

#### enhanced-game-designer（增强游戏设计师）
**RAMS Role 映射**：增强游戏设计师
**Soul 特质**：
- 高级游戏设计
- 设计创新
- 设计领导

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 game-designer

---

#### enhanced-tool-developer（增强工具开发者）
**RAMS Role 映射**：增强工具开发者
**Soul 特质**：
- 高级工具开发
- 工具创新
- 工具架构

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 tools-programmer

---

#### enhanced-art-director（增强艺术总监）
**RAMS Role 映射**：增强艺术总监
**Soul 特质**：
- 高级艺术指导
- 艺术创新
- 艺术领导

**Tools**：Read, Glob, Grep, Write, Edit, WebSearch
**协作关系**：报告给 art-director

---

#### enhanced-network-engineer（增强网络工程师）
**RAMS Role 映射**：增强网络工程师
**Soul 特质**：
- 高级网络工程
- 网络架构
- 网络安全

**Tools**：Read, Glob, Grep, Write, Edit, Bash
**协作关系**：报告给 network-programmer

---

## 三、技能（Skills）分类与 RAMS 映射

### 3.1 Reviews & Analysis（评审与分析）

#### design-review（设计评审）
**RAMS Skill 映射**：设计评审
**实现渠道**：AI 模型渠道
**功能**：评审游戏设计文档的完整性、内部一致性、可实现性
**输入**：设计文档路径
**输出**：评审报告（完整性、一致性、可实现性、平衡性、建议、结论）
**检查清单**：
- Overview 部分
- Player Fantasy 部分
- Detailed Rules 部分
- Formulas 部分
- Edge Cases 部分
- Dependencies 部分
- Tuning Knobs 部分
- Acceptance Criteria 部分

---

#### code-review（代码评审）
**RAMS Skill 映射**：代码评审
**实现渠道**：AI 模型渠道
**功能**：架构和质量代码评审
**输入**：文件或目录路径
**输出**：评审报告（标准合规性、架构、SOLID、游戏特定问题、正面观察、必需更改、建议、结论）
**检查项**：
- 编码标准合规性
- 架构合规性
- SOLID 原则
- 游戏开发特定问题（帧率独立性、热路径无分配、空/空状态处理、线程安全、资源清理）

---

#### balance-check（平衡检查）
**RAMS Skill 映射**：平衡检查
**实现渠道**：AI 模型渠道
**功能**：游戏平衡性检查

---

#### asset-audit（资产审计）
**RAMS Skill 映射**：资产审计
**实现渠道**：AI 模型渠道
**功能**：资产审计和质量检查

---

#### scope-check（范围检查）
**RAMS Skill 映射**：范围检查
**实现渠道**：AI 模型渠道
**功能**：项目范围检查

---

#### perf-profile（性能分析）
**RAMS Skill 映射**：性能分析
**实现渠道**：AI 模型渠道
**功能**：性能分析和优化建议

---

#### tech-debt（技术债务）
**RAMS Skill 映射**：技术债务管理
**实现渠道**：AI 模型渠道
**功能**：技术债务识别和管理

---

### 3.2 Production（制作）

#### sprint-plan（冲刺计划）
**RAMS Skill 映射**：冲刺计划
**实现渠道**：AI 模型渠道
**功能**：创建冲刺计划

---

#### milestone-review（里程碑评审）
**RAMS Skill 映射**：里程碑评审
**实现渠道**：AI 模型渠道
**功能**：里程碑评审和回顾

---

#### estimate（估算）
**RAMS Skill 映射**：工作量估算
**实现渠道**：AI 模型渠道
**功能**：工作量估算

---

#### retrospective（回顾）
**RAMS Skill 映射**：回顾会议
**实现渠道**：AI 模型渠道
**功能**：冲刺回顾和总结

---

#### bug-report（Bug 报告）
**RAMS Skill 映射**：Bug 报告
**实现渠道**：AI 模型渠道
**功能**：Bug 报告编写

---

### 3.3 Project Management（项目管理）

#### start（开始）
**RAMS Skill 映射**：项目启动
**实现渠道**：AI 模型渠道
**功能**：项目启动引导流程
**参数**：[游戏概念或 'open' 从零开始]
**流程**：
1. 检查现有概念工作
2. 创意发现阶段
3. 概念生成阶段
4. 核心循环设计
5. 支柱和边界定义
6. 玩家类型验证
7. 范围和可行性

---

#### project-stage-detect（项目阶段检测）
**RAMS Skill 映射**：项目阶段检测
**实现渠道**：AI 模型渠道
**功能**：检测项目当前阶段

---

#### reverse-document（反向文档）
**RAMS Skill 映射**：反向文档生成
**实现渠道**：AI 模型渠道
**功能**：从代码反向生成文档

---

#### gate-check（门控检查）
**RAMS Skill 映射**：质量门控检查
**实现渠道**：AI 模型渠道
**功能**：质量门控检查

---

#### design-systems（设计系统）
**RAMS Skill 映射**：设计系统分解
**实现渠道**：AI 模型渠道
**功能**：将概念分解为独立系统

---

### 3.4 Release（发布）

#### release-checklist（发布检查清单）
**RAMS Skill 映射**：发布检查清单
**实现渠道**：AI 模型渠道
**功能**：发布前检查清单

---

#### launch-checklist（启动检查清单）
**RAMS Skill 映射**：启动检查清单
**实现渠道**：AI 模型渠道
**功能**：游戏启动检查清单

---

#### changelog（变更日志）
**RAMS Skill 映射**：变更日志生成
**实现渠道**：AI 模型渠道
**功能**：生成变更日志

---

#### patch-notes（补丁说明）
**RAMS Skill 映射**：补丁说明生成
**实现渠道**：AI 模型渠道
**功能**：生成补丁说明

---

#### hotfix（热修复）
**RAMS Skill 映射**：热修复流程
**实现渠道**：AI 模型渠道
**功能**：热修复流程管理

---

### 3.5 Creative（创意）

#### brainstorm（头脑风暴）
**RAMS Skill 映射**：创意头脑风暴
**实现渠道**：AI 模型渠道
**功能**：引导游戏概念创意
**参数**：[类型或主题提示，或 'open' 完全开放]
**流程**：
1. 创意发现（情感锚点、品味概况、实际约束）
2. 概念生成（动词优先设计、混搭方法、体验优先设计）
3. 核心循环设计（30秒循环、5分钟循环、会话循环、进阶循环）
4. 支柱和边界（3-5 个支柱、3+ 反支柱）
5. 玩家类型验证（Bartle 分类、Quantic Foundry 动机模型）
6. 范围和可行性（引擎推荐、艺术管道、内容范围、MVP 定义）

---

#### playtest-report（试玩报告）
**RAMS Skill 映射**：试玩报告
**实现渠道**：AI 模型渠道
**功能**：试玩报告生成

---

#### prototype（原型）
**RAMS Skill 映射**：原型制作
**实现渠道**：AI 模型渠道
**功能**：原型制作指导

---

#### onboard（入职）
**RAMS Skill 映射**：入职引导
**实现渠道**：AI 模型渠道
**功能**：新成员入职引导

---

#### localize（本地化）
**RAMS Skill 映射**：本地化
**实现渠道**：AI 模型渠道
**功能**：游戏本地化

---

### 3.6 Team Orchestration（团队编排）

#### team-combat（战斗团队）
**RAMS Skill 映射**：战斗系统团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理开发战斗系统

---

#### team-narrative（叙事团队）
**RAMS Skill 映射**：叙事团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理开发叙事系统

---

#### team-ui（UI 团队）
**RAMS Skill 映射**：UI 团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理开发 UI 系统

---

#### team-release（发布团队）
**RAMS Skill 映射**：发布团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理进行发布

---

#### team-polish（打磨团队）
**RAMS Skill 映射**：打磨团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理进行游戏打磨

---

#### team-audio（音频团队）
**RAMS Skill 映射**：音频团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理开发音频系统

---

#### team-level（关卡团队）
**RAMS Skill 映射**：关卡团队编排
**实现渠道**：AI 模型渠道
**功能**：协调多个代理开发关卡

---

### 3.7 Engine-Specific（引擎特定）

#### godot（Godot）
**RAMS Skill 映射**：Godot 引擎技能
**实现渠道**：AI 模型渠道
**功能**：Godot 引擎相关任务

---

#### unity-skills（Unity 技能）
**RAMS Skill 映射**：Unity 引擎技能
**实现渠道**：AI 模型渠道
**功能**：Unity 引擎相关任务

---

#### cocos-skills（Cocos 技能）
**RAMS Skill 映射**：Cocos Creator 技能
**实现渠道**：AI 模型渠道
**功能**：Cocos Creator 引擎相关任务

---

#### claude_skill_unity（Claude Unity 技能）
**RAMS Skill 映射**：Claude Unity 技能
**实现渠道**：AI 模型渠道
**功能**：Claude Code Unity 技能

---

### 3.8 Design Framework（设计框架）

#### aesthetic-direction-framework（美学方向框架）
**RAMS Skill 映射**：美学方向框架
**实现渠道**：AI 模型渠道
**功能**：美学哲学和美学一致性

---

#### core-loop-designer（核心循环设计师）
**RAMS Skill 映射**：核心循环设计
**实现渠道**：AI 模型渠道
**功能**：核心循环优化和玩家留存

---

#### design-coherence-engine（设计一致性引擎）
**RAMS Skill 映射**：设计一致性引擎
**实现渠道**：AI 模型渠道
**功能**：系统对齐和设计质量

---

#### game-vision-architect（游戏愿景架构师）
**RAMS Skill 映射**：游戏愿景架构师
**实现渠道**：AI 模型渠道
**功能**：愿景维护和长期战略

---

### 3.9 Other Skills（其他技能）

#### architecture-decision（架构决策）
**RAMS Skill 映射**：架构决策记录
**实现渠道**：AI 模型渠道
**功能**：架构决策记录（ADR）

---

#### competitive-analysis（竞争分析）
**RAMS Skill 映射**：竞争分析
**实现渠道**：AI 模型渠道
**功能**：市场分析和定位

---

#### design-iteration-tracker（设计迭代追踪）
**RAMS Skill 映射**：设计迭代追踪
**实现渠道**：AI 模型渠道
**功能**：设计迭代追踪

---

#### design-pillars-architect（设计支柱架构师）
**RAMS Skill 映射**：设计支柱架构师
**实现渠道**：AI 模型渠道
**功能**：设计支柱创建和维护

---

#### doTween-unity（DoTween Unity）
**RAMS Skill 映射**：DoTween 动画
**实现渠道**：软件工具渠道
**功能**：Unity DoTween 动画系统

---

#### economy-progression-designer（经济进阶设计师）
**RAMS Skill 映射**：经济进阶设计
**实现渠道**：AI 模型渠道
**功能**：经济系统和进阶设计

---

#### game-balance-analyst（游戏平衡分析师）
**RAMS Skill 映射**：游戏平衡分析
**实现渠道**：AI 模型渠道
**功能**：游戏平衡分析

---

#### game-market-analyst（游戏市场分析师）
**RAMS Skill 映射**：游戏市场分析
**实现渠道**：AI 模型渠道
**功能**：游戏市场分析

---

#### game-quality-gates（游戏质量门控）
**RAMS Skill 映射**：游戏质量门控
**实现渠道**：AI 模型渠道
**功能**：质量标准和自动化

---

#### gate-check（门控检查）
**RAMS Skill 映射**：门控检查
**实现渠道**：AI 模型渠道
**功能**：质量门控检查

---

#### gdd-author（GDD 作者）
**RAMS Skill 映射**：GDD 编写
**实现渠道**：AI 模型渠道
**功能**：游戏设计文档编写

---

#### high-concept-pitch-writer（高概念提案编写者）
**RAMS Skill 映射**：高概念提案编写
**实现渠道**：AI 模型渠道
**功能**：高概念提案编写

---

#### level-encounter-planner（关卡遭遇规划师）
**RAMS Skill 映射**：关卡遭遇规划
**实现渠道**：AI 模型渠道
**功能**：关卡遭遇规划

---

#### media-pipe-unity-skill（MediaPipe Unity 技能）
**RAMS Skill 映射**：MediaPipe Unity
**实现渠道**：软件工具渠道
**功能**：Unity MediaPipe 计算机视觉

---

#### narrative-systems-designer（叙事系统设计师）
**RAMS Skill 映射**：叙事系统设计
**实现渠道**：AI 模型渠道
**功能**：叙事系统设计

---

#### patch-notes（补丁说明）
**RAMS Skill 映射**：补丁说明
**实现渠道**：AI 模型渠道
**功能**：补丁说明生成

---

#### player-experience-modeler（玩家体验建模师）
**RAMS Skill 映射**：玩家体验建模
**实现渠道**：AI 模型渠道
**功能**：玩家体验建模

---

#### playtest-protocol-designer（试玩协议设计师）
**RAMS Skill 映射**：试玩协议设计
**实现渠道**：AI 模型渠道
**功能**：试玩协议设计

---

#### prime-tween-unity（Prime Tween Unity）
**RAMS Skill 映射**：Prime Tween 动画
**实现渠道**：软件工具渠道
**功能**：Unity Prime Tween 动画系统

---

#### prototype-scope-definer（原型范围定义者）
**RAMS Skill 映射**：原型范围定义
**实现渠道**：AI 模型渠道
**功能**：原型范围定义

---

#### rules-formalizer（规则形式化）
**RAMS Skill 映射**：规则形式化
**实现渠道**：AI 模型渠道
**功能**：规则形式化

---

#### scope-feature-prioritizer（范围功能优先级排序）
**RAMS Skill 映射**：范围功能优先级排序
**实现渠道**：AI 模型渠道
**功能**：功能优先级排序

---

#### setup-engine（引擎设置）
**RAMS Skill 映射**：引擎设置
**实现渠道**：AI 模型渠道
**功能**：引擎配置和设置

---

#### skill-creator（技能创建者）
**RAMS Skill 映射**：技能创建
**实现渠道**：AI 模型渠道
**功能**：新技能创建

---

#### systems-interaction-mapper（系统交互映射器）
**RAMS Skill 映射**：系统交互映射
**实现渠道**：AI 模型渠道
**功能**：系统交互映射

---

#### technical-design-bridge（技术设计桥梁）
**RAMS Skill 映射**：技术设计桥梁
**实现渠道**：AI 模型渠道
**功能**：技术和设计之间的桥梁

---

#### ui-ux-systems-designer（UI/UX 系统设计师）
**RAMS Skill 映射**：UI/UX 系统设计
**实现渠道**：AI 模型渠道
**功能**：UI/UX 系统设计

---

#### unified-agents（统一代理）
**RAMS Skill 映射**：统一代理
**实现渠道**：AI 模型渠道
**功能**：统一代理管理

---

#### unity-asset-guidelines（Unity 资产指南）
**RAMS Skill 映射**：Unity 资产指南
**实现渠道**：AI 模型渠道
**功能**：Unity 资产指南

---

#### unity-asset-guidelines-skill（Unity 资产指南技能）
**RAMS Skill 映射**：Unity 资产指南技能
**实现渠道**：AI 模型渠道
**功能**：Unity 资产指南技能

---

#### world-logic-checker（世界逻辑检查器）
**RAMS Skill 映射**：世界逻辑检查
**实现渠道**：AI 模型渠道
**功能**：世界逻辑检查

---

## 四、规则（Rules）分类与 RAMS 映射

### 4.1 Programming Rules（编程规则）

#### engine-code.md（引擎代码规则）
**RAMS Rule 映射**：引擎代码质量标准
**适用范围**：引擎开发代码
**约束条件**：
- 多引擎支持（Unity、Godot、Unreal、Cocos Creator）
- 引擎特定最佳实践
- 跨引擎兼容性考虑

---

#### gameplay-code.md（游戏玩法代码规则）
**RAMS Rule 映射**：游戏玩法代码质量标准
**适用范围**：游戏玩法代码
**约束条件**：
- 数据驱动值
- Delta time 使用
- 无 UI 引用
- 团队协调

---

#### ui-code.md（UI 代码规则）
**RAMS Rule 映射**：UI 代码质量标准
**适用范围**：UI 代码
**约束条件**：
- 无游戏状态所有权
- 本地化就绪
- 可访问性要求

---

#### ai-code.md（AI 代码规则）
**RAMS Rule 映射**：AI 代码质量标准
**适用范围**：AI 代码
**约束条件**：
- 性能预算
- 可调试性
- 数据驱动参数

---

#### network-code.md（网络代码规则）
**RAMS Rule 映射**：网络代码质量标准
**适用范围**：网络代码
**约束条件**：
- 服务器权威
- 版本化消息
- 安全性

---

### 4.2 Design Rules（设计规则）

#### design-docs.md（设计文档规则）
**RAMS Rule 映射**：设计文档标准
**适用范围**：设计文档
**约束条件**：
- 必需的 8 个部分
- 公式格式
- 边缘情况

---

#### narrative.md（叙事规则）
**RAMS Rule 映射**：叙事设计规则
**适用范围**：叙事内容
**约束条件**：
- 叙事一致性
- 对话格式
- 故事结构

---

### 4.3 Asset Rules（资产规则）

#### data-files.md（数据文件规则）
**RAMS Rule 映射**：数据文件组织标准
**适用范围**：数据文件
**约束条件**：
- 文件组织
- 命名约定
- 格式标准

---

#### shader-code.md（Shader 代码规则）
**RAMS Rule 映射**：Shader 代码质量标准
**适用范围**：Shader 代码
**约束条件**：
- Shader 性能
- 可移植性
- 最佳实践

---

### 4.4 Process Rules（流程规则）

#### prototype-code.md（原型代码规则）
**RAMS Rule 映射**：原型代码标准
**适用范围**：原型代码
**约束条件**：
- 放宽标准
- README 必需
- 假设文档化

---

#### test-standards.md（测试标准）
**RAMS Rule 映射**：测试标准
**适用范围**：测试代码
**约束条件**：
- 测试命名
- 覆盖率要求
- Fixture 模式

---

### 4.5 Coordination Rules（协调规则）

#### team-coordination.md（团队协调规则）
**RAMS Rule 映射**：团队协调规则
**适用范围**：跨团队协作
**约束条件**：
- 协议
- 沟通流程
- 冲突解决

---

## 五、工作流（Workflows）与 RAMS 映射

### 5.1 Quick Workflow（快速工作流）

**RAMS Workflow 映射**：快速实现工作流
**适用场景**：清晰且有界的编码工作
**核心文档**：
- harness.md（工具配置）
- task-sizing.md（任务规模）
- milestone-design.md（里程碑设计）
- work-breakdown.md（工作分解）
- validation-matrix.md（验证矩阵）
- closeout-loop.md（关闭循环）
- executable-guardrails.md（可执行护栏）
- persona-review.md（角色评审）
- adr-rules.md（ADR 规则）
- observability.md（可观察性）
- maturity-checklist.md（成熟度检查清单）

**工作序列**：
1. 检查受影响的代码路径、文档和现有变更记录
2. 检查任务规模和工作分解
3. 在实现扩展之前将任务写为一个里程碑
4. 如果不能陈述一个连贯的里程碑，切换到 BMM
5. 仅实现定义的有界里程碑
6. 运行相关验证命令
7. 应用必需的硬门控
8. 如果更改架构，遵循 ADR 规则
9. 如果路由、SSR、SEO 或生成内容更改，运行构建
10. 对实质性工作使用角色评审
11. 更新受影响的文档
12. 使用关闭循环完成

---

### 5.2 BMM Workflow（BMM 工作流）

**RAMS Workflow 映射**：端到端需求到实现工作流
**适用场景**：需要需求发现、变更框架和实现的较大更改
**核心文档**：与 Quick 相同，加上：
- openspec-sync.md（OpenSpec 同步）
- change-record 模板（proposal.md, design.md, tasks.md）

**变更记录约定**：
- 位置：`openspec/changes/{change-name}/`
- 最小文件：README.md, proposal.md, tasks.md
- 设计文档：当任务更改架构、共享契约或非明显技术行为时添加

**工作序列**：
1. 检查当前代码、文档和现有变更工件
2. 定义问题、非目标、范围、验收标准和成功标准
3. 使用规范检查清单和变更记录模板起草变更记录
4. 前置声明验证包
5. 使用工作分解将工作分解为功能意图和里程碑执行切片
6. 使用里程碑设计设计每个里程碑
7. 在活动变更记录中记录里程碑
8. 一次实现一个里程碑
9. 记录持久架构或工作流决策时使用 ADR 规则
10. 关闭实质性里程碑前使用角色评审
11. 使用 OpenSpec 同步同步里程碑进度和验证状态
12. 使用成熟度检查清单评估重复交付痛点
13. 使用验证完成，需要时使用归档

---

### 5.3 Support Workflows（支持工作流）

#### review.md（评审）
**RAMS Workflow 映射**：评审工作流
**功能**：代码和设计评审

---

#### validate.md（验证）
**RAMS Workflow 映射**：验证工作流
**功能**：验证和质量门控

---

#### archive.md（归档）
**RAMS Workflow 映射**：归档工作流
**功能**：变更记录归档

---

#### hygiene.md（卫生）
**RAMS Workflow 映射**：卫生工作流
**功能**：代码卫生和清理

---

#### spec.md（规范）
**RAMS Workflow 映射**：规范工作流
**功能**：规范编写

---

#### router.md（路由）
**RAMS Workflow 映射**：路由工作流
**功能**：任务路由

---

#### dev.md（开发）
**RAMS Workflow 映射**：开发工作流
**功能**：开发任务

---

---

## 六、与 Godogen 角色体系对比分析

### 6.1 角色覆盖对比

| Godogen 角色 | OpenAgenticGame-Studios 对应角色 | 相似度 |
|-------------|--------------------------------|--------|
| 视觉设计师 | art-director, technical-artist | 80% |
| 技术策划 | game-designer, systems-designer | 90% |
| 技术架构师 | technical-director, lead-programmer | 85% |
| 资产策划 | 未直接对应，部分功能在 game-designer | 40% |
| 技术美术 | technical-artist | 95% |
| Godot 程序员 | godot-specialist, godot-gdscript-specialist | 90% |
| 视觉 QA 工程师 | qa-lead, performance-analyst | 70% |
| 项目经理 | producer, release-manager | 85% |
| 系统架构师 | technical-director, system-architect | 80% |
| 游戏策划 | game-designer | 95% |

### 6.2 技能覆盖对比

| Godogen 技能 | OpenAgenticGame-Studios 对应技能 | 相似度 |
|-------------|--------------------------------|--------|
| generate_visual_reference | brainstorm, aesthetic-direction-framework | 70% |
| design_art_direction | aesthetic-direction-framework | 85% |
| assess_implementation_risks | scope-check, estimate | 75% |
| define_verification_criteria | gate-check, validation-matrix | 80% |
| generate_image_asset | 未直接对应（无第三方工具集成） | 0% |
| generate_animated_sprite | 未直接对应 | 0% |
| convert_image_to_3d_model | 未直接对应 | 0% |
| visual_quality_assurance | design-review, code-review, qa-lead | 60% |
| query_godot_api | godot-specialist | 90% |

### 6.3 架构差异

#### Godogen 特点
- **管道驱动**：7 个明确的管道阶段
- **第三方工具集成**：大量使用外部 AI 服务（Gemini、Grok、Tripo3D）
- **视觉验证优先**：强调视觉 QA
- **预算意识**：资产生成成本管理
- **Godot 专注**：深度集成 Godot 4 C#

#### OpenAgenticGame-Studios 特点
- **团队驱动**：9 个专业团队
- **通用参考系统**：AI 平台无关
- **协作协议**：严格的协作协议（Question → Options → Decision → Draft → Approval）
- **多引擎支持**：Unity、Godot、Unreal、Cocos Creator
- **企业级工作流**：BMAD + OpenSpec + Harness
- **质量门控**：12 个编码标准和质量规则

### 6.4 RAMS 映射差异

#### Godogen 的 RAMS 映射
- **Soul**：强调视觉敏感度、风险优先、预算意识
- **Role**：管道阶段驱动
- **Skill**：大量软件工具渠道（第三方 API）
- **Tool**：asset_gen.py、tripo3d.py、visual_qa.py 等

#### OpenAgenticGame-Studios 的 RAMS 映射
- **Soul**：强调协作协议、决策框架、专业素养
- **Role**：团队层级驱动
- **Skill**：主要是 AI 模型渠道，少量软件工具渠道
- **Tool**：Read, Glob, Grep, Write, Edit, Bash, WebSearch, Task

### 6.5 互补性分析

#### Godogen 优势
- 第三方工具集成丰富
- 视觉 QA 专业化
- 预算管理意识强
- Godot 深度集成

#### OpenAgenticGame-Studios 优势
- 团队结构完整
- 多引擎支持
- 企业级工作流
- 质量标准完善
- AI 平台无关

#### 融合建议
1. **角色融合**：将 Godogen 的资产策划、视觉 QA 工程师补充到 OpenAgenticGame-Studios
2. **技能融合**：将 Godogen 的第三方工具集成技能作为软件工具渠道补充
3. **Soul 融合**：将 Godogen 的预算意识、视觉敏感度融入 OpenAgenticGame-Studios 的 Soul 定义
4. **工作流融合**：将 Godogen 的管道阶段与 OpenAgenticGame-Studios 的团队结构结合

---

## 七、RAMS 框架映射总结

### 7.1 Soul 提取要点

从 OpenAgenticGame-Studios 提取的 Soul 特质：
- **协作协议**：Question → Options → Decision → Draft → Approval
- **决策框架**：MDA 美学层次、自我决定理论、心流状态设计
- **支柱方法论**：3-5 个不可协商的设计原则
- **专业素养**：每个角色都有明确的专业边界和职责
- **质量意识**：12 个编码标准和质量规则

### 7.2 Role 映射要点

- **85 个角色**组织成 9 个团队
- **层级结构**：Leadership → Department Leads → Specialists
- **委托映射**：清晰的委托和升级路径
- **跨团队协调**：Producer 负责跨部门协调

### 7.3 Skill 映射要点

- **72 个技能**分为 9 大类
- **实现渠道**：主要是 AI 模型渠道（Read, Glob, Grep, Write, Edit, WebSearch）
- **软件工具渠道**：少量（Bash, Task）
- **用户可调用**：大部分技能支持用户直接调用（user-invocable: true）

### 7.4 Tool 映射要点

- **基础工具**：Read, Glob, Grep, Write, Edit
- **高级工具**：Bash, WebSearch, Task, AskUserQuestion
- **模型选择**：opus（创意）、sonnet（实现）
- **最大轮次**：20-30 轮

### 7.5 Rule 映射要点

- **12 个规则**分为 5 大类
- **路径范围**：path-scoped（路径范围）
- **质量标准**：编码标准、性能标准、安全标准
- **团队责任**：每个规则包含团队责任部分

### 7.6 Workflow 映射要点

- **Quick 模式**：清晰有界的编码工作
- **BMM 模式**：需求发现到实现的完整工作流
- **支持工作流**：review, validate, archive, hygiene, spec, router, dev
- **核心文档**：harness, task-sizing, milestone-design, work-breakdown, validation-matrix

---

## 八、可复用到 Open Design 的元素

### 8.1 可直接复用的角色

1. **creative-director**：创意总监（与现有 design-lead 互补）
2. **game-designer**：游戏设计师（与现有 game-designer 重合度高）
3. **technical-artist**：技术美术（与现有 technical-artist 重合度高）
4. **qa-lead**：QA 负责人（新增角色）
5. **release-manager**：发布经理（新增角色）
6. **producer**：制作人（新增角色）

### 8.2 可直接复用的技能

1. **brainstorm**：创意头脑风暴
2. **design-review**：设计评审
3. **code-review**：代码评审
4. **sprint-plan**：冲刺计划
5. **milestone-review**：里程碑评审
6. **prototype**：原型制作
7. **team-orchestration**：团队编排（7 个团队技能）

### 8.3 可直接复用的规则

1. **gameplay-code.md**：游戏玩法代码规则
2. **design-docs.md**：设计文档规则
3. **team-coordination.md**：团队协调规则

### 8.4 可直接复用的工作流

1. **Quick Workflow**：快速实现工作流
2. **BMM Workflow**：端到端工作流
3. **Core 文档**：harness, task-sizing, milestone-design, work-breakdown, validation-matrix

---

## 九、建议与下一步

### 9.1 短期建议

1. **补充缺失角色**：将 Godogen 的资产策划、视觉 QA 工程师添加到 Open Design
2. **补充软件工具渠道**：将 Godogen 的第三方工具集成作为软件工具渠道
3. **整合 Soul 定义**：将 OpenAgenticGame-Studios 的协作协议融入 Soul 定义

### 9.2 中期建议

1. **创建团队结构**：参考 OpenAgenticGame-Studios 的 9 团队结构
2. **实现工作流系统**：实现 Quick/BMM 工作流系统
3. **添加质量门控**：实现 12 个编码标准和质量规则

### 9.3 长期建议

1. **多引擎支持**：扩展到 Unity、Unreal、Cocos Creator
2. **通用参考系统**：实现 AI 平台无关的参考系统
3. **企业级工作流**：集成 BMAD + OpenSpec + Harness

---

*分析完成*
*生成时间：2026-04-24*
*分析范围：OpenAgenticGame-Studios 完整项目*
*RAMS 框架映射：85 角色、72 技能、12 规则、多工作流*
