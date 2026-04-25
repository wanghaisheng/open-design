import { DatabaseManager } from './database-manager.js';
export interface Stash {
    id: string;
    commit_id: string;
    message: string;
    created_at: string;
    worktree_state: string;
}
export declare class StashManager {
    private instanceId;
    private dbManager;
    constructor(instanceId: string, dbManager: DatabaseManager);
    initialize(): Promise<void>;
    create(commitId: string, message?: string): Promise<string>;
    list(): Promise<Stash[]>;
    apply(stashId: string): Promise<void>;
    drop(stashId: string): Promise<void>;
    pop(stashId: string): Promise<void>;
    private generateStashId;
    private captureWorktreeState;
    private restoreWorktreeState;
}
//# sourceMappingURL=stash-manager-db.d.ts.map