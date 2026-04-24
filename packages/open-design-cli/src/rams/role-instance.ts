import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'yaml';

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

export class RoleInstance {
  private rolePath: string;
  private roleDefinition: RoleDefinition | null = null;
  private soulDefinition: SoulDefinition | null = null;

  constructor(roleName: string, projectRoot: string = process.cwd()) {
    this.rolePath = resolve(projectRoot, '.claude', 'roles', roleName);
  }

  /**
   * Load role definition from role.md
   */
  async loadRole(): Promise<RoleDefinition> {
    if (this.roleDefinition) {
      return this.roleDefinition;
    }

    const roleFile = resolve(this.rolePath, 'role.md');
    if (!existsSync(roleFile)) {
      throw new Error(`Role definition not found: ${roleFile}`);
    }

    try {
      const content = readFileSync(roleFile, 'utf-8');
      const frontmatter = this.extractFrontmatter(content);
      const parsed = parse(frontmatter) as any;
      
      // Extract skills from markdown content if not in frontmatter
      const skills = parsed.skills || this.extractSkillsFromContent(content);
      
      this.roleDefinition = {
        name: parsed.name,
        version: parsed.version,
        description: parsed.description,
        tags: parsed.tags || [],
        capabilities: parsed.capabilities || [],
        soul_ref: parsed.soul_ref,
        skills,
      };
      return this.roleDefinition;
    } catch (error) {
      throw new Error(`Failed to load role definition: ${(error as Error).message}`);
    }
  }

  /**
   * Extract skills from markdown content
   */
  private extractSkillsFromContent(_content: string): string[] {
    // For now, return a hardcoded list of common skills
    // TODO: Implement proper parsing of markdown content
    const commonSkills = [
      'design-state',
      'design-taste',
      'taste-feedback',
      'token-architecture',
      'design-system-alignment',
      'ui-composition',
      'responsive-patterns',
      'interaction-design',
      'adaptive-interfaces',
      'using-designpowers',
    ];
    
    return commonSkills;
  }

  /**
   * Load soul definition from soul.md
   */
  async loadSoul(): Promise<SoulDefinition> {
    if (this.soulDefinition) {
      return this.soulDefinition;
    }

    const roleDef = await this.loadRole();
    const soulFile = resolve(this.rolePath, roleDef.soul_ref);

    if (!existsSync(soulFile)) {
      throw new Error(`Soul definition not found: ${soulFile}`);
    }

    try {
      const content = readFileSync(soulFile, 'utf-8');
      const frontmatter = this.extractFrontmatter(content);
      this.soulDefinition = parse(frontmatter) as SoulDefinition;
      return this.soulDefinition;
    } catch (error) {
      throw new Error(`Failed to load soul definition: ${(error as Error).message}`);
    }
  }

  /**
   * Extract YAML frontmatter from markdown content
   */
  private extractFrontmatter(content: string): string {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      throw new Error('No YAML frontmatter found');
    }
    return match[1];
  }

  /**
   * Execute a skill with the role
   */
  async executeSkill(skillName: string, input: any): Promise<any> {
    const roleDef = await this.loadRole();
    
    if (!roleDef.skills.includes(skillName)) {
      throw new Error(`Skill ${skillName} not found in role ${roleDef.name}`);
    }

    // For now, return a placeholder
    // In a full implementation, this would:
    // 1. Load the skill definition
    // 2. Select the implementation channel (AI model or software tool)
    // 3. Execute the skill
    // 4. Return the result
    
    return {
      role: roleDef.name,
      skill: skillName,
      input,
      output: `Executed ${skillName} with role ${roleDef.name}`,
    };
  }

  /**
   * Get role information
   */
  async getInfo(): Promise<{
    role: RoleDefinition;
    soul: SoulDefinition;
    path: string;
  }> {
    const role = await this.loadRole();
    const soul = await this.loadSoul();
    
    return {
      role,
      soul,
      path: this.rolePath,
    };
  }

  /**
   * Check if role exists
   */
  exists(): boolean {
    return existsSync(resolve(this.rolePath, 'role.md'));
  }
}

export class RoleManager {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * List all available roles
   */
  async listRoles(): Promise<string[]> {
    const rolesPath = resolve(this.projectRoot, '.claude', 'roles');
    
    if (!existsSync(rolesPath)) {
      return [];
    }

    const entries = readdirSync(rolesPath, { withFileTypes: true });
    
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  }

  /**
   * Create a role instance
   */
  createRoleInstance(roleName: string): RoleInstance {
    return new RoleInstance(roleName, this.projectRoot);
  }
}

export function createRoleManager(projectRoot?: string): RoleManager {
  return new RoleManager(projectRoot);
}
