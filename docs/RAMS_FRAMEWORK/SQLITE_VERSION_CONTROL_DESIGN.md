# libsql-Based Version Control Design

## Overview

This document describes the libsql-based implementation of the Git-like version control system for RAMS skill execution history. Unlike the file system-based approach, this implementation uses libsql (modern SQLite) as the storage backend, providing better query performance, transaction support, HTTP client support, and eliminating the dependency on Git.

## Design Goals

1. **No Git Dependency**: Pure libsql implementation without requiring Git
2. **Performance**: Indexed queries for fast commit traversal and history viewing
3. **Consistency**: ACID transactions ensure data integrity
4. **Portability**: Single SQLite database file per instance
5. **Scalability**: Can migrate to PostgreSQL/MySQL if needed
6. **Remote Support**: libsql supports HTTP client for remote database access

## Database Schema

### Table: commits

Stores commit records representing skill execution snapshots.

```sql
CREATE TABLE commits (
  commit_id TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  skill_name TEXT,
  input_hash TEXT,
  output_data_id TEXT,
  parent_commit_id TEXT,
  timestamp TEXT NOT NULL,
  metadata TEXT, -- JSON string
  FOREIGN KEY (output_data_id) REFERENCES output_data(data_id),
  FOREIGN KEY (parent_commit_id) REFERENCES commits(commit_id)
);

CREATE INDEX idx_commits_instance ON commits(instance_id);
CREATE INDEX idx_commits_parent ON commits(parent_commit_id);
CREATE INDEX idx_commits_timestamp ON commits(timestamp DESC);
CREATE INDEX idx_commits_skill ON commits(skill_name);
```

### Table: output_data

Stores output data from skill executions. Small files stored directly, large files stored as references.

```sql
CREATE TABLE output_data (
  data_id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'json', 's3_ref', 'r2_ref', 'local_ref'
  path TEXT,
  content_hash TEXT,
  content BLOB, -- For small files (<1MB)
  storage_config TEXT, -- JSON string for remote storage config
  created_at TEXT NOT NULL
);

CREATE INDEX idx_output_data_hash ON output_data(content_hash);
CREATE INDEX idx_output_data_type ON output_data(type);
```

### Table: branches

Stores branch references pointing to specific commits.

```sql
CREATE TABLE branches (
  branch_name TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  commit_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
);

CREATE INDEX idx_branches_instance ON branches(instance_id);
```

### Table: tags

Stores tag references for marking important commits.

```sql
CREATE TABLE tags (
  tag_name TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  commit_id TEXT NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
);

CREATE INDEX idx_tags_instance ON tags(instance_id);
```

### Table: stashes

Stores temporary work states.

```sql
CREATE TABLE stashes (
  stash_id TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  commit_id TEXT,
  message TEXT,
  worktree_state TEXT, -- JSON string
  created_at TEXT NOT NULL
);

CREATE INDEX idx_stashes_instance ON stashes(instance_id);
CREATE INDEX idx_stashes_created ON stashes(created_at DESC);
```

### Table: reflog

Stores reference log for undo/redo functionality.

```sql
CREATE TABLE reflog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instance_id TEXT NOT NULL,
  commit_id TEXT NOT NULL,
  action TEXT NOT NULL, -- 'commit', 'checkout', 'merge', 'rebase'
  previous_commit_id TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
);

CREATE INDEX idx_reflog_instance ON reflog(instance_id);
CREATE INDEX idx_reflog_timestamp ON reflog(timestamp DESC);
```

### Table: remotes

Stores remote repository configurations.

```sql
CREATE TABLE remotes (
  remote_name TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  type TEXT NOT NULL, -- 'git', 's3', 'r2'
  url TEXT NOT NULL,
  credentials TEXT, -- JSON string
  created_at TEXT NOT NULL
);

CREATE INDEX idx_remotes_instance ON remotes(instance_id);
```

### Table: merge_state

Stores ongoing merge operation state.

```sql
CREATE TABLE merge_state (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instance_id TEXT NOT NULL,
  source_branch TEXT NOT NULL,
  target_branch TEXT NOT NULL,
  conflicts TEXT, -- JSON string of conflicts
  created_at TEXT NOT NULL
);

CREATE INDEX idx_merge_state_instance ON merge_state(instance_id);
```

## Database Initialization

```typescript
import { createClient } from '@libsql/client';

class DatabaseManager {
  private client: any;

  constructor(dbPath: string, remoteUrl?: string, authToken?: string) {
    if (remoteUrl) {
      // Use remote libsql database
      this.client = createClient({
        url: remoteUrl,
        authToken: authToken,
      });
    } else {
      // Use local SQLite file
      this.client = createClient({
        url: `file:${dbPath}`,
      });
    }
    this.initializeSchema();
  }

  private async initializeSchema(): Promise<void> {
    // Create tables
    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS commits (
        commit_id TEXT PRIMARY KEY,
        instance_id TEXT NOT NULL,
        skill_name TEXT,
        input_hash TEXT,
        output_data_id TEXT,
        parent_commit_id TEXT,
        timestamp TEXT NOT NULL,
        metadata TEXT,
        FOREIGN KEY (output_data_id) REFERENCES output_data(data_id),
        FOREIGN KEY (parent_commit_id) REFERENCES commits(commit_id)
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_commits_instance ON commits(instance_id)
    `);
    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_commits_parent ON commits(parent_commit_id)
    `);
    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_commits_timestamp ON commits(timestamp DESC)
    `);
    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_commits_skill ON commits(skill_name)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS output_data (
        data_id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        path TEXT,
        content_hash TEXT,
        content BLOB,
        storage_config TEXT,
        created_at TEXT NOT NULL
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_output_data_hash ON output_data(content_hash)
    `);
    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_output_data_type ON output_data(type)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS branches (
        branch_name TEXT PRIMARY KEY,
        instance_id TEXT NOT NULL,
        commit_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_branches_instance ON branches(instance_id)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS tags (
        tag_name TEXT PRIMARY KEY,
        instance_id TEXT NOT NULL,
        commit_id TEXT NOT NULL,
        message TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_tags_instance ON tags(instance_id)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS stashes (
        stash_id TEXT PRIMARY KEY,
        instance_id TEXT NOT NULL,
        commit_id TEXT,
        message TEXT,
        worktree_state TEXT,
        created_at TEXT NOT NULL
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_stashes_instance ON stashes(instance_id)
    `);
    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_stashes_created ON stashes(created_at DESC)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS reflog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        instance_id TEXT NOT NULL,
        commit_id TEXT NOT NULL,
        action TEXT NOT NULL,
        previous_commit_id TEXT,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_reflog_instance ON reflog(instance_id)
    `);
    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_reflog_timestamp ON reflog(timestamp DESC)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS remotes (
        remote_name TEXT PRIMARY KEY,
        instance_id TEXT NOT NULL,
        type TEXT NOT NULL,
        url TEXT NOT NULL,
        credentials TEXT,
        created_at TEXT NOT NULL
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_remotes_instance ON remotes(instance_id)
    `);

    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS merge_state (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        instance_id TEXT NOT NULL,
        source_branch TEXT NOT NULL,
        target_branch TEXT NOT NULL,
        conflicts TEXT,
        created_at TEXT NOT NULL
      )
    `);

    await this.client.execute(`
      CREATE INDEX IF NOT EXISTS idx_merge_state_instance ON merge_state(instance_id)
    `);
  }

  getClient(): any {
    return this.client;
  }

  close(): void {
    this.client.close();
  }
}
```

## Migration from File System to SQLite

### Data Migration Strategy

1. **Export existing data**: Read all YAML files from file system
2. **Import to SQLite**: Insert data into database tables
3. **Verify integrity**: Check that all data is migrated correctly
4. **Backup file system**: Keep file system as backup
5. **Switch to SQLite**: Update code to use database

### Migration Script

```typescript
import * as fs from 'fs';
import * as path from 'path';
import YAML from 'yaml';
import { createClient } from '@libsql/client';

async function migrateFromFileSystem(
  fsPath: string,
  dbPath: string,
  instanceId: string
): Promise<void> {
  const client = createClient({ url: `file:${dbPath}` });
  const dbManager = new DatabaseManager(dbPath);

  // Migrate commits
  const commitsPath = path.join(fsPath, instanceId, '.git', 'commits');
  const commitFiles = await fs.readdir(commitsPath);

  for (const file of commitFiles) {
    if (!file.endsWith('.yaml')) continue;

    const content = await fs.readFile(path.join(commitsPath, file), 'utf-8');
    const commit = YAML.parse(content);

    await client.execute({
      sql: `
        INSERT INTO commits (
          commit_id, instance_id, skill_name, input_hash,
          output_data_id, parent_commit_id, timestamp, metadata
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        commit.commit_id,
        instanceId,
        commit.skill_name,
        commit.input_hash,
        commit.output_data?.content_hash,
        commit.parent_commit,
        commit.timestamp,
        JSON.stringify(commit.metadata)
      ]
    });
  }

  // Migrate branches
  const branchesPath = path.join(fsPath, instanceId, '.git', 'refs');
  const branchFiles = await fs.readdir(branchesPath);

  for (const file of branchFiles) {
    const commitId = await fs.readFile(path.join(branchesPath, file), 'utf-8');
    
    await client.execute({
      sql: `
        INSERT INTO branches (branch_name, instance_id, commit_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        file,
        instanceId,
        commitId,
        new Date().toISOString(),
        new Date().toISOString()
      ]
    });
  }

  client.close();
}
```

## Performance Considerations

### Indexing Strategy

- **instance_id**: All tables indexed for fast instance-specific queries
- **timestamp DESC**: Commits and reflog indexed for chronological queries
- **parent_commit_id**: Commits indexed for parent chain traversal
- **content_hash**: Output data indexed for deduplication

### Query Optimization

```typescript
// Efficient commit history query
const stmt = db.prepare(`
  SELECT * FROM commits
  WHERE instance_id = ?
  ORDER BY timestamp DESC
  LIMIT ?
`);

// Efficient parent chain traversal
const stmt = db.prepare(`
  WITH RECURSIVE commit_chain AS (
    SELECT * FROM commits WHERE commit_id = ?
    UNION ALL
    SELECT c.* FROM commits c
    JOIN commit_chain cc ON c.commit_id = cc.parent_commit_id
  )
  SELECT * FROM commit_chain
`);
```

### Transaction Management

```typescript
function createCommit(commit: Commit): void {
  const transaction = db.transaction(() => {
    // Insert output data
    db.prepare('INSERT INTO output_data ...').run();
    
    // Insert commit
    db.prepare('INSERT INTO commits ...').run();
    
    // Update reflog
    db.prepare('INSERT INTO reflog ...').run();
  });

  transaction();
}
```

## Advantages Over File System

1. **No Git Dependency**: Self-contained implementation
2. **Better Performance**: Indexed queries vs file system traversal
3. **ACID Transactions**: Data consistency guarantees
4. **Single File**: Easier backup and migration
5. **SQL Queries**: Complex queries without custom code
6. **Scalability**: Can migrate to PostgreSQL/MySQL

## Migration Path

1. **Phase 1**: Implement SQLite schema
2. **Phase 2**: Refactor CommitManager
3. **Phase 3**: Refactor BranchManager
4. **Phase 4**: Refactor TagManager
5. **Phase 5**: Refactor StashManager
6. **Phase 6**: Refactor UndoRedoManager
7. **Phase 7**: Implement migration script
8. **Phase 8**: Test and verify
9. **Phase 9**: Update documentation
10. **Phase 10**: Remove file system code
