# Version Control Feature Matrix

This document tracks the implementation status of Git-like version control features for RAMS skill execution history.

## Backend Support

| Feature | Filesystem | libsql | Notes |
|---------|-----------|--------|-------|
| Commit Storage | ✅ | ✅ | YAML files vs SQLite database |
| Branch Management | ✅ | ✅ | Full CRUD operations |
| Tag Management | ✅ | ✅ | Create, list, delete |
| Stash Management | ✅ | ✅ | Save, list, apply, drop |
| Undo/Redo | ✅ | ✅ | With reflog support |
| Merge | ✅ | ⚠️ | Filesystem only (interface dependency) |
| Rebase | ✅ | ⚠️ | Filesystem only (interface dependency) |
| Remote | ✅ | ⚠️ | Filesystem only (interface dependency) |

## CLI Commands

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

## Manager Classes

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

## Database Schema (libsql)

| Table | Purpose | Status |
|-------|---------|--------|
| commits | Store commit records | ✅ |
| output_data | Store output data blobs | ✅ |
| branches | Store branch references | ✅ |
| tags | Store tag references | ✅ |
| stashes | Store stash entries | ✅ |
| reflog | Store operation history | ✅ |
| remotes | Store remote configurations | ✅ |
| merge_state | Store merge state | ✅ |

## Test Coverage

| Component | Unit Tests | Integration Tests | Status |
|-----------|-----------|------------------|--------|
| CommitManager (FS) | ❌ | ❌ | ⏳ |
| CommitManager (libsql) | ❌ | ❌ | ⏳ |
| BranchManager (FS) | ❌ | ❌ | ⏳ |
| BranchManager (libsql) | ❌ | ❌ | ⏳ |
| TagManager (FS) | ❌ | ❌ | ⏳ |
| TagManager (libsql) | ❌ | ❌ | ⏳ |
| StashManager (FS) | ❌ | ❌ | ⏳ |
| StashManager (libsql) | ❌ | ❌ | ⏳ |
| UndoRedoManager (FS) | ❌ | ❌ | ⏳ |
| UndoRedoManager (libsql) | ❌ | ❌ | ⏳ |
| DatabaseManager | ❌ | ❌ | ⏳ |
| CLI Commands | ❌ | ❌ | ⏳ |

## Known Limitations

1. **Merge/Rebase/Remote with libsql**: These managers have tight coupling to the filesystem-based managers through their constructor interfaces. To support libsql, they would need refactoring to accept a common interface.

2. **No HEAD tracking in libsql**: The current libsql implementation doesn't have a separate HEAD table. Current commit is determined by the latest timestamp. This could be improved for better Git-like behavior.

3. **No migration script**: There's no automated migration from filesystem to libsql backend. Users would need to manually migrate data if switching backends.

4. **No remote libsql support**: While DatabaseManager supports remote libsql URLs, the CLI commands don't expose this option yet.

## Future Enhancements

- [ ] Add HEAD table for better current commit tracking
- [ ] Implement data migration script (FS → libsql)
- [ ] Add remote libsql URL support in CLI
- [ ] Refactor MergeManager to support libsql
- [ ] Refactor RebaseManager to support libsql
- [ ] Refactor RemoteManager to support libsql
- [ ] Add comprehensive unit tests
- [ ] Add integration tests
- [ ] Add E2E tests for CLI commands
- [ ] Performance benchmarks (FS vs libsql)
