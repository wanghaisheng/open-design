import { parse as parseYAML } from 'yaml';

export interface ParsedFrontMatter {
  [key: string]: any;
}

export function parseFrontMatter(content: string): ParsedFrontMatter {
  const lines = content.split('\n');
  const startMarker = lines.findIndex(line => line.trim() === '---');
  
  if (startMarker === -1) {
    return {};
  }
  
  const endMarker = lines.findIndex((line, index) => index > startMarker && line.trim() === '---');
  
  if (endMarker === -1) {
    return {};
  }
  
  const yamlContent = lines.slice(startMarker + 1, endMarker).join('\n');
  
  try {
    return parseYAML(yamlContent) || {};
  } catch (error) {
    throw new Error(`Failed to parse YAML front matter: ${error}`);
  }
}

export function stripFrontMatter(content: string): string {
  const lines = content.split('\n');
  const startMarker = lines.findIndex(line => line.trim() === '---');
  
  if (startMarker === -1) {
    return content;
  }
  
  const endMarker = lines.findIndex((line, index) => index > startMarker && line.trim() === '---');
  
  if (endMarker === -1) {
    return content;
  }
  
  return lines.slice(endMarker + 1).join('\n').trimStart();
}
