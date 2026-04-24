import { defineCommand } from 'citty';
import { readFile } from '../utils/index.js';
import { parseFrontMatter } from '../parsers/index.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { stringify } from 'yaml';

const exportFormatsCommand = defineCommand({
  meta: {
    name: 'formats',
    description: 'List available export formats',
  },
  async run() {
    console.log(JSON.stringify({
      formats: ['json', 'yaml', 'html', 'typescript', 'markdown', 'csv'],
      description: 'Available export formats',
    }, null, 2));
  },
});

const exportJsonCommand = defineCommand({
  meta: {
    name: 'json',
    description: 'Export to JSON format',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);
      const body = content.split('---').slice(2).join('---').trim();

      const output = JSON.stringify({
        frontMatter,
        body,
      }, null, 2);

      await writeOutput(args.output, output, 'json');
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const exportYamlCommand = defineCommand({
  meta: {
    name: 'yaml',
    description: 'Export to YAML format',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);
      const body = content.split('---').slice(2).join('---').trim();

      const output = stringify({
        frontMatter,
        body,
      });

      await writeOutput(args.output, output, 'yaml');
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const exportHtmlCommand = defineCommand({
  meta: {
    name: 'html',
    description: 'Export to HTML format',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);
      const body = content.split('---').slice(2).join('---').trim();

      const output = generateHTML(frontMatter, body);
      await writeOutput(args.output, output, 'html');
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const exportTypescriptCommand = defineCommand({
  meta: {
    name: 'typescript',
    description: 'Export to TypeScript types',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);

      const output = generateTypeScriptTypes(frontMatter);
      await writeOutput(args.output, output, 'typescript');
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const exportMarkdownCommand = defineCommand({
  meta: {
    name: 'markdown',
    description: 'Export to Markdown format',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);
      const body = content.split('---').slice(2).join('---').trim();

      const output = generateMarkdown(frontMatter, body);
      await writeOutput(args.output, output, 'markdown');
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

const exportCsvCommand = defineCommand({
  meta: {
    name: 'csv',
    description: 'Export design tokens to CSV format',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);

      const output = generateCSV(frontMatter);
      await writeOutput(args.output, output, 'csv');
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

async function writeOutput(outputPath: string | undefined, content: string, format: string): Promise<void> {
  if (outputPath) {
    const path = resolve(outputPath);
    writeFileSync(path, content, 'utf-8');
    console.log(JSON.stringify({
      success: true,
      message: `Exported to ${outputPath}`,
      path,
      format,
    }, null, 2));
  } else {
    console.log(content);
  }
}

function generateTypeScriptTypes(frontMatter: any): string {
  let types = '// Auto-generated TypeScript types\n\n';

  if (frontMatter.colors) {
    types += 'export type Colors = {\n';
    for (const [key, value] of Object.entries(frontMatter.colors)) {
      types += `  '${key}': '${value}';\n`;
    }
    types += '};\n\n';
  }

  if (frontMatter.typography) {
    types += 'export type Typography = {\n';
    for (const [key, value] of Object.entries(frontMatter.typography)) {
      types += `  '${key}': {\n`;
      if (typeof value === 'object' && value !== null) {
        for (const [k, v] of Object.entries(value)) {
          types += `    '${k}': ${typeof v === 'string' ? `'${v}'` : v};\n`;
        }
      }
      types += '  };\n';
    }
    types += '};\n\n';
  }

  if (frontMatter.spacing) {
    types += 'export type Spacing = {\n';
    for (const [key, value] of Object.entries(frontMatter.spacing)) {
      types += `  '${key}': ${typeof value === 'string' ? `'${value}'` : value};\n`;
    }
    types += '};\n\n';
  }

  if (frontMatter.components) {
    types += 'export type Components = {\n';
    for (const [key, value] of Object.entries(frontMatter.components)) {
      types += `  '${key}': {\n`;
      if (typeof value === 'object' && value !== null) {
        for (const [k, v] of Object.entries(value)) {
          types += `    '${k}': ${typeof v === 'string' ? `'${v}'` : v};\n`;
        }
      }
      types += '  };\n';
    }
    types += '};\n\n';
  }

  return types;
}

function generateHTML(frontMatter: any, body: string): string {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${frontMatter.name || 'Design Specification'}</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
        pre { background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow-x: auto; }
        code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>${frontMatter.name || 'Design Specification'}</h1>
    ${frontMatter.description ? `<p>${frontMatter.description}</p>` : ''}
`;

  if (frontMatter.colors) {
    html += '<h2>Colors</h2><ul>';
    for (const [key, value] of Object.entries(frontMatter.colors)) {
      html += `<li><span style="display:inline-block;width:20px;height:20px;background:${value};margin-right:8px;"></span>${key}: ${value}</li>`;
    }
    html += '</ul>';
  }

  html += `<h2>Content</h2>
    <pre><code>${body}</code></pre>
</body>
</html>`;

  return html;
}

function generateMarkdown(frontMatter: any, body: string): string {
  let md = `# ${frontMatter.name || 'Design Specification'}\n\n`;
  
  if (frontMatter.description) {
    md += `${frontMatter.description}\n\n`;
  }

  if (frontMatter.colors) {
    md += '## Colors\n\n';
    for (const [key, value] of Object.entries(frontMatter.colors)) {
      md += `- **${key}**: ${value}\n`;
    }
    md += '\n';
  }

  if (frontMatter.typography) {
    md += '## Typography\n\n';
    for (const [key, value] of Object.entries(frontMatter.typography)) {
      md += `### ${key}\n\n`;
      if (typeof value === 'object' && value !== null) {
        for (const [k, v] of Object.entries(value)) {
          md += `- ${k}: ${v}\n`;
        }
      }
      md += '\n';
    }
  }

  md += '## Content\n\n';
  md += body;

  return md;
}

function generateCSV(frontMatter: any): string {
  let csv = 'type,name,value\n';

  if (frontMatter.colors) {
    for (const [key, value] of Object.entries(frontMatter.colors)) {
      csv += `color,${key},${value}\n`;
    }
  }

  if (frontMatter.spacing) {
    for (const [key, value] of Object.entries(frontMatter.spacing)) {
      csv += `spacing,${key},${value}\n`;
    }
  }

  return csv;
}

export default defineCommand({
  meta: {
    name: 'export',
    description: 'Export specification document to other formats',
  },
  subCommands: {
    formats: exportFormatsCommand,
    json: exportJsonCommand,
    yaml: exportYamlCommand,
    html: exportHtmlCommand,
    typescript: exportTypescriptCommand,
    markdown: exportMarkdownCommand,
    csv: exportCsvCommand,
  },
});
