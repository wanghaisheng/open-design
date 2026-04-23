import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export async function readFile(path: string): Promise<string> {
  if (path === '-') {
    // Read from stdin
    return new Promise((resolve, reject) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => data += chunk);
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
  }
  
  const resolvedPath = resolve(path);
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`);
  }
  
  return readFileSync(resolvedPath, 'utf-8');
}

export function fileExists(path: string): boolean {
  return existsSync(resolve(path));
}
