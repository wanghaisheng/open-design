import { DatabaseManager } from './database-manager.js';
import { CommitManager } from './commit-manager-db.js';
export declare class UndoRedoManager {
    private instanceId;
    private dbManager;
    private commitManager;
    constructor(instanceId: string, dbManager: DatabaseManager, commitManager: CommitManager);
    initialize(): Promise<void>;
    undo(steps?: number): Promise<string>;
    redo(steps?: number): Promise<string | null>;
    checkout(commitId: string): Promise<void>;
    getReflog(limit?: number): Promise<any[]>;
    private logReflog;
}
//# sourceMappingURL=undo-redo-manager-db.d.ts.map