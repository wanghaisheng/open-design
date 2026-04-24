import { createRoleManager } from './role-instance.js';
import { createSkillExecutor } from './skill-executor.js';

export interface InteractiveSession {
  id: string;
  role: string;
  started_at: number;
  history: InteractionHistory[];
}

export interface InteractionHistory {
  timestamp: number;
  type: 'input' | 'output' | 'error';
  content: string;
  skill?: string;
}

export class InteractiveMode {
  private projectRoot: string;
  private session: InteractiveSession | null = null;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Start an interactive session
   */
  async startSession(roleName: string): Promise<InteractiveSession> {
    const roleManager = createRoleManager(this.projectRoot);
    const roleInstance = roleManager.createRoleInstance(roleName);

    if (!roleInstance.exists()) {
      throw new Error(`Role ${roleName} not found`);
    }

    this.session = {
      id: `session-${Date.now()}`,
      role: roleName,
      started_at: Date.now(),
      history: [],
    };

    return this.session;
  }

  /**
   * Execute a command in the interactive session
   */
  async executeCommand(input: string): Promise<string> {
    if (!this.session) {
      throw new Error('No active session. Call startSession first.');
    }

    // Add input to history
    this.session.history.push({
      timestamp: Date.now(),
      type: 'input',
      content: input,
    });

    // Parse the input command
    const parts = input.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    let output = '';

    try {
      switch (command) {
        case 'skill':
          if (args.length === 0) {
            output = 'Usage: skill <skill-name> [input]';
          } else {
            const skillName = args[0];
            const skillInput = args.slice(1).join(' ') || '{}';
            
            const roleManager = createRoleManager(this.projectRoot);
            const roleInstance = roleManager.createRoleInstance(this.session.role);
            const skillExecutor = createSkillExecutor(roleInstance);
            
            const result = await skillExecutor.execute(skillName, JSON.parse(skillInput));
            output = JSON.stringify(result, null, 2);
            
            this.session.history.push({
              timestamp: Date.now(),
              type: 'output',
              content: output,
              skill: skillName,
            });
          }
          break;

        case 'role':
          if (args.length === 0) {
            output = `Current role: ${this.session.role}`;
          } else {
            // Switch role
            await this.startSession(args[0]);
            output = `Switched to role: ${args[0]}`;
          }
          break;

        case 'help':
          output = this.getHelpText();
          break;

        case 'exit':
        case 'quit':
          output = 'Exiting session...';
          this.session = null;
          break;

        case 'history':
          output = JSON.stringify(this.session.history, null, 2);
          break;

        default:
          output = `Unknown command: ${command}. Type 'help' for available commands.`;
      }
    } catch (error) {
      const errorMsg = (error as Error).message;
      if (this.session) {
        this.session.history.push({
          timestamp: Date.now(),
          type: 'error',
          content: errorMsg,
        });
      }
      output = `Error: ${errorMsg}`;
    }

    return output;
  }

  /**
   * Get the current session
   */
  getSession(): InteractiveSession | null {
    return this.session;
  }

  /**
   * End the current session
   */
  endSession(): void {
    this.session = null;
  }

  /**
   * Get help text
   */
  private getHelpText(): string {
    return `
Available commands:
  skill <skill-name> [input]  - Execute a skill
  role [role-name]             - Show or switch current role
  history                       - Show interaction history
  help                          - Show this help message
  exit / quit                   - Exit interactive mode
`;
  }

  /**
   * Get session statistics
   */
  getSessionStats(): {
    id: string;
    role: string;
    duration_ms: number;
    interactions: number;
    by_type: Record<string, number>;
  } | null {
    if (!this.session) {
      return null;
    }

    const duration = Date.now() - this.session.started_at;
    const byType: Record<string, number> = {};

    for (const entry of this.session.history) {
      byType[entry.type] = (byType[entry.type] || 0) + 1;
    }

    return {
      id: this.session.id,
      role: this.session.role,
      duration_ms: duration,
      interactions: this.session.history.length,
      by_type: byType,
    };
  }
}

export function createInteractiveMode(projectRoot?: string): InteractiveMode {
  return new InteractiveMode(projectRoot);
}
