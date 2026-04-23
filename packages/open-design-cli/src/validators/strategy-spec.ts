import { z } from 'zod';
import { parseFrontMatter } from '../parsers/index.js';

const StrategySpecSchema = z.object({
  spec_name: z.string(),
  spec_type: z.enum(['competitive-analysis', 'design-principles', 'experience-map', 'problem-framing']),
  created_date: z.string().optional(),
  last_updated: z.string().optional(),
});

export function validateStrategySpec(content: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const frontMatter = parseFrontMatter(content);
    const result = StrategySpecSchema.safeParse(frontMatter);

    if (!result.success) {
      result.error.errors.forEach((err: any) => {
        errors.push(`Field validation error: ${err.path.join('.')} - ${err.message}`);
      });
    }

    // Check for required fields
    if (!frontMatter.spec_name) {
      errors.push('Missing required field: spec_name');
    }

    if (!frontMatter.spec_type) {
      errors.push('Missing required field: spec_type');
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
