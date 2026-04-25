# Role Variant Configuration Format

定义角色变体配置格式，支持基于技能组合的动态角色变体。

---

## 概述

角色变体配置允许通过组合基础角色和特定技能来创建专门化的角色变体。例如：
- `gameplay-programmer` + `unity-development` = `unity-gameplay-programmer`
- `ui-designer` + `mobile-ui-design` = `mobile-ui-designer`

## 配置格式

### 变体定义文件

变体定义使用YAML格式，位于角色目录下的 `variants.yaml` 文件。

```yaml
# 角色变体配置
variants:
  # 变体名称
  - name: unity-gameplay-programmer
    # 基础角色
    base_role: gameplay-programmer
    # 额外技能
    additional_skills:
      - unity-development
    # 技能覆盖（可选）
    skill_overrides:
      # 覆盖特定技能的配置
      setup-engine:
        engine: unity
    # 变体描述
    description: Unity游戏逻辑程序员，专注于Unity引擎的游戏玩法开发
    # 变体标签
    tags:
      - unity
      - gameplay
      - programmer

  - name: mobile-ui-designer
    base_role: ui-designer
    additional_skills:
      - mobile-ui-design
    description: 移动端UI设计师，专注于移动平台的界面设计
    tags:
      - mobile
      - ui
      - designer
```

### 多技能组合变体

```yaml
variants:
  - name: unity-mobile-backend-programmer
    base_role: backend-programmer
    additional_skills:
      - unity-development
      - mobile-development
      - csharp-backend
    description: Unity移动端后端程序员，使用C#开发Unity移动游戏后端
    tags:
      - unity
      - mobile
      - backend
      - csharp
```

### 技能优先级

当多个技能有冲突时，使用优先级解决：

```yaml
variants:
  - name: optimized-unity-programmer
    base_role: gameplay-programmer
    additional_skills:
      - unity-development
      - performance-optimization
    # 技能优先级（数字越大优先级越高）
    skill_priority:
      performance-optimization: 10
      unity-development: 5
    description: 优化的Unity程序员，专注于性能优化
```

## 运行时技能组合

### 技能合并规则

1. **基础技能**：继承基础角色的所有技能
2. **额外技能**：添加变体特定的技能
3. **技能覆盖**：使用变体特定的技能配置覆盖基础配置
4. **技能冲突**：根据优先级解决冲突

### 技能配置合并

```yaml
# 基础角色技能配置
skills:
  setup-engine:
    engine: generic
    tools:
      - generic-tool

# 变体技能覆盖
skill_overrides:
  setup-engine:
    engine: unity
    tools:
      - unity-editor
      - visual-studio

# 合并后结果
skills:
  setup-engine:
    engine: unity  # 被覆盖
    tools:
      - unity-editor  # 被覆盖
      - visual-studio  # 被覆盖
```

## 技能实现覆盖

变体可以覆盖技能的默认实现方式：

```yaml
variants:
  - name: fast-unity-programmer
    base_role: gameplay-programmer
    additional_skills:
      - unity-development
    skill_implementations:
      unity-development:
        implementation: fast
        config:
          temperature: 0.5
          max_tokens: 2000
```

详细的技能实现配置请参阅 [SKILL_IMPLEMENTATION.md](SKILL_IMPLEMENTATION.md)。

## Role定义更新

### 支持变体的Role定义

Role定义文件添加 `variants` 字段：

```yaml
---
name: gameplay-programmer
description: 游戏逻辑程序员，负责实现游戏玩法机制和系统
variants:
  - unity-gameplay-programmer
  - unreal-gameplay-programmer
  - godot-gameplay-programmer
---

# Gameplay Programmer Role

游戏逻辑程序员，负责实现游戏玩法机制和系统。
```

### 变体自动发现

系统自动发现 `variants.yaml` 文件并注册变体：

```
.claude/roles/game-development/
  gameplay-programmer/
    role.md
    variants.yaml  # 变体配置
    soul.md
```

## 技能分类体系

### 统一技能分类

所有技能使用统一的分类标签：

```yaml
# 技能分类
categories:
  - engine: 引擎特定技能
  - platform: 平台特定技能
  - tech_stack: 技术栈特定技能
  - domain: 领域特定技能
  - workflow: 工作流技能
  - analysis: 数据分析技能
  - collaboration: 协作技能
  - compliance: 法律合规技能
```

### 技能索引

创建技能索引文件 `SKILL_INDEX.md`：

```markdown
# 技能索引

## 引擎特定技能
- unity-development
- cocos-development
- godot-development
- unreal-development

## 平台特定技能
- mobile-development
- pc-development
- console-development
- web-development

## 技术栈特定技能
- nodejs-backend
- python-backend
- go-backend
- rust-backend
- csharp-backend

## 领域特定技能
- mobile-ui-design
- web-ui-design
- outdoor-environment
- indoor-environment
- character-animation
- environment-animation
```

## 变体命名规范

### 命名模式

变体名称遵循以下模式：

```
[前缀]-[基础角色名称]
```

### 常见前缀

- 引擎前缀：`unity-`, `unreal-`, `godot-`, `cocos-`
- 平台前缀：`mobile-`, `pc-`, `console-`, `web-`
- 技术栈前缀：`nodejs-`, `python-`, `go-`, `rust-`, `csharp-`
- 领域前缀：`mobile-ui-`, `web-ui-`, `outdoor-env-`, `indoor-env-`

### 示例

- `unity-gameplay-programmer`
- `mobile-ui-designer`
- `python-backend-programmer`
- `outdoor-environment-artist`

## 最佳实践

### 变体设计原则

1. **单一职责**：每个变体专注于一个特定领域
2. **可组合性**：变体应该可以进一步组合
3. **可维护性**：变体配置应该简洁明了
4. **向后兼容**：变体不应该破坏基础角色

### 技能选择原则

1. **最小化**：只添加必要的技能
2. **优先级**：明确技能优先级
3. **冲突处理**：预定义冲突解决方案
4. **文档化**：记录技能选择理由

## 实现示例

### Unity游戏逻辑程序员变体

```yaml
# .claude/roles/game-development/gameplay-programmer/variants.yaml
variants:
  - name: unity-gameplay-programmer
    base_role: gameplay-programmer
    additional_skills:
      - unity-development
    skill_overrides:
      setup-engine:
        engine: unity
        tools:
          - unity-editor
          - visual-studio
          - rider
    description: Unity游戏逻辑程序员，专注于Unity引擎的游戏玩法开发
    tags:
      - unity
      - gameplay
      - programmer
```

### 移动端UI设计师变体

```yaml
# .claude/roles/game-development/ui-designer/variants.yaml
variants:
  - name: mobile-ui-designer
    base_role: ui-designer
    additional_skills:
      - mobile-ui-design
    description: 移动端UI设计师，专注于移动平台的界面设计
    tags:
      - mobile
      - ui
      - designer
```

## 运行时加载

### 变体解析流程

1. 读取基础角色定义
2. 读取变体配置文件
3. 合并技能列表
4. 应用技能覆盖
5. 解决技能冲突
6. 生成最终角色配置

### 变体实例化

```python
# 伪代码
def instantiate_variant(variant_name):
    # 读取变体配置
    variant_config = load_variant_config(variant_name)
    
    # 加载基础角色
    base_role = load_role(variant_config.base_role)
    
    # 合并技能
    merged_skills = merge_skills(
        base_role.skills,
        variant_config.additional_skills
    )
    
    # 应用技能覆盖
    for skill, override in variant_config.skill_overrides.items():
        merged_skills[skill] = override
    
    # 解决冲突
    resolved_skills = resolve_conflicts(
        merged_skills,
        variant_config.skill_priority
    )
    
    # 返回实例化角色
    return Role(
        name=variant_name,
        skills=resolved_skills,
        description=variant_config.description
    )
```

## 验证和测试

### 配置验证

- 验证基础角色存在
- 验证额外技能存在
- 验证技能覆盖格式正确
- 验证优先级数值有效

### 变体测试

- 测试变体实例化
- 测试技能合并
- 测试技能覆盖
- 测试冲突解决
