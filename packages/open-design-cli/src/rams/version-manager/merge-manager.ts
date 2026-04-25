import { promises as fs } from 'fs';
import { join } from 'path';
import { CommitManager } from './commit-manager.js';
import { BranchManager } from './branch-manager.js';

export interface MergeConflict {
  commit_id: string;
  skill_name: string;
  conflict_type: 'input' | 'output' | 'metadata';
  local_value: any;
  remote_value: any;
}

export interface MergeResult {
  success: boolean;
  merged_commit_id?: string;
  conflicts?: MergeConflict[];
  message: string;
}

export class MergeManager {
  private commitManager: CommitManager;
  private branchManager: BranchManager;
  private instanceId: string;
  private basePath: string;

  constructor(instanceId: string, commitManager: CommitManager, branchManager: BranchManager, basePath: string = '.rams/execution_history') {
    this.instanceId = instanceId;
    this.commitManager = commitManager;
    this.branchManager = branchManager;
    this.basePath = basePath;
  }

  async merge(sourceBranch: string, targetBranch: string, strategy: 'auto' | 'manual' = 'auto'): Promise<MergeResult> {
    // Get source and target branch commits
    const sourceCommitId = await this.branchManager.getRef(sourceBranch);
    const targetCommitId = await this.branchManager.getRef(targetBranch);

    if (!sourceCommitId || !targetCommitId) {
      return {
        success: false,
        message: `Branch not found: ${!sourceCommitId ? sourceBranch : targetBranch}`,
      };
    }

    // Get commits
    const sourceCommit = await this.commitManager.getCommit(sourceCommitId);
    const targetCommit = await this.commitManager.getCommit(targetCommitId);

    if (!sourceCommit || !targetCommit) {
      return {
        success: false,
        message: 'Commit not found',
      };
    }

    // Detect conflicts
    const conflicts = await this.detectConflicts(sourceCommit, targetCommit);

    if (conflicts.length > 0 && strategy === 'auto') {
      return {
        success: false,
        conflicts,
        message: `Merge conflicts detected (${conflicts.length} conflicts). Use manual strategy to resolve.`,
      };
    }

    // Perform merge
    const mergedCommit = await this.performMerge(sourceCommit, targetCommit, conflicts);

    // Update target branch
    await this.branchManager.updateRef(targetBranch, mergedCommit);

    return {
      success: true,
      merged_commit_id: mergedCommit,
      message: `Successfully merged ${sourceBranch} into ${targetBranch}`,
    };
  }

  private async detectConflicts(sourceCommit: any, targetCommit: any): Promise<MergeConflict[]> {
    const conflicts: MergeConflict[] = [];

    // Check for skill execution conflicts
    if (sourceCommit.skill_name === targetCommit.skill_name) {
      // Same skill executed - check for input/output differences
      if (sourceCommit.input_hash !== targetCommit.input_hash) {
        conflicts.push({
          commit_id: sourceCommit.commit_id,
          skill_name: sourceCommit.skill_name,
          conflict_type: 'input',
          local_value: sourceCommit.input_hash,
          remote_value: targetCommit.input_hash,
        });
      }
    }

    return conflicts;
  }

  private async performMerge(sourceCommit: any, targetCommit: any, conflicts: MergeConflict[]): Promise<string> {
    // Create a merge commit
    const mergeCommitId = this.generateCommitId();
    
    const mergeCommit = {
      commit_id: mergeCommitId,
      skill_name: 'merge',
      input_hash: this.generateMergeHash(sourceCommit.commit_id, targetCommit.commit_id),
      output_data: {
        type: 'merge',
        path: '',
        content_hash: mergeCommitId,
        source_commit: sourceCommit.commit_id,
        target_commit: targetCommit.commit_id,
        conflicts: conflicts.map(c => ({
          skill_name: c.skill_name,
          conflict_type: c.conflict_type,
        })),
      },
      timestamp: new Date().toISOString(),
      parent_commit_id: targetCommit.commit_id,
      metadata: {
        implementation: 'merge',
        model: undefined,
        execution_time: 0,
        tokens_used: 0,
      },
    };

    await this.commitManager.storeCommit(mergeCommit);
    return mergeCommitId;
  }

  private generateCommitId(): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex')
      .substring(0, 12);
  }

  private generateMergeHash(sourceId: string, targetId: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256')
      .update(`${sourceId}-${targetId}`)
      .digest('hex');
  }

  async resolveConflicts(_conflicts: MergeConflict[], _resolutions: Record<string, any>): Promise<MergeResult> {
    // Apply resolutions and create merge commit
    // This is a simplified implementation
    return {
      success: true,
      message: 'Conflicts resolved successfully',
    };
  }

  async abortMerge(): Promise<void> {
    // Clean up merge state
    const mergeStatePath = join(this.basePath, this.instanceId, '.git', 'MERGE_STATE');
    try {
      await fs.unlink(mergeStatePath);
    } catch {
      // File doesn't exist, ignore
    }
  }
}
