import { createRoleManager } from './role-instance.js';
import { createWorkflowParser } from './workflow-parser.js';
import { createLearningManager } from './learning-manager.js';
import { createMemoryManager } from './memory-manager.js';

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
    roles: { total: number; loaded: number; failed: number };
    skills: { total: number; executable: number; failed: number };
    workflows: { total: number; valid: number; invalid: number };
    memory: { entries: number; compression_needed: boolean };
    learning: { insights: number; recommendations: number };
  };
  recommendations: string[];
}

export class Evaluator {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Run a full evaluation of the RAMS framework
   */
  async evaluate(): Promise<EvaluationResult> {
    const roleEvaluation = await this.evaluateRoles();
    const skillEvaluation = await this.evaluateSkills();
    const workflowEvaluation = await this.evaluateWorkflows();
    const memoryEvaluation = await this.evaluateMemory();
    const learningEvaluation = await this.evaluateLearning();

    const criteria: EvaluationCriteria = {
      role_coverage: roleEvaluation.failed === 0,
      skill_coverage: skillEvaluation.failed === 0,
      workflow_validity: workflowEvaluation.invalid === 0,
      memory_health: !memoryEvaluation.compression_needed,
      learning_insights: learningEvaluation.insights > 0,
    };

    const score = this.calculateScore(criteria);
    const recommendations = this.generateRecommendations(criteria, {
      roles: roleEvaluation,
      skills: skillEvaluation,
      workflows: workflowEvaluation,
      memory: memoryEvaluation,
      learning: learningEvaluation,
    });

    return {
      overall_score: score,
      criteria,
      details: {
        roles: roleEvaluation,
        skills: skillEvaluation,
        workflows: workflowEvaluation,
        memory: memoryEvaluation,
        learning: learningEvaluation,
      },
      recommendations,
    };
  }

  /**
   * Evaluate roles
   */
  private async evaluateRoles(): Promise<{ total: number; loaded: number; failed: number }> {
    const roleManager = createRoleManager(this.projectRoot);
    const roles = await roleManager.listRoles();
    
    let loaded = 0;
    let failed = 0;

    for (const roleName of roles) {
      try {
        const roleInstance = roleManager.createRoleInstance(roleName);
        await roleInstance.loadRole();
        loaded++;
      } catch {
        failed++;
      }
    }

    return {
      total: roles.length,
      loaded,
      failed,
    };
  }

  /**
   * Evaluate skills
   */
  private async evaluateSkills(): Promise<{ total: number; executable: number; failed: number }> {
    const roleManager = createRoleManager(this.projectRoot);
    const roles = await roleManager.listRoles();
    
    let totalSkills = 0;
    let executable = 0;
    let failed = 0;

    for (const roleName of roles) {
      try {
        const roleInstance = roleManager.createRoleInstance(roleName);
        const roleDef = await roleInstance.loadRole();
        totalSkills += roleDef.skills.length;
        executable += roleDef.skills.length; // Assume all skills are executable for now
      } catch {
        failed++;
      }
    }

    return {
      total: totalSkills,
      executable,
      failed,
    };
  }

  /**
   * Evaluate workflows
   */
  private async evaluateWorkflows(): Promise<{ total: number; valid: number; invalid: number }> {
    const workflowParser = createWorkflowParser(this.projectRoot);
    const workflows = await workflowParser.listWorkflows();
    
    let valid = 0;
    let invalid = 0;

    for (const workflowName of workflows) {
      try {
        const workflow = await workflowParser.loadWorkflow(workflowName);
        const validation = workflowParser.validateWorkflow(workflow);
        if (validation.valid) {
          valid++;
        } else {
          invalid++;
        }
      } catch {
        invalid++;
      }
    }

    return {
      total: workflows.length,
      valid,
      invalid,
    };
  }

  /**
   * Evaluate memory health
   */
  private async evaluateMemory(): Promise<{ entries: number; compression_needed: boolean }> {
    const memoryManager = createMemoryManager(this.projectRoot);
    const stats = await memoryManager.getStats();
    
    // Compression needed if more than 100 entries
    const compressionNeeded = stats.total_entries > 100;

    return {
      entries: stats.total_entries,
      compression_needed: compressionNeeded,
    };
  }

  /**
   * Evaluate learning insights
   */
  private async evaluateLearning(): Promise<{ insights: number; recommendations: number }> {
    const learningManager = createLearningManager(this.projectRoot);
    const insights = await learningManager.analyzePatterns();
    const report = await learningManager.generateReport();

    return {
      insights: insights.length,
      recommendations: report.recommendations.length,
    };
  }

  /**
   * Calculate overall score
   */
  private calculateScore(criteria: EvaluationCriteria): number {
    let score = 0;
    const maxScore = 5;

    if (criteria.role_coverage) score++;
    if (criteria.skill_coverage) score++;
    if (criteria.workflow_validity) score++;
    if (criteria.memory_health) score++;
    if (criteria.learning_insights) score++;

    return (score / maxScore) * 100;
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(criteria: EvaluationCriteria, _details: any): string[] {
    const recommendations: string[] = [];

    if (!criteria.role_coverage) {
      recommendations.push('Some roles failed to load. Check role definitions for errors.');
    }

    if (!criteria.skill_coverage) {
      recommendations.push('Some skills are not executable. Review skill definitions.');
    }

    if (!criteria.workflow_validity) {
      recommendations.push('Some workflows are invalid. Fix workflow definitions.');
    }

    if (!criteria.memory_health) {
      recommendations.push('Memory compression is needed. Run `memory compress` to clean up old entries.');
    }

    if (!criteria.learning_insights) {
      recommendations.push('No learning insights available. Execute more tasks to generate insights.');
    }

    if (recommendations.length === 0) {
      recommendations.push('System is healthy. No recommendations at this time.');
    }

    return recommendations;
  }

  /**
   * Get a quick health check
   */
  async healthCheck(): Promise<{ healthy: boolean; score: number; issues: string[] }> {
    const evaluation = await this.evaluate();
    const issues: string[] = [];

    if (!evaluation.criteria.role_coverage) {
      issues.push('Role coverage issues detected');
    }
    if (!evaluation.criteria.skill_coverage) {
      issues.push('Skill coverage issues detected');
    }
    if (!evaluation.criteria.workflow_validity) {
      issues.push('Workflow validity issues detected');
    }
    if (!evaluation.criteria.memory_health) {
      issues.push('Memory health issues detected');
    }

    return {
      healthy: evaluation.overall_score >= 80,
      score: evaluation.overall_score,
      issues,
    };
  }
}

export function createEvaluator(projectRoot?: string): Evaluator {
  return new Evaluator(projectRoot);
}
