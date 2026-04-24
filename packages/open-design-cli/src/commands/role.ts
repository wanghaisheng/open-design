import { defineCommand } from 'citty';
import { createRoleManager } from '../rams/role-instance.js';

const executeRoleCommand = defineCommand({
  meta: {
    name: 'execute',
    description: 'Execute a role with a specific skill',
  },
  args: {
    role: {
      type: 'positional',
      description: 'Role name (e.g., design-lead)',
      required: true,
    },
    skill: {
      type: 'string',
      description: 'Skill name to execute',
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
      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(args.role);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: args.role,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      if (!args.skill) {
        const info = await roleInstance.getInfo();
        console.log(JSON.stringify({
          role: info.role,
          soul: info.soul,
          path: info.path,
        }, null, 2));
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

      const result = await roleInstance.executeSkill(args.skill, input);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const listRolesCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all available roles',
  },
  async run() {
    try {
      const roleManager = createRoleManager();
      const roles = await roleManager.listRoles();

      console.log(JSON.stringify({
        roles,
        count: roles.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const roleInfoCommand = defineCommand({
  meta: {
    name: 'info',
    description: 'Get detailed information about a role',
  },
  args: {
    role: {
      type: 'positional',
      description: 'Role name (e.g., design-lead)',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(args.role);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: args.role,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      const info = await roleInstance.getInfo();
      console.log(JSON.stringify(info, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const switchRoleCommand = defineCommand({
  meta: {
    name: 'switch',
    description: 'Switch the default role',
  },
  args: {
    role: {
      type: 'positional',
      description: 'Role name to switch to',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const { createConfigManager } = await import('../utils/index.js');
      const configManager = createConfigManager();

      const roleManager = createRoleManager();
      const roleInstance = roleManager.createRoleInstance(args.role);

      if (!roleInstance.exists()) {
        console.log(JSON.stringify({
          error: 'Role not found',
          role: args.role,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      await configManager.set('role.default', args.role);

      console.log(JSON.stringify({
        success: true,
        message: `Default role switched to ${args.role}`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'role',
    description: 'Execute and manage RAMS framework roles',
  },
  subCommands: {
    execute: executeRoleCommand,
    list: listRolesCommand,
    info: roleInfoCommand,
    switch: switchRoleCommand,
  },
});
