export interface LearningEntry {
    id: string;
    task_id: string;
    role: string;
    skill: string;
    timestamp: number;
    success: boolean;
    duration_ms: number;
    input: any;
    output: any;
    feedback?: string;
    improvements?: string[];
}
export interface LearningInsight {
    pattern: string;
    frequency: number;
    confidence: number;
    recommendation: string;
}
export declare class LearningManager {
    private memoryManager;
    constructor(projectRoot?: string);
    /**
     * Record a task execution for learning
     */
    recordExecution(entry: LearningEntry): Promise<void>;
    /**
     * Get all learning entries
     */
    getLearningEntries(): Promise<LearningEntry[]>;
    /**
     * Get learning entries for a specific role
     */
    getRoleLearning(role: string): Promise<LearningEntry[]>;
    /**
     * Get learning entries for a specific skill
     */
    getSkillLearning(skill: string): Promise<LearningEntry[]>;
    /**
     * Analyze patterns and generate insights
     */
    analyzePatterns(): Promise<LearningInsight[]>;
    /**
     * Get learning statistics
     */
    getStats(): Promise<{
        total_executions: number;
        success_rate: number;
        avg_duration_ms: number;
        by_role: Record<string, number>;
        by_skill: Record<string, number>;
    }>;
    /**
     * Clear learning data
     */
    clearLearning(): Promise<number>;
    /**
     * Generate a learning report
     */
    generateReport(): Promise<{
        stats: any;
        insights: LearningInsight[];
        recommendations: string[];
    }>;
}
export declare function createLearningManager(projectRoot?: string): LearningManager;
//# sourceMappingURL=learning-manager.d.ts.map