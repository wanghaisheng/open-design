#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import lintCommand from './commands/lint.js';
import templateCommand from './commands/template.js';
import validateCommand from './commands/validate.js';
import exportCommand from './commands/export.js';
import configCommand from './commands/config.js';
import roleCommand from './commands/role.js';
import skillCommand from './commands/skill.js';
import workflowCommand from './commands/workflow.js';
import runtimeCommand from './commands/runtime.js';
import memoryCommand from './commands/memory.js';
import variantCommand from './commands/variant.js';
import toolCommand from './commands/tool.js';
import learningCommand from './commands/learning.js';
import pluginCommand from './commands/plugin.js';
import interactiveCommand from './commands/interactive.js';
import orchestratorCommand from './commands/orchestrator.js';
import auditCommand from './commands/audit.js';
import executionCommand from './commands/execution.js';

const main = defineCommand({
  meta: {
    name: 'open-design',
    version: '1.0.0',
    description: 'CLI tool for Open Design specification documents - lint, validate, template, export, config, role, skill, workflow, runtime, memory, variant, tool, learning, plugin, interactive, orchestrator, audit, and execution',
  },
  subCommands: {
    lint: lintCommand,
    template: templateCommand,
    validate: validateCommand,
    export: exportCommand,
    config: configCommand,
    role: roleCommand,
    skill: skillCommand,
    workflow: workflowCommand,
    runtime: runtimeCommand,
    memory: memoryCommand,
    variant: variantCommand,
    tool: toolCommand,
    learning: learningCommand,
    plugin: pluginCommand,
    interactive: interactiveCommand,
    orchestrator: orchestratorCommand,
    audit: auditCommand,
    execution: executionCommand,
  },
});

runMain(main);
