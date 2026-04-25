export interface RoleDefinition {
    name: string;
    version: string;
    description: string;
    tags: string[];
    capabilities: string[];
    soul_ref: string;
    skills: string[];
}
export interface SoulDefinition {
    name: string;
    version: string;
    description: string;
    core_traits: string[];
    work_principles: string[];
    professional_fields: string[];
    communication_style: string[];
}
export declare class RoleInstance {
    private rolePath;
    private roleDefinition;
    private soulDefinition;
    constructor(roleName: string, projectRoot?: string);
    /**
     * Load role definition from role.md
     */
    loadRole(): Promise<RoleDefinition>;
    /**
     * Extract skills from markdown content
     */
    private extractSkillsFromContent;
    /**
     * Load soul definition from soul.md
     */
    loadSoul(): Promise<SoulDefinition>;
    /**
     * Extract YAML frontmatter from markdown content
     */
    private extractFrontmatter;
    /**
     * Execute a skill with the role
     */
    executeSkill(skillName: string, input: any): Promise<any>;
    /**
     * Get role information
     */
    getInfo(): Promise<{
        role: RoleDefinition;
        soul: SoulDefinition;
        path: string;
    }>;
    /**
     * Check if role exists
     */
    exists(): boolean;
}
export declare class RoleManager {
    private projectRoot;
    constructor(projectRoot?: string);
    /**
     * List all available roles
     */
    listRoles(): Promise<string[]>;
    /**
     * Create a role instance
     */
    createRoleInstance(roleName: string): RoleInstance;
}
export declare function createRoleManager(projectRoot?: string): RoleManager;
//# sourceMappingURL=role-instance.d.ts.map