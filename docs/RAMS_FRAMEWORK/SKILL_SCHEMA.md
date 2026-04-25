# Skill Schema Definition Format

定义技能输入输出Schema格式，支持结构化验证，默认允许额外属性。

---

## 概述

技能Schema定义了技能的输入输出结构，用于验证数据格式、提供类型提示、生成文档。Schema使用JSON Schema格式，支持类型检查、必填字段、枚举值等验证规则。

## 配置格式

### Schema定义文件

Schema定义使用YAML格式，位于技能目录下的 `schema.yaml` 文件。

```yaml
# 技能输入输出Schema
schema:
  input:
    type: object
    properties:
      game_concept:
        type: string
        description: 游戏概念描述
      target_audience:
        type: string
        description: 目标受众
      platform:
        type: string
        enum: [mobile, pc, console, web]
        description: 目标平台
    required: [game_concept]
    additionalProperties: true  # 默认允许额外属性
  
  output:
    type: object
    properties:
      creative_ideas:
        type: array
        items:
          type: object
          properties:
            name: string
            description: string
            feasibility: number
        description: 创意列表
      analysis:
        type: object
        description: 创意分析
    required: [creative_ideas]
```

## Schema类型定义

### 基本类型

```yaml
type: string | number | integer | boolean | object | array | null
```

### 字符串类型

```yaml
type: string
minLength: 0
maxLength: 100
pattern: "^[a-zA-Z0-9_-]+$"
format: email | uri | date-time | uuid
```

**示例：**
```yaml
type: string
minLength: 1
maxLength: 100
pattern: "^[a-zA-Z0-9_]+$"
description: 英文标识符
```

### 数字类型

```yaml
type: number | integer
minimum: 0
maximum: 100
exclusiveMinimum: false
exclusiveMaximum: false
multipleOf: 0.5
```

**示例：**
```yaml
type: number
minimum: 0
maximum: 1
description: 可行性评分（0-1）
```

### 布尔类型

```yaml
type: boolean
```

### 对象类型

```yaml
type: object
properties:
  field1:
    type: string
  field2:
    type: number
required: [field1]
additionalProperties: true | false
minProperties: 1
maxProperties: 10
```

**示例：**
```yaml
type: object
properties:
  name:
    type: string
  age:
    type: integer
    minimum: 0
required: [name]
additionalProperties: true
```

### 数组类型

```yaml
type: array
items:
  type: string
minItems: 1
maxItems: 10
uniqueItems: true
```

**示例：**
```yaml
type: array
items:
  type: object
  properties:
    name: string
    score: number
minItems: 1
maxItems: 100
uniqueItems: false
```

### 枚举类型

```yaml
type: string
enum: [value1, value2, value3]
```

**示例：**
```yaml
type: string
enum: [mobile, pc, console, web]
description: 目标平台
```

### 联合类型

```yaml
type: [string, number]
```

**示例：**
```yaml
type: [string, null]
description: 可选字符串
```

## 复杂Schema示例

### 嵌套对象

```yaml
schema:
  input:
    type: object
    properties:
      game:
        type: object
        properties:
          name:
            type: string
          genre:
            type: string
            enum: [rpg, action, strategy, casual]
          platform:
            type: string
            enum: [mobile, pc, console, web]
        required: [name, genre]
      audience:
        type: object
        properties:
          age_range:
            type: object
            properties:
              min:
                type: integer
                minimum: 0
              max:
                type: integer
                maximum: 100
          region:
            type: string
    required: [game]
```

### 数组嵌套

```yaml
schema:
  output:
    type: object
    properties:
      ideas:
        type: array
        items:
          type: object
          properties:
            name:
              type: string
            description:
              type: string
            tags:
              type: array
              items:
                type: string
            metrics:
              type: object
              properties:
                feasibility:
                  type: number
                  minimum: 0
                  maximum: 1
                market_potential:
                  type: number
                  minimum: 0
                  maximum: 1
          required: [name, description]
    required: [ideas]
```

### 条件验证

```yaml
schema:
  input:
    type: object
    properties:
      platform:
        type: string
        enum: [mobile, pc, console, web]
      mobile_specific:
        type: object
        properties:
          touch_controls:
            type: boolean
      pc_specific:
        type: object
        properties:
          keyboard_controls:
            type: boolean
    if:
      properties:
        platform:
          const: mobile
    then:
      required: [mobile_specific]
    else:
      required: [pc_specific]
```

## Schema验证

### 验证规则

1. **类型检查**：验证数据类型是否匹配
2. **必填字段**：验证必填字段是否存在
3. **枚举值**：验证枚举值是否在允许范围内
4. **数值范围**：验证数值是否在指定范围内
5. **字符串格式**：验证字符串是否符合格式要求
6. **数组长度**：验证数组长度是否在指定范围内
7. **对象属性**：验证对象属性是否符合要求

### 验证模式

```yaml
schema:
  validation_mode: strict | lenient
  # strict: 严格模式，不允许额外属性
  # lenient: 宽松模式，允许额外属性（默认）
```

### 验证错误

```yaml
validation_errors:
  - field: "game_concept"
    error: "required"
    message: "game_concept is required"
  - field: "platform"
    error: "enum"
    message: "platform must be one of: mobile, pc, console, web"
```

## Schema使用

### 输入验证

```python
from skill_validator import validate_input

schema = load_schema("creative-discovery/schema.yaml")
input_data = {
    "game_concept": "RPG game",
    "target_audience": "adults",
    "platform": "mobile"
}

errors = validate_input(schema, input_data)
if errors:
    raise ValidationError(errors)
```

### 输出生成

```python
from skill_generator import generate_output

schema = load_schema("creative-discovery/schema.yaml")
output_data = {
    "creative_ideas": [
        {"name": "Idea 1", "description": "...", "feasibility": 0.8}
    ],
    "analysis": {...}
}

# 验证输出是否符合Schema
errors = validate_output(schema, output_data)
if errors:
    raise ValidationError(errors)
```

### 文档生成

```python
from schema_docs import generate_docs

schema = load_schema("creative-discovery/schema.yaml")
docs = generate_docs(schema)
print(docs)
```

## Schema最佳实践

### 设计原则

1. **最小化必填字段**：只标记真正必填的字段
2. **提供默认值**：为可选字段提供合理的默认值
3. **使用描述**：为每个字段添加清晰的描述
4. **合理使用枚举**：枚举值应该有明确的业务含义
5. **支持扩展**：默认允许额外属性以支持未来扩展

### 命名规范

1. **字段名**：使用snake_case命名
2. **枚举值**：使用小写字母和连字符
3. **描述**：使用清晰简洁的中文或英文

### 版本管理

```yaml
schema:
  version: "1.0.0"
  compatibility:
    min_framework_version: "1.0.0"
```

## 示例

### creative-discovery Schema

```yaml
# .claude/skills/game-development-role/skills/creative-discovery/schema.yaml
schema:
  version: "1.0.0"
  validation_mode: lenient
  
  input:
    type: object
    properties:
      game_concept:
        type: string
        minLength: 1
        maxLength: 500
        description: 游戏概念描述
      
      target_audience:
        type: string
        enum: [children, teens, adults, all_ages]
        description: 目标受众
      
      platform:
        type: string
        enum: [mobile, pc, console, web]
        description: 目标平台
      
      genre:
        type: string
        enum: [rpg, action, strategy, casual, puzzle, simulation]
        description: 游戏类型
      
      constraints:
        type: object
        properties:
          max_budget:
            type: number
            minimum: 0
            description: 最大预算
          team_size:
            type: integer
            minimum: 1
            maximum: 100
            description: 团队大小
    
    required: [game_concept]
    additionalProperties: true
  
  output:
    type: object
    properties:
      creative_ideas:
        type: array
        items:
          type: object
          properties:
            name:
              type: string
              minLength: 1
              description: 创意名称
            
            description:
              type: string
              minLength: 1
              maxLength: 1000
              description: 创意描述
            
            feasibility:
              type: number
              minimum: 0
              maximum: 1
              description: 可行性评分
            
            market_potential:
              type: number
              minimum: 0
              maximum: 1
              description: 市场潜力评分
            
            tags:
              type: array
              items:
                type: string
              description: 创意标签
          
          required: [name, description, feasibility]
        
        minItems: 1
        maxItems: 10
        description: 创意列表
      
      analysis:
        type: object
        properties:
          total_ideas:
            type: integer
            minimum: 0
            description: 创意总数
          
          average_feasibility:
            type: number
            minimum: 0
            maximum: 1
            description: 平均可行性
          
          recommendations:
            type: array
            items:
              type: string
            description: 推荐建议
        
        description: 创意分析
    
    required: [creative_ideas]
    additionalProperties: true
```

## Schema验证工具

### 验证命令

```bash
# 验证技能Schema
rams schema validate --skill creative-discovery

# 生成Schema文档
rams schema docs --skill creative-discovery

# 测试Schema
rams schema test --skill creative-discovery --input test-input.json
```

### 验证API

```python
from rams_schema import SchemaValidator

validator = SchemaValidator()

# 验证输入
result = validator.validate_input("creative-discovery", input_data)
if not result.valid:
    print(result.errors)

# 验证输出
result = validator.validate_output("creative-discovery", output_data)
if not result.valid:
    print(result.errors)
```
