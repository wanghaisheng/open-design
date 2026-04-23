import { parseFrontMatter } from '../parsers/index.js';
import { validateDesignSpec } from './design-spec.js';
import { validateResearchSpec } from './research-spec.js';
import { validateStrategySpec } from './strategy-spec.js';
import { validateInteractionSpec } from './interaction-spec.js';
import { validateOpsSpec } from './ops-spec.js';

export { validateDesignSpec, validateResearchSpec, validateStrategySpec, validateInteractionSpec, validateOpsSpec };

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export function detectSpecType(content: string): string | null {
  try {
    const frontMatter = parseFrontMatter(content);
    
    // Check for design-spec specific fields
    if (frontMatter.colors && frontMatter.typography) {
      return 'design-spec';
    }
    
    // Check for research-spec specific fields
    if (frontMatter.spec_type === 'user-persona' || 
        frontMatter.spec_type === 'interview-script' || 
        frontMatter.spec_type === 'usability-test-plan' ||
        frontMatter.spec_type === 'journey-map' ||
        frontMatter.spec_type === 'research-report') {
      return 'research-spec';
    }
    
    // Check for strategy-spec specific fields
    if (frontMatter.spec_type === 'competitive-analysis' ||
        frontMatter.spec_type === 'design-principles' ||
        frontMatter.spec_type === 'experience-map' ||
        frontMatter.spec_type === 'problem-framing') {
      return 'strategy-spec';
    }
    
    // Check for interaction-spec specific fields
    if (frontMatter.spec_type === 'state-machine' ||
        frontMatter.spec_type === 'interaction-flow' ||
        frontMatter.spec_type === 'prototype' ||
        frontMatter.spec_type === 'interaction-spec') {
      return 'interaction-spec';
    }
    
    // Check for ops-spec specific fields
    if (frontMatter.spec_type === 'design-critique' ||
        frontMatter.spec_type === 'developer-handoff' ||
        frontMatter.spec_type === 'sprint-plan' ||
        frontMatter.spec_type === 'workflow') {
      return 'ops-spec';
    }
    
    // Fallback: check for spec_name field which is common to all non-design specs
    if (frontMatter.spec_name) {
      // Default to research-spec if spec_type is not set
      return 'research-spec';
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

export function validateSpec(content: string, specType?: string): ValidationResult {
  const detectedType = specType || detectSpecType(content);
  
  switch (detectedType) {
    case 'design-spec':
      return validateDesignSpec(content);
    case 'research-spec':
      return validateResearchSpec(content);
    case 'strategy-spec':
      return validateStrategySpec(content);
    case 'interaction-spec':
      return validateInteractionSpec(content);
    case 'ops-spec':
      return validateOpsSpec(content);
    default:
      return {
        valid: false,
        errors: ['Could not detect spec type. Please specify spec_type parameter.'],
        warnings: [],
      };
  }
}
