# Industry Methodology Skill and Role Extraction Plan

This plan extracts potential skills and role variants from industry methodology files (Voodoo, Supersonic, Tianmei) to enhance the game development skill library with实战-focused capabilities.

## Overview

Analyze industry methodology documents to extract actionable skills and create specialized role variants, starting with Voodoo-style game designer as a practical example.

## Phase 1: Skill Extraction from Methodologies

### Voodoo Methodology Skills
1. **creative-discovery** - Creative discovery from three pillars (successful pattern translation, real-world observation, gameplay fusion)
2. **topic-validation** - Topic validation using two filters (ad material potential, system depth potential)
3. **hybrid-casual-design** - Hybrid casual game design (hyper-casual core + RPG/strategy meta-systems)
4. **market-localization** - Market localization (Asia to Western market adaptation)
5. **viral-content-analysis** - Viral content analysis from social media platforms

### Supersonic Methodology Skills
1. **market-insight** - Market insight and trend analysis (beyond charts, social media monitoring)
2. **prototype-validation** - Prototype validation using four-dimensional framework (trend, audience, core gameplay, monetization)
3. **data-driven-decision** - Data-driven decision making with kill-switch criteria
4. **hybrid-monetization** - Hybrid monetization design (IAA + IAP synergy)
5. **user-segmentation** - User segmentation and precision optimization
6. **fusion-gameplay-design** - Fusion gameplay design (novel visual + mature gameplay)

### Tianmei Design Methodology Skills
1. **core-gameplay-design** - Core gameplay design (core loop, player goals)
2. **game-system-design** - Game system design (progression, equipment, economy, social, quest, combat)
3. **economic-system-design** - Economic system design (currency, production, consumption, balance)
4. **game-rule-analysis** - Game rule analysis (core structure, primary structure, secondary structure)
5. **gmt-framework** - GMT framework application (Goal-Means-Tools for player and experience goals)

## Phase 2: Role Variant Design

### Game Designer Variants
1. **voodoo-style-designer** - Specialized in hybrid casual game creation, creative discovery, and topic validation
2. **supersonic-style-designer** - Specialized in data-driven prototype validation and hybrid monetization
3. **tianmei-style-designer** - Specialized in systematic game design, core gameplay, and economic systems
4. **hybrid-casual-specialist** - Generalist in hybrid casual game development

### Potential Additional Role Variants
- **market-analyst-variant** - For market insight and trend analysis
- **monetization-designer-variant** - For hybrid monetization specialization
- **prototype-validator-variant** - For rapid prototype testing and validation

## Phase 3: Implementation

### Step 1: Create Skill Files
- Create SKILL.md files for each extracted skill
- Follow existing skill template structure
- Include operation steps, output formats, collaboration protocols

### Step 2: Create Role Variant Definitions
- Create variants.yaml for game-designer role
- Define skill combinations for each variant
- Configure variant priorities and metadata

### Step 3: Update Role Definitions
- Update game-designer role.md with variant references
- Add variant metadata to role definition

### Step 4: Update Documentation
- Update SKILL_INDEX.md with new skills
- Update ROLE_SKILL_MATRIX.md with new skill mappings
- Update SKILL_CLASSIFICATION.md with new skill categories

## Implementation Order (All Skills Equal Priority)

Since no methodology prioritization is required, implement in logical dependency order:

1. **Step 1**: Create all 16 skill files (Voodoo, Supersonic, Tianmei skills)
2. **Step 2**: Create game-designer variants (4 variants)
3. **Step 3**: Create producer variants (2 variants)
4. **Step 4**: Create data-analyst variants (2 variants)
5. **Step 5**: Create economy-designer variants (2 variants)
6. **Step 6**: Update role definitions with variant references
7. **Step 7**: Update documentation (SKILL_INDEX.md, ROLE_SKILL_MATRIX.md, SKILL_CLASSIFICATION.md)

## User Decisions

1. **Create all extracted skills at once** - Implement all 16 skills from Voodoo, Supersonic, and Tianmei methodologies
2. **Create role variants for multiple roles** - Extend beyond game designer to include producer, analyst, and other relevant roles
3. **Role variant approach analysis** - See below
4. **No methodology prioritization** - Implement all methodologies equally

## Role Variant Approach Analysis

### Variants of Existing Roles (Recommended)

**Pros:**
- Consistent with existing variant system architecture
- Enables skill reuse between variants
- Easier maintenance (fewer files)
- Clear specialization hierarchy
- Follows established patterns (already implemented for gameplay-programmer, ui-designer, etc.)

**Cons:**
- Requires existing base roles to be appropriate
- May need to refactor base roles if they're too generic

**Recommendation:** Use variants of existing roles. This aligns with the current architecture and allows for better skill composition and reuse.

### Roles to Create Variants For

1. **game-designer** - voodoo-style, supersonic-style, tianmei-style, hybrid-casual-specialist
2. **producer** - hybrid-casual-producer, data-driven-producer
3. **data-analyst** - market-insight-analyst, prototype-validation-analyst
4. **economy-designer** - hybrid-monetization-designer, economic-system-designer
