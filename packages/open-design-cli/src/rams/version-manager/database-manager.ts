import { createClient } from '@libsql/client';

export class DatabaseManager {
  private client: any;
  private dbPath: string;
  private remoteUrl?: string;

  constructor(dbPath: string, remoteUrl?: string, authToken?: string) {
    this.dbPath = dbPath;
    this.remoteUrl = remoteUrl;

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
  }

  async initialize(): Promise<void> {
    await this.initializeSchema();
  }

  private async initializeSchema(): Promise<void> {
    // Create commits table
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

    // Create output_data table
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

    // Create branches table
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

    // Create tags table
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

    // Create stashes table
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

    // Create reflog table
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

    // Create remotes table
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

    // Create merge_state table
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

  getDbPath(): string {
    return this.dbPath;
  }

  isRemote(): boolean {
    return !!this.remoteUrl;
  }
}
