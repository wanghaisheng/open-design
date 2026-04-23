---
name: interaction-design
description: 设计有意义的交互，包括微动画、状态机、手势、错误处理和反馈机制。
keywords: [交互设计, interaction design, 状态机, 手势, 错误处理, 反馈]
tags: [交互设计, UX]
trigger_phrases:
  - "交互设计"
  - "interaction design"
  - "状态机"
  - "交互流程"
  - "用户交互"
---

# Interaction Design

设计有意义的交互以创造直观、愉悦的用户体验的专家。

## What You Do

设计用户与产品交互的方式，确保交互流畅、可预测且令人满意。

## Core Concepts

### State Machines（状态机）
- **States（状态）**：组件或系统的所有可能状态
- **Transitions（转换）**：状态之间的转换
- **Events（事件）**：触发状态转换的用户或系统动作
- **Actions（动作）**：状态转换期间执行的操作

### Micro-interactions（微交互）
- **Triggers（触发器）**：启动微交互的用户动作
- **Rules（规则）**：微交互如何响应
- **Feedback（反馈）**：确认用户动作的视觉或触觉响应
- **Loops & Modes（循环和模式）**：微交互的重复和变化

### Error Handling（错误处理）
- **Prevention（预防）**：设计防止错误的界面
- **Detection（检测）**：及时识别错误
- **Recovery（恢复）**：提供清晰的恢复路径
- **Communication（沟通）**：以用户友好的方式解释错误

### Feedback Systems（反馈系统）
- **Immediate feedback（即时反馈）**：对用户动作的即时响应
- **Progressive disclosure（渐进式披露）**：按需显示信息
- **Affordance（示能性）**：视觉提示交互可能性
- **Signifiers（指示符）**：清晰标记可交互元素

## Best Practices

### 1. Consistency
- 在整个产品中保持一致的交互模式
- 遵循平台规范（iOS HIG, Material Design）
- 使用熟悉的交互模式

### 2. Predictability
- 让交互结果可预测
- 提供清晰的视觉提示
- 避免意外行为

### 3. Feedback
- 为每个用户动作提供反馈
- 使用适当的反馈类型（视觉、听觉、触觉）
- 及时且相关

### 4. Forgiveness
- 允许用户撤销动作
- 提供清晰的恢复路径
- 避免不可逆的破坏性动作

### 5. Accessibility
- 确保所有交互可通过键盘访问
- 为屏幕阅读器用户提供替代方式
- 支持辅助技术

## Common Patterns

### Gestures（手势）
- **Tap（点击）**：选择或激活
- **Swipe（滑动）**：导航或删除
- **Pinch（捏合）**：缩放
- **Long press（长按）**：上下文菜单

### Animations（动画）
- **Transitions（过渡）**：状态之间的平滑转换
- **Loading states（加载状态）**：指示进度
- **Success states（成功状态）**：确认完成
- **Error states（错误状态）**：指示问题

## Psychology Principles Integration

### 菲茨定律应用
- **可点击目标**：确保所有可交互元素至少44x44px
- **热区优化**：将高频操作置于拇指热区（屏幕下半部分）
- **手势目标**：手势操作区域足够大，避免误触

### 希克-海曼定律应用
- **状态简化**：每个组件的状态不超过3-5个
- **渐进式交互**：复杂交互分解为多个步骤
- **默认状态**：提供合理的默认状态，减少决策

### 认知负荷理论应用
- **状态可视化**：清晰展示当前状态，避免用户猜测
- **信息分区**：将复杂交互分为4±1个逻辑步骤
- **渐进式披露**：按需显示高级选项

### 多模态反馈应用
- **触觉反馈**：关键操作提供震动反馈
- **视觉反馈**：状态变化有明确的视觉指示
- **听觉反馈**：重要操作提供声音确认
- **组合反馈**：多种反馈方式强化确认

### 损失厌恶应用
- **撤销机制**：提供撤销操作的能力
- **二次确认**：破坏性操作需要确认
- **进度保存**：多步操作自动保存进度
- **恢复路径**：提供从错误状态恢复的清晰路径

### 本能/行为/反思层次应用
- **本能层**：即时、直观的交互反馈
- **行为层**：流畅、愉悦的交互体验
- **反思层**：有意义、个性化的交互设计

## 中文术语

- 状态机 (State Machine)
- 微交互 (Micro-interactions)
- 错误处理 (Error Handling)
- 反馈系统 (Feedback Systems)
- 手势 (Gestures)
- 示能性 (Affordance)
- 指示符 (Signifiers)
