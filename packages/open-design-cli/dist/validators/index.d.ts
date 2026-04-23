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
export declare function detectSpecType(content: string): string | null;
export declare function validateSpec(content: string, specType?: string): ValidationResult;
//# sourceMappingURL=index.d.ts.map