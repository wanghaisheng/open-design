import { defineCommand } from 'citty';
import { createMemoryManager } from '../rams/memory-manager.js';

const memoryStatusCommand = defineCommand({
  meta: {
    name: 'status',
    description: 'Get memory statistics',
  },
  async run() {
    try {
      const memoryManager = createMemoryManager();
      const stats = await memoryManager.getStats();

      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const memoryListCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List memory entries',
  },
  args: {
    type: {
      type: 'string',
      description: 'Filter by type (context, skill, role, workflow, learning)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const memoryManager = createMemoryManager();
      const entries = await memoryManager.list(args.type as any);

      console.log(JSON.stringify({
        entries,
        count: entries.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const memorySaveCommand = defineCommand({
  meta: {
    name: 'save',
    description: 'Save a memory entry',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Entry ID',
      required: true,
    },
    type: {
      type: 'string',
      description: 'Entry type (context, skill, role, workflow, learning)',
      required: true,
    },
    content: {
      type: 'string',
      description: 'Entry content (JSON string)',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const memoryManager = createMemoryManager();
      const content = JSON.parse(args.content);

      const entry = {
        id: args.id,
        type: args.type as any,
        timestamp: Date.now(),
        content,
      };

      await memoryManager.save(entry);

      console.log(JSON.stringify({
        success: true,
        message: `Memory entry ${args.id} saved`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const memoryLoadCommand = defineCommand({
  meta: {
    name: 'load',
    description: 'Load a memory entry',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Entry ID',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const memoryManager = createMemoryManager();
      const entry = await memoryManager.load(args.id);

      if (!entry) {
        console.log(JSON.stringify({
          error: 'Memory entry not found',
          id: args.id,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify(entry, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const memoryDeleteCommand = defineCommand({
  meta: {
    name: 'delete',
    description: 'Delete a memory entry',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Entry ID',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const memoryManager = createMemoryManager();
      const deleted = await memoryManager.delete(args.id);

      if (!deleted) {
        console.log(JSON.stringify({
          error: 'Memory entry not found',
          id: args.id,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Memory entry ${args.id} deleted`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const memoryCompressCommand = defineCommand({
  meta: {
    name: 'compress',
    description: 'Compress old memory entries',
  },
  async run() {
    try {
      const memoryManager = createMemoryManager();
      const deletedCount = await memoryManager.compress();

      console.log(JSON.stringify({
        success: true,
        deleted_count: deletedCount,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const memoryClearCommand = defineCommand({
  meta: {
    name: 'clear',
    description: 'Clear all memory entries',
  },
  async run() {
    try {
      const memoryManager = createMemoryManager();
      const deletedCount = await memoryManager.clear();

      console.log(JSON.stringify({
        success: true,
        deleted_count: deletedCount,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'memory',
    description: 'Manage RAMS framework memory',
  },
  subCommands: {
    status: memoryStatusCommand,
    list: memoryListCommand,
    save: memorySaveCommand,
    load: memoryLoadCommand,
    delete: memoryDeleteCommand,
    compress: memoryCompressCommand,
    clear: memoryClearCommand,
  },
});
