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
export class ToolChannelManager {
  private assetGeneration: AssetGenerationChannel;
  private imageProcessing: ImageProcessingChannel;
  private godotApi: GodotApiChannel;
  private visualQa: VisualQaChannel;

  constructor() {
    this.assetGeneration = new AssetGenerationChannel();
    this.imageProcessing = new ImageProcessingChannel();
    this.godotApi = new GodotApiChannel();
    this.visualQa = new VisualQaChannel();
  }

  /**
   * Get asset generation channel
   */
  getAssetGeneration(): AssetGenerationChannel {
    return this.assetGeneration;
  }

  /**
   * Get image processing channel
   */
  getImageProcessing(): ImageProcessingChannel {
    return this.imageProcessing;
  }

  /**
   * Get Godot API channel
   */
  getGodotApi(): GodotApiChannel {
    return this.godotApi;
  }

  /**
   * Get visual QA channel
   */
  getVisualQa(): VisualQaChannel {
    return this.visualQa;
  }

  /**
   * Get all channels
   */
  getAllChannels() {
    return {
      assetGeneration: this.assetGeneration,
      imageProcessing: this.imageProcessing,
      godotApi: this.godotApi,
      visualQa: this.visualQa,
    };
  }
}

export function createToolChannelManager(): ToolChannelManager {
  return new ToolChannelManager();
}
