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
export declare class MergeManager {
    private commitManager;
    private branchManager;
    private instanceId;
    private basePath;
    constructor(instanceId: string, commitManager: CommitManager, branchManager: BranchManager, basePath?: string);
    merge(sourceBranch: string, targetBranch: string, strategy?: 'auto' | 'manual'): Promise<MergeResult>;
    private detectConflicts;
    private performMerge;
    private generateCommitId;
    private generateMergeHash;
    resolveConflicts(_conflicts: MergeConflict[], _resolutions: Record<string, any>): Promise<MergeResult>;
    abortMerge(): Promise<void>;
}
//# sourceMappingURL=merge-manager.d.ts.map