import { promises as fs } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

export interface Stash {
  id: string;
  commit_id: string;
  message: string;
  created_at: string;
  worktree_state: any;
}

export class StashManager {
  private instanceId: string;
  private basePath: string;
  private stashPath: string;

  constructor(instanceId: string, basePath: string = '.rams/execution_history') {
    this.instanceId = instanceId;
    this.basePath = basePath;
    this.stashPath = join(basePath, instanceId, '.git', 'stash');
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.stashPath, { recursive: true });
  }

  async create(commitId: string, message: string = 'WIP'): Promise<string> {
    const stashId = this.generateStashId();
    
    // Capture current worktree state
    const worktreeState = await this.captureWorktreeState();

    const stash: Stash = {
      id: stashId,
      commit_id: commitId,
      message,
      created_at: new Date().toISOString(),
      worktree_state: worktreeState,
    };

    const stashFilePath = join(this.stashPath, `${stashId}.yaml`);
    await fs.writeFile(stashFilePath, YAML.stringify(stash), 'utf-8');

    return stashId;
  }

  async list(): Promise<Stash[]> {
    const files = await fs.readdir(this.stashPath);
    const stashes: Stash[] = [];

    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;
      const stash = await this.getStash(file.replace('.yaml', ''));
      if (stash) {
        stashes.push(stash);
      }
    }

    stashes.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return stashes;
  }

  async apply(stashId: string): Promise<void> {
    const stash = await this.getStash(stashId);
    if (!stash) {
      throw new Error(`Stash not found: ${stashId}`);
    }

    // Restore worktree state
    await this.restoreWorktreeState(stash.worktree_state);
  }

  async drop(stashId: string): Promise<void> {
    const stashFilePath = join(this.stashPath, `${stashId}.yaml`);
    await fs.unlink(stashFilePath);
  }

  async pop(stashId: string): Promise<void> {
    await this.apply(stashId);
    await this.drop(stashId);
  }

  private async getStash(stashId: string): Promise<Stash | null> {
    const stashFilePath = join(this.stashPath, `${stashId}.yaml`);
    try {
      const content = await fs.readFile(stashFilePath, 'utf-8');
      return YAML.parse(content) as Stash;
    } catch {
      return null;
    }
  }

  private generateStashId(): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex')
      .substring(0, 12);
  }

  private async captureWorktreeState(): Promise<any> {
    // Capture current worktree state
    // This is a simplified implementation
    const worktreePath = join(this.basePath, this.instanceId, 'worktrees');
    try {
      const files = await fs.readdir(worktreePath);
      return { files };
    } catch {
      return { files: [] };
    }
  }

  private async restoreWorktreeState(state: any): Promise<void> {
    // Restore worktree state
    // This is a simplified implementation
    console.log('Restoring worktree state:', state);
  }
}
