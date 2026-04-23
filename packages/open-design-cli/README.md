# @open-design/cli

CLI tool for Open Design specification documents - lint, validate, template, and export.

## Installation

```bash
cd packages/open-design-cli
bun install
```

## Usage

### lint

Validate a specification document for structural correctness.

```bash
bun run src/index.ts lint docs/DESIGN-SPEC.md
bun run src/index.ts lint docs/RESEARCH-SPEC.md
```

### template

Generate a document template based on specification type.

```bash
# Generate design spec template
bun run src/index.ts template design-spec --output ./templates/

# Generate research spec template with specific document type
bun run src/index.ts template research-spec user-persona --output ./templates/
```

### validate

Validate an actual document against its specification.

```bash
bun run src/index.ts validate docs/DESIGN-SPEC.md actual-design.md
bun run src/index.ts validate docs/RESEARCH-SPEC.md actual-user-persona.md
```

### export

Export specification document to other formats.

```bash
# Export to JSON
bun run src/index.ts export docs/DESIGN-SPEC.md --format json

# Export to HTML
bun run src/index.ts export docs/DESIGN-SPEC.md --format html --output output.html

# Export to TypeScript types
bun run src/index.ts export docs/DESIGN-SPEC.md --format typescript --output types.ts
```

## Supported Specification Types

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
├── index.ts           # CLI entry point
├── commands/          # CLI commands
│   ├── lint.ts
│   ├── template.ts
│   ├── validate.ts
│   └── export.ts
├── validators/        # Specification validators
│   ├── design-spec.ts
│   ├── research-spec.ts
│   ├── strategy-spec.ts
│   ├── interaction-spec.ts
│   ├── ops-spec.ts
│   └── index.ts
├── parsers/           # YAML and Markdown parsers
│   ├── yaml-parser.ts
│   ├── markdown-parser.ts
│   └── index.ts
├── exporters/         # Format exporters
│   ├── json-exporter.ts
│   ├── html-exporter.ts
│   └── index.ts
└── utils/             # Utility functions
    ├── file-utils.ts
    ├── format-utils.ts
    └── index.ts
```

## License

MIT
