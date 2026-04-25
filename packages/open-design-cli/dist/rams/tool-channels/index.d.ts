/**
 * Tool Channels Index
 *
 * Exports all tool channel implementations for game development.
 * These channels provide software tool integrations from Godogen.
 */
import { AssetGenerationChannel, createAssetGenerationChannel } from './asset-generation-channel';
import { ImageProcessingChannel, createImageProcessingChannel } from './image-processing-channel';
import { GodotApiChannel, createGodotApiChannel } from './godot-api-channel';
import { VisualQaChannel, createVisualQaChannel } from './visual-qa-channel';
export { AssetGenerationChannel, createAssetGenerationChannel };
export { ImageProcessingChannel, createImageProcessingChannel };
export { GodotApiChannel, createGodotApiChannel };
export { VisualQaChannel, createVisualQaChannel };
/**
 * Tool Channel Manager
 *
 * Manages all tool channels and provides unified access.
 */
export declare class ToolChannelManager {
    private assetGeneration;
    private imageProcessing;
    private godotApi;
    private visualQa;
    constructor();
    /**
     * Get asset generation channel
     */
    getAssetGeneration(): AssetGenerationChannel;
    /**
     * Get image processing channel
     */
    getImageProcessing(): ImageProcessingChannel;
    /**
     * Get Godot API channel
     */
    getGodotApi(): GodotApiChannel;
    /**
     * Get visual QA channel
     */
    getVisualQa(): VisualQaChannel;
    /**
     * Get all channels
     */
    getAllChannels(): {
        assetGeneration: AssetGenerationChannel;
        imageProcessing: ImageProcessingChannel;
        godotApi: GodotApiChannel;
        visualQa: VisualQaChannel;
    };
}
export declare function createToolChannelManager(): ToolChannelManager;
//# sourceMappingURL=index.d.ts.map