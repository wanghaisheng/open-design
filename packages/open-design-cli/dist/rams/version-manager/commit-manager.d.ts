export interface Commit {
    commit_id: string;
    skill_name: string;
    input_hash: string;
    output_data: OutputData;
    timestamp: string;
    parent_commit: string | null;
    metadata: CommitMetadata;
}
export interface OutputData {
    type: string;
    path: string;
    content_hash: string;
    large_files?: LargeFileRef[];
}
export interface LargeFileRef {
    type: string;
    original_path: string;
    size: number;
    storage: 'local' | 's3' | 'r2';
    reference: string;
    cdn_url?: string;
}
export interface CommitMetadata {
    implementation: string;
    model?: string;
    execution_time: number;
    tokens_used?: number;
}
export declare class CommitManager {
    private instanceId;
    private basePath;
    private commitsPath;
    private objectsPath;
    constructor(instanceId: string, basePath?: string);
    initialize(): Promise<void>;
    createCommit(skillName: string, inputData: any, outputData: any, parentId?: string | null): Promise<string>;
    getCommit(commitId: string): Promise<Commit | null>;
    getCurrentCommit(): Promise<string | null>;
    setCurrentCommit(commitId: string): Promise<void>;
    getCommits(skillName?: string, limit?: number): Promise<Commit[]>;
    private generateCommitId;
    private hashInput;
    private storeOutput;
    private storeCommit;
    private collectMetadata;
}
//# sourceMappingURL=commit-manager.d.ts.map