#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import lintCommand from './commands/lint.js';
import templateCommand from './commands/template.js';
import validateCommand from './commands/validate.js';
import exportCommand from './commands/export.js';

const main = defineCommand({
  meta: {
    name: 'open-design',
    version: '1.0.0',
    description: 'CLI tool for Open Design specification documents - lint, validate, template, and export',
  },
  subCommands: {
    lint: lintCommand,
    template: templateCommand,
    validate: validateCommand,
    export: exportCommand,
  },
});

runMain(main);
