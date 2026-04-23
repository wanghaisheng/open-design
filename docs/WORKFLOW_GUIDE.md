# Workflow Guide

本指南说明如何使用Open Design的workflow系统完成设计任务。

---

## 概述

Open Design提供了三个核心workflow，分别对应不同的使用场景：

1. **prd-to-mvp** - 从PRD到MVP的完整实施计划
2. **prd-to-prototype** - 从PRD到原型的技能使用指南
3. **requirement-to-task** - 从一句话需求到任务完成的RAMS框架指南

---

## Workflow位置

所有workflow文件位于 `.windsurf/workflows/` 目录：

```
.windsurf/workflows/
├── prd-to-mvp.md
├── prd-to-prototype.md
└── requirement-to-task.md
```

---

## Workflow选择指南

### 何时使用 prd-to-mvp

**适用场景**：
- 已有完整的产品需求文档（PRD）
- 需要从PRD构建完整的MVP产品
- 需要系统化的阶段划分和时间规划
- 需要完整的交付物清单

**工作流程**：
```
PRD → 研究阶段 → 策略阶段 → 设计阶段 → 交互阶段 → 系统阶段 → 原型阶段 → 开发阶段 → MVP交付
```

**关键输出**：
- 阶段性文档（研究、策略、设计、交互、系统）
- HTML原型
- Monorepo项目结构
- 交付规范

**使用方式**：
```
调用workflow: prd-to-mvp
输入: PRD文档路径
输出: 完整的实施计划和阶段性文档
```

---

### 何时使用 prd-to-prototype

**适用场景**：
- 已有PRD，但目标是快速验证设计假设
- 需要创建高保真HTML原型
- 需要了解如何组合使用不同的design skills
- 时间有限，不需要完整MVP

**工作流程**：
```
PRD → 研究阶段 → 策略阶段 → 设计阶段 → 系统阶段 → 原型阶段
```

**关键输出**：
- 用户画像、体验旅程
- 设计原则、竞品分析
- 设计令牌、布局网格、色彩系统
- 交互设计、组件规格
- HTML原型文件

**使用方式**：
```
调用workflow: prd-to-prototype
输入: PRD文档路径
输出: 可交互的HTML原型
```

---

### 何时使用 requirement-to-task

**适用场景**：
- 只有一句话需求，没有完整PRD
- 需要通过AI工作坊编排探索设计方向
- 需要并行探索多个设计方案
- 需要迭代优化和理性决策

**工作流程**：
```
一句话需求 → 工作坊编排 → 方向生成 → 并行探索 → 迭代优化 → 质量门 → 结果合成 → 决策制定 → 执行设计技能 → 评审验证
```

**关键输出**：
- 工作坊计划
- 多个设计探索方向
- 优化后的设计方案
- 最终设计方案选择
- 完整的设计输出

**使用方式**：
```
调用workflow: requirement-to-task
输入: 一句话需求（如"设计一个电商App的首页"）
输出: 完整的设计方案和交付物
```

---

## Workflow对比

| 特性 | prd-to-mvp | prd-to-prototype | requirement-to-task |
|------|-----------|------------------|---------------------|
| 输入要求 | 完整PRD | 完整PRD | 一句话需求 |
| 输出范围 | MVP产品 | HTML原型 | 设计方案 |
| 时间规划 | 包含 | 可选 | 可选 |
| AI编排 | 有限 | 有限 | 完整（RAMS框架） |
| 适用阶段 | 正式开发 | 快速验证 | 早期探索 |
| 复杂度 | 高 | 中 | 高 |

---

## 使用Workflow

### 方法1：通过Windsurf UI

1. 打开Windsurf
2. 进入Workflow面板
3. 选择对应的workflow
4. 填写输入参数
5. 执行workflow

### 方法2：通过命令行

```bash
# 使用prd-to-mvp workflow
windsurf workflow run prd-to-mvp --input prd.md

# 使用prd-to-prototype workflow
windsurf workflow run prd-to-prototype --input prd.md

# 使用requirement-to-task workflow
windsurf workflow run requirement-to-task --input "设计一个电商App的首页"
```

### 方法3：通过Claude Skills

在Claude对话中直接引用workflow：

```
请使用 prd-to-mvp workflow 处理我的PRD文档
```

---

## Workflow自定义

### 修改workflow内容

workflow文件是Markdown格式，可以直接编辑：

1. 打开 `.windsurf/workflows/` 目录
2. 编辑对应的workflow文件
3. 保存后立即生效

### 创建自定义workflow

1. 在 `.windsurf/workflows/` 创建新的 `.md` 文件
2. 添加YAML front matter：
   ```yaml
   ---
   description: 你的workflow描述
   ---
   ```
3. 编写workflow内容
4. 保存后即可使用

---

## 最佳实践

### 1. 选择合适的workflow

- 有完整PRD → 使用 `prd-to-mvp` 或 `prd-to-prototype`
- 只有一句话需求 → 使用 `requirement-to-task`
- 快速验证 → 使用 `prd-to-prototype`
- 完整开发 → 使用 `prd-to-mvp`

### 2. 迭代使用workflow

workflow可以多次调用，每次迭代优化：

```
第一次: requirement-to-task → 生成初步方案
第二次: prd-to-prototype → 创建原型验证
第三次: prd-to-mvp → 完整开发
```

### 3. 结合模板使用

workflow输出的文档可以使用 `templates/` 目录下的模板：

- 研究类模板：USER-PERSONA.md, JOURNEY-MAP.md
- 策略类模板：DESIGN-PRINCIPLES.md, COMPETITIVE-ANALYSIS.md
- 设计类模板：COLOR-SYSTEM.md, LAYOUT-GRID.md
- 交互类模板：INTERACTION-DESIGN.md, STATE-MACHINE.md
- 系统类模板：COMPONENT-SPEC.md, ACCESSIBILITY.md
- 编排类模板：WORKSHOP-ORCHESTRATION.md, PARALLEL-EXPLORATION.md

### 4. 文档管理

将workflow输出保存到标准目录结构：

```
project/
├── docs/
│   ├── research/      # 研究阶段输出
│   ├── strategy/      # 策略阶段输出
│   ├── design/        # 设计阶段输出
│   ├── interaction/   # 交互阶段输出
│   ├── system/        # 系统阶段输出
│   └── prototype/     # 原型阶段输出
└── prototypes/        # HTML原型文件
```

---

## 常见问题

### Q1: 可以同时使用多个workflow吗？

**A**: 可以。例如，先用 `requirement-to-task` 生成初步方案，再用 `prd-to-prototype` 创建原型。

### Q2: workflow的输出可以修改吗？

**A**: 可以。workflow输出是Markdown文档，可以直接编辑修改。

### Q3: 如何跳过workflow的某些阶段？

**A**: 编辑workflow文件，注释掉不需要的阶段，或使用最小可行流程（MVP Path）。

### Q4: workflow支持自定义参数吗？

**A**: 支持。在workflow文件中定义参数，执行时传入。

### Q5: 如何验证workflow的输出质量？

**A**: 使用 `design-critique` skill评审输出，或使用 `quality-gate` workflow检查。

---

## 相关资源

- [Workflow文件位置](../.windsurf/workflows/)
- [模板文件位置](../templates/)
- [设计规范文档](INDEX.md)
- [RAMS框架文档](../ref/RAMS_FRAMEWORK.md)
