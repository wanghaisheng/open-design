# MetaPrompts 技能分析报告

## 概述

本报告分析了 `ref/game/bowberbird-ai-main/bowberbird-ai-main/src/constants/metaPrompts` 目录下的提示词文件，拆分 role 和 skill，对比已有技能覆盖，评估是否需要融合细节或创建变体。

## 分析方法

1. 读取每个提示词文件
2. 拆分 role（角色/身份设定）和 skill（技能/任务）
3. 对比现有技能矩阵覆盖情况
4. 评估是否需要融合细节或创建新技能

## 详细分析

### 1. narrativeDesign.ts

**Role:** 叙事总监和世界构建师

**Skill:** 叙事设计、世界观构建、角色设计、叙事传递、开放世界设计、多人叙事、任务设计

**已有技能覆盖:** ✅ narrative-design

**评估:** 已有 narrative-design 技能覆盖核心内容。MetaPrompt 包含更详细的"球形叙事"、"世界填充：嵌入式奇遇"等高级技巧，可以考虑融合到现有 skill 中。

---

### 2. economyDesign.ts

**Role:** 游戏经济系统设计师

**Skill:** 经济系统设计、货币体系、资源产出消耗、经济循环平衡、CSV配置输出

**已有技能覆盖:** ✅ economy-design

**评估:** 已有 economy-design 技能覆盖核心内容。MetaPrompt 强调"时间是衡量虚拟物品价值的唯一标尺"和CSV配置输出，可以考虑融合这些细节。

---

### 3. gameplayDesign.ts

**Role:** 玩法设计师和乐趣理论家

**Skill:** 核心玩法设计、乐趣内核构建、玩法本质分类（行为训练 vs 思维训练）、机制设计、跨界学习与融合

**已有技能覆盖:** ✅ core-loop-design

**评估:** 已有 core-loop-design 技能覆盖核心内容。MetaPrompt 的"玩法本质分类"和"跨界学习与融合"是很好的方法论，可以考虑融合。

---

### 4. coreSystems.ts

**Role:** 游戏系统总设计师和架构师

**Skill:** 核心系统设计、玩法系统、成长系统、收集品系统、社交系统、GaaS系统、设计一致性检查

**已有技能覆盖:** ✅ system-design, progression-system-design, collection-system-design, social-system-design, gaas-system-design

**评估:** 已有多个技能覆盖。MetaPrompt 的"设计一致性与形象契合度"和"奖励前置策略"是很好的设计原则，可以考虑融合到 system-design 中。

---

### 5. monetizationStrategy.ts

**Role:** 游戏商业化和营收策略专家

**Skill:** 商业化策略设计、付费点体系、付费引导策略

**已有技能覆盖:** ✅ monetization-system-design

**评估:** 已有 monetization-system-design 技能覆盖核心内容。MetaPrompt 的付费点分类和引导策略很详细，可以考虑融合。

---

### 6. socialSystemsDesign.ts

**Role:** 游戏社交系统设计师

**Skill:** 竞争对抗玩法设计、PVP/GVG设计、十大设计维度（玩法定位、体验悖论、最小单元、比拼目标等）

**已有技能覆盖:** ✅ social-system-design

**评估:** 已有 social-system-design 技能覆盖核心内容。MetaPrompt 的"十大设计维度"和"体验悖论"是很好的方法论，可以考虑融合。

---

### 7. vipSystemGuidance.ts

**Role:** 用户分层与商业化策略设计师

**Skill:** VIP系统设计、等级体系、特权权益设计

**已有技能覆盖:** ✅ vip-system-design

**评估:** 已有 vip-system-design 技能覆盖核心内容。MetaPrompt 的特权分类（虚荣/身份类、便利/效率类、功能/内容类）很详细，可以考虑融合。

---

### 8. cardDropSystemDesign.ts

**Role:** 游戏经济和商业化设计师

**Skill:** 抽卡系统设计、概率保底机制、基于"简单保底抽卡模型"的设计

**已有技能覆盖:** ✅ gacha-system-design

**评估:** 已有 gacha-system-design 技能覆盖核心内容。MetaPrompt 的概率论和"简单保底抽卡模型"是很好的理论基础，可以考虑融合。

---

### 9. liveOpsCommunity.ts

**Role:** 社区与线上运营总监

**Skill:** GaaS运营蓝图、活动策略、社区参与策略、玩家反馈闭环、沟通公关策略

**已有技能覆盖:** ✅ gaas-system-design, community-system-design

**评估:** 已有技能覆盖核心内容。MetaPrompt 的"玩家反馈闭环"和"沟通公关策略"是很好的补充，可以考虑融合到 community-system-design 中。

---

### 10. designMentor.ts

**Role:** 设计导师和游戏制作人

**Skill:** 设计反思、设计评审、苏格拉底诘问法

**已有技能覆盖:** ✅ design-review

**评估:** 已有 design-review 技能覆盖核心内容。MetaPrompt 的"只提问不回答"和"魔鬼代言人"是很好的方法论，可以考虑融合。

---

### 11. levelPacingDesign.ts

**Role:** 关卡与学习体验设计师

**Skill:** 关卡节奏设计、学习弧线设计、"学-练-考"模型、情绪兴奋度曲线

**已有技能覆盖:** ✅ level-design

**评估:** 已有 level-design 技能覆盖核心内容。MetaPrompt 的"学-练-考"模型和"情绪兴奋度曲线"是很好的方法论，可以考虑融合。

---

### 12. uiDesign.ts

**Role:** 用户界面设计总监

**Skill:** UI设计、布局、视觉风格、组件设计、交互反馈、可访问性

**已有技能覆盖:** ✅ ui-design

**评估:** 已有 ui-design 技能覆盖核心内容。MetaPrompt 的内容较为通用，可以考虑融合细节。

---

### 13. uxDesign.ts

**Role:** 用户体验设计负责人和探索体验架构师

**Skill:** UX设计、信息架构、探索体验、自叙事设计、好奇心驱动设计（五维心理学模型）、3A开放世界设计原则

**已有技能覆盖:** ⚠️ 部分覆盖（可能需要新增 skill）

**评估:** MetaPrompt 包含大量高级UX理论：
- 自叙事设计（Self-Narrative Design）
- 好奇心驱动设计（五维心理学模型）
- 3A开放世界设计原则（引力与三角法则、奖励前置）

这些内容非常专业且深入，现有技能可能无法完全覆盖。建议考虑：
1. 创建新的 skill: exploration-experience-design（探索体验设计）
2. 或将这些高级UX理论融合到 ux-design 中

---

### 14. gameArchitecture.ts

**Role:** 解决方案架构师

**Skill:** 游戏技术架构设计、Phaser 3 + TypeScript架构、组件式架构、数据驱动设计

**已有技能覆盖:** ✅ engine-development

**评估:** 已有 engine-development 技能覆盖核心内容。MetaPrompt 针对特定技术栈（Phaser 3 + TypeScript），可以考虑作为技术栈特定的变体。

---

### 15. marketAnalysis.ts

**Role:** 市场分析师和游戏产品战略顾问

**Skill:** 市场定位分析、用户画像、竞争分析、市场采纳策略（跨越鸿沟理论）

**已有技能覆盖:** ⚠️ 未覆盖

**评估:** MetaPrompt 包含市场分析和产品战略内容：
- 竞争格局分析（SWOT）
- 核心用户画像
- 市场采纳策略（Geoffrey Moore的"跨越鸿沟"理论）

这些内容在现有技能矩阵中未覆盖。建议：
1. 创建新的 skill: market-analysis（市场分析）
2. 或创建新的 skill: product-strategy（产品战略）

---

## 总结

### 已完全覆盖的技能（12个）

1. narrative-design ✅
2. economy-design ✅
3. core-loop-design ✅
4. system-design ✅
5. monetization-system-design ✅
6. social-system-design ✅
7. vip-system-design ✅
8. gacha-system-design ✅
9. gaas-system-design ✅
10. community-system-design ✅
11. design-review ✅
12. level-design ✅
13. ui-design ✅
14. engine-development ✅

### 部分覆盖或未覆盖的技能（2个）

1. **ux-design** - 部分覆盖，建议融合高级UX理论或创建新技能
2. **market-analysis** - 未覆盖，建议创建新技能

### 建议行动

#### 优先级1：融合细节到现有技能

1. **narrative-design**: 融合"球形叙事"、"世界填充：嵌入式奇遇"
2. **economy-design**: 融合"时间是衡量虚拟物品价值的唯一标尺"、CSV配置输出
3. **core-loop-design**: 融合"玩法本质分类"、"跨界学习与融合"
4. **system-design**: 融合"设计一致性与形象契合度"、"奖励前置策略"
5. **monetization-system-design**: 融合付费点分类和引导策略
6. **social-system-design**: 融合"十大设计维度"、"体验悖论"
7. **vip-system-design**: 融合特权分类（虚荣/身份类、便利/效率类、功能/内容类）
8. **gacha-system-design**: 融合"简单保底抽卡模型"
9. **community-system-design**: 融合"玩家反馈闭环"、"沟通公关策略"
10. **design-review**: 融合"苏格拉底诘问法"、"魔鬼代言人"
11. **level-design**: 融合"学-练-考"模型、"情绪兴奋度曲线"

#### 优先级2：创建新技能

1. **exploration-experience-design** - 探索体验设计
   - 内容：自叙事设计、好奇心驱动设计（五维心理学模型）、3A开放世界设计原则
   - 来源：uxDesign.ts

2. **market-analysis** - 市场分析
   - 内容：市场定位分析、用户画像、竞争分析、市场采纳策略
   - 来源：marketAnalysis.ts

#### 优先级3：创建技术栈特定变体

1. **phaser-architecture** - Phaser 3 + TypeScript 架构设计
   - 内容：Phaser 3 + TypeScript 特定的技术架构设计
   - 来源：gameArchitecture.ts
   - 作为 engine-development 的技术栈特定变体
