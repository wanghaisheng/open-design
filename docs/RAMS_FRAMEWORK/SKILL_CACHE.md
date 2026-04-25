# Skill Cache Configuration Format

定义技能缓存配置格式，支持缓存策略、失效条件、缓存管理。

---

## 概述

技能缓存用于缓存技能执行结果，避免重复计算，提高性能。支持多种缓存策略、失效条件和缓存管理。

## 配置格式

### 缓存定义文件

缓存定义使用YAML格式，位于技能目录下的 `cache.yaml` 文件。

```yaml
# 技能缓存配置
cache:
  enabled: true
  ttl: 3600  # 缓存时间（秒）
  key_template: "{skill_name}:{input_hash}"
  strategy: lru  # lru, lfu, ttl
  max_size: 1000
  invalidation:
    - on_input_change
    - on_config_change
    - on_version_change
  storage:
    type: memory | file | redis
    location: .cache/skills/
```

## 缓存策略

### LRU (Least Recently Used)

```yaml
strategy: lru
max_size: 1000
```

- 最近最少使用策略
- 当缓存满时，移除最久未使用的条目
- 适合访问模式不均匀的场景

### LFU (Least Frequently Used)

```yaml
strategy: lfu
max_size: 1000
```

- 最少使用频率策略
- 当缓存满时，移除使用频率最低的条目
- 适合热点数据场景

### TTL (Time To Live)

```yaml
strategy: ttl
ttl: 3600
```

- 生存时间策略
- 基于时间自动失效
- 适合数据时效性强的场景

## 缓存键生成

### 键模板

```yaml
key_template: "{skill_name}:{input_hash}:{variant}"
```

支持的变量：
- `{skill_name}`: 技能名称
- `{input_hash}`: 输入数据的哈希值
- `{variant}`: 技能变体名称
- `{version}`: 技能版本
- `{timestamp}`: 时间戳

### 哈希算法

```yaml
hash_algorithm: sha256 | md5 | murmur3
```

**示例：**
```yaml
cache:
  key_template: "{skill_name}:{input_hash}"
  hash_algorithm: sha256
```

## 缓存失效

### 失效条件

```yaml
invalidation:
  - on_input_change  # 输入变化时失效
  - on_config_change  # 配置变化时失效
  - on_version_change  # 版本变化时失效
  - on_manual  # 手动失效
  - on_time  # 基于时间失效
```

### 手动失效

```python
from cache_manager import CacheManager

manager = CacheManager()

# 失效特定技能缓存
manager.invalidate("creative-discovery")

# 失效特定键
manager.invalidate_key("creative-discovery:abc123")

# 失效所有缓存
manager.invalidate_all()
```

## 缓存存储

### 内存存储

```yaml
storage:
  type: memory
  max_size: 1000
```

- 最快的存储方式
- 数据在进程重启后丢失
- 适合短期缓存

### 文件存储

```yaml
storage:
  type: file
  location: .cache/skills/
  max_size: 1000000000  # 1GB
  compression: true
```

- 持久化存储
- 进程重启后数据保留
- 适合长期缓存

### Redis存储

```yaml
storage:
  type: redis
  host: localhost
  port: 6379
  db: 0
  password: ${REDIS_PASSWORD}
  max_size: 1000000000
```

- 分布式缓存
- 支持多进程共享
- 适合大规模应用

## 缓存预热

### 预热配置

```yaml
warmup:
  enabled: true
  strategy: on_startup | on_demand
  preload:
    - skill: creative-discovery
      inputs:
        - input1.json
        - input2.json
```

### 预热执行

```python
from cache_manager import CacheManager

manager = CacheManager()

# 启动时预热
manager.warmup_on_startup()

# 按需预热
manager.warmup_on_demand("creative-discovery", input_data)
```

## 缓存监控

### 缓存指标

```yaml
monitoring:
  enabled: true
  metrics:
    - hit_rate
    - miss_rate
    - size
    - eviction_count
    - avg_latency
```

### 监控API

```python
from cache_monitor import CacheMonitor

monitor = CacheMonitor()

# 获取缓存指标
metrics = monitor.get_metrics("creative-discovery")
print(f"Hit rate: {metrics['hit_rate']}")
print(f"Miss rate: {metrics['miss_rate']}")
print(f"Size: {metrics['size']}")
```

## 缓存最佳实践

### 缓存设计原则

1. **缓存可缓存的数据**：只缓存计算成本高的数据
2. **合理的TTL**：根据数据时效性设置TTL
3. **缓存键设计**：使用清晰的缓存键
4. **失效策略**：选择合适的失效策略
5. **监控指标**：监控缓存命中率

### 缓存大小管理

1. **设置上限**：避免缓存无限增长
2. **定期清理**：清理过期缓存
3. **监控使用**：监控缓存使用情况
4. **优化策略**：根据使用情况优化策略

## 示例

### creative-discovery 缓存配置

```yaml
# .claude/skills/game-development-role/skills/creative-discovery/cache.yaml
cache:
  enabled: true
  ttl: 3600  # 1小时
  key_template: "{skill_name}:{input_hash}:{variant}"
  strategy: lru
  max_size: 1000
  hash_algorithm: sha256
  
  invalidation:
    - on_input_change
    - on_config_change
    - on_version_change
    - on_time
  
  storage:
    type: file
    location: .cache/skills/creative-discovery/
    max_size: 100000000  # 100MB
    compression: true
  
  warmup:
    enabled: false
    strategy: on_demand
  
  monitoring:
    enabled: true
    metrics:
      - hit_rate
      - miss_rate
      - size
      - eviction_count
      - avg_latency
```

## 缓存命令

### CLI命令

```bash
# 启用缓存
rams cache enable --skill creative-discovery

# 禁用缓存
rams cache disable --skill creative-discovery

# 清除缓存
rams cache clear --skill creative-discovery

# 查看缓存统计
rams cache stats --skill creative-discovery

# 预热缓存
rams cache warmup --skill creative-discovery --input input.json
```

### API

```python
from rams_cache import CacheManager

manager = CacheManager()

# 启用缓存
manager.enable("creative-discovery")

# 禁用缓存
manager.disable("creative-discovery")

# 清除缓存
manager.clear("creative-discovery")

# 查看统计
stats = manager.get_stats("creative-discovery")
print(stats)

# 预热缓存
manager.warmup("creative-discovery", input_data)
```

## 缓存性能优化

### 批量操作

```python
# 批量获取缓存
results = manager.get_batch([
    ("creative-discovery", input1),
    ("creative-discovery", input2),
    ("creative-discovery", input3)
])

# 批量设置缓存
manager.set_batch([
    ("creative-discovery", input1, result1),
    ("creative-discovery", input2, result2),
    ("creative-discovery", input3, result3)
])
```

### 异步缓存

```python
import asyncio

async def async_cache():
    # 异步获取缓存
    result = await manager.get_async("creative-discovery", input_data)
    
    # 异步设置缓存
    await manager.set_async("creative-discovery", input_data, result)
```

## 缓存安全

### 敏感数据

```yaml
security:
  encrypt: true
  encryption_key: ${CACHE_ENCRYPTION_KEY}
  sanitize: true
  sensitive_fields:
    - api_key
    - password
    - token
```

### 访问控制

```yaml
access_control:
  enabled: true
  permissions:
    read:
      - role: developer
      - role: admin
    write:
      - role: admin
```
