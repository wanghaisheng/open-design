import { promises as fs } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface RemoteConfig {
  type: 'git' | 's3' | 'r2';
  url: string;
  credentials?: {
    accessKey?: string;
    secretKey?: string;
    region?: string;
  };
}

export class RemoteManager {
  private gitPath: string;

  constructor(_instanceId: string, basePath: string = '.rams/execution_history') {
    this.gitPath = join(basePath, _instanceId, '.git');
  }

  async addRemote(name: string, config: RemoteConfig): Promise<void> {
    const remoteConfigPath = join(this.gitPath, 'remotes', `${name}.json`);
    await fs.mkdir(join(remoteConfigPath, '..'), { recursive: true });
    await fs.writeFile(remoteConfigPath, JSON.stringify(config, null, 2), 'utf-8');

    if (config.type === 'git') {
      await this.addGitRemote(name, config.url);
    }
  }

  private async addGitRemote(name: string, url: string): Promise<void> {
    try {
      await execAsync(`git -C ${this.gitPath} remote add ${name} ${url}`);
    } catch (error) {
      // Git remote might already exist, ignore
    }
  }

  async push(remoteName: string, branchName: string): Promise<void> {
    const config = await this.getRemoteConfig(remoteName);
    if (!config) {
      throw new Error(`Remote not found: ${remoteName}`);
    }

    switch (config.type) {
      case 'git':
        await this.pushToGit(remoteName, branchName);
        break;
      case 's3':
        await this.pushToS3(config, branchName);
        break;
      case 'r2':
        await this.pushToR2(config, branchName);
        break;
    }
  }

  async pull(remoteName: string, branchName: string): Promise<void> {
    const config = await this.getRemoteConfig(remoteName);
    if (!config) {
      throw new Error(`Remote not found: ${remoteName}`);
    }

    switch (config.type) {
      case 'git':
        await this.pullFromGit(remoteName, branchName);
        break;
      case 's3':
        await this.pullFromS3(config, branchName);
        break;
      case 'r2':
        await this.pullFromR2(config, branchName);
        break;
    }
  }

  private async pushToGit(remoteName: string, branchName: string): Promise<void> {
    await execAsync(`git -C ${this.gitPath} push ${remoteName} ${branchName}`);
  }

  private async pullFromGit(remoteName: string, branchName: string): Promise<void> {
    await execAsync(`git -C ${this.gitPath} pull ${remoteName} ${branchName}`);
  }

  private async pushToS3(config: RemoteConfig, branchName: string): Promise<void> {
    // S3 push implementation
    // This would use AWS SDK to upload files
    console.log(`Pushing to S3: ${config.url}/${branchName}`);
  }

  private async pullFromS3(config: RemoteConfig, branchName: string): Promise<void> {
    // S3 pull implementation
    console.log(`Pulling from S3: ${config.url}/${branchName}`);
  }

  private async pushToR2(config: RemoteConfig, branchName: string): Promise<void> {
    // Cloudflare R2 push implementation
    console.log(`Pushing to R2: ${config.url}/${branchName}`);
  }

  private async pullFromR2(config: RemoteConfig, branchName: string): Promise<void> {
    // Cloudflare R2 pull implementation
    console.log(`Pulling from R2: ${config.url}/${branchName}`);
  }

  async listRemotes(): Promise<string[]> {
    const remotesPath = join(this.gitPath, 'remotes');
    try {
      const files = await fs.readdir(remotesPath);
      return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
    } catch {
      return [];
    }
  }

  async removeRemote(name: string): Promise<void> {
    const remoteConfigPath = join(this.gitPath, 'remotes', `${name}.json`);
    await fs.unlink(remoteConfigPath);

    try {
      await execAsync(`git -C ${this.gitPath} remote remove ${name}`);
    } catch {
      // Git remote might not exist, ignore
    }
  }

  private async getRemoteConfig(name: string): Promise<RemoteConfig | null> {
    const remoteConfigPath = join(this.gitPath, 'remotes', `${name}.json`);
    try {
      const content = await fs.readFile(remoteConfigPath, 'utf-8');
      return JSON.parse(content) as RemoteConfig;
    } catch {
      return null;
    }
  }

  async syncWithRemote(remoteName: string): Promise<void> {
    // Sync both commits and large files
    const config = await this.getRemoteConfig(remoteName);
    if (!config) {
      throw new Error(`Remote not found: ${remoteName}`);
    }

    // Sync commits via Git
    if (config.type === 'git') {
      await this.syncGitCommits(remoteName);
    }

    // Sync large files to object storage
    await this.syncLargeFiles(config);
  }

  private async syncGitCommits(remoteName: string): Promise<void> {
    await execAsync(`git -C ${this.gitPath} fetch ${remoteName}`);
  }

  private async syncLargeFiles(config: RemoteConfig): Promise<void> {
    // Sync large files to S3/R2
    console.log(`Syncing large files to ${config.type}`);
  }
}
