import { DatabaseManager } from './database-manager.js';
export interface Branch {
    name: string;
    commit_id: string;
    created_at: string;
    updated_at: string;
}
export declare class BranchManager {
    private instanceId;
    private dbManager;
    constructor(instanceId: string, dbManager: DatabaseManager);
    initialize(): Promise<void>;
    createBranch(branchName: string, commitId: string): Promise<void>;
    switchBranch(_branchName: string): Promise<void>;
    listBranches(): Promise<Branch[]>;
    deleteBranch(branchName: string): Promise<void>;
    getRef(branchName: string): Promise<string | null>;
    updateRef(branchName: string, commitId: string): Promise<void>;
}
//# sourceMappingURL=branch-manager-db.d.ts.map