import { defineCommand } from 'citty';
import { readFile, formatOutput } from '../utils/index.js';
import { validateSpec } from '../validators/index.js';

export default defineCommand({
  meta: {
    name: 'lint',
    description: 'Validate a specification document for structural correctness.',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to spec file (use "-" for stdin)',
      required: true,
    },
    format: {
      type: 'string',
      description: 'Output format: json or text',
      default: 'json',
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const report = validateSpec(content);

      const output = {
        valid: report.valid,
        errors: report.errors,
        warnings: report.warnings,
        summary: {
          errors: report.errors.length,
          warnings: report.warnings.length,
        },
      };

      console.log(formatOutput(output, args));
      process.exitCode = report.errors.length > 0 ? 1 : 0;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});
