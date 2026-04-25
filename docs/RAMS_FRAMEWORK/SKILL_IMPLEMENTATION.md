# Skill Implementation Configuration Format

定义技能实现配置格式，支持多种实现方式（AI模型、API、脚本等）的动态配置。

---

## 概述

技能实现配置允许为技能定义多种实现方式，支持动态选择和覆盖。例如：
- `creative-discovery` 可以通过 AI模型、API或脚本实现
- 角色实例可以覆盖技能的默认实现方式
- 不同运行环境可以选择兼容的实现方式

## 配置格式

### 实现定义文件

实现定义使用YAML格式，位于技能目录下的 `implementation.yaml` 文件。

```yaml
# 技能实现配置
implementation:
  # 默认实现方式
  default:
    type: ai-model
    provider: anthropic
    model: claude-3-opus
    temperature: 0.7
    max_tokens: 4000
  
  # 可选实现方式
  alternatives:
    - name: fast-implementation
      type: ai-model
      provider: anthropic
      model: claude-3-sonnet
      temperature: 0.5
      max_tokens: 2000
      description: 快速实现，适合原型开发
    
    - name: api-implementation
      type: api
      endpoint: https://api.example.com/skill/creative-discovery
      method: POST
      headers:
        Authorization: Bearer ${API_KEY}
      description: 通过API调用第三方服务
    
    - name: script-implementation
      type: script
      script: scripts/creative-discovery.py
      runtime: python
      description: 使用Python脚本实现
```

## 实现类型定义

### AI模型实现

```yaml
type: ai-model
provider: anthropic | openai | xai | google | custom
model: string
api_key: string
base_url: string
temperature: float
max_tokens: int
top_p: float
frequency_penalty: float
presence_penalty: float
```

**示例：**
```yaml
type: ai-model
provider: anthropic
model: claude-3-opus
api_key: ${ANTHROPIC_API_KEY}
base_url: https://api.anthropic.com
temperature: 0.7
max_tokens: 4000
top_p: 0.9
```

### API实现

```yaml
type: api
endpoint: string
method: GET | POST | PUT | DELETE
headers: dict
body_template: string
response_parser: string
timeout: int
retry_count: int
retry_delay: int
```

**示例：**
```yaml
type: api
endpoint: https://api.creative-ai.com/discover
method: POST
headers:
  Authorization: Bearer ${CREATIVE_AI_KEY}
  Content-Type: application/json
body_template: '{"input": "{{input}}", "context": "{{context}}"}'
response_parser: json
timeout: 30
retry_count: 3
retry_delay: 5
```

### 脚本实现

```yaml
type: script
script: string
runtime: python | nodejs | bash | powershell
args: list
env_vars: dict
timeout: int
working_dir: string
```

**示例：**
```yaml
type: script
script: scripts/creative-discovery.py
runtime: python
args:
  - --input
  - "{{input}}"
  - --output
  - "{{output}}"
env_vars:
  PYTHONPATH: ./scripts
timeout: 60
working_dir: ./
```

### 工具实现

```yaml
type: tool
tool: string
config: dict
```

**示例：**
```yaml
type: tool
tool: figma
config:
  access_token: ${FIGMA_TOKEN}
  file_id: "{{file_id}}"
```

### 组合实现

```yaml
type: composite
steps:
  - name: step1
    type: ai-model
    config: {...}
  - name: step2
    type: api
    config: {...}
  - name: step3
    type: script
    config: {...}
```

**示例：**
```yaml
type: composite
steps:
  - name: generate-ideas
    type: ai-model
    provider: anthropic
    model: claude-3-opus
  - name: validate-ideas
    type: api
    endpoint: https://api.validator.com/check
  - name: format-output
    type: script
    script: scripts/format-output.py
```

## 角色实例级别覆盖

在角色实例配置中覆盖技能实现：

```yaml
role_instance:
  # ... 其他配置
  
  # 技能实现覆盖
  skill_implementations:
    creative-discovery:
      implementation: fast-implementation
      config:
        temperature: 0.3
        max_tokens: 1000
    
    topic-validation:
      implementation: api-implementation
      config:
        endpoint: https://custom-api.com/validate
```

## 技能配置优先级

优先级从高到低：
1. 角色实例级别覆盖 (`skill_implementations`)
2. 变体级别配置 (`variants.yaml` 中的 `skill_implementations`)
3. 技能默认配置 (`implementation.yaml` 中的 `default`)

## 运行时兼容性

### 环境依赖定义

在技能实现配置中定义环境依赖：

```yaml
implementation:
  default:
    type: ai-model
    provider: anthropic
    model: claude-3-opus
  
  # 环境要求
  runtime_requirements:
    required:
      - ai_model_support
    compatible_environments:
      - windsurf
      - cursor
      - claude_desktop
      - claude_web
      - openclaw
      - hermes
      - web_application
      - cli_tool
    incompatible_environments:
      - []
```

### 降级策略

```yaml
implementation:
  default:
    type: ai-model
    provider: anthropic
    model: claude-3-opus
  
  # 降级策略
  fallback:
    - implementation: fast-implementation
      condition: "latency > 5s"
    - implementation: script-implementation
      condition: "api_unavailable"
```

## 技能执行器架构

```python
class SkillExecutor:
    def execute(self, skill_name: str, input_data: dict, implementation_config: dict):
        # 1. 加载技能实现配置
        impl_config = self.load_implementation(skill_name, implementation_config)
        
        # 2. 根据类型选择执行器
        executor = self.get_executor(impl_config.type)
        
        # 3. 执行技能
        result = executor.execute(impl_config, input_data)
        
        # 4. 返回结果
        return result

class AIModelExecutor:
    def execute(self, config, input_data):
        # 调用AI模型

class APIExecutor:
    def execute(self, config, input_data):
        # 调用API

class ScriptExecutor:
    def execute(self, config, input_data):
        # 执行脚本
```

## 技能目录结构

```
.claude/skills/game-development-role/skills/
  creative-discovery/
    SKILL.md              # 技能描述
    implementation.yaml   # 实现配置
    schema.yaml           # 输入输出Schema
    dependencies.yaml     # 依赖关系
    version.yaml          # 版本管理
    cache.yaml            # 缓存配置
    monitoring.yaml       # 监控配置
    scripts/              # 脚本文件
      creative-discovery.py
```

## 最佳实践

### 实现设计原则

1. **默认实现优先**：提供可靠的默认实现
2. **多实现支持**：支持多种实现方式以提高灵活性
3. **环境兼容**：考虑不同运行环境的兼容性
4. **降级策略**：提供降级方案以保证可用性
5. **性能优化**：根据场景选择合适的实现

### 配置管理原则

1. **密钥安全**：使用环境变量，不硬编码
2. **超时设置**：为所有实现设置合理的超时
3. **错误处理**：定义清晰的错误处理策略
4. **日志记录**：记录执行日志用于调试
5. **监控指标**：定义关键监控指标

## 示例

### creative-discovery 技能实现配置

```yaml
# .claude/skills/game-development-role/skills/creative-discovery/implementation.yaml
implementation:
  default:
    type: ai-model
    provider: anthropic
    model: claude-3-opus
    temperature: 0.7
    max_tokens: 4000
  
  alternatives:
    - name: fast
      type: ai-model
      provider: anthropic
      model: claude-3-sonnet
      temperature: 0.5
      max_tokens: 2000
      description: 快速实现，适合原型开发
    
    - name: api
      type: api
      endpoint: https://api.creative-ai.com/discover
      method: POST
      headers:
        Authorization: Bearer ${CREATIVE_AI_KEY}
        Content-Type: application/json
      description: 通过API调用第三方服务
    
    - name: script
      type: script
      script: scripts/creative-discovery.py
      runtime: python
      args:
        - --input
        - "{{input}}"
      description: 使用Python脚本实现
  
  runtime_requirements:
    required:
      - ai_model_support
    compatible_environments:
      - windsurf
      - cursor
      - claude_desktop
      - claude_web
      - openclaw
      - hermes
      - web_application
      - cli_tool
  
  fallback:
    - implementation: fast
      condition: "latency > 5s"
    - implementation: script
      condition: "api_unavailable"
```

### 角色实例配置

```yaml
role_instance:
  instance_id: "game-designer-voodoo-style-claude-opus-1714020000"
  
  role_definition:
    role_id: "game-designer"
    role_name: "Game Designer"
  
  variant:
    name: "voodoo-style"
  
  skill_implementations:
    creative-discovery:
      implementation: api
      config:
        endpoint: https://custom-api.com/discover
        headers:
          Authorization: Bearer ${CUSTOM_KEY}
    
    topic-validation:
      implementation: fast
```

## 验证和测试

### 配置验证

- 验证实现类型有效
- 验证配置字段完整
- 验证环境依赖合理
- 验证降级策略有效

### 实现测试

- 测试默认实现
- 测试替代实现
- 测试覆盖逻辑
- 测试降级策略
- 测试环境兼容性
