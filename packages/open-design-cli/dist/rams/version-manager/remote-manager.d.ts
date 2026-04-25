export interface RemoteConfig {
    type: 'git' | 's3' | 'r2';
    url: string;
    credentials?: {
        accessKey?: string;
        secretKey?: string;
        region?: string;
    };
}
export declare class RemoteManager {
    private gitPath;
    constructor(_instanceId: string, basePath?: string);
    addRemote(name: string, config: RemoteConfig): Promise<void>;
    private addGitRemote;
    push(remoteName: string, branchName: string): Promise<void>;
    pull(remoteName: string, branchName: string): Promise<void>;
    private pushToGit;
    private pullFromGit;
    private pushToS3;
    private pullFromS3;
    private pushToR2;
    private pullFromR2;
    listRemotes(): Promise<string[]>;
    removeRemote(name: string): Promise<void>;
    private getRemoteConfig;
    syncWithRemote(remoteName: string): Promise<void>;
    private syncGitCommits;
    private syncLargeFiles;
}
//# sourceMappingURL=remote-manager.d.ts.map