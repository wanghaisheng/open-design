import { createHash } from 'crypto';
import { DatabaseManager } from './database-manager.js';

export interface Commit {
  commit_id: string;
  skill_name: string;
  input_hash: string;
  output_data_id: string;
  timestamp: string;
  parent_commit: string | null;
  metadata: string;
}

export interface OutputData {
  data_id: string;
  type: string;
  path: string;
  content_hash: string;
  content: Buffer | null;
  storage_config: string;
  created_at: string;
}

export interface CommitMetadata {
  implementation: string;
  model?: string;
  execution_time: number;
  tokens_used?: number;
}

export class CommitManager {
  private instanceId: string;
  private dbManager: DatabaseManager;

  constructor(instanceId: string, dbManager: DatabaseManager) {
    this.instanceId = instanceId;
    this.dbManager = dbManager;
  }

  async initialize(): Promise<void> {
    await this.dbManager.initialize();
  }

  async createCommit(
    skillName: string,
    inputData: any,
    outputData: any,
    parentId: string | null = null
  ): Promise<string> {
    const client = this.dbManager.getClient();
    const commitId = this.generateCommitId();
    const inputHash = this.hashInput(inputData);
    const storedOutput = await this.storeOutput(outputData);
    const metadata = this.collectMetadata();

    await client.execute({
      sql: `
        INSERT INTO commits (
          commit_id, instance_id, skill_name, input_hash,
          output_data_id, parent_commit, timestamp, metadata
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        commitId,
        this.instanceId,
        skillName,
        inputHash,
        storedOutput,
        parentId,
        new Date().toISOString(),
        JSON.stringify(metadata)
      ]
    });

    return commitId;
  }

  async getCommit(commitId: string): Promise<Commit | null> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: 'SELECT * FROM commits WHERE commit_id = ?',
      args: [commitId]
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as Commit;
  }

  async getCurrentCommit(): Promise<string | null> {
    const client = this.dbManager.getClient();
    
    // Get the latest commit for this instance
    const result = await client.execute({
      sql: `
        SELECT commit_id FROM commits 
        WHERE instance_id = ? 
        ORDER BY timestamp DESC 
        LIMIT 1
      `,
      args: [this.instanceId]
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].commit_id as string;
  }

  async setCurrentCommit(_commitId: string): Promise<void> {
    // In database model, current commit is determined by latest timestamp
    // This is a no-op in the database model
    // We could add a separate HEAD table if needed
  }

  async getCommits(skillName?: string, limit: number = 10): Promise<Commit[]> {
    const client = this.dbManager.getClient();
    
    let sql = `
      SELECT * FROM commits 
      WHERE instance_id = ?
    `;
    const args: any[] = [this.instanceId];

    if (skillName) {
      sql += ' AND skill_name = ?';
      args.push(skillName);
    }

    sql += ' ORDER BY timestamp DESC LIMIT ?';
    args.push(limit);

    const result = await client.execute({
      sql,
      args
    });

    return result.rows as Commit[];
  }

  async getOutputData(dataId: string): Promise<OutputData | null> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: 'SELECT * FROM output_data WHERE data_id = ?',
      args: [dataId]
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as OutputData;
  }

  private generateCommitId(): string {
    return createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex')
      .substring(0, 12);
  }

  private hashInput(inputData: any): string {
    return createHash('sha256')
      .update(JSON.stringify(inputData))
      .digest('hex');
  }

  private async storeOutput(outputData: any): Promise<string> {
    const client = this.dbManager.getClient();
    const contentHash = this.hashInput(outputData);
    const dataId = contentHash;

    // Check if output data already exists
    const existing = await client.execute({
      sql: 'SELECT data_id FROM output_data WHERE content_hash = ?',
      args: [contentHash]
    });

    if (existing.rows.length > 0) {
      return existing.rows[0].data_id as string;
    }

    // Store new output data
    const outputStr = JSON.stringify(outputData);
    const content = Buffer.from(outputStr);

    await client.execute({
      sql: `
        INSERT INTO output_data (
          data_id, type, path, content_hash, content, storage_config, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        dataId,
        'json',
        '',
        contentHash,
        content,
        JSON.stringify({}),
        new Date().toISOString()
      ]
    });

    return dataId;
  }

  private collectMetadata(): CommitMetadata {
    return {
      implementation: 'ai-model',
      execution_time: 0,
    };
  }
}
