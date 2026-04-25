"""
Variant Loader - Runtime skill combination mechanism for RAMS framework

This module provides functionality to load and instantiate role variants
by combining base roles with additional skills.
"""

import yaml
from pathlib import Path
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field


@dataclass
class SkillConfig:
    """Skill configuration"""
    name: str
    engine: Optional[str] = None
    tools: List[str] = field(default_factory=list)
    config: Dict[str, Any] = field(default_factory=dict)


@dataclass
class VariantConfig:
    """Variant configuration"""
    name: str
    base_role: str
    additional_skills: List[str] = field(default_factory=list)
    skill_overrides: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    skill_priority: Dict[str, int] = field(default_factory=dict)
    description: str = ""
    tags: List[str] = field(default_factory=list)


@dataclass
class RoleConfig:
    """Role configuration"""
    name: str
    skills: Dict[str, SkillConfig] = field(default_factory=dict)
    description: str = ""
    variants: List[str] = field(default_factory=list)


class VariantLoader:
    """Load and instantiate role variants"""
    
    def __init__(self, roles_dir: Path, skills_dir: Path):
        """
        Initialize variant loader
        
        Args:
            roles_dir: Path to roles directory
            skills_dir: Path to skills directory
        """
        self.roles_dir = Path(roles_dir)
        self.skills_dir = Path(skills_dir)
        self._role_cache: Dict[str, RoleConfig] = {}
        self._variant_cache: Dict[str, VariantConfig] = {}
    
    def load_role(self, role_name: str) -> RoleConfig:
        """
        Load base role configuration
        
        Args:
            role_name: Name of the role to load
            
        Returns:
            RoleConfig object
        """
        if role_name in self._role_cache:
            return self._role_cache[role_name]
        
        role_path = self.roles_dir / role_name / "role.md"
        if not role_path.exists():
            raise FileNotFoundError(f"Role not found: {role_name}")
        
        # Parse role.md to extract skills
        # This is a simplified implementation
        # In production, you'd parse the markdown properly
        role_config = RoleConfig(name=role_name)
        
        # Load variants if they exist
        variants_path = self.roles_dir / role_name / "variants.yaml"
        if variants_path.exists():
            variants = self._load_variants_yaml(variants_path)
            role_config.variants = [v.name for v in variants]
            for variant in variants:
                self._variant_cache[variant.name] = variant
        
        self._role_cache[role_name] = role_config
        return role_config
    
    def _load_variants_yaml(self, variants_path: Path) -> List[VariantConfig]:
        """Load variants from YAML file"""
        with open(variants_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        variants = []
        for variant_data in data.get('variants', []):
            variant = VariantConfig(
                name=variant_data['name'],
                base_role=variant_data['base_role'],
                additional_skills=variant_data.get('additional_skills', []),
                skill_overrides=variant_data.get('skill_overrides', {}),
                skill_priority=variant_data.get('skill_priority', {}),
                description=variant_data.get('description', ''),
                tags=variant_data.get('tags', [])
            )
            variants.append(variant)
        
        return variants
    
    def load_variant(self, variant_name: str) -> RoleConfig:
        """
        Load and instantiate a role variant
        
        Args:
            variant_name: Name of the variant to load
            
        Returns:
            RoleConfig object with merged skills
        """
        # Find variant in cache
        variant = self._variant_cache.get(variant_name)
        if not variant:
            # Try to find it by scanning all roles
            variant = self._find_variant(variant_name)
            if not variant:
                raise ValueError(f"Variant not found: {variant_name}")
        
        # Load base role
        base_role = self.load_role(variant.base_role)
        
        # Merge skills
        merged_skills = self._merge_skills(
            base_role.skills,
            variant.additional_skills
        )
        
        # Apply skill overrides
        for skill_name, override_config in variant.skill_overrides.items():
            if skill_name in merged_skills:
                skill = merged_skills[skill_name]
                for key, value in override_config.items():
                    setattr(skill, key, value)
        
        # Resolve conflicts based on priority
        resolved_skills = self._resolve_conflicts(
            merged_skills,
            variant.skill_priority
        )
        
        # Create new role config
        variant_role = RoleConfig(
            name=variant.name,
            skills=resolved_skills,
            description=variant.description,
            variants=[]
        )
        
        return variant_role
    
    def _find_variant(self, variant_name: str) -> Optional[VariantConfig]:
        """Find variant by scanning all roles"""
        for role_dir in self.roles_dir.iterdir():
            if role_dir.is_dir():
                variants_path = role_dir / "variants.yaml"
                if variants_path.exists():
                    variants = self._load_variants_yaml(variants_path)
                    for variant in variants:
                        if variant.name == variant_name:
                            self._variant_cache[variant.name] = variant
                            return variant
        return None
    
    def _merge_skills(
        self,
        base_skills: Dict[str, SkillConfig],
        additional_skill_names: List[str]
    ) -> Dict[str, SkillConfig]:
        """Merge base skills with additional skills"""
        merged = dict(base_skills)
        
        for skill_name in additional_skill_names:
            # Load skill configuration
            skill_path = self.skills_dir / skill_name / "SKILL.md"
            if skill_path.exists():
                # Create skill config (simplified)
                skill_config = SkillConfig(name=skill_name)
                merged[skill_name] = skill_config
            else:
                print(f"Warning: Skill not found: {skill_name}")
        
        return merged
    
    def _resolve_conflicts(
        self,
        skills: Dict[str, SkillConfig],
        priorities: Dict[str, int]
    ) -> Dict[str, SkillConfig]:
        """
        Resolve skill conflicts based on priority
        
        Higher priority values take precedence
        """
        # If no priorities, return as-is
        if not priorities:
            return skills
        
        # Sort skills by priority
        sorted_skills = sorted(
            skills.items(),
            key=lambda x: priorities.get(x[0], 0),
            reverse=True
        )
        
        return dict(sorted_skills)
    
    def list_variants(self, role_name: Optional[str] = None) -> List[str]:
        """
        List all available variants
        
        Args:
            role_name: If specified, only list variants for this role
            
        Returns:
            List of variant names
        """
        if role_name:
            role = self.load_role(role_name)
            return role.variants
        
        # List all variants
        all_variants = []
        for role_dir in self.roles_dir.iterdir():
            if role_dir.is_dir():
                variants_path = role_dir / "variants.yaml"
                if variants_path.exists():
                    variants = self._load_variants_yaml(variants_path)
                    all_variants.extend([v.name for v in variants])
        
        return all_variants
    
    def validate_variant(self, variant_name: str) -> List[str]:
        """
        Validate a variant configuration
        
        Args:
            variant_name: Name of the variant to validate
            
        Returns:
            List of validation errors (empty if valid)
        """
        errors = []
        
        try:
            variant = self._variant_cache.get(variant_name)
            if not variant:
                variant = self._find_variant(variant_name)
                if not variant:
                    errors.append(f"Variant not found: {variant_name}")
                    return errors
            
            # Validate base role exists
            base_role_path = self.roles_dir / variant.base_role / "role.md"
            if not base_role_path.exists():
                errors.append(f"Base role not found: {variant.base_role}")
            
            # Validate additional skills exist
            for skill_name in variant.additional_skills:
                skill_path = self.skills_dir / skill_name / "SKILL.md"
                if not skill_path.exists():
                    errors.append(f"Skill not found: {skill_name}")
            
            # Validate skill overrides reference existing skills
            for skill_name in variant.skill_overrides.keys():
                if skill_name not in variant.additional_skills:
                    # Check if it's in base role
                    base_role = self.load_role(variant.base_role)
                    if skill_name not in base_role.skills:
                        errors.append(f"Skill override references non-existent skill: {skill_name}")
            
        except Exception as e:
            errors.append(f"Validation error: {str(e)}")
        
        return errors


# Example usage
if __name__ == "__main__":
    # Initialize loader
    loader = VariantLoader(
        roles_dir=Path(".claude/roles/game-development"),
        skills_dir=Path(".claude/skills/game-development-role/skills")
    )
    
    # List all variants
    print("Available variants:")
    for variant in loader.list_variants():
        print(f"  - {variant}")
    
    # Load a specific variant
    try:
        variant_role = loader.load_variant("unity-gameplay-programmer")
        print(f"\nLoaded variant: {variant_role.name}")
        print(f"Description: {variant_role.description}")
        print(f"Skills: {list(variant_role.skills.keys())}")
    except Exception as e:
        print(f"Error loading variant: {e}")
    
    # Validate a variant
    errors = loader.validate_variant("unity-gameplay-programmer")
    if errors:
        print(f"\nValidation errors:")
        for error in errors:
            print(f"  - {error}")
    else:
        print("\nVariant is valid")
