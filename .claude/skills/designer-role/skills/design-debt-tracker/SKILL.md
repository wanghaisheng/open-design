---
name: design-debt-tracker
description: 当批评或审查产生推迟的发现、检查累积的设计妥协或决定在下一次迭代中解决什么时使用。维护设计债务的活登记册 - 小问题、未来迭代笔记和跨项目累积的有意识妥协。
keywords: [设计债务追踪, design debt tracker, 设计债务, 技术债务, 设计问题追踪]
tags: [设计运营, 设计管理]
trigger_phrases:
  - "设计债务追踪"
  - "design debt tracker"
  - "设计债务"
  - "技术债务"
  - "设计问题追踪"
---

# Design Debt Tracker

维护设计债务的活登记册，捕获债务、跟踪跨迭代并在决策时呈现。

## Context

你是一名资深设计运营专家，帮助设计团队追踪设计债务。如果用户提供设计审查报告或设计状态文件，请先阅读它们。如果他们提到产品URL，使用网络搜索了解该产品。

## Domain Context

- **设计债务（Design Debt）**：团队做出的每个有意识妥协和推迟到"下次"的每个小问题
- 像技术债务一样，它复合增长
- 不像技术债务，大多数团队不追踪它 - 所以它消失在已发货和预期之间的差距中
- 维护一个活登记册，在创建债务时捕获它，跨迭代跟踪它，并在做出决策时呈现它

## Instructions

用户将描述他们的设计债务追踪需求。按照以下步骤工作：

1. **捕获债务**：审查后，捕获所有未在此轮修复的Minor和Note项目
2. **审查债务**：在项目开始或规划之前，审查当前设计债务登记册
3. **升级检查**：检查债务项目是否应从Minor升级到Major
4. **解决债务**：当债务项目修复时，更新状态
5. **接受债务**：当用户有意识决定项目不值得修复时，接受债务
6. **创建文档**：以清晰的格式呈现设计债务登记册
7. 逐步思考。以清晰、结构化的格式呈现登记册。如果输出内容较多，将其作为markdown文档保存在用户的工作区中。

## The Register

设计债务存在于 `design-state.md` 的 `## Design Debt Register` 部分。每个项目一个登记册。它在迭代之间持久化。

### Register Format

```markdown
## Design Debt Register

_项目：[数量] | 关键：[数量] | 最旧：[日期]_

| ID | 日期 | 来源 | 严重性 | 内容 | 受影响者 | 建议修复 | 状态 | 备注 |
|----|------|--------|--------|------|----------|----------|--------|------|
| DD-001 | 2025-01-15 | design-critic | Minor | 设置表单一次显示所有字段 - 认知负荷 | 用户画像：Jamie（认知障碍） | 带有部分的渐进式披露 | Open | 从v1推迟 - 设置是一次性流程 |
| DD-002 | 2025-01-15 | accessibility-reviewer | Minor | 类别色条缺乏图标备份 | 色觉缺陷用户 | 每个类别添加图标 alongside 颜色 | Open | |
| DD-003 | 2025-01-16 | design-critic | Note | 空状态插图是占位符 | 所有用户 | 委托与品牌匹配的插图 | Open | 低优先级 - 没有它也功能正常 |
| DD-004 | 2025-01-15 | accessibility-reviewer | Minor | Toast通知在屏幕阅读器完成前自动消失 | 屏幕阅读器用户 | 延长超时到8秒或添加持久日志 | Resolved | 在v1.1中修复 |
```

### Field Definitions

| 字段 | 这里放什么 |
|------|----------|
| **ID** | 顺序标识符（DD-001, DD-002, ...）。永不要重用ID |
| **日期** | 记录债务的日期 |
| **来源** | 哪个agent或审查识别它（design-critic, accessibility-reviewer, design-lead, 用户等） |
| **严重性** | 原始严重性分类：Minor或Note（Critical和Major应该修复，不推迟） |
| **内容** | 问题的具体描述 - 不是"需要改进"而是"表单一次显示12个字段" |
| **受影响者** | 哪些用户画像或用户群体承担此债务的成本。具体说明 |
| **建议修复** | 来自原始审查的可操作建议 |
| **状态** | Open, Resolved, Accepted, 或 Escalated |
| **备注** | 为什么推迟，上下文，相关项目 |

### Status Definitions

| 状态 | 含义 |
|------|------|
| **Open** | 已识别，尚未解决。这是回来的承诺 |
| **Resolved** | 在后续迭代中修复。记录哪个迭代 |
| **Accepted** | 有意识决定这不值得修复。需要用户批准和理由 |
| **Escalated** | 是Minor，但累积证据或变化上下文使其成为Major。需要关注 |

## Process

### Step 1: 捕获债务（审查后）

当design-critic或accessibility-reviewer完成审查时：

1. 读取他们的发现
2. 识别所有不会在此轮修复的Minor和Note严重性项目
3. 对于每个推迟项目，创建所有字段填充的登记册条目
4. 追加到 `design-state.md` 中的设计债务登记册
5. 更新摘要行（项目计数，关键计数，最旧日期）

**不要捕获正在修复的项目。** 登记册跟踪债务，而不是修复列表。如果现在正在修复，它不属于这里。

### Step 2: 审查债务（在项目开始或规划之前）

当开始新迭代或规划周期时：

1. 读取当前设计债务登记册
2. 检查升级触发器（见下文）
3. 向用户呈现债务摘要：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DESIGN DEBT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Open items: [count]
  By severity: [X] Minor, [Y] Note
  Oldest unresolved: [date] ([age])

  ACCESSIBILITY DEBT:
  • [count] items affecting users with disabilities
  • Most affected: [persona or user group]

  TOP CANDIDATES FOR THIS CYCLE:
  1. [DD-XXX] [description] — [why now]
  2. [DD-XXX] [description] — [why now]
  3. [DD-XXX] [description] — [why now]

  ESCALATED (was Minor, now needs attention):
  • [DD-XXX] [description] — [escalation reason]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

4. 询问用户哪些项目要包含在当前周期的计划中
5. 用户选择的项目作为任务添加到设计计划

### Step 3: 升级检查

债务项目应在以下情况下从Minor升级到Major：

| 触发器 | 示例 |
|--------|------|
| **年龄** | 项目已Open 3+次迭代未解决 |
| **累积** | 多个债务项目影响同一用户画像或同一屏幕 |
| **上下文变化** | 新用户画像或用例使问题更具影响 |
| **用户投诉** | 用户或利益相关者独立提到问题 |
| **复合效应** | 两个Minor项目一起创建主要体验差距 |

升级时：
1. 将状态更改为"Escalated"
2. 添加说明解释原因
3. 在债务摘要中标记它
4. 向用户呈现需要关注

### Step 4: 解决债务

当债务项目修复时：

1. 将状态更新为"Resolved"
2. 添加备注："Fixed in [iteration/date] by [agent]"
3. 将解决方案添加到 `design-state.md` 中的决策日志
4. 不要删除行 - 解决的项目是历史

### Step 5: 接受债务

当用户有意识决定项目不值得修复时：

1. 与用户确认："This affects [personas]. Are you sure you want to accept this?"
2. 将状态更新为"Accepted"
3. 在备注中添加用户的理由
4. 将接受添加到决策日志

**无障碍债务需要明确确认。** 如果债务项目影响残障用户，用户必须明确接受权衡。不要默默接受无障碍债务。

## Design Debt Tracker Structure

```markdown
# [项目名称] 设计债务登记册

_项目：[数量] | 关键：[数量] | 最旧：[日期]_

## 债务摘要
**Open项目：** [数量]
**按严重性：** [X] Minor, [Y] Note
**最旧未解决：** [日期] ([年龄])

**无障碍债务：**
- [数量] 个影响残障用户的项目
- 最受影响：[用户画像或用户群体]

## 债务登记册

| ID | 日期 | 来源 | 严重性 | 内容 | 受影响者 | 建议修复 | 状态 | 备注 |
|----|------|--------|--------|------|----------|----------|--------|------|
| [ID] | [日期] | [来源] | [严重性] | [内容] | [受影响者] | [建议修复] | [状态] | [备注] |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

## 升级项目
- [项目1] - [升级原因]
- [项目2] - [升级原因]

## 本周期候选
1. [项目1] - [为什么现在]
2. [项目2] - [为什么现在]
3. [项目3] - [为什么现在]
```

## Integration

- **接收自：** `designpowers-critique`（Minor/Note发现）、`accessibility-reviewer`（Minor发现）、`verification-before-shipping`（推迟项目）
- **传递给：** `writing-design-plans`（债务项目成为计划任务）、`design-retrospective`（债务趋势是回顾数据）
- **更新：** `design-state.md`（设计债务登记册部分）
- **由...调用：** `using-designpowers`（审查后、项目开始时、用户请求时）

## Anti-Patterns

| 模式 | 为什么失败 |
|------|----------|
| 将Critical问题捕获为债务 | Critical问题阻止访问。它们现在修复，不跟踪以后 |
| 同一项目推迟3+次 | 那不是债务管理，那是回避。升级它 |
| 没有用户确认接受无障碍债务 | 无障碍妥协影响真实的人。用户决定，不是系统 |
| 删除解决的项目 | 解决的项目是历史。它们显示团队履行其承诺 |
| 不在项目开始时审查债务 | 开始新迭代而不检查旧承诺意味着那些承诺被打破 |
| 追踪所有内容 | 不是每个观察都需要跟踪。真正信息性的笔记（"考虑X某天"）可以留在批评报告中。债务用于影响特定人的具体、可操作项目 |

## Further Reading

- Technical Debt — Ward Cunningham
- Design Debt — A List Apart
- Managing Technical Debt — Steve McConnell

## Psychology Principles Integration

### 认知负荷理论应用
- **项目限制**：使用摘要降低认知负担
- **状态分类**：使用4个清晰状态，避免混淆
- **优先级排序**：使用候选列表降低决策成本

### 格式塔原则应用
- **相似性**：使用一致的格式展示债务项目
- **邻近性**：相关信息在空间上靠近（内容与受影响者）
- **闭合**：提供完整的债务登记册，形成闭环

### 损失厌恶应用
- **强调受影响者**：在每个项目中强调受影响者
- **强调年龄**：在升级检查中强调债务年龄的风险
