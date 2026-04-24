import { defineCommand } from 'citty';
import { createWorkflowParser } from '../rams/workflow-parser.js';

const listWorkflowsCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all available workflows',
  },
  async run() {
    try {
      const workflowParser = createWorkflowParser();
      const workflows = await workflowParser.listWorkflows();

      console.log(JSON.stringify({
        workflows,
        count: workflows.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const workflowInfoCommand = defineCommand({
  meta: {
    name: 'info',
    description: 'Get detailed information about a workflow',
  },
  args: {
    workflow: {
      type: 'positional',
      description: 'Workflow name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const workflowParser = createWorkflowParser();
      const workflow = await workflowParser.loadWorkflow(args.workflow);

      console.log(JSON.stringify(workflow, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const validateWorkflowCommand = defineCommand({
  meta: {
    name: 'validate',
    description: 'Validate a workflow structure',
  },
  args: {
    workflow: {
      type: 'positional',
      description: 'Workflow name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const workflowParser = createWorkflowParser();
      const workflow = await workflowParser.loadWorkflow(args.workflow);
      const validation = workflowParser.validateWorkflow(workflow);

      console.log(JSON.stringify({
        valid: validation.valid,
        errors: validation.errors,
      }, null, 2));

      process.exitCode = validation.valid ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const executeWorkflowCommand = defineCommand({
  meta: {
    name: 'execute',
    description: 'Execute a workflow',
  },
  args: {
    workflow: {
      type: 'positional',
      description: 'Workflow name',
      required: true,
    },
    dry_run: {
      type: 'boolean',
      description: 'Dry run without actual execution',
      default: false,
    },
  },
  async run({ args }) {
    try {
      const workflowParser = createWorkflowParser();
      const workflow = await workflowParser.loadWorkflow(args.workflow);

      if (args.dry_run) {
        console.log(JSON.stringify({
          workflow: workflow.name,
          description: workflow.description,
          steps: workflow.steps.map(step => ({
            name: step.name,
            skill: step.skill,
            role: step.role,
            output: step.output,
          })),
          dry_run: true,
        }, null, 2));
        return;
      }

      // For now, just return the workflow structure
      // In a full implementation, this would:
      // 1. Execute each step in order
      // 2. Handle dependencies
      // 3. Pass outputs between steps
      // 4. Call the appropriate skills/roles

      console.log(JSON.stringify({
        workflow: workflow.name,
        message: 'Workflow execution not yet fully implemented',
        steps: workflow.steps.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'workflow',
    description: 'Execute and manage RAMS framework workflows',
  },
  subCommands: {
    list: listWorkflowsCommand,
    info: workflowInfoCommand,
    validate: validateWorkflowCommand,
    execute: executeWorkflowCommand,
  },
});
