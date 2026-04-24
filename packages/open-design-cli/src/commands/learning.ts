import { defineCommand } from 'citty';
import { createLearningManager } from '../rams/learning-manager.js';

const learningStatsCommand = defineCommand({
  meta: {
    name: 'stats',
    description: 'Get learning statistics',
  },
  async run() {
    try {
      const learningManager = createLearningManager();
      const stats = await learningManager.getStats();

      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const learningReportCommand = defineCommand({
  meta: {
    name: 'report',
    description: 'Generate a learning report',
  },
  async run() {
    try {
      const learningManager = createLearningManager();
      const report = await learningManager.generateReport();

      console.log(JSON.stringify(report, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const learningRecordCommand = defineCommand({
  meta: {
    name: 'record',
    description: 'Record a task execution for learning',
  },
  args: {
    task_id: {
      type: 'positional',
      description: 'Task ID',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Role name',
      required: true,
    },
    skill: {
      type: 'string',
      description: 'Skill name',
      required: true,
    },
    success: {
      type: 'string',
      description: 'Success (true/false)',
      required: true,
    },
    duration: {
      type: 'string',
      description: 'Duration in milliseconds',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const learningManager = createLearningManager();
      const entry = {
        id: `${args.task_id}-${Date.now()}`,
        task_id: args.task_id,
        role: args.role,
        skill: args.skill,
        timestamp: Date.now(),
        success: args.success === 'true',
        duration_ms: parseInt(args.duration, 10),
        input: {},
        output: {},
      };

      await learningManager.recordExecution(entry);

      console.log(JSON.stringify({
        success: true,
        message: 'Execution recorded for learning',
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const learningInsightsCommand = defineCommand({
  meta: {
    name: 'insights',
    description: 'Analyze patterns and generate insights',
  },
  async run() {
    try {
      const learningManager = createLearningManager();
      const insights = await learningManager.analyzePatterns();

      console.log(JSON.stringify({
        insights,
        count: insights.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const learningClearCommand = defineCommand({
  meta: {
    name: 'clear',
    description: 'Clear all learning data',
  },
  async run() {
    try {
      const learningManager = createLearningManager();
      const deletedCount = await learningManager.clearLearning();

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
    name: 'learning',
    description: 'Manage post-task learning and insights',
  },
  subCommands: {
    stats: learningStatsCommand,
    report: learningReportCommand,
    record: learningRecordCommand,
    insights: learningInsightsCommand,
    clear: learningClearCommand,
  },
});
