# Version Control Feature Matrix

This document tracks the implementation status of Git-like version control features for RAMS skill execution history, organized by user-facing functionality.

## Version Control Usage Scenarios by Skill Stage

本章节说明版本控制在RAMS框架不同skill阶段的作用和使用场景。

### 游戏策划阶段 (Game Design Stage)

游戏策划阶段涉及游戏机制、玩法、关卡等设计工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 回顾设计方案的演变过程 | `execution log` | 了解设计思路的发展轨迹 |
| **撤销操作** | 设计方向错误时快速回退 | `execution undo` | 避免错误设计影响后续工作 |
| **重做操作** | 恢复被撤销的设计尝试 | `execution redo` | 重新评估之前的设计方案 |
| **切换到指定版本** | 对比不同设计方案 | `execution checkout` | 快速切换到历史设计版本进行对比 |
| **创建分支** | 尝试不同的设计方向而不影响主设计 | `execution branch create` | 并行探索多个设计可能性 |
| **切换分支** | 在不同设计方向间切换 | `execution branch switch` | 灵活管理多个设计线 |
| **查看分支** | 查看所有正在进行的设计方向 | `execution branch list` | 了解整体设计探索进度 |
| **删除分支** | 清理废弃的设计方向 | `execution branch delete` | 保持设计库整洁 |
| **创建标签** | 为重要的设计里程碑打标签 | `execution tag create` | 标记关键设计版本（如v1.0设计方案） |
| **查看标签** | 查看所有设计里程碑 | `execution tag list` | 快速定位重要设计版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存当前未完成的设计状态 | `execution stash save` | 临时保存设计进度 |
| **查看暂存** | 查看所有暂存的设计状态 | `execution stash list` | 管理多个设计草稿 |
| **恢复暂存** | 恢复暂存的设计状态 | `execution stash apply` | 继续之前的设计工作 |
| **删除暂存** | 删除不需要的暂存 | `execution stash drop` | 清理设计草稿 |
| **合并分支** | 将一个设计方向合并到主设计 | `execution merge` | 将实验性设计合并到主设计 |
| **变基操作** | 将提交重新应用到另一个分支 | `execution rebase` | 保持设计历史线性整洁 |

**典型工作流：**
```
1. 创建主设计方案分支
2. 创建实验性分支尝试新玩法
3. 在实验分支上执行设计skill
4. 如果满意，合并到主分支
5. 如果不满意，撤销或切换分支
6. 为重要版本打标签（如"v1.0-战斗系统设计"）
```

### 技术设计阶段 (Technical Design Stage)

技术设计阶段涉及架构、技术方案、API设计等工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 追踪技术方案的迭代 | `execution log` | 理解技术决策的演进 |
| **撤销操作** | 技术方案有问题时回退 | `execution undo` | 快速回退有问题的技术方案 |
| **重做操作** | 重新评估技术方案 | `execution redo` | 对比不同技术方案 |
| **切换到指定版本** | 回到之前的技术方案 | `execution checkout` | 测试历史技术方案 |
| **创建分支** | 尝试不同的技术架构 | `execution branch create` | 并行测试多种技术方案 |
| **切换分支** | 在不同技术方案间切换 | `execution branch switch` | 灵活比较技术方案 |
| **查看分支** | 查看所有技术方案分支 | `execution branch list` | 了解技术探索范围 |
| **删除分支** | 清理废弃的技术方案 | `execution branch delete` | 保持技术库整洁 |
| **创建标签** | 标记技术里程碑版本 | `execution tag create` | 标记关键技术版本（如"v2.0-架构重构"） |
| **查看标签** | 查看所有技术里程碑 | `execution tag list` | 快速定位关键技术版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存未完成的技术设计 | `execution stash save` | 临时保存技术草稿 |
| **查看暂存** | 查看所有技术草稿 | `execution stash list` | 管理多个技术草稿 |
| **恢复暂存** | 恢复技术草稿 | `execution stash apply` | 继续之前的技术工作 |
| **删除暂存** | 删除不需要的技术草稿 | `execution stash drop` | 清理技术草稿 |
| **合并分支** | 将技术方案整合到主架构 | `execution merge` | 整合技术方案 |
| **变基操作** | 让技术方案基于最新架构 | `execution rebase` | 保持技术历史线性 |

**典型工作流：**
```
1. 创建技术方案分支
2. 设计并测试技术架构
3. 如果架构可行，合并到主分支
4. 如果不可行，撤销或切换到其他方案
5. 为重要技术版本打标签
```

### 美术设计阶段 (Art Design Stage)

美术设计阶段涉及角色、场景、UI等视觉设计工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 回顾美术风格的演变 | `execution log` | 了解美术风格的发展 |
| **撤销操作** | 美术方向错误时回退 | `execution undo` | 快速回退不满意的美术设计 |
| **重做操作** | 恢复被撤销的美术尝试 | `execution redo` | 重新评估美术方案 |
| **切换到指定版本** | 对比不同美术风格 | `execution checkout` | 快速切换到历史美术版本 |
| **创建分支** | 尝试不同的美术风格 | `execution branch create` | 并行探索多种美术风格 |
| **切换分支** | 在不同美术风格间切换 | `execution branch switch` | 灵活比较美术方案 |
| **查看分支** | 查看所有美术风格分支 | `execution branch list` | 了解美术探索范围 |
| **删除分支** | 清理废弃的美术风格 | `execution branch delete` | 保持美术库整洁 |
| **创建标签** | 标记美术里程碑版本 | `execution tag create` | 标记关键美术版本（如"v1.0-角色设计"） |
| **查看标签** | 查看所有美术里程碑 | `execution tag list` | 快速定位关键美术版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存未完成的美术设计 | `execution stash save` | 临时保存美术草稿 |
| **查看暂存** | 查看所有美术草稿 | `execution stash list` | 管理多个美术草稿 |
| **恢复暂存** | 恢复美术草稿 | `execution stash apply` | 继续之前的美术工作 |
| **删除暂存** | 删除不需要的美术草稿 | `execution stash drop` | 清理美术草稿 |
| **合并分支** | 将美术方案整合到主设计 | `execution merge` | 整合美术方案 |
| **变基操作** | 让美术方案基于最新设计 | `execution rebase` | 保持美术历史线性 |

**典型工作流：**
```
1. 创建美术风格分支
2. 设计角色/场景/UI
3. 如果风格合适，合并到主分支
4. 如果不合适，撤销或切换到其他风格
5. 为重要美术版本打标签
```

### 生产管理阶段 (Production Stage)

生产管理阶段涉及项目规划、进度跟踪、资源分配等工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 追踪项目进展 | `execution log` | 了解项目执行历史 |
| **撤销操作** | 项目决策错误时回退 | `execution undo` | 回退错误的项目决策 |
| **重做操作** | 恢复被撤销的项目操作 | `execution redo` | 重新评估项目决策 |
| **切换到指定版本** | 回到之前的项目状态 | `execution checkout` | 查看历史项目状态 |
| **创建分支** | 尝试不同的项目方案 | `execution branch create` | 并行测试多种项目方案 |
| **切换分支** | 在不同项目方案间切换 | `execution branch switch` | 灵活管理项目方案 |
| **查看分支** | 查看所有项目方案分支 | `execution branch list` | 了解项目方案范围 |
| **删除分支** | 清理废弃的项目方案 | `execution branch delete` | 保持项目库整洁 |
| **创建标签** | 标记项目里程碑 | `execution tag create` | 标记关键项目版本（如"v1.0-Alpha版本"） |
| **查看标签** | 查看所有项目里程碑 | `execution tag list` | 快速定位关键项目版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存未完成的项目状态 | `execution stash save` | 临时保存项目进度 |
| **查看暂存** | 查看所有项目暂存 | `execution stash list` | 管理多个项目草稿 |
| **恢复暂存** | 恢复项目暂存 | `execution stash apply` | 继续之前的项目工作 |
| **删除暂存** | 删除不需要的项目暂存 | `execution stash drop` | 清理项目草稿 |
| **合并分支** | 整合项目方案 | `execution merge` | 合并项目方案 |
| **变基操作** | 让项目基于最新状态 | `execution rebase` | 保持项目历史线性 |

**典型工作流：**
```
1. 创建项目方案分支
2. 执行项目规划和管理
3. 如果方案可行，合并到主分支
4. 如果不可行，撤销或切换到其他方案
5. 为重要项目版本打标签
```

---

## User Features (Complete List)

| User Action | Description | Filesystem | libsql | CLI Command |
|------------|-------------|-----------|--------|-------------|
| **查看执行历史** | 查看技能执行的历史记录 | ✅ | ✅ | `execution log` |
| **撤销操作** | 撤回最近的执行步骤 | ✅ | ✅ | `execution undo` |
| **重做操作** | 恢复已撤销的操作 | ✅ | ✅ | `execution redo` |
| **切换到指定版本** | 回到任意历史执行状态 | ✅ | ✅ | `execution checkout` |
| **创建分支** | 创建新的开发分支进行实验 | ✅ | ✅ | `execution branch create` |
| **切换分支** | 在不同分支间切换 | ✅ | ✅ | `execution branch switch` |
| **查看分支** | 列出所有分支 | ✅ | ✅ | `execution branch list` |
| **删除分支** | 删除不需要的分支 | ✅ | ✅ | `execution branch delete` |
| **创建标签** | 为重要版本打标签 | ✅ | ✅ | `execution tag create` |
| **查看标签** | 列出所有标签 | ✅ | ✅ | `execution tag list` |
| **删除标签** | 删除不需要的标签 | ✅ | ✅ | `execution tag delete` |
| **暂存工作** | 保存当前工作状态 | ✅ | ✅ | `execution stash save` |
| **查看暂存** | 列出所有暂存记录 | ✅ | ✅ | `execution stash list` |
| **恢复暂存** | 恢复暂存的工作状态 | ✅ | ✅ | `execution stash apply` |
| **删除暂存** | 删除不需要的暂存 | ✅ | ✅ | `execution stash drop` |
| **合并分支** | 将一个分支合并到另一个分支 | ✅ | ⚠️ | `execution merge` |
| **变基操作** | 将提交重新应用到另一个分支 | ✅ | ⚠️ | `execution rebase` |
| **添加远程仓库** | 添加远程版本库 | ✅ | ⚠️ | `execution remote add` |
| **查看远程仓库** | 列出所有远程仓库 | ✅ | ⚠️ | `execution remote list` |
| **推送到远程** | 将本地更改推送到远程 | ✅ | ⚠️ | `execution remote push` |
| **从远程拉取** | 从远程仓库拉取更改 | ✅ | ⚠️ | `execution remote pull` |

**图例:**
- ✅ 完全支持
- ⚠️ 部分支持（仅文件系统后端）
- ❌ 不支持

---

## Technical Implementation Details

### CLI Commands Support

| Command | Subcommand | Filesystem | libsql | Backend Option |
|---------|-----------|-----------|--------|----------------|
| execution | log | ✅ | ✅ | ✅ |
| execution | undo | ✅ | ✅ | ✅ |
| execution | redo | ✅ | ✅ | ✅ |
| execution | checkout | ✅ | ✅ | ✅ |
| execution | branch create | ✅ | ✅ | ✅ |
| execution | branch switch | ✅ | ✅ | ✅ |
| execution | branch list | ✅ | ✅ | ✅ |
| execution | branch delete | ✅ | ✅ | ✅ |
| execution | tag create | ✅ | ✅ | ✅ |
| execution | tag list | ✅ | ✅ | ✅ |
| execution | tag delete | ✅ | ✅ | ✅ |
| execution | stash save | ✅ | ✅ | ✅ |
| execution | stash list | ✅ | ✅ | ✅ |
| execution | stash apply | ✅ | ✅ | ✅ |
| execution | stash drop | ✅ | ✅ | ✅ |
| execution | merge | ✅ | ❌ | ❌ |
| execution | rebase | ✅ | ❌ | ❌ |
| execution | remote add | ✅ | ❌ | ❌ |
| execution | remote list | ✅ | ❌ | ❌ |
| execution | remote push | ✅ | ❌ | ❌ |
| execution | remote pull | ✅ | ❌ | ❌ |

### Manager Classes

| Manager | Filesystem Implementation | libsql Implementation | Status |
|---------|-------------------------|---------------------|--------|
| CommitManager | commit-manager.ts | commit-manager-db.ts | ✅ |
| BranchManager | branch-manager.ts | branch-manager-db.ts | ✅ |
| TagManager | tag-manager.ts | tag-manager-db.ts | ✅ |
| StashManager | stash-manager.ts | stash-manager-db.ts | ✅ |
| UndoRedoManager | undo-redo-manager.ts | undo-redo-manager-db.ts | ✅ |
| MergeManager | merge-manager.ts | - | ⚠️ |
| RebaseManager | rebase-manager.ts | - | ⚠️ |
| RemoteManager | remote-manager.ts | - | ⚠️ |
| DatabaseManager | - | database-manager.ts | ✅ |

### Database Schema (libsql)

| Table | Purpose | Status |
|-------|---------|--------|
| commits | 存储执行提交记录 | ✅ |
| output_data | 存储输出数据 | ✅ |
| branches | 存储分支引用 | ✅ |
| tags | 存储标签引用 | ✅ |
| stashes | 存储暂存条目 | ✅ |
| reflog | 存储操作历史 | ✅ |
| remotes | 存储远程仓库配置 | ✅ |
| merge_state | 存储合并状态 | ✅ |

### Test Coverage

| Component | Unit Tests | Integration Tests | Status |
|-----------|-----------|------------------|--------|
| DatabaseManager | ✅ | ❌ | ✅ |
| CommitManager (libsql) | ✅ | ❌ | ✅ |
| CommitManager (FS) | ❌ | ❌ | ⏳ |
| BranchManager (FS) | ❌ | ❌ | ⏳ |
| BranchManager (libsql) | ❌ | ❌ | ⏳ |
| TagManager (FS) | ❌ | ❌ | ⏳ |
| TagManager (libsql) | ❌ | ❌ | ⏳ |
| StashManager (FS) | ❌ | ❌ | ⏳ |
| StashManager (libsql) | ❌ | ❌ | ⏳ |
| UndoRedoManager (FS) | ❌ | ❌ | ⏳ |
| UndoRedoManager (libsql) | ❌ | ❌ | ⏳ |
| CLI Commands | ❌ | ❌ | ⏳ |

## Known Limitations

1. **合并/变基/远程仓库不支持libsql**: 这些管理器与文件系统管理器紧密耦合。要支持libsql，需要重构以接受通用接口。

2. **libsql缺少HEAD跟踪**: 当前libsql实现没有单独的HEAD表。当前提交由最新时间戳确定。可以改进以获得更好的Git行为。

3. **没有迁移脚本**: 没有从文件系统到libsql后端的自动迁移。如果切换后端，用户需要手动迁移数据。

4. **不支持远程libsql**: 虽然DatabaseManager支持远程libsql URL，但CLI命令尚未公开此选项。

## Future Enhancements

- [ ] 添加HEAD表以更好地跟踪当前提交
- [ ] 实现数据迁移脚本（文件系统 → libsql）
- [ ] 在CLI中添加远程libsql URL支持
- [ ] 重构MergeManager以支持libsql
- [ ] 重构RebaseManager以支持libsql
- [ ] 重构RemoteManager以支持libsql
- [ ] 添加全面的单元测试
- [ ] 添加集成测试
- [ ] 添加CLI命令的端到端测试
- [ ] 性能基准测试（文件系统 vs libsql）
