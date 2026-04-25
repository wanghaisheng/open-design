import { ToolDefinition } from '../tool-executor';
/**
 * Godot API Tool Channel
 *
 * Supports Godot engine-specific operations:
 * - API documentation conversion
 * - GDScript code generation
 * - Scene tree analysis
 * - Resource management
 */
export declare class GodotApiChannel {
    private tools;
    constructor();
    private initializeTools;
    /**
     * Get tool by name
     */
    getTool(name: string): ToolDefinition | undefined;
    /**
     * Get all tools
     */
    getAllTools(): ToolDefinition[];
    /**
     * Convert Godot API documentation
     */
    convertApiDocs(apiVersion: string, outputPath: string): Promise<any>;
    /**
     * Generate GDScript code
     */
    generateGDScript(description: string, context?: any): Promise<any>;
    /**
     * Analyze scene tree
     */
    analyzeSceneTree(scenePath: string): Promise<any>;
    /**
     * Manage resources
     */
    manageResources(projectPath: string, operation: 'list' | 'optimize' | 'validate'): Promise<any>;
}
export declare function createGodotApiChannel(): GodotApiChannel;
//# sourceMappingURL=godot-api-channel.d.ts.map