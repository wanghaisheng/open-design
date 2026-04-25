export interface MemoryEntry {
    id: string;
    type: 'context' | 'skill' | 'role' | 'workflow' | 'learning';
    timestamp: number;
    content: any;
    metadata?: any;
}
export interface MemoryConfig {
    enabled: boolean;
    path: string;
    compression: {
        enabled: boolean;
        retention_days: number;
    };
}
export declare class MemoryManager {
    private projectRoot;
    private config;
    constructor(projectRoot?: string);
    /**
     * Get memory configuration
     */
    getConfig(): Promise<MemoryConfig>;
    /**
     * Check if memory is enabled
     */
    isEnabled(): Promise<boolean>;
    /**
     * Get memory directory path
     */
    getMemoryPath(): Promise<string>;
    /**
     * Ensure memory directory exists
     */
    ensureMemoryDir(): Promise<void>;
    /**
     * Save a memory entry
     */
    save(entry: MemoryEntry): Promise<void>;
    /**
     * Load a memory entry
     */
    load(id: string): Promise<MemoryEntry | null>;
    /**
     * List all memory entries
     */
    list(type?: MemoryEntry['type']): Promise<MemoryEntry[]>;
    /**
     * Delete a memory entry
     */
    delete(id: string): Promise<boolean>;
    /**
     * Compress old memory entries (remove entries older than retention_days)
     */
    compress(): Promise<number>;
    /**
     * Get memory statistics
     */
    getStats(): Promise<{
        enabled: boolean;
        path: string;
        total_entries: number;
        entries_by_type: Record<string, number>;
        oldest_entry: number | null;
        newest_entry: number | null;
    }>;
    /**
     * Clear all memory entries
     */
    clear(): Promise<number>;
}
export declare function createMemoryManager(projectRoot?: string): MemoryManager;
//# sourceMappingURL=memory-manager.d.ts.map