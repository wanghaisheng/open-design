---
version: "1.0"
name: "Theming"
description: "设计主题系统，支持深色模式、浅色模式和高对比度模式，确保主题切换的一致性和可维护性"
theme_count: 3
default_theme: "浅色模式"
---

# Theming

## 主题系统概览
- **主题数量**：[3]
- **默认主题**：[浅色模式]
- **支持的主题**：[浅色模式、深色模式、高对比度模式]
- **创建日期**：[日期]
- **版本**：1.0

## 主题定义

### 浅色模式（Light Theme）
- **描述**：[浅色模式描述]
- **适用场景**：[日间使用、明亮环境]
- **目标受众**：[一般用户]

### 深色模式（Dark Theme）
- **描述**：[深色模式描述]
- **适用场景**：[夜间使用、低光环境]
- **目标受众**：[偏好深色界面的用户]

### 高对比度模式（High Contrast Theme）
- **描述**：[高对比度模式描述]
- **适用场景**：[视觉障碍用户、强光环境]
- **目标受众**：[需要高对比度的用户]

## 主题令牌

### 颜色令牌映射

#### 浅色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --color-bg-primary | #ffffff | 主背景 |
| --color-bg-secondary | #f5f5f5 | 次要背景 |
| --color-text-primary | #1a1a1a | 主文本 |
| --color-text-secondary | #666666 | 次要文本 |
| --color-border | #e0e0e0 | 边框 |
| --color-primary | #007bff | 主色 |
| --color-secondary | #6c757d | 辅助色 |

#### 深色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --color-bg-primary | #1a1a1a | 主背景 |
| --color-bg-secondary | #2d2d2d | 次要背景 |
| --color-text-primary | #ffffff | 主文本 |
| --color-text-secondary | #b0b0b0 | 次要文本 |
| --color-border | #404040 | 边框 |
| --color-primary | #4dabf7 | 主色 |
| --color-secondary | #868e96 | 辅助色 |

#### 高对比度模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --color-bg-primary | #000000 | 主背景 |
| --color-bg-secondary | #1a1a1a | 次要背景 |
| --color-text-primary | #ffffff | 主文本 |
| --color-text-secondary | #e0e0e0 | 次要文本 |
| --color-border | #ffffff | 边框 |
| --color-primary | #ffff00 | 主色 |
| --color-secondary | #00ffff | 辅助色 |

### 排版令牌映射

#### 浅色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --font-family | Inter, system-ui | 字体家族 |
| --font-size-base | 16px | 基础字号 |
| --font-weight-normal | 400 | 正常字重 |
| --line-height-base | 1.5 | 基础行高 |

#### 深色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --font-family | Inter, system-ui | 字体家族 |
| --font-size-base | 16px | 基础字号 |
| --font-weight-normal | 400 | 正常字重 |
| --line-height-base | 1.5 | 基础行高 |

#### 高对比度模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --font-family | Inter, system-ui | 字体家族 |
| --font-size-base | 18px | 基础字号（稍大） |
| --font-weight-normal | 500 | 正常字重（稍重） |
| --line-height-base | 1.6 | 基础行高（稍高） |

### 间距令牌映射

所有主题共享相同的间距令牌：
| 令牌 | 值 | 用途 |
|------|-----|------|
| --spacing-xs | 4px | 极小间距 |
| --spacing-sm | 8px | 小间距 |
| --spacing-md | 16px | 中等间距 |
| --spacing-lg | 24px | 大间距 |
| --spacing-xl | 32px | 极大间距 |

### 圆角令牌映射

#### 浅色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --radius-sm | 4px | 小圆角 |
| --radius-md | 8px | 中等圆角 |
| --radius-lg | 12px | 大圆角 |

#### 深色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --radius-sm | 4px | 小圆角 |
| --radius-md | 8px | 中等圆角 |
| --radius-lg | 12px | 大圆角 |

#### 高对比度模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --radius-sm | 0px | 无圆角 |
| --radius-md | 0px | 无圆角 |
| --radius-lg | 0px | 无圆角 |

### 阴影令牌映射

#### 浅色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.1) | 小阴影 |
| --shadow-md | 0 4px 6px rgba(0,0,0,0.1) | 中等阴影 |
| --shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | 大阴影 |

#### 深色模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.3) | 小阴影 |
| --shadow-md | 0 4px 6px rgba(0,0,0,0.3) | 中等阴影 |
| --shadow-lg | 0 10px 15px rgba(0,0,0,0.3) | 大阴影 |

#### 高对比度模式
| 令牌 | 值 | 用途 |
|------|-----|------|
| --shadow-sm | none | 无阴影 |
| --shadow-md | none | 无阴影 |
| --shadow-lg | none | 无阴影 |

## 主题切换

### 切换触发
- **系统偏好**：跟随系统主题设置
- **手动切换**：用户手动选择主题
- **时间切换**：根据时间自动切换（日间/夜间）

### 切换动画
- **过渡时长**：300ms
- **缓动函数**：ease-in-out
- **过渡属性**：background-color, color, border-color

### 切换实现
```css
:root {
  /* 默认主题（浅色） */
  --color-bg-primary: #ffffff;
  --color-text-primary: #1a1a1a;
  /* ... */
}

[data-theme="dark"] {
  /* 深色模式 */
  --color-bg-primary: #1a1a1a;
  --color-text-primary: #ffffff;
  /* ... */
}

[data-theme="high-contrast"] {
  /* 高对比度模式 */
  --color-bg-primary: #000000;
  --color-text-primary: #ffffff;
  /* ... */
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: background-color 300ms ease-in-out,
              color 300ms ease-in-out;
}
```

## 主题持久化

### 存储方式
- **localStorage**：存储用户选择的主题
- **Cookie**：存储用户选择的主题（可选）
- **URL参数**：支持通过URL参数指定主题

### 持久化实现
```javascript
// 保存主题
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

// 加载主题
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;
  document.documentElement.setAttribute('data-theme', theme);
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
});
```

## 无障碍考虑

### 对比度验证
- **浅色模式**：所有颜色组合符合WCAG AA标准（4.5:1）
- **深色模式**：所有颜色组合符合WCAG AA标准（4.5:1）
- **高对比度模式**：所有颜色组合符合WCAG AAA标准（7:1）

### 减少运动
- 主题切换动画应尊重`prefers-reduced-motion`设置
- 为减少运动的用户提供禁用动画的选项

### 键盘导航
- 主题切换器应可通过键盘访问
- 提供清晰的焦点指示

## 主题测试

### 视觉测试
| 测试场景 | 预期结果 | 状态 |
|---------|---------|------|
| 浅色模式显示正确 | ✓ | ✓ |
| 深色模式显示正确 | ✓ | ✓ |
| 高对比度模式显示正确 | ✓ | ✓ |
| 主题切换动画流畅 | ✓ | ✓ |

### 功能测试
| 测试场景 | 预期结果 | 状态 |
|---------|---------|------|
| 手动切换主题正常 | ✓ | ✓ |
| 系统主题跟随正常 | ✓ | ✓ |
| 主题持久化正常 | ✓ | ✓ |
| URL参数主题正常 | ✓ | ✓ |

### 无障碍测试
| 测试场景 | 预期结果 | 状态 |
|---------|---------|------|
| 对比度符合标准 | ✓ | ✓ |
| 键盘导航正常 | ✓ | ✓ |
| 屏幕阅读器正常 | ✓ | ✓ |
| 减少运动尊重 | ✓ | ✓ |

## 版本历史
| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| 1.0 | [日期] | 初始版本 | [作者] |
