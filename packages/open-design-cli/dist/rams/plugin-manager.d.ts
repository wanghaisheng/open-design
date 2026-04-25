export interface PluginDefinition {
    name: string;
    version: string;
    description: string;
    author: string;
    type: 'command' | 'skill' | 'role' | 'exporter';
    enabled: boolean;
    entry_point?: string;
    config?: any;
}
export declare class PluginManager {
    private projectRoot;
    private plugins;
    constructor(projectRoot?: string);
    /**
     * Get plugins directory path
     */
    private getPluginsPath;
    /**
     * Ensure plugins directory exists
     */
    private ensurePluginsDir;
    /**
     * Load all plugins from the plugins directory
     */
    loadPlugins(): Promise<void>;
    /**
     * Register a plugin
     */
    registerPlugin(plugin: PluginDefinition): Promise<void>;
    /**
     * Unregister a plugin
     */
    unregisterPlugin(pluginName: string): Promise<boolean>;
    /**
     * Get a plugin by name
     */
    getPlugin(name: string): PluginDefinition | undefined;
    /**
     * List all plugins
     */
    listPlugins(): PluginDefinition[];
    /**
     * List plugins by type
     */
    listPluginsByType(type: PluginDefinition['type']): PluginDefinition[];
    /**
     * Enable a plugin
     */
    enablePlugin(pluginName: string): boolean;
    /**
     * Disable a plugin
     */
    disablePlugin(pluginName: string): boolean;
    /**
     * Save a plugin to disk
     */
    private savePlugin;
    /**
     * Get plugin statistics
     */
    getStats(): {
        total: number;
        enabled: number;
        disabled: number;
        by_type: Record<string, number>;
    };
}
export declare function createPluginManager(projectRoot?: string): PluginManager;
//# sourceMappingURL=plugin-manager.d.ts.map