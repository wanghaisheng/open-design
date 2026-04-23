---
name: design-systems
description: 构建和维护设计系统，包括tokens、组件、无障碍、主题和文档。
keywords: [设计系统, design system, 组件库, tokens, 主题, 组件]
tags: [设计系统, 组件]
trigger_phrases:
  - "设计系统"
  - "design system"
  - "组件库"
  - "design tokens"
  - "主题系统"
---

# Design Systems

构建和维护可扩展、可访问的设计系统的专家。

## What You Do

创建一致的设计语言，通过可复用的组件和tokens提升产品设计和开发效率。

## Design System Anatomy

### Design Tokens
- **Color tokens（色彩tokens）**：语义化颜色（primary、secondary、accent、neutral）
- **Typography tokens（排版tokens）**：字体家族、字号、行高、字重
- **Spacing tokens（间距tokens）**：空间单位（4px基准、间距比例）
- **Border radius tokens（圆角tokens）**：圆角大小
- **Shadow tokens（阴影tokens）**：阴影深度

### Component Library
- **Atomic components（原子组件）**：按钮、输入框、图标
- **Molecular components（分子组件）**：表单、卡片、导航
- **Organism components（有机组件）**：页面模板、布局
- **Templates（模板）**：完整页面布局

### Documentation
- **Component specs（组件规格）**：API文档、props、状态
- **Usage guidelines（使用指南）**：何时使用、何时不使用
- **Design principles（设计原则）**：系统设计哲学
- **Accessibility standards（无障碍标准）**：WCAG合规要求

## Best Practices

### 1. Start Small, Scale Up
- 从核心tokens和基础组件开始
- 逐步扩展到复杂组件
- 避免一次性构建完整系统

### 2. Version Control
- 使用语义化版本控制
- 记录breaking changes
- 提供迁移指南

### 3. Accessibility First
- 所有组件默认可访问
- 遵循WCAG 2.2 AA标准
- 提供键盘导航和屏幕阅读器支持

### 4. Theming Support
- 设计支持多主题切换
- 使用CSS变量或设计tokens
- 考虑深色模式和高对比度模式

### 5. Developer Handoff
- 提供清晰的交付规范
- 包含代码示例和最佳实践
- 维护设计到代码的映射

## Common Pitfalls

- 过度设计：创建太多不常用的组件
- 缺乏维护：系统随时间退化
- 文档不足：开发者不知道如何使用
- 忽略无障碍：事后才考虑可访问性

## Psychology Principles Integration

### 认知负荷理论应用
- **Tokens简化**：限制tokens数量（颜色、间距、字体等不超过4±1个层级）
- **组件分层**：将组件分为原子、分子、有机三层，降低学习负担
- **渐进式文档**：先提供快速开始，再展开详细文档

### 格式塔原则应用
- **相似性**：相似的组件使用相似的视觉样式
- **邻近性**：相关的组件在文档和代码中靠近
- **闭合**：使用组件变体暗示完整系统，即使未全部实现

### 希克-海曼定律应用
- **选项限制**：每个组件的变体不超过3-5个
- **默认配置**：提供合理的默认props配置
- **渐进式定制**：从基础组件开始，逐步添加定制选项

### 色彩心理学应用
- **语义化颜色**：使用颜色传递含义（success、warning、error、info）
- **情感调色板**：根据产品调性选择主色和辅助色
- **对比度保证**：确保所有颜色组合符合WCAG AA标准

### 损失厌恶应用
- **向后兼容**：重大变更提供迁移路径，避免破坏性更新
- **版本控制**：使用语义化版本，明确标注breaking changes
- **回滚机制**：提供回滚到旧版本的能力

## 中文术语

- 设计系统 (Design System)
- 设计tokens (Design Tokens)
- 组件库 (Component Library)
- 语义化颜色 (Semantic Colors)
- 原子组件 (Atomic Components)
- 分子组件 (Molecular Components)
- 有机组件 (Organism Components)
