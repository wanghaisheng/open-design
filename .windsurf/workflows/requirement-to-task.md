---
description: 从一句话需求到任务完成的OpenDesign角色召集与执行指南，说明如何使用OpenDesign的skills和roles通过RAMS框架召集角色、选择演员、创建实例、完成任务
---

# 从一句话需求到任务完成：OpenDesign角色召集与执行指南

本文档说明如何从一句话需求开始，使用OpenDesign的skills和roles，通过RAMS框架召集角色、选择演员、创建实例、完成任务。

---

## 概述

### 核心概念

OpenDesign采用RAMS（Role-Actor Marketplace System）框架，将AI能力组织为：

- **角色（Role）**：designer-role - 拥有39个设计技能的设计师角色
- **技能（Skills）**：设计专业技能 + AI工作坊编排技能
- **演员（Actor）**：具体的LLM模型（GPT-4, Claude等）
- **实例（Instance）**：角色 + 演员的具体实例

### 工作流程概览

```
一句话需求
    ↓
工作坊编排（workshop-orchestration）
    ↓
方向生成（direction-generation）
    ↓
并行探索（parallel-exploration）
    ↓
迭代优化（iteration-controller）
    ↓
质量门（quality-gate）
    ↓
结果合成（result-synthesis）
    ↓
决策制定（decision-making）
    ↓
执行具体设计技能
    ↓
设计评审（design-critique）
    ↓
发货前验证（verification-before-shipping）
```

---

## 完整流程详解

### 阶段1：需求分析

#### 输入
一句话需求，例如：
- "设计一个电商App的首页"
- "创建一个SaaS产品的设计系统"
- "设计一个游戏的角色选择界面"

#### 执行：workshop-orchestration

**Skill**：`workshop-orchestration`

**作用**：分析需求，规划工作坊阶段，定义决策点

**执行方式**：
```
调用skill: workshop-orchestration
参数: 
  - 需求描述: "设计一个电商App的首页"
  - 工作坊类型: 设计探索
  - 阶段定义: 研究阶段 → 策略阶段 → 设计阶段 → 原型阶段
```

**输出**：
- 工作坊计划
- 阶段划分
- 决策点
- 停止条件

---

### 阶段2：方向生成

#### 执行：direction-generation

**Skill**：`direction-generation`

**作用**：生成多个设计探索方向

**执行方式**：
```
调用skill: direction-generation
参数:
  - 设计简报: 从workshop-orchestration输出
  - 探索维度: 
    - 用户画像维度
    - 视觉风格维度
    - 布局结构维度
    - 交互模式维度
  - 目标数量: 5个方向
```

**输出**：
```
# 设计探索方向列表

## 方向1: 现代简约风格
- 用户画像: 年轻消费者
- 视觉风格: 扁平化、高对比度
- 布局结构: 卡片式布局
- 交互模式: 手势优先

## 方向2: 奢华质感风格
- 用户画像: 高端消费者
- 视觉风格: 渐变、金属质感
- 布局结构: 大图展示
- 交互模式: 动画优先

...
```

---

### 阶段3：并行探索

#### 执行：parallel-exploration

**Skill**：`parallel-exploration`

**作用**：同时探索多个设计方向

**执行方式**：
```
调用skill: parallel-exploration
参数:
  - 探索方向: 从direction-generation输出
  - 并行度: 5个方向同时探索
  - 每个方向分配的技能:
    - 方向1: user-persona + design-principles + color-system
    - 方向2: user-persona + design-principles + layout-grid
    - ...
```

**输出**：
- 每个方向的初步设计方案
- 用户画像
- 设计原则
- 视觉方案

---

### 阶段4：迭代优化

#### 执行：iteration-controller

**Skill**：`iteration-controller`

**作用**：控制迭代循环，优化设计方案

**执行方式**：
```
调用skill: iteration-controller
参数:
  - 迭代目标: 提升设计质量
  - 迭代策略: 
    - 变异生成（variation-generation）
    - 组合工程（combination-engineering）
  - 停止条件: 
    - 质量分数 > 8.5
    - 连续3次迭代无显著提升
    - 最大迭代次数: 10次
```

**子技能调用**：

##### 4.1 变异生成

**Skill**：`variation-generation`

```
调用skill: variation-generation
参数:
  - 现有方案: 从parallel-exploration输出
  - 变异维度: 色彩、排版、布局
  - 变异数量: 每个方案3个变体
```

##### 4.2 组合工程

**Skill**：`combination-engineering`

```
调用skill: combination-engineering
参数:
  - 输入方案: 所有探索方向和变体
  - 组合策略: 选择最佳元素组合
  - 组合数量: 生成3个综合方案
```

---

### 阶段5：质量门

#### 执行：quality-gate

**Skill**：`quality-gate`

**作用**：设置和检查质量标准

**执行方式**：
```
调用skill: quality-gate
参数:
  - 质量标准:
    - 视觉一致性: 90%
    - 无障碍符合度: WCAG AA
    - 用户体验评分: 8/10
  - 检查点: 
    - 迭代前检查
    - 迭代后检查
    - 最终检查
```

**输出**：
- 质量检查报告
- 通过/未通过决策
- 改进建议

---

### 阶段6：评估与收敛检测

#### 执行：multi-criteria-evaluation

**Skill**：`multi-criteria-evaluation`

**作用**：从多个维度评估设计方案

**执行方式**：
```
调用skill: multi-criteria-evaluation
参数:
  - 评估维度:
    - 质量维度
    - 多样性维度
    - 可行性维度
    - 一致性维度
  - 权重配置:
    - 质量: 0.4
    - 可行性: 0.3
    - 多样性: 0.2
    - 一致性: 0.1
```

#### 执行：tradeoff-analysis

**Skill**：`tradeoff-analysis`

**作用**：分析不同方案的权衡关系

**执行方式**：
```
调用skill: tradeoff-analysis
参数:
  - 输入方案: 从iteration-controller输出
  - 权衡维度:
    - 质量 vs 成本
    - 创新 vs 风险
    - 速度 vs 质量
```

#### 执行：convergence-detection

**Skill**：`convergence-detection`

**作用**：检测迭代是否收敛

**执行方式**：
```
调用skill: convergence-detection
参数:
  - 收敛标准:
    - 改进率 < 1% 连续10次
    - 质量分数变化 < 0.1 连续20次
  - 收敛原因识别
```

---

### 阶段7：协调与决策

#### 执行：conflict-resolution

**Skill**：`conflict-resolution`

**作用**：解决不同探索方向之间的冲突

**执行方式**：
```
调用skill: conflict-resolution
参数:
  - 冲突描述: 不同方向的设计冲突
  - 解决方案类型: 折中方案/优先级方案/组合方案
```

#### 执行：result-synthesis

**Skill**：`result-synthesis`

**作用**：合并多个设计结果

**执行方式**：
```
调用skill: result-synthesis
参数:
  - 输入结果: 所有探索方向和迭代结果
  - 合成策略: 最佳元素合成
```

#### 执行：decision-making

**Skill**：`decision-making`

**作用**：基于数据做出最终决策

**执行方式**：
```
调用skill: decision-making
参数:
  - 决策数据:
    - 评估结果（multi-criteria-evaluation）
    - 权衡分析（tradeoff-analysis）
    - 收敛状态（convergence-detection）
  - 决策框架: 多标准决策分析（MCDA）
```

---

### 阶段8：执行具体设计技能

根据决策结果，调用具体的设计技能完成设计工作。

#### 8.1 研究阶段技能

**user-persona**
```
调用skill: user-persona
参数:
  - 用户类型: 目标用户
  - 核心需求: 用户需求
  - 典型场景: 使用场景
输出: 用户画像文档
```

**journey-map**
```
调用skill: journey-map
参数:
  - 用户类型: 从user-persona输出
  - 关键触点: 用户旅程触点
  - 情感曲线: 情感变化
输出: 体验旅程图
```

#### 8.2 策略阶段技能

**competitive-analysis**
```
调用skill: competitive-analysis
参数:
  - 竞品列表: 竞品
  - 差异化维度: 差异化点
输出: 竞品分析报告
```

**design-principles**
```
调用skill: design-principles
参数:
  - 产品愿景: 产品愿景
  - 核心信息: 核心信息
  - 品牌定位: 品牌定位
输出: 设计原则文档
```

**problem-framing**
```
调用skill: problem-framing
参数:
  - 痛点列表: 市场痛点
  - 用户场景: 用户场景
输出: 问题框架文档
```

#### 8.3 设计阶段技能

**design-tokens**
```
调用skill: design-tokens
参数:
  - 品牌色: 品牌主色
  - 字体系统: 字体
  - 间距: 间距系统
输出: design-tokens.ts
```

**layout-grid**
```
调用skill: layout-grid
参数:
  - 目标设备: 设备类型
  - 内容类型: 内容类型
输出: 布局网格规范
```

**color-system**
```
调用skill: color-system
参数:
  - 品牌主色: 主色
  - 辅助色: 辅助色
  - 对比度: WCAG AA
输出: 色彩系统文档
```

**typography-scale**
```
调用skill: typography-scale
参数:
  - 内容类型: 标题/正文/标签
  - 阅读距离: 阅读距离
输出: 排版系统规范
```

#### 8.4 交互阶段技能

**interaction-design**
```
调用skill: interaction-design
参数:
  - 交互流程: 交互逻辑
  - 状态管理: 状态定义
输出: 交互设计文档
```

**motion-choreography**
```
调用skill: motion-choreography
参数:
  - 动画场景: 动画类型
  - 时长控制: 动画时长
输出: 动画设计文档
```

#### 8.5 系统阶段技能

**design-systems**
```
调用skill: design-systems
参数:
  - 组件列表: 组件
  - 设计令牌: 从design-tokens输出
输出: 设计系统文档
```

**accessibility**
```
调用skill: accessibility
参数:
  - 组件类型: 组件
  - 目标用户: 用户
输出: 无障碍审计报告
```

#### 8.6 原型阶段技能

**web-html-prototype**
```
调用skill: web-html-prototype
参数:
  - 页面列表: 页面
  - 设计令牌: 从design-tokens输出
  - 交互逻辑: 从interaction-design输出
输出: HTML原型文件
```

**app-html-prototype**
```
调用skill: app-html-prototype
参数:
  - 页面列表: 页面
  - 设计令牌: 从design-tokens输出
  - 设备尺寸: 设备
输出: 移动端HTML原型
```

---

### 阶段9：评审与验证

#### 执行：design-critique

**Skill**：`design-critique`

**作用**：结构化评审设计

**执行方式**：
```
调用skill: design-critique
参数:
  - 设计文件: 设计输出
  - 评审维度: 视觉、交互、可用性、一致性、无障碍
输出: 5维度评审报告
```

#### 执行：verification-before-shipping

**Skill**：`verification-before-shipping`

**作用**：发货前验证

**执行方式**：
```
调用skill: verification-before-shipping
参数:
  - 设计输出: 设计输出
  - 验证标准: 质量标准
输出: 验证报告
```

---

## 实战案例：从一句话到电商App首页设计

### 输入
"设计一个电商App的首页"

### 完整执行流程

#### Step 1: 工作坊编排
```
调用: workshop-orchestration
输入: "设计一个电商App的首页"
输出: 
  - 工作坊计划
  - 阶段: 研究阶段 → 策略阶段 → 设计阶段 → 原型阶段
  - 决策点: 方向选择、迭代停止
```

#### Step 2: 方向生成
```
调用: direction-generation
输入: 工作坊计划
输出: 5个设计方向
  - 方向1: 现代简约
  - 方向2: 奢华质感
  - 方向3: 卡通活泼
  - 方向4: 极简主义
  - 方向5: 科技感
```

#### Step 3: 并行探索
```
调用: parallel-exploration
输入: 5个设计方向
输出: 5个初步设计方案
  - 每个方案包含: 用户画像、设计原则、视觉方案
```

#### Step 4: 迭代优化
```
调用: iteration-controller
子调用: 
  - variation-generation: 每个方案生成3个变体
  - combination-engineering: 生成3个综合方案
输出: 优化后的设计方案
```

#### Step 5: 质量门
```
调用: quality-gate
输入: 优化后的方案
输出: 质量检查报告
```

#### Step 6: 评估与收敛检测
```
调用: multi-criteria-evaluation
调用: tradeoff-analysis
调用: convergence-detection
输出: 评估报告、权衡分析、收敛状态
```

#### Step 7: 协调与决策
```
调用: conflict-resolution
调用: result-synthesis
调用: decision-making
输出: 最终设计方案选择
```

#### Step 8: 执行具体设计技能
```
调用: user-persona → 输出用户画像
调用: journey-map → 输出体验旅程
调用: design-principles → 输出设计原则
调用: design-tokens → 输出设计令牌
调用: layout-grid → 输出布局网格
调用: color-system → 输出色彩系统
调用: typography-scale → 输出排版系统
调用: interaction-design → 输出交互设计
调用: web-html-prototype → 输出HTML原型
```

#### Step 9: 评审与验证
```
调用: design-critique → 输出5维度评审报告
调用: verification-before-shipping → 输出验证报告
```

---

## 角色实例化与演员选择

### 角色定义

OpenDesign有一个主角色：`designer-role`

**角色定义**：
```yaml
role_id: "designer-role"
role_name: "设计师角色"
soul: |
  你是一名专业设计师角色，完成从用户研究到产品设计的全流程任务。
  
  设计师核心职责：
  1. 设计研究（Design Research）
  2. 设计策略（UX Strategy）
  3. UI设计（UI Design）
  4. 交互设计（Interaction Design）
  5. 设计系统（Design Systems）
  6. 设计运营（Design Ops）
  7. AI工作坊编排

skills:
  # 设计研究类
  - user-persona
  - journey-map
  - interview-script
  - research-planning
  - inspiration-scouting
  - synthetic-user-testing
  - usability-test
  
  # 设计策略类
  - design-principles
  - problem-framing
  - competitive-analysis
  - design-discovery
  
  # UI设计类
  - layout-grid
  - color-system
  - typography-scale
  - design-tokens
  
  # 交互设计类
  - interaction-design
  - motion-choreography
  
  # 设计系统类
  - design-systems
  - accessibility
  
  # 设计运营类
  - design-critique
  - sprint-plan
  - handoff-spec
  - design-debt-tracker
  
  # AI工作坊编排类
  - workshop-orchestration
  - parallel-exploration
  - iteration-controller
  - quality-gate
  - direction-generation
  - variation-generation
  - combination-engineering
  - multi-criteria-evaluation
  - tradeoff-analysis
  - convergence-detection
  - conflict-resolution
  - result-synthesis
  - decision-making
```

### 演员配置

**模型配置文件**：
```yaml
actors:
  openai_gpt4:
    provider: "openai"
    model: "gpt-4-turbo"
    api_key_env: "OPENAI_API_KEY"
    default_temperature: 0.7
    
  anthropic_claude:
    provider: "anthropic"
    model: "claude-3-opus-20240229"
    api_key_env: "ANTHROPIC_API_KEY"
    default_temperature: 0.7
```

### 角色实例化

```python
from open_design import RoleInstantiator

# 初始化实例化器
instantiator = RoleInstantiator(
    config_path="config",
    skills_path=".claude/skills/designer-role/skills"
)

# 实例化角色：使用GPT-4扮演设计师角色
role_instance = instantiator.instantiate_role(
    role_id="designer-role",
    actor_id="openai_gpt4"
)

# 执行任务
result = role_instance.execute_skill(
    skill_name="workshop-orchestration",
    task="设计一个电商App的首页"
)
```

---

## 技能调用决策树

```
开始
  │
  ├─ 需要工作坊编排？
  │   ├─ 是 → workshop-orchestration
  │   └─ 否 → 直接进入设计阶段
  │
  ├─ 需要探索方向？
  │   ├─ 是 → direction-generation → parallel-exploration
  │   └─ 否 → 跳过探索
  │
  ├─ 需要迭代优化？
  │   ├─ 是 → iteration-controller
  │   │   ├─ variation-generation
  │   │   └─ combination-engineering
  │   └─ 否 → 跳过迭代
  │
  ├─ 需要质量检查？
  │   ├─ 是 → quality-gate
  │   └─ 否 → 跳过质量门
  │
  ├─ 需要评估？
  │   ├─ 是 → multi-criteria-evaluation
  │   │   ├─ tradeoff-analysis
  │   │   └─ convergence-detection
  │   └─ 否 → 跳过评估
  │
  ├─ 需要协调？
  │   ├─ 是 → conflict-resolution → result-synthesis
  │   └─ 否 → 跳过协调
  │
  ├─ 需要决策？
  │   ├─ 是 → decision-making
  │   └─ 否 → 自动选择
  │
  ├─ 设计阶段
  │   ├─ 研究 → user-persona, journey-map
  │   ├─ 策略 → competitive-analysis, design-principles, problem-framing
  │   ├─ 设计 → design-tokens, layout-grid, color-system, typography-scale
  │   ├─ 交互 → interaction-design, motion-choreography
  │   ├─ 系统 → design-systems, accessibility
  │   └─ 原型 → web-html-prototype, app-html-prototype
  │
  └─ 评审阶段
      ├─ design-critique
      └─ verification-before-shipping
```

---

## 最小可行流程（MVP Path）

如果时间有限，可以采用最小可行流程：

```
一句话需求
    ↓
workshop-orchestration
    ↓
direction-generation
    ↓
user-persona + design-principles + design-tokens
    ↓
web-html-prototype
    ↓
design-critique
```

**适用场景**：
- 快速原型验证
- 概念Demo
- 早期设计探索

---

## 总结

OpenDesign通过RAMS框架，将一句话需求转化为完整的设计方案：

1. **角色召集**：designer-role自动召集所需的技能
2. **演员选择**：根据任务需求选择合适的模型
3. **实例创建**：创建角色实例，加载技能
4. **任务完成**：通过AI工作坊编排，系统化地完成设计任务

核心优势：
- **自动化编排**：workshop-orchestration自动规划工作流
- **并行探索**：parallel-exploration同时探索多个方向
- **迭代优化**：iteration-controller持续优化方案
- **质量保证**：quality-gate确保输出质量
- **理性决策**：decision-making基于数据做出决策
