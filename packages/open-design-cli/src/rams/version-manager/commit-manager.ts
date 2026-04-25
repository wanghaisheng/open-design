import { promises as fs } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';
import YAML from 'yaml';

export interface Commit {
  commit_id: string;
  skill_name: string;
  input_hash: string;
  output_data: OutputData;
  timestamp: string;
  parent_commit_id: string | null;
  metadata: CommitMetadata;
}

export interface OutputData {
  type: string;
  path: string;
  content_hash: string;
  large_files?: LargeFileRef[];
}

export interface LargeFileRef {
  type: string;
  original_path: string;
  size: number;
  storage: 'local' | 's3' | 'r2';
  reference: string;
  cdn_url?: string;
}

export interface CommitMetadata {
  implementation: string;
  model?: string;
  execution_time: number;
  tokens_used?: number;
}

export class CommitManager {
  private instanceId: string;
  private basePath: string;
  private commitsPath: string;
  private objectsPath: string;

  constructor(instanceId: string, basePath: string = '.rams/execution_history') {
    this.instanceId = instanceId;
    this.basePath = basePath;
    this.commitsPath = join(basePath, instanceId, '.git', 'objects', 'commits');
    this.objectsPath = join(basePath, instanceId, '.git', 'objects');
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.commitsPath, { recursive: true });
    await fs.mkdir(join(this.objectsPath, 'trees'), { recursive: true });
    await fs.mkdir(join(this.objectsPath, 'blobs'), { recursive: true });
  }

  async createCommit(
    skillName: string,
    inputData: any,
    outputData: any,
    parentId: string | null = null
  ): Promise<string> {
    const commitId = this.generateCommitId();
    const inputHash = this.hashInput(inputData);
    const storedOutput = await this.storeOutput(outputData);
    const metadata = this.collectMetadata();

    const commit: Commit = {
      commit_id: commitId,
      skill_name: skillName,
      input_hash: inputHash,
      output_data: storedOutput,
      timestamp: new Date().toISOString(),
      parent_commit_id: parentId,
      metadata,
    };

    await this.storeCommit(commit);
    return commitId;
  }

  async getCommit(commitId: string): Promise<Commit | null> {
    const commitPath = join(this.commitsPath, `${commitId}.yaml`);
    try {
      const content = await fs.readFile(commitPath, 'utf-8');
      return YAML.parse(content) as Commit;
    } catch {
      return null;
    }
  }

  async getCurrentCommit(): Promise<string | null> {
    const headPath = join(this.basePath, this.instanceId, '.git', 'HEAD');
    try {
      const content = await fs.readFile(headPath, 'utf-8');
      return content.trim();
    } catch {
      return null;
    }
  }

  async setCurrentCommit(commitId: string): Promise<void> {
    const headPath = join(this.basePath, this.instanceId, '.git', 'HEAD');
    await fs.mkdir(join(headPath, '..'), { recursive: true });
    await fs.writeFile(headPath, commitId, 'utf-8');
  }

  async getCommits(skillName?: string, limit: number = 10): Promise<Commit[]> {
    const files = await fs.readdir(this.commitsPath);
    const commits: Commit[] = [];

    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;
      const commitId = file.replace('.yaml', '');
      const commit = await this.getCommit(commitId);
      if (commit) {
        if (!skillName || commit.skill_name === skillName) {
          commits.push(commit);
        }
      }
    }

    commits.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return commits.slice(0, limit);
  }

  private generateCommitId(): string {
    return createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex')
      .substring(0, 12);
  }

  private hashInput(inputData: any): string {
    return createHash('sha256')
      .update(JSON.stringify(inputData))
      .digest('hex');
  }

  private async storeOutput(outputData: any): Promise<OutputData> {
    const contentHash = this.hashInput(outputData);
    const outputPath = join(this.objectsPath, 'blobs', contentHash);
    
    await fs.mkdir(join(outputPath, '..'), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(outputData), 'utf-8');

    return {
      type: 'json',
      path: outputPath,
      content_hash: contentHash,
    };
  }

  async storeCommit(commit: Commit): Promise<void> {
    const commitPath = join(this.commitsPath, `${commit.commit_id}.yaml`);
    await fs.writeFile(commitPath, YAML.stringify(commit), 'utf-8');
  }

  private collectMetadata(): CommitMetadata {
    return {
      implementation: 'ai-model',
      execution_time: 0,
    };
  }
}
