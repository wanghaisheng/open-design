import { ToolDefinition } from '../tool-executor';
/**
 * Image Processing Tool Channel
 *
 * Supports image processing operations:
 * - Background removal (BiRefNet)
 * - Grid slicing
 * - Loop frame detection
 * - Image format conversion
 */
export declare class ImageProcessingChannel {
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
     * Remove background from image
     */
    removeBackground(imagePath: string, outputPath?: string): Promise<any>;
    /**
     * Slice image into grid
     */
    sliceGrid(imagePath: string, rows: number, cols: number): Promise<any>;
    /**
     * Find loop frame in animation
     */
    findLoopFrame(videoPath: string): Promise<any>;
    /**
     * Resize image
     */
    resizeImage(imagePath: string, width: number, height: number): Promise<any>;
    /**
     * Convert image format
     */
    convertImage(imagePath: string, targetFormat: 'png' | 'jpg' | 'webp'): Promise<any>;
}
export declare function createImageProcessingChannel(): ImageProcessingChannel;
//# sourceMappingURL=image-processing-channel.d.ts.map