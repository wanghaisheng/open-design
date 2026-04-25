import { CommitManager } from './commit-manager.js';
import { BranchManager } from './branch-manager.js';
export declare class RebaseManager {
    private commitManager;
    private branchManager;
    constructor(commitManager: CommitManager, branchManager: BranchManager);
    rebase(branchName: string, ontoCommit: string): Promise<void>;
    private getCommitChain;
    private replayCommit;
    private generateCommitId;
    abortRebase(): Promise<void>;
    continueRebase(): Promise<void>;
}
//# sourceMappingURL=rebase-manager.d.ts.map