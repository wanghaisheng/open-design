export declare class DatabaseManager {
    private client;
    private dbPath;
    private remoteUrl?;
    constructor(dbPath: string, remoteUrl?: string, authToken?: string);
    initialize(): Promise<void>;
    private initializeSchema;
    getClient(): any;
    close(): void;
    getDbPath(): string;
    isRemote(): boolean;
}
//# sourceMappingURL=database-manager.d.ts.map