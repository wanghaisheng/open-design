import { createConfigManager } from '../utils/index.js';

export interface RuntimeEnvironment {
  name: string;
  type: 'desktop_ide' | 'cloud_ide' | 'professional_tool' | 'custom_platform' | 'cli';
  model: string;
  capabilities: string[];
}

export interface RuntimeConfig {
  environment: string;
  model: string;
  tool_permissions: string[];
  memory_enabled: boolean;
}

export class RuntimeManager {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Get current runtime environment
   */
  async getCurrentRuntime(): Promise<RuntimeEnvironment> {
    const configManager = createConfigManager(this.projectRoot);
    const config = await configManager.load();

    return {
      name: config.runtime.environment,
      type: this.detectEnvironmentType(config.runtime.environment),
      model: config.runtime.model,
      capabilities: this.getEnvironmentCapabilities(config.runtime.environment),
    };
  }

  /**
   * Detect environment type from name
   */
  private detectEnvironmentType(name: string): RuntimeEnvironment['type'] {
    const desktopIdes = ['windsurf', 'cursor', 'claude-desktop'];
    const cloudIdes = ['claude-web', 'chatgpt-web'];
    const professionalTools = ['openclaw', 'hermes'];

    if (desktopIdes.includes(name.toLowerCase())) {
      return 'desktop_ide';
    }
    if (cloudIdes.includes(name.toLowerCase())) {
      return 'cloud_ide';
    }
    if (professionalTools.includes(name.toLowerCase())) {
      return 'professional_tool';
    }
    if (name.toLowerCase() === 'cli') {
      return 'cli';
    }
    return 'custom_platform';
  }

  /**
   * Get capabilities for a given environment
   */
  private getEnvironmentCapabilities(name: string): string[] {
    const capabilities: Record<string, string[]> = {
      windsurf: ['ai_models', 'file_system', 'git', 'terminal', 'mcp'],
      cursor: ['ai_models', 'file_system', 'git', 'terminal', 'mcp'],
      'claude-desktop': ['ai_models', 'file_system', 'mcp'],
      'claude-web': ['ai_models', 'file_upload'],
      'chatgpt-web': ['ai_models', 'file_upload'],
      openclaw: ['ai_models', 'file_system', 'git', 'terminal', 'advanced_tools'],
      hermes: ['ai_models', 'file_system', 'git', 'terminal', 'advanced_tools'],
      cli: ['ai_models', 'file_system', 'terminal'],
    };

    return capabilities[name.toLowerCase()] || ['ai_models'];
  }

  /**
   * Set runtime environment
   */
  async setRuntimeEnvironment(environment: string): Promise<void> {
    const configManager = createConfigManager(this.projectRoot);
    await configManager.set('runtime.environment', environment);
  }

  /**
   * Set model
   */
  async setModel(model: string): Promise<void> {
    const configManager = createConfigManager(this.projectRoot);
    await configManager.set('runtime.model', model);
  }

  /**
   * Get supported environments
   */
  getSupportedEnvironments(): RuntimeEnvironment[] {
    return [
      {
        name: 'windsurf',
        type: 'desktop_ide',
        model: 'swe-1.6',
        capabilities: ['ai_models', 'file_system', 'git', 'terminal', 'mcp'],
      },
      {
        name: 'cursor',
        type: 'desktop_ide',
        model: 'claude-3.5-sonnet',
        capabilities: ['ai_models', 'file_system', 'git', 'terminal', 'mcp'],
      },
      {
        name: 'claude-desktop',
        type: 'desktop_ide',
        model: 'claude-3.5-sonnet',
        capabilities: ['ai_models', 'file_system', 'mcp'],
      },
      {
        name: 'claude-web',
        type: 'cloud_ide',
        model: 'claude-3.5-sonnet',
        capabilities: ['ai_models', 'file_upload'],
      },
      {
        name: 'chatgpt-web',
        type: 'cloud_ide',
        model: 'gpt-4-turbo',
        capabilities: ['ai_models', 'file_upload'],
      },
      {
        name: 'openclaw',
        type: 'professional_tool',
        model: 'claude-3.5-sonnet',
        capabilities: ['ai_models', 'file_system', 'git', 'terminal', 'advanced_tools'],
      },
      {
        name: 'hermes',
        type: 'professional_tool',
        model: 'claude-3.5-sonnet',
        capabilities: ['ai_models', 'file_system', 'git', 'terminal', 'advanced_tools'],
      },
      {
        name: 'cli',
        type: 'cli',
        model: 'swe-1.6',
        capabilities: ['ai_models', 'file_system', 'terminal'],
      },
    ];
  }

  /**
   * Check if a capability is supported in current environment
   */
  async hasCapability(capability: string): Promise<boolean> {
    const runtime = await this.getCurrentRuntime();
    return runtime.capabilities.includes(capability);
  }

  /**
   * Get runtime status
   */
  async getStatus(): Promise<{
    environment: RuntimeEnvironment;
    config: RuntimeConfig;
    supported: boolean;
  }> {
    const configManager = createConfigManager(this.projectRoot);
    const config = await configManager.load();
    const runtime = await this.getCurrentRuntime();

    return {
      environment: runtime,
      config: {
        environment: config.runtime.environment,
        model: config.runtime.model,
        tool_permissions: ['file_system', 'terminal'], // Default permissions
        memory_enabled: config.memory.enabled,
      },
      supported: true,
    };
  }
}

export function createRuntimeManager(projectRoot?: string): RuntimeManager {
  return new RuntimeManager(projectRoot);
}
