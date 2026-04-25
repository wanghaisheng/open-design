import { ToolDefinition } from '../tool-executor';
/**
 * Visual QA Tool Channel
 *
 * Supports visual quality assurance operations:
 * - Static mode QA (reference + single screenshot)
 * - Dynamic mode QA (reference + frame sequence at 2 FPS)
 * - Question mode QA (free-form questions + screenshots)
 * - Visual defect detection
 */
export declare class VisualQaChannel {
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
     * Static mode visual QA
     * Reference image + single game screenshot
     */
    staticModeQA(referenceImage: string, gameScreenshot: string, context: string): Promise<any>;
    /**
     * Dynamic mode visual QA
     * Reference image + frame sequence at 2 FPS
     */
    dynamicModeQA(referenceImage: string, frameSequence: string[], context: string): Promise<any>;
    /**
     * Question mode visual QA
     * Free-form questions + arbitrary number of screenshots
     */
    questionModeQA(question: string, screenshots: string[]): Promise<any>;
    /**
     * Detect visual defects
     * z-fighting, texture stretching, clipping, floating objects
     */
    detectVisualDefects(screenshot: string): Promise<any>;
    /**
     * Detect rendering bugs
     * Missing textures, culling errors, light leaks
     */
    detectRenderingBugs(screenshot: string): Promise<any>;
    /**
     * Detect motion anomalies
     * Stuttering entities, jitter, sliding animations, physics explosions
     */
    detectMotionAnomalies(frameSequence: string[]): Promise<any>;
}
export declare function createVisualQaChannel(): VisualQaChannel;
//# sourceMappingURL=visual-qa-channel.d.ts.map