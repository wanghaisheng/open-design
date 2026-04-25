export interface InteractiveSession {
    id: string;
    role: string;
    started_at: number;
    history: InteractionHistory[];
}
export interface InteractionHistory {
    timestamp: number;
    type: 'input' | 'output' | 'error';
    content: string;
    skill?: string;
}
export declare class InteractiveMode {
    private projectRoot;
    private session;
    constructor(projectRoot?: string);
    /**
     * Start an interactive session
     */
    startSession(roleName: string): Promise<InteractiveSession>;
    /**
     * Execute a command in the interactive session
     */
    executeCommand(input: string): Promise<string>;
    /**
     * Get the current session
     */
    getSession(): InteractiveSession | null;
    /**
     * End the current session
     */
    endSession(): void;
    /**
     * Get help text
     */
    private getHelpText;
    /**
     * Get session statistics
     */
    getSessionStats(): {
        id: string;
        role: string;
        duration_ms: number;
        interactions: number;
        by_type: Record<string, number>;
    } | null;
}
export declare function createInteractiveMode(projectRoot?: string): InteractiveMode;
//# sourceMappingURL=interactive-mode.d.ts.map