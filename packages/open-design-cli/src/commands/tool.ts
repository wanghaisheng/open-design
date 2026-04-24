import { defineCommand } from 'citty';
import { createToolExecutor } from '../rams/tool-executor.js';

const toolListCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all available tools',
  },
  async run() {
    try {
      const toolExecutor = createToolExecutor();
      const tools = toolExecutor.listTools();

      console.log(JSON.stringify({
        tools,
        count: tools.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const toolExecuteCommand = defineCommand({
  meta: {
    name: 'execute',
    description: 'Execute a tool with a script',
  },
  args: {
    tool: {
      type: 'positional',
      description: 'Tool name (python, node, bun)',
      required: true,
    },
    script: {
      type: 'string',
      description: 'Script to execute',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const toolExecutor = createToolExecutor();
      const result = await toolExecutor.execute(args.tool, args.script);

      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.success ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const toolCheckCommand = defineCommand({
  meta: {
    name: 'check',
    description: 'Check if a tool is available',
  },
  args: {
    tool: {
      type: 'positional',
      description: 'Tool name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const toolExecutor = createToolExecutor();
      const available = await toolExecutor.isToolAvailable(args.tool);

      console.log(JSON.stringify({
        tool: args.tool,
        available,
      }, null, 2));

      process.exitCode = available ? 0 : 1;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const toolEnableCommand = defineCommand({
  meta: {
    name: 'enable',
    description: 'Enable a tool',
  },
  args: {
    tool: {
      type: 'positional',
      description: 'Tool name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const toolExecutor = createToolExecutor();
      const enabled = toolExecutor.enableTool(args.tool);

      if (!enabled) {
        console.log(JSON.stringify({
          error: 'Tool not found',
          tool: args.tool,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Tool ${args.tool} enabled`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const toolDisableCommand = defineCommand({
  meta: {
    name: 'disable',
    description: 'Disable a tool',
  },
  args: {
    tool: {
      type: 'positional',
      description: 'Tool name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const toolExecutor = createToolExecutor();
      const disabled = toolExecutor.disableTool(args.tool);

      if (!disabled) {
        console.log(JSON.stringify({
          error: 'Tool not found',
          tool: args.tool,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Tool ${args.tool} disabled`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'tool',
    description: 'Manage software tool execution channels',
  },
  subCommands: {
    list: toolListCommand,
    execute: toolExecuteCommand,
    check: toolCheckCommand,
    enable: toolEnableCommand,
    disable: toolDisableCommand,
  },
});
