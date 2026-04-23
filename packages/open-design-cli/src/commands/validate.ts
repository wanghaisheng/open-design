import { defineCommand } from 'citty';
import { readFile, formatOutput } from '../utils/index.js';
import { validateSpec } from '../validators/index.js';

export default defineCommand({
  meta: {
    name: 'validate',
    description: 'Validate an actual document against its specification.',
  },
  args: {
    spec_file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    doc_file: {
      type: 'positional',
      description: 'Path to actual document to validate',
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
      const specContent = await readFile(args.spec_file);
      const docContent = await readFile(args.doc_file);

      // Validate specification file
      const specReport = validateSpec(specContent);
      
      // Validate document against specification
      const docReport = validateSpec(docContent);

      const output = {
        spec_validation: {
          valid: specReport.valid,
          errors: specReport.errors,
          warnings: specReport.warnings,
        },
        document_validation: {
          valid: docReport.valid,
          errors: docReport.errors,
          warnings: docReport.warnings,
        },
        summary: {
          spec_errors: specReport.errors.length,
          doc_errors: docReport.errors.length,
          total_errors: specReport.errors.length + docReport.errors.length,
        },
      };

      console.log(formatOutput(output, args));
      process.exitCode = output.summary.total_errors > 0 ? 1 : 0;
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});
