import { defineCommand } from 'citty';
import { createVariantManager } from '../rams/variant-manager.js';

const variantListCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all role variants',
  },
  async run() {
    try {
      const variantManager = createVariantManager();
      const variants = await variantManager.listVariants();

      console.log(JSON.stringify({
        variants,
        count: variants.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const variantCreateCommand = defineCommand({
  meta: {
    name: 'create',
    description: 'Create a new role variant',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Variant name',
      required: true,
    },
    base_role: {
      type: 'string',
      description: 'Base role name',
      required: true,
    },
    scenario: {
      type: 'string',
      description: 'Scenario (b2b, b2c, mobile, custom)',
      required: true,
    },
    description: {
      type: 'string',
      description: 'Variant description',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const variantManager = createVariantManager();
      const variant = await variantManager.createVariantFromTemplate(
        args.name,
        args.base_role,
        args.scenario as any,
        args.description
      );

      console.log(JSON.stringify({
        success: true,
        message: `Variant ${args.name} created`,
        variant,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const variantInfoCommand = defineCommand({
  meta: {
    name: 'info',
    description: 'Get detailed information about a variant',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Variant name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const variantManager = createVariantManager();
      const variant = await variantManager.loadVariant(args.name);

      console.log(JSON.stringify(variant, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const variantDeleteCommand = defineCommand({
  meta: {
    name: 'delete',
    description: 'Delete a variant',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Variant name',
      required: true,
    },
  },
  async run({ args }) {
    try {
      const variantManager = createVariantManager();
      const deleted = await variantManager.deleteVariant(args.name);

      if (!deleted) {
        console.log(JSON.stringify({
          error: 'Variant not found',
          name: args.name,
        }, null, 2));
        process.exitCode = 1;
        return;
      }

      console.log(JSON.stringify({
        success: true,
        message: `Variant ${args.name} deleted`,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const variantScenariosCommand = defineCommand({
  meta: {
    name: 'scenarios',
    description: 'List available scenarios',
  },
  async run() {
    try {
      const variantManager = createVariantManager();
      const scenarios = variantManager.getAvailableScenarios();

      console.log(JSON.stringify({
        scenarios,
        count: scenarios.length,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

export default defineCommand({
  meta: {
    name: 'variant',
    description: 'Manage RAMS framework role variants',
  },
  subCommands: {
    list: variantListCommand,
    create: variantCreateCommand,
    info: variantInfoCommand,
    delete: variantDeleteCommand,
    scenarios: variantScenariosCommand,
  },
});
