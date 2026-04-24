import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { parse, stringify } from 'yaml';
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

export class VariantManager {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Get variants directory path
   */
  private getVariantsPath(): string {
    return resolve(this.projectRoot, '.claude', 'variants');
  }

  /**
   * Ensure variants directory exists
   */
  private ensureVariantsDir(): void {
    const variantsPath = this.getVariantsPath();
    if (!existsSync(variantsPath)) {
      mkdirSync(variantsPath, { recursive: true });
    }
  }

  /**
   * Create a new variant
   */
  async createVariant(variant: VariantDefinition): Promise<void> {
    this.ensureVariantsDir();
    const variantsPath = this.getVariantsPath();
    const variantPath = resolve(variantsPath, `${variant.name}.yaml`);

    if (existsSync(variantPath)) {
      throw new Error(`Variant ${variant.name} already exists`);
    }

    const content = stringify(variant);
    writeFileSync(variantPath, content, 'utf-8');
  }

  /**
   * Load a variant
   */
  async loadVariant(variantName: string): Promise<VariantDefinition> {
    const variantsPath = this.getVariantsPath();
    const variantPath = resolve(variantsPath, `${variantName}.yaml`);

    if (!existsSync(variantPath)) {
      throw new Error(`Variant ${variantName} not found`);
    }

    const content = readFileSync(variantPath, 'utf-8');
    return parse(content) as VariantDefinition;
  }

  /**
   * List all variants
   */
  async listVariants(): Promise<VariantDefinition[]> {
    const variantsPath = this.getVariantsPath();
    if (!existsSync(variantsPath)) {
      return [];
    }

    const entries = readdirSync(variantsPath);
    const variants: VariantDefinition[] = [];

    for (const entry of entries) {
      if (!entry.endsWith('.yaml')) {
        continue;
      }

      const variantPath = resolve(variantsPath, entry);
      const content = readFileSync(variantPath, 'utf-8');
      const variant = parse(content) as VariantDefinition;
      variants.push(variant);
    }

    return variants;
  }

  /**
   * Delete a variant
   */
  async deleteVariant(variantName: string): Promise<boolean> {
    const variantsPath = this.getVariantsPath();
    const variantPath = resolve(variantsPath, `${variantName}.yaml`);

    if (!existsSync(variantPath)) {
      return false;
    }

    const { unlinkSync } = await import('fs');
    unlinkSync(variantPath);
    return true;
  }

  /**
   * Apply a variant to a role instance
   */
  async applyVariant(roleInstance: RoleInstance, variantName: string): Promise<void> {
    const variant = await this.loadVariant(variantName);
    const roleDef = await roleInstance.loadRole();

    if (variant.base_role !== roleDef.name) {
      throw new Error(`Variant ${variantName} is not compatible with role ${roleDef.name}`);
    }

    // Apply variant overrides
    // In a full implementation, this would merge the variant's soul_overrides
    // and skill_overrides with the base role's configuration
  }

  /**
   * Get available scenarios
   */
  getAvailableScenarios(): VariantDefinition['scenario'][] {
    return ['b2b', 'b2c', 'mobile', 'custom'];
  }

  /**
   * Create a variant from a template
   */
  async createVariantFromTemplate(
    name: string,
    baseRole: string,
    scenario: VariantDefinition['scenario'],
    description: string
  ): Promise<VariantDefinition> {
    const variant: VariantDefinition = {
      name,
      base_role: baseRole,
      description,
      scenario,
    };

    await this.createVariant(variant);
    return variant;
  }
}

export function createVariantManager(projectRoot?: string): VariantManager {
  return new VariantManager(projectRoot);
}
