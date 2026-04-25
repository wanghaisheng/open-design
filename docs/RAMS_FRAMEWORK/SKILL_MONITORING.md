# Skill Monitoring Configuration Format

定义技能监控配置格式，支持指标收集、日志记录、告警通知。

---

## 概述

技能监控用于跟踪技能执行情况，收集性能指标，记录日志，发送告警通知。支持多种监控指标、日志级别和告警规则。

## 配置格式

### 监控定义文件

监控定义使用YAML格式，位于技能目录下的 `monitoring.yaml` 文件。

```yaml
# 技能监控配置
monitoring:
  enabled: true
  metrics:
    - name: execution_time
      type: histogram
      buckets: [0.1, 0.5, 1.0, 2.0, 5.0]
      description: 执行时间分布
    - name: success_rate
      type: gauge
      description: 成功率
    - name: error_count
      type: counter
      description: 错误计数
  logging:
    level: INFO
    log_execution: true
    log_input: true
    log_output: false
    log_errors: true
  alerts:
    - name: high_error_rate
      condition: "error_rate > 0.1"
      action: notify
      recipients:
        - email: team@example.com
        - slack: "#alerts"
```

## 监控指标

### 指标类型

#### Counter (计数器)

```yaml
metrics:
  - name: execution_count
    type: counter
    description: 执行次数
    labels:
      - variant
      - implementation
```

- 单调递增的计数器
- 用于统计事件发生次数
- 示例：执行次数、错误次数

#### Gauge (仪表盘)

```yaml
metrics:
  - name: success_rate
    type: gauge
    description: 成功率
    min: 0
    max: 1
```

- 可增可减的数值
- 用于表示当前状态
- 示例：成功率、缓存大小

#### Histogram (直方图)

```yaml
metrics:
  - name: execution_time
    type: histogram
    buckets: [0.1, 0.5, 1.0, 2.0, 5.0]
    description: 执行时间分布
```

- 分布统计
- 用于统计数值分布
- 示例：执行时间、响应时间

#### Summary (摘要)

```yaml
metrics:
  - name: execution_time_summary
    type: summary
    quantiles: [0.5, 0.9, 0.95, 0.99]
    description: 执行时间摘要
```

- 百分位数统计
- 用于统计关键百分位
- 示例：P50、P95、P99

### 常用指标

```yaml
metrics:
  - name: execution_time
    type: histogram
    buckets: [0.1, 0.5, 1.0, 2.0, 5.0]
  
  - name: execution_count
    type: counter
  
  - name: success_count
    type: counter
  
  - name: error_count
    type: counter
  
  - name: success_rate
    type: gauge
    min: 0
    max: 1
  
  - name: cache_hit_rate
    type: gauge
    min: 0
    max: 1
  
  - name: token_usage
    type: histogram
    buckets: [100, 500, 1000, 2000, 5000]
  
  - name: cost
    type: gauge
    unit: usd
```

## 日志配置

### 日志级别

```yaml
logging:
  level: DEBUG | INFO | WARNING | ERROR | CRITICAL
```

- **DEBUG**: 调试信息
- **INFO**: 一般信息
- **WARNING**: 警告信息
- **ERROR**: 错误信息
- **CRITICAL**: 严重错误

### 日志内容

```yaml
logging:
  log_execution: true  # 记录执行信息
  log_input: true  # 记录输入数据
  log_output: false  # 记录输出数据（可能包含敏感信息）
  log_errors: true  # 记录错误信息
  log_metrics: true  # 记录指标信息
```

### 日志格式

```yaml
logging:
  format: json | text
  timestamp_format: iso8601 | unix
  include_context: true
```

### 日志输出

```yaml
logging:
  outputs:
    - type: console
      level: INFO
    
    - type: file
      path: logs/skills.log
      level: DEBUG
      rotation:
        max_size: 100MB
        max_files: 10
    
    - type: cloud
      service: cloudwatch
      level: INFO
      config:
        log_group: /rams/skills
```

## 告警配置

### 告警规则

```yaml
alerts:
  - name: high_error_rate
    condition: "error_rate > 0.1"
    duration: 5m  # 持续5分钟
    severity: warning
    action: notify
    recipients:
      - email: team@example.com
      - slack: "#alerts"
  
  - name: slow_execution
    condition: "execution_time_p95 > 5s"
    duration: 10m
    severity: warning
    action: notify
    recipients:
      - slack: "#performance"
  
  - name: critical_error
    condition: "error_count > 100"
    duration: 1m
    severity: critical
    action: notify_and_escalate
    recipients:
      - email: oncall@example.com
      - slack: "#critical"
      - pagerduty: service_id
```

### 告警动作

```yaml
action: notify | notify_and_escalate | auto_remediate
```

- **notify**: 仅通知
- **notify_and_escalate**: 通知并升级
- **auto_remediate**: 自动修复

### 告警通知渠道

```yaml
recipients:
  - email: user@example.com
  - slack: "#channel"
  - pagerduty: service_id
  - webhook: https://hooks.example.com/alert
  - sms: +1234567890
```

## 监控数据收集

### 指标收集

```python
from skill_monitor import SkillMonitor

monitor = SkillMonitor()

# 记录指标
monitor.record_metric("creative-discovery", "execution_time", 2.5)
monitor.increment_counter("creative-discovery", "execution_count")
monitor.set_gauge("creative-discovery", "success_rate", 0.95)

# 获取指标
metrics = monitor.get_metrics("creative-discovery")
print(metrics)
```

### 日志记录

```python
from skill_logger import SkillLogger

logger = SkillLogger("creative-discovery")

# 记录日志
logger.info("Skill execution started", context={"input": input_data})
logger.error("Skill execution failed", context={"error": str(e)})
logger.debug("Cache hit", context={"key": cache_key})
```

## 监控可视化

### 仪表盘

```yaml
dashboard:
  enabled: true
  panels:
    - title: Execution Time
      type: graph
      metric: execution_time
      time_range: 1h
    
    - title: Success Rate
      type: gauge
      metric: success_rate
    
    - title: Error Count
      type: graph
      metric: error_count
      time_range: 24h
```

### 图表类型

- **graph**: 时间序列图
- **gauge**: 仪表盘
- **heatmap**: 热力图
- **table**: 表格

## 监控最佳实践

### 指标设计原则

1. **有意义的指标**：只收集有业务意义的指标
2. **合理的粒度**：选择合适的时间粒度
3. **标签使用**：使用标签区分不同维度
4. **性能考虑**：避免过度收集影响性能
5. **数据保留**：合理设置数据保留策略

### 日志记录原则

1. **结构化日志**：使用结构化格式
2. **上下文信息**：包含足够的上下文
3. **敏感信息**：避免记录敏感信息
4. **日志级别**：合理使用日志级别
5. **日志轮转**：配置日志轮转策略

### 告警配置原则

1. **合理的阈值**：设置合理的告警阈值
2. **避免告警疲劳**：避免过于频繁的告警
3. **清晰的描述**：告警信息要清晰
4. **分级处理**：不同级别告警不同处理
5. **告警测试**：定期测试告警规则

## 示例

### creative-discovery 监控配置

```yaml
# .claude/skills/game-development-role/skills/creative-discovery/monitoring.yaml
monitoring:
  enabled: true
  
  metrics:
    - name: execution_time
      type: histogram
      buckets: [0.1, 0.5, 1.0, 2.0, 5.0, 10.0]
      description: 执行时间分布（秒）
      labels:
        - variant
        - implementation
    
    - name: execution_count
      type: counter
      description: 执行次数
      labels:
        - variant
        - implementation
    
    - name: success_count
      type: counter
      description: 成功次数
      labels:
        - variant
        - implementation
    
    - name: error_count
      type: counter
      description: 错误次数
      labels:
        - variant
        - implementation
        - error_type
    
    - name: success_rate
      type: gauge
      description: 成功率
      min: 0
      max: 1
      labels:
        - variant
        - implementation
    
    - name: cache_hit_rate
      type: gauge
      description: 缓存命中率
      min: 0
      max: 1
    
    - name: token_usage
      type: histogram
      buckets: [100, 500, 1000, 2000, 5000, 10000]
      description: Token使用量
      labels:
        - model
    
    - name: cost
      type: gauge
      description: 成本（美元）
      unit: usd
      labels:
        - model
  
  logging:
    level: INFO
    format: json
    timestamp_format: iso8601
    include_context: true
    
    log_execution: true
    log_input: true
    log_output: false
    log_errors: true
    log_metrics: true
    
    outputs:
      - type: console
        level: INFO
      
      - type: file
        path: logs/skills/creative-discovery.log
        level: DEBUG
        rotation:
          max_size: 100MB
          max_files: 10
      
      - type: cloud
        service: cloudwatch
        level: INFO
        config:
          log_group: /rams/skills
          log_stream: creative-discovery
  
  alerts:
    - name: high_error_rate
      condition: "error_rate > 0.1"
      duration: 5m
      severity: warning
      action: notify
      recipients:
        - email: team@example.com
        - slack: "#alerts"
    
    - name: slow_execution
      condition: "execution_time_p95 > 5s"
      duration: 10m
      severity: warning
      action: notify
      recipients:
        - slack: "#performance"
    
    - name: critical_error
      condition: "error_count > 100"
      duration: 1m
      severity: critical
      action: notify_and_escalate
      recipients:
        - email: oncall@example.com
        - slack: "#critical"
        - pagerduty: service_id
    
    - name: low_cache_hit_rate
      condition: "cache_hit_rate < 0.5"
      duration: 30m
      severity: info
      action: notify
      recipients:
        - slack: "#performance"
  
  dashboard:
    enabled: true
    panels:
      - title: Execution Time
        type: graph
        metric: execution_time
        time_range: 1h
      
      - title: Success Rate
        type: gauge
        metric: success_rate
      
      - title: Error Count
        type: graph
        metric: error_count
        time_range: 24h
      
      - title: Cache Hit Rate
        type: gauge
        metric: cache_hit_rate
      
      - title: Token Usage
        type: graph
        metric: token_usage
        time_range: 24h
      
      - title: Cost
        type: graph
        metric: cost
        time_range: 24h
```

## 监控命令

### CLI命令

```bash
# 启用监控
rams monitoring enable --skill creative-discovery

# 禁用监控
rams monitoring disable --skill creative-discovery

# 查看指标
rams monitoring metrics --skill creative-discovery

# 查看日志
rams monitoring logs --skill creative-discovery

# 查看告警
rams monitoring alerts --skill creative-discovery

# 测试告警
rams monitoring test-alert --skill creative-discovery --name high_error_rate
```

### API

```python
from rams_monitoring import MonitoringManager

manager = MonitoringManager()

# 启用监控
manager.enable("creative-discovery")

# 禁用监控
manager.disable("creative-discovery")

# 获取指标
metrics = manager.get_metrics("creative-discovery")
print(metrics)

# 获取日志
logs = manager.get_logs("creative-discovery", level="ERROR")
print(logs)

# 获取告警
alerts = manager.get_alerts("creative-discovery")
print(alerts)
```

## 监控集成

### Prometheus集成

```yaml
exporter:
  enabled: true
  port: 9090
  path: /metrics
```

### Grafana集成

```yaml
grafana:
  enabled: true
  dashboard_url: https://grafana.example.com/d/skill-monitoring
  api_key: ${GRAFANA_API_KEY}
```

### CloudWatch集成

```yaml
cloudwatch:
  enabled: true
  namespace: RAMS/Skills
  region: us-east-1
```
