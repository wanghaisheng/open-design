import { readFile, fileExists } from './file-utils.js';
import { join } from 'path';
import YAML from 'yaml';

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

export class VariantLoader {
  private rolesDir: string;
  private skillsDir: string;
  private roleCache: Map<string, RoleConfig>;
  private variantCache: Map<string, VariantConfig>;

  constructor(rolesDir: string, skillsDir: string) {
    this.rolesDir = rolesDir;
    this.skillsDir = skillsDir;
    this.roleCache = new Map();
    this.variantCache = new Map();
  }

  async loadRole(roleName: string): Promise<RoleConfig> {
    if (this.roleCache.has(roleName)) {
      return this.roleCache.get(roleName)!;
    }

    const rolePath = join(this.rolesDir, roleName, 'role.md');
    if (!(await fileExists(rolePath))) {
      throw new Error(`Role not found: ${roleName}`);
    }

    // Parse role.md to extract skills
    // This is a simplified implementation
    // In production, you'd parse the markdown properly
    const roleConfig: RoleConfig = {
      name: roleName,
      skills: {},
      description: '',
      variants: [],
    };

    // Load variants if they exist
    const variantsPath = join(this.rolesDir, roleName, 'variants.yaml');
    if (await fileExists(variantsPath)) {
      const variants = await this.loadVariantsYaml(variantsPath);
      roleConfig.variants = variants.map(v => v.name);
      for (const variant of variants) {
        this.variantCache.set(variant.name, variant);
      }
    }

    this.roleCache.set(roleName, roleConfig);
    return roleConfig;
  }

  private async loadVariantsYaml(variantsPath: string): Promise<VariantConfig[]> {
    const content = await readFile(variantsPath);
    const data = YAML.parse(content);

    const variants: VariantConfig[] = [];
    for (const variantData of data.variants || []) {
      const variant: VariantConfig = {
        name: variantData.name,
        base_role: variantData.base_role,
        additional_skills: variantData.additional_skills || [],
        skill_overrides: variantData.skill_overrides || {},
        skill_priority: variantData.skill_priority || {},
        description: variantData.description || '',
        tags: variantData.tags || [],
      };
      variants.push(variant);
    }

    return variants;
  }

  async loadVariant(variantName: string): Promise<RoleConfig> {
    // Find variant in cache
    let variant = this.variantCache.get(variantName);
    if (!variant) {
      // Try to find it by scanning all roles
      variant = await this.findVariant(variantName);
      if (!variant) {
        throw new Error(`Variant not found: ${variantName}`);
      }
    }

    // Load base role
    const baseRole = await this.loadRole(variant.base_role);

    // Merge skills
    const mergedSkills = this.mergeSkills(
      baseRole.skills,
      variant.additional_skills
    );

    // Apply skill overrides
    for (const [skillName, overrideConfig] of Object.entries(variant.skill_overrides)) {
      if (skillName in mergedSkills) {
        const skill = mergedSkills[skillName];
        for (const [key, value] of Object.entries(overrideConfig)) {
          (skill as any)[key] = value;
        }
      }
    }

    // Resolve conflicts based on priority
    const resolvedSkills = this.resolveConflicts(
      mergedSkills,
      variant.skill_priority
    );

    // Create new role config
    const variantRole: RoleConfig = {
      name: variant.name,
      skills: resolvedSkills,
      description: variant.description,
      variants: [],
    };

    return variantRole;
  }

  private async findVariant(variantName: string): Promise<VariantConfig | undefined> {
    const fs = await import('fs/promises');
    const { readdir } = fs;
    
    try {
      const roleDirs = await readdir(this.rolesDir, { withFileTypes: true });
      for (const roleDir of roleDirs) {
        if (roleDir.isDirectory()) {
          const variantsPath = join(this.rolesDir, roleDir.name, 'variants.yaml');
          if (await fileExists(variantsPath)) {
            const variants = await this.loadVariantsYaml(variantsPath);
            for (const variant of variants) {
              if (variant.name === variantName) {
                this.variantCache.set(variant.name, variant);
                return variant;
              }
            }
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
    
    return undefined;
  }

  private mergeSkills(
    baseSkills: Record<string, SkillConfig>,
    additionalSkillNames: string[]
  ): Record<string, SkillConfig> {
    const merged: Record<string, SkillConfig> = { ...baseSkills };

    for (const skillName of additionalSkillNames) {
      // Simplified - just create a basic skill config
      const skillConfig: SkillConfig = {
        name: skillName,
        tools: [],
        config: {},
      };
      merged[skillName] = skillConfig;
    }

    return merged;
  }

  private resolveConflicts(
    skills: Record<string, SkillConfig>,
    priorities: Record<string, number>
  ): Record<string, SkillConfig> {
    // If no priorities, return as-is
    if (Object.keys(priorities).length === 0) {
      return skills;
    }

    // Sort skills by priority
    const sortedSkills = Object.entries(skills).sort(
      ([nameA], [nameB]) => {
        const priorityA = priorities[nameA] || 0;
        const priorityB = priorities[nameB] || 0;
        return priorityB - priorityA; // Higher priority first
      }
    );

    const resolved: Record<string, SkillConfig> = {};
    for (const [name, skill] of sortedSkills) {
      resolved[name] = skill;
    }

    return resolved;
  }

  async listVariants(roleName?: string): Promise<string[]> {
    if (roleName) {
      const role = await this.loadRole(roleName);
      return role.variants;
    }

    // List all variants
    const allVariants: string[] = [];
    const fs = await import('fs/promises');
    const { readdir } = fs;
    
    try {
      const roleDirs = await readdir(this.rolesDir, { withFileTypes: true });
      for (const roleDir of roleDirs) {
        if (roleDir.isDirectory()) {
          const variantsPath = join(this.rolesDir, roleDir.name, 'variants.yaml');
          if (await fileExists(variantsPath)) {
            const variants = await this.loadVariantsYaml(variantsPath);
            allVariants.push(...variants.map(v => v.name));
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }

    return allVariants;
  }

  async validateVariant(variantName: string): Promise<string[]> {
    const errors: string[] = [];

    try {
      let variant = this.variantCache.get(variantName);
      if (!variant) {
        variant = await this.findVariant(variantName);
        if (!variant) {
          errors.push(`Variant not found: ${variantName}`);
          return errors;
        }
      }

      // Validate base role exists
      const baseRolePath = join(this.rolesDir, variant.base_role, 'role.md');
      if (!(await fileExists(baseRolePath))) {
        errors.push(`Base role not found: ${variant.base_role}`);
      }

      // Validate additional skills exist
      for (const skillName of variant.additional_skills) {
        const skillPath = join(this.skillsDir, skillName, 'SKILL.md');
        if (!(await fileExists(skillPath))) {
          errors.push(`Skill not found: ${skillName}`);
        }
      }

      // Validate skill overrides reference existing skills
      for (const skillName of Object.keys(variant.skill_overrides)) {
        if (!variant.additional_skills.includes(skillName)) {
          // Check if it's in base role
          const baseRole = await this.loadRole(variant.base_role);
          if (!(skillName in baseRole.skills)) {
            errors.push(`Skill override references non-existent skill: ${skillName}`);
          }
        }
      }
    } catch (error) {
      errors.push(`Validation error: ${String(error)}`);
    }

    return errors;
  }
}
