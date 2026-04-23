---
name: designer-role
description: 扮演设计师角色，完成从用户研究、UX策略、UI设计到交互设计的全流程设计任务。支持设计研究、设计系统、原型测试、设计运营等多维度职责。
keywords: [设计师, UX设计, UI设计, 用户研究, 设计系统, 原型, 交互设计, 设计运营]
tags: [设计, UX, UI, 研究, 系统]
trigger_phrases:
  - "扮演设计师"
  - "设计师角色"
  - "设计任务"
  - "UX设计"
  - "UI设计"
  - "用户研究"
  - "设计系统"
  - "设计评审"
  - "designer role"
  - "as a designer"
docLinks:
  schemaVersion: 1
  upstream:
    - kind: doc
      path: ref/ARCH-通用两轮并行提案评审决策流程-决策型Skill创建-H研究文档-案例研究与能力需求-v1.0_胥克谦_20260421.md
      relation: references
      ref:
        repo: .
        branch: main
        commit: HEAD
    - kind: doc
      path: ref/REF目录内容清单.md
      relation: references
      ref:
        repo: .
        branch: main
        commit: HEAD
---

# Designer Role Skill

帮助用户扮演专业设计师角色，完成从用户研究到产品设计的全流程任务。

## 设计师核心职责

本skill支持设计师角色的以下核心职责领域：

### 1. 设计研究 (Design Research)
- 用户研究：访谈、问卷调查、可用性测试
- 用户画像：基于研究数据创建人物画像
- 竞品分析：分析竞争对手的UX模式和功能
- 旅程地图：绘制用户体验旅程
- 同理心地图：理解用户需求和痛点

### 2. UX策略 (UX Strategy)
- 竞品分析：识别机会和差异化点
- 设计原则：定义产品设计原则
- 体验地图：规划整体用户体验
- 问题框架：将模糊挑战转化为清晰问题
- 对齐分析：确保设计与业务目标一致

### 3. UI设计 (UI Design)
- 布局网格：定义响应式布局系统
- 色彩系统：创建可访问的色彩方案
- 排版系统：设计字体层级和排版
- 视觉层次：建立清晰的视觉优先级
- 响应式设计：适配不同设备和屏幕

### 4. 交互设计 (Interaction Design)
- 状态机：设计组件状态和转换
- 手势设计：定义触摸交互模式
- 错误处理：设计友好的错误流程
- 反馈机制：设计用户反馈系统
- 微交互：设计细微的交互动画

### 5. 设计系统 (Design Systems)
- 设计tokens：定义设计token系统
- 组件规范：创建组件规格文档
- 无障碍设计：确保WCAG合规
- 主题设计：支持多主题切换
- 文档化：维护设计系统文档

### 6. 原型与测试 (Prototyping & Testing)
- 原型策略：选择合适的原型方法
- 可用性测试：设计和执行测试计划
- 启发式评估：使用Nielsen启发式规则
- A/B实验：设计对比实验
- 原型测试：验证设计假设

### 7. 设计运营 (Design Ops)
- 设计评审：结构化设计critique
- 交付规范：生成开发者交付包
- 冲刺规划：规划设计冲刺
- 工作流设置：建立设计团队工作流
- 版本控制：管理设计资产版本

## 使用方式

### 触发方式

当用户使用以下任一触发词时，本skill将被激活：
- "扮演设计师"
- "设计师角色"
- "设计任务"
- "UX设计"
- "UI设计"
- "用户研究"
- "设计系统"
- "设计评审"

### 工作流程

1. **理解任务**：明确用户需要完成的具体设计任务类型
2. **选择角色**：根据任务类型选择合适的设计师角色（研究设计师、UI设计师、交互设计师等）
3. **执行任务**：按照对应领域的最佳实践执行设计任务
4. **交付成果**：生成符合专业标准的设计交付物

### 子技能调用

根据具体任务，本skill会调用以下子技能：

#### 设计研究类
- `user-persona` - 创建用户画像
- `interview-script` - 设计访谈脚本
- `usability-test-plan` - 制定可用性测试计划
- `journey-map` - 绘制用户体验旅程
- `empathy-map` - 创建同理心地图

#### UX策略类
- `competitive-analysis` - 进行竞品分析
- `design-principles` - 定义设计原则
- `experience-mapping` - 规划体验地图
- `problem-framing` - 框架化问题

#### UI设计类
- `layout-grid` - 定义布局网格系统
- `color-system` - 创建色彩系统
- `typography-scale` - 设计排版系统
- `visual-hierarchy` - 建立视觉层次
- `responsive-design` - 设计响应式布局

#### 交互设计类
- `state-machine` - 设计状态机
- `gesture-design` - 定义手势交互
- `error-flow` - 设计错误处理流程
- `feedback-loops` - 设计反馈机制

#### 设计系统类
- `design-tokens` - 定义设计tokens
- `component-spec` - 创建组件规格
- `accessibility` - 确保无障碍设计
- `theming` - 设计主题系统

#### 设计运营类
- `design-critique` - 进行设计评审
- `handoff-spec` - 生成交付规范
- `sprint-plan` - 规划设计冲刺
- `workflow-setup` - 设置工作流

#### 心理学与设计类
- `psychology-ux-design` - 将心理学原则应用于UI/UX设计

#### 游戏设计类
- `mobile-game-ui-design` - 移动端游戏UI设计规范，整合基础设计原则与心理学应用

#### HTML原型设计类
- `web-html-prototype` - Web应用HTML原型设计，使用HTML创建高保真Web应用原型、交互Demo
- `app-html-prototype` - App应用HTML原型设计，使用HTML创建高保真移动App原型、交互Demo

#### Web应用开发类
- `web-monorepo-react` - Web应用Monorepo React开发，融合设计系统、类型安全、多端复用的React应用开发最佳实践

#### App应用开发类
- `app-monorepo-react-pwa` - App应用Monorepo React PWA开发，融合设计系统、类型安全、PWA特性的移动应用开发最佳实践

## 设计原则

基于ref目录中的设计指南和技能库，本skill遵循以下设计原则：

### 1. 用户为中心 (User-Centered)
- 所有设计决策基于用户研究和数据
- 考虑用户的能力、限制和需求
- 包容性设计，覆盖不同能力水平的用户

### 2. 证据驱动 (Evidence-Based)
- 设计决策有明确证据支持
- 可回放、可审计的设计过程
- claim→evidence映射清晰

### 3. 无障碍优先 (Accessibility First)
- 默认遵循WCAG 2.2标准
- 考虑认知、视觉、运动等多维度无障碍
- 无障碍是设计承诺，不是后期添加

### 4. 系统性思维 (Systems Thinking)
- 设计作为系统的一部分考虑
- 保持一致性和可维护性
- 考虑扩展性和演进

### 5. 可迭代 (Iterative)
- 通过测试和反馈持续改进
- 支持快速原型和验证
- 从失败中学习

## 输出格式

根据任务类型，本skill会生成相应的交付物：

### 研究类交付物
- 用户画像文档（Markdown）
- 访谈脚本
- 可用性测试计划
- 旅程地图
- 研究报告

### 策略类交付物
- 竞品分析报告
- 设计原则文档
- 体验地图
- 问题框架文档

### UI类交付物
- 布局网格规范
- 色彩系统文档
- 排版系统规范
- 视觉设计稿
- 响应式断点定义

### 交互类交付物
- 状态机图
- 交互流程图
- 原型文件
- 交互规范文档

### 系统类交付物
- Design tokens文档
- 组件库规格
- 无障碍审计报告
- 主题定义文档

### 运营类交付物
- 设计评审记录
- 开发者交付包
- 冲刺计划
- 工作流文档

## 质量标准

所有输出必须满足以下质量标准：

### 1. 完整性
- 包含所有必要的信息和上下文
- 覆盖关键场景和边缘情况
- 提供清晰的下一步行动

### 2. 可读性
- 结构清晰，易于理解
- 使用专业但易懂的语言
- 提供视觉辅助（图表、示例）

### 3. 可执行性
- 具体的实施建议
- 明确的验收标准
- 可复现的步骤

### 4. 可维护性
- 版本化设计决策
- 记录设计理由
- 提供更新机制

## 参考资源

本skill基于以下资源构建：

### 核心文档
- ARCH-通用两轮并行提案评审决策流程-决策型Skill创建-H研究文档-案例研究与能力需求-v1.0_胥克谦_20260421.md
- AI软件工程-skill层最小充分控制原则与gene分层实践总结-20260421.md

### 设计技能库
- designer-skills-main: 63技能+27命令，8个插件
- ai-design-skills-main: 42技能+18命令，6个插件
- inclusive-design-skills-main: 40技能+18命令，6个插件
- designpowers-main: 10个Agent+29个技能

### 设计指南
- AI Design Field Guide: 46种AI设计工具使用方法
- Design Workshop Prompts: 36个设计工作坊提示词

## 限制与边界

### 当前范围
- 本skill处于研究阶段，不直接执行设计任务
- 提供设计指导和框架，而非替代设计师判断
- 支持多种设计任务类型，但可能需要根据具体项目调整

### 不支持的范围
- 不直接生成最终设计文件（Figma, Sketch等）
- 不替代专业设计工具的使用
- 不处理需要高度创意的原创设计工作

### 风险控制
- 设计决策需要人类设计师确认
- 敏感信息需要脱敏处理
- 遵循安全和无障碍标准

## 下一步

本skill可以进一步扩展的方向：

1. **增加更多子技能**：从ref目录中抽取更多具体的设计技能
2. **集成设计工具**：支持与Figma、Sketch等工具的集成
3. **添加模板库**：提供更多设计模板和示例
4. **增强协作功能**：支持团队协作和版本控制
5. **添加评估机制**：自动评估设计质量
