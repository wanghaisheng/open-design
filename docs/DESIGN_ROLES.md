# Design Roles 说明

基于 Designpowers 项目分析，以下是设计角色（Agents）的详细说明以及它们与 Skills 的对应关系。

## Roles 概览（10个）

| Role | 职责 |
|-------|------|
| **design-strategist** | 上游设计思维 - 用户流程、IA、旅程映射、人物画像、设计原则 |
| **design-scout** | 竞争UX分析、设计基准、用户洞察综合、设计模式研究、无障碍审计 |
| **inspiration-scout** | 美学参考、交互示例、视觉灵感 |
| **design-lead** | 视觉设计执行 - 布局、色彩系统、排版、组件设计、响应式行为、交互模式、设计系统工作 |
| **motion-designer** | 动画和动效设计 - 微交互、页面过渡、滚动驱动动画、加载状态、弹簧物理、缓动曲线、编排 |
| **content-writer** | UX写作、界面文案、标签、错误消息、空状态、引导文本、帮助文本、工具提示、alt文本、链接文本、表单说明 |
| **design-builder** | 生产就绪的原型和实现 - 组件组装、交互连接、API集成、项目脚手架、设计决策到工作软件的桥梁 |
| **accessibility-reviewer** | 无障碍设计合规评审 - WCAG、COGA、包容性设计原则 |
| **heuristic-evaluator** | 启式评估 - Nielsen's 10可用性启发式、认知走查 |
| **design-critic** | 设计评审 - 对照原始计划、设计简报、设计原则评审 |

## Skills × Roles Matrix

| Skill | design-strategist | design-scout | inspiration-scout | design-lead | motion-designer | content-writer | design-builder | accessibility-reviewer | heuristic-evaluator | design-critic |
|-------|------------------|--------------|-------------------|-------------|-----------------|----------------|----------------|----------------------|---------------------|---------------|
| **design-discovery** | ✅ | ✅ | | | | | | | | |
| **research-planning** | ✅ | ✅ | | | | | | | | |
| **inclusive-personas** | ✅ | | | | | | | | | |
| **inspiration-scouting** | | | ✅ | | | | | | | |
| **synthetic-user-testing** | | ✅ | | | | | | | ✅ | |
| **usability-testing** | | ✅ | | | | | | | ✅ | |
| **design-strategy** | ✅ | | | | | | | | | |
| **design-state** | ✅ | | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **design-memory** | ✅ | | | | | | | | | |
| **design-taste** | | | ✅ | ✅ | | | | | | ✅ |
| **taste-feedback** | | | | ✅ | | | | | | ✅ |
| **token-architecture** | | | | ✅ | | | ✅ | | | |
| **design-system-alignment** | | | | ✅ | | | ✅ | | | |
| **ui-composition** | | | | ✅ | | | | | | |
| **responsive-patterns** | | | | ✅ | | | ✅ | | | |
| **interaction-design** | | | | ✅ | ✅ | | ✅ | | | |
| **motion-choreography** | | | | | ✅ | | ✅ | | | |
| **voice-and-tone** | | | | | | ✅ | | | | |
| **writing-design-plans** | ✅ | | | | | ✅ | | | | |
| **accessible-content** | | | | | | ✅ | | ✅ | | |
| **cognitive-accessibility** | | | | | | | | ✅ | | |
| **adaptive-interfaces** | | | | ✅ | | | | ✅ | | |
| **design-debate** | | | | | | | | | | ✅ |
| **design-debt-tracker** | | | | | | | | | | ✅ |
| **design-retrospective** | | | | | | | | | | ✅ |
| **design-handoff** | | | | | | | ✅ | | | |
| **designpowers-critique** | | | | | | | | | | ✅ |
| **verification-before-shipping** | | | | | | | ✅ | ✅ | ✅ | |
| **using-designpowers** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Role 详细说明

### design-strategist
**职责范围：** 上游设计思维
- 用户流程设计
- 信息架构（IA）
- 旅程映射
- 人物画像开发
- 设计原则定义
- 体验映射
- 竞品定位

**核心 Skills：**
- design-discovery
- inclusive-personas
- design-strategy
- design-state
- design-memory
- research-planning
- writing-design-plans
- using-designpowers

### design-scout
**职责范围：** 竞争UX分析和设计研究
- 竞争UX分析
- 设计基准
- 用户洞察综合
- 设计模式研究
- 无障碍审计
- 趋势识别

**核心 Skills：**
- design-discovery
- research-planning
- synthetic-user-testing
- usability-testing
- using-designpowers

### inspiration-scout
**职责范围：** 美学参考和视觉灵感
- 美学研究
- 交互参考
- 跨领域灵感
- 品味感知策展
- 情绪板组装

**核心 Skills：**
- inspiration-scouting
- design-state
- design-taste
- using-designpowers

### design-lead
**职责范围：** 视觉设计执行
- 布局网格
- 色彩系统
- 排版系统
- 组件设计
- 响应式行为
- 交互模式
- 设计系统工作
- 自适应设计
- 工艺和品味

**核心 Skills：**
- design-state
- design-taste
- taste-feedback
- token-architecture
- design-system-alignment
- ui-composition
- responsive-patterns
- interaction-design
- adaptive-interfaces
- using-designpowers

### motion-designer
**职责范围：** 动画和动效设计
- 微交互
- 页面过渡
- 滚动驱动动画
- 加载状态
- 弹簧物理
- 缓动曲线
- 编排
- 减少运动替代方案
- 性能

**核心 Skills：**
- design-state
- interaction-design
- motion-choreography
- using-designpowers

### content-writer
**职责范围：** UX写作和界面文案
- 界面标签
- 错误消息
- 空状态
- 帮助文本
- 引导文本
- 工具提示
- alt文本
- 链接文本
- 表单说明
- 内容审查

**核心 Skills：**
- design-state
- voice-and-tone
- writing-design-plans
- accessible-content
- using-designpowers

### design-builder
**职责范围：** 生产就绪的原型和实现
- 组件实现
- 页面组装
- 交互连接
- 原型构建
- 设计到代码翻译
- 渐进增强
- 性能优化

**核心 Skills：**
- design-state
- token-architecture
- design-system-alignment
- responsive-patterns
- interaction-design
- motion-choreography
- design-handoff
- verification-before-shipping
- using-designpowers

### accessibility-reviewer
**职责范围：** 无障碍设计合规评审
- WCAG评估
- 认知无障碍
- 包容性交互
- 自适应设计
- 内容无障碍

**核心 Skills：**
- design-state
- accessible-content
- cognitive-accessibility
- adaptive-interfaces
- verification-before-shipping
- using-designpowers

### heuristic-evaluator
**职责范围：** 启发式评估
- 启发式评估（Nielsen's 10）
- 认知走查
- 错误路径分析
- 可学性评估
- 效率评估

**核心 Skills：**
- synthetic-user-testing
- usability-testing
- verification-before-shipping
- using-designpowers

### design-critic
**职责范围：** 设计评审
- 计划对齐
- 简报对齐
- 原则遵循
- 一致性
- 用户画像覆盖
- 差距识别
- 工艺质量

**核心 Skills：**
- design-state
- design-taste
- taste-feedback
- design-debate
- design-debt-tracker
- design-retrospective
- designpowers-critique
- using-designpowers
