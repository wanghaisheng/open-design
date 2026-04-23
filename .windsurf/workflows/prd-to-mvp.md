---
description: 从PRD到MVP的完整实施计划，利用Open Design的skill工具栈将产品需求文档转化为各个阶段性文档和最终的MVP产品
---

# 从PRD到MVP：Open Design工具栈实施计划

本计划说明如何利用Open Design的skill工具栈，将产品需求文档（PRD）转化为各个阶段性文档和最终的MVP产品。

---

## 项目背景

**产品**：Fambulator - AI视频创作平台  
**PRD位置**：`demo/monorepo/prd.md`  
**目标平台**：Web应用 + PWA（移动端）  
**开发模式**：Monorepo架构

---

## 完整路径概览

```
PRD → 研究阶段 → 策略阶段 → 设计阶段 → 交互阶段 → 系统阶段 → 原型阶段 → 开发阶段 → MVP交付
```

---

## 阶段1：研究阶段（Design Research）

### 目标
深入理解用户和需求，为后续设计提供数据支撑。

### 1.1 用户画像（User Persona）

**使用Skill**：`user-persona`

**输入**：PRD第2节"目标用户与场景"

**执行方式**：
```
调用skill: user-persona
参数: 
  - 用户类型: 独立创作者、营销公司、游戏开发商、角色创作者
  - 核心需求: 快速生成系列化视频、批量生成品牌宣传视频、游戏预告片、角色模板销售
  - 典型场景: "太空猫"系列短剧、品牌广告素材、游戏角色展示、角色上传销售
```

**输出文档**：
- `docs/research/user-personas.md` - 包含4个用户画像
  - 人口统计信息
  - 行为模式
  - 痛点与需求
  - 目标与动机

### 1.2 体验旅程（Journey Map）

**使用Skill**：`journey-map`

**输入**：PRD第4节"用户旅程"

**执行方式**：
```
调用skill: journey-map
参数:
  - 用户类型: 新用户（独立创作者）、角色创作者
  - 关键触点: 着陆页、免费试用、角色市场、购买、创作Studio
  - 情感曲线: 好奇 → 兴奋 → 期待 → 满意
```

**输出文档**：
- `docs/research/journey-maps.md` - 包含2个关键旅程图
  - 新用户着陆页旅程
  - 角色创作者上传旅程

---

## 阶段2：策略阶段（UX Strategy）

### 目标
制定设计方向和原则，明确差异化优势。

### 2.1 竞品分析（Competitive Analysis）

**使用Skill**：`competitive-analysis`

**输入**：PRD第1.3节"我们的差异化"

**执行方式**：
```
调用skill: competitive-analysis
参数:
  - 竞品: Pollo.ai、传统视频工具
  - 差异化维度: 核心能力、用户门槛、资产复用、进化能力
```

**输出文档**：
- `docs/strategy/competitive-analysis.md` - 竞品分析报告
  - 功能对比矩阵
  - 体验对比分析
  - 机会点识别

### 2.2 设计原则（Design Principles）

**使用Skill**：`design-principles`

**输入**：PRD第1.4节"黄金圈法则"、第7.1节"核心信息层级"

**执行方式**：
```
调用skill: design-principles
参数:
  - 产品愿景: "像组建团队一样创作视频"
  - 核心信息: 无需专业知识、无需选择模型、自动化编排
  - 品牌定位: AI视频制作团队即服务
```

**输出文档**：
- `docs/strategy/design-principles.md` - 设计原则文档
  - 原则1：协作感（像组建团队）
  - 原则2：智能化（自动化优于手动）
  - 原则3：长期价值（资产可复用）
  - 每条原则的应用示例

### 2.3 问题框架化（Problem Framing）

**使用Skill**：`problem-framing`

**输入**：PRD第1.2节"市场痛点"

**执行方式**：
```
调用skill: problem-framing
参数:
  - 痛点: 创作门槛高、工具碎片化、角色一致性难
  - 用户场景: 独立创作者需要快速产出
  - 约束条件: 模型API稳定性、成本控制
```

**输出文档**：
- `docs/strategy/problem-framing.md` - 问题框架文档
  - 问题陈述
  - 约束条件
  - 成功指标

---

## 阶段3：设计阶段（UI Design）

### 目标
定义视觉系统和设计令牌，为开发提供规范。

### 3.1 设计令牌（Design Tokens）

**使用Skill**：`design-tokens`

**输入**：品牌色值（需从品牌资产提取）、字体选择、间距系统

**执行方式**：
```
调用skill: design-tokens
参数:
  - 品牌主色: 待确定（从品牌资产提取）
  - 字体系统: Inter（默认）
  - 间距: 4px网格系统
  - 圆角: 8px/12px/16px
```

**输出文档**：
- `packages/ui/src/tokens/index.ts` - 设计令牌TypeScript文件
- `docs/design/design-tokens.md` - 设计令牌文档说明

```typescript
export const designTokens = {
  colors: {
    primary: { DEFAULT: '#a855f7', dark: '#9333ea', light: '#c084fc' },
    secondary: { DEFAULT: '#ec4899', dark: '#db2777', light: '#f472b6' },
    background: { DEFAULT: '#0a0a0a', surface: '#1a1a1a', muted: '#262626' },
    text: { DEFAULT: '#ffffff', secondary: '#a3a3a3', muted: '#737373' },
    border: { DEFAULT: '#262626', light: '#404040', dark: '#171717' },
  },
  typography: {
    h1: { fontSize: '48px', fontWeight: 600, lineHeight: 1.1 },
    h2: { fontSize: '36px', fontWeight: 600, lineHeight: 1.2 },
    bodyMd: { fontSize: '16px', fontWeight: 400, lineHeight: 1.6 },
  },
  spacing: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px',
  },
  rounded: {
    sm: '8px', md: '12px', lg: '16px',
  },
} as const;
```

### 3.2 布局网格（Layout Grid）

**使用Skill**：`layout-grid`

**输入**：设备尺寸、内容类型

**执行方式**：
```
调用skill: layout-grid
参数:
  - 目标设备: 桌面（1024px+）、平板（768-1024px）、移动（<768px）
  - 内容类型: 角色市场网格、创作Studio布局
```

**输出文档**：
- `docs/design/layout-grid.md` - 布局网格规范
  - 桌面：12列网格，32px间距
  - 平板：8列网格，24px间距
  - 移动：4列网格，16px间距

### 3.3 色彩系统（Color System）

**使用Skill**：`color-system`

**输入**：品牌色、无障碍要求（WCAG AA）

**执行方式**：
```
调用skill: color-system
参数:
  - 品牌主色: 紫色#A855F7
  - 辅助色: 粉色#EC4899
  - 对比度: WCAG AA（4.5:1）
```

**输出文档**：
- `docs/design/color-system.md` - 色彩系统文档
  - 色板定义
  - 使用规则
  - 对比度检查报告

### 3.4 排版系统（Typography Scale）

**使用Skill**：`typography-scale`

**输入**：内容层级、阅读场景

**执行方式**：
```
调用skill: typography-scale
参数:
  - 内容类型: 标题、正文、标签
  - 阅读距离: 桌面阅读距离
```

**输出文档**：
- `docs/design/typography-scale.md` - 排版系统规范
  - 字号层级
  - 行高规范
  - 字重规范

---

## 阶段4：交互阶段（Interaction Design）

### 目标
设计交互逻辑和状态管理，确保用户体验流畅。

### 4.1 状态机（State Machine）

**使用Skill**：`state-machine`

**输入**：PRD第5.3节"编排器"功能描述

**执行方式**：
```
调用skill: state-machine
参数:
  - 交互流程: 需求输入 → 任务拆解 → 角色匹配 → 演员调度 → 并行执行 → 完成
  - 状态转换条件: 任务完成、失败、暂停
```

**输出文档**：
- `docs/interaction/state-machine.md` - 状态机图（Mermaid格式）
- `packages/core/src/states/orchestrator.ts` - 状态定义文件

```
[需求输入] → [拆解中] → [角色匹配] → [演员调度] → [并行执行] → [完成]
     ↓           ↓           ↓           ↓           ↓
   [错误]     [错误]     [错误]     [错误]     [重试]
```

### 4.2 手势设计（Gesture Design）

**使用Skill**：`gesture-design`（移动端专用）

**输入**：移动端使用场景

**执行方式**：
```
调用skill: gesture-design
参数:
  - 设备类型: iOS/Android
  - 操作场景: 角色浏览、视频预览、创作Studio
```

**输出文档**：
- `docs/interaction/gesture-design.md` - 手势设计规范
  - 轻点：主要交互
  - 长按：查看详情
  - 滑动：滚动列表
  - 双指缩放：视频预览

### 4.3 错误流程（Error Flow）

**使用Skill**：`error-flow`

**输入**：PRD第6节"非功能需求"

**执行方式**：
```
调用skill: error-flow
参数:
  - 错误类型: 模型API不可用、支付失败、网络错误
  - 恢复策略: 自动重试、降级方案、用户引导
```

**输出文档**：
- `docs/interaction/error-flow.md` - 错误处理流程图

### 4.4 反馈机制（Feedback Loops）

**使用Skill**：`feedback-loops`

**输入**：用户交互场景

**执行方式**：
```
调用skill: feedback-loops
参数:
  - 交互类型: 视频生成、角色购买、任务调度
  - 反馈时机: 即时、延迟、周期性
```

**输出文档**：
- `docs/interaction/feedback-loops.md` - 反馈设计规范
  - 加载状态
  - 成功提示
  - 错误警告
  - 进度反馈

---

## 阶段5：系统阶段（Design Systems）

### 目标
构建完整的设计系统，确保组件一致性。

### 5.1 组件规格（Component Spec）

**使用Skill**：`component-spec`

**输入**：线框图、设计令牌

**执行方式**：
```
调用skill: component-spec
参数:
  - 组件列表: Button、Card、Input、Modal、Navigation、VideoPlayer
  - 设计令牌: 从阶段3输出
```

**输出文档**：
- `docs/system/component-spec.md` - 组件规格文档
  - Props定义
  - 状态管理
  - 样式规范
  - 使用示例

### 5.2 无障碍（Accessibility）

**使用Skill**：`accessibility`

**输入**：WCAG 2.2标准、组件列表

**执行方式**：
```
调用skill: accessibility
参数:
  - 组件类型: 所有交互组件
  - 目标用户: 普通用户、视觉障碍用户
```

**输出文档**：
- `docs/system/accessibility-audit.md` - 无障碍审计报告
  - 问题清单
  - 修复建议
  - 验证方法

### 5.3 主题系统（Theming）

**使用Skill**：`theming`

**输入**：品牌变体、深色模式需求

**执行方式**：
```
调用skill: theming
参数:
  - 主题数量: 2（浅色、深色）
  - 品牌变体: 无
```

**输出文档**：
- `docs/system/theming.md` - 主题设计文档
  - 主题切换机制
  - CSS变量映射
  - 主题预览

---

## 阶段6：原型阶段（Prototyping）

### 目标
快速验证设计假设，获取用户反馈。

### 6.1 Web应用HTML原型

**使用Skill**：`web-html-prototype`

**输入**：线框图、设计令牌、交互规范

**执行方式**：
```
调用skill: web-html-prototype
参数:
  - 页面列表: landing.html、role-market.html、role-detail.html、studio.html
  - 设计令牌: 从阶段3输出
  - 交互逻辑: 从阶段4输出
```

**输出文档**：
- `demo/monorepo/prototypes/landing.html` - 着陆页原型
- `demo/monorepo/prototypes/role-market.html` - 角色市场原型
- `demo/monorepo/prototypes/role-detail.html` - 角色详情原型
- `demo/monorepo/prototypes/studio.html` - 创作Studio原型

### 6.2 App应用HTML原型

**使用Skill**：`app-html-prototype`

**输入**：移动端线框图、设计令牌、手势规范

**执行方式**：
```
调用skill: app-html-prototype
参数:
  - 页面列表: 移动端角色市场、移动端创作Studio
  - 设计令牌: 从阶段3输出
  - 设备尺寸: iPhone 14 Pro (393×852px)
```

**输出文档**：
- `demo/monorepo/prototypes/mobile-role-market.html` - 移动端角色市场原型
- `demo/monorepo/prototypes/mobile-studio.html` - 移动端创作Studio原型

### 6.3 原型评审

**使用Skill**：`design-critique`

**输入**：HTML原型文件

**执行方式**：
```
调用skill: design-critique
参数:
  - 设计文件: 所有HTML原型
  - 评审维度: 视觉、交互、可用性、一致性、无障碍
```

**输出文档**：
- `docs/prototype/design-critique.md` - 结构化评审报告
  - 5维度评分
  - 问题清单
  - 修复建议

---

## 阶段7：开发阶段（Development）

### 目标
构建生产级Monorepo应用，实现MVP功能。

### 7.1 Web应用Monorepo React

**使用Skill**：`web-monorepo-react`

**输入**：HTML原型、设计令牌、组件规格

**执行方式**：
```
调用skill: web-monorepo-react
参数:
  - 原型文件: 从阶段6输出
  - 设计系统: 从阶段3-5输出
  - 技术栈: React、TypeScript、Turborepo、tRPC、TanStack Query
```

**输出项目**：
```
monorepo/
├── apps/
│   └── web/                    # Astro Web应用
│       ├── src/
│       │   ├── pages/          # 着陆页、角色市场、Studio
│       │   └── components/     # React组件
│       └── astro.config.mjs
├── packages/
│   ├── core/                   # 核心业务逻辑
│   │   └── src/
│   │       ├── procedures/     # 业务Procedures
│   │       └── types/          # 类型定义
│   ├── ui/                     # React组件库
│   │   └── src/
│   │       ├── components/     # 组件
│   │       └── tokens/         # 设计令牌
│   ├── api/                    # tRPC API
│   │   └── src/
│   │       └── router/         # tRPC路由
│   └── shared/                 # 共享类型和Schema
│       └── src/
│           └── schemas/        # Zod Schema
```

### 7.2 App应用Monorepo React PWA

**使用Skill**：`app-monorepo-react-pwa`

**输入**：移动端原型、设计令牌、PWA需求

**执行方式**：
```
调用skill: app-monorepo-react-pwa
参数:
  - 原型文件: 从阶段6输出
  - 设计系统: 从阶段3-5输出
  - PWA配置: Service Worker、Capacitor插件
```

**输出项目**：
```
monorepo/
├── apps/
│   ├── pwa/                    # Ionic + Capacitor PWA
│   │   ├── src/
│   │   │   ├── pages/          # 移动端页面
│   │   │   ├── components/     # Ionic组件
│   │   │   └── theme/          # Ionic主题
│   │   ├── capacitor.config.ts
│   │   └── vite.config.ts
│   └── web/                    # 移动端友好的Web应用
├── packages/
│   ├── core/                   # 核心业务逻辑
│   │   └── src/
│   │       ├── procedures/     # 业务Procedures
│   │       ├── plugins/        # Capacitor插件封装
│   │       └── types/          # 类型定义
│   ├── ui/                     # React/Ionic组件库
│   │   └── src/
│   │       ├── components/     # 组件
│   │       ├── tokens/         # 设计令牌
│   │       └── theme/          # Ionic主题
│   ├── storage/                # 存储适配器
│   │   └── src/
│   │       ├── adapters/       # SQLite、IndexedDB、AsyncStorage
│   │       └── interface.ts    # 存储接口
│   └── shared/                 # 共享类型和Schema
│       └── src/
│           └── schemas/        # Zod Schema
```

---

## 阶段8：运营阶段（Design Ops）

### 目标
管理设计流程和质量，确保持续交付。

### 8.1 冲刺计划（Sprint Plan）

**使用Skill**：`sprint-plan`

**输入**：PRD第8节"路线图"

**执行方式**：
```
调用skill: sprint-plan
参数:
  - 阶段目标: MVP、Alpha、Beta、GA
  - 时间范围: 1-9个月
  - 团队规模: 待确定
```

**输出文档**：
- `docs/ops/sprint-plan.md` - 冲刺计划
  - 任务拆解
  - 时间线
  - 资源分配

### 8.2 交付规范（Handoff Spec）

**使用Skill**：`handoff-spec`

**输入**：设计系统、组件规格

**执行方式**：
```
调用skill: handoff-spec
参数:
  - 设计令牌: 从阶段3输出
  - 组件规格: 从阶段5输出
```

**输出文档**：
- `docs/ops/handoff-spec.md` - 开发者交付包
  - 设计令牌导出
  - 组件文档
  - 开发指南

---

## 工具链集成

### Open Design CLI

使用Open Design CLI工具自动化部分流程：

```bash
# 生成设计令牌
open-design-cli template design-spec --output ./design-system/

# 验证设计规范
open-design-cli lint docs/

# 导出设计规范为JSON
open-design-cli export docs/DESIGN-SPEC.md --format json --output design-system.json

# 从DESIGN-SPEC.md提取设计令牌
open-design-cli extract-tokens docs/DESIGN-SPEC.md --output packages/ui/src/tokens/
```

### 设计系统文档同步

将DESIGN-SPEC.md中的规范同步到设计令牌：

```bash
# 同步设计令牌
open-design-cli sync-tokens docs/DESIGN-SPEC.md packages/ui/src/tokens/

# 验证同步结果
open-design-cli validate-tokens packages/ui/src/tokens/
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

## MVP功能范围

根据PRD第8节"路线图"，MVP阶段（1-2月）包含：

### P0功能（必须实现）

1. **角色市场**
   - 角色浏览与搜索
   - 角色详情页
   - 角色购买（Stripe集成）
   - 10个预置角色

2. **编排器（创作Studio）**
   - 需求输入（文本描述）
   - 自动拆解（调用video_director角色）
   - 角色分配
   - 演员调度（仅Kling模型）
   - 输出预览

3. **演员市场**
   - 模型接入（仅Kling）
   - 自动演员选择

4. **用户系统**
   - 注册/登录（邮箱、Google、GitHub）
   - 个人中心

### P1功能（可选实现）

- 角色试用（沙箱）
- 角色创作工具
- 演员状态监控
- 成本透明设置

---

## 项目结构

```
fambulator/
├── docs/
│   ├── research/              # 研究阶段输出
│   │   ├── user-personas.md
│   │   └── journey-maps.md
│   ├── strategy/              # 策略阶段输出
│   │   ├── competitive-analysis.md
│   │   ├── design-principles.md
│   │   └── problem-framing.md
│   ├── design/                # 设计阶段输出
│   │   ├── design-tokens.md
│   │   ├── layout-grid.md
│   │   ├── color-system.md
│   │   └── typography-scale.md
│   ├── interaction/           # 交互阶段输出
│   │   ├── state-machine.md
│   │   ├── gesture-design.md
│   │   ├── error-flow.md
│   │   └── feedback-loops.md
│   ├── system/                # 系统阶段输出
│   │   ├── component-spec.md
│   │   ├── accessibility-audit.md
│   │   └── theming.md
│   ├── prototype/             # 原型阶段输出
│   │   └── design-critique.md
│   └── ops/                   # 运营阶段输出
│       ├── sprint-plan.md
│       └── handoff-spec.md
├── demo/
│   └── monorepo/
│       ├── prd.md
│       ├── prototypes/        # HTML原型
│       │   ├── landing.html
│       │   ├── role-market.html
│       │   ├── role-detail.html
│       │   ├── studio.html
│       │   ├── mobile-role-market.html
│       │   └── mobile-studio.html
│       └── monorepo/          # 生产代码
│           ├── apps/
│           │   ├── web/
│           │   └── pwa/
│           └── packages/
│               ├── core/
│               ├── ui/
│               ├── api/
│               ├── storage/
│               └── shared/
└── DESIGN-SPEC.md             # 设计系统规范（待创建）
```

---

## 时间规划

| 阶段 | 时间 | 主要输出 |
|------|------|---------|
| 研究阶段 | 1周 | 用户画像、旅程图 |
| 策略阶段 | 1周 | 竞品分析、设计原则 |
| 设计阶段 | 2周 | 设计令牌、布局网格、色彩系统 |
| 交互阶段 | 1周 | 状态机、手势设计、错误流程 |
| 系统阶段 | 2周 | 组件规格、无障碍、主题系统 |
| 原型阶段 | 2周 | HTML原型、原型评审 |
| 开发阶段 | 4周 | Monorepo项目、MVP功能 |
| 运营阶段 | 持续 | 冲刺计划、交付规范 |

**总计**：约13周（3个月）

---

## 成功指标

### 文档质量
- 所有文档符合Open Design规范
- 设计令牌可自动同步到代码
- 组件规格可直接用于开发

### 原型质量
- HTML原型可在浏览器中直接运行
- 交互逻辑完整可测试
- 通过无障碍审计

### MVP质量
- 代码通过TypeScript严格模式
- 端到端类型安全
- PWA可安装、离线可用
- 性能指标达标（首屏<2s，交互<100ms）

---

## 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 阶段时间超期 | 采用MVP Path，优先核心功能 |
| 设计规范不一致 | 使用Open Design CLI自动验证 |
| 原型与开发脱节 | 使用统一的设计令牌系统 |
| 技术栈学习曲线 | 提供技术文档和示例代码 |

---

## 总结

本计划提供了从PRD到MVP的完整路径，利用Open Design的skill工具栈，系统化地输出各个阶段性文档和最终产品。

**核心原则**：
- 迭代验证：每个阶段完成后立即验证
- 渐进增强：从最小可行开始，逐步增强
- 文档驱动：设计规范作为单一真相源
- 技能组合：灵活使用不同skill组合

**下一步行动**：
1. 确认项目范围和优先级
2. 执行核心资产协议（提取品牌资产）
3. 开始研究阶段（调用user-persona skill）
