export interface WorkflowStep {
    name: string;
    description: string;
    skill?: string;
    role?: string;
    input?: any;
    output?: string;
    dependencies?: string[];
}
export interface WorkflowDefinition {
    name: string;
    description: string;
    steps: WorkflowStep[];
}
export declare class WorkflowParser {
    private projectRoot;
    constructor(projectRoot?: string);
    /**
     * Load a workflow from a markdown file
     */
    loadWorkflow(workflowName: string): Promise<WorkflowDefinition>;
    /**
     * Parse workflow from markdown content
     */
    parseWorkflow(content: string): WorkflowDefinition;
    /**
     * Parse steps from markdown content
     */
    private parseSteps;
    /**
     * List all available workflows
     */
    listWorkflows(): Promise<string[]>;
    /**
     * Validate workflow structure
     */
    validateWorkflow(workflow: WorkflowDefinition): {
        valid: boolean;
        errors: string[];
    };
}
export declare function createWorkflowParser(projectRoot?: string): WorkflowParser;
//# sourceMappingURL=workflow-parser.d.ts.map