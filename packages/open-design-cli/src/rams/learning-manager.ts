import { createMemoryManager } from './memory-manager.js';

export interface LearningEntry {
  id: string;
  task_id: string;
  role: string;
  skill: string;
  timestamp: number;
  success: boolean;
  duration_ms: number;
  input: any;
  output: any;
  feedback?: string;
  improvements?: string[];
}

export interface LearningInsight {
  pattern: string;
  frequency: number;
  confidence: number;
  recommendation: string;
}

export class LearningManager {
  private memoryManager: any;

  constructor(projectRoot: string = process.cwd()) {
    this.memoryManager = createMemoryManager(projectRoot);
  }

  /**
   * Record a task execution for learning
   */
  async recordExecution(entry: LearningEntry): Promise<void> {
    const learningEntry = {
      id: `learning-${entry.id}`,
      type: 'learning' as const,
      timestamp: Date.now(),
      content: entry,
    };

    await this.memoryManager.save(learningEntry);
  }

  /**
   * Get all learning entries
   */
  async getLearningEntries(): Promise<LearningEntry[]> {
    const entries = await this.memoryManager.list('learning');
    return entries.map((e: any) => e.content);
  }

  /**
   * Get learning entries for a specific role
   */
  async getRoleLearning(role: string): Promise<LearningEntry[]> {
    const allEntries = await this.getLearningEntries();
    return allEntries.filter(e => e.role === role);
  }

  /**
   * Get learning entries for a specific skill
   */
  async getSkillLearning(skill: string): Promise<LearningEntry[]> {
    const allEntries = await this.getLearningEntries();
    return allEntries.filter(e => e.skill === skill);
  }

  /**
   * Analyze patterns and generate insights
   */
  async analyzePatterns(): Promise<LearningInsight[]> {
    const entries = await this.getLearningEntries();
    const insights: LearningInsight[] = [];

    // Analyze success rates by role
    const roleSuccess = new Map<string, { success: number; total: number }>();
    for (const entry of entries) {
      const stats = roleSuccess.get(entry.role) || { success: 0, total: 0 };
      stats.total++;
      if (entry.success) stats.success++;
      roleSuccess.set(entry.role, stats);
    }

    for (const [role, stats] of roleSuccess) {
      const successRate = stats.success / stats.total;
      if (successRate < 0.7) {
        insights.push({
          pattern: `Low success rate for role ${role}`,
          frequency: stats.total,
          confidence: 1 - successRate,
          recommendation: `Consider reviewing role ${role} configuration or providing additional training`,
        });
      }
    }

    // Analyze execution time patterns
    const avgDuration = entries.reduce((sum, e) => sum + e.duration_ms, 0) / entries.length;
    const slowEntries = entries.filter(e => e.duration_ms > avgDuration * 2);
    
    if (slowEntries.length > 0) {
      insights.push({
        pattern: 'Slow execution detected',
        frequency: slowEntries.length,
        confidence: 0.8,
        recommendation: 'Consider optimizing skill execution or caching results',
      });
    }

    return insights;
  }

  /**
   * Get learning statistics
   */
  async getStats(): Promise<{
    total_executions: number;
    success_rate: number;
    avg_duration_ms: number;
    by_role: Record<string, number>;
    by_skill: Record<string, number>;
  }> {
    const entries = await this.getLearningEntries();
    
    const totalExecutions = entries.length;
    const successCount = entries.filter(e => e.success).length;
    const successRate = totalExecutions > 0 ? successCount / totalExecutions : 0;
    const avgDuration = totalExecutions > 0 
      ? entries.reduce((sum, e) => sum + e.duration_ms, 0) / totalExecutions 
      : 0;

    const byRole: Record<string, number> = {};
    const bySkill: Record<string, number> = {};

    for (const entry of entries) {
      byRole[entry.role] = (byRole[entry.role] || 0) + 1;
      bySkill[entry.skill] = (bySkill[entry.skill] || 0) + 1;
    }

    return {
      total_executions: totalExecutions,
      success_rate: successRate,
      avg_duration_ms: avgDuration,
      by_role: byRole,
      by_skill: bySkill,
    };
  }

  /**
   * Clear learning data
   */
  async clearLearning(): Promise<number> {
    const entries = await this.getLearningEntries();
    let deletedCount = 0;

    for (const entry of entries) {
      await this.memoryManager.delete(`learning-${entry.id}`);
      deletedCount++;
    }

    return deletedCount;
  }

  /**
   * Generate a learning report
   */
  async generateReport(): Promise<{
    stats: any;
    insights: LearningInsight[];
    recommendations: string[];
  }> {
    const stats = await this.getStats();
    const insights = await this.analyzePatterns();
    
    const recommendations: string[] = insights.map(i => i.recommendation);

    return {
      stats,
      insights,
      recommendations,
    };
  }
}

export function createLearningManager(projectRoot?: string): LearningManager {
  return new LearningManager(projectRoot);
}
