# Skill Version Management Format

定义技能版本管理格式，支持版本号、变更日志、兼容性检查。

---

## 概述

技能版本管理用于跟踪技能的演进历史，管理版本兼容性，支持平滑升级和降级。使用语义化版本号（Semantic Versioning）。

## 配置格式

### 版本定义文件

版本定义使用YAML格式，位于技能目录下的 `version.yaml` 文件。

```yaml
# 技能版本管理
version: 1.0.0
changelog:
  - version: 1.0.0
    date: 2026-04-25
    changes:
      - "初始版本"
      - "支持三大支柱创意发现"
      - "添加市场洞察依赖"
    breaking_changes: []
    deprecations: []
  
  - version: 0.9.0
    date: 2026-04-20
    changes:
      - "Beta版本"
      - "基础功能实现"
    breaking_changes: []
    deprecations: []

compatibility:
  min_framework_version: 1.0.0
  max_framework_version: 2.0.0
  deprecated_versions: []
  migration_guide: ""
```

## 语义化版本号

### 版本格式

```
MAJOR.MINOR.PATCH
```

- **MAJOR**：主版本号，不兼容的API修改
- **MINOR**：次版本号，向下兼容的功能性新增
- **PATCH**：修订号，向下兼容的问题修正

### 版本规则

1. **MAJOR版本**：当进行不兼容的API修改时
2. **MINOR版本**：当添加向下兼容的功能时
3. **PATCH版本**：当进行向下兼容的问题修正时

**示例：**
- `1.0.0` → `1.1.0`：添加新功能（向下兼容）
- `1.1.0` → `1.1.1`：修复bug（向下兼容）
- `1.1.1` → `2.0.0`：不兼容的API修改

## 变更日志

### 变更类型

```yaml
changes:
  - "新增功能描述"
  - "修复问题描述"
  - "优化性能描述"
  - "更新文档描述"

breaking_changes:
  - "不兼容变更描述"

deprecations:
  - "弃用功能描述"
```

### 变更日志格式

```yaml
changelog:
  - version: 1.2.0
    date: 2026-04-25
    author: "team"
    changes:
      - "新增：支持API实现方式"
      - "新增：添加脚本执行器"
      - "优化：提升Schema验证性能"
      - "修复：修复依赖解析bug"
    breaking_changes:
      - "移除：旧的配置格式不再支持"
    deprecations:
      - "弃用：legacy_config将在2.0.0移除"
```

## 兼容性管理

### 框架兼容性

```yaml
compatibility:
  min_framework_version: 1.0.0
  max_framework_version: 2.0.0
  required_features:
    - skill_implementation
    - schema_validation
  optional_features:
    - advanced_caching
```

### 依赖兼容性

```yaml
dependencies_compatibility:
  python: ">=3.8,<4.0"
  nodejs: ">=14.0.0"
  tools:
    web-scraper: ">=1.0.0,<2.0.0"
```

### 弃用版本

```yaml
deprecated_versions:
  - version: "0.9.0"
    deprecation_date: 2026-04-25
    removal_date: 2026-06-25
    reason: "API已重构"
    migration_guide: "参见migration-guide.md"
```

## 版本检查

### 版本比较

```python
from version_manager import VersionManager

manager = VersionManager()

# 比较版本
result = manager.compare_versions("1.2.0", "1.1.0")
# result = 1 (greater)
# result = 0 (equal)
# result = -1 (less)

# 检查兼容性
compatible = manager.check_compatibility("1.2.0", ">=1.0.0,<2.0.0")
```

### 版本升级

```python
# 检查可升级版本
upgrades = manager.get_available_upgrades("1.0.0")
# returns: ["1.1.0", "1.2.0"]

# 执行升级
manager.upgrade("creative-discovery", "1.2.0")
```

### 版本降级

```python
# 检查可降级版本
downgrades = manager.get_available_downgrades("1.2.0")
# returns: ["1.1.0", "1.0.0"]

# 执行降级
manager.downgrade("creative-discovery", "1.0.0")
```

## 迁移指南

### 迁移配置

```yaml
migration_guide: |
  # 从1.0.0迁移到2.0.0
  
  1. 更新配置格式
     旧格式:
       implementation:
         type: ai-model
         provider: anthropic
     
     新格式:
       implementation:
         default:
           type: ai-model
           provider: anthropic
  
  2. 更新依赖版本
     web-scraper: 1.0.0 → 2.0.0
  
  3. 更新Schema格式
     添加version字段
```

### 自动迁移

```python
from migration import SkillMigrator

migrator = SkillMigrator()

# 执行迁移
migrator.migrate("creative-discovery", from_version="1.0.0", to_version="2.0.0")

# 生成迁移报告
report = migrator.generate_report("creative-discovery")
print(report)
```

## 版本锁定

### 锁定文件

```yaml
# dependencies.lock
skills:
  creative-discovery:
    version: "1.2.0"
    checksum: "sha256:abc123..."
  
  market-insight:
    version: "1.0.0"
    checksum: "sha256:def456..."

tools:
  web-scraper:
    version: "1.5.0"
    checksum: "sha256:ghi789..."
```

### 锁定验证

```python
from lock_manager import LockManager

manager = LockManager()

# 验证锁定文件
valid = manager.validate_lockfile("dependencies.lock")

# 更新锁定文件
manager.update_lockfile("creative-discovery", "1.2.0")
```

## 版本发布

### 发布流程

1. **更新版本号**：根据变更类型更新版本号
2. **更新变更日志**：记录所有变更
3. **测试兼容性**：确保向后兼容
4. **生成发布包**：打包技能文件
5. **发布到仓库**：上传到技能仓库

### 发布配置

```yaml
release:
  version: "1.2.0"
  pre_release: false
  build_metadata: ""
  release_notes: |
    - 新增API实现方式
    - 优化性能
    - 修复依赖解析bug
```

## 版本最佳实践

### 版本管理原则

1. **语义化版本**：严格遵循语义化版本规范
2. **变更日志**：每次发布都更新变更日志
3. **向后兼容**：尽量保持向后兼容
4. **弃用通知**：提前通知弃用功能
5. **迁移支持**：提供迁移指南

### 发布频率

1. **PATCH版本**：随时发布，修复bug
2. **MINOR版本**：定期发布，添加功能
3. **MAJOR版本**：谨慎发布，不兼容变更

## 示例

### creative-discovery 版本配置

```yaml
# .claude/skills/game-development-role/skills/creative-discovery/version.yaml
version: 1.0.0
changelog:
  - version: 1.0.0
    date: 2026-04-25
    author: "RAMS Team"
    changes:
      - "初始版本发布"
      - "支持三大支柱创意发现（成功模式转译、现实世界观察、玩法融合）"
      - "添加AI模型实现方式"
      - "添加Schema验证"
      - "添加依赖管理"
    breaking_changes: []
    deprecations: []
  
  - version: 0.9.0
    date: 2026-04-20
    author: "RAMS Team"
    changes:
      - "Beta版本"
      - "基础功能实现"
      - "AI模型实现"
    breaking_changes: []
    deprecations:
      - "旧配置格式将在1.0.0移除"

compatibility:
  min_framework_version: 1.0.0
  max_framework_version: 2.0.0
  required_features:
    - skill_implementation
    - schema_validation
    - dependency_management
  optional_features:
    - advanced_caching
    - monitoring
  
  dependencies_compatibility:
    python: ">=3.8,<4.0"
    nodejs: ">=14.0.0"
    tools:
      web-scraper: ">=1.0.0,<2.0.0"

deprecated_versions: []

migration_guide: ""

release:
  version: "1.0.0"
  pre_release: false
  build_metadata: ""
  release_notes: |
    creative-discovery技能1.0.0版本发布
    
    新功能：
    - 支持三大支柱创意发现
    - 支持多种实现方式（AI模型、API、脚本）
    - 支持Schema验证
    - 支持依赖管理
    
    改进：
    - 完整的文档和示例
    - 详细的错误处理
    - 性能优化
```

## 版本命令

### CLI命令

```bash
# 查看技能版本
rams version show --skill creative-discovery

# 检查版本更新
rams version check --skill creative-discovery

# 升级技能
rams version upgrade --skill creative-discovery --to 1.2.0

# 降级技能
rams version downgrade --skill creative-discovery --to 1.0.0

# 查看变更日志
rams version changelog --skill creative-discovery

# 生成版本报告
rams version report --skill creative-discovery
```

### API

```python
from rams_version import VersionManager

manager = VersionManager()

# 查看版本
version = manager.get_version("creative-discovery")

# 检查更新
updates = manager.check_updates("creative-discovery")

# 升级
manager.upgrade("creative-discovery", "1.2.0")

# 查看变更日志
changelog = manager.get_changelog("creative-discovery")
```
