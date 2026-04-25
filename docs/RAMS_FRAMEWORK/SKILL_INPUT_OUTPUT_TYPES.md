# Skill Input/Output Types Enumeration

技能输入输出交付物类型枚举，定义不同技能的输入输出格式和交付物类型。

---

## 概述

本文档枚举RAMS框架中不同技能的输入输出交付物类型，使用Markdown格式（参考design.md和GDD模板），提供标准化的输入输出格式定义。

## 交付物类型分类

### 1. 文档类交付物

#### Markdown文档
- **格式**：`.md` 文件
- **用途**：设计文档、技术文档、说明文档
- **示例**：DESIGN.md、GDD章节、技术规范

#### 设计规范文档
- **格式**：YAML frontmatter + Markdown内容
- **用途**：设计系统、组件规范、样式指南
- **示例**：design.md（颜色、排版、组件定义）

#### 游戏设计文档（GDD）
- **格式**：结构化Markdown章节
- **用途**：游戏概述、玩法机制、关卡设计
- **示例**：3_Game Overview.md、4_Gameplay and Mechanics.md

### 2. 数据类交付物

#### JSON数据
- **格式**：`.json` 文件
- **用途**：配置数据、API响应、结构化数据
- **示例**：技能配置、角色配置、游戏数据

#### YAML配置
- **格式**：`.yaml` 文件
- **用途**：配置文件、依赖定义、版本管理
- **示例**：implementation.yaml、schema.yaml、variants.yaml

#### CSV数据
- **格式**：`.csv` 文件
- **用途**：表格数据、统计数据、导出数据
- **示例**：市场数据、用户数据、测试数据

### 3. 代码类交付物

#### Python脚本
- **格式**：`.py` 文件
- **用途**：自动化脚本、数据处理、工具实现
- **示例**：技能脚本、数据处理脚本

#### JavaScript/TypeScript
- **格式**：`.js` / `.ts` 文件
- **用途**：前端代码、工具脚本、Web应用
- **示例**：UI组件、交互逻辑

#### 配置代码
- **格式**：特定语言配置文件
- **用途**：工具配置、环境配置
- **示例**：.env、config.js

### 4. 媒体类交付物

#### 图像资源
- **格式**：`.png` / `.jpg` / `.svg` 文件
- **用途**：UI设计、图标、概念图
- **示例**：设计稿、图标、界面截图

#### 视频资源
- **格式**：`.mp4` / `.webm` 文件
- **用途**：演示视频、动画、过场
- **示例**：游戏演示、动画片段

#### 音频资源
- **格式**：`.mp3` / `.wav` 文件
- **用途**：音效、音乐、语音
- **示例**：背景音乐、音效

### 5. 列表类交付物

#### 创意列表
- **格式**：Markdown列表或JSON数组
- **用途**：创意生成、方案列表
- **示例**：游戏创意列表、功能列表

#### 检查清单
- **格式**：Markdown任务列表
- **用途**：验证清单、测试清单
- **示例**：设计检查清单、测试用例

#### 优先级列表
- **格式**：Markdown列表或JSON
- **用途**：任务优先级、功能优先级
- **示例**：开发任务列表、功能优先级

### 6. 分析类交付物

#### 分析报告
- **格式**：Markdown文档
- **用途**：市场分析、用户分析、竞品分析
- **示例**：市场洞察报告、用户研究报告

#### 可行性分析
- **格式**：Markdown文档 + 数据表格
- **用途**：技术可行性、商业可行性
- **示例**：技术可行性报告、成本分析

#### 风险评估
- **格式**：Markdown文档
- **用途**：风险识别、风险评估
- **示例**：项目风险评估、技术风险评估

## 技能输入输出映射

### 游戏开发技能

#### creative-discovery（创意发现）
- **输入**：
  - `game_concept` (string): 游戏概念描述
  - `target_audience` (string): 目标受众
  - `platform` (string): 目标平台
  - `genre` (string): 游戏类型
  - `constraints` (object): 约束条件
- **输出**：
  - `creative_ideas` (array): 创意列表
    - 每个创意包含：name, description, feasibility, market_potential, tags
  - `analysis` (object): 创意分析
    - total_ideas, average_feasibility, recommendations
- **交付物类型**：Markdown文档（创意列表 + 分析报告）

#### topic-validation（题材验证）
- **输入**：
  - `game_concept` (string): 游戏概念
  - `target_market` (string): 目标市场
  - `competitors` (array): 竞品列表
- **输出**：
  - `validation_result` (object): 验证结果
    - market_potential, competition_level, risks, opportunities
  - `recommendations` (array): 推荐建议
- **交付物类型**：Markdown文档（验证报告）

#### hybrid-casual-design（混合休闲设计）
- **输入**：
  - `core_mechanics` (array): 核心机制
  - `casual_elements` (array): 休闲元素
  - `progression_system` (object): 进度系统
- **输出**：
  - `design_spec` (object): 设计规范
    - core_loop, progression, monetization
  - `prototype_description` (string): 原型描述
- **交付物类型**：Markdown文档（设计规范） + YAML配置

#### market-localization（市场本地化）
- **输入**：
  - `game_content` (object): 游戏内容
  - `target_regions` (array): 目标地区
  - `cultural_requirements` (object): 文化要求
- **输出**：
  - `localization_plan` (object): 本地化计划
    - content_adaptations, cultural_adjustments, translation_needs
  - `risk_assessment` (object): 风险评估
- **交付物类型**：Markdown文档（本地化计划） + CSV数据

#### viral-content-analysis（病毒内容分析）
- **输入**：
  - `content_samples` (array): 内容样本
  - `platform_data` (object): 平台数据
  - `time_period` (string): 时间周期
- **输出**：
  - `viral_patterns` (array): 病毒传播模式
  - `content_recommendations` (array): 内容推荐
  - `engagement_metrics` (object): 参与度指标
- **交付物类型**：Markdown文档（分析报告） + JSON数据

#### market-insight（市场洞察）
- **输入**：
  - `market_segment` (string): 市场细分
  - `time_range` (string): 时间范围
  - `data_sources` (array): 数据源
- **输出**：
  - `market_trends` (array): 市场趋势
  - `opportunity_analysis` (object): 机会分析
  - `recommendations` (array): 推荐建议
- **交付物类型**：Markdown文档（市场洞察报告） + CSV数据

#### prototype-validation（原型验证）
- **输入**：
  - `prototype_data` (object): 原型数据
  - `test_scenarios` (array): 测试场景
  - `success_criteria` (object): 成功标准
- **输出**：
  - `validation_results` (object): 验证结果
    - test_results, pass_rate, issues_found
  - `recommendations` (array): 改进建议
- **交付物类型**：Markdown文档（验证报告） + 检查清单

#### data-driven-decision（数据驱动决策）
- **输入**：
  - `decision_context` (object): 决策上下文
  - `data_sources` (array): 数据源
  - `metrics` (array): 指标
- **输出**：
  - `decision_analysis` (object): 决策分析
    - data_insights, options, recommendation
  - `action_plan` (object): 行动计划
- **交付物类型**：Markdown文档（决策分析） + JSON数据

#### hybrid-monetization（混合变现）
- **输入**：
  - `game_mechanics` (object): 游戏机制
  - `target_audience` (string): 目标受众
  - `market_data` (object): 市场数据
- **输出**：
  - `monetization_design` (object): 变现设计
    - revenue_streams, pricing_strategy, ad_integration
  - `balance_analysis` (object): 平衡分析
- **交付物类型**：Markdown文档（变现设计） + YAML配置

#### user-segmentation（用户细分）
- **输入**：
  - `user_data` (object): 用户数据
  - `behavior_patterns` (array): 行为模式
  - `segmentation_criteria` (object): 细分标准
- **输出**：
  - `user_segments` (array): 用户细分
    - segment_name, characteristics, size, monetization_potential
  - `targeting_strategy` (object): 定向策略
- **交付物类型**：Markdown文档（用户细分报告） + JSON数据

#### fusion-gameplay-design（融合玩法设计）
- **输入**：
  - `source_genres` (array): 源类型
  - `fusion_objectives` (array): 融合目标
  - `constraints` (object): 约束条件
- **输出**：
  - `fusion_design` (object): 融合设计
    - core_mechanics, progression, balance
  - `prototype_spec` (object): 原型规范
- **交付物类型**：Markdown文档（融合设计） + YAML配置

#### core-gameplay-design（核心玩法设计）
- **输入**：
  - `game_concept` (string): 游戏概念
  - `target_experience` (string): 目标体验
  - `platform_constraints` (object): 平台约束
- **输出**：
  - `core_mechanics` (object): 核心机制
    - actions, feedback, progression
  - `gameplay_loop` (object): 玩法循环
- **交付物类型**：Markdown文档（核心玩法设计） + YAML配置

#### game-system-design（游戏系统设计）
- **输入**：
  - `game_requirements` (object): 游戏需求
  - `system_scope` (object): 系统范围
  - `integration_needs` (array): 集成需求
- **输出**：
  - `system_architecture` (object): 系统架构
    - modules, interfaces, data_flow
  - `implementation_plan` (object): 实施计划
- **交付物类型**：Markdown文档（系统设计） + YAML配置

#### economic-system-design（经济系统设计）
- **输入**：
  - `game_mechanics` (object): 游戏机制
  - `monetization_goals` (object): 变现目标
  - `player_behavior` (object): 玩家行为
- **输出**：
  - `economic_model` (object): 经济模型
    - currencies, sinks, sources, balance
  - `simulation_results` (object): 模拟结果
- **交付物类型**：Markdown文档（经济系统设计） + JSON数据

#### game-rule-analysis（游戏规则分析）
- **输入**：
  - `game_rules` (object): 游戏规则
  - `playtest_data` (object): 测试数据
  - `balance_concerns` (array): 平衡关注点
- **输出**：
  - `rule_analysis` (object): 规则分析
    - complexity, balance, fun_factor
  - `optimization_suggestions` (array): 优化建议
- **交付物类型**：Markdown文档（规则分析报告） + 检查清单

#### gmt-framework（GMT框架）
- **输入**：
  - `game_elements` (object): 游戏元素
  - `player_goals` (array): 玩家目标
  - `design_objectives` (array): 设计目标
- **输出**：
  - `gmt_analysis` (object): GMT分析
    - goals, means, tools
  - `design_recommendations` (array): 设计推荐
- **交付物类型**：Markdown文档（GMT分析） + YAML配置

### 文档生成技能

#### structured-gdd-generation（结构化GDD生成）
- **输入**：
  - `game_concept` (string): 游戏概念
  - `template_sections` (array): 模板章节
  - `custom_requirements` (object): 自定义需求
- **输出**：
  - `gdd_document` (object): GDD文档
    - 包含所有GDD章节的Markdown文件
  - `table_of_contents` (array): 目录
- **交付物类型**：Markdown文档（GDD章节） + YAML配置

## 交付物格式规范

### Markdown文档格式

#### Frontmatter格式
```yaml
---
name: document-name
version: 1.0.0
created: 2026-04-25
author: RAMS Team
tags: [tag1, tag2]
---
```

#### 内容结构
```markdown
# 文档标题

## 章节1
内容...

## 章节2
内容...

## 附录
- 附录1
- 附录2
```

### YAML配置格式

#### 配置结构
```yaml
# 配置文件
key1: value1
key2:
  nested_key: nested_value
key3:
  - item1
  - item2
```

### JSON数据格式

#### 数据结构
```json
{
  "key1": "value1",
  "key2": {
    "nested_key": "nested_value"
  },
  "key3": ["item1", "item2"]
}
```

## 交付物验证

### Schema验证

使用技能的schema.yaml定义验证输入输出格式：

```yaml
schema:
  input:
    type: object
    properties:
      game_concept:
        type: string
        minLength: 1
    required: [game_concept]
  
  output:
    type: object
    properties:
      creative_ideas:
        type: array
        items:
          type: object
    required: [creative_ideas]
```

### 格式检查

- Markdown格式检查：使用markdownlint
- YAML格式检查：使用yamllint
- JSON格式检查：使用jsonlint

## 交付物存储

### 文件命名规范

- 技能输出：`{skill_name}_output_{timestamp}.md`
- 设计文档：`{document_name}_v{version}.md`
- 配置文件：`{config_name}.yaml`
- 数据文件：`{data_name}_{timestamp}.json`

### 目录结构

```
outputs/
  {skill_name}/
    documents/
      output_20260425.md
    configs/
      config.yaml
    data/
      data_20260425.json
```

## 总结

本文档枚举了RAMS框架中不同技能的输入输出交付物类型，包括：

1. **文档类**：Markdown文档、设计规范、GDD
2. **数据类**：JSON、YAML、CSV
3. **代码类**：Python、JavaScript、配置代码
4. **媒体类**：图像、视频、音频
5. **列表类**：创意列表、检查清单、优先级列表
6. **分析类**：分析报告、可行性分析、风险评估

所有交付物优先使用Markdown格式，参考design.md和GDD模板的结构和格式。
