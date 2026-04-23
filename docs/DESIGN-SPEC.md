---
version: "1.0"
name: Open Design
description: Open Design 项目的设计系统规范，整合视觉设计、交互设计、心理学原则和游戏化设计
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.02em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
breakpoints:
  xs: 375px
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
shadows:
  sm: "0 1px 2px rgba(0,0,0,0.05)"
  md: "0 4px 6px rgba(0,0,0,0.07)"
  lg: "0 10px 15px rgba(0,0,0,0.1)"
  xl: "0 20px 25px rgba(0,0,0,0.12)"
borders:
  thin: 1px
  medium: 2px
  thick: 3px
accessibility:
  contrast: "AA"
  focusVisible: true
  reducedMotion: true
gradients:
  primary: "linear-gradient(135deg, {colors.primary}, {colors.secondary})"
  secondary: "linear-gradient(135deg, {colors.secondary}, {colors.neutral})"
  tertiary: "linear-gradient(135deg, {colors.tertiary}, {colors.primary})"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"
    shadow: "{shadows.md}"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    shadow: "{shadows.lg}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "{borders.medium} {colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    shadow: "{shadows.md}"
  input-field:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    border: "{borders.thin} {colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
---

# Open Design 设计系统规范

## Overview

Open Design 是一个开放的设计系统，整合了视觉设计、交互设计、心理学原则和游戏化设计。我们的设计理念是**以用户为中心、基于证据、无障碍优先、系统性思维、可迭代**。

设计系统旨在为设计师和开发者提供统一的视觉语言和交互规范，确保跨平台、跨项目的一致性。

## Colors

色彩系统基于高对比度中性和单一强调色，确保可读性和品牌识别度。

- **Primary (#1A1C1E)**：深墨色，用于标题和核心文本，提供最大可读性和持久感
- **Secondary (#6C7278)**：精致板岩色，主要用于边框、字幕和元数据等实用元素
- **Tertiary (#B8422E)**：鲜艳的土红色，作为交互的唯一驱动，专门用于主要操作和关键高亮
- **Neutral (#F7F5F2)**：暖石灰色，作为所有页面的基础，比纯白色更柔和、更有机

### 色彩心理学应用

基于色彩心理学原则，我们的色彩系统传递明确的情感和含义：

- **红色系**：危险、攻击、生命值（敌人血条、伤害数字、删除按钮）
- **绿色系**：安全、治疗、恢复（己方血条、回血药水、确认按钮）
- **蓝色系**：魔法、能量、冷静（法力值、技能冷却、护盾）
- **黄色/橙色**：警告、稀有、高价值（传说装备、暴击提示、限时活动）
- **灰色系**：禁用、非活跃（不可用卡牌、已消耗道具）

## Typography

排版策略利用 **Inter** 字体家族，提供清晰、现代、易读的文本层次。

- **标题（H1-H3）**：使用 Inter Semi-Bold，建立机构化和值得信赖的声音
- **正文（Body-lg/sm/md）**：Inter Regular 确保当代专业性和长篇可读性
- **标签（Label-lg/md）**：用于技术数据、时间戳和元数据，严格大写并带有宽松的字间距

### 认知负荷应用

排版系统遵循认知负荷理论：
- 信息分区：将文本分为4±1个逻辑层级（H1、H2、H3、Body、Label）
- 渐进呈现：先呈现核心信息，再展开细节
- 一致性：同类文本使用相同的字体样式

## Layout

布局遵循**响应式网格系统**，支持移动端、平板和桌面设备。

- **移动端**：4列网格，16px边距
- **平板**：8列网格，24px边距
- **桌面**：12列网格，32px边距

严格的8px间距尺度（4px半步用于微调）用于保持一致的节奏。组件使用"容器"原则分组，相关项目放在具有充足内边距（24px）的卡片中，以强调品牌的柔和、亲民特性。

### 菲茨定律应用

基于菲茨定律优化布局：
- 可点击区域：所有交互元素至少44×44px
- 边缘放置：高频操作置于屏幕边缘或角落
- 间距控制：相邻可点击元素间距至少8px

## Elevation & Depth

深度通过**色调层次**而非重阴影实现。背景使用柔和的灰白色或非常浅的绿色，而主要内容位于纯白色卡片上。

### 格式塔原则应用

- **相似性**：相似的元素使用相似的视觉样式
- **邻近性**：相关元素在空间上靠近
- **闭合**：使用不完整的元素让大脑自动补全
- **连续律**：引导视线沿对齐方向移动

## Shapes

形状语言由**建筑锐度**定义。所有交互元素、容器和输入使用最小的**4px圆角**。这提供了足够的柔和感以感觉现代，同时保持刚性、工程化的美学。

## Components

组件原子提供样式指南，确保设计系统的一致性。

### 按钮

- **Primary Button**：用于最重要的操作，使用 primary 颜色
- **Secondary Button**：用于次要操作，透明背景带边框
- **Hover States**：提供清晰的视觉反馈

### 卡片

- 使用暖石灰色背景
- 12px圆角
- 24px内边距
- 中等阴影

### 输入框

- 暖石灰色背景
- 细边框
- 中等圆角
- 清晰的焦点状态

### 组件心理学应用

所有组件遵循心理学原则：
- **希克定律**：每个组件的变体不超过3-5个
- **损失厌恶**：破坏性操作需要二次确认
- **多模态反馈**：视觉、触觉、听觉反馈

## Do's and Don'ts

### 设计原则

- **Do** 使用 primary 颜色仅用于每个屏幕上最重要的操作
- **Don't** 在同一视图中混合使用圆角和锐角
- **Do** 维持 WCAG AA 对比度（普通文本4.5:1）
- **Don't** 在单个屏幕上使用超过两种字重
- **Do** 将高频操作置于拇指舒适区
- **Don't** 忽略无障碍标准

### 心理学原则

- **Do** 应用认知负荷理论，避免信息过载
- **Don't** 同时使用太多心理学原则导致矛盾
- **Do** 考虑文化差异对色彩心理的影响
- **Don't** 静态套用原则而不考虑动态任务

### 移动端游戏设计

- **Do** 所有触控点至少44pt，间距至少8pt
- **Don't** 将高频操作置于困难区
- **Do** 提供即时反馈（视觉、触觉、听觉）
- **Don't** 忽略单手操作优化

## Accessibility

本设计系统遵循 WCAG 2.2 AA 标准，确保所有用户都能访问。

### 对比度要求

- 普通文本：至少4.5:1
- 大文本（18px+）：至少3:1
- 图形元素：至少3:1

### 键盘导航

- 所有交互元素可通过键盘访问
- 清晰的焦点指示器
- 逻辑的Tab顺序

### 屏幕阅读器

- 语义化HTML
- ARIA标签
- 替代文本

### 减少动画

- 尊重用户的减少动画偏好
- 提供禁用动画的选项
- 避免闪烁内容（每秒不超过3次）

## Mobile Game Specifics

### 拇指热区

- **绿色（舒适区）**：屏幕底部、右下角 → 高频操作
- **黄色（伸展区）**：屏幕中部、左下角 → 中频操作
- **红色（困难区）**：屏幕顶部、左上角 → 低频或慎重操作

### 触控目标尺寸

- 最小点击区域：44×44 pt（iOS）/ 48×48 dp（Android）
- 常用按钮：≥ 60×60 pt
- 按钮间距：≥ 8 pt

### 手势一致性

- 轻点：主要交互
- 长按：查看详情
- 滑动：滚动列表、切换目标
- 双指缩放：仅用于地图或牌组编辑

## Token Reference Syntax

使用 `{path.to.token}` 引用其他 tokens：

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
```

## Version History

- **v1.0** (2026-04-23): 初始版本，基于 DESIGN.md alpha 规范，扩展了 breakpoints、shadows、borders、accessibility、gradients 字段
