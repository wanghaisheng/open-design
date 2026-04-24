import { createRoleManager } from './role-instance.js';
import { createSkillExecutor } from './skill-executor.js';
import { createWorkflowParser } from './workflow-parser.js';
import { createLearningManager } from './learning-manager.js';
import { createMemoryManager } from './memory-manager.js';

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

export class Orchestrator {
  private projectRoot: string;
  private config: OrchestratorConfig;

  constructor(projectRoot: string = process.cwd(), config: Partial<OrchestratorConfig> = {}) {
    this.projectRoot = projectRoot;
    this.config = {
      dry_run: config.dry_run ?? false,
      verbose: config.verbose ?? false,
      continue_on_error: config.continue_on_error ?? false,
    };
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(workflowName: string): Promise<OrchestrationSummary> {
    const startTime = Date.now();
    const workflowParser = createWorkflowParser(this.projectRoot);
    const workflow = await workflowParser.loadWorkflow(workflowName);
    const learningManager = createLearningManager(this.projectRoot);
    const memoryManager = createMemoryManager(this.projectRoot);

    const results: ExecutionResult[] = [];
    let completedSteps = 0;
    let failedSteps = 0;

    for (const step of workflow.steps) {
      const stepStartTime = Date.now();
      let result: ExecutionResult;

      try {
        if (this.config.dry_run) {
          result = {
            step: step.name,
            success: true,
            output: { dry_run: true, skill: step.skill, role: step.role },
            duration_ms: Date.now() - stepStartTime,
          };
        } else {
          const output = await this.executeStep(step);
          result = {
            step: step.name,
            success: true,
            output,
            duration_ms: Date.now() - stepStartTime,
          };

          // Record execution for learning
          await learningManager.recordExecution({
            id: `${workflowName}-${step.name}`,
            task_id: workflowName,
            role: step.role || 'default',
            skill: step.skill || 'default',
            timestamp: Date.now(),
            success: true,
            duration_ms: result.duration_ms,
            input: step.input,
            output,
          });

          // Save to memory
          await memoryManager.save({
            id: `workflow-${workflowName}-${step.name}`,
            type: 'workflow',
            timestamp: Date.now(),
            content: { step, output },
          });
        }

        completedSteps++;
      } catch (error) {
        result = {
          step: step.name,
          success: false,
          output: null,
          error: (error as Error).message,
          duration_ms: Date.now() - stepStartTime,
        };

        failedSteps++;

        // Record failed execution for learning
        await learningManager.recordExecution({
          id: `${workflowName}-${step.name}`,
          task_id: workflowName,
          role: step.role || 'default',
          skill: step.skill || 'default',
          timestamp: Date.now(),
          success: false,
          duration_ms: result.duration_ms,
          input: step.input,
          output: null,
        });

        if (!this.config.continue_on_error) {
          break;
        }
      }

      results.push(result);

      if (this.config.verbose) {
        console.log(JSON.stringify(result, null, 2));
      }
    }

    return {
      workflow: workflowName,
      total_steps: workflow.steps.length,
      completed_steps: completedSteps,
      failed_steps: failedSteps,
      duration_ms: Date.now() - startTime,
      results,
    };
  }

  /**
   * Execute a single workflow step
   */
  private async executeStep(step: any): Promise<any> {
    if (step.skill) {
      return this.executeSkill(step);
    }
    if (step.role) {
      return this.executeRole(step);
    }
    throw new Error('Step must have either skill or role');
  }

  /**
   * Execute a skill
   */
  private async executeSkill(step: any): Promise<any> {
    const roleManager = createRoleManager(this.projectRoot);
    const roleInstance = roleManager.createRoleInstance(step.role || 'default');
    const skillExecutor = createSkillExecutor(roleInstance);

    return await skillExecutor.execute(step.skill, step.input || {});
  }

  /**
   * Execute a role
   */
  private async executeRole(step: any): Promise<any> {
    const roleManager = createRoleManager(this.projectRoot);
    const roleInstance = roleManager.createRoleInstance(step.role);
    
    await roleInstance.loadRole();
    await roleInstance.loadSoul();

    return {
      role: step.role,
      loaded: true,
      soul_loaded: true,
    };
  }

  /**
   * Get workflow status
   */
  async getWorkflowStatus(workflowName: string): Promise<any> {
    const workflowParser = createWorkflowParser(this.projectRoot);
    const workflow = await workflowParser.loadWorkflow(workflowName);
    const learningManager = createLearningManager(this.projectRoot);

    const stats = await learningManager.getStats();

    return {
      workflow: workflowName,
      steps: workflow.steps.length,
      total_executions: stats.total_executions,
      success_rate: stats.success_rate,
      avg_duration_ms: stats.avg_duration_ms,
    };
  }

  /**
   * Validate workflow before execution
   */
  async validateWorkflow(workflowName: string): Promise<{ valid: boolean; errors: string[] }> {
    const workflowParser = createWorkflowParser(this.projectRoot);
    const workflow = await workflowParser.loadWorkflow(workflowName);
    return workflowParser.validateWorkflow(workflow);
  }
}

export function createOrchestrator(projectRoot?: string, config?: Partial<OrchestratorConfig>): Orchestrator {
  return new Orchestrator(projectRoot, config);
}
