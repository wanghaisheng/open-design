---
description: 从PRD到Prototype的Open Design Skills使用指南，说明如何使用Open Design的各个skill将产品需求文档转化为可交互的高保真原型
---

# 从PRD到Prototype：Open Design Skills使用指南

本文档说明如何使用Open Design的各个skill，将产品需求文档（PRD）转化为可交互的高保真原型。

---

## 目录

1. [概述](#概述)
2. [Skill映射矩阵](#skill映射矩阵)
3. [完整工作流程](#完整工作流程)
4. [分阶段详解](#分阶段详解)
5. [实战案例：Fambulator](#实战案例fambulator)
6. [工具链集成](#工具链集成)
7. [最佳实践](#最佳实践)

---

## 概述

### 核心理念

Open Design提供了一套完整的design skills，覆盖从用户研究到产品交付的全流程。当用户完成PRD后，可以按照以下路径逐步构建原型：

```
PRD → 研究阶段 → 策略阶段 → 设计阶段 → 系统阶段 → 原型阶段 → 开发阶段
```

### Skill分类

| 类别 | Skill | 用途 |
|------|-------|------|
| 设计研究 | user-persona, interview-script, usability-test-plan, journey-map | 理解用户和需求 |
| UX策略 | competitive-analysis, design-principles, experience-mapping, problem-framing | 制定设计方向 |
| UI设计 | layout-grid, color-system, typography-scale, visual-hierarchy, responsive-design | 定义视觉系统 |
| 交互设计 | state-machine, gesture-design, error-flow, feedback-loops | 设计交互逻辑 |
| 设计系统 | design-tokens, component-spec, accessibility, theming | 构建设计系统 |
| 设计运营 | design-critique, handoff-spec, sprint-plan, workflow-setup | 管理设计流程 |
| HTML原型设计 | web-html-prototype, app-html-prototype | 快速原型验证 |
| Web应用开发 | web-monorepo-react | 生产级Web应用 |
| App应用开发 | app-monorepo-react-pwa | 移动应用开发 |

---

## Skill映射矩阵

### PRD章节 → Skill映射

| PRD章节 | 推荐Skill | 输出 |
|---------|----------|------|
| 1. 项目背景与愿景 | problem-framing | 问题框架文档 |
| 2. 目标用户与场景 | user-persona, journey-map | 用户画像、体验旅程 |
| 3. 产品架构 | experience-mapping | 体验地图 |
| 4. 用户旅程 | journey-map, experience-mapping | 详细旅程图 |
| 5. 功能需求 | state-machine, component-spec | 交互状态机、组件规格 |
| 6. 非功能需求 | accessibility, responsive-design | 无障碍规范、响应式设计 |
| 7. 内容策略 | design-principles | 设计原则文档 |
| 8. 路线图 | sprint-plan | 冲刺计划 |

### 产品类型 → Skill路径

| 产品类型 | 推荐Skill路径 |
|---------|--------------|
| Web应用 | design-tokens → layout-grid → web-html-prototype → web-monorepo-react |
| 移动App | design-tokens → gesture-design → app-html-prototype → app-monorepo-react-pwa |
| 原型验证 | design-tokens → web-html-prototype/app-html-prototype |
| 设计系统 | design-tokens → component-spec → accessibility → theming |

---

## 完整工作流程

### 阶段0：准备阶段

**目标**：理解PRD，确定设计范围

**步骤**：
1. 阅读PRD，提取核心信息
2. 确定产品类型（Web/App/原型）
3. 识别关键用户场景
4. 确定交付物类型（HTML原型/生产应用）

**使用Skill**：无（人工分析）

**输出**：设计范围文档

---

### 阶段1：研究阶段（Design Research）

**目标**：深入理解用户和需求

#### 1.1 创建用户画像

**使用Skill**：`user-persona`

**输入**：PRD第2节"目标用户与场景"

**执行方式**：
```
调用skill: user-persona
参数: 用户类型、核心需求、典型场景
输出: 用户画像文档（包含人口统计、行为模式、痛点、目标）
```

**输出示例**：
- 独立创作者画像
- 营销公司画像
- 游戏开发商画像
- 角色创作者画像

#### 1.2 绘制体验旅程

**使用Skill**：`journey-map`

**输入**：PRD第4节"用户旅程"

**执行方式**：
```
调用skill: journey-map
参数: 用户类型、关键触点、情感曲线
输出: 体验旅程图（包含阶段、触点、情绪、机会点）
```

**输出示例**：
- 新用户着陆页旅程
- 角色购买旅程
- 创作Studio使用旅程

---

### 阶段2：策略阶段（UX Strategy）

**目标**：制定设计方向和原则

#### 2.1 竞品分析

**使用Skill**：`competitive-analysis`

**输入**：PRD第1.3节"我们的差异化"

**执行方式**：
```
调用skill: competitive-analysis
参数: 竞品列表（Pollo.ai等）、差异化维度
输出: 竞品分析报告（功能对比、体验对比、机会点）
```

**输出**：竞品分析矩阵

#### 2.2 定义设计原则

**使用Skill**：`design-principles`

**输入**：PRD第1.4节"黄金圈法则"、第7.1节"核心信息层级"

**执行方式**：
```
调用skill: design-principles
参数: 产品愿景、核心信息、品牌定位
输出: 设计原则文档（3-5条核心原则 + 应用示例）
```

**输出示例**：
- 原则1：像组建团队一样创作（协作感）
- 原则2：自动化优于手动选择（智能化）
- 原则3：资产可复用（长期价值）

#### 2.3 问题框架化

**使用Skill**：`problem-framing`

**输入**：PRD第1.2节"市场痛点"

**执行方式**：
```
调用skill: problem-framing
参数: 痛点列表、用户场景
输出: 问题框架文档（问题陈述、约束条件、成功指标）
```

**输出**：清晰的问题定义

---

### 阶段3：设计阶段（UI Design）

**目标**：定义视觉系统和组件

#### 3.1 创建设计令牌

**使用Skill**：`design-tokens`

**输入**：品牌色值、字体选择、间距系统

**执行方式**：
```
调用skill: design-tokens
参数: 品牌色、字体、间距、圆角等设计决策
输出: design-tokens.ts（类型化的设计令牌）
```

**输出示例**：
```typescript
export const designTokens = {
  colors: {
    primary: '#1A1C1E',
    secondary: '#6C7278',
    tertiary: '#B8422E',
  },
  typography: {
    h1: { fontSize: '48px', fontWeight: 600 },
    bodyMd: { fontSize: '16px', fontWeight: 400 },
  },
  spacing: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px',
  },
} as const;
```

#### 3.2 定义布局网格

**使用Skill**：`layout-grid`

**输入**：PRD线框图、设备尺寸

**执行方式**：
```
调用skill: layout-grid
参数: 目标设备、内容类型
输出: 布局网格规范（列数、间距、断点）
```

**输出示例**：
- 桌面：12列网格，32px间距
- 平板：8列网格，24px间距
- 移动：4列网格，16px间距

#### 3.3 创建色彩系统

**使用Skill**：`color-system`

**输入**：品牌色、无障碍要求

**执行方式**：
```
调用skill: color-system
参数: 品牌主色、辅助色、对比度要求（WCAG AA）
输出: 色彩系统文档（色板、使用规则、对比度检查）
```

#### 3.4 设计排版系统

**使用Skill**：`typography-scale`

**输入**：内容层级、阅读场景

**执行方式**：
```
调用skill: typography-scale
参数: 内容类型（标题/正文/标签）、阅读距离
输出: 排版系统规范（字号、行高、字重）
```

---

### 阶段4：交互阶段（Interaction Design）

**目标**：设计交互逻辑和状态管理

#### 4.1 设计状态机

**使用Skill**：`state-machine`

**输入**：PRD第5.3节"编排器"功能描述

**执行方式**：
```
调用skill: state-machine
参数: 交互流程、状态转换条件
输出: 状态机图（Mermaid格式） + 状态定义文件
```

**输出示例**：
```
[需求输入] → [拆解中] → [角色匹配] → [演员调度] → [并行执行] → [完成]
```

#### 4.2 设计手势交互

**使用Skill**：`gesture-design`（移动端）

**输入**：移动端使用场景

**执行方式**：
```
调用skill: gesture-design
参数: 设备类型、操作场景
输出: 手势设计规范（轻点、长按、滑动等）
```

#### 4.3 设计错误流程

**使用Skill**：`error-flow`

**输入**：PRD第6节"非功能需求"

**执行方式**：
```
调用skill: error-flow
参数: 错误类型、恢复策略
输出: 错误处理流程图
```

#### 4.4 设计反馈机制

**使用Skill**：`feedback-loops`

**输入**：用户交互场景

**执行方式**：
```
调用skill: feedback-loops
参数: 交互类型、反馈时机
输出: 反馈设计规范（加载、成功、错误、警告）
```

---

### 阶段5：系统阶段（Design Systems）

**目标**：构建完整的设计系统

#### 5.1 创建组件规格

**使用Skill**：`component-spec`

**输入**：PRD线框图、设计令牌

**执行方式**：
```
调用skill: component-spec
参数: 组件列表、设计令牌
输出: 组件规格文档（Props、状态、样式、用例）
```

**输出示例**：
- Button组件规格
- Card组件规格
- Input组件规格
- Modal组件规格

#### 5.2 确保无障碍

**使用Skill**：`accessibility`

**输入**：WCAG 2.2标准、组件列表

**执行方式**：
```
调用skill: accessibility
参数: 组件类型、目标用户
输出: 无障碍审计报告 + 修复建议
```

#### 5.3 设计主题系统

**使用Skill**：`theming`

**输入**：品牌变体、深色模式需求

**执行方式**：
```
调用skill: theming
参数: 主题数量、品牌变体
输出: 主题设计文档（主题切换、变量映射）
```

---

### 阶段6：原型阶段（Prototyping）

**目标**：快速验证设计假设

#### 6.1 Web应用HTML原型

**使用Skill**：`web-html-prototype`

**输入**：线框图、设计令牌、交互规范

**执行方式**：
```
调用skill: web-html-prototype
参数: 页面列表、设计令牌、交互逻辑
输出: HTML原型文件（单文件inline React）
```

**输出示例**：
- 着陆页HTML
- 角色市场HTML
- 创作Studio HTML

#### 6.2 App应用HTML原型

**使用Skill**：`app-html-prototype`

**输入**：移动端线框图、设计令牌、手势规范

**执行方式**：
```
调用skill: app-html-prototype
参数: 页面列表、设计令牌、设备尺寸
输出: 移动端HTML原型（带设备边框）
```

**输出示例**：
- 移动端角色市场
- 移动端创作Studio

---

### 阶段7：开发阶段（Development）

**目标**：构建生产级应用

#### 7.1 Web应用Monorepo React

**使用Skill**：`web-monorepo-react`

**输入**：HTML原型、设计令牌、组件规格

**执行方式**：
```
调用skill: web-monorepo-react
参数: 原型文件、设计系统、技术栈
输出: 完整的Monorepo项目结构
```

**输出示例**：
```
monorepo/
├── apps/
│   └── web/
├── packages/
│   ├── core/
│   ├── ui/
│   ├── api/
│   └── shared/
```

#### 7.2 App应用Monorepo React PWA

**使用Skill**：`app-monorepo-react-pwa`

**输入**：移动端原型、设计令牌、PWA需求

**执行方式**：
```
调用skill: app-monorepo-react-pwa
参数: 原型文件、设计系统、PWA配置
输出: PWA Monorepo项目结构
```

**输出示例**：
```
monorepo/
├── apps/
│   ├── pwa/
│   └── web/
├── packages/
│   ├── core/
│   ├── ui/
│   └── storage/
```

---

### 阶段8：运营阶段（Design Ops）

**目标**：管理设计流程和质量

#### 8.1 设计评审

**使用Skill**：`design-critique`

**输入**：原型/设计稿

**执行方式**：
```
调用skill: design-critique
参数: 设计文件、评审维度
输出: 结构化评审报告（5维度评分 + 修复清单）
```

#### 8.2 生成交付规范

**使用Skill**：`handoff-spec`

**输入**：设计系统、组件规格

**执行方式**：
```
调用skill: handoff-spec
参数: 设计令牌、组件规格
输出: 开发者交付包（Zeplin/Figma导出 + 文档）
```

#### 8.3 规划设计冲刺

**使用Skill**：`sprint-plan`

**输入**：PRD第8节"路线图"

**执行方式**：
```
调用skill: sprint-plan
参数: 阶段目标、时间范围、团队规模
输出: 冲刺计划（任务拆解、时间线、资源分配）
```

---

## 分阶段详解

### 阶段选择决策树

```
开始
  │
  ├─ 有真实用户数据？
  │   ├─ 是 → 进入研究阶段
  │   └─ 否 → 跳过研究阶段
  │
  ├─ 需要设计方向？
  │   ├─ 是 → 进入策略阶段
  │   └─ 否 → 跳过策略阶段
  │
  ├─ 需要从零设计？
  │   ├─ 是 → 进入设计阶段
  │   └─ 否 → 使用现有设计系统
  │
  ├─ 有复杂交互？
  │   ├─ 是 → 进入交互阶段
  │   └─ 否 → 简化交互设计
  │
  ├─ 需要完整设计系统？
  │   ├─ 是 → 进入系统阶段
  │   └─ 否 → 直接原型
  │
  ├─ 目标是验证？
  │   ├─ 是 → 进入原型阶段
  │   └─ 否 → 进入开发阶段
  │
  └─ 产品类型？
      ├─ Web → web-monorepo-react
      └─ App → app-monorepo-react-pwa
```

### 最小可行流程（MVP Path）

如果时间有限，可以采用最小可行流程：

```
PRD → design-tokens → web-html-prototype → 用户反馈
```

**适用场景**：
- 早期验证
- 概念Demo
- 内部讨论

### 完整流程（Full Path）

如果需要完整交付物：

```
PRD → 研究阶段 → 策略阶段 → 设计阶段 → 交互阶段 → 系统阶段 → 原型阶段 → 开发阶段 → 运营阶段
```

**适用场景**：
- 正式产品开发
- 设计系统构建
- 长期项目

---

## 实战案例：Fambulator

### 案例背景

- **产品**：Fambulator - AI视频创作平台
- **PRD位置**：`demo/fambulator/prd.md`
- **产品类型**：Web应用 + PWA
- **目标**：从PRD到可交互原型

### 实际执行路径

#### 步骤1：准备阶段

**分析PRD**：
- 产品定位：AI视频制作团队即服务
- 核心差异：角色市场 + 演员市场 + 编排器
- 目标用户：独立创作者、营销公司、游戏开发商

**设计范围**：
- 优先级：P0功能（角色市场、编排器基础）
- 交付物：Web应用HTML原型
- 时间：2周

#### 步骤2：研究阶段

**调用`user-persona`**：
```
输入: 独立创作者（YouTuber、TikToker）
输出: 4个用户画像
```

**调用`journey-map`**：
```
输入: 新用户着陆页旅程
输出: 着陆页 → 观看演示 → 免费试用 → 注册 → 购买角色 → 创作
```

#### 步骤3：策略阶段

**调用`competitive-analysis`**：
```
输入: Pollo.ai vs Fambulator
输出: 差异化分析表
```

**调用`design-principles`**：
```
输入: "像组建团队一样创作视频"
输出: 3条设计原则
```

#### 步骤4：设计阶段

**调用`design-tokens`**：
```
输入: 品牌色（假设：主色#1A1C1E）
输出: design-tokens.ts
```

**调用`layout-grid`**：
```
输入: 线框图布局
输出: 12列网格系统
```

**调用`color-system`**：
```
输入: 品牌色 + WCAG AA
输出: 色彩系统
```

#### 步骤5：交互阶段

**调用`state-machine`**：
```
输入: 编排器功能描述
输出: 任务DAG状态机
```

**调用`feedback-loops`**：
```
输入: 创作Studio交互
输出: 进度反馈规范
```

#### 步骤6：系统阶段

**调用`component-spec`**：
```
输入: 线框图组件列表
输出: 10个核心组件规格
```

**调用`accessibility`**：
```
输入: WCAG 2.2
输出: 无障碍审计报告
```

#### 步骤7：原型阶段

**调用`web-html-prototype`**：
```
输入: 着陆页线框图 + 设计令牌
输出: landing.html
```

**调用`web-html-prototype`**：
```
输入: 角色市场线框图 + 设计令牌
输出: marketplace.html
```

**调用`web-html-prototype`**：
```
输入: 创作Studio线框图 + 设计令牌
输出: studio.html
```

#### 步骤8：评审阶段

**调用`design-critique`**：
```
输入: 3个HTML原型
输出: 5维度评审报告
```

### 输出物清单

**研究类**：
- 4个用户画像
- 3个体验旅程图

**策略类**：
- 竞品分析报告
- 设计原则文档
- 问题框架文档

**设计类**：
- design-tokens.ts
- 布局网格规范
- 色彩系统文档
- 排版系统规范

**交互类**：
- 编排器状态机图
- 反馈机制规范

**系统类**：
- 10个组件规格
- 无障碍审计报告

**原型类**：
- landing.html
- marketplace.html
- studio.html

---

## 工具链集成

### Open Design CLI集成

使用Open Design CLI工具自动化部分流程：

```bash
# 生成设计令牌
open-design-cli template design-spec --output ./design-system/

# 验证设计规范
open-design-cli lint docs/DESIGN-SPEC.md

# 导出设计规范为JSON
open-design-cli export docs/DESIGN-SPEC.md --format json --output design-system.json
```

### 设计系统文档同步

将DESIGN-SPEC.md中的规范同步到设计令牌：

```bash
# 从DESIGN-SPEC.md提取设计令牌
open-design-cli extract-tokens docs/DESIGN-SPEC.md --output packages/ui/src/tokens/
```

### 规范验证

确保设计符合Open Design规范：

```bash
# 验证所有规范文档
open-design-cli lint docs/

# 验证特定规范
open-design-cli lint docs/DESIGN-SPEC.md
open-design-cli lint docs/STRATEGY-SPEC.md
```

---

## 最佳实践

### 1. 迭代而非瀑布

**错误做法**：
```
完成所有研究 → 完成所有策略 → 完成所有设计 → 开始原型
```

**正确做法**：
```
研究1个用户画像 → 立即原型验证 → 反馈 → 迭代 → 继续下一个
```

### 2. 技能组合使用

**示例：角色市场页面**
```
design-tokens → layout-grid → color-system → component-spec → web-html-prototype
```

### 3. 文档即代码

将设计规范文档（DESIGN-SPEC.md等）作为单一真相源：

```typescript
// 自动从DESIGN-SPEC.md生成
import { designTokens } from '@fambulator/design-system';
```

### 4. 持续验证

每个阶段完成后立即验证：

- 研究阶段 → 用户访谈验证
- 策略阶段 → 干系人评审
- 设计阶段 → 设计评审
- 原型阶段 → 可用性测试

### 5. 渐进式增强

从最小可行开始，逐步增强：

```
MVP: design-tokens + web-html-prototype
增强: + component-spec + accessibility
完整: + 所有skills
```

---

## 常见问题

### Q1: 必须使用所有skills吗？

**A**: 不必。根据项目需求选择合适的skill组合。最小流程可以是：
```
design-tokens → web-html-prototype
```

### Q2: 技能调用的顺序是固定的吗？

**A**: 不是固定的。根据项目实际情况调整。例如：
- 有现有设计系统：跳过设计阶段
- 简单交互：简化交互阶段
- 快速验证：直接原型阶段

### Q3: 如何判断哪个skill适合当前阶段？

**A**: 参考Skill映射矩阵和阶段选择决策树。

### Q4: 原型阶段后必须进入开发阶段吗？

**A**: 不一定。原型可以用于验证假设，验证后可能需要重新设计。

### Q5: 如何管理多个skill的输出？

**A**: 使用统一的文档结构：
```
project/
├── docs/
│   ├── research/      # 研究阶段输出
│   ├── strategy/      # 策略阶段输出
│   ├── design/        # 设计阶段输出
│   ├── interaction/   # 交互阶段输出
│   ├── system/        # 系统阶段输出
│   └── prototype/     # 原型阶段输出
```

---

## 游戏开发应用

### 游戏开发技能映射

对于游戏开发项目，Open Design技能需要映射到游戏开发特定的技能：

| Open Design Skill | 游戏开发Skill | 用途 |
|-----------------|---------------|------|
| user-persona | game-user-persona | 游戏用户画像 |
| journey-map | player-journey-map | 玩家体验旅程 |
| design-principles | game-design-principles | 游戏设计原则 |
| problem-framing | game-problem-framing | 游戏问题框架 |
| design-tokens | game-design-tokens | 游戏设计令牌 |
| layout-grid | game-ui-layout | 游戏UI布局 |
| color-system | game-color-system | 游戏色彩系统 |
| typography-scale | game-typography | 游戏排版系统 |
| state-machine | game-state-machine | 游戏状态机 |
| component-spec | game-component-spec | 游戏组件规格 |
| accessibility | game-accessibility | 游戏无障碍 |
| theming | game-theming | 游戏主题系统 |

### 游戏开发工作流

游戏开发采用RAMS Game框架的七阶段管道编排：

```
Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration
```

详见 [game-development-workflow.md](./game-development-workflow.md)

### 游戏开发PRD到Prototype

对于游戏开发项目，推荐使用专门的游戏开发PRD到Prototype流程：

详见 [game-prd-to-mvp.md](./game-prd-to-mvp.md)

### 游戏开发角色召集

游戏开发使用多角色协作架构（40-50个专业角色）：

详见 [game-requirement-to-task.md](./game-requirement-to-task.md)

---

## 总结

从PRD到Prototype的完整路径：

1. **准备阶段**：理解PRD，确定范围
2. **研究阶段**：理解用户（user-persona, journey-map）
3. **策略阶段**：制定方向（competitive-analysis, design-principles）
4. **设计阶段**：定义视觉（design-tokens, layout-grid, color-system）
5. **交互阶段**：设计逻辑（state-machine, feedback-loops）
6. **系统阶段**：构建系统（component-spec, accessibility）
7. **原型阶段**：快速验证（web-html-prototype, app-html-prototype）
8. **开发阶段**：生产应用（web-monorepo-react, app-monorepo-react-pwa）
9. **运营阶段**：管理流程（design-critique, handoff-spec）

**游戏开发专用流程**：
- 使用 [game-development-workflow.md](./game-development-workflow.md) 进行游戏开发
- 使用 [game-prd-to-mvp.md](./game-prd-to-mvp.md) 从游戏PRD到MVP
- 使用 [game-requirement-to-task.md](./game-requirement-to-task.md) 进行游戏开发角色召集

核心原则：**迭代验证、渐进增强、文档驱动、技能组合**。
