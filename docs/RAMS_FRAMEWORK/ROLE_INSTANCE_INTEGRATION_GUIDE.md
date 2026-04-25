# Role Instance Integration Guide

角色实例集成指南，说明如何将技能执行系统集成到角色实例中。

---

## 概述

本文档说明如何将技能执行系统集成到角色实例中，包括技能实现覆盖、优先级解析、Schema验证、依赖检查、版本兼容性等功能。

## 角色实例配置

### 完整配置格式

```yaml
role_instance:
  # 实例标识
  instance_id: "game-designer-voodoo-style-claude-opus-1714020000"
  
  # 角色定义
  role_definition:
    role_id: "game-designer"
    role_name: "Game Designer"
    role_version: "1.0.0"
    description: "游戏策划，负责游戏机制设计、关卡进度设计和用户体验设计"
    soul_ref: "soul.md"
    variants_ref: "variants.yaml"
  
  # 变体选择
  variant:
    name: "voodoo-style"
    description: "专精于混合休闲游戏创意发现、题材验证和玩法融合的游戏策划"
    priority: 10
    metadata:
      methodology: "voodoo"
      focus: "hybrid-casual"
      expertise: "creative-discovery, topic-validation"
  
  # 技能组合（基础技能 + 变体技能）
  skills:
    # 基础角色技能
    - design_game_mechanics
    - design_level_progression
    - balance_gameplay
    - design_user_experience
    - create_game_design_document
    
    # 变体额外技能
    - creative-discovery
    - topic-validation
    - hybrid-casual-design
    - market-localization
    - viral-content-analysis
  
  # 技能实现覆盖
  skill_implementations:
    creative-discovery:
      implementation: fast
      config:
        temperature: 0.3
        max_tokens: 1000
    
    topic-validation:
      implementation: api
      config:
        endpoint: https://custom-api.com/validate
  
  # 演员/模型配置
  actor_config:
    provider: "anthropic"
    model: "claude-3-opus"
    api_key: "sk-ant-xxx"
    base_url: "https://api.anthropic.com"
    temperature: 0.7
    max_tokens: 4000
  
  # 运行时状态
  runtime_state:
    memory: {}
    state: {}
    skill_cache: {}
    soul_content: null
  
  # 时间戳
  created_at: "2026-04-25T12:53:00Z"
  updated_at: "2026-04-25T12:53:00Z"
```

## 技能实现覆盖

### 覆盖优先级

优先级从高到低：
1. 角色实例级别覆盖 (`skill_implementations`)
2. 变体级别配置 (`variants.yaml` 中的 `skill_implementations`)
3. 技能默认配置 (`implementation.yaml` 中的 `default`)

### 实现覆盖逻辑

```python
class SkillImplementationResolver:
    """技能实现解析器"""
    
    def __init__(self, role_instance: Dict[str, Any]):
        self.role_instance = role_instance
    
    def resolve_implementation(self, skill_name: str) -> Dict[str, Any]:
        """解析技能实现配置"""
        # 1. 检查角色实例级别覆盖
        instance_override = self.role_instance.get('skill_implementations', {}).get(skill_name)
        if instance_override:
            return self._merge_with_default(skill_name, instance_override)
        
        # 2. 检查变体级别配置
        variant = self.role_instance.get('variant')
        if variant:
            variant_impl = self._load_variant_implementation(variant['name'], skill_name)
            if variant_impl:
                return self._merge_with_default(skill_name, variant_impl)
        
        # 3. 使用技能默认配置
        return self._load_default_implementation(skill_name)
    
    def _merge_with_default(self, skill_name: str, override: Dict[str, Any]) -> Dict[str, Any]:
        """合并覆盖配置与默认配置"""
        default = self._load_default_implementation(skill_name)
        if not default:
            return override
        
        # 合并配置
        merged = {**default, **override}
        if 'config' in override and 'config' in default:
            merged['config'] = {**default['config'], **override['config']}
        
        return merged
    
    def _load_default_implementation(self, skill_name: str) -> Dict[str, Any]:
        """加载技能默认实现配置"""
        skill_path = f".claude/skills/game-development-role/skills/{skill_name}"
        impl_path = f"{skill_path}/implementation.yaml"
        
        try:
            with open(impl_path, 'r', encoding='utf-8') as f:
                config = yaml.safe_load(f)
                return config.get('implementation', {}).get('default', {})
        except FileNotFoundError:
            return {}
    
    def _load_variant_implementation(self, variant_name: str, skill_name: str) -> Dict[str, Any]:
        """加载变体实现配置"""
        # 从variants.yaml加载变体配置
        pass
```

## Schema验证集成

### 输入验证

```python
class RoleInstanceValidator:
    """角色实例验证器"""
    
    def __init__(self, role_instance: Dict[str, Any]):
        self.role_instance = role_instance
        self.skill_validators = {}
        self._init_validators()
    
    def _init_validators(self):
        """初始化技能验证器"""
        for skill_name in self.role_instance.get('skills', []):
            skill_path = f".claude/skills/game-development-role/skills/{skill_name}"
            self.skill_validators[skill_name] = SchemaValidator(skill_name, skill_path)
    
    def validate_skill_input(self, skill_name: str, input_data: Dict[str, Any]) -> bool:
        """验证技能输入"""
        validator = self.skill_validators.get(skill_name)
        if not validator:
            return True  # 无验证器则跳过
        
        return validator.validate_input(input_data)
    
    def validate_skill_output(self, skill_name: str, output_data: Dict[str, Any]) -> bool:
        """验证技能输出"""
        validator = self.skill_validators.get(skill_name)
        if not validator:
            return True  # 无验证器则跳过
        
        return validator.validate_output(output_data)
```

## 依赖检查集成

### 依赖检查

```python
class RoleInstanceDependencyChecker:
    """角色实例依赖检查器"""
    
    def __init__(self, role_instance: Dict[str, Any]):
        self.role_instance = role_instance
        self.dependency_resolvers = {}
        self._init_resolvers()
    
    def _init_resolvers(self):
        """初始化依赖解析器"""
        for skill_name in self.role_instance.get('skills', []):
            skill_path = f".claude/skills/game-development-role/skills/{skill_name}"
            self.dependency_resolvers[skill_name] = DependencyResolver(skill_name, skill_path)
    
    def check_skill_dependencies(self, skill_name: str) -> Dict[str, Any]:
        """检查技能依赖"""
        resolver = self.dependency_resolvers.get(skill_name)
        if not resolver:
            return {'satisfied': True, 'missing': [], 'optional_missing': []}
        
        return resolver.check_dependencies()
    
    def check_all_dependencies(self) -> Dict[str, Any]:
        """检查所有技能依赖"""
        results = {}
        for skill_name in self.role_instance.get('skills', []):
            results[skill_name] = self.check_skill_dependencies(skill_name)
        return results
```

## 版本兼容性检查

### 版本检查

```python
class RoleInstanceVersionChecker:
    """角色实例版本检查器"""
    
    def __init__(self, role_instance: Dict[str, Any]):
        self.role_instance = role_instance
        self.skill_versions = {}
        self._load_versions()
    
    def _load_versions(self):
        """加载技能版本"""
        for skill_name in self.role_instance.get('skills', []):
            skill_path = f".claude/skills/game-development-role/skills/{skill_name}"
            version_path = f"{skill_path}/version.yaml"
            
            try:
                with open(version_path, 'r', encoding='utf-8') as f:
                    config = yaml.safe_load(f)
                    self.skill_versions[skill_name] = {
                        'version': config.get('version'),
                        'min_framework': config.get('compatibility', {}).get('min_framework_version'),
                        'max_framework': config.get('compatibility', {}).get('max_framework_version')
                    }
            except FileNotFoundError:
                self.skill_versions[skill_name] = None
    
    def check_version_compatibility(self, framework_version: str) -> Dict[str, Any]:
        """检查版本兼容性"""
        results = {
            'compatible': True,
            'incompatible_skills': []
        }
        
        for skill_name, version_info in self.skill_versions.items():
            if not version_info:
                continue
            
            skill_version = version_info['version']
            min_framework = version_info['min_framework']
            max_framework = version_info['max_framework']
            
            # 检查框架版本兼容性
            if not self._is_version_compatible(framework_version, min_framework, max_framework):
                results['compatible'] = False
                results['incompatible_skills'].append({
                    'skill': skill_name,
                    'version': skill_version,
                    'required': f"{min_framework}-{max_framework}",
                    'current': framework_version
                })
        
        return results
    
    def _is_version_compatible(self, current: str, min_required: str, max_allowed: str) -> bool:
        """检查版本兼容性"""
        # 实现版本比较逻辑
        return True
```

## 完整集成实现

### RoleInstance 类

```python
class RoleInstance:
    """角色实例（完整集成）"""
    
    def __init__(self, role_instance_config: Dict[str, Any]):
        self.config = role_instance_config
        
        # 初始化组件
        self.impl_resolver = SkillImplementationResolver(role_instance_config)
        self.validator = RoleInstanceValidator(role_instance_config)
        self.dep_checker = RoleInstanceDependencyChecker(role_instance_config)
        self.version_checker = RoleInstanceVersionChecker(role_instance_config)
        
        # 初始化技能执行器
        self.skill_executors = {}
        self._init_executors()
    
    def _init_executors(self):
        """初始化技能执行器"""
        for skill_name in self.config.get('skills', []):
            skill_path = f".claude/skills/game-development-role/skills/{skill_name}"
            self.skill_executors[skill_name] = IntegratedSkillExecutor(skill_name, skill_path)
    
    def execute_skill(self, skill_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """执行技能（完整流程）"""
        # 1. 检查依赖
        dep_result = self.dep_checker.check_skill_dependencies(skill_name)
        if not dep_result['satisfied']:
            raise RuntimeError(f"Dependencies not satisfied: {dep_result['missing']}")
        
        # 2. 验证输入
        if not self.validator.validate_skill_input(skill_name, input_data):
            raise RuntimeError("Input validation failed")
        
        # 3. 解析实现配置
        impl_config = self.impl_resolver.resolve_implementation(skill_name)
        
        # 4. 执行技能
        executor = self.skill_executors.get(skill_name)
        if not executor:
            raise RuntimeError(f"Skill executor not found: {skill_name}")
        
        result = executor.execute(input_data, impl_config)
        
        # 5. 验证输出
        if not self.validator.validate_skill_output(skill_name, result):
            raise RuntimeError("Output validation failed")
        
        return result
    
    def check_compatibility(self, framework_version: str) -> Dict[str, Any]:
        """检查兼容性"""
        return self.version_checker.check_version_compatibility(framework_version)
```

## 使用示例

### 创建角色实例

```python
# 加载角色实例配置
with open('role_instance_config.yaml', 'r', encoding='utf-8') as f:
    config = yaml.safe_load(f)

# 创建角色实例
role_instance = RoleInstance(config)

# 检查兼容性
compatibility = role_instance.check_compatibility("1.0.0")
if not compatibility['compatible']:
    print(f"Incompatible skills: {compatibility['incompatible_skills']}")

# 执行技能
input_data = {
    'game_concept': 'RPG game',
    'target_audience': 'adults',
    'platform': 'mobile'
}

result = role_instance.execute_skill('creative-discovery', input_data)
print(result)
```

## 变体配置示例

### variants.yaml 更新

```yaml
# .claude/roles/game-development/game-designer/variants.yaml
variants:
  - name: voodoo-style
    base_role: game-designer
    additional_skills:
      - creative-discovery
      - topic-validation
      - hybrid-casual-design
      - market-localization
      - viral-content-analysis
    skill_implementations:
      creative-discovery:
        implementation: fast
        config:
          temperature: 0.5
          max_tokens: 2000
    description: 专精于混合休闲游戏创意发现、题材验证和玩法融合的游戏策划
    priority: 10
    metadata:
      methodology: voodoo
      focus: hybrid-casual
```

## 错误处理

### 错误处理策略

```python
class RoleInstanceErrorHandler:
    """角色实例错误处理器"""
    
    def handle_dependency_error(self, skill_name: str, dep_result: Dict[str, Any]):
        """处理依赖错误"""
        missing = dep_result['missing']
        optional_missing = dep_result['optional_missing']
        
        if missing:
            raise RuntimeError(f"Required dependencies missing for {skill_name}: {missing}")
        
        if optional_missing:
            print(f"Optional dependencies missing for {skill_name}: {optional_missing}")
    
    def handle_validation_error(self, skill_name: str, error: Exception):
        """处理验证错误"""
        raise RuntimeError(f"Validation failed for {skill_name}: {error}")
    
    def handle_execution_error(self, skill_name: str, error: Exception):
        """处理执行错误"""
        # 尝试降级实现
        fallback_impl = self._get_fallback_implementation(skill_name)
        if fallback_impl:
            print(f"Attempting fallback implementation for {skill_name}")
            return self._execute_with_fallback(skill_name, fallback_impl)
        else:
            raise RuntimeError(f"Execution failed for {skill_name}: {error}")
```

## 性能优化

### 并行执行

```python
import asyncio

class ParallelRoleInstance(RoleInstance):
    """支持并行执行的角色实例"""
    
    async def execute_skills_parallel(self, skill_inputs: Dict[str, Dict[str, Any]]) -> Dict[str, Any]:
        """并行执行多个技能"""
        tasks = []
        for skill_name, input_data in skill_inputs.items():
            task = asyncio.create_task(self._execute_skill_async(skill_name, input_data))
            tasks.append((skill_name, task))
        
        results = {}
        for skill_name, task in tasks:
            try:
                results[skill_name] = await task
            except Exception as e:
                results[skill_name] = {'error': str(e)}
        
        return results
    
    async def _execute_skill_async(self, skill_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """异步执行技能"""
        # 实现异步执行逻辑
        pass
```

## 监控和日志

### 执行监控

```python
class MonitoredRoleInstance(RoleInstance):
    """支持监控的角色实例"""
    
    def execute_skill(self, skill_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """执行技能（带监控）"""
        start_time = time.time()
        
        try:
            result = super().execute_skill(skill_name, input_data)
            
            # 记录成功指标
            duration = time.time() - start_time
            self._record_success(skill_name, duration)
            
            return result
            
        except Exception as e:
            # 记录失败指标
            duration = time.time() - start_time
            self._record_failure(skill_name, duration, str(e))
            raise
    
    def _record_success(self, skill_name: str, duration: float):
        """记录成功指标"""
        print(f"Skill {skill_name} executed successfully in {duration:.2f}s")
    
    def _record_failure(self, skill_name: str, duration: float, error: str):
        """记录失败指标"""
        print(f"Skill {skill_name} failed after {duration:.2f}s: {error}")
```

## 总结

本指南提供了角色实例集成的完整实现，包括：

1. **技能实现覆盖**：优先级解析和配置合并
2. **Schema验证**：输入输出验证集成
3. **依赖检查**：技能依赖检查集成
4. **版本兼容性**：框架版本兼容性检查
5. **完整集成**：RoleInstance类实现
6. **错误处理**：依赖、验证、执行错误处理
7. **性能优化**：并行执行支持
8. **监控日志**：执行监控和日志记录

实际实现时需要根据具体需求调整和完善各个组件。
