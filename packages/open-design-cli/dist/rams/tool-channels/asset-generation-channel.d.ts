import { ToolDefinition } from '../tool-executor';
/**
 * Asset Generation Tool Channel
 *
 * Supports multiple backends for image/video/3D asset generation:
 * - Gemini (Google): 5-15¢ per generation
 * - Grok (xAI): 2¢ per generation
 * - Tripo3D: 30-60¢ per 3D model
 */
export declare class AssetGenerationChannel {
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
     * Generate image asset
     */
    generateImage(prompt: string, backend?: 'gemini' | 'grok'): Promise<any>;
    /**
     * Generate 3D model
     */
    generate3DModel(prompt: string): Promise<any>;
    /**
     * Remove background from image
     */
    removeBackground(imagePath: string): Promise<any>;
}
export declare function createAssetGenerationChannel(): AssetGenerationChannel;
//# sourceMappingURL=asset-generation-channel.d.ts.map