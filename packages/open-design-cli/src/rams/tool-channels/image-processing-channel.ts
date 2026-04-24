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
export class ImageProcessingChannel {
  private tools: Map<string, ToolDefinition>;

  constructor() {
    this.tools = new Map();
    this.initializeTools();
  }

  private initializeTools(): void {
    // Background removal tool (BiRefNet)
    this.tools.set('rembg_matting', {
      name: 'rembg_matting',
      type: 'python',
      path: 'tools/rembg_matting.py',
      command: 'python',
      args: ['tools/rembg_matting.py'],
      enabled: true,
    });

    // Grid slice tool
    this.tools.set('grid_slice', {
      name: 'grid_slice',
      type: 'python',
      path: 'tools/grid_slice.py',
      command: 'python',
      args: ['tools/grid_slice.py'],
      enabled: true,
    });

    // Loop frame detection tool
    this.tools.set('find_loop_frame', {
      name: 'find_loop_frame',
      type: 'python',
      path: 'tools/find_loop_frame.py',
      command: 'python',
      args: ['tools/find_loop_frame.py'],
      enabled: true,
    });

    // Image resize tool
    this.tools.set('image_resize', {
      name: 'image_resize',
      type: 'python',
      path: 'tools/image_resize.py',
      command: 'python',
      args: ['tools/image_resize.py'],
      enabled: true,
    });

    // Image format converter
    this.tools.set('image_convert', {
      name: 'image_convert',
      type: 'python',
      path: 'tools/image_convert.py',
      command: 'python',
      args: ['tools/image_convert.py'],
      enabled: true,
    });
  }

  /**
   * Get tool by name
   */
  getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  /**
   * Get all tools
   */
  getAllTools(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  /**
   * Remove background from image
   */
  async removeBackground(imagePath: string, outputPath?: string): Promise<any> {
    const tool = this.tools.get('rembg_matting');
    if (!tool) {
      throw new Error('Background removal tool not available');
    }

    return {
      inputPath: imagePath,
      outputPath: outputPath || imagePath.replace(/\.[^.]+$/, '_no_bg.png'),
      method: 'BiRefNet',
    };
  }

  /**
   * Slice image into grid
   */
  async sliceGrid(imagePath: string, rows: number, cols: number): Promise<any> {
    const tool = this.tools.get('grid_slice');
    if (!tool) {
      throw new Error('Grid slice tool not available');
    }

    return {
      inputPath: imagePath,
      rows,
      cols,
      outputCount: rows * cols,
    };
  }

  /**
   * Find loop frame in animation
   */
  async findLoopFrame(videoPath: string): Promise<any> {
    const tool = this.tools.get('find_loop_frame');
    if (!tool) {
      throw new Error('Loop frame detection tool not available');
    }

    return {
      inputPath: videoPath,
      loopFrame: 0, // Placeholder
    };
  }

  /**
   * Resize image
   */
  async resizeImage(imagePath: string, width: number, height: number): Promise<any> {
    const tool = this.tools.get('image_resize');
    if (!tool) {
      throw new Error('Image resize tool not available');
    }

    return {
      inputPath: imagePath,
      width,
      height,
      outputPath: imagePath.replace(/\.[^.]+$/, `_resized_${width}x${height}.png`),
    };
  }

  /**
   * Convert image format
   */
  async convertImage(imagePath: string, targetFormat: 'png' | 'jpg' | 'webp'): Promise<any> {
    const tool = this.tools.get('image_convert');
    if (!tool) {
      throw new Error('Image convert tool not available');
    }

    return {
      inputPath: imagePath,
      targetFormat,
      outputPath: imagePath.replace(/\.[^.]+$/, `.${targetFormat}`),
    };
  }
}

export function createImageProcessingChannel(): ImageProcessingChannel {
  return new ImageProcessingChannel();
}
