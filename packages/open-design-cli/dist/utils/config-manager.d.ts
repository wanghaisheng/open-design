export interface Config {
    runtime: RuntimeConfig;
    role: RoleConfig;
    memory: MemoryConfig;
    skills: SkillsConfig;
    workflows: WorkflowsConfig;
}
export interface RuntimeConfig {
    environment: string;
    model: string;
}
export interface RoleConfig {
    default: string;
    path: string;
}
export interface MemoryConfig {
    enabled: boolean;
    path: string;
    compression: CompressionConfig;
}
export interface CompressionConfig {
    enabled: boolean;
    retention_days: number;
}
export interface SkillsConfig {
    auto_load: boolean;
    cache: boolean;
}
export interface WorkflowsConfig {
    enabled: boolean;
    path: string;
}
export declare class ConfigManager {
    private configPath;
    private config;
    constructor(projectRoot?: string);
    /**
     * Load configuration from file
     */
    load(): Promise<Config>;
    /**
     * Save configuration to file
     */
    save(config: Config): Promise<void>;
    /**
     * Get a specific configuration value by path
     */
    get(path: string): Promise<any>;
    /**
     * Set a specific configuration value by path
     */
    set(path: string, value: any): Promise<void>;
    /**
     * Validate configuration structure
     */
    validate(config: Config): {
        valid: boolean;
        errors: string[];
    };
    /**
     * Initialize configuration with default values
     */
    init(): Promise<void>;
    /**
     * Check if configuration exists
     */
    exists(): boolean;
    /**
     * Get configuration file path
     */
    getConfigPath(): string;
}
export declare function createConfigManager(projectRoot?: string): ConfigManager;
//# sourceMappingURL=config-manager.d.ts.map