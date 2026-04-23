import { defineCommand } from 'citty';
import { readFile } from '../utils/index.js';
import { parseFrontMatter } from '../parsers/index.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineCommand({
  meta: {
    name: 'export',
    description: 'Export specification document to other formats.',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to specification file',
      required: true,
    },
    format: {
      type: 'string',
      description: 'Output format: json, html, typescript',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output file path (optional, defaults to stdout)',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const content = await readFile(args.file);
      const frontMatter = parseFrontMatter(content);
      const body = content.split('---').slice(2).join('---').trim();

      let output: string;

      switch (args.format) {
        case 'json':
          output = JSON.stringify({
            frontMatter,
            body,
          }, null, 2);
          break;
        case 'typescript':
          output = generateTypeScriptTypes(frontMatter);
          break;
        case 'html':
          output = generateHTML(frontMatter, body);
          break;
        default:
          throw new Error(`Unknown format: ${args.format}`);
      }

      if (args.output) {
        const outputPath = resolve(args.output);
        writeFileSync(outputPath, output, 'utf-8');
        console.log(JSON.stringify({
          success: true,
          message: `Exported to ${args.output}`,
          path: outputPath,
        }, null, 2));
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

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
