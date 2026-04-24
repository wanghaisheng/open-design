import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'yaml';

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

export class WorkflowParser {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Load a workflow from a markdown file
   */
  async loadWorkflow(workflowName: string): Promise<WorkflowDefinition> {
    const workflowPath = resolve(this.projectRoot, '.windsurf', 'workflows', `${workflowName}.md`);
    
    if (!existsSync(workflowPath)) {
      throw new Error(`Workflow not found: ${workflowPath}`);
    }

    const content = readFileSync(workflowPath, 'utf-8');
    return this.parseWorkflow(content);
  }

  /**
   * Parse workflow from markdown content
   */
  parseWorkflow(content: string): WorkflowDefinition {
    // Extract YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      throw new Error('No YAML frontmatter found in workflow');
    }

    const frontmatter = parse(frontmatterMatch[1]) as any;
    
    // Parse steps from markdown content
    const steps = this.parseSteps(content);

    return {
      name: frontmatter.name || 'Unnamed Workflow',
      description: frontmatter.description || '',
      steps,
    };
  }

  /**
   * Parse steps from markdown content
   */
  private parseSteps(content: string): WorkflowStep[] {
    const steps: WorkflowStep[] = [];
    const lines = content.split('\n');
    let currentStep: Partial<WorkflowStep> | null = null;

    for (const line of lines) {
      // Detect step headers (###)
      const stepMatch = line.match(/^###\s+(.+)/);
      if (stepMatch) {
        if (currentStep && currentStep.name) {
          steps.push(currentStep as WorkflowStep);
        }
        currentStep = {
          name: stepMatch[1].trim(),
          description: '',
        };
        continue;
      }

      // Extract skill information
      if (currentStep && line.includes('使用Skill')) {
        const skillMatch = line.match(/使用Skill[：:]\s*`([^`]+)`/);
        if (skillMatch) {
          currentStep.skill = skillMatch[1];
        }
      }

      // Extract role information
      if (currentStep && line.includes('使用Role')) {
        const roleMatch = line.match(/使用Role[：:]\s*`([^`]+)`/);
        if (roleMatch) {
          currentStep.role = roleMatch[1];
        }
      }

      // Extract output document
      if (currentStep && line.includes('输出文档')) {
        const outputMatch = line.match(/输出文档[：:]\s*`([^`]+)`/);
        if (outputMatch) {
          currentStep.output = outputMatch[1];
        }
      }

      // Extract dependencies
      if (currentStep && line.includes('依赖')) {
        const depMatch = line.match(/依赖[：:]\s*(.+)/);
        if (depMatch) {
          currentStep.dependencies = depMatch[1].split(',').map(d => d.trim());
        }
      }
    }

    if (currentStep && currentStep.name) {
      steps.push(currentStep as WorkflowStep);
    }

    return steps;
  }

  /**
   * List all available workflows
   */
  async listWorkflows(): Promise<string[]> {
    const workflowDir = resolve(this.projectRoot, '.windsurf', 'workflows');
    
    if (!existsSync(workflowDir)) {
      return [];
    }

    const { readdirSync } = await import('fs');
    const entries = readdirSync(workflowDir);
    
    return entries
      .filter(entry => entry.endsWith('.md'))
      .map(entry => entry.replace('.md', ''));
  }

  /**
   * Validate workflow structure
   */
  validateWorkflow(workflow: WorkflowDefinition): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!workflow.name) {
      errors.push('Workflow name is required');
    }

    if (!workflow.description) {
      errors.push('Workflow description is required');
    }

    if (!workflow.steps || workflow.steps.length === 0) {
      errors.push('Workflow must have at least one step');
    }

    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      if (!step.name) {
        errors.push(`Step ${i + 1} is missing a name`);
      }
      if (!step.skill && !step.role) {
        errors.push(`Step ${i + 1} must have either a skill or role`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export function createWorkflowParser(projectRoot?: string): WorkflowParser {
  return new WorkflowParser(projectRoot);
}
