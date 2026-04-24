import { defineCommand } from 'citty';
import { createRuntimeManager } from '../rams/runtime-manager.js';

const runtimeStatusCommand = defineCommand({
  meta: {
    name: 'status',
    description: 'Get current runtime environment status',
  },
  async run() {
    try {
      const runtimeManager = createRuntimeManager();
      const status = await runtimeManager.getStatus();

      console.log(JSON.stringify(status, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const runtimeListCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all supported runtime environments',
  },
  async run() {
    try {
      const runtimeManager = createRuntimeManager();
      const environments = runtimeManager.getSupportedEnvironments();

      console.log(JSON.stringify({
        environments,
        count: environments.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const runtimeSetCommand = defineCommand({
  meta: {
    name: 'set',
    description: 'Set runtime environment',
  },
  args: {
    environment: {
      type: 'positional',
      description: 'Environment name (e.g., windsurf, cursor, claude-desktop)',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const runtimeManager = createRuntimeManager();
      await runtimeManager.setRuntimeEnvironment(args.environment);

      console.log(JSON.stringify({
        success: true,
        message: `Runtime environment set to ${args.environment}`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const runtimeModelCommand = defineCommand({
  meta: {
    name: 'model',
    description: 'Set or get the current model',
  },
  args: {
    model: {
      type: 'positional',
      description: 'Model name (e.g., swe-1.6, claude-3.5-sonnet)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const runtimeManager = createRuntimeManager();

      if (args.model) {
        await runtimeManager.setModel(args.model);
        console.log(JSON.stringify({
          success: true,
          message: `Model set to ${args.model}`,
        }, null, 2));
      } else {
        const runtime = await runtimeManager.getCurrentRuntime();
        console.log(JSON.stringify({
          model: runtime.model,
        }, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const runtimeCheckCommand = defineCommand({
  meta: {
    name: 'check',
    description: 'Check if a capability is supported',
  },
  args: {
    capability: {
      type: 'positional',
      description: 'Capability to check (e.g., ai_models, file_system, terminal)',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const runtimeManager = createRuntimeManager();
      const hasCapability = await runtimeManager.hasCapability(args.capability);

      console.log(JSON.stringify({
        capability: args.capability,
        supported: hasCapability,
      }, null, 2));

      process.exitCode = hasCapability ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'runtime',
    description: 'Manage runtime environment settings',
  },
  subCommands: {
    status: runtimeStatusCommand,
    list: runtimeListCommand,
    set: runtimeSetCommand,
    model: runtimeModelCommand,
    check: runtimeCheckCommand,
  },
});
