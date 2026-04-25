# RAMS CLI

CLI tool for implementing the RAMS (Role-AI-Memory-Skill) framework - a comprehensive system for AI-powered design and game development workflows.

## Overview

Originally designed as a document validation tool for design system specifications, this CLI has evolved into a full implementation of the RAMS framework. It now supports two major scenarios:

1. **General Design Workflows** - AI-assisted design system creation, validation, and documentation
2. **Game Development Workflows** - Specialized tools for game design, development, and production

## Installation

```bash
cd packages/open-design-cli
bun install
```

## Usage

### Document Validation (Original Functionality)

Validate specification documents for structural correctness.

```bash
# Lint a specification document
open-design lint docs/DESIGN-SPEC.md
open-design lint docs/RESEARCH-SPEC.md

# Generate document templates
open-design template design-spec --output ./templates/
open-design template research-spec user-persona --output ./templates/

# Validate against specification
open-design validate docs/DESIGN-SPEC.md actual-design.md

# Export to other formats
open-design export docs/DESIGN-SPEC.md --format json
open-design export docs/DESIGN-SPEC.md --format html --output output.html
```

### RAMS Framework Commands

#### Role Management

```bash
# List available roles
open-design role list

# Load a role configuration
open-design role load game-designer

# Create a new role
open-design role create --name my-role --template game-designer
```

#### Skill Management

```bash
# List available skills
open-design skill list

# Load a skill configuration
open-design skill load creative-discovery

# Execute a skill
open-design skill execute creative-discovery --input input.json
```

#### Workflow Management

```bash
# List available workflows
open-design workflow list

# Execute a workflow
open-design workflow execute design-to-prototype --config config.yaml
```

#### Runtime Management

```bash
# Configure runtime environment
open-design runtime config --model claude-3-opus --environment production

# List available runtimes
open-design runtime list
```

#### Memory Management

```bash
# Store information in memory
open-design memory store --key design-tokens --value tokens.json

# Retrieve from memory
open-design memory retrieve --key design-tokens

# List memory entries
open-design memory list
```

#### Variant Management

```bash
# List role variants
open-design variant list --role game-designer

# Load a variant
open-design variant load unity-gameplay-programmer

# Validate a variant
open-design variant validate unity-gameplay-programmer
```

#### Tool Management

```bash
# List available tools
open-design tool list

# Configure a tool
open-design tool config godot-api --endpoint http://localhost:8080
```

#### Learning & Plugins

```bash
# View learning insights
open-design learning insights

# List plugins
open-design plugin list

# Enable a plugin
open-design plugin enable asset-generation
```

#### Interactive Mode

```bash
# Start interactive session
open-design interactive
```

#### Orchestrator

```bash
# Orchestrate a complex workflow
open-design orchestrator run --workflow game-development --config config.yaml
```

#### Audit

```bash
# Audit RAMS configuration
open-design audit --role game-designer --skills creative-discovery,topic-validation
```

#### Execution Versioning (Git-like)

```bash
# View execution history
open-design execution log --instance <instance-id>

# Undo N steps
open-design execution undo --instance <instance-id> --steps 1

# Redo N steps
open-design execution redo --instance <instance-id> --steps 1

# Checkout to a specific commit
open-design execution checkout --instance <instance-id> --commit <commit-id>

# Branch management
open-design execution branch create --instance <instance-id> --name feature-x
open-design execution branch switch --instance <instance-id> --name feature-x
open-design execution branch list --instance <instance-id>
open-design execution branch delete --instance <instance-id> --name feature-x
```

### Configuration

```bash
# Configure the CLI
open-design config set runtime.model claude-3-opus
open-design config set roles.path .claude/roles
open-design config get runtime.model
```

## Supported Specification Types

### Design Specifications
- **design-spec**: Design system specification (DESIGN-SPEC.md)
- **research-spec**: Research document specification (RESEARCH-SPEC.md)
  - user-persona
  - interview-script
  - usability-test-plan
  - journey-map
  - research-report
- **strategy-spec**: Strategy document specification (STRATEGY-SPEC.md)
  - competitive-analysis
  - design-principles
  - experience-map
  - problem-framing
- **interaction-spec**: Interaction document specification (INTERACTION-SPEC.md)
  - state-machine
  - interaction-flow
  - prototype
  - interaction-spec
- **ops-spec**: Operations document specification (OPS-SPEC.md)
  - design-critique
  - developer-handoff
  - sprint-plan
  - workflow

### Game Development Specifications
- **GDD**: Game Design Document
- **Art Bible**: Art style guide documentation
- **Technical Design**: Technical architecture documents
- **Production Plan**: Production and milestone planning

## RAMS Framework Components

### Roles
AI personas with specialized capabilities for different domains:
- **Design Roles**: game-designer, ui-designer, environment-artist, etc.
- **Technical Roles**: backend-programmer, gameplay-programmer, etc.
- **Production Roles**: producer, qa-lead, etc.

### Skills
Executable capabilities that roles can perform:
- **Discovery Skills**: creative-discovery, topic-validation, market-insight
- **Design Skills**: core-gameplay-design, fusion-gameplay-design, aesthetic-guidance
- **Technical Skills**: csharp-backend, python-backend, rust-backend
- **Production Skills**: agile-planning, kanban-management, bug-management

### Memory
Persistent storage for context and learning:
- Design tokens and patterns
- User preferences and history
- Learning insights and recommendations

### Runtime
Execution environments and configurations:
- Model selection (Claude, GPT, etc.)
- Environment settings (development, production)
- Performance optimization

## Development

### Build

```bash
bun run build
```

### Test

```bash
bun test
```

## Architecture

```
src/
├── index.ts                    # CLI entry point
├── commands/                   # CLI commands
│   ├── lint.ts
│   ├── template.ts
│   ├── validate.ts
│   ├── export.ts
│   ├── config.ts
│   ├── role.ts
│   ├── skill.ts
│   ├── workflow.ts
│   ├── runtime.ts
│   ├── memory.ts
│   ├── variant.ts
│   ├── tool.ts
│   ├── learning.ts
│   ├── plugin.ts
│   ├── interactive.ts
│   ├── orchestrator.ts
│   ├── audit.ts
│   └── execution.ts
├── rams/                       # RAMS framework implementation
│   ├── evaluator.ts
│   ├── interactive-mode.ts
│   ├── learning-manager.ts
│   ├── memory-manager.ts
│   ├── orchestrator.ts
│   ├── plugin-manager.ts
│   ├── role-instance.ts
│   ├── runtime-manager.ts
│   ├── skill-executor.ts
│   ├── tool-executor.ts
│   ├── variant-manager.ts
│   ├── workflow-parser.ts
│   ├── version-manager/        # Git-like execution versioning
│   │   ├── commit-manager.ts
│   │   ├── branch-manager.ts
│   │   ├── undo-redo-manager.ts
│   │   └── index.ts
│   └── tool-channels/
├── validators/                 # Specification validators
│   ├── design-spec.ts
│   ├── research-spec.ts
│   ├── strategy-spec.ts
│   ├── interaction-spec.ts
│   ├── ops-spec.ts
│   └── index.ts
├── parsers/                    # YAML and Markdown parsers
│   ├── yaml-parser.ts
│   ├── markdown-parser.ts
│   └── index.ts
├── exporters/                  # Format exporters
│   ├── json-exporter.ts
│   ├── html-exporter.ts
│   └── index.ts
└── utils/                      # Utility functions
    ├── config-manager.ts
    ├── file-utils.ts
    ├── format-utils.ts
    ├── variant-loader.ts
    └── index.ts
```

## Documentation

For detailed RAMS framework documentation, see:
- [RAMS Framework](../../docs/RAMS_FRAMEWORK/)
- [Game Development RAMS](../../docs/GAME_DEVELOPMENT/)

## License

MIT
