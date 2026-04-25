# ROLE.md 规范定义

ROLE.md 是 RAMS 框架中定义"这个人要做什么事"的文件，描述角色的职责、技能列表、工作流程与能力要求。

---

## 核心定位

**ROLE.md = "这个人要做什么事"**

- **类比**：岗位 JD（Job Description）、任务清单、职责说明书
- **内容**：职责范围、所需技能、工作流程、能力要求
- **禁止**：具体操作步骤（应引用 SKILL.md）、个人性格（应在 soul.md）

---

## 文件结构规范

```markdown
---
name: role-name
description: 一句话描述这个角色做什么
type: [designer|developer|artist|qa|producer|...]
domain: [game-development|software-development|...]
---

# Role Title

[角色描述：这个角色在团队中负责什么]

## 核心职责

### 职责领域1
- 具体职责1
- 具体职责2
- 具体职责3

### 职责领域2
- 具体职责1
- 具体职责2

## 技能列表

### 核心技能（必须）
- skill-name-1：技能描述
- skill-name-2：技能描述
- skill-name-3：技能描述

### 扩展技能（可选）
- skill-name-4：技能描述
- skill-name-5：技能描述

## 工作流程

### 流程1：XX流程
1. 步骤1 → 引用 skill-name-1
2. 步骤2 → 引用 skill-name-2
3. 步骤3 → 引用 skill-name-3

### 流程2：XX流程
1. 步骤1 → 引用 skill-name-4
2. 步骤2 → 引用 skill-name-5

## 协作关系

### 上游（向谁汇报）
- role-name：协作内容

### 下游（协调对象）
- role-name：协作内容

## 能力要求

### 必备能力
- 能力1
- 能力2

### 加分能力
- 能力1
- 能力2

## 相关角色变体

- **变体1**：[变体名称]（技能组合差异说明）
- **变体2**：[变体名称]（技能组合差异说明）
```

---

## 章节说明

### 核心职责

- 描述角色负责的主要工作领域
- 按领域分类（设计、开发、美术、管理等）
- 每个职责应是"做什么"而非"如何做"

### 技能列表

- **核心技能**：角色必须掌握的技能（实例化时必须）
- **扩展技能**：根据项目需求可选的技能
- 每个技能引用 `skill-name`，描述其在该角色中的应用场景
- **禁止**：不要在 role.md 中描述技能的具体操作步骤

### 工作流程

- 描述角色的典型工作流程
- 每个步骤引用对应的 skill
- 说明技能之间的调用关系

### 协作关系

- **上游**：向谁汇报、接受谁的任务分配
- **下游**：协调哪些角色、分配任务给谁

### 能力要求

- **必备能力**：角色必须满足的能力标准
- **加分能力**：有助于角色表现但不必须的能力

---

## 与 SKILL.md 的区别

| 方面 | ROLE.md | SKILL.md |
|------|---------|----------|
| **聚焦** | 角色要做什么事 | 如何做这件事 |
| **内容** | 职责、技能列表、流程框架 | 操作步骤、检查清单、输出格式 |
| **粒度** | 任务级 | 步骤级 |
| **示例** | "设计游戏经济系统" | "列出货币流入流出渠道，计算平衡比" |
| **引用关系** | 引用 SKILL.md | 被 ROLE.md 引用 |

---

## 角色变体定义

角色变体通过不同的技能组合来定义：

```markdown
## 相关角色变体

- **经济设计师-手游方向**：core-loop-design + economy-design + mobile-development
- **经济设计师-PC方向**：core-loop-design + economy-design + pc-development + balance-adjustment
```

变体说明：
- 基础角色相同（经济设计师）
- 核心技能相同（core-loop-design, economy-design）
- 扩展技能不同（平台特定技能）

详细的变体配置格式请参阅 [role_VARIANT_CONFIGURATION.md](role_VARIANT_CONFIGURATION.md)。

## 技能实现覆盖

角色实例可以覆盖技能的默认实现方式：

```yaml
role_instance:
  skill_implementations:
    creative-discovery:
      implementation: fast
      config:
        temperature: 0.3
```

详细的技能实现配置请参阅 [SKILL_IMPLEMENTATION.md](SKILL_IMPLEMENTATION.md)。

---

## 质量检查清单

创建或修改 ROLE.md 后，使用此清单验证：

- [ ] 有清晰的 `核心职责` 章节
- [ ] 有 `技能列表` 章节，区分核心/扩展技能
- [ ] 每个技能引用 SKILL.md 文件（不描述具体操作）
- [ ] 有 `工作流程` 章节，说明技能调用关系
- [ ] 有 `协作关系` 章节（上游/下游）
- [ ] 没有具体操作步骤（应在 SKILL.md 中）
- [ ] 没有个人性格描述（应在 soul.md 中）

---

## 与其他文件的关系

```
soul.md (性格/价值观)
    ↓
ROLE.md (职责/技能列表)
    ↓
    ├─→ 引用 SKILL.md (如何做)
    │
    ↓
角色实例 (Role Instance) = soul + skills
    ↓
角色变体 (Role Variant) = 不同技能组合
```

---

## 参考模板

详见 `.claude/templates/role-template.md`
