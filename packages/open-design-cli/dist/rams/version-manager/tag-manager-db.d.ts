import { DatabaseManager } from './database-manager.js';
export interface Tag {
    name: string;
    commit_id: string;
    message: string;
    created_at: string;
}
export declare class TagManager {
    private instanceId;
    private dbManager;
    constructor(instanceId: string, dbManager: DatabaseManager);
    initialize(): Promise<void>;
    createTag(name: string, commitId: string, message?: string): Promise<void>;
    getTag(name: string): Promise<Tag | null>;
    listTags(): Promise<Tag[]>;
    deleteTag(name: string): Promise<void>;
    checkoutTag(name: string): Promise<string>;
}
//# sourceMappingURL=tag-manager-db.d.ts.map