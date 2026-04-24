import { defineCommand } from 'citty';
import { createOrchestrator } from '../rams/orchestrator.js';

const orchestratorExecuteCommand = defineCommand({
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
    verbose: {
      type: 'boolean',
      description: 'Verbose output',
      default: false,
    },
    continue_on_error: {
      type: 'boolean',
      description: 'Continue on error',
      default: false,
    },
  },
  async run({ args }) {
    try {
      const orchestrator = createOrchestrator(undefined, {
        dry_run: args.dry_run,
        verbose: args.verbose,
        continue_on_error: args.continue_on_error,
      });

      const summary = await orchestrator.executeWorkflow(args.workflow);

      console.log(JSON.stringify(summary, null, 2));
      process.exitCode = summary.failed_steps > 0 ? 1 : 0;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const orchestratorStatusCommand = defineCommand({
  meta: {
    name: 'status',
    description: 'Get workflow execution status',
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
      const orchestrator = createOrchestrator();
      const status = await orchestrator.getWorkflowStatus(args.workflow);

      console.log(JSON.stringify(status, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const orchestratorValidateCommand = defineCommand({
  meta: {
    name: 'validate',
    description: 'Validate a workflow before execution',
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
      const orchestrator = createOrchestrator();
      const validation = await orchestrator.validateWorkflow(args.workflow);

      console.log(JSON.stringify(validation, null, 2));
      process.exitCode = validation.valid ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'orchestrator',
    description: 'Orchestrate complex workflow executions',
  },
  subCommands: {
    execute: orchestratorExecuteCommand,
    status: orchestratorStatusCommand,
    validate: orchestratorValidateCommand,
  },
});
