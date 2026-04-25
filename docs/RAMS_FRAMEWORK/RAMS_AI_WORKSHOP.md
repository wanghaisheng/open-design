# RAMS AI设计工作坊

基于RAMS框架的Role-Actor-Skill架构，设计面向AI的设计工作坊系统。

---

## 核心洞察

传统的AI工作坊设计往往模仿人类工作坊的模式，但这忽略了AI的独特能力。RAMS框架通过Role-Actor-Skill的分离，为AI工作坊提供了更适合的组织方式。

**关键区别**：
- **人类工作坊**：多人协作、顺序执行、时间有限、注意力有限
- **AI工作坊**：单一AI实例或多Agent并行、可无限探索、可瞬间切换、可精确控制

---

## RAMS框架在AI工作坊中的优势

### 1. Role-Actor分离：灵活的执行模式

**传统方式**：AI实例直接绑定到特定功能
**RAMS方式**：Role定义职责，Actor提供执行能力

**工作坊中的应用**：
```yaml
# Role定义：工作坊编排者
role: workshop-orchestrator
  soul: 善于规划、逻辑严密、注重效率
  skills:
    - workshop-flow-design
    - parallel-exploration-controller
    - iteration-optimizer

# Actor选择：根据任务需求动态选择
actors:
  - claude-opus: 适合复杂推理任务
  - gpt-4-turbo: 适合快速生成任务
  - local-llama: 适合敏感数据处理
```

**优势**：
- 同一个工作坊流程可以由不同模型执行
- 可以根据任务特性选择最优Actor
- 支持A/B测试不同Actor的效果

---

### 2. Soul独立：工作风格的复用

**传统方式**：每个工作坊角色都有独立的提示词
**RAMS方式**：Soul独立存储，可跨Role复用

**工作坊中的应用**：
```yaml
# Soul: 注重用户体验的工作风格
soul: user-centric-designer
  traits:
    - 始终从用户角度思考
    - 重视可访问性
    - 注重细节和一致性
  communication:
    - 清晰简洁
    - 使用简单语言
    - 提供具体示例

# 可被多个Role复用
roles:
  - design-strategist: 加载 user-centric-designer Soul
  - accessibility-reviewer: 加载 user-centric-designer Soul
  - content-writer: 加载 user-centric-designer Soul
```

**优势**：
- 确保整个工作坊的一致性
- 优秀的工作风格可以标准化和复用
- 支持工作风格的独立进化

---

### 3. Skill模块化：精确的流程控制

**传统方式**：工作坊流程硬编码在提示词中
**RAMS方式**：Skill作为独立模块，可组合和复用

**工作坊中的应用**：
```yaml
# Skill: 并行探索
skill: parallel-exploration
  input:
    - exploration_space: 探索空间定义
    - constraint: 约束条件
    - parallel_count: 并行数量
  output:
    - results: 探索结果列表
    - evaluation: 每个结果的评估
  process:
    1. 生成N个探索方向
    2. 并行执行每个方向
    3. 评估每个结果
    4. 返回top K结果

# 可被多个工作坊复用
workshops:
  - design-sprint: 使用 parallel-exploration
  - critique-session: 使用 parallel-exploration
  - research-planning: 使用 parallel-exploration
```

**优势**：
- 工作坊流程可精确控制
- Skill可独立测试和优化
- 支持Skill的组合和编排

---

## RAMS AI工作坊的组织模式

### 模式1: 单一Actor，Role切换

**适用场景**：线性设计流程、资源受限

```yaml
orchestrator:
  role: workshop-orchestrator
  actor: claude-opus

workflow:
  step1:
    role: design-strategist
    skill: design-discovery
    actor: claude-opus
    output: design-brief

  step2:
    role: design-lead
    skill: ui-composition
    actor: claude-opus
    input: design-brief
    output: design-proposal

  step3:
    role: accessibility-reviewer
    skill: cognitive-accessibility
    actor: claude-opus
    input: design-proposal
    output: accessibility-report

  step4:
    role: design-critic
    skill: design-retrospective
    actor: claude-opus
    input: [design-proposal, accessibility-report]
    output: final-design
```

**特点**：
- 顺序执行，共享上下文
- 适合线性设计流程
- 资源消耗低

---

### 模式2: 多Actor并行

**适用场景**：探索阶段、需要多维度分析

```yaml
orchestrator:
  role: workshop-orchestrator
  actor: claude-opus

exploration_phase:
  parallel_tasks:
    task1:
      role: design-strategist
      skill: design-discovery
      actor: claude-opus
      variations: 100
      output: design-briefs

    task2:
      role: inspiration-scout
      skill: inspiration-collection
      actor: gpt-4-turbo
      variations: 1000
      output: inspirations

    task3:
      role: research-planning
      skill: research-method-design
      actor: claude-opus
      variations: 100
      output: research-plans

selection_phase:
  role: design-critic
  skill: multi-criteria-evaluation
  actor: claude-opus
  input: [design-briefs, inspirations, research-plans]
  output: selected-directions
```

**特点**：
- 并行执行，大幅提升效率
- 每个Actor专注自己的领域
- 通过Orchestrator协调

---

### 模式3: 混合模式

**适用场景**：复杂设计流程

```yaml
orchestrator:
  role: workshop-orchestrator
  actor: claude-opus

phase1_exploration:
  mode: parallel
  tasks:
    - design-strategist (100 variations)
    - inspiration-scout (1000 variations)
    - research-planning (100 variations)

phase2_selection:
  mode: sequential
  role: design-critic
  skill: multi-criteria-evaluation
  actor: claude-opus

phase3_execution:
  mode: sequential
  tasks:
    - design-lead
    - content-writer
    - design-builder
    - accessibility-reviewer

phase4_iteration:
  mode: loop
  iterations: 1000
  tasks:
    - design-lead (generate)
    - accessibility-reviewer (evaluate)
    - design-critic (critique)
    - design-lead (refine)
```

**特点**：
- 灵活组合不同模式
- 探索阶段并行，执行阶段顺序
- 支持迭代优化

---

## RAMS AI工作坊的核心Roles

### 1. Workshop Orchestrator（工作坊编排者）

**职责**：
- 定义工作坊流程
- 决定何时切换Role
- 决定何时并行执行
- 决定何时停止迭代
- 管理工作坊状态

**Soul**：
```yaml
soul: workshop-orchestrator
  traits:
    - 善于规划和组织
    - 逻辑严密
    - 注重效率
    - 善于决策
  communication:
    - 清晰的指令
    - 结构化的输出
    - 及时的反馈
```

**Skills**：
- `workshop-flow-design`: 设计工作坊流程
- `parallel-exploration-controller`: 控制并行探索
- `iteration-optimizer`: 优化迭代策略
- `quality-gate`: 设置质量门

---

### 2. Design Strategist（设计策略师）

**职责**：
- 理解设计问题
- 生成设计简报
- 定义设计原则
- 规划设计方向

**Soul**：
```yaml
soul: design-strategist
  traits:
    - 战略思维
    - 用户中心
    - 数据驱动
    - 善于沟通
```

**Skills**：
- `design-discovery`: 设计发现
- `design-brief-generation`: 生成设计简报
- `design-principle-definition`: 定义设计原则
- `direction-generation`: 生成设计方向

---

### 3. Design Lead（设计主管）

**职责**：
- 执行设计任务
- 生成设计方案
- 协调设计资源
- 管理设计流程

**Soul**：
```yaml
soul: design-lead
  traits:
    - 注重细节
    - 善于执行
    - 团队协作
    - 质量导向
```

**Skills**：
- `ui-composition`: UI组合
- `visual-design`: 视觉设计
- `layout-design`: 布局设计
- `design-refinement`: 设计优化

---

### 4. Accessibility Reviewer（无障碍审查者）

**职责**：
- 评估无障碍性
- 识别无障碍问题
- 提供改进建议
- 确保合规性

**Soul**：
```yaml
soul: accessibility-reviewer
  traits:
    - 注重包容性
    - 细节敏感
    - 标准熟悉
    - 用户中心
```

**Skills**：
- `cognitive-accessibility`: 认知无障碍
- `visual-accessibility`: 视觉无障碍
- `motor-accessibility`: 运动无障碍
- `wcag-compliance`: WCAG合规性检查

---

### 5. Design Critic（设计批评者）

**职责**：
- 批评设计方案
- 识别设计问题
- 提供改进建议
- 评估设计质量

**Soul**：
```yaml
soul: design-critic
  traits:
    - 批判性思维
    - 多角度分析
    - 建设性反馈
    - 标准导向
```

**Skills**：
- `design-retrospective`: 设计回顾
- `multi-criteria-evaluation`: 多标准评估
- `tradeoff-analysis`: 权衡分析
- `improvement-suggestion`: 改进建议

---

## RAMS AI工作坊的核心Skills

### 编排类Skills

#### workshop-flow-design
**功能**：设计工作坊流程
**输入**：
- workshop_type: 工作坊类型
- constraints: 约束条件
- resources: 可用资源
**输出**：
- workflow: 工作坊流程定义
- roles: 需要的Roles
- skills: 需要的Skills
- actors: 推荐的Actors

#### parallel-exploration-controller
**功能**：控制并行探索
**输入**：
- exploration_space: 探索空间
- parallel_count: 并行数量
- constraints: 约束条件
**输出**：
- exploration_tasks: 探索任务列表
- results: 探索结果
- evaluation: 结果评估

#### iteration-optimizer
**功能**：优化迭代策略
**输入**：
- current_iteration: 当前迭代
- results: 历史结果
- convergence: 收敛指标
**输出**：
- should_continue: 是否继续
- next_strategy: 下一步策略
- parameters: 优化参数

#### quality-gate
**功能**：设置和检查质量门
**输入**：
- deliverable: 交付物
- quality_standards: 质量标准
**输出**：
- passed: 是否通过
- issues: 问题列表
- recommendations: 改进建议

---

### 探索类Skills

#### direction-generation
**功能**：生成探索方向
**输入**：
- problem_space: 问题空间
- constraints: 约束条件
- count: 生成数量
**输出**：
- directions: 方向列表
- rationale: 每个方向的理由

#### variation-generation
**功能**：对现有方案进行变异
**输入**：
- base_solution: 基础方案
- variation_type: 变异类型
- count: 变异数量
**输出**：
- variations: 变异方案列表
- differences: 差异说明

#### combination-engineering
**功能**：组合多个方案
**输入**：
- solutions: 方案列表
- combination_strategy: 组合策略
**输出**：
- combined_solutions: 组合方案
- synergy: 协同效应分析

---

### 评估类Skills

#### multi-criteria-evaluation
**功能**：从多个维度评估
**输入**：
- solution: 方案
- criteria: 评估标准
- weights: 权重
**输出**：
- scores: 各维度得分
- overall_score: 总体得分
- analysis: 详细分析

#### tradeoff-analysis
**功能**：分析不同方案的权衡
**输入**：
- solutions: 方案列表
- criteria: 评估标准
**输出**：
- tradeoffs: 权衡分析
- recommendations: 推荐方案
- risks: 风险分析

#### convergence-detection
**功能**：判断何时停止探索
**输入**：
- results_history: 历史结果
- threshold: 收敛阈值
**输出**：
- converged: 是否收敛
- best_result: 最佳结果
- confidence: 置信度

---

### 协调类Skills

#### conflict-resolution
**功能**：处理不同Role的意见冲突
**输入**：
- conflicting_opinions: 冲突意见
- context: 上下文
**输出**：
- resolution: 解决方案
- rationale: 理由
- action: 后续行动

#### result-synthesis
**功能**：合并多个结果
**输入**：
- results: 结果列表
- synthesis_strategy: 合成策略
**输出**：
- synthesized_result: 合成结果
- confidence: 置信度
- gaps: 缺失部分

#### decision-making
**功能**：基于数据做出决策
**输入**：
- data: 数据
- decision_criteria: 决策标准
**输出**：
- decision: 决策
- confidence: 置信度
- alternatives: 替代方案

---

## RAMS AI工作坊的实际案例

### 案例1: 设计冲刺AI工作坊

**人类设计冲刺**（5天）：
- Day 1: 理解问题
- Day 2: 生成方案
- Day 3: 选择方案
- Day 4: 制作原型
- Day 5: 测试

**RAMS AI设计冲刺**（5分钟）：

```yaml
orchestrator:
  role: workshop-orchestrator
  actor: claude-opus
  soul: efficient-orchestrator

minute1_understand:
  parallel:
    - role: design-strategist
      skill: design-discovery
      actor: claude-opus
      variations: 100
      output: problem-understandings

    - role: inspiration-scout
      skill: inspiration-collection
      actor: gpt-4-turbo
      variations: 1000
      output: inspirations

    - role: research-planning
      skill: research-method-design
      actor: claude-opus
      variations: 100
      output: research-plans

minute2_generate:
  parallel:
    - role: design-lead
      skill: ui-composition
      actor: gpt-4-turbo
      variations: 1000
      input: [problem-understandings, inspirations]
      output: design-proposals

    - role: content-writer
      skill: content-generation
      actor: claude-opus
      variations: 1000
      input: problem-understandings
      output: content-versions

minute3_evaluate:
  parallel:
    - role: design-critic
      skill: multi-criteria-evaluation
      actor: claude-opus
      input: design-proposals
      criteria: [aesthetics, usability, accessibility]
      output: design-evaluations

    - role: accessibility-reviewer
      skill: cognitive-accessibility
      actor: claude-opus
      input: design-proposals
      output: accessibility-reports

minute4_select:
  role: design-critic
  skill: tradeoff-analysis
  actor: claude-opus
  input: [design-evaluations, accessibility-reports]
  output: top-10-designs

minute5_refine:
  loop:
    iterations: 100
    role: design-lead
    skill: design-refinement
    actor: claude-opus
    input: top-10-designs
    output: final-design
```

---

### 案例2: 批评会议AI工作坊

**人类批评会议**（1小时）：
- 5-10人参与
- 每人发言5-10分钟
- 引导者总结
- 记录员记录

**RAMS AI批评会议**（1秒）：

```yaml
orchestrator:
  role: workshop-orchestrator
  actor: claude-opus

parallel_critique:
  role: design-critic
  skill: design-retrospective
  actor: claude-opus
  parallel_instances: 100
  perspectives:
    - instance1: aesthetics
    - instance2: accessibility
    - instance3: performance
    - instance4: user-persona-A
    - instance5: user-persona-B
    - ... (共100个角度)
  input: design-proposal
  output: critique-reports

synthesis:
  role: design-critic
  skill: result-synthesis
  actor: claude-opus
  input: critique-reports
  output:
    - common-issues: 共同问题
    - conflicting-opinions: 冲突意见
    - priority-list: 优先级列表
    - structured-report: 结构化报告
```

---

## RAMS AI工作坊的优势总结

### 1. 灵活性
- Role-Actor分离：同一工作坊可由不同模型执行
- Soul独立：工作风格可跨Role复用
- Skill模块化：流程可精确控制

### 2. 可扩展性
- 并行探索：可同时探索1000个方向
- 迭代优化：可运行1000次迭代
- 多维度分析：可同时考虑1000个约束

### 3. 可重复性
- 相同输入 → 相同输出
- 可精确控制变量
- 可A/B测试

### 4. 可进化性
- Role可独立进化
- Soul可独立进化
- Skill可独立进化

---

## 实施建议

### 阶段1: 核心Roles和Skills
1. 实现Workshop Orchestrator Role
2. 实现核心编排Skills
3. 实现设计相关Roles

### 阶段2: 并行探索能力
1. 实现并行探索Skills
2. 实现探索控制Skills
3. 实现结果合成Skills

### 阶段3: 迭代优化能力
1. 实现迭代控制Skills
2. 实现质量门Skills
3. 实现收敛检测Skills

### 阶段4: 完整工作坊
1. 实现设计冲刺工作坊
2. 实现批评会议工作坊
3. 实现研究规划工作坊

---

## 总结

RAMS框架为AI工作坊提供了理想的组织方式：
- **Role-Actor分离**：灵活的执行模式
- **Soul独立**：工作风格的复用
- **Skill模块化**：精确的流程控制

通过RAMS框架，AI工作坊可以充分利用AI的独特能力：并行、迭代、无限探索，而不是简单模仿人类工作坊。
