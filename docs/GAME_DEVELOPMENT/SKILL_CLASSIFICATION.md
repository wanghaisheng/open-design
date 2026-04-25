# 技能分类体系

统一的技能分类系统，用于技能索引、发现和管理。

---

## 分类标准

### 分类维度

技能使用以下维度进行分类：

1. **技术维度**：技能的技术领域
2. **功能维度**：技能的功能用途
3. **平台维度**：技能适用的平台
4. **引擎维度**：技能适用的引擎
5. **优先级维度**：技能的重要性级别

### 分类标签

所有技能使用统一的分类标签：

```yaml
categories:
  # 技术维度
  engine: 引擎特定技能
  platform: 平台特定技能
  tech_stack: 技术栈特定技能
  domain: 领域特定技能
  methodology: 行业方法论技能
  
  # 功能维度
  design: 设计相关技能
  programming: 编程相关技能
  art: 美术相关技能
  audio: 音频相关技能
  production: 制作相关技能
  qa: 质量保证相关技能
  publishing: 发布相关技能
  analysis: 分析相关技能
  economy: 经济相关技能
  
  # 优先级维度
  critical: 关键技能
  important: 重要技能
  optional: 可选技能
```

## 技能分类目录

### 引擎特定技能 (engine)

- **unity-development** - Unity引擎开发
  - 标签: [engine, programming, important]
  - 用途: Unity游戏开发

- **cocos-development** - Cocos引擎开发
  - 标签: [engine, programming, important]
  - 用途: Cocos游戏开发

- **godot-development** - Godot引擎开发
  - 标签: [engine, programming, important]
  - 用途: Godot游戏开发

- **unreal-development** - Unreal引擎开发
  - 标签: [engine, programming, important]
  - 用途: Unreal游戏开发

### 平台特定技能 (platform)

- **mobile-development** - 移动端开发
  - 标签: [platform, programming, important]
  - 用途: iOS/Android开发

- **pc-development** - PC端开发
  - 标签: [platform, programming, important]
  - 用途: Windows/Mac/Linux开发

- **console-development** - 主机端开发
  - 标签: [platform, programming, important]
  - 用途: Nintendo/PlayStation/Xbox开发

- **web-development** - Web端开发
  - 标签: [platform, programming, important]
  - 用途: 浏览器游戏开发

### 技术栈特定技能 (tech_stack)

- **nodejs-backend** - Node.js后端开发
  - 标签: [tech_stack, programming, important]
  - 用途: Node.js服务器开发

- **python-backend** - Python后端开发
  - 标签: [tech_stack, programming, important]
  - 用途: Python服务器开发

- **go-backend** - Go后端开发
  - 标签: [tech_stack, programming, important]
  - 用途: Go服务器开发

- **rust-backend** - Rust后端开发
  - 标签: [tech_stack, programming, important]
  - 用途: Rust服务器开发

- **csharp-backend** - C#后端开发
  - 标签: [tech_stack, programming, important]
  - 用途: C#服务器开发

### 领域特定技能 (domain)

#### UI设计领域

- **mobile-ui-design** - 移动端UI设计
  - 标签: [domain, design, important]
  - 用途: 移动平台UI设计

- **web-ui-design** - Web端UI设计
  - 标签: [domain, design, important]
  - 用途: 浏览器UI设计

#### 环境设计领域

- **outdoor-environment** - 户外环境设计
  - 标签: [domain, art, important]
  - 用途: 户外场景设计

- **indoor-environment** - 室内环境设计
  - 标签: [domain, art, important]
  - 用途: 室内场景设计

#### 动画领域

- **character-animation** - 角色动画
  - 标签: [domain, art, important]
  - 用途: 角色动画制作

- **environment-animation** - 环境动画
  - 标签: [domain, art, important]
  - 用途: 环境动画制作

### 行业方法论技能 (methodology)

#### Voodoo方法论技能

- **creative-discovery** - 创意发现
  - 标签: [methodology, design, important]
  - 用途: 混合休闲游戏创意发现

- **topic-validation** - 题材验证
  - 标签: [methodology, design, important]
  - 用途: 游戏题材验证

- **hybrid-casual-design** - 混合休闲游戏设计
  - 标签: [methodology, design, important]
  - 用途: 混合休闲游戏设计

- **market-localization** - 市场本土化
  - 标签: [methodology, design, important]
  - 用途: 跨市场游戏适配

- **viral-content-analysis** - 病毒内容分析
  - 标签: [methodology, analysis, important]
  - 用途: 病毒内容分析和创意挖掘

#### Supersonic方法论技能

- **market-insight** - 市场洞察
  - 标签: [methodology, analysis, important]
  - 用途: 市场趋势分析

- **prototype-validation** - 原型验证
  - 标签: [methodology, design, important]
  - 用途: 游戏原型验证

- **data-driven-decision** - 数据驱动决策
  - 标签: [methodology, analysis, important]
  - 用途: 数据驱动决策

- **hybrid-monetization** - 混合变现设计
  - 标签: [methodology, economy, important]
  - 用途: 混合变现系统设计

- **user-segmentation** - 用户分层
  - 标签: [methodology, analysis, important]
  - 用途: 用户分层和精准优化

- **fusion-gameplay-design** - 融合玩法设计
  - 标签: [methodology, design, important]
  - 用途: 融合玩法创新设计

#### Tianmei设计方法论技能

- **core-gameplay-design** - 核心玩法设计
  - 标签: [methodology, design, important]
  - 用途: 核心玩法设计

- **game-system-design** - 游戏系统设计
  - 标签: [methodology, design, important]
  - 用途: 游戏系统架构设计

- **economic-system-design** - 经济系统设计
  - 标签: [methodology, economy, important]
  - 用途: 经济系统架构设计

- **game-rule-analysis** - 游戏规则分析
  - 标签: [methodology, analysis, important]
  - 用途: 游戏规则结构分析

- **gmt-framework** - GMT框架应用
  - 标签: [methodology, design, important]
  - 用途: 游戏设计框架应用

### 核心技能 (critical)

以下为核心技能，所有基础角色必须包含：

#### 设计核心技能
- **story-design** - 故事设计
- **character-development** - 角色发展
- **design-systems** - 设计系统
- **level-design** - 关卡设计

#### 编程核心技能
- **gameplay-implementation** - 游戏逻辑实现
- **system-integration** - 系统集成
- **backend-implementation** - 后端实现
- **ui-implementation** - UI实现

#### 美术核心技能
- **concept-art-generation** - 概念艺术生成
- **environment-creation** - 环境创建
- **character-modeling** - 角色建模
- **texture-painting** - 纹理绘制

#### 制作核心技能
- **sprint-plan** - 冲刺计划
- **estimate** - 估算
- **milestone-review** - 里程碑审查
- **risk-management** - 风险管理

### 重要技能 (important)

以下为重要技能，大多数角色需要包含：

#### 设计重要技能
- **interaction-design** - 交互设计
- **balance-check** - 平衡检查
- **design-review** - 设计审查

#### 编程重要技能
- **code-review** - 代码审查
- **performance-optimization** - 性能优化
- **bug-management** - Bug管理

#### 美术重要技能
- **scene-building** - 场景构建
- **lighting-setup** - 光照设置
- **animation-blending** - 动画混合

#### 制作重要技能
- **resource-allocation** - 资源分配
- **team-coordination** - 团队协调
- **quality-standards** - 质量标准

### 可选技能 (optional)

以下为可选技能，根据项目需求选择：

#### 设计可选技能
- **narrative-review** - 叙事评审
- **world-consistency-check** - 世界一致性检查

#### 编程可选技能
- **technical-risk-assessment** - 技术风险评估
- **architecture-decision** - 架构决策

#### 美术可选技能
- **visual-style-guide** - 视觉风格指南
- **art-pipeline-optimization** - 美术管线优化

#### 制作可选技能
- **retrospective** - 回顾
- **vendor-management** - 供应商管理

## 技能索引

### 按分类索引

#### 引擎技能索引
```
engine/
  ├── unity-development
  ├── cocos-development
  ├── godot-development
  └── unreal-development
```

#### 平台技能索引
```
platform/
  ├── mobile-development
  ├── pc-development
  ├── console-development
  └── web-development
```

#### 技术栈技能索引
```
tech_stack/
  ├── nodejs-backend
  ├── python-backend
  ├── go-backend
  ├── rust-backend
  └── csharp-backend
```

#### 领域技能索引
```
domain/
  ├── ui-design/
  │   ├── mobile-ui-design
  │   └── web-ui-design
  ├── environment/
  │   ├── outdoor-environment
  │   └── indoor-environment
  └── animation/
      ├── character-animation
      └── environment-animation
```

#### 行业方法论技能索引
```
methodology/
  ├── voodoo/
  │   ├── creative-discovery
  │   ├── topic-validation
  │   ├── hybrid-casual-design
  │   ├── market-localization
  │   └── viral-content-analysis
  ├── supersonic/
  │   ├── market-insight
  │   ├── prototype-validation
  │   ├── data-driven-decision
  │   ├── hybrid-monetization
  │   ├── user-segmentation
  │   └── fusion-gameplay-design
  └── tianmei/
      ├── core-gameplay-design
      ├── game-system-design
      ├── economic-system-design
      ├── game-rule-analysis
      └── gmt-framework
```

### 按功能索引

#### 设计技能索引
```
design/
  ├── story-design
  ├── character-development
  ├── design-systems
  ├── level-design
  ├── interaction-design
  ├── balance-check
  ├── design-review
  ├── mobile-ui-design
  ├── web-ui-design
  ├── creative-discovery
  ├── topic-validation
  ├── hybrid-casual-design
  ├── market-localization
  ├── prototype-validation
  ├── fusion-gameplay-design
  ├── core-gameplay-design
  ├── game-system-design
  └── gmt-framework
```

#### 编程技能索引
```
programming/
  ├── gameplay-implementation
  ├── system-integration
  ├── backend-implementation
  ├── ui-implementation
  ├── code-review
  ├── performance-optimization
  ├── bug-management
  ├── unity-development
  ├── cocos-development
  ├── godot-development
  ├── unreal-development
  ├── nodejs-backend
  ├── python-backend
  ├── go-backend
  ├── rust-backend
  └── csharp-backend
```

#### 美术技能索引
```
art/
  ├── concept-art-generation
  ├── environment-creation
  ├── character-modeling
  ├── texture-painting
  ├── scene-building
  ├── lighting-setup
  ├── animation-blending
  ├── outdoor-environment
  ├── indoor-environment
  ├── character-animation
  └── environment-animation
```

#### 制作技能索引
```
production/
  ├── sprint-plan
  ├── estimate
  ├── milestone-review
  ├── risk-management
  ├── resource-allocation
  ├── team-coordination
  └── quality-standards
```

#### 分析技能索引
```
analysis/
  ├── viral-content-analysis
  ├── market-insight
  ├── data-driven-decision
  ├── user-segmentation
  └── game-rule-analysis
```

#### 经济技能索引
```
economy/
  ├── hybrid-monetization
  └── economic-system-design
```

## 技能标签系统

### 标签格式

技能标签使用以下格式：

```yaml
tags:
  - [category]  # 分类标签
  - [function]  # 功能标签
  - [priority]  # 优先级标签
```

### 标签示例

```yaml
# 示例1: Unity开发技能
tags:
  - engine
  - programming
  - important

# 示例2: 移动端UI设计技能
tags:
  - domain
  - design
  - important

# 示例3: 故事设计技能
tags:
  - design
  - critical
```

## 技能发现机制

### 基于标签的发现

通过标签组合发现相关技能：

```python
# 查找所有引擎特定技能
def find_engine_skills():
    return skills_with_tag('engine')

# 查找所有设计相关技能
def find_design_skills():
    return skills_with_tag('design')

# 查找所有重要技能
def find_important_skills():
    return skills_with_tag('important')

# 查找引擎+编程技能
def find_engine_programming_skills():
    return skills_with_tags(['engine', 'programming'])
```

### 基于角色的技能推荐

根据角色推荐相关技能：

```python
# 为gameplay-programmer推荐技能
def recommend_skills_for_gameplay_programmer():
    base_skills = ['gameplay-implementation', 'system-integration']
    recommended = []
    
    # 推荐引擎技能
    recommended.extend(find_engine_skills())
    
    # 推荐平台技能
    recommended.extend(find_platform_skills())
    
    return recommended
```

## 技能依赖关系

### 依赖定义

某些技能可能有前置依赖：

```yaml
# bug-management技能依赖
dependencies:
  - functional-testing  # 需要先了解功能测试

# unity-development技能依赖
dependencies:
  - gameplay-implementation  # 需要先了解游戏逻辑实现
```

### 依赖验证

在加载技能时验证依赖：

```python
def validate_skill_dependencies(skill_name):
    skill = load_skill(skill_name)
    for dep in skill.dependencies:
        if not skill_exists(dep):
            raise DependencyError(f"Missing dependency: {dep}")
```

## 技能版本管理

### 版本格式

技能使用语义化版本：

```
MAJOR.MINOR.PATCH
```

- MAJOR: 重大变更，不兼容
- MINOR: 功能添加，向后兼容
- PATCH: 问题修复，向后兼容

### 版本兼容性

检查技能版本兼容性：

```python
def check_skill_compatibility(skill_version, required_version):
    # 检查MAJOR版本是否匹配
    if skill_version.major != required_version.major:
        return False
    
    # 检查MINOR版本是否满足
    if skill_version.minor < required_version.minor:
        return False
    
    return True
```

## 最佳实践

### 技能命名

1. **使用小写字母**：skill-name
2. **使用连字符分隔**：不要使用下划线
3. **描述性命名**：名称应该描述技能功能
4. **避免缩写**：除非是通用缩写

### 技能分类

1. **单一分类**：每个技能只属于一个主要分类
2. **多标签支持**：可以使用多个标签
3. **优先级明确**：明确标记技能优先级
4. **依赖清晰**：清晰定义技能依赖关系

### 技能文档

1. **完整描述**：提供完整的技能描述
2. **适用场景**：列出技能的适用场景
3. **操作步骤**：提供详细的操作步骤
4. **常见错误**：列出常见错误和修正方法
