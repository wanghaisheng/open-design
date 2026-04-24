import { defineCommand } from 'citty';
import { createPluginManager } from '../rams/plugin-manager.js';

const pluginListCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all plugins',
  },
  args: {
    type: {
      type: 'string',
      description: 'Filter by type (command, skill, role, exporter)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const pluginManager = createPluginManager();
      await pluginManager.loadPlugins();

      const plugins = args.type 
        ? pluginManager.listPluginsByType(args.type as any)
        : pluginManager.listPlugins();

      console.log(JSON.stringify({
        plugins,
        count: plugins.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const pluginRegisterCommand = defineCommand({
  meta: {
    name: 'register',
    description: 'Register a new plugin',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Plugin name',
      required: true,
    },
    type: {
      type: 'string',
      description: 'Plugin type (command, skill, role, exporter)',
      required: true,
    },
    description: {
      type: 'string',
      description: 'Plugin description',
      required: true,
    },
    author: {
      type: 'string',
      description: 'Plugin author',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const pluginManager = createPluginManager();
      const plugin = {
        name: args.name,
        version: '1.0.0',
        description: args.description,
        author: args.author,
        type: args.type as any,
        enabled: true,
      };

      await pluginManager.registerPlugin(plugin);

      console.log(JSON.stringify({
        success: true,
        message: `Plugin ${args.name} registered`,
        plugin,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const pluginUnregisterCommand = defineCommand({
  meta: {
    name: 'unregister',
    description: 'Unregister a plugin',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Plugin name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const pluginManager = createPluginManager();
      await pluginManager.loadPlugins();
      const unregistered = await pluginManager.unregisterPlugin(args.name);

      if (!unregistered) {
        console.log(JSON.stringify({
          error: 'Plugin not found',
          name: args.name,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Plugin ${args.name} unregistered`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const pluginEnableCommand = defineCommand({
  meta: {
    name: 'enable',
    description: 'Enable a plugin',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Plugin name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const pluginManager = createPluginManager();
      await pluginManager.loadPlugins();
      const enabled = pluginManager.enablePlugin(args.name);

      if (!enabled) {
        console.log(JSON.stringify({
          error: 'Plugin not found',
          name: args.name,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Plugin ${args.name} enabled`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const pluginDisableCommand = defineCommand({
  meta: {
    name: 'disable',
    description: 'Disable a plugin',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Plugin name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const pluginManager = createPluginManager();
      await pluginManager.loadPlugins();
      const disabled = pluginManager.disablePlugin(args.name);

      if (!disabled) {
        console.log(JSON.stringify({
          error: 'Plugin not found',
          name: args.name,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Plugin ${args.name} disabled`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const pluginStatsCommand = defineCommand({
  meta: {
    name: 'stats',
    description: 'Get plugin statistics',
  },
  async run() {
    try {
      const pluginManager = createPluginManager();
      await pluginManager.loadPlugins();
      const stats = pluginManager.getStats();

      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'plugin',
    description: 'Manage CLI plugins',
  },
  subCommands: {
    list: pluginListCommand,
    register: pluginRegisterCommand,
    unregister: pluginUnregisterCommand,
    enable: pluginEnableCommand,
    disable: pluginDisableCommand,
    stats: pluginStatsCommand,
  },
});
