import { readFile, fileExists } from './file-utils.js';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { parse, stringify } from 'yaml';

export interface Config {
  runtime: RuntimeConfig;
  role: RoleConfig;
  memory: MemoryConfig;
  skills: SkillsConfig;
  workflows: WorkflowsConfig;
}

export interface RuntimeConfig {
  environment: string;
  model: string;
}

export interface RoleConfig {
  default: string;
  path: string;
}

export interface MemoryConfig {
  enabled: boolean;
  path: string;
  compression: CompressionConfig;
}

export interface CompressionConfig {
  enabled: boolean;
  retention_days: number;
}

export interface SkillsConfig {
  auto_load: boolean;
  cache: boolean;
}

export interface WorkflowsConfig {
  enabled: boolean;
  path: string;
}

const DEFAULT_CONFIG: Config = {
  runtime: {
    environment: 'windsurf',
    model: 'swe-1.6',
  },
  role: {
    default: 'design-lead',
    path: '.claude/roles',
  },
  memory: {
    enabled: true,
    path: '.claude/memory/',
    compression: {
      enabled: true,
      retention_days: 180,
    },
  },
  skills: {
    auto_load: true,
    cache: true,
  },
  workflows: {
    enabled: true,
    path: '.windsurf/workflows',
  },
};

const CONFIG_DIR = '.open-design';
const CONFIG_FILE = 'config.yaml';

export class ConfigManager {
  private configPath: string;
  private config: Config | null = null;

  constructor(projectRoot: string = process.cwd()) {
    this.configPath = resolve(projectRoot, CONFIG_DIR, CONFIG_FILE);
  }

  /**
   * Load configuration from file
   */
  async load(): Promise<Config> {
    if (this.config) {
      return this.config;
    }

    if (!existsSync(this.configPath)) {
      this.config = DEFAULT_CONFIG;
      return this.config;
    }

    try {
      const content = readFileSync(this.configPath, 'utf-8');
      this.config = parse(content) as Config;
      return this.config;
    } catch (error) {
      throw new Error(`Failed to load config: ${(error as Error).message}`);
    }
  }

  /**
   * Save configuration to file
   */
  async save(config: Config): Promise<void> {
    try {
      const configDir = resolve(this.configPath, '..');
      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
      }

      const content = stringify(config);
      writeFileSync(this.configPath, content, 'utf-8');
      this.config = config;
    } catch (error) {
      throw new Error(`Failed to save config: ${(error as Error).message}`);
    }
  }

  /**
   * Get a specific configuration value by path
   */
  async get(path: string): Promise<any> {
    const config = await this.load();
    const keys = path.split('.');
    let value: any = config;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }

    return value;
  }

  /**
   * Set a specific configuration value by path
   */
  async set(path: string, value: any): Promise<void> {
    const config = await this.load();
    const keys = path.split('.');
    let current: any = config;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    await this.save(config);
  }

  /**
   * Validate configuration structure
   */
  validate(config: Config): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate runtime
    if (!config.runtime) {
      errors.push('Missing runtime configuration');
    } else {
      if (!config.runtime.environment) {
        errors.push('Missing runtime.environment');
      }
      if (!config.runtime.model) {
        errors.push('Missing runtime.model');
      }
    }

    // Validate role
    if (!config.role) {
      errors.push('Missing role configuration');
    } else {
      if (!config.role.default) {
        errors.push('Missing role.default');
      }
      if (!config.role.path) {
        errors.push('Missing role.path');
      }
    }

    // Validate memory
    if (!config.memory) {
      errors.push('Missing memory configuration');
    } else {
      if (!config.memory.path) {
        errors.push('Missing memory.path');
      }
      if (config.memory.compression && typeof config.memory.compression.retention_days !== 'number') {
        errors.push('memory.compression.retention_days must be a number');
      }
    }

    // Validate skills
    if (!config.skills) {
      errors.push('Missing skills configuration');
    }

    // Validate workflows
    if (!config.workflows) {
      errors.push('Missing workflows configuration');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Initialize configuration with default values
   */
  async init(): Promise<void> {
    if (existsSync(this.configPath)) {
      throw new Error('Configuration already exists');
    }

    await this.save(DEFAULT_CONFIG);
  }

  /**
   * Check if configuration exists
   */
  exists(): boolean {
    return existsSync(this.configPath);
  }

  /**
   * Get configuration file path
   */
  getConfigPath(): string {
    return this.configPath;
  }
}

export function createConfigManager(projectRoot?: string): ConfigManager {
  return new ConfigManager(projectRoot);
}
