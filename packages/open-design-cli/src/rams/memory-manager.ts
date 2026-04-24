import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { createConfigManager } from '../utils/index.js';

export interface MemoryEntry {
  id: string;
  type: 'context' | 'skill' | 'role' | 'workflow' | 'learning';
  timestamp: number;
  content: any;
  metadata?: any;
}

export interface MemoryConfig {
  enabled: boolean;
  path: string;
  compression: {
    enabled: boolean;
    retention_days: number;
  };
}

export class MemoryManager {
  private projectRoot: string;
  private config: MemoryConfig | null = null;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Get memory configuration
   */
  async getConfig(): Promise<MemoryConfig> {
    if (this.config) {
      return this.config;
    }

    const configManager = createConfigManager(this.projectRoot);
    const config = await configManager.load();
    this.config = config.memory;
    return this.config;
  }

  /**
   * Check if memory is enabled
   */
  async isEnabled(): Promise<boolean> {
    const config = await this.getConfig();
    return config.enabled;
  }

  /**
   * Get memory directory path
   */
  async getMemoryPath(): Promise<string> {
    const config = await this.getConfig();
    return resolve(this.projectRoot, config.path);
  }

  /**
   * Ensure memory directory exists
   */
  async ensureMemoryDir(): Promise<void> {
    const memoryPath = await this.getMemoryPath();
    if (!existsSync(memoryPath)) {
      mkdirSync(memoryPath, { recursive: true });
    }
  }

  /**
   * Save a memory entry
   */
  async save(entry: MemoryEntry): Promise<void> {
    if (!(await this.isEnabled())) {
      return;
    }

    await this.ensureMemoryDir();
    const memoryPath = await this.getMemoryPath();
    const entryPath = resolve(memoryPath, `${entry.id}.json`);

    writeFileSync(entryPath, JSON.stringify(entry, null, 2), 'utf-8');
  }

  /**
   * Load a memory entry
   */
  async load(id: string): Promise<MemoryEntry | null> {
    if (!(await this.isEnabled())) {
      return null;
    }

    const memoryPath = await this.getMemoryPath();
    const entryPath = resolve(memoryPath, `${id}.json`);

    if (!existsSync(entryPath)) {
      return null;
    }

    const content = readFileSync(entryPath, 'utf-8');
    return JSON.parse(content) as MemoryEntry;
  }

  /**
   * List all memory entries
   */
  async list(type?: MemoryEntry['type']): Promise<MemoryEntry[]> {
    if (!(await this.isEnabled())) {
      return [];
    }

    const memoryPath = await this.getMemoryPath();
    if (!existsSync(memoryPath)) {
      return [];
    }

    const entries: MemoryEntry[] = [];
    const files = readdirSync(memoryPath);

    for (const file of files) {
      if (!file.endsWith('.json')) {
        continue;
      }

      const entryPath = resolve(memoryPath, file);
      const content = readFileSync(entryPath, 'utf-8');
      const entry = JSON.parse(content) as MemoryEntry;

      if (!type || entry.type === type) {
        entries.push(entry);
      }
    }

    // Sort by timestamp (newest first)
    entries.sort((a, b) => b.timestamp - a.timestamp);

    return entries;
  }

  /**
   * Delete a memory entry
   */
  async delete(id: string): Promise<boolean> {
    if (!(await this.isEnabled())) {
      return false;
    }

    const memoryPath = await this.getMemoryPath();
    const entryPath = resolve(memoryPath, `${id}.json`);

    if (!existsSync(entryPath)) {
      return false;
    }

    const { unlinkSync } = await import('fs');
    unlinkSync(entryPath);
    return true;
  }

  /**
   * Compress old memory entries (remove entries older than retention_days)
   */
  async compress(): Promise<number> {
    if (!(await this.isEnabled())) {
      return 0;
    }

    const config = await this.getConfig();
    if (!config.compression.enabled) {
      return 0;
    }

    const retentionMs = config.compression.retention_days * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const entries = await this.list();

    let deletedCount = 0;
    for (const entry of entries) {
      if (now - entry.timestamp > retentionMs) {
        await this.delete(entry.id);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  /**
   * Get memory statistics
   */
  async getStats(): Promise<{
    enabled: boolean;
    path: string;
    total_entries: number;
    entries_by_type: Record<string, number>;
    oldest_entry: number | null;
    newest_entry: number | null;
  }> {
    const config = await this.getConfig();
    const entries = await this.list();

    const entriesByType: Record<string, number> = {};
    for (const entry of entries) {
      entriesByType[entry.type] = (entriesByType[entry.type] || 0) + 1;
    }

    const timestamps = entries.map(e => e.timestamp);
    const oldestEntry = timestamps.length > 0 ? Math.min(...timestamps) : null;
    const newestEntry = timestamps.length > 0 ? Math.max(...timestamps) : null;

    return {
      enabled: config.enabled,
      path: config.path,
      total_entries: entries.length,
      entries_by_type: entriesByType,
      oldest_entry: oldestEntry,
      newest_entry: newestEntry,
    };
  }

  /**
   * Clear all memory entries
   */
  async clear(): Promise<number> {
    if (!(await this.isEnabled())) {
      return 0;
    }

    const entries = await this.list();
    let deletedCount = 0;

    for (const entry of entries) {
      await this.delete(entry.id);
      deletedCount++;
    }

    return deletedCount;
  }
}

export function createMemoryManager(projectRoot?: string): MemoryManager {
  return new MemoryManager(projectRoot);
}
