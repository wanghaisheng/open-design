import { createHash } from 'crypto';
import { DatabaseManager } from './database-manager.js';

export interface Stash {
  id: string;
  commit_id: string;
  message: string;
  created_at: string;
  worktree_state: string;
}

export class StashManager {
  private instanceId: string;
  private dbManager: DatabaseManager;

  constructor(instanceId: string, dbManager: DatabaseManager) {
    this.instanceId = instanceId;
    this.dbManager = dbManager;
  }

  async initialize(): Promise<void> {
    await this.dbManager.initialize();
  }

  async create(commitId: string, message: string = 'WIP'): Promise<string> {
    const client = this.dbManager.getClient();
    const stashId = this.generateStashId();
    
    // Capture current worktree state
    const worktreeState = await this.captureWorktreeState();

    await client.execute({
      sql: `
        INSERT INTO stashes (stash_id, instance_id, commit_id, message, worktree_state, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      args: [
        stashId,
        this.instanceId,
        commitId,
        message,
        JSON.stringify(worktreeState),
        new Date().toISOString()
      ]
    });

    return stashId;
  }

  async list(): Promise<Stash[]> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: `
        SELECT stash_id as id, commit_id, message, created_at, worktree_state 
        FROM stashes 
        WHERE instance_id = ?
        ORDER BY created_at DESC
      `,
      args: [this.instanceId]
    });

    return result.rows as Stash[];
  }

  async apply(stashId: string): Promise<void> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: `
        SELECT worktree_state FROM stashes 
        WHERE stash_id = ? AND instance_id = ?
      `,
      args: [stashId, this.instanceId]
    });

    if (result.rows.length === 0) {
      throw new Error(`Stash not found: ${stashId}`);
    }

    const worktreeState = JSON.parse(result.rows[0].worktree_state as string);
    
    // Restore worktree state
    await this.restoreWorktreeState(worktreeState);
  }

  async drop(stashId: string): Promise<void> {
    const client = this.dbManager.getClient();
    
    await client.execute({
      sql: 'DELETE FROM stashes WHERE stash_id = ? AND instance_id = ?',
      args: [stashId, this.instanceId]
    });
  }

  async pop(stashId: string): Promise<void> {
    await this.apply(stashId);
    await this.drop(stashId);
  }

  private generateStashId(): string {
    return createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex')
      .substring(0, 12);
  }

  private async captureWorktreeState(): Promise<any> {
    // Capture current worktree state
    // This is a simplified implementation
    return { files: [], timestamp: new Date().toISOString() };
  }

  private async restoreWorktreeState(state: any): Promise<void> {
    // Restore worktree state
    // This is a simplified implementation
    console.log('Restoring worktree state:', state);
  }
}
