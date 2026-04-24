import { defineCommand } from 'citty';
import { createConfigManager } from '../utils/index.js';

const getConfigCommand = defineCommand({
  meta: {
    name: 'get',
    description: 'Get a configuration value',
  },
  args: {
    path: {
      type: 'positional',
      description: 'Configuration path (e.g., runtime.model)',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const configManager = createConfigManager();
      const value = await configManager.get(args.path);

      if (value === undefined) {
        console.log(JSON.stringify({ error: 'Configuration path not found' }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({ path: args.path, value }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const setConfigCommand = defineCommand({
  meta: {
    name: 'set',
    description: 'Set a configuration value',
  },
  args: {
    path: {
      type: 'positional',
      description: 'Configuration path (e.g., runtime.model)',
      required: true,
    },
    value: {
      type: 'positional',
      description: 'Configuration value',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const configManager = createConfigManager();

      // Try to parse as JSON, fallback to string
      let value: any = args.value;
      try {
        value = JSON.parse(args.value);
      } catch {
        // Keep as string if not valid JSON
      }

      await configManager.set(args.path, value);

      console.log(JSON.stringify({
        success: true,
        message: `Configuration ${args.path} set to ${args.value}`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const initConfigCommand = defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize configuration with default values',
  },
  async run() {
    try {
      const configManager = createConfigManager();

      if (configManager.exists()) {
        console.log(JSON.stringify({
          error: 'Configuration already exists',
          path: configManager.getConfigPath(),
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      await configManager.init();

      console.log(JSON.stringify({
        success: true,
        message: 'Configuration initialized',
        path: configManager.getConfigPath(),
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const validateConfigCommand = defineCommand({
  meta: {
    name: 'validate',
    description: 'Validate configuration structure',
  },
  async run() {
    try {
      const configManager = createConfigManager();

      if (!configManager.exists()) {
        console.log(JSON.stringify({
          error: 'Configuration does not exist',
          path: configManager.getConfigPath(),
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      const config = await configManager.load();
      const validation = configManager.validate(config);

      console.log(JSON.stringify({
        valid: validation.valid,
        errors: validation.errors,
        path: configManager.getConfigPath(),
      }, null, 2));

      process.exitCode = validation.valid ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'config',
    description: 'Manage CLI configuration',
  },
  subCommands: {
    get: getConfigCommand,
    set: setConfigCommand,
    init: initConfigCommand,
    validate: validateConfigCommand,
  },
});
