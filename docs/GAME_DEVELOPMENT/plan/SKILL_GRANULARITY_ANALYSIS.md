# 游戏开发技能粒度分析报告（修订版）

## 概述

当前游戏开发技能库包含 87 个技能（包含新增的引擎和平台特定技能），本报告基于 SKILL_BOUNDARY_ANALYSIS.md 的"如何做"理念重新评估技能粒度。

## 核心理念

**SKILL.md 应该专注于"如何做"的操作步骤**：
- 具体的操作步骤、方法、技巧、最佳实践
- 不包含角色设定（属于 soul.md）
- 不包含"是什么"的概念定义（属于 role.md）
- 不包含"为什么"的理论依据
- 协作协议是合理的（符合 ROLE_INSTANTIATION_GUIDE.md）

## 技能粒度重新评估

### 细粒度技能的优势

根据 SKILL_BOUNDARY_ANALYSIS.md 的要求，细粒度技能更符合"如何做"的定位：
- 细粒度技能描述具体的操作步骤
- 符合"操作手册"、"SOP"的定位
- 便于 AI 模型理解和执行

### 粗粒度技能的问题

粗粒度技能可能包含"是什么"或"为什么"的内容：
- 例如：story-design 包含"核心职责"（已修正）
- 例如：design-systems 可能包含概念定义
- 需要确保粗粒度技能也专注于"如何做"

## 修订后的粒度分析

### 粗粒度技能（11个）- 需要检查是否包含"是什么"内容

1. story-design - 故事设计（已修正，符合"如何做"）
2. design-systems - 设计系统（需检查）
3. brainstorm - 头脑风暴（需检查）
4. world-creation - 世界创建（需检查）
5. project-planning - 项目规划（需检查）
6. engine-development - 引擎开发（需检查）
7. performance-optimization - 性能优化（需检查）
8. test-strategy - 测试策略（需检查）
9. quality-standards - 质量标准（需检查）
10. team-coordination - 团队协调（需检查）
11. localize - 本地化（需检查）
12. prototype - 原型（需检查）

### 细粒度技能（35个）- 符合"如何做"定位，建议保留

**细粒度技能符合 SKILL.md 定位**：
- dialogue-writing - 具体的对话编写方法
- script-review - 具体的剧本评审方法
- balance-check - 具体的平衡检查方法
- concept-art-generation - 具体的概念艺术生成方法
- world-consistency-check - 具体的一致性检查方法
- 等等...

**建议**：保留细粒度技能，因为它们更符合"如何做"的定位。

### 中粒度技能（32个）- 需要检查是否包含"是什么"内容

需要检查中粒度技能是否包含概念定义或理论依据，如果有，需要修正。

## 重新评估的合并建议

### 不建议合并的原因

1. **细粒度技能符合 SKILL.md 定位**
   - 描述具体的操作步骤
   - 符合"操作手册"、"SOP"的定位
   - 便于 AI 模型理解和执行

2. **细粒度技能支持更灵活的角色变体**
   - 可以组合产生更多变体
   - 符合 RAMS 框架的理念

3. **管理复杂度可以通过工具解决**
   - 使用标签和分类管理技能
   - 使用技能组合模板简化配置

### 仍需合并的技能（功能性重复）

以下技能存在功能性重复，建议合并：

1. **Bug 报告相关**（已执行）
   - bug-report + bug-reporting → bug-management
   - 理由：功能重复约70%，合并为一个完整的 Bug 管理技能
   - 状态：✓ 已完成（bug-management技能已创建，所有角色引用已更新）

2. **测试执行相关**（不执行）
   - test-execution + functional-testing → functional-testing
   - 理由：test-execution 不存在，无需合并
   - 状态：✗ 不执行（functional-testing已足够）

3. **发布清单相关**（不执行）
   - release-checklist + launch-checklist + gate-check → release-management
   - 理由：三个技能服务于不同阶段（发布前、启动日、阶段门），功能差异约70%
   - 状态：✗ 不执行（保持独立，各有独特价值）

## 修正建议

### 建议1：修正粗粒度技能

检查并修正粗粒度技能，确保它们专注于"如何做"：
- 删除"核心职责"部分
- 将"设计原则"改为"操作注意事项"
- 添加"适用场景"、"操作步骤"、"常见错误"等章节

### 建议2：合并功能性重复的技能

合并以下功能性重复的技能：
- bug-report + bug-reporting → bug-management（✓ 已完成）
- test-execution + functional-testing → functional-testing（✗ 不执行，test-execution不存在）
- release-checklist + launch-checklist + gate-check → release-management（✗ 不执行，功能差异大）

### 建议3：保留细粒度技能

保留细粒度技能，因为它们符合"如何做"的定位：
- 细粒度技能描述具体的操作步骤
- 符合 SKILL.md 的职责边界
- 支持更灵活的角色变体

### 建议4：添加引擎特定技能

添加以下技能以支持角色变体：
- unity-development
- cocos-development
- godot-development
- unreal-development

## 预期效果

通过上述修正：
- 技能总数从 87 个减少到 86 个（仅合并 bug-report + bug-reporting → bug-management）
- 所有技能符合 SKILL.md 的职责边界
- 保留细粒度技能的灵活性
- 支持更多角色变体（通过引擎特定技能）
- 管理复杂度通过工具解决
