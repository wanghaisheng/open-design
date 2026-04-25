import { promises as fs } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

export interface Tag {
  name: string;
  commit_id: string;
  message: string;
  created_at: string;
}

export class TagManager {
  private instanceId: string;
  private basePath: string;
  private tagsPath: string;

  constructor(instanceId: string, basePath: string = '.rams/execution_history') {
    this.instanceId = instanceId;
    this.basePath = basePath;
    this.tagsPath = join(basePath, instanceId, '.git', 'refs', 'tags');
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.tagsPath, { recursive: true });
  }

  async createTag(name: string, commitId: string, message: string = ''): Promise<void> {
    const tagPath = join(this.tagsPath, `${name}.yaml`);
    
    const tag: Tag = {
      name,
      commit_id: commitId,
      message,
      created_at: new Date().toISOString(),
    };

    await fs.writeFile(tagPath, YAML.stringify(tag), 'utf-8');
  }

  async getTag(name: string): Promise<Tag | null> {
    const tagPath = join(this.tagsPath, `${name}.yaml`);
    try {
      const content = await fs.readFile(tagPath, 'utf-8');
      return YAML.parse(content) as Tag;
    } catch {
      return null;
    }
  }

  async listTags(): Promise<Tag[]> {
    const files = await fs.readdir(this.tagsPath);
    const tags: Tag[] = [];

    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;
      const tag = await this.getTag(file.replace('.yaml', ''));
      if (tag) {
        tags.push(tag);
      }
    }

    tags.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return tags;
  }

  async deleteTag(name: string): Promise<void> {
    const tagPath = join(this.tagsPath, `${name}.yaml`);
    await fs.unlink(tagPath);
  }

  async checkoutTag(name: string): Promise<string> {
    const tag = await this.getTag(name);
    if (!tag) {
      throw new Error(`Tag not found: ${name}`);
    }

    // Update HEAD to point to the tag's commit
    const headPath = join(this.basePath, this.instanceId, '.git', 'HEAD');
    await fs.mkdir(join(headPath, '..'), { recursive: true });
    await fs.writeFile(headPath, tag.commit_id, 'utf-8');

    return tag.commit_id;
  }
}
