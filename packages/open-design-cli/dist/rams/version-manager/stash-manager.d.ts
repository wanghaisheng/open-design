export interface Stash {
    id: string;
    commit_id: string;
    message: string;
    created_at: string;
    worktree_state: any;
}
export declare class StashManager {
    private instanceId;
    private basePath;
    private stashPath;
    constructor(instanceId: string, basePath?: string);
    initialize(): Promise<void>;
    create(commitId: string, message?: string): Promise<string>;
    list(): Promise<Stash[]>;
    apply(stashId: string): Promise<void>;
    drop(stashId: string): Promise<void>;
    pop(stashId: string): Promise<void>;
    private getStash;
    private generateStashId;
    private captureWorktreeState;
    private restoreWorktreeState;
}
//# sourceMappingURL=stash-manager.d.ts.map