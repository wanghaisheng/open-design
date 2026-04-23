# Open Design 文档规范索引

## 概述

本文档是 Open Design 项目所有规范文档的总索引。Open Design 的文档体系基于分层架构，确保每个文档都有明确的职责和范围。

## 文档架构

```
Open Design 文档体系
├── 设计系统规范（核心）
│   └── DESIGN-SPEC.md
├── 研究类文档规范
│   └── RESEARCH-SPEC.md
├── 策略类文档规范
│   └── STRATEGY-SPEC.md
├── 交互类文档规范
│   └── INTERACTION-SPEC.md
└── 运营类文档规范
    └── OPS-SPEC.md
```

## 文档关系

### 设计系统规范（DESIGN-SPEC.md）

**定位**：设计系统的单一事实来源（SSOT）

**内容**：
- YAML front matter：机器可读的设计 tokens（colors, typography, rounded, spacing, breakpoints, shadows, borders, accessibility, gradients, components）
- Markdown body：人类可读的设计原理说明（Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts）

**扩展字段**（基于 DESIGN.md alpha 规范）：
- `breakpoints` - 响应式断点定义
- `shadows` - 阴影效果定义
- `borders` - 边框样式定义
- `accessibility` - 无障碍级别定义
- `gradients` - 渐变色定义

**与其他文档的关系**：
- **输入**：从研究类、策略类文档获取输入
- **引用**：被交互类、运营类文档引用
- **指导**：指导所有设计决策
- **验证**：通过研究类文档验证

### 研究类文档规范（RESEARCH-SPEC.md）

**定位**：用户研究和数据收集的规范

**文档类型**：
1. 用户画像（User Persona）
2. 访谈脚本（Interview Script）
3. 可用性测试计划（Usability Test Plan）
4. 旅程地图（Journey Map）
5. 研究报告（Research Report）

**与设计系统规范的关系**：
- **独立文档**：保持独立，不纳入设计系统规范
- **输入关系**：为设计系统规范提供输入和依据
- **验证关系**：设计系统规范需要通过研究验证
- **迭代关系**：研究反馈用于迭代设计系统规范

### 策略类文档规范（STRATEGY-SPEC.md）

**定位**：产品策略和设计方向的规范

**文档类型**：
1. 竞品分析（Competitive Analysis）
2. 设计原则（Design Principles）
3. 体验地图（Experience Map）
4. 问题框架（Problem Framing）

**与设计系统规范的关系**：
- **部分可迁移**：设计原则可以迁移到 DESIGN-SPEC.md 的 Overview section
- **输入关系**：为设计系统规范提供战略输入
- **指导关系**：指导设计系统规范的方向
- **验证关系**：设计系统规范需要验证策略文档的假设

### 交互类文档规范（INTERACTION-SPEC.md）

**定位**：交互设计和行为定义的规范

**文档类型**：
1. 状态机图（State Machine）
2. 交互流程图（Interaction Flow）
3. 原型文件（Prototype）
4. 交互规范（Interaction Specification）

**与设计系统规范的关系**：
- **部分可迁移**：组件交互状态可以迁移到 DESIGN-SPEC.md 的 Components section
- **引用关系**：交互规范引用设计系统规范的 tokens
- **补充关系**：交互规范补充设计系统规范的行为定义
- **验证关系**：交互规范验证设计系统规范的可用性

### 运营类文档规范（OPS-SPEC.md）

**定位**：设计运营和团队协作的规范

**文档类型**：
1. 设计评审（Design Critique）
2. 开发者交付包（Developer Handoff）
3. 冲刺计划（Sprint Plan）
4. 工作流文档（Workflow）

**与设计系统规范的关系**：
- **独立文档**：保持独立，不纳入设计系统规范
- **执行关系**：运营文档执行设计系统规范
- **反馈关系**：运营反馈用于迭代设计系统规范
- **验证关系**：运营验证设计系统规范的可行性

## 心理学原则整合

所有规范文档都整合了心理学原则的应用：

### 设计系统规范（DESIGN-SPEC.md）
- **Overview**：包含心理学原则的核心理念
- **Components**：组件设计应用心理学原则
- **Do's and Don'ts**：心理学原则的最佳实践

### 研究类文档规范（RESEARCH-SPEC.md）
- **用户画像**：应用认知负荷理论、格式塔原则
- **可用性测试**：验证心理学假设

### 策略类文档规范（STRATEGY-SPEC.md）
- **设计原则**：基于心理学原则制定
- **竞品分析**：应用希克定律分析竞品

### 交互类文档规范（INTERACTION-SPEC.md）
- **状态机**：应用损失厌恶设计状态转换
- **交互流程**：应用菲茨定律优化交互
- **交互规范**：应用多模态反馈

### 运营类文档规范（OPS-SPEC.md）
- **设计评审**：检查心理学原则的应用
- **开发者交付包**：包含心理学原则的实现要求

## 移动端游戏设计整合

移动端游戏设计规范已整合到设计系统规范中：

### DESIGN-SPEC.md 中的移动端游戏设计
- **Mobile Game Specifics** section：拇指热区、触控目标尺寸、手势一致性
- **Components**：游戏组件的心理学原则应用
- **Do's and Don'ts**：移动端游戏设计的最佳实践

## 使用指南

### 何时使用哪个规范

| 场景 | 使用规范 |
|------|---------|
| 定义设计系统的视觉语言 | DESIGN-SPEC.md |
| 创建用户研究文档 | RESEARCH-SPEC.md |
| 制定产品策略 | STRATEGY-SPEC.md |
| 定义交互行为 | INTERACTION-SPEC.md |
| 进行设计评审 | OPS-SPEC.md |
| 交付设计给开发者 | OPS-SPEC.md |

### 文档创建流程

1. **研究阶段**：使用 RESEARCH-SPEC.md 创建研究文档
2. **策略阶段**：使用 STRATEGY-SPEC.md 创建策略文档
3. **设计系统阶段**：使用 DESIGN-SPEC.md 创建设计系统规范
4. **交互设计阶段**：使用 INTERACTION-SPEC.md 创建交互文档
5. **运营阶段**：使用 OPS-SPEC.md 创建运营文档

### 文档更新流程

1. **研究反馈**：研究文档的反馈更新到设计系统规范
2. **策略调整**：策略文档的调整影响设计系统规范
3. **交互验证**：交互文档的验证反馈到设计系统规范
4. **运营反馈**：运营文档的反馈用于迭代设计系统规范

## 模板文件

每个规范文档都提供标准模板文件：

### DESIGN-SPEC.md
- 不需要模板，直接使用规范格式

### RESEARCH-SPEC.md
- `templates/user-persona-template.md`
- `templates/interview-script-template.md`
- `templates/usability-test-plan-template.md`
- `templates/journey-map-template.md`
- `templates/research-report-template.md`

### STRATEGY-SPEC.md
- `templates/competitive-analysis-template.md`
- `templates/design-principles-template.md`
- `templates/experience-map-template.md`
- `templates/problem-framing-template.md`

### INTERACTION-SPEC.md
- `templates/state-machine-template.md`
- `templates/interaction-flow-template.md`
- `templates/prototype-template.md`
- `templates/interaction-spec-template.md`

### OPS-SPEC.md
- `templates/design-critique-template.md`
- `templates/handoff-template.md`
- `templates/sprint-plan-template.md`
- `templates/workflow-template.md`

## 质量标准

所有规范文档必须满足以下质量标准：

### 完整性
- 包含所有必要的信息和上下文
- 覆盖关键场景和边缘情况
- 提供清晰的下一步行动

### 可读性
- 结构清晰，易于理解
- 使用专业但易懂的语言
- 提供视觉辅助（图表、示例）

### 可执行性
- 具体的实施建议
- 明确的验收标准
- 可复现的步骤

### 可维护性
- 版本化设计决策
- 记录设计理由
- 提供更新机制

## 版本控制

### 文档版本
- 每个规范文档都有独立的版本号
- 版本号遵循语义化版本控制（Semantic Versioning）
- 重大变更更新主版本号
- 小幅更新更新次版本号
- 修复更新更新补丁版本号

### 变更记录
- 每次更新记录变更原因
- 在文档末尾添加版本历史
- 重大变更需要团队评审

## 审核流程

### 规范文档审核
- 新规范文档需要经过团队评审
- 评审者检查文档的完整性和质量
- 评审意见记录在文档中
- 通过评审后才能发布

### 更新审核
- 小幅更新可以快速发布
- 重大变更需要团队评审
- 变更影响其他文档时需要协调

## 工具支持

### Lint 工具
- DESIGN-SPEC.md 可以使用 `@google/design.md lint` 进行验证
- 其他规范文档建议使用 Markdown lint 工具

### 格式化工具
- 建议使用统一的 Markdown 格式化工具
- 确保文档格式一致

### 版本控制
- 使用 Git 进行版本控制
- 每个文档都有清晰的提交历史

## 常见问题

### Q: 为什么有些文档不纳入设计系统规范？
A: 设计系统规范专注于视觉设计 tokens 和组件样式。研究、策略、运营类文档有独立的职责和范围，保持独立可以更好地维护和更新。

### Q: 如何决定将内容迁移到设计系统规范？
A: 如果内容是视觉设计相关的（颜色、字体、间距、组件样式），应该迁移到设计系统规范。如果是研究、策略、交互行为、运营流程，应该保持独立。

### Q: 如何处理文档之间的冲突？
A: 如果发现文档之间的冲突，应该：
1. 识别冲突的具体内容
2. 分析冲突的原因
3. 召集相关方讨论
4. 达成一致后更新相关文档
5. 记录冲突解决过程

### Q: 如何确保文档的一致性？
A: 通过以下方式确保一致性：
1. 定期审查所有文档
2. 使用统一的模板
3. 建立文档审核流程
4. 使用 lint 工具验证格式
5. 建立文档更新通知机制

## 参考资源

### 外部参考
- [DESIGN.md 规范](https://github.com/google/design.md)
- [W3C Design Token Format](https://www.designtokens.org/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)

### 内部参考
- [ARCH-通用两轮并行提案评审决策流程](../ref/ARCH-通用两轮并行提案评审决策流程-决策型Skill创建-H研究文档-案例研究与能力需求-v1.0_胥克谦_20260421.md)
- [AI软件工程-skill层最小充分控制原则](../ref/AI软件工程-skill层最小充分控制原则与gene分层实践总结-20260421.md)
- [DESIGN.md兼容性分析报告](../ref/DESIGN.md兼容性分析报告.md)

## 贡献指南

### 如何贡献
1. 阅读相关规范文档
2. 使用提供的模板创建文档
3. 遵循质量标准
4. 提交 Pull Request
5. 等待审核和反馈

### 审核标准
- 完整性：文档完整，无遗漏
- 准确性：内容准确，无错误
- 一致性：与其他文档一致
- 可读性：易于理解
- 可维护性：易于维护和更新

## 联系方式

如有问题或建议，请联系：
- 项目负责人：[待填写]
- 设计团队：[待填写]
- 开发团队：[待填写]

## 更新历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| 1.0 | 2026-04-23 | 初始版本，创建所有规范文档 | Open Design Team |
