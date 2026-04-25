import { promises as fs } from 'fs';
import { join } from 'path';

export interface Branch {
  name: string;
  commit_id: string;
  created_at: string;
}

export class BranchManager {
  private instanceId: string;
  private basePath: string;
  private refsPath: string;
  private worktreesPath: string;

  constructor(instanceId: string, basePath: string = '.rams/execution_history') {
    this.instanceId = instanceId;
    this.basePath = basePath;
    this.refsPath = join(basePath, instanceId, '.git', 'refs', 'heads');
    this.worktreesPath = join(basePath, instanceId, 'worktrees');
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.refsPath, { recursive: true });
    await fs.mkdir(this.worktreesPath, { recursive: true });
  }

  async createBranch(branchName: string, fromCommit: string): Promise<void> {
    const branchPath = join(this.refsPath, branchName);
    await fs.writeFile(branchPath, fromCommit, 'utf-8');
    
    await this.createWorktree(branchName, fromCommit);
  }

  async switchBranch(branchName: string): Promise<void> {
    const commitId = await this.getRef(branchName);
    if (!commitId) {
      throw new Error(`Branch ${branchName} not found`);
    }
    
    await this.updateHead(commitId);
    await this.restoreWorktree(branchName, commitId);
  }

  async listBranches(): Promise<Branch[]> {
    const files = await fs.readdir(this.refsPath);
    const branches: Branch[] = [];

    for (const file of files) {
      const commitId = await this.getRef(file);
      if (commitId) {
        branches.push({
          name: file,
          commit_id: commitId,
          created_at: await this.getBranchCreatedTime(file),
        });
      }
    }

    return branches;
  }

  async deleteBranch(branchName: string): Promise<void> {
    const branchPath = join(this.refsPath, branchName);
    await fs.unlink(branchPath);
    
    const worktreePath = join(this.worktreesPath, branchName);
    await fs.rm(worktreePath, { recursive: true, force: true });
  }

  async getRef(branchName: string): Promise<string | null> {
    const branchPath = join(this.refsPath, branchName);
    try {
      return await fs.readFile(branchPath, 'utf-8');
    } catch {
      return null;
    }
  }

  async updateRef(branchName: string, commitId: string): Promise<void> {
    const branchPath = join(this.refsPath, branchName);
    await fs.writeFile(branchPath, commitId, 'utf-8');
  }

  private async updateHead(commitId: string): Promise<void> {
    const headPath = join(this.basePath, this.instanceId, '.git', 'HEAD');
    await fs.mkdir(join(headPath, '..'), { recursive: true });
    await fs.writeFile(headPath, commitId, 'utf-8');
  }

  private async createWorktree(branchName: string, commitId: string): Promise<void> {
    const worktreePath = join(this.worktreesPath, branchName);
    await fs.mkdir(worktreePath, { recursive: true });
    
    const currentStatePath = join(worktreePath, 'current_state');
    await fs.mkdir(currentStatePath, { recursive: true });
    
    const skillOutputsPath = join(currentStatePath, 'skill_outputs');
    await fs.mkdir(skillOutputsPath, { recursive: true });
    
    // Store commit ID in worktree metadata for future reference
    const metadataPath = join(worktreePath, '.metadata');
    await fs.writeFile(metadataPath, JSON.stringify({ commit_id: commitId }), 'utf-8');
  }

  private async restoreWorktree(_branchName: string, _commitId: string): Promise<void> {
    // TODO: Implementation would restore the state from the commit
    // This is a placeholder for the actual restoration logic
    // Need to load commit data and restore skill outputs
  }

  private async getBranchCreatedTime(branchName: string): Promise<string> {
    const branchPath = join(this.refsPath, branchName);
    const stats = await fs.stat(branchPath);
    return stats.mtime.toISOString();
  }
}
