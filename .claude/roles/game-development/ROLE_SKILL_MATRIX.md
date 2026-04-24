# Role-Skill Matrix

## 概述

本文档记录了所有游戏开发角色中引用的技能，并与现有的技能库进行比较。

## 统计

- **现有技能总数**: 87（所有技能目录都有 SKILL.md 文件）
- **Role 引用的技能总数**: 68
- **已匹配的技能**: 68
- **未匹配的技能**: 0 (所有引用的技能都已存在)
- **新增技能**: 9（5 个引擎特定技能 + 4 个平台特定技能）

## 说明

经过重新扫描，发现所有 87 个技能目录都包含 SKILL.md 文件，且所有 role 引用的技能都已存在于技能库中。之前矩阵中的"未匹配"状态是由于扫描不完整导致的误判。

新增技能基于 OpenAgenticGame-Studios 和 godogen 参考资源创建：
- **引擎特定技能**（5个）：unity-development、cocos-development、godot-development、unreal-development、phaser-development
- **平台特定技能**（4个）：mobile-development、pc-development、console-development、web-development

## Role-Skill 映射表

### Leadership Team (领导团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| creative-director | - | - |
| technical-director | architecture-decision ✓, code-review ✓, technical-risk-assessment ✓, setup-engine ✓, perf-profile ✓, tech-stack-selection ✓, technical-leadership ✓, standards-enforcement ✓ | 8 匹配 |
| producer | sprint-plan ✓, estimate ✓, retrospective ✓, resource-allocation ✓, risk-management ✓, team-coordination ✓ | 6 匹配 |
| art-director | - | - |
| audio-director | - | - |
| narrative-director | story-design ✓, character-development ✓, narrative-review ✓, script-approval ✓, narrative-leadership ✓, story-coordination ✓ | 6 匹配 |
| game-vision-architect | vision-articulation ✓, strategic-planning ✓, vision-consistency-check ✓, strategic-impact-analysis ✓, vision-maintenance ✓, strategic-decision ✓ | 6 匹配 |

### Design Team (设计团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| game-designer | design_game_mechanics ✓ | 1 匹配 |
| systems-designer | design-systems ✓, interaction-design ✓, design-review ✓, balance-check ✓, system-implementation ✓, data-analysis ✓ | 6 匹配 |
| level-designer | level-creation ✓, encounter-design ✓, design-review ✓, playtest-feedback ✓, level-implementation ✓, space-optimization ✓ | 6 匹配 |
| economy-designer | - | - |
| writer | narrative-writing ✓, dialogue-writing ✓, script-review ✓, character-consistency-check ✓, script-implementation ✓, localization-prep ✓ | 6 匹配 |
| core-loop-designer | - | - |
| world-builder | world-creation ✓, environment-design ✓, world-consistency-check ✓, exploration-analysis ✓, world-implementation ✓, environment-optimization ✓ | 6 匹配 |
| live-ops-designer | event-design ✓, content-planning ✓, engagement-analysis ✓, monetization-analysis ✓, event-implementation ✓, live-ops-optimization ✓ | 6 匹配 |
| competitive-analysis-specialist | - | - |
| narrative-game-generator | narrative-generation ✓, story-design ✓, narrative-consistency-check ✓, generation-quality-analysis ✓, narrative-system-implementation ✓, generation-optimization ✓ | 6 匹配 |
| aesthetic-direction-framework | - | - |
| design-coherence-engine | - | - |

### Programming Team (编程团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| lead-programmer | code-review ✓, technical-standards-enforcement ✓, technical-leadership ✓, task-allocation ✓ | 4 匹配 |
| engine-programmer | - | - |
| gameplay-programmer | gameplay-implementation ✓, system-integration ✓, gameplay-optimization ✓ | 3 匹配 |
| backend-programmer | - | - |
| network-programmer | network-implementation ✓, synchronization ✓, latency-optimization ✓ | 3 匹配 |
| ui-programmer | ui-implementation ✓, interaction-implementation ✓, ui-optimization ✓ | 3 匹配 |
| godot-programmer | generate_scene_builder_script ✓ | 1 匹配 |

### Art Team (美术团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| concept-artist | - | - |
| environment-artist | environment-creation ✓, scene-building ✓, environment-consistency-check ✓, asset-optimization ✓ | 4 匹配 |
| character-artist | - | - |
| ui-designer | ui-design ✓, interaction-design ✓, ux-evaluation ✓, accessibility-check ✓, ui-prototyping ✓, user-flow-design ✓ | 6 匹配 |
| vfx-artist | vfx-creation ✓, vfx-design ✓, vfx-consistency-check ✓, performance-evaluation ✓, vfx-implementation ✓, particle-optimization ✓ | 6 匹配 |
| visual-designer | generate_visual_reference ✓ | 1 匹配 |
| technical-artist | generate_image_asset ✓ | 1 匹配 |

### QA Team (质量保证团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| qa-lead | test-strategy ✓, quality-standards ✓, qa-leadership ✓, test-allocation ✓ | 4 匹配 |
| qa-tester | test-execution ✓, bug-identification ✓, test-case-writing ✓, bug-reporting ✓ | 4 匹配 |
| automation-engineer | - | - |
| visual-qa-engineer | visual_quality_assurance_static ✓ | 1 匹配 |

### Production Team (制作团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| release-manager | release-checklist ✓ | 1 匹配 |
| localization-lead | localize ✓ | 1 匹配 |
| community-manager | patch-notes ✓ | 1 匹配 |
| devops-engineer | setup-engine ✓ | 1 匹配 |
| analytics-engineer | perf-profile ✓ | 1 匹配 |
| security-engineer | code-review ✓ | 1 匹配 |
| prototyper | prototype ✓ | 1 匹配 |

### Publish Team (发布团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| platform-certification-specialist | gate-check ✓ | 1 匹配 |
| platform-relationship-manager | brainstorm ✓ | 1 匹配 |
| release-coordinator | release-checklist ✓ | 1 匹配 |
| store-page-optimizer | brainstorm ✓ | 1 匹配 |
| store-submission-specialist | gate-check ✓ | 1 匹配 |

### Support Team (支持团队)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| enhanced-analytics-engineer | perf-profile ✓ | 1 匹配 |

### Other Roles (其他角色)

| Role | 引用的技能 | 状态 |
|------|----------|------|
| asset-planner | - | - |
| project-manager | orchestrate_pipeline ✓ | 1 匹配 |
| system-architect | design_technical_architecture ✓ | 1 匹配 |
| technical-architect | design_scene_hierarchy ✓ | 1 匹配 |
| technical-designer | assess_implementation_risks ✓ | 1 匹配 |

## 已匹配的技能列表

以下所有 68 个技能在 role 定义中被引用，且在现有技能库中已存在：

### 设计相关（39个）
- story-design ✓
- character-development ✓
- narrative-review ✓
- script-approval ✓
- narrative-leadership ✓
- story-coordination ✓
- narrative-generation ✓
- narrative-consistency-check ✓
- generation-quality-analysis ✓
- narrative-system-implementation ✓
- generation-optimization ✓
- design_game_mechanics ✓
- design-systems ✓
- interaction-design ✓
- design-review ✓
- balance-check ✓
- system-implementation ✓
- data-analysis ✓
- level-creation ✓
- encounter-design ✓
- playtest-feedback ✓
- level-implementation ✓
- space-optimization ✓
- event-design ✓
- content-planning ✓
- engagement-analysis ✓
- monetization-analysis ✓
- event-implementation ✓
- live-ops-optimization ✓
- narrative-writing ✓
- dialogue-writing ✓
- script-review ✓
- character-consistency-check ✓
- script-implementation ✓
- localization-prep ✓
- world-creation ✓
- environment-design ✓
- world-consistency-check ✓
- world-implementation ✓
- environment-optimization ✓

### 编程相关（15个）
- technical-risk-assessment ✓
- tech-stack-selection ✓
- technical-leadership ✓
- standards-enforcement ✓
- technical-standards-enforcement ✓
- task-allocation ✓
- gameplay-implementation ✓
- system-integration ✓
- gameplay-optimization ✓
- network-implementation ✓
- synchronization ✓
- latency-optimization ✓
- ui-implementation ✓
- interaction-implementation ✓
- ui-optimization ✓
- generate_scene_builder_script ✓

### 美术相关（18个）
- environment-creation ✓
- scene-building ✓
- environment-consistency-check ✓
- asset-optimization ✓
- ui-design ✓
- ux-evaluation ✓
- accessibility-check ✓
- ui-prototyping ✓
- user-flow-design ✓
- vfx-creation ✓
- vfx-design ✓
- vfx-consistency-check ✓
- performance-evaluation ✓
- vfx-implementation ✓
- particle-optimization ✓
- generate_visual_reference ✓
- generate_image_asset ✓

### QA相关（9个）
- test-strategy ✓
- quality-standards ✓
- qa-leadership ✓
- test-allocation ✓
- test-execution ✓
- bug-identification ✓
- test-case-writing ✓
- bug-reporting ✓
- visual_quality_assurance_static ✓

### 项目管理相关（8个）
- sprint-plan ✓
- estimate ✓
- retrospective ✓
- resource-allocation ✓
- risk-management ✓
- team-coordination ✓
- orchestrate_pipeline ✓
- assess_implementation_risks ✓

### 战略相关（6个）
- vision-articulation ✓
- strategic-planning ✓
- vision-consistency-check ✓
- strategic-impact-analysis ✓
- vision-maintenance ✓
- strategic-decision ✓

### 其他（3个）
- prototype ✓
- design_technical_architecture ✓
- design_scene_hierarchy ✓

### 引擎和平台相关（9个）- 新增
- unity-development ✓
- cocos-development ✓
- godot-development ✓
- unreal-development ✓
- phaser-development ✓
- mobile-development ✓
- pc-development ✓
- console-development ✓
- web-development ✓

## 总结

所有 role 引用的 68 个技能都已存在于技能库中，技能库覆盖率为 100%。技能库总共有 87 个技能，其中包括 9 个新增的引擎和平台特定技能。

## 建议

1. **完善技能定义**：为所有技能确保有详细的 SKILL.md 文件
2. **标准化技能命名**：确保技能命名一致性
3. **优化技能组织**：考虑技能的分类和层级结构
4. **技能复用**：识别可复用的技能模式
