import { DatabaseManager } from './database-manager.js';
export interface Commit {
    commit_id: string;
    skill_name: string;
    input_hash: string;
    output_data_id: string;
    timestamp: string;
    parent_commit_id: string | null;
    metadata: string;
}
export interface OutputData {
    data_id: string;
    type: string;
    path: string;
    content_hash: string;
    content: Buffer | null;
    storage_config: string;
    created_at: string;
}
export interface CommitMetadata {
    implementation: string;
    model?: string;
    execution_time: number;
    tokens_used?: number;
}
export declare class CommitManager {
    private instanceId;
    private dbManager;
    constructor(instanceId: string, dbManager: DatabaseManager);
    initialize(): Promise<void>;
    createCommit(skillName: string, inputData: any, outputData: any, parentId?: string | null): Promise<string>;
    getCommit(commitId: string): Promise<Commit | null>;
    getCurrentCommit(): Promise<string | null>;
    setCurrentCommit(_commitId: string): Promise<void>;
    getCommits(skillName?: string, limit?: number): Promise<Commit[]>;
    getOutputData(dataId: string): Promise<OutputData | null>;
    private generateCommitId;
    private hashInput;
    private storeOutput;
    private collectMetadata;
}
//# sourceMappingURL=commit-manager-db.d.ts.map