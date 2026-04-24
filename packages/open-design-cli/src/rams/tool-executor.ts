import { spawn } from 'child_process';

export interface ToolDefinition {
  name: string;
  type: 'python' | 'javascript' | 'mcp' | 'opencli';
  path?: string;
  command?: string;
  args?: string[];
  enabled: boolean;
}

export interface ToolExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  exit_code: number;
}

export class ToolExecutor {
  private projectRoot: string;
  private tools: Map<string, ToolDefinition>;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.tools = new Map();
    this.initializeDefaultTools();
  }

  /**
   * Initialize default tools
   */
  private initializeDefaultTools(): void {
    // Python tool
    this.tools.set('python', {
      name: 'python',
      type: 'python',
      command: 'python',
      enabled: true,
    });

    // Node/JavaScript tool
    this.tools.set('node', {
      name: 'node',
      type: 'javascript',
      command: 'node',
      enabled: true,
    });

    // Bun tool (faster JS runtime)
    this.tools.set('bun', {
      name: 'bun',
      type: 'javascript',
      command: 'bun',
      enabled: true,
    });
  }

  /**
   * Register a new tool
   */
  registerTool(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }

  /**
   * Get a tool by name
   */
  getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  /**
   * List all registered tools
   */
  listTools(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  /**
   * Execute a tool
   */
  async execute(toolName: string, script: string, args: string[] = []): Promise<ToolExecutionResult> {
    const tool = this.tools.get(toolName);
    
    if (!tool) {
      return {
        success: false,
        output: '',
        error: `Tool ${toolName} not found`,
        exit_code: 1,
      };
    }

    if (!tool.enabled) {
      return {
        success: false,
        output: '',
        error: `Tool ${toolName} is disabled`,
        exit_code: 1,
      };
    }

    try {
      const command = tool.command || toolName;
      const allArgs = [...(tool.args || []), ...args];

      // For Python/JavaScript, we need to handle script execution
      if (tool.type === 'python' || tool.type === 'javascript') {
        allArgs.unshift('-c', script);
      }

      const result = await this.runCommand(command, allArgs);
      return result;
    } catch (error) {
      return {
        success: false,
        output: '',
        error: (error as Error).message,
        exit_code: 1,
      };
    }
  }

  /**
   * Run a command and return the result
   */
  private runCommand(command: string, args: string[]): Promise<ToolExecutionResult> {
    return new Promise((resolve) => {
      const child = spawn(command, args, {
        cwd: this.projectRoot,
        shell: true,
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        error += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          success: code === 0,
          output,
          error: error || undefined,
          exit_code: code || 0,
        });
      });

      child.on('error', (err) => {
        resolve({
          success: false,
          output: '',
          error: err.message,
          exit_code: 1,
        });
      });
    });
  }

  /**
   * Execute a Python script
   */
  async executePython(script: string, args: string[] = []): Promise<ToolExecutionResult> {
    return this.execute('python', script, args);
  }

  /**
   * Execute a JavaScript script
   */
  async executeJavaScript(script: string, args: string[] = []): Promise<ToolExecutionResult> {
    return this.execute('node', script, args);
  }

  /**
   * Execute a Bun script
   */
  async executeBun(script: string, args: string[] = []): Promise<ToolExecutionResult> {
    return this.execute('bun', script, args);
  }

  /**
   * Check if a tool is available
   */
  async isToolAvailable(toolName: string): Promise<boolean> {
    const tool = this.tools.get(toolName);
    if (!tool || !tool.enabled) {
      return false;
    }

    const command = tool.command || toolName;
    const result = await this.runCommand(command, ['--version']);
    return result.success;
  }

  /**
   * Enable a tool
   */
  enableTool(toolName: string): boolean {
    const tool = this.tools.get(toolName);
    if (tool) {
      tool.enabled = true;
      return true;
    }
    return false;
  }

  /**
   * Disable a tool
   */
  disableTool(toolName: string): boolean {
    const tool = this.tools.get(toolName);
    if (tool) {
      tool.enabled = false;
      return true;
    }
    return false;
  }
}

export function createToolExecutor(projectRoot?: string): ToolExecutor {
  return new ToolExecutor(projectRoot);
}
