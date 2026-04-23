---
version: "1.0"
name: "Component Specification"
description: "创建完整的组件规格文档，包括Props、状态、样式、交互和无障碍要求"
component_name: "[组件名称]"
component_type: "原子/分子/有机"
framework: "React/Vue/Svelte"
---

# Component Specification

## 组件概览
- **组件名称**：[组件名称]
- **组件类型**：[原子/分子/有机]
- **框架**：[React/Vue/Svelte]
- **创建日期**：[日期]
- **版本**：1.0

## 组件描述

### 用途
[描述组件的主要用途和使用场景]

### 何时使用
- [使用场景1]
- [使用场景2]
- [使用场景3]

### 何时不使用
- [不使用场景1]
- [不使用场景2]

## Props接口

```typescript
interface [ComponentName]Props {
  // 必需属性
  [requiredProp]: [type];
  
  // 可选属性
  [optionalProp]?: [type];
  
  // 变体
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  // 尺寸
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  // 状态
  disabled?: boolean;
  loading?: boolean;
  
  // 事件处理
  onClick?: (event: Event) => void;
  onChange?: (value: any) => void;
  
  // 子元素
  children?: React.ReactNode;
}
```

### Props说明

| 属性 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| [prop1] | [type] | [是/否] | [默认值] | [描述] |
| [prop2] | [type] | [是/否] | [默认值] | [描述] |
| [prop3] | [type] | [是/否] | [默认值] | [描述] |

## 组件状态

### 状态列表
| 状态 | 描述 | 触发条件 | 视觉表现 |
|------|------|---------|---------|
| default | 默认状态 | 初始状态 | [描述] |
| hover | 悬停状态 | 鼠标悬停 | [描述] |
| active | 激活状态 | 点击/按下 | [描述] |
| focus | 焦点状态 | 键盘焦点 | [描述] |
| disabled | 禁用状态 | disabled=true | [描述] |
| loading | 加载状态 | loading=true | [描述] |
| error | 错误状态 | 验证失败 | [描述] |

### 状态转换
```
default → hover → active → default
default → focus → default
default → disabled → default
default → loading → default/error
```

## 样式规范

### 设计令牌
| 令牌 | 值 | 用途 |
|------|-----|------|
| --component-bg | # | 背景色 |
| --component-text | # | 文本色 |
| --component-border | # | 边框色 |
| --component-radius | 8px | 圆角 |
| --component-shadow | 0 2px 4px rgba(0,0,0,0.1) | 阴影 |

### 变体样式
| 变体 | 背景色 | 文本色 | 边框色 | 用途 |
|------|--------|--------|--------|------|
| primary | # | # | # | 主要操作 |
| secondary | # | # | # | 次要操作 |
| tertiary | # | # | # | 第三操作 |

### 尺寸样式
| 尺寸 | 高度 | 内边距 | 字号 | 圆角 |
|------|------|--------|------|------|
| sm | 32px | 8px 16px | 14px | 4px |
| md | 40px | 12px 20px | 16px | 6px |
| lg | 48px | 16px 24px | 18px | 8px |
| xl | 56px | 20px 28px | 20px | 10px |

## 交互规范

### 动画时长
| 交互 | 时长 | 缓动函数 |
|------|------|---------|
| hover | 150ms | ease-out |
| active | 100ms | ease-in |
| focus | 200ms | ease-in-out |
| loading | 持续 | linear |

### 交互反馈
- **悬停**：[悬停反馈描述]
- **点击**：[点击反馈描述]
- **焦点**：[焦点反馈描述]
- **加载**：[加载反馈描述]

## 无障碍要求

### 键盘导航
- [ ] Tab键可访问
- [ ] Enter/Space触发点击
- [ ] 焦点指示器清晰
- [ ] 逻辑的Tab顺序

### ARIA属性
| 属性 | 值 | 用途 |
|------|-----|------|
| role | [role] | 组件角色 |
| aria-label | [label] | 可访问标签 |
| aria-describedby | [id] | 关联描述 |
| aria-disabled | [true/false] | 禁用状态 |

### 屏幕阅读器
- [ ] 语义化HTML
- [ ] 适当的ARIA角色
- [ ] 状态变化通过live region宣布
- [ ] 错误消息关联

## 使用示例

### 基础用法
```jsx
<[ComponentName] variant="primary" size="md">
  Button Text
</[ComponentName]>
```

### 完整用法
```jsx
<[ComponentName]
  variant="primary"
  size="lg"
  disabled={false}
  loading={false}
  onClick={handleClick}
>
  Button Text
</[ComponentName]>
```

### 变体示例
```jsx
// Primary
<[ComponentName] variant="primary">Primary</[ComponentName]>

// Secondary
<[ComponentName] variant="secondary">Secondary</[ComponentName]>

// Tertiary
<[ComponentName] variant="tertiary">Tertiary</[ComponentName]>
```

## 测试用例

### 视觉测试
| 测试场景 | 预期结果 | 状态 |
|---------|---------|------|
| 默认状态显示正确 | ✓ | ✓ |
| hover状态显示正确 | ✓ | ✓ |
| active状态显示正确 | ✓ | ✓ |
| disabled状态显示正确 | ✓ | ✓ |

### 功能测试
| 测试场景 | 预期结果 | 状态 |
|---------|---------|------|
| onClick触发正确 | ✓ | ✓ |
| disabled时不触发onClick | ✓ | ✓ |
| loading时不触发onClick | ✓ | ✓ |

### 无障碍测试
| 测试场景 | 预期结果 | 状态 |
|---------|---------|------|
| 键盘导航正常 | ✓ | ✓ |
| 屏幕阅读器正确朗读 | ✓ | ✓ |
| 对比度符合标准 | ✓ | ✓ |

## 版本历史
| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| 1.0 | [日期] | 初始版本 | [作者] |
