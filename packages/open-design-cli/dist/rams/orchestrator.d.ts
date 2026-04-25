export interface OrchestratorConfig {
    dry_run: boolean;
    verbose: boolean;
    continue_on_error: boolean;
}
export interface ExecutionResult {
    step: string;
    success: boolean;
    output: any;
    error?: string;
    duration_ms: number;
}
export interface OrchestrationSummary {
    workflow: string;
    total_steps: number;
    completed_steps: number;
    failed_steps: number;
    duration_ms: number;
    results: ExecutionResult[];
}
export declare class Orchestrator {
    private projectRoot;
    private config;
    constructor(projectRoot?: string, config?: Partial<OrchestratorConfig>);
    /**
     * Execute a workflow
     */
    executeWorkflow(workflowName: string): Promise<OrchestrationSummary>;
    /**
     * Execute a single workflow step
     */
    private executeStep;
    /**
     * Execute a skill
     */
    private executeSkill;
    /**
     * Execute a role
     */
    private executeRole;
    /**
     * Get workflow status
     */
    getWorkflowStatus(workflowName: string): Promise<any>;
    /**
     * Validate workflow before execution
     */
    validateWorkflow(workflowName: string): Promise<{
        valid: boolean;
        errors: string[];
    }>;
}
export declare function createOrchestrator(projectRoot?: string, config?: Partial<OrchestratorConfig>): Orchestrator;
//# sourceMappingURL=orchestrator.d.ts.map