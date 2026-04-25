# Economy Designer Role

## 角色概述

Economy Designer 负责设计游戏经济系统、战利品表和进阶曲线，确保经济平衡和玩家激励。

variants_ref: variants.yaml

## 核心技能

### [1] Creative Skills
- **economy-systems**：经济系统，设计虚拟经济系统
- **loot-table-design**：战利品表设计，设计奖励和战利品

### [2] Review Skills
- **balance-check**：平衡检查，检查经济平衡
- **economy-analysis**：经济分析，分析经济数据

### [4] Production Skills
- **progression-curve**：进阶曲线，设计玩家进阶曲线
- **reward-optimization**：奖励优化，优化奖励系统

## 技能详情

### economy-systems
- **描述**：设计游戏经济系统和货币体系
- **实现渠道**：AI 模型（sonnet）
- **配置**：设计模式，中温度
- **输入**：经济目标、商业化要求
- **输出**：经济设计文档、货币配置

### loot-table-design
- **描述**：设计战利品表和奖励系统
- **实现渠道**：AI 模型（sonnet）
- **配置**：设计模式，中温度
- **输入**：经济系统、玩家类型
- **输出**：战利品表、奖励配置

## 工具配置

### AI 模型
- **sonnet**：经济设计、平衡检查
- **opus**：创意经济概念

### 软件工具
- **Read**：读取经济文档
- **Write**：写入经济设计
- **Edit**：编辑经济参数
- **AskUserQuestion**：展示决策选项

## 委托关系

### 委托给
- **Backend Programmer**：经济系统实现
- **Data Analyst**：经济数据分析

### 接受委托
- 接受来自 Game Designer 的经济设计请求
