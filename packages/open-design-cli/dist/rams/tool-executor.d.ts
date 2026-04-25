export interface ToolDefinition {
    name: string;
    type: 'python' | 'javascript' | 'mcp' | 'opencli';
    path?: string;
    command?: string;
    args?: string[];
    enabled: boolean;
}
export interface ToolExecutionResult {
    success: boolean;
    output: string;
    error?: string;
    exit_code: number;
}
export declare class ToolExecutor {
    private projectRoot;
    private tools;
    constructor(projectRoot?: string);
    /**
     * Initialize default tools
     */
    private initializeDefaultTools;
    /**
     * Register a new tool
     */
    registerTool(tool: ToolDefinition): void;
    /**
     * Get a tool by name
     */
    getTool(name: string): ToolDefinition | undefined;
    /**
     * List all registered tools
     */
    listTools(): ToolDefinition[];
    /**
     * Execute a tool
     */
    execute(toolName: string, script: string, args?: string[]): Promise<ToolExecutionResult>;
    /**
     * Run a command and return the result
     */
    private runCommand;
    /**
     * Execute a Python script
     */
    executePython(script: string, args?: string[]): Promise<ToolExecutionResult>;
    /**
     * Execute a JavaScript script
     */
    executeJavaScript(script: string, args?: string[]): Promise<ToolExecutionResult>;
    /**
     * Execute a Bun script
     */
    executeBun(script: string, args?: string[]): Promise<ToolExecutionResult>;
    /**
     * Check if a tool is available
     */
    isToolAvailable(toolName: string): Promise<boolean>;
    /**
     * Enable a tool
     */
    enableTool(toolName: string): boolean;
    /**
     * Disable a tool
     */
    disableTool(toolName: string): boolean;
}
export declare function createToolExecutor(projectRoot?: string): ToolExecutor;
//# sourceMappingURL=tool-executor.d.ts.map