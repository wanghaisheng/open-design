import { defineCommand } from 'citty';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

export default defineCommand({
  meta: {
    name: 'template',
    description: 'Generate a document template based on specification type.',
  },
  args: {
    spec_type: {
      type: 'positional',
      description: 'Specification type (design-spec, research-spec, strategy-spec, interaction-spec, ops-spec)',
      required: true,
    },
    doc_type: {
      type: 'string',
      description: 'Document type within spec (e.g., user-persona for research-spec)',
      required: false,
    },
    output: {
      type: 'string',
      description: 'Output directory',
      required: false,
    },
  },
  async run({ args }) {
    try {
      const specType = args.spec_type;
      const docType = args.doc_type;
      const outputDir = args.output || './templates';

      // Create output directory if it doesn't exist
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      // Generate template based on spec type
      let template: string;
      let filename: string;

      switch (specType) {
        case 'design-spec':
          template = generateDesignSpecTemplate();
          filename = 'DESIGN-SPEC.md';
          break;
        case 'research-spec':
          template = generateResearchSpecTemplate(docType);
          filename = docType ? `${docType}.md` : 'RESEARCH-SPEC.md';
          break;
        case 'strategy-spec':
          template = generateStrategySpecTemplate(docType);
          filename = docType ? `${docType}.md` : 'STRATEGY-SPEC.md';
          break;
        case 'interaction-spec':
          template = generateInteractionSpecTemplate(docType);
          filename = docType ? `${docType}.md` : 'INTERACTION-SPEC.md';
          break;
        case 'ops-spec':
          template = generateOpsSpecTemplate(docType);
          filename = docType ? `${docType}.md` : 'OPS-SPEC.md';
          break;
        default:
          throw new Error(`Unknown spec type: ${specType}`);
      }

      const outputPath = resolve(outputDir, filename);
      writeFileSync(outputPath, template, 'utf-8');

      console.log(JSON.stringify({
        success: true,
        message: `Template generated at ${outputPath}`,
        path: outputPath,
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ error: (error as Error).message }, null, 2));
      process.exitCode = 1;
    }
  },
});

function generateDesignSpecTemplate(): string {
  return `---
version: "1.0"
name: "Design System Name"
description: "Design system description"
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 12px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

# Design System Name

## Overview
Design system overview and philosophy

## Colors
Color palette description

## Typography
Typography system description

## Layout
Layout and spacing strategy

## Components
Component style guidelines

## Do's and Don'ts
- Best practices
`;
}

function generateResearchSpecTemplate(docType?: string): string {
  const docName = docType || 'research';
  return `---
spec_name: "${docName} name"
spec_type: ${docType || 'user-persona'}
created_date: ${new Date().toISOString().split('T')[0]}
last_updated: ${new Date().toISOString().split('T')[0]}
---

# ${docName} Title

## Overview
Document overview

## Content
Document content follows the specification format
`;
}

function generateStrategySpecTemplate(docType?: string): string {
  const docName = docType || 'strategy';
  return `---
spec_name: "${docName} name"
spec_type: ${docType || 'competitive-analysis'}
created_date: ${new Date().toISOString().split('T')[0]}
last_updated: ${new Date().toISOString().split('T')[0]}
---

# ${docName} Title

## Overview
Document overview

## Content
Document content follows the specification format
`;
}

function generateInteractionSpecTemplate(docType?: string): string {
  const docName = docType || 'interaction';
  return `---
spec_name: "${docName} name"
spec_type: ${docType || 'state-machine'}
created_date: ${new Date().toISOString().split('T')[0]}
last_updated: ${new Date().toISOString().split('T')[0]}
---

# ${docName} Title

## Overview
Document overview

## Content
Document content follows the specification format
`;
}

function generateOpsSpecTemplate(docType?: string): string {
  const docName = docType || 'ops';
  return `---
spec_name: "${docName} name"
spec_type: ${docType || 'design-critique'}
created_date: ${new Date().toISOString().split('T')[0]}
last_updated: ${new Date().toISOString().split('T')[0]}
---

# ${docName} Title

## Overview
Document overview

## Content
Document content follows the specification format
`;
}
