export interface RuntimeEnvironment {
    name: string;
    type: 'desktop_ide' | 'cloud_ide' | 'professional_tool' | 'custom_platform' | 'cli';
    model: string;
    capabilities: string[];
}
export interface RuntimeConfig {
    environment: string;
    model: string;
    tool_permissions: string[];
    memory_enabled: boolean;
}
export declare class RuntimeManager {
    private projectRoot;
    constructor(projectRoot?: string);
    /**
     * Get current runtime environment
     */
    getCurrentRuntime(): Promise<RuntimeEnvironment>;
    /**
     * Detect environment type from name
     */
    private detectEnvironmentType;
    /**
     * Get capabilities for a given environment
     */
    private getEnvironmentCapabilities;
    /**
     * Set runtime environment
     */
    setRuntimeEnvironment(environment: string): Promise<void>;
    /**
     * Set model
     */
    setModel(model: string): Promise<void>;
    /**
     * Get supported environments
     */
    getSupportedEnvironments(): RuntimeEnvironment[];
    /**
     * Check if a capability is supported in current environment
     */
    hasCapability(capability: string): Promise<boolean>;
    /**
     * Get runtime status
     */
    getStatus(): Promise<{
        environment: RuntimeEnvironment;
        config: RuntimeConfig;
        supported: boolean;
    }>;
}
export declare function createRuntimeManager(projectRoot?: string): RuntimeManager;
//# sourceMappingURL=runtime-manager.d.ts.map