---
description: Quick 工作流 - 用于清晰有界的编码工作
---

# Quick 工作流

## 概述

Quick 工作流用于清晰有界的编码工作，强调压缩但强大的工作流程。适用于需求明确、范围清晰的实现任务。

## 适用场景

- 清晰有界的编码工作
- 需求明确的实现任务
- 不需要需求发现或变更框架
- 正常的实现工作

## 核心文档

在开始工作前，加载以下内部文档：

- `harness.md` - 工具配置
- `task-sizing.md` - 任务规模
- `milestone-design.md` - 里程碑设计
- `work-breakdown.md` - 工作分解
- `validation-matrix.md` - 验证矩阵
- `closeout-loop.md` - 关闭循环

## 工作目标

- 端到端交付更改，不扩展用户可见的过程表面
- 保持工作流程简洁但强大
- 确保质量门控通过
- 维护文档同步

## 工作序列

### 1. 检查（Inspection）

检查受影响的代码路径和文档：
- 识别所有受影响的文件
- 检查现有文档是否需要更新
- 确认任务范围和边界

### 2. 任务规模和工作分解

- 使用 `task-sizing.md` 评估任务规模
- 使用 `work-breakdown.md` 分解任务
- 确认任务在合理范围内（通常 1-3 天）

### 3. 里程碑设计

- 将任务写为一个里程碑
- 使用 `milestone-design.md` 设计里程碑
- 定义明确的验收标准

### 4. 实现

- 实现有界里程碑
- 遵循编码标准和最佳实践
- 保持实现简洁

### 5. 验证

- 运行相关验证
- 使用 `validation-matrix.md` 确认验证通过
- 应用硬门控（质量标准）

### 6. 文档同步

- 更新相关文档
- 确保文档与实现一致
- 使用 `closeout-loop.md` 关闭循环

## 质量门控

在完成每个步骤时，确保：

- 代码符合编码标准
- 测试通过
- 文档更新
- 无已知问题

## 退出条件

当以下条件满足时，可以退出 Quick 工作流：

- 里程碑验收标准全部通过
- 所有验证通过
- 文档已同步
- 无阻塞问题

## 升级到 BMM

如果出现以下情况，考虑升级到 BMM 工作流：

- 需求不明确或需要发现
- 需要变更框架
- 任务范围超出预期
- 需要架构变更

---

## 游戏开发快速工作流

对于游戏开发项目，Quick工作流需要进行特化：

### 游戏开发阶段分离

游戏开发引入阶段分离机制，Quick工作流可以应用于单个阶段：

**概念验证阶段Quick工作流**
- 时间预算：1-3天
- 参与角色：8-10个核心角色
- 代码质量：relaxed（原型标准）
- 目标：快速验证核心玩法

**生产开发阶段Quick工作流**
- 时间预算：单个里程碑（1-2周）
- 参与角色：相关角色子集
- 代码质量：strict（生产标准）
- 目标：完成单个里程碑

### 游戏开发七阶段管道

游戏开发的单个阶段可以使用Quick工作流：

**阶段1：Visual Target Quick工作流**
```
1. 检查：游戏概念、视觉风格
2. 任务规模：1-2小时
3. 里程碑设计：生成视觉参考
4. 实现：调用generate_visual_reference
5. 验证：视觉质量检查
6. 文档同步：更新visual-target.md
```

**阶段2：Decomposition Quick工作流**
```
1. 检查：核心玩法机制
2. 任务规模：2-4小时
3. 里程碑设计：风险评估
4. 实现：调用assess_implementation_risks
5. 验证：风险识别准确
6. 文档同步：更新risk-assessment.md
```

**阶段3：Architecture Quick工作流**
```
1. 检查：游戏世界设计
2. 任务规模：4-8小时
3. 里程碑设计：架构蓝图
4. 实现：调用design_scene_hierarchy
5. 验证：架构完整性
6. 文档同步：更新STRUCTURE.md
```

**阶段4：Asset Generation Quick工作流**
```
1. 检查：资产需求
2. 任务规模：2-6小时
3. 里程碑设计：资产生成
4. 实现：调用generate_image_asset
5. 验证：资产质量
6. 文档同步：更新ASSETS.md
```

**阶段5：Task Execution Quick工作流**
```
1. 检查：架构蓝图、资产清单
2. 任务规模：8-16小时
3. 里程碑设计：场景构建
4. 实现：调用generate_scene_builder_script
5. 验证：编译通过、功能正常
6. 文档同步：更新代码库
```

**阶段6：Visual QA Quick工作流**
```
1. 检查：游戏构建、视觉目标
2. 任务规模：1-3小时
3. 里程碑设计：视觉QA
4. 实现：调用visual_quality_assurance_static
5. 验证：QA报告完整
6. 文档同步：更新qa-report.md
```

**阶段7：Orchestration Quick工作流**
```
1. 检查：项目状态
2. 任务规模：1-2小时
3. 里程碑设计：进度报告
4. 实现：调用communicate_progress
5. 验证：进度通知发送
6. 文档同步：更新项目状态
```

### Git-like版本控制集成

游戏开发Quick工作流集成Git-like版本控制：

```bash
# 开始任务前创建分支
open-design execution branch create --instance <instance-name> --name quick-task-branch

# 执行任务
open-design skill execute --instance <instance-name> --skill <skill-name>

# 验证后提交
open-design execution commit --instance <instance-name> --message "完成quick任务"

# 合并到主分支
open-design execution merge --instance <instance-name> --source quick-task-branch --target main
```

### 质量门控

游戏开发Quick工作流的质量门控：

- 概念验证阶段：放宽编码标准，追求速度
- 生产开发阶段：严格遵循编码标准，完整测试覆盖
- 视觉QA：必须通过visual_quality_assurance
- 性能QA：必须通过performance-testing

### 使用游戏开发工作流

对于完整的游戏开发项目，推荐使用专门的游戏开发工作流：

```bash
# 使用游戏开发工作流
/workflow game-development-workflow
```

详见 [game-development-workflow.md](./game-development-workflow.md)
