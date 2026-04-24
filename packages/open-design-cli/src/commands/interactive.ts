import { defineCommand } from 'citty';
import { createInteractiveMode } from '../rams/interactive-mode.js';

const interactiveStartCommand = defineCommand({
  meta: {
    name: 'start',
    description: 'Start an interactive session',
  },
  args: {
    role: {
      type: 'string',
      description: 'Role name (uses default if not specified)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const { createConfigManager } = await import('../utils/index.js');
      const configManager = createConfigManager();
      const config = await configManager.load();

      const roleName = args.role || config.role.default;
      const interactiveMode = createInteractiveMode();
      
      const session = await interactiveMode.startSession(roleName);

      console.log(JSON.stringify({
        success: true,
        message: `Interactive session started with role ${roleName}`,
        session_id: session.id,
        help: 'Type commands to interact. Type "help" for available commands.',
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const interactiveStatsCommand = defineCommand({
  meta: {
    name: 'stats',
    description: 'Get session statistics',
  },
  async run() {
    try {
      const interactiveMode = createInteractiveMode();
      const stats = interactiveMode.getSessionStats();

      if (!stats) {
        console.log(JSON.stringify({
          error: 'No active session',
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const interactiveEndCommand = defineCommand({
  meta: {
    name: 'end',
    description: 'End the current session',
  },
  async run() {
    try {
      const interactiveMode = createInteractiveMode();
      interactiveMode.endSession();

      console.log(JSON.stringify({
        success: true,
        message: 'Session ended',
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'interactive',
    description: 'Interactive mode for RAMS framework',
  },
  subCommands: {
    start: interactiveStartCommand,
    stats: interactiveStatsCommand,
    end: interactiveEndCommand,
  },
});
