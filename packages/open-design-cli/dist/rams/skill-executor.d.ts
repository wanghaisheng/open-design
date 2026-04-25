import { RoleInstance } from './role-instance.js';
export interface SkillDefinition {
    name: string;
    description: string;
    input_schema?: any;
    output_schema?: any;
    implementation_channel: 'ai_model' | 'software_tool';
    runtime_requirements?: string[];
}
export declare class SkillExecutor {
    private roleInstance;
    constructor(roleInstance: RoleInstance);
    /**
     * Execute a skill
     */
    execute(skillName: string, input: any): Promise<any>;
    /**
     * List all skills for the role
     */
    listSkills(): Promise<string[]>;
    /**
     * Get skill information
     */
    getSkillInfo(skillName: string): Promise<SkillDefinition>;
    /**
     * Test a skill with a test case
     */
    testSkill(skillName: string, testCase: any): Promise<any>;
}
export declare function createSkillExecutor(roleInstance: RoleInstance): SkillExecutor;
//# sourceMappingURL=skill-executor.d.ts.map