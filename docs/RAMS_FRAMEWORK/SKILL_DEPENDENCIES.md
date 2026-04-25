# Skill Dependencies Definition Format

定义技能依赖关系格式，支持技能依赖、工具依赖、数据依赖。

---

## 概述

技能依赖关系定义了技能执行所需的前置条件，包括其他技能、工具、数据等。依赖关系用于确保技能执行时所有必要条件都已满足。

## 配置格式

### 依赖定义文件

依赖定义使用YAML格式，位于技能目录下的 `dependencies.yaml` 文件。

```yaml
# 技能依赖关系
dependencies:
  skills:
    - name: market-insight
      optional: true
      reason: "需要市场洞察信息"
      version: ">=1.0.0"
  
  tools:
    - name: web-scraper
      version: ">=1.0.0"
      optional: false
      reason: "需要网页抓取工具"
  
  data:
    - name: market-trends
      source: external-api
      optional: true
      reason: "需要市场趋势数据"
  
  runtime:
    - name: python
      version: ">=3.8"
      optional: false
```

## 依赖类型定义

### 技能依赖

```yaml
skills:
  - name: skill-name
    optional: true | false
    version: ">=1.0.0"
    reason: "依赖原因说明"
    parameters:
      - param1: value1
      - param2: value2
```

**示例：**
```yaml
skills:
  - name: market-insight
    optional: true
    version: ">=1.0.0"
    reason: "需要市场洞察信息来验证创意"
    parameters:
      - region: "global"
      - time_range: "30d"
```

### 工具依赖

```yaml
tools:
  - name: tool-name
    version: ">=1.0.0"
    optional: true | false
    reason: "依赖原因说明"
    config:
      key: value
```

**示例：**
```yaml
tools:
  - name: web-scraper
    version: ">=1.0.0"
    optional: false
    reason: "需要网页抓取工具来收集市场数据"
    config:
      timeout: 30
      max_retries: 3
```

### 数据依赖

```yaml
data:
  - name: data-name
    source: file | external-api | database | memory
    optional: true | false
    reason: "依赖原因说明"
    location: string
    format: json | csv | xml
```

**示例：**
```yaml
data:
  - name: market-trends
    source: external-api
    optional: true
    reason: "需要市场趋势数据来分析"
    location: https://api.market.com/trends
    format: json
```

### 运行时依赖

```yaml
runtime:
  - name: runtime-name
    version: ">=1.0.0"
    optional: true | false
    reason: "依赖原因说明"
```

**示例：**
```yaml
runtime:
  - name: python
    version: ">=3.8"
    optional: false
    reason: "需要Python 3.8或更高版本"
  
  - name: nodejs
    version: ">=14.0.0"
    optional: true
    reason: "可选，用于某些脚本"
```

## 依赖解析

### 依赖解析顺序

1. **运行时依赖**：首先检查运行时环境
2. **工具依赖**：检查所需工具是否可用
3. **数据依赖**：检查所需数据是否可访问
4. **技能依赖**：检查前置技能是否已执行

### 依赖检查

```python
from dependency_resolver import DependencyResolver

resolver = DependencyResolver()

# 检查依赖
result = resolver.check_dependencies("creative-discovery")

if not result.satisfied:
    # 处理未满足的依赖
    for dep in result.missing:
        print(f"Missing dependency: {dep.name}")
        if dep.optional:
            print("  (Optional, can continue)")
        else:
            print("  (Required, cannot continue)")
```

### 依赖安装

```python
# 自动安装依赖
resolver.install_dependencies("creative-discovery")

# 仅安装必需依赖
resolver.install_dependencies("creative-discovery", optional=False)
```

## 依赖冲突处理

### 版本冲突

当多个技能依赖不同版本的同一工具时：

```yaml
conflict_resolution:
  strategy: highest | lowest | latest | manual
  # highest: 使用最高版本
  # lowest: 使用最低版本
  # latest: 使用最新版本
  # manual: 手动指定
```

**示例：**
```yaml
conflict_resolution:
  strategy: highest
  overrides:
    web-scraper: "2.0.0"
```

### 循环依赖

检测和处理循环依赖：

```python
# 检测循环依赖
if resolver.has_circular_dependency("creative-discovery"):
    raise CircularDependencyError("Circular dependency detected")
```

## 依赖缓存

### 依赖缓存配置

```yaml
cache:
  enabled: true
  ttl: 3600
  location: .cache/dependencies/
```

### 缓存依赖

```python
# 缓存依赖检查结果
resolver.cache_dependencies("creative-discovery")

# 清除缓存
resolver.clear_cache("creative-discovery")
```

## 依赖版本管理

### 版本约束

```yaml
version: ">=1.0.0,<2.0.0"
# >=1.0.0: 大于等于1.0.0
# <2.0.0: 小于2.0.0
# ~1.2.0: 兼容版本（1.2.x）
# ^1.2.0: 兼容版本（1.x.x）
```

### 版本锁定

```yaml
lock:
  enabled: true
  file: dependencies.lock
```

## 依赖最佳实践

### 设计原则

1. **最小化依赖**：只添加必要的依赖
2. **明确可选性**：清楚标记可选依赖
3. **版本约束**：使用合理的版本约束
4. **文档化原因**：说明每个依赖的原因
5. **处理冲突**：预定义冲突解决策略

### 依赖管理

1. **定期更新**：定期检查依赖更新
2. **安全审计**：定期进行安全审计
3. **性能监控**：监控依赖对性能的影响
4. **文档维护**：保持依赖文档更新

## 示例

### creative-discovery 依赖配置

```yaml
# .claude/skills/game-development-role/skills/creative-discovery/dependencies.yaml
dependencies:
  skills:
    - name: market-insight
      optional: true
      version: ">=1.0.0"
      reason: "需要市场洞察信息来验证创意的市场潜力"
      parameters:
        - region: "global"
        - time_range: "30d"
    
    - name: viral-content-analysis
      optional: true
      version: ">=1.0.0"
      reason: "需要病毒内容分析来发现流行趋势"
  
  tools:
    - name: web-scraper
      version: ">=1.0.0"
      optional: false
      reason: "需要网页抓取工具来收集市场数据"
      config:
        timeout: 30
        max_retries: 3
        user_agent: "RAMS-Skill-Executor/1.0"
    
    - name: text-analyzer
      version: ">=2.0.0"
      optional: true
      reason: "需要文本分析工具来分析创意描述"
  
  data:
    - name: market-trends
      source: external-api
      optional: true
      reason: "需要市场趋势数据来分析"
      location: https://api.market.com/trends
      format: json
      cache_ttl: 3600
    
    - name: successful-games
      source: database
      optional: true
      reason: "需要成功游戏数据作为参考"
      location: postgresql://localhost/games
      format: json
  
  runtime:
    - name: python
      version: ">=3.8"
      optional: false
      reason: "需要Python 3.8或更高版本"
    
    - name: nodejs
      version: ">=14.0.0"
      optional: true
      reason: "可选，用于某些脚本"
  
  conflict_resolution:
    strategy: highest
    overrides:
      web-scraper: "2.0.0"
  
  cache:
    enabled: true
    ttl: 3600
    location: .cache/dependencies/
```

## 依赖验证

### 验证命令

```bash
# 验证技能依赖
rams dependencies validate --skill creative-discovery

# 安装依赖
rams dependencies install --skill creative-discovery

# 检查依赖冲突
rams dependencies check-conflicts --skill creative-discovery

# 生成依赖报告
rams dependencies report --skill creative-discovery
```

### 验证API

```python
from rams_dependencies import DependencyValidator

validator = DependencyValidator()

# 验证依赖
result = validator.validate("creative-discovery")
if not result.valid:
    print(result.errors)

# 安装依赖
validator.install("creative-discovery")

# 检查冲突
conflicts = validator.check_conflicts("creative-discovery")
if conflicts:
    print(conflicts)
```

## 依赖可视化

### 依赖图

```python
from rams_dependencies import DependencyGraph

graph = DependencyGraph()

# 生成依赖图
graph.generate("creative-discovery", output="dependencies.png")

# 输出文本格式
graph.print("creative-discovery")
```

### 依赖树

```bash
# 显示依赖树
rams dependencies tree --skill creative-discovery

# 输出：
# creative-discovery
# ├── market-insight (optional)
# │   └── web-scraper
# ├── viral-content-analysis (optional)
# │   └── text-analyzer
# ├── web-scraper (required)
# └── text-analyzer (optional)
```
