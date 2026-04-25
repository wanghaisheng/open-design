import { CommitManager } from './commit-manager.js';
export declare class UndoRedoManager {
    private commitManager;
    private reflogPath;
    constructor(_instanceId: string, commitManager: CommitManager, basePath?: string);
    initialize(): Promise<void>;
    undo(steps?: number): Promise<string>;
    redo(steps?: number): Promise<string | null>;
    checkout(commitId: string): Promise<void>;
    private logReflog;
    private getReflog;
    private getForwardCommits;
}
//# sourceMappingURL=undo-redo-manager.d.ts.map