import { RoleInstance } from './role-instance.js';
export interface VariantDefinition {
    name: string;
    base_role: string;
    description: string;
    scenario: 'b2b' | 'b2c' | 'mobile' | 'custom';
    soul_overrides?: any;
    skill_overrides?: string[];
    metadata?: any;
}
export declare class VariantManager {
    private projectRoot;
    constructor(projectRoot?: string);
    /**
     * Get variants directory path
     */
    private getVariantsPath;
    /**
     * Ensure variants directory exists
     */
    private ensureVariantsDir;
    /**
     * Create a new variant
     */
    createVariant(variant: VariantDefinition): Promise<void>;
    /**
     * Load a variant
     */
    loadVariant(variantName: string): Promise<VariantDefinition>;
    /**
     * List all variants
     */
    listVariants(): Promise<VariantDefinition[]>;
    /**
     * Delete a variant
     */
    deleteVariant(variantName: string): Promise<boolean>;
    /**
     * Apply a variant to a role instance
     */
    applyVariant(roleInstance: RoleInstance, variantName: string): Promise<void>;
    /**
     * Get available scenarios
     */
    getAvailableScenarios(): VariantDefinition['scenario'][];
    /**
     * Create a variant from a template
     */
    createVariantFromTemplate(name: string, baseRole: string, scenario: VariantDefinition['scenario'], description: string): Promise<VariantDefinition>;
}
export declare function createVariantManager(projectRoot?: string): VariantManager;
//# sourceMappingURL=variant-manager.d.ts.map