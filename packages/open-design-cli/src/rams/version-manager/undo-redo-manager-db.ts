import { DatabaseManager } from './database-manager.js';
import { CommitManager } from './commit-manager-db.js';

export class UndoRedoManager {
  private instanceId: string;
  private dbManager: DatabaseManager;
  private commitManager: CommitManager;

  constructor(instanceId: string, dbManager: DatabaseManager, commitManager: CommitManager) {
    this.instanceId = instanceId;
    this.dbManager = dbManager;
    this.commitManager = commitManager;
  }

  async initialize(): Promise<void> {
    await this.dbManager.initialize();
  }

  async undo(steps: number = 1): Promise<string> {
    const client = this.dbManager.getClient();
    
    // Get reflog entries
    const result = await client.execute({
      sql: `
        SELECT commit_id, previous_commit_id 
        FROM reflog 
        WHERE instance_id = ? 
        ORDER BY timestamp DESC 
        LIMIT ?
      `,
      args: [this.instanceId, steps + 1]
    });

    if (result.rows.length <= steps) {
      throw new Error('Cannot undo: no more history');
    }

    const targetCommit = result.rows[steps].commit_id as string;
    
    // Update HEAD (in database model, we could add a HEAD table)
    // For now, just log the action
    await this.logReflog('undo', targetCommit, result.rows[0].commit_id as string);

    return targetCommit;
  }

  async redo(steps: number = 1): Promise<string | null> {
    const client = this.dbManager.getClient();
    
    // Get reflog entries for redo
    const result = await client.execute({
      sql: `
        SELECT commit_id, previous_commit_id 
        FROM reflog 
        WHERE instance_id = ? AND action = 'undo'
        ORDER BY timestamp DESC 
        LIMIT ?
      `,
      args: [this.instanceId, steps]
    });

    if (result.rows.length === 0) {
      return null;
    }

    const targetCommit = result.rows[0].previous_commit_id as string;
    
    // Log the redo action
    await this.logReflog('redo', targetCommit, result.rows[0].commit_id as string);

    return targetCommit;
  }

  async checkout(commitId: string): Promise<void> {
    // Verify commit exists
    const commit = await this.commitManager.getCommit(commitId);
    if (!commit) {
      throw new Error(`Commit not found: ${commitId}`);
    }

    // Log the checkout action
    await this.logReflog('checkout', commitId, await this.commitManager.getCurrentCommit());
  }

  async getReflog(limit: number = 10): Promise<any[]> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: `
        SELECT * FROM reflog 
        WHERE instance_id = ? 
        ORDER BY timestamp DESC 
        LIMIT ?
      `,
      args: [this.instanceId, limit]
    });

    return result.rows;
  }

  private async logReflog(action: string, commitId: string, previousCommitId: string | null): Promise<void> {
    const client = this.dbManager.getClient();
    
    await client.execute({
      sql: `
        INSERT INTO reflog (instance_id, commit_id, action, previous_commit_id, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        this.instanceId,
        commitId,
        action,
        previousCommitId,
        new Date().toISOString()
      ]
    });
  }
}
