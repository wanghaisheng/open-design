# Version Control Feature Matrix

This document tracks the implementation status of Git-like version control features for RAMS skill execution history, organized by user-facing functionality.

## User Features

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
