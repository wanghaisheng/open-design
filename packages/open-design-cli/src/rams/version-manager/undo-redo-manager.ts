import { promises as fs } from 'fs';
import { join } from 'path';
import { CommitManager } from './commit-manager.js';

export class UndoRedoManager {
  private commitManager: CommitManager;
  private reflogPath: string;

  constructor(_instanceId: string, commitManager: CommitManager, basePath: string = '.rams/execution_history') {
    this.commitManager = commitManager;
    this.reflogPath = join(basePath, _instanceId, '.git', 'logs', 'reflog');
  }

  async initialize(): Promise<void> {
    await fs.mkdir(join(this.reflogPath, '..'), { recursive: true });
  }

  async undo(steps: number = 1): Promise<string | null> {
    const currentCommit = await this.commitManager.getCurrentCommit();
    if (!currentCommit) {
      throw new Error('No current commit to undo from');
    }

    let targetCommit: string | null = currentCommit;
    for (let i = 0; i < steps; i++) {
      const commit = await this.commitManager.getCommit(targetCommit);
      if (!commit || !commit.parent_commit_id) {
        return null;
      }
      targetCommit = commit.parent_commit_id;
    }

    if (!targetCommit) {
      return null;
    }

    await this.commitManager.setCurrentCommit(targetCommit);
    await this.logReflog('undo', currentCommit, targetCommit);
    
    return targetCommit;
  }

  async redo(steps: number = 1): Promise<string | null> {
    const reflog = await this.getReflog();
    const forwardCommits = this.getForwardCommits(reflog);

    if (forwardCommits.length < steps) {
      throw new Error(`Cannot redo ${steps} steps: only ${forwardCommits.length} available`);
    }

    const targetCommit = forwardCommits[steps - 1];
    await this.commitManager.setCurrentCommit(targetCommit);
    await this.logReflog('redo', await this.commitManager.getCurrentCommit(), targetCommit);
    
    return targetCommit;
  }

  async checkout(commitId: string): Promise<void> {
    const commit = await this.commitManager.getCommit(commitId);
    if (!commit) {
      throw new Error(`Commit ${commitId} not found`);
    }

    const currentCommit = await this.commitManager.getCurrentCommit();
    await this.commitManager.setCurrentCommit(commitId);
    await this.logReflog('checkout', currentCommit, commitId);
  }

  private async logReflog(action: string, from: string | null, to: string): Promise<void> {
    const entry = {
      action,
      from,
      to,
      timestamp: new Date().toISOString(),
    };

    const logEntry = JSON.stringify(entry) + '\n';
    await fs.appendFile(this.reflogPath, logEntry, 'utf-8');
  }

  private async getReflog(): Promise<any[]> {
    try {
      const content = await fs.readFile(this.reflogPath, 'utf-8');
      return content
        .trim()
        .split('\n')
        .map(line => JSON.parse(line));
    } catch {
      return [];
    }
  }

  private getForwardCommits(reflog: any[]): string[] {
    const forwardCommits: string[] = [];
    const reversedLog = [...reflog].reverse();

    for (const entry of reversedLog) {
      if (entry.action === 'undo') {
        forwardCommits.push(entry.from);
      } else if (entry.action === 'redo') {
        forwardCommits.pop();
      }
    }

    return forwardCommits;
  }
}
