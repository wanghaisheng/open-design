import { CommitManager } from './commit-manager.js';
import { BranchManager } from './branch-manager.js';

export class RebaseManager {
  private commitManager: CommitManager;
  private branchManager: BranchManager;

  constructor(commitManager: CommitManager, branchManager: BranchManager) {
    this.commitManager = commitManager;
    this.branchManager = branchManager;
  }

  async rebase(branchName: string, ontoCommit: string): Promise<void> {
    // Get commits from the branch
    const branchCommitId = await this.branchManager.getRef(branchName);
    if (!branchCommitId) {
      throw new Error(`Branch not found: ${branchName}`);
    }

    // Get commit chain
    const commits = await this.getCommitChain(branchCommitId);

    // Rebase each commit onto the target
    for (const commit of commits) {
      const newCommitId = await this.replayCommit(commit, ontoCommit);
      ontoCommit = newCommitId;
    }

    // Update branch to point to the new tip
    await this.branchManager.updateRef(branchName, ontoCommit);
  }

  private async getCommitChain(commitId: string): Promise<any[]> {
    const commits: any[] = [];
    let currentId: string | undefined = commitId;

    while (currentId) {
      const commit = await this.commitManager.getCommit(currentId);
      if (!commit) break;

      commits.unshift(commit);
      currentId = commit.parent_commit || undefined;
    }

    return commits;
  }

  private async replayCommit(commit: any, newParent: string): Promise<string> {
    // Create a new commit with the same content but new parent
    const newCommitId = this.generateCommitId();

    const newCommit = {
      ...commit,
      commit_id: newCommitId,
      parent_commit: newParent,
      timestamp: new Date().toISOString(),
    };

    await this.commitManager.storeCommit(newCommit);
    return newCommitId;
  }

  private generateCommitId(): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex')
      .substring(0, 12);
  }

  async abortRebase(): Promise<void> {
    // Clean up rebase state
    console.log('Aborting rebase');
  }

  async continueRebase(): Promise<void> {
    // Continue after resolving conflicts
    console.log('Continuing rebase');
  }
}
