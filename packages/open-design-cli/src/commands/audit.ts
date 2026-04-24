import { defineCommand } from 'citty';
import { createEvaluator } from '../rams/evaluator.js';

const auditRunCommand = defineCommand({
  meta: {
    name: 'run',
    description: 'Run a full RAMS framework evaluation',
  },
  async run() {
    try {
      const evaluator = createEvaluator();
      const evaluation = await evaluator.evaluate();

      console.log(JSON.stringify(evaluation, null, 2));
      process.exitCode = evaluation.overall_score >= 80 ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const auditHealthCommand = defineCommand({
  meta: {
    name: 'health',
    description: 'Quick health check',
  },
  async run() {
    try {
      const evaluator = createEvaluator();
      const health = await evaluator.healthCheck();

      console.log(JSON.stringify(health, null, 2));
      process.exitCode = health.healthy ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const auditRolesCommand = defineCommand({
  meta: {
    name: 'roles',
    description: 'Evaluate role coverage',
  },
  async run() {
    try {
      const evaluator = createEvaluator();
      const evaluation = await evaluator.evaluate();

      console.log(JSON.stringify({
        roles: evaluation.details.roles,
        coverage: evaluation.criteria.role_coverage,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const auditSkillsCommand = defineCommand({
  meta: {
    name: 'skills',
    description: 'Evaluate skill coverage',
  },
  async run() {
    try {
      const evaluator = createEvaluator();
      const evaluation = await evaluator.evaluate();

      console.log(JSON.stringify({
        skills: evaluation.details.skills,
        coverage: evaluation.criteria.skill_coverage,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const auditWorkflowsCommand = defineCommand({
  meta: {
    name: 'workflows',
    description: 'Evaluate workflow validity',
  },
  async run() {
    try {
      const evaluator = createEvaluator();
      const evaluation = await evaluator.evaluate();

      console.log(JSON.stringify({
        workflows: evaluation.details.workflows,
        validity: evaluation.criteria.workflow_validity,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'audit',
    description: 'Audit and evaluate RAMS framework health',
  },
  subCommands: {
    run: auditRunCommand,
    health: auditHealthCommand,
    roles: auditRolesCommand,
    skills: auditSkillsCommand,
    workflows: auditWorkflowsCommand,
  },
});
