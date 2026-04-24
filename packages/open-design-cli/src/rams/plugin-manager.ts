import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { parse, stringify } from 'yaml';

export interface PluginDefinition {
  name: string;
  version: string;
  description: string;
  author: string;
  type: 'command' | 'skill' | 'role' | 'exporter';
  enabled: boolean;
  entry_point?: string;
  config?: any;
}

export class PluginManager {
  private projectRoot: string;
  private plugins: Map<string, PluginDefinition>;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.plugins = new Map();
  }

  /**
   * Get plugins directory path
   */
  private getPluginsPath(): string {
    return resolve(this.projectRoot, '.open-design', 'plugins');
  }

  /**
   * Ensure plugins directory exists
   */
  private ensurePluginsDir(): void {
    const pluginsPath = this.getPluginsPath();
    if (!existsSync(pluginsPath)) {
      mkdirSync(pluginsPath, { recursive: true });
    }
  }

  /**
   * Load all plugins from the plugins directory
   */
  async loadPlugins(): Promise<void> {
    const pluginsPath = this.getPluginsPath();
    if (!existsSync(pluginsPath)) {
      return;
    }

    const entries = readdirSync(pluginsPath);
    for (const entry of entries) {
      if (!entry.endsWith('.yaml')) {
        continue;
      }

      const pluginPath = resolve(pluginsPath, entry);
      const content = readFileSync(pluginPath, 'utf-8');
      const plugin = parse(content) as PluginDefinition;
      this.plugins.set(plugin.name, plugin);
    }
  }

  /**
   * Register a plugin
   */
  async registerPlugin(plugin: PluginDefinition): Promise<void> {
    this.ensurePluginsDir();
    const pluginsPath = this.getPluginsPath();
    const pluginPath = resolve(pluginsPath, `${plugin.name}.yaml`);

    if (existsSync(pluginPath)) {
      throw new Error(`Plugin ${plugin.name} already exists`);
    }

    const content = stringify(plugin);
    writeFileSync(pluginPath, content, 'utf-8');
    this.plugins.set(plugin.name, plugin);
  }

  /**
   * Unregister a plugin
   */
  async unregisterPlugin(pluginName: string): Promise<boolean> {
    const pluginsPath = this.getPluginsPath();
    const pluginPath = resolve(pluginsPath, `${pluginName}.yaml`);

    if (!existsSync(pluginPath)) {
      return false;
    }

    const { unlinkSync } = await import('fs');
    unlinkSync(pluginPath);
    this.plugins.delete(pluginName);
    return true;
  }

  /**
   * Get a plugin by name
   */
  getPlugin(name: string): PluginDefinition | undefined {
    return this.plugins.get(name);
  }

  /**
   * List all plugins
   */
  listPlugins(): PluginDefinition[] {
    return Array.from(this.plugins.values());
  }

  /**
   * List plugins by type
   */
  listPluginsByType(type: PluginDefinition['type']): PluginDefinition[] {
    return this.listPlugins().filter(p => p.type === type);
  }

  /**
   * Enable a plugin
   */
  enablePlugin(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName);
    if (plugin) {
      plugin.enabled = true;
      this.savePlugin(plugin);
      return true;
    }
    return false;
  }

  /**
   * Disable a plugin
   */
  disablePlugin(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName);
    if (plugin) {
      plugin.enabled = false;
      this.savePlugin(plugin);
      return true;
    }
    return false;
  }

  /**
   * Save a plugin to disk
   */
  private savePlugin(plugin: PluginDefinition): void {
    const pluginsPath = this.getPluginsPath();
    const pluginPath = resolve(pluginsPath, `${plugin.name}.yaml`);
    const content = stringify(plugin);
    writeFileSync(pluginPath, content, 'utf-8');
  }

  /**
   * Get plugin statistics
   */
  getStats(): {
    total: number;
    enabled: number;
    disabled: number;
    by_type: Record<string, number>;
  } {
    const plugins = this.listPlugins();
    const enabled = plugins.filter(p => p.enabled).length;
    const disabled = plugins.length - enabled;
    const byType: Record<string, number> = {};

    for (const plugin of plugins) {
      byType[plugin.type] = (byType[plugin.type] || 0) + 1;
    }

    return {
      total: plugins.length,
      enabled,
      disabled,
      by_type: byType,
    };
  }
}

export function createPluginManager(projectRoot?: string): PluginManager {
  return new PluginManager(projectRoot);
}
