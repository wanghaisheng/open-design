import { z } from 'zod';
import { parseFrontMatter } from '../parsers/index.js';

const DesignSpecSchema = z.object({
  version: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  colors: z.record(z.string()),
  typography: z.record(z.object({
    fontFamily: z.string(),
    fontSize: z.string(),
    fontWeight: z.number().optional(),
    lineHeight: z.union([z.string(), z.number()]),
    letterSpacing: z.string().optional(),
  })),
  rounded: z.record(z.string()),
  spacing: z.record(z.union([z.string(), z.number()])),
  breakpoints: z.record(z.string()).optional(),
  shadows: z.record(z.string()).optional(),
  borders: z.record(z.union([z.string(), z.number()])).optional(),
  accessibility: z.object({
    contrast: z.string(),
    focusVisible: z.boolean().optional(),
    reducedMotion: z.boolean().optional(),
  }).optional(),
  gradients: z.record(z.string()).optional(),
  components: z.record(z.record(z.union([z.string(), z.number()]))).optional(),
});

export function validateDesignSpec(content: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const frontMatter = parseFrontMatter(content);
    const result = DesignSpecSchema.safeParse(frontMatter);

    if (!result.success) {
      result.error.errors.forEach((err: any) => {
        errors.push(`Field validation error: ${err.path.join('.')} - ${err.message}`);
      });
    }

    // Check for required fields
    if (!frontMatter.name) {
      errors.push('Missing required field: name');
    }

    // Check for recommended fields
    if (!frontMatter.colors) {
      warnings.push('Missing recommended field: colors');
    }

    if (!frontMatter.typography) {
      warnings.push('Missing recommended field: typography');
    }

  } catch (error) {
    errors.push(`Failed to parse YAML front matter: ${error}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
