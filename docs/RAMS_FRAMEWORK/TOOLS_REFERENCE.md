# RAMS 工具 (Tools) 参考文档

本文档说明RAMS框架中工具的概念、分类和使用方式。在戏剧类比中，工具是舞台上用于表演的道具和布景。

---

## 概述

### 什么是工具 (Tool)

**工具**是Skill的具体实现道具，用于在运行时环境中执行特定任务。在戏剧类比中：

- **Runtime** = 戏台子
- **Tools** = 道具、布景
- **MCP/API/OpenCLI** = 调用手段

工具分为两大类：
- **智能道具**：AI模型（GPT-5.2、Kimi 2.6、SWE 1.6等）
- **机械道具**：软件工具（Figma、Godot、Python脚本等）

---

## 工具分类

### 智能道具 (AI Models)

利用人工智能能力实现任务的工具。详细的AI模型列表、规格和兼容性信息请参阅 [AI_MODELS_REFERENCE.md](AI_MODELS_REFERENCE.md)。

#### 文本生成模型

| 模型 | 提供商 | 特点 | 适用场景 |
|------|--------|------|----------|
| GPT-5.2 | OpenAI | 高推理能力，长上下文 | 复杂推理、代码生成、文档编写 |
| GPT-5.4 | OpenAI | 多模态，视觉能力强 | 图像理解、视觉任务 |
| Kimi 2.6 | Moonshot | 中文优化，长文本 | 中文内容生成、长文档处理 |
| SWE 1.6 | Cognition | 代码专项 | 代码生成、调试、重构 |
| Claude 3.5 | Anthropic | 安全性高，上下文长 | 敏感任务、长对话 |
| Grok 2.0 | xAI | 实时信息，幽默风格 | 实时问答、创意写作 |

#### 图像生成模型

详细的图像模型规格、支持尺寸和比例信息请参阅 [AI_MODELS_REFERENCE.md](AI_MODELS_REFERENCE.md#image-models)。

| 模型 | 提供商 | 特点 | 适用场景 |
|------|--------|------|----------|
| DALL-E 3 | OpenAI | 高质量，细节丰富 | 游戏美术、UI设计 |
| Flux Pro | Black Forest Labs | 风格多样，速度快 | 概念艺术、快速原型 |
| Grok Imagine | xAI | 多比例支持 | 多尺寸图像生成 |
| Imagen 4.0 | Google | 超高分辨率 | 高清素材制作 |

#### 视频生成模型

详细的视频模型规格和功能信息请参阅 [AI_MODELS_REFERENCE.md](AI_MODELS_REFERENCE.md#video-models)。

| 模型 | 提供商 | 特点 | 适用场景 |
|------|--------|------|----------|
| Kling v2.6 | Kling AI | 动作控制强 | 游戏过场动画 |
| Veo 3.1 | Google Vertex | 音频生成 | 完整视频制作 |
| Luma Dream Machine | FAL | 文本转视频 | 快速视频原型 |

### 机械道具 (Software Tools)

利用现有软件生态实现任务的工具。

#### 设计工具

| 工具 | 类型 | 调用方式 | 适用场景 |
|------|------|----------|----------|
| Figma | API | REST API | UI设计、原型制作 |
| Godot | Python脚本 | GDScript/Python | 游戏开发、场景构建 |
| Blender | Python脚本 | Blender Python API | 3D建模、动画制作 |
| Unity | C#脚本 | Unity API | 游戏开发、资源管理 |

#### 开发工具

| 工具 | 类型 | 调用方式 | 适用场景 |
|------|------|----------|----------|
| Git | CLI | Git命令 | 版本控制 |
| Docker | CLI | Docker命令 | 容器管理 |
| npm/yarn | CLI | 包管理器命令 | 依赖管理 |
| Webpack | CLI | 构建命令 | 前端构建 |

#### 自动化工具

| 工具 | 类型 | 调用方式 | 适用场景 |
|------|------|----------|----------|
| Selenium | Python脚本 | WebDriver | 浏览器自动化 |
| Playwright | Python/JS脚本 | Playwright API | 跨浏览器测试 |
| Puppeteer | JS脚本 | Puppeteer API | Chrome自动化 |

---

## 调用手段

### API调用

直接通过HTTP/REST API调用工具。

**示例：**
```python
import requests

# 调用OpenAI API
response = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {api_key}"},
    json={
        "model": "gpt-5.2",
        "messages": [{"role": "user", "content": "生成游戏设计文档"}]
    }
)
```

### MCP协议 (Model Context Protocol)

使用MCP标准化协议调用工具。

**示例：**
```yaml
# MCP服务器配置
mcp_servers:
  figma:
    command: "npx"
    args: ["@modelcontextprotocol/server-figma"]
    env:
      FIGMA_ACCESS_TOKEN: "${FIGMA_TOKEN}"
```

### OpenCLI (Chrome CDP)

利用Chrome DevTools Protocol实现浏览器自动化。

**示例：**
```python
from opencli import Browser

browser = Browser()
browser.navigate("https://figma.com")
browser.click("#create-button")
```

### Python/JS脚本

直接执行Python或JavaScript脚本。

**示例：**
```python
# Python脚本
import godot

scene = godot.Scene.new()
scene.add_node(godot.Node2D.new())
scene.save("res://scenes/main.tscn")
```

---

## 工具选择策略

### 根据任务类型选择

| 任务类型 | 推荐工具类型 | 示例 |
|----------|--------------|------|
| 创意生成 | 智能道具 | GPT-5.2生成游戏剧情 |
| 视觉创作 | 智能道具 | DALL-E 3生成角色立绘 |
| 代码实现 | 智能道具 | SWE 1.6编写游戏逻辑 |
| UI设计 | 机械道具 | Figma API创建界面 |
| 场景构建 | 机械道具 | Godot脚本搭建关卡 |
| 自动化测试 | 机械道具 | Playwright执行测试 |

### 根据环境限制选择

详细的运行环境兼容性信息请参阅 [RUNTIME_ENVIRONMENTS.md](RUNTIME_ENVIRONMENTS.md) 和 [AI_MODELS_REFERENCE.md](AI_MODELS_REFERENCE.md#运行环境说明)。

| 运行环境 | 支持的工具类型 | 推荐工具 |
|----------|----------------|----------|
| Windsurf | 全部 | GPT-5.2 + Figma + Godot |
| Claude Desktop | 智能道具 + 部分机械道具 | Claude 3.5 + Python脚本 |
| Claude Web | 智能道具 | GPT-5.2 + DALL-E 3 |
| CLI工具 | 机械道具 | Git + Docker + npm |

### 成本优化策略

1. **优先使用免费工具**：开源模型、本地工具
2. **批量处理**：合并多个任务减少调用次数
3. **缓存结果**：相同输入直接返回缓存
4. **降级策略**：高成本工具失败时使用低成本替代

---

## 工具配置

### Skill中的工具配置

```yaml
skill:
  name: "design-game-character"
  version: "1.0"
  
  # 工具配置
  tools:
    primary:
      type: "ai_model"
      provider: "openai"
      model: "gpt-5.2"
      
    secondary:
      type: "ai_model"
      provider: "anthropic"
      model: "claude-3.5-opus"
      
    fallback:
      type: "software_tool"
      tool: "figma"
      method: "api"
```

### 技能实现配置

技能可以通过 `implementation.yaml` 配置多种实现方式，包括AI模型、API、脚本等。详见 [SKILL_IMPLEMENTATION.md](SKILL_IMPLEMENTATION.md)。

```yaml
# implementation.yaml
implementation:
  default:
    type: ai-model
    provider: anthropic
    model: claude-3-opus
  
  alternatives:
    - name: fast
      type: ai-model
      provider: anthropic
      model: claude-3-sonnet
    
    - name: api
      type: api
      endpoint: https://api.example.com/skill
    
    - name: script
      type: script
      script: scripts/skill.py
      runtime: python
```

### 运行时工具注册

```python
from rams_runtime import ToolRegistry

registry = ToolRegistry()

# 注册AI模型
registry.register(
    name="gpt-5.2",
    type="ai_model",
    provider="openai",
    config={"api_key": "${OPENAI_API_KEY}"}
)

# 注册软件工具
registry.register(
    name="figma",
    type="software_tool",
    method="api",
    config={"access_token": "${FIGMA_TOKEN}"}
)
```

---

## 工具性能监控

### 监控指标

| 指标 | 说明 | 目标值 |
|------|------|--------|
| 响应时间 | 工具调用耗时 | < 5s |
| 成功率 | 工具调用成功比例 | > 95% |
| 成本 | 单次调用成本 | < $0.01 |
| 质量 | 输出质量评分 | > 8/10 |

### 监控实现

```python
from rams_runtime import ToolMonitor

monitor = ToolMonitor()

# 监控工具调用
with monitor.track("gpt-5.2"):
    result = tool.execute(prompt="生成游戏设计文档")

# 获取指标
metrics = monitor.get_metrics("gpt-5.2")
print(f"响应时间: {metrics['latency']}ms")
print(f"成功率: {metrics['success_rate']}%")
```

---

## 工具安全

### 安全考虑

1. **API密钥管理**：使用环境变量，不硬编码
2. **权限控制**：最小权限原则
3. **输入验证**：验证所有输入参数
4. **输出过滤**：过滤敏感信息
5. **速率限制**：防止滥用

### 安全配置

```yaml
# 工具安全配置
security:
  api_keys:
    gpt-5.2: "${OPENAI_API_KEY}"
    figma: "${FIGMA_TOKEN}"
  
  rate_limits:
    gpt-5.2: 100/hour
    figma: 50/hour
  
  permissions:
    file_system: read
    network: restricted
```

---

## 工具进化

### 自动优化

系统可以根据工具使用情况自动优化：

1. **性能优化**：选择最快的工具
2. **成本优化**：选择最便宜的工具
3. **质量优化**：选择质量最高的工具

### 学习机制

```python
from rams_runtime import ToolLearner

learner = ToolLearner()

# 记录工具使用
learner.record_usage(
    tool="gpt-5.2",
    task="code_generation",
    latency=2.5,
    cost=0.05,
    quality=9.0
)

# 自动优化
optimized_tool = learner.optimize_for(
    task="code_generation",
    criteria="quality"
)
```

---

## 最佳实践

### 1. 工具组合

```yaml
# 组合多个工具完成复杂任务
skill:
  name: "create-game-asset"
  tools:
    - gpt-5.2  # 生成设计描述
    - dall-e-3  # 生成图像
    - figma  # 导入到Figma
```

### 2. 错误处理

```python
try:
    result = tool.execute(input_data)
except ToolError as e:
    # 尝试备用工具
    fallback_tool = get_fallback_tool(tool)
    result = fallback_tool.execute(input_data)
```

### 3. 缓存策略

```python
from rams_runtime import ToolCache

cache = ToolCache()

# 检查缓存
cached_result = cache.get(tool_name, input_hash)
if cached_result:
    return cached_result

# 执行工具
result = tool.execute(input_data)

# 缓存结果
cache.set(tool_name, input_hash, result, ttl=3600)
```

---

## 总结

RAMS框架中的工具是舞台上用于表演的道具：

- **智能道具**：AI模型，提供创造性能力
- **机械道具**：软件工具，提供确定性能力
- **调用手段**：API、MCP、OpenCLI、脚本
- **选择策略**：根据任务、环境、成本优化
- **安全机制**：密钥管理、权限控制、速率限制
- **进化机制**：自动优化、学习改进

核心原则：工具是可替换的道具，Skill定义如何使用道具，Runtime提供舞台基础设施。
