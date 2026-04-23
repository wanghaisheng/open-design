import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { Root } from 'mdast';

export function parseMarkdown(content: string): Root {
  const file = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .parse(content);
  
  return file;
}

export function extractSections(content: string): Map<string, string> {
  const lines = content.split('\n');
  const sections = new Map<string, string>();
  let currentSection = '';
  let currentContent: string[] = [];
  
  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    
    if (headingMatch) {
      // Save previous section
      if (currentSection) {
        sections.set(currentSection, currentContent.join('\n').trim());
      }
      
      currentSection = headingMatch[1];
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }
  
  // Save last section
  if (currentSection) {
    sections.set(currentSection, currentContent.join('\n').trim());
  }
  
  return sections;
}
