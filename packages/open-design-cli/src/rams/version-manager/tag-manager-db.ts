import { DatabaseManager } from './database-manager.js';

export interface Tag {
  name: string;
  commit_id: string;
  message: string;
  created_at: string;
}

export class TagManager {
  private instanceId: string;
  private dbManager: DatabaseManager;

  constructor(instanceId: string, dbManager: DatabaseManager) {
    this.instanceId = instanceId;
    this.dbManager = dbManager;
  }

  async initialize(): Promise<void> {
    await this.dbManager.initialize();
  }

  async createTag(name: string, commitId: string, message: string = ''): Promise<void> {
    const client = this.dbManager.getClient();
    
    await client.execute({
      sql: `
        INSERT INTO tags (tag_name, instance_id, commit_id, message, created_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [name, this.instanceId, commitId, message, new Date().toISOString()]
    });
  }

  async getTag(name: string): Promise<Tag | null> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: `
        SELECT tag_name as name, commit_id, message, created_at 
        FROM tags 
        WHERE tag_name = ? AND instance_id = ?
      `,
      args: [name, this.instanceId]
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as Tag;
  }

  async listTags(): Promise<Tag[]> {
    const client = this.dbManager.getClient();
    
    const result = await client.execute({
      sql: `
        SELECT tag_name as name, commit_id, message, created_at 
        FROM tags 
        WHERE instance_id = ?
        ORDER BY created_at DESC
      `,
      args: [this.instanceId]
    });

    return result.rows as Tag[];
  }

  async deleteTag(name: string): Promise<void> {
    const client = this.dbManager.getClient();
    
    await client.execute({
      sql: 'DELETE FROM tags WHERE tag_name = ? AND instance_id = ?',
      args: [name, this.instanceId]
    });
  }

  async checkoutTag(name: string): Promise<string> {
    const tag = await this.getTag(name);
    if (!tag) {
      throw new Error(`Tag not found: ${name}`);
    }

    // Update HEAD to point to the tag's commit
    // In database model, we could add a HEAD table
    // For now, return the commit ID
    return tag.commit_id;
  }
}
