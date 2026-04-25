import { DatabaseManager } from './database-manager.js';

export interface Branch {
  name: string;
  commit_id: string;
  created_at: string;
  updated_at: string;
}

export class BranchManager {
  private instanceId: string;
  private dbManager: DatabaseManager;

  constructor(instanceId: string, dbManager: DatabaseManager) {
    this.instanceId = instanceId;
    this.dbManager = dbManager;
  }

  async initialize(): Promise<void> {
    await this.dbManager.initialize();
  }

  async createBranch(branchName: string, commitId: string): Promise<void> {
    const client = this.dbManager.getClient();
    const now = new Date().toISOString();

    await client.execute({
      sql: `
        INSERT INTO branches (branch_name, instance_id, commit_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [branchName, this.instanceId, commitId, now, now]
    });
  }

  async switchBranch(_branchName: string): Promise<void> {
    // In database model, switching branches is handled by updating the current HEAD
    // We could add a HEAD table to track the current branch
    // For now, this is a no-op
  }

  async listBranches(): Promise<Branch[]> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: `
        SELECT branch_name as name, commit_id, created_at, updated_at 
        FROM branches 
        WHERE instance_id = ?
        ORDER BY created_at DESC
      `,
      args: [this.instanceId]
    });

    return result.rows as Branch[];
  }

  async deleteBranch(branchName: string): Promise<void> {
    const client = this.dbManager.getClient();
    
    await client.execute({
      sql: 'DELETE FROM branches WHERE branch_name = ? AND instance_id = ?',
      args: [branchName, this.instanceId]
    });
  }

  async getRef(branchName: string): Promise<string | null> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: 'SELECT commit_id FROM branches WHERE branch_name = ? AND instance_id = ?',
      args: [branchName, this.instanceId]
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].commit_id as string;
  }

  async updateRef(branchName: string, commitId: string): Promise<void> {
    const client = this.dbManager.getClient();
    const now = new Date().toISOString();

    await client.execute({
      sql: `
        UPDATE branches 
        SET commit_id = ?, updated_at = ? 
        WHERE branch_name = ? AND instance_id = ?
      `,
      args: [commitId, now, branchName, this.instanceId]
    });
  }
}
