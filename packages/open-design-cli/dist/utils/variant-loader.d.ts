export interface SkillConfig {
    name: string;
    engine?: string;
    tools: string[];
    config: Record<string, any>;
}
export interface VariantConfig {
    name: string;
    base_role: string;
    additional_skills: string[];
    skill_overrides: Record<string, Record<string, any>>;
    skill_priority: Record<string, number>;
    description: string;
    tags: string[];
}
export interface RoleConfig {
    name: string;
    skills: Record<string, SkillConfig>;
    description: string;
    variants: string[];
}
export declare class VariantLoader {
    private rolesDir;
    private skillsDir;
    private roleCache;
    private variantCache;
    constructor(rolesDir: string, skillsDir: string);
    loadRole(roleName: string): Promise<RoleConfig>;
    private loadVariantsYaml;
    loadVariant(variantName: string): Promise<RoleConfig>;
    private findVariant;
    private mergeSkills;
    private resolveConflicts;
    listVariants(roleName?: string): Promise<string[]>;
    validateVariant(variantName: string): Promise<string[]>;
}
//# sourceMappingURL=variant-loader.d.ts.map