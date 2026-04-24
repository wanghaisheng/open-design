import { defineCommand } from 'citty';
import { createRoleManager } from '../rams/role-instance.js';
import { createSkillExecutor } from '../rams/skill-executor.js';

const executeSkillCommand = defineCommand({
  meta: {
    name: 'execute',
    description: 'Execute a specific skill',
  },
  args: {
    skill: {
      type: 'positional',
      description: 'Skill name to execute',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Role name (uses default if not specified)',
      required: false,
    },
    input: {
      type: 'string',
      description: 'Input data (JSON string)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const { createConfigManager } = await import('../utils/index.js');
      const configManager = createConfigManager();
      const config = await configManager.load();

      const roleName = args.role || config.role.default;
      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(roleName);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: roleName,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      let input: any = {};
      if (args.input) {
        try {
          input = JSON.parse(args.input);
        } catch {
          input = { message: args.input };
        }
      }

      const skillExecutor = createSkillExecutor(roleInstance);
      const result = await skillExecutor.execute(args.skill, input);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const listSkillsCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all skills for a role',
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
      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(roleName);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: roleName,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      const skillExecutor = createSkillExecutor(roleInstance);
      const skills = await skillExecutor.listSkills();

      console.log(JSON.stringify({
        role: roleName,
        skills,
        count: skills.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const skillInfoCommand = defineCommand({
  meta: {
    name: 'info',
    description: 'Get detailed information about a skill',
  },
  args: {
    skill: {
      type: 'positional',
      description: 'Skill name',
      required: true,
    },
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
      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(roleName);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: roleName,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      const skillExecutor = createSkillExecutor(roleInstance);
      const info = await skillExecutor.getSkillInfo(args.skill);
      console.log(JSON.stringify(info, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const testSkillCommand = defineCommand({
  meta: {
    name: 'test',
    description: 'Test a skill with a test case',
  },
  args: {
    skill: {
      type: 'positional',
      description: 'Skill name to test',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Role name (uses default if not specified)',
      required: false,
    },
    input: {
      type: 'string',
      description: 'Test input data (JSON string)',
      required: false,
    },
    expected: {
      type: 'string',
      description: 'Expected output (JSON string)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const { createConfigManager } = await import('../utils/index.js');
      const configManager = createConfigManager();
      const config = await configManager.load();

      const roleName = args.role || config.role.default;
      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(roleName);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: roleName,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      let input: any = {};
      if (args.input) {
        try {
          input = JSON.parse(args.input);
        } catch {
          input = { message: args.input };
        }
      }

      let expectedOutput: any;
      if (args.expected) {
        try {
          expectedOutput = JSON.parse(args.expected);
        } catch {
          expectedOutput = args.expected;
        }
      }

      const skillExecutor = createSkillExecutor(roleInstance);
      const testCase = {
        input,
        expected_output: expectedOutput,
      };
      const result = await skillExecutor.testSkill(args.skill, testCase);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'skill',
    description: 'Execute and manage RAMS framework skills',
  },
  subCommands: {
    execute: executeSkillCommand,
    list: listSkillsCommand,
    info: skillInfoCommand,
    test: testSkillCommand,
  },
});
