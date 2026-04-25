export interface EvaluationCriteria {
    role_coverage: boolean;
    skill_coverage: boolean;
    workflow_validity: boolean;
    memory_health: boolean;
    learning_insights: boolean;
}
export interface EvaluationResult {
    overall_score: number;
    criteria: EvaluationCriteria;
    details: {
        roles: {
            total: number;
            loaded: number;
            failed: number;
        };
        skills: {
            total: number;
            executable: number;
            failed: number;
        };
        workflows: {
            total: number;
            valid: number;
            invalid: number;
        };
        memory: {
            entries: number;
            compression_needed: boolean;
        };
        learning: {
            insights: number;
            recommendations: number;
        };
    };
    recommendations: string[];
}
export declare class Evaluator {
    private projectRoot;
    constructor(projectRoot?: string);
    /**
     * Run a full evaluation of the RAMS framework
     */
    evaluate(): Promise<EvaluationResult>;
    /**
     * Evaluate roles
     */
    private evaluateRoles;
    /**
     * Evaluate skills
     */
    private evaluateSkills;
    /**
     * Evaluate workflows
     */
    private evaluateWorkflows;
    /**
     * Evaluate memory health
     */
    private evaluateMemory;
    /**
     * Evaluate learning insights
     */
    private evaluateLearning;
    /**
     * Calculate overall score
     */
    private calculateScore;
    /**
     * Generate recommendations
     */
    private generateRecommendations;
    /**
     * Get a quick health check
     */
    healthCheck(): Promise<{
        healthy: boolean;
        score: number;
        issues: string[];
    }>;
}
export declare function createEvaluator(projectRoot?: string): Evaluator;
//# sourceMappingURL=evaluator.d.ts.map