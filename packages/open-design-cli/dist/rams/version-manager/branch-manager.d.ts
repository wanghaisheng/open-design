export interface Branch {
    name: string;
    commit_id: string;
    created_at: string;
}
export declare class BranchManager {
    private instanceId;
    private basePath;
    private refsPath;
    private worktreesPath;
    constructor(instanceId: string, basePath?: string);
    initialize(): Promise<void>;
    createBranch(branchName: string, fromCommit: string): Promise<void>;
    switchBranch(branchName: string): Promise<void>;
    listBranches(): Promise<Branch[]>;
    deleteBranch(branchName: string): Promise<void>;
    private getRef;
    private updateHead;
    private createWorktree;
    private restoreWorktree;
    private getBranchCreatedTime;
}
//# sourceMappingURL=branch-manager.d.ts.map