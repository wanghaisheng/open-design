---
description: 标准特性开发流程 (v2.0 - 增强版)
---

## 核心原则

- **1 Feature = 1 Worktree = 1 独立环境** - 每个需求在自己的分支和目录中完整闭环
- **三层架构** - Command → Agent → Skill
- **完整生命周期** - 从需求创建到归档的全流程管理
- **质量保障** - 6维度文档审查 + Gherkin验收 + 自动化测试
- **知识积累** - 渐进式归档加载，历史经验自动赋能新需求

---

## 命令集

### /new-feature
- 创建新需求
- 6维审查：清晰度·完整性·一致性·可行性
- 输出需求规格文档

### /review-spec
- 审查需求规格
- Gherkin Given-When-Then 验收标准
- 确认需求质量（100分制）

### /start-feature
- 创建分支 + worktree
- // turbo
  git worktree add -b feature/[feature-name] ../chatgame-[feature-name]
- 初始化独立环境

### /implement-feature
- /dev-agent 调度
- DevSubAgent 独立 200k 上下文
- 15个 Skill 原子能力
- 测试驱动开发
- 写代码 + 测试 + 自动修复

### /verify-feature
- 单元测试
- 集成测试
- Playwright MCP 浏览器测试
- 失败自动修复（最多2次重试）
- MVP 测试通过

### /complete-feature
- 合并 + 归档
- git merge feature/[feature-name]
- git worktree remove ../chatgame-[feature-name]
- 知识归档到 SubAgent

---

## 详细流程

### 1. 需求创建 (/new-feature)
- 阅读相关文档和 issue
- 确定影响范围
- 识别依赖关系
- **6维度文档审查**（100分制）：
  - 清晰度：需求描述是否明确
  - 完整性：是否覆盖所有场景
  - 一致性：是否与现有系统一致
  - 可行性：技术实现是否可行
- 输出需求规格文档

### 2. 需求审查 (/review-spec)
- 审查需求规格文档
- 定义 Gherkin Given-When-Then 验收标准
- 确认需求质量 ≥ 80分
- 智能拆分（按用户价值，不按技术层）：
  - ✓ 正确：按用户价值拆分（注册→登录→权限管理）
  - ✗ 错误：按技术层拆分（DB→API→UI）

### 3. 启动特性 (/start-feature)
- 创建特性分支和 worktree
  // turbo
  git worktree add -b feature/[feature-name] ../chatgame-[feature-name]
- 初始化独立环境
  cd ../chatgame-[feature-name]
  npm install

### 4. 开发实现 (/implement-feature)
- /dev-agent 调度 DevSubAgent
- DevSubAgent 独立 200k 上下文
- 使用 15个 Skill 原子能力：
  - new-feature
  - start-feature
  - implement
  - verify
  - split-feature
  - complete
  - review-spec
  - enrich-feature
  - query-archive
  - pm-agent
  - + 5 more
- 写代码
- 测试 + 自动修复

### 5. 验证特性 (/verify-feature)
- 单元测试
- 集成测试
- E2E 测试
- Playwright MCP 浏览器测试
- 失败自动修复（最多2次重试）
- MVP 测试通过（100%）

### 6. 完成特性 (/complete-feature)
- 代码审查准备
  - 自查代码
  - 确保 build、tsc 均没有错误
  - 更新文档
  - 准备 PR 描述
- 提交和合并
  // turbo
  git add .
  git commit -m "feat: [feature description]"
  cd ../chatgame
  git merge feature/[feature-name]
  git push origin main
  git worktree remove ../chatgame-[feature-name]
- 知识归档

---

## 并行开发

- 多个 Feature 同时推进
- git worktree 物理隔离
- 独立分支·独立上下文·互不干扰

---

## 知识积累系统

### Level 1: 索引搜索（毫秒级）
- 快速检索历史代码和文档

### Level 2: SubAgent 深度加载
- 渐进式归档加载
- 历史经验自动赋能新需求

---

## 质量保障

- 6维度文档审查（100分制）
- Gherkin Given-When-Then 验收
- Playwright MCP 浏览器测试
- 失败自动修复（最多2次重试）
- MVP 测试通过（100%）

---

## 当前版本

- v2.0
- Phase 全部完成
- 项目已归档

---

## 游戏开发工作流集成

对于游戏开发项目，feature-dev工作流需要与RAMS Game框架集成：

### 游戏开发特性开发流程

游戏开发的特性开发遵循RAMS Game的七阶段管道编排，同时保持worktree隔离原则：

**1 Feature = 1 Worktree = 1 游戏开发阶段**

### 游戏开发命令集扩展

### /new-game-feature
- 创建新游戏开发需求
- 基于游戏需求文档（GDD）
- 确定所属阶段（概念验证/生产开发）
- 6维审查：清晰度·完整性·一致性·可行性·游戏性·可玩性
- 输出游戏需求规格文档

### /review-game-spec
- 审查游戏需求规格
- Gherkin Given-When-Then 验收标准（游戏化版本）
- 确认需求质量 ≥ 80分
- 智能拆分（按游戏价值，不按技术层）：
  - ✓ 正确：按游戏价值拆分（核心玩法→关卡设计→角色系统）
  - ✗ 错误：按技术层拆分（3D模型→动画→物理）

### /start-game-feature
- 创建分支 + worktree
- // turbo
  git worktree add -b game-feature/[feature-name] ../game-[feature-name]
- 初始化游戏开发独立环境
- 加载RAMS Game角色配置
- 初始化Git-like版本控制

### /implement-game-feature
- 根据所属阶段选择工作流：
  - **概念验证阶段**：使用概念验证Quick工作流
  - **生产开发阶段**：使用七阶段管道编排
- RAMS Game角色调度（40-50个专业角色）
- Git-like版本控制集成
- 阶段质量门控

### /verify-game-feature
- 视觉QA（visual_quality_assurance_static/dynamic）
- 功能测试（functional-testing）
- 性能测试（performance-testing）
- 游戏性测试（playtest）
- 失败自动修复（最多2次重试）
- 阶段验收通过

### /complete-game-feature
- 合并 + 归档
- git merge game-feature/[feature-name]
- git worktree remove ../game-[feature-name]
- RAMS Game执行历史归档
- 知识归档到游戏开发SubAgent

### 游戏开发详细流程

#### 1. 游戏需求创建 (/new-game-feature)
- 阅读游戏需求文档（GDD）
- 确定所属阶段（概念验证/生产开发）
- 确定影响范围
- 识别依赖关系
- **6维度文档审查**（100分制）：
  - 清晰度：需求描述是否明确
  - 完整性：是否覆盖所有场景
  - 一致性：是否与游戏设计一致
  - 可行性：技术实现是否可行
  - 游戏性：是否符合游戏设计理念
  - 可玩性：是否有趣好玩
- 输出游戏需求规格文档

#### 2. 游戏需求审查 (/review-game-spec)
- 审查游戏需求规格文档
- 定义 Gherkin Given-When-Then 验收标准（游戏化版本）
- 确认需求质量 ≥ 80分
- 智能拆分（按游戏价值，不按技术层）

#### 3. 启动游戏特性 (/start-game-feature)
- 创建特性分支和 worktree
- // turbo
  git worktree add -b game-feature/[feature-name] ../game-[feature-name]
- 初始化游戏开发独立环境
- cd ../game-[feature-name]
- 加载RAMS Game角色配置
- 初始化Git-like版本控制
- 配置游戏开发技能库

#### 4. 游戏开发实现 (/implement-game-feature)

**概念验证阶段：**
- 使用概念验证Quick工作流
- 调用8-10个核心角色
- 代码质量：relaxed（原型标准）
- 时间预算：1-3天
- 七阶段管道（简化版）：
  - Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration

**生产开发阶段：**
- 使用七阶段管道编排
- 调用40-50个专业角色
- 代码质量：strict（生产标准）
- 时间预算：根据里程碑
- 完整七阶段管道：
  - Visual Target → Decomposition → Architecture → Asset Generation → Task Execution → Visual QA → Orchestration

**Git-like版本控制集成：**
```bash
# 创建阶段分支
open-design execution branch create --instance <instance-name> --name <stage-name>

# 执行技能
open-design skill execute --instance <instance-name> --skill <skill-name>

# 提交变更
open-design execution commit --instance <instance-name> --message "完成<stage-name>阶段"

# 创建标签
open-design execution tag create --instance <instance-name> --name v<version>-<stage-name>
```

#### 5. 游戏特性验证 (/verify-game-feature)
- 视觉QA（visual_quality_assurance_static/dynamic）
- 功能测试（functional-testing）
- 性能测试（performance-testing）
- 游戏性测试（playtest）
- 失败自动修复（最多2次重试）
- 阶段验收通过

#### 6. 完成游戏特性 (/complete-game-feature)
- 代码审查准备
  - 自查代码
  - 确保编译通过
  - 更新游戏设计文档
  - 准备 PR 描述
- 提交和合并
  // turbo
  git add .
  git commit -m "feat(game): [feature description]"
  cd ../game
  git merge game-feature/[feature-name]
  git push origin main
  git worktree remove ../game-[feature-name]
- RAMS Game执行历史归档
- 知识归档到游戏开发SubAgent

### 游戏开发并行开发

- 多个游戏特性同时推进
- git worktree 物理隔离
- 独立分支·独立上下文·互不干扰
- RAMS Game角色实例隔离
- Git-like版本控制分支隔离

### 游戏开发知识积累系统

### Level 1: 索引搜索（毫秒级）
- 快速检索历史游戏代码和文档
- 游戏资产库索引

### Level 2: 游戏开发SubAgent深度加载
- 渐进式归档加载
- 历史游戏开发经验自动赋能新需求
- 游戏设计模式积累

### 游戏开发质量保障

- 6维度文档审查（100分制，含游戏性、可玩性）
- Gherkin Given-When-Then 验收（游戏化版本）
- 视觉QA（静态/动态/问题三种模式）
- 性能测试（perf-profile）
- 游戏性测试（playtest）
- 失败自动修复（最多2次重试）
- 阶段验收通过

### 游戏开发阶段分离集成

feature-dev工作流与RAMS Game阶段分离机制集成：

**概念验证阶段特性开发：**
- worktree命名：`game-concept-[feature-name]`
- 分支命名：`concept-feature/[feature-name]`
- 代码质量：relaxed
- 时间预算：1-3天
- 质量门控：核心玩法验证通过

**生产开发阶段特性开发：**
- worktree命名：`game-prod-[feature-name]`
- 分支命名：`prod-feature/[feature-name]`
- 代码质量：strict
- 时间预算：根据里程碑
- 质量门控：完整测试覆盖、发布检查清单通过

### 相关文档

- [game-development-workflow.md](./game-development-workflow.md) - 游戏开发专用主工作流
- [game-prd-to-mvp.md](./game-prd-to-mvp.md) - 游戏PRD到MVP流程
- [game-requirement-to-task.md](./game-requirement-to-task.md) - 游戏开发角色召集流程
