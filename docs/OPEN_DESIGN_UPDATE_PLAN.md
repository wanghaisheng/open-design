# Open Design 更新计划

基于 OpenAgenticGame-Studios RAMS 框架分析的 Open Design 更新计划。

---

## 计划概述

本计划基于对 OpenAgenticGame-Studios 项目的深入分析，将其优秀的架构和设计理念整合到 Open Design 中，以增强 Open Design 的游戏开发策划能力。

**分析来源**：`docs/OPENAGENTICGAME_STUDIOS_RAMS_ANALYSIS.md`

**更新原则**：
- 优先集成高价值、低成本的改进
- 保持 Open Design 的现有架构兼容性
- 分阶段实施，短期见效，长期规划

---

## 短期任务（高优先级）

### 任务 1：补充资产策划角色（来自 Godogen）

**目标**：将 Godogen 的 asset-planner 角色整合到 Open Design

**当前状态**：已存在 `.claude/roles/game-development/asset-planner/`

**需要增强**：
- 补充 OpenAgenticGame-Studios 的协作协议（Question → Options → Decision → Draft → Approval）
- 增强预算管理意识
- 添加多后端选择能力

**具体行动**：
1. 更新 `asset-planner/soul.md`：
   - 添加协作协议部分
   - 强化预算意识描述
   - 添加决策框架

2. 更新 `asset-planner/role.md`：
   - 添加 OpenAgenticGame-Studios 的技能（brainstorm, design-review）
   - 增强工具配置

**预期收益**：
- 更专业的资产规划能力
- 更好的成本控制
- 更清晰的决策流程

**完成时间**：1-2 天

---

### 任务 2：补充视觉 QA 工程师角色（来自 Godogen）

**目标**：将 Godogen 的 visual-qa-engineer 角色整合到 Open Design

**当前状态**：已存在 `.claude/roles/game-development/visual-qa-engineer/`

**需要增强**：
- 补充 OpenAgenticGame-Studios 的协作协议
- 添加 OpenAgenticGame-Studios 的 bug 严重性定义（S1-S4）
- 增强测试策略能力

**具体行动**：
1. 更新 `visual-qa-engineer/soul.md`：
   - 添加协作协议部分
   - 添加 bug 严重性定义
   - 添加测试策略描述

2. 更新 `visual-qa-engineer/role.md`：
   - 添加 bug-report 技能
   - 添加 release-checklist 技能
   - 增强工具配置

**预期收益**：
- 更专业的 QA 能力
- 更清晰的 bug 分类
- 更好的测试策略

**完成时间**：1-2 天

---

### 任务 3：补充软件工具渠道（Godogen 第三方工具集成）

**目标**：将 Godogen 的第三方工具集成作为软件工具渠道补充到现有角色

**当前状态**：现有角色主要使用 AI 模型渠道

**需要添加的工具**：
- `asset_gen.py`：图像/视频/3D 生成（Gemini、Grok、Tripo3D）
- `rembg_matting.py`：背景移除（BiRefNet）
- `grid_slice.py`：网格切片
- `find_loop_frame.py`：循环帧检测
- `tripo3d.py`：Tripo3D API 客户端
- `godot_api_converter.py`：Godot API 文档转换
- `visual_qa.py`：视觉 QA（Gemini Flash）

**具体行动**：
1. 创建 `packages/open-design-cli/src/rams/tool-channels/` 目录
2. 为每个工具创建工具通道定义：
   - `asset-generation-channel.ts`
   - `image-processing-channel.ts`
   - `godot-api-channel.ts`
   - `visual-qa-channel.ts`

3. 更新现有角色的 `role.md`，添加软件工具渠道技能

**预期收益**：
- 丰富的第三方工具集成
- 更强的资产生成能力
- 更专业的视觉 QA

**完成时间**：3-5 天

---

### 任务 4：整合 Soul 定义（OpenAgenticGame-Studios 协作协议）

**目标**：将 OpenAgenticGame-Studios 的协作协议融入现有 Soul 定义

**OpenAgenticGame-Studios 协作协议**：
```
Question → Options → Decision → Draft → Approval
```

**具体行动**：
1. 为所有现有 game-development 角色的 soul.md 添加协作协议部分
2. 统一协作协议格式：
   ```markdown
   ### 协作协议
   
   **协作模式**：用户驱动协作，而非自主执行
   
   #### 决策工作流
   
   1. **提问**：在提出解决方案前先提问
   2. **展示选项**：展示 2-4 个选项及其优缺点
   3. **用户决策**：用户做出最终选择
   4. **起草**：展示工作草稿或摘要
   5. **批准**：未经批准不写入文件
   ```

3. 更新以下角色的 soul.md：
   - visual-designer
   - technical-designer
   - technical-architect
   - game-designer
   - technical-artist
   - godot-programmer
   - system-architect

**预期收益**：
- 统一的协作模式
- 更好的用户体验
- 更清晰的决策流程

**完成时间**：2-3 天

---

## 中期任务（中优先级）

### 任务 5：创建团队结构（参考 9 团队结构）

**目标**：参考 OpenAgenticGame-Studios 的 9 团队结构，创建 Open Design 的团队组织

**OpenAgenticGame-Studios 9 团队**：
1. Leadership Team（领导团队）
2. Programming Team（编程团队）
3. Design Team（设计团队）
4. Art Team（艺术团队）
5. QA Team（质量保证团队）
6. Production Team（制作团队）
7. Publish Team（发布团队）
8. Support Team（支持团队）
9. Enhanced Team（增强团队）

**具体行动**：
1. 创建 `.claude/teams/` 目录结构
2. 为每个团队创建团队定义文件：
   - `leadership/team.md`
   - `programming/team.md`
   - `design/team.md`
   - `art/team.md`
   - `qa/team.md`
   - `production/team.md`
   - `publish/team.md`
   - `support/team.md`
   - `enhanced/team.md`

3. 每个团队定义包含：
   - 团队职责
   - 团队成员列表
   - 团队协作规则
   - 团队升级路径

4. 创建团队管理 CLI 命令：
   - `packages/open-design-cli/src/commands/team.ts`
   - 子命令：list, members, rules, escalation

**预期收益**：
- 清晰的团队组织结构
- 更好的角色管理
- 明确的协作路径

**完成时间**：5-7 天

---

### 任务 6：实现 Quick/BMM 工作流系统

**目标**：实现 OpenAgenticGame-Studios 的 Quick/BMM 工作流系统

**Quick 工作流**：清晰有界的编码工作
**BMM 工作流**：需求发现到实现的完整工作流

**具体行动**：
1. 创建工作流系统核心：
   - `packages/open-design-cli/src/rams/workflows/` 目录
   - `quick-workflow.ts`
   - `bmm-workflow.ts`
   - `workflow-manager.ts`

2. 实现核心文档支持：
   - `harness.ts`（工具配置）
   - `task-sizing.ts`（任务规模）
   - `milestone-design.ts`（里程碑设计）
   - `work-breakdown.ts`（工作分解）
   - `validation-matrix.ts`（验证矩阵）
   - `closeout-loop.ts`（关闭循环）

3. 创建工作流 CLI 命令：
   - `packages/open-design-cli/src/commands/workflow.ts`
   - 子命令：quick, bmm, validate, archive, review

4. 创建工作流模板：
   - `.claude/templates/workflows/quick-prompt.md`
   - `.claude/templates/workflows/milestone.md`
   - `.claude/templates/workflows/closeout.md`

**预期收益**：
- 企业级工作流系统
- 更好的任务管理
- 明确的验证流程

**完成时间**：7-10 天

---

### 任务 7：添加质量门控（12 个编码标准）

**目标**：实现 OpenAgenticGame-Studios 的 12 个编码标准和质量规则

**12 个规则**：
1. engine-code.md（引擎代码规则）
2. gameplay-code.md（游戏玩法代码规则）
3. ui-code.md（UI 代码规则）
4. ai-code.md（AI 代码规则）
5. network-code.md（网络代码规则）
6. design-docs.md（设计文档规则）
7. narrative.md（叙事规则）
8. data-files.md（数据文件规则）
9. shader-code.md（Shader 代码规则）
10. prototype-code.md（原型代码规则）
11. test-standards.md（测试标准）
12. team-coordination.md（团队协调规则）

**具体行动**：
1. 创建规则系统：
   - `packages/open-design-cli/src/rams/rules/` 目录
   - 为每个规则创建 TypeScript 定义
   - `rule-manager.ts`（规则管理器）

2. 创建规则 CLI 命令：
   - `packages/open-design-cli/src/commands/rule.ts`
   - 子命令：list, check, enable, disable, validate

3. 集成到现有工具：
   - 在代码编辑时自动应用路径范围规则
   - 在文件写入时验证规则合规性

4. 创建规则配置文件：
   - `.claude/rules/` 目录
   - 每个规则的 markdown 文档

**预期收益**：
- 完善的质量标准
- 自动化规则检查
- 更好的代码质量

**完成时间**：5-7 天

---

## 长期任务（低优先级）

### 任务 8：多引擎支持（Unity/Unreal/Cocos）

**目标**：扩展 Open Design 以支持 Unity、Unreal、Cocos Creator 引擎

**具体行动**：
1. 创建引擎专用角色：
   - `.claude/roles/game-development/unity-specialist/`
   - `.claude/roles/game-development/unreal-specialist/`
   - `.claude/roles/game-development/cocos-creator-specialist/`

2. 每个引擎专家包含：
   - soul.md（引擎特定的人格特质）
   - role.md（引擎特定的技能和工具）

3. 创建引擎特定的技能：
   - unity-skills
   - unreal-skills
   - cocos-skills

**预期收益**：
- 多引擎支持
- 更广泛的适用性
- 引擎最佳实践

**完成时间**：10-15 天

---

### 任务 9：通用参考系统（AI 平台无关）

**目标**：实现 AI 平台无关的通用参考系统

**具体行动**：
1. 创建通用参考系统架构：
   - `refenrece/` 目录（参考 OpenAgenticGame-Studios）
   - `refenrece/agents/`（通用角色定义）
   - `refenrece/skills/`（通用技能定义）
   - `refenrece/rules/`（通用规则定义）

2. 创建平台适配层：
   - `.claude/`（Claude Code 特定配置）
   - `.cursor/`（Cursor 特定配置）
   - `.windsurf/`（Windsurf 特定配置）

3. 创建参考系统管理器：
   - `packages/open-design-cli/src/rams/reference-manager.ts`
   - CLI 命令：reference sync, reference export

**预期收益**：
- AI 平台无关
- 跨平台兼容
- 灵活的架构

**完成时间**：10-15 天

---

### 任务 10：企业级工作流（BMAD + OpenSpec + Harness）

**目标**：集成 BMAD + OpenSpec + Harness 企业级工作流框架

**具体行动**：
1. 创建 BMAD 框架支持：
   - `.codex/` 目录
   - `.codex/workflows/`（工作流定义）
   - `.codex/core/`（核心框架）

2. 创建 OpenSpec 支持：
   - `openspec/` 目录
   - `openspec/changes/`（变更记录）

3. 创建 Harness 支持：
   - 工具配置
   - 任务规模评估
   - 里程碑设计

4. 创建企业级 CLI 命令：
   - `packages/open-design-cli/src/commands/enterprise.ts`
   - 子命令：bmm, openspec, harness

**预期收益**：
- 企业级工作流
- 变更管理
- 里程碑跟踪

**完成时间**：15-20 天

---

## 实施时间表

### 第一阶段（2 周）- 短期任务
- 第 1-2 天：任务 1 - 补充资产策划角色
- 第 3-4 天：任务 2 - 补充视觉 QA 工程师角色
- 第 5-7 天：任务 3 - 补充软件工具渠道
- 第 8-10 天：任务 4 - 整合 Soul 定义

### 第二阶段（3 周）- 中期任务
- 第 11-17 天：任务 5 - 创建团队结构
- 第 18-27 天：任务 6 - 实现 Quick/BMM 工作流系统
- 第 28-34 天：任务 7 - 添加质量门控

### 第三阶段（4 周）- 长期任务
- 第 35-49 天：任务 8 - 多引擎支持
- 第 50-64 天：任务 9 - 通用参考系统
- 第 65-80 天：任务 10 - 企业级工作流

---

## 风险与缓解

### 风险 1：架构兼容性
**风险**：新功能可能与现有架构不兼容
**缓解**：
- 分阶段实施
- 保持向后兼容
- 充分测试

### 风险 2：学习曲线
**风险**：团队需要学习新的工作流和工具
**缓解**：
- 提供详细文档
- 创建培训材料
- 逐步引入

### 风险 3：资源限制
**风险**：开发资源可能不足
**缓解**：
- 优先实施高价值任务
- 可调整实施顺序
- 寻求社区支持

---

## 成功指标

### 短期指标（2 周后）
- [ ] 2 个新角色成功整合
- [ ] 4 个软件工具渠道添加完成
- [ ] 所有现有角色 Soul 定义更新完成

### 中期指标（5 周后）
- [ ] 9 个团队结构创建完成
- [ ] Quick/BMM 工作流系统可用
- [ ] 12 个质量规则实现完成

### 长期指标（11 周后）
- [ ] 3 个新引擎支持完成
- [ ] 通用参考系统可用
- [ ] 企业级工作流集成完成

---

## 下一步行动

**立即开始**：
1. 创建更新计划文档（已完成）
2. 开始实施任务 1：补充资产策划角色

**本周完成**：
- 任务 1：补充资产策划角色
- 任务 2：补充视觉 QA 工程师角色

**下周完成**：
- 任务 3：补充软件工具渠道
- 任务 4：整合 Soul 定义

---

*更新计划创建完成*
*创建时间：2026-04-24*
*基于分析：OPENAGENTICGAME_STUDIOS_RAMS_ANALYSIS.md*
