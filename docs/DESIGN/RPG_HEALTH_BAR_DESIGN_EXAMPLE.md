# RPG游戏角色血条设计 - RAMS框架执行示例

本文档通过一个具体任务——为RPG游戏设计角色血条，展示RAMS框架的完整执行链路。

---

## 任务描述

**任务**：为某款RPG游戏设计角色的血条UI组件

**需求**：
- 支持不同血量状态（满血、受伤、濒死）
- 支持血量变化动画
- 支持不同角色类型（战士、法师、弓箭手）
- 符合游戏整体视觉风格
- 性能优化，不影响游戏帧率

---

## 执行环境配置

### 运行环境
- **IDE**：Windsurf IDE
- **模型**：SWE-1.6
- **支持的渠道**：
  - ✅ AI模型渠道（所有模型）
  - ✅ Python/JS脚本
  - ✅ MCP协议
  - ✅ OpenCLI

### 当前环境优势
- 完整的文件系统访问
- Git集成
- 终端访问
- 支持所有Skill实现渠道

---

## 角色选择与实例化

### 选择角色：design-lead

**选择理由**：
- 任务涉及UI组件设计
- 需要设计系统思维
- 需要视觉设计能力
- 需要考虑一致性和可扩展性

### 角色实例化

```yaml
# 角色实例化配置
role:
  name: "design-lead"
  version: "1.0.0"
  soul_ref: "./soul.md"
  
  # 技能堆栈
  skills:
    - token-architecture        # P0 - 设计令牌架构
    - design-system-alignment   # P0 - 设计系统对齐
    - ui-composition            # P0 - UI组合
    - interaction-design        # P1 - 交互设计
    - design-state              # P1 - 设计状态管理
    - design-taste              # P2 - 设计品味
```

### Soul（人格设定）加载

**Design Lead Soul核心特质**：
- **视觉敏感**：对色彩、排版、布局有敏锐的感知力
- **系统思维**：能够从整体视角构建设计系统
- **细节把控**：对每个像素、每个间距都精益求精
- **工艺追求**：不仅追求功能实现，更追求视觉和交互的完美

**工作原则**：
1. 一致性优先：确保所有设计元素遵循统一的设计系统
2. 可扩展性：设计系统必须能够支持未来的扩展和变化
3. 用户中心：所有设计决策都基于用户需求和体验
4. 性能考虑：视觉设计必须考虑性能和实现成本

---

## Skill解析与执行

### Step 1: Skill定义解析

**任务输入**：
```json
{
  "task": "设计RPG游戏角色血条UI组件",
  "requirements": {
    "health_states": ["full", "injured", "critical"],
    "animation": true,
    "character_types": ["warrior", "mage", "archer"],
    "visual_style": "fantasy",
    "performance": "optimized"
  }
}
```

**Skill解析**：
- 识别任务类型：UI组件设计
- 匹配所需技能：ui-composition, interaction-design, token-architecture
- 确定实现渠道：AI模型渠道（SWE-1.6）

### Step 2: 渠道选择

**渠道决策**：
```
任务类型：UI组件设计
    ↓
任务特性：创造性 + 推理
    ↓
首选渠道：AI模型渠道
    ↓
具体模型：SWE-1.6（当前环境）
```

**选择理由**：
- 任务需要创造性设计（血条视觉设计）
- 需要推理能力（考虑不同状态和角色类型）
- SWE-1.6在Windsurf环境中可用
- AI模型渠道支持视觉设计和代码生成

### Step 3: 环境适配

**环境检查**：
- ✅ Windsurf支持AI模型渠道
- ✅ SWE-1.6模型可用
- ✅ 文件系统访问（用于保存设计稿）
- ✅ 终端访问（用于代码验证）

**适配策略**：
- 使用原生支持的AI模型渠道
- 无需降级处理
- 利用Windsurf的完整工具链

---

## Skill执行过程

### Skill 1: token-architecture（设计令牌架构）

**执行内容**：
```yaml
# 血条设计令牌
health_bar_tokens:
  colors:
    health_full:
      value: "#4CAF50"
      description: "满血状态颜色"
    health_injured:
      value: "#FFC107"
      description: "受伤状态颜色"
    health_critical:
      value: "#F44336"
      description: "濒死状态颜色"
    background:
      value: "#1A1C1E"
      description: "血条背景色"
  
  dimensions:
    bar_height:
      value: "8px"
      description: "血条高度"
    bar_width:
      value: "100%"
      description: "血条宽度"
    corner_radius:
      value: "4px"
      description: "圆角半径"
  
  animation:
    transition_duration:
      value: "300ms"
      description: "血量变化动画时长"
    easing:
      value: "ease-out"
      description: "动画缓动函数"
```

**执行方式**：
- 渠道：AI模型渠道（SWE-1.6）
- 输入：RPG游戏风格、性能要求
- 输出：设计令牌定义
- 保存位置：`packages/ui/src/tokens/health-bar.ts`

### Skill 2: ui-composition（UI组合）

**执行内容**：
```tsx
// 血条组件设计
interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  characterType: 'warrior' | 'mage' | 'archer';
}

const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  characterType
}) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;
  const healthState = getHealthState(healthPercentage);
  
  return (
    <div className="health-bar-container">
      <div 
        className={`health-bar health-${healthState} character-${characterType}`}
        style={{ width: `${healthPercentage}%` }}
      >
        <div className="health-bar-fill" />
        <div className="health-bar-glow" />
      </div>
      <div className="health-bar-text">
        {currentHealth} / {maxHealth}
      </div>
    </div>
  );
};
```

**执行方式**：
- 渠道：AI模型渠道（SWE-1.6）
- 输入：设计令牌、组件需求
- 输出：React组件代码
- 保存位置：`packages/ui/src/components/HealthBar.tsx`

### Skill 3: interaction-design（交互设计）

**执行内容**：
```css
/* 血条交互动画 */
.health-bar {
  transition: width 300ms ease-out;
}

.health-bar-fill {
  transition: background-color 300ms ease-out;
}

.health-bar-glow {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.health-critical .health-bar-glow {
  animation: critical-pulse 1s ease-in-out infinite;
}

@keyframes critical-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}
```

**执行方式**：
- 渠道：AI模型渠道（SWE-1.6）
- 输入：交互需求、性能要求
- 输出：CSS动画代码
- 保存位置：`packages/ui/src/components/HealthBar.css`

### Skill 4: design-system-alignment（设计系统对齐）

**执行内容**：
```yaml
# 设计系统对齐检查
design_system_alignment:
  color_tokens:
    - health_full: "使用primary-success令牌"
    - health_injured: "使用primary-warning令牌"
    - health_critical: "使用primary-error令牌"
  
  spacing_tokens:
    - bar_height: "使用spacing-sm令牌"
    - corner_radius: "使用radius-sm令牌"
  
  animation_tokens:
    - transition_duration: "使用animation-medium令牌"
  
  consistency_check:
    - ✅ 颜色符合设计系统
    - ✅ 间距符合设计系统
    - ✅ 动画符合设计系统
    - ✅ 组件命名规范一致
```

**执行方式**：
- 渠道：AI模型渠道（SWE-1.6）
- 输入：设计稿、设计系统规范
- 输出：对齐检查报告
- 保存位置：`docs/health-bar-alignment.md`

---

## 完整执行链路

```
1. 角色实例化
   └─ 加载 design-lead 角色
   └─ 加载 Soul（视觉敏感、系统思维、细节把控、工艺追求）
   └─ 加载 Skills（token-architecture, ui-composition, interaction-design, design-system-alignment）

2. Skill解析
   └─ 解析任务：设计RPG游戏角色血条
   └─ 识别需求：多状态、动画、多角色类型、性能优化
   └─ 匹配技能：ui-composition, interaction-design, token-architecture

3. 渠道选择
   └─ 任务类型：UI组件设计（创造性 + 推理）
   └─ 首选渠道：AI模型渠道
   └─ 具体模型：SWE-1.6（Windsurf环境）

4. 环境适配
   └─ 检查环境：Windsurf IDE
   └─ 验证支持：✅ AI模型渠道、✅ 文件系统、✅ 终端
   └─ 适配策略：使用原生AI模型渠道

5. 执行调用
   └─ 通过SWE-1.6执行token-architecture → 生成设计令牌
   └─ 通过SWE-1.6执行ui-composition → 生成组件代码
   └─ 通过SWE-1.6执行interaction-design → 生成动画代码
   └─ 通过SWE-1.6执行design-system-alignment → 生成对齐报告

6. 结果处理
   └─ 验证输出Schema
   └─ 保存文件到项目
   └─ 更新记忆和状态
```

---

## 输出结果

### 文件结构
```
packages/ui/src/
├── tokens/
│   └── health-bar.ts          # 设计令牌
├── components/
│   ├── HealthBar.tsx          # 组件代码
│   └── HealthBar.css          # 样式代码
docs/
└── health-bar-alignment.md    # 对齐报告
```

### 设计令牌示例
```typescript
export const healthBarTokens = {
  colors: {
    full: '#4CAF50',
    injured: '#FFC107',
    critical: '#F44336',
    background: '#1A1C1E'
  },
  dimensions: {
    height: '8px',
    width: '100%',
    cornerRadius: '4px'
  },
  animation: {
    duration: '300ms',
    easing: 'ease-out'
  }
};
```

### 组件代码示例
```tsx
// HealthBar.tsx
import React from 'react';
import { healthBarTokens } from '../tokens/health-bar';

export const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  characterType
}) => {
  // 组件实现
};
```

---

## 记忆更新

### 提示词记忆
- 记录RPG游戏血条设计模式
- 记录健康状态颜色方案
- 记录性能优化技巧

### 会话存档
- 保存设计决策过程
- 保存迭代历史
- 保存用户反馈

### 技能记忆
- token-architecture技能：积累游戏UI设计令牌经验
- ui-composition技能：积累血条组件设计模式
- interaction-design技能：积累血量变化动画经验

### 向量索引
- 索引血条组件代码
- 索引设计令牌
- 索引动画模式

---

## 后置学习（可选）

如果任务执行后收到用户反馈，系统会触发后置学习：

### 场景1：用户反馈"血条动画太慢"
```
反馈 → 降低SWE-1.6在该任务类型上的适配分（演员适配）
    ↓
触发后置学习 → 分析对话，发现动画时长需要调整
    ↓
调用 patch_skill → 修改token-architecture技能
    ↓
将默认动画时长从300ms调整为200ms
    ↓
进化后的角色定义被保存
```

### 场景2：用户反馈"颜色对比度不够"
```
反馈 → 降低SWE-1.6在该任务类型上的适配分（演员适配）
    ↓
触发后置学习 → 分析对话，发现颜色需要调整
    ↓
调用 patch_skill → 修改token-architecture技能
    ↓
增加无障碍检查步骤，确保颜色对比度符合WCAG标准
    ↓
进化后的角色定义被保存
```

---

## 总结

通过这个RPG游戏血条设计任务，我们展示了RAMS框架的完整执行链路：

1. **角色实例化**：加载design-lead角色和Soul
2. **Skill解析**：识别任务需求，匹配相应技能
3. **渠道选择**：选择AI模型渠道（SWE-1.6）
4. **环境适配**：在Windsurf环境中执行
5. **执行调用**：通过SWE-1.6执行多个Skill
6. **结果处理**：生成设计令牌、组件代码、动画代码
7. **记忆更新**：积累经验和模式

**关键优势**：
- 定义与实现分离：Skill只定义"做什么"，实现由AI模型完成
- 多渠道支持：可根据任务选择最佳实现渠道
- 环境适配：在不同环境中保持一致性
- 持续进化：通过后置学习不断优化角色能力

这种架构使得RAMS框架能够高效、灵活地完成各种设计任务。
