# Skill Implementation Guide

本文档详细说明RAMS框架中Skill的完整执行链路，包括实现渠道、运行环境以及从定义到执行的完整流程。

---

## 概述

### Skill的定义

在RAMS框架中，Skill（技能）是角色执行任务的能力单元，包含两个核心维度：

- **What（做什么）**：技能的功能描述、输入输出Schema、能力标签
- **How（如何做）**：技能的实现方式，通过实现渠道和运行环境来承载

### 实现渠道与运行环境的关系

```
Skill (What + How)
    ↓
实现渠道
    ├─ AI模型渠道
    └─ 软件工具渠道
    ↓
运行环境
    ├─ 桌面IDE
    ├─ 云端IDE
    ├─ 专业工具
    └─ CLI工具
    ↓
实际执行
```

**关键原则**：
- Skill定义与实现分离：Skill只定义"做什么"，不绑定具体实现
- 实现渠道可配置：同一Skill可通过不同渠道实现
- 运行环境适配：不同运行环境对渠道的支持程度不同

---

## Skill实现渠道

### AI模型渠道

AI模型渠道利用各种大语言模型、图像生成模型、视频生成模型等AI能力来实现Skill。

#### 图像生成模型

| 提供商 | 模型 | 适用场景 | 参考文档 |
|--------|------|----------|----------|
| xAI | grok-imagine-image | 多比例图像生成 | AI_MODELS_REFERENCE.md |
| OpenAI | dall-e-3, gpt-image-2 | 高质量图像生成 | AI_MODELS_REFERENCE.md |
| Google | imagen-4.0系列 | 快速图像生成 | AI_MODELS_REFERENCE.md |
| Amazon Bedrock | nova-canvas-v1:0 | 企业级图像生成 | AI_MODELS_REFERENCE.md |
| Fal | flux系列, stable-diffusion系列 | 开源模型生态 | AI_MODELS_REFERENCE.md |
| Together.ai | FLUX.1系列, SDXL系列 | 多样化模型选择 | AI_MODELS_REFERENCE.md |

#### 视频生成模型

| 提供商 | 模型 | 功能 | 参考文档 |
|--------|------|------|----------|
| FAL | luma-dream-machine/ray-2 | Text-to-video, image-to-video | AI_MODELS_REFERENCE.md |
| Google Vertex | veo-3.1系列 | Text-to-video, audio generation | AI_MODELS_REFERENCE.md |
| Kling AI | kling-v2.6系列 | Text-to-video, motion control | AI_MODELS_REFERENCE.md |
| xAI | grok-imagine-video | Text-to-video, editing, R2V | AI_MODELS_REFERENCE.md |

#### 文本生成模型

| 提供商 | 模型 | 特点 |
|--------|------|------|
| OpenAI | GPT-4, GPT-4 Turbo | 强大的推理能力 |
| Anthropic | Claude 3 Opus, Claude 3.5 Sonnet | 长上下文，安全性强 |
| xAI | Grok | 实时信息访问 |
| Google | Gemini Pro | 多模态支持 |
| 本地模型 | Llama, Mistral | 隐私保护，成本可控 |

#### 模型选择策略

**基于任务类型**：
- 图像生成任务 → 选择图像生成模型
- 视频生成任务 → 选择视频生成模型
- 文本处理任务 → 选择文本生成模型

**基于质量要求**：
- 高质量 → 优先选择闭源模型（GPT-4, Claude Opus, DALL-E 3）
- 快速生成 → 选择快速模型（SDXL Turbo, imagen-4.0-fast）
- 成本敏感 → 选择开源模型或本地模型

**基于功能需求**：
- 特定比例 → 选择支持该比例的模型
- 音频生成 → 选择支持音频的模型
- 实时信息 → 选择联网模型

### 软件工具渠道

软件工具渠道利用现有软件生态中的各种工具和API来实现Skill。

#### Python/JS脚本调用

通过Python或JavaScript脚本直接调用各种工具和API。

**适用场景**：
- 文件系统操作
- 数据处理
- API调用
- 自动化脚本

**示例**：

```python
# Python脚本调用文件系统
import os
import json

def process_design_tokens(tokens):
    """处理设计令牌"""
    output_dir = "packages/ui/src/tokens"
    os.makedirs(output_dir, exist_ok=True)
    
    with open(f"{output_dir}/index.ts", "w") as f:
        f.write(generate_typescript(tokens))
    
    return {"status": "success", "path": f"{output_dir}/index.ts"}
```

```javascript
// JavaScript脚本调用浏览器API
async function generatePrototype(html) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(html);
    const screenshot = await page.screenshot();
    
    await browser.close();
    return screenshot;
}
```

#### MCP (Model Context Protocol)调用

MCP是标准化的模型上下文协议，用于连接AI模型与外部工具。

**特点**：
- 标准化协议
- 工具发现机制
- 安全的上下文传递
- 支持多种工具类型

**适用场景**：
- 数据库查询
- API集成
- 文件操作
- 系统监控

**示例**：

```yaml
# MCP工具配置
tools:
  - name: "database_query"
    type: "mcp"
    protocol: "mcp://database"
    config:
      connection_string: "postgresql://localhost/mydb"
      allowed_tables: ["users", "products"]
  
  - name: "file_operations"
    type: "mcp"
    protocol: "mcp://filesystem"
    config:
      allowed_paths: ["/workspace", "/tmp"]
      read_only: false
```

#### OpenCLI (Chrome CDP)调用

OpenCLI利用Chrome DevTools Protocol (CDP) 和自定义协议来实现浏览器自动化。

**特点**：
- 浏览器深度控制
- 自定义协议支持
- 实时调试能力
- 跨浏览器兼容

**适用场景**：
- 浏览器自动化
- 网页测试
- 原型验证
- UI交互测试

**示例**：

```python
from opencli import ChromeCDP

# 使用Chrome CDP控制浏览器
cdp = ChromeCDP()

# 导航到页面
cdp.navigate("https://example.com")

# 执行自定义协议操作
cdp.execute_protocol("custom://design-prototype", {
    "action": "render",
    "data": design_tokens
})

# 获取截图
screenshot = cdp.screenshot()
```

#### 工具选择策略

**基于任务类型**：
- 文件操作 → Python/JS脚本
- 数据库查询 → MCP
- 浏览器自动化 → OpenCLI
- API调用 → Python/JS脚本或MCP

**基于环境支持**：
- 桌面IDE → 支持所有渠道
- 云端IDE → 限制某些渠道（如OpenCLI）
- 专业工具 → 优化特定渠道

**基于性能需求**：
- 高性能 → 原生脚本调用
- 标准化 → MCP协议
- 浏览器相关 → OpenCLI

---

## 运行环境

### 桌面IDE

#### Windsurf

**特点**：
- 完整的文件系统访问
- Git集成
- 终端访问
- 多模型支持（当前使用SWE-1.6）
- Workflow系统集成

**支持的实现渠道**：
- ✅ AI模型渠道（所有模型）
- ✅ Python/JS脚本
- ✅ MCP协议
- ✅ OpenCLI

**适用场景**：
- 开发工作流
- 代码生成
- 项目重构
- 本地开发

#### Cursor

**特点**：
- 本地VS Code扩展
- 完整工具链
- 离线可用
- 多模型支持

**支持的实现渠道**：
- ✅ AI模型渠道
- ✅ Python/JS脚本
- ✅ MCP协议
- ✅ OpenCLI

#### Claude Desktop

**特点**：
- 原生Claude集成
- 项目上下文感知
- Artifacts支持
- 多项目切换

**支持的实现渠道**：
- ✅ AI模型渠道（Anthropic模型）
- ✅ Python/JS脚本
- ✅ MCP协议
- ❌ OpenCLI（不支持浏览器自动化）

### 云端IDE

#### Claude Web

**特点**：
- 随处访问
- 项目上传
- Artifacts支持
- 分享功能

**支持的实现渠道**：
- ✅ AI模型渠道（Anthropic模型）
- ✅ Python/JS脚本（受限）
- ✅ MCP协议（受限）
- ❌ OpenCLI

#### ChatGPT Web

**特点**：
- GPT-4集成
- 插件支持
- 文件上传
- 代码解释器

**支持的实现渠道**：
- ✅ AI模型渠道（OpenAI模型）
- ✅ Python/JS脚本（通过代码解释器）
- ❌ MCP协议
- ❌ OpenCLI

### 专业工具

#### OpenClaw

**特点**：
- 专业AI工具
- 深度模型集成
- 工作流自动化
- 性能优化

**支持的实现渠道**：
- ✅ AI模型渠道（所有模型）
- ✅ Python/JS脚本
- ✅ MCP协议
- ✅ OpenCLI
- ✅ 自定义工具集成

#### Hermes

**特点**：
- 进化机制
- 自动技能提炼
- 长期记忆
- 性能追踪

**支持的实现渠道**：
- ✅ AI模型渠道
- ✅ Python/JS脚本
- ✅ MCP协议
- ✅ OpenCLI
- ✅ 进化优化

### 自定义平台

#### Web应用

**特点**：
- 完全控制
- 用户界面
- 多用户支持
- 数据持久化

**支持的实现渠道**：
- ✅ AI模型渠道（通过API）
- ✅ Python/JS脚本（后端执行）
- ✅ MCP协议（服务器端）
- ❌ OpenCLI（需要特殊配置）

### CLI工具

**特点**：
- 自动化友好
- CI/CD集成
- 脚本化
- 批量处理

**支持的实现渠道**：
- ✅ AI模型渠道（通过API）
- ✅ Python/JS脚本
- ✅ MCP协议
- ❌ OpenCLI（需要GUI环境）

---

## 完整执行链路

### 从Skill定义到实际执行

```
1. 角色实例化
   └─ 加载Role定义（Soul + Skills）
   
2. Skill解析
   └─ 解析Skill的What和How
   └─ 识别实现渠道引用
   
3. 渠道选择
   └─ 根据任务类型选择AI模型或软件工具
   └─ 根据质量/成本/性能要求选择具体实现
   
4. 环境适配
   └─ 检查当前运行环境对渠道的支持
   └─ 选择兼容的实现方式
   
5. 执行调用
   └─ 通过运行环境调用AI模型或工具
   └─ 传递输入参数和上下文
   
6. 结果处理
   └─ 接收执行结果
   └─ 验证输出Schema
   └─ 更新记忆和状态
```

### 渠道选择逻辑

**决策树**：

```
开始
  │
  ├─ 任务类型？
  │   ├─ 图像生成 → AI模型渠道 → 选择图像模型
  │   ├─ 视频生成 → AI模型渠道 → 选择视频模型
  │   ├─ 文本处理 → AI模型渠道 → 选择文本模型
  │   ├─ 文件操作 → 软件工具渠道 → Python/JS脚本
  │   ├─ 数据库查询 → 软件工具渠道 → MCP
  │   └─ 浏览器操作 → 软件工具渠道 → OpenCLI
  │
  ├─ 质量要求？
  │   ├─ 高质量 → 闭源模型（GPT-4, Claude Opus）
  │   └─ 快速生成 → 快速模型（SDXL Turbo）
  │
  ├─ 成本敏感？
  │   ├─ 是 → 开源模型或本地模型
  │   └─ 否 → 商业模型
  │
  └─ 环境支持？
      ├─ 检查当前环境对渠道的支持
      └─ 选择兼容的实现方式
```

### 环境适配策略

**适配矩阵**：

| 渠道 | Windsurf | Cursor | Claude Desktop | Claude Web | OpenClaw |
|------|----------|--------|---------------|------------|----------|
| AI模型（xAI） | ✅ | ✅ | ✅ | ✅ | ✅ |
| AI模型（OpenAI） | ✅ | ✅ | ✅ | ❌ | ✅ |
| AI模型（Anthropic） | ✅ | ✅ | ✅ | ✅ | ✅ |
| Python/JS脚本 | ✅ | ✅ | ✅ | ⚠️受限 | ✅ |
| MCP协议 | ✅ | ✅ | ✅ | ⚠️受限 | ✅ |
| OpenCLI | ✅ | ✅ | ❌ | ❌ | ✅ |

**适配策略**：
1. **优先级匹配**：优先使用当前环境原生支持的渠道
2. **降级处理**：如果首选渠道不支持，降级到次选渠道
3. **环境切换**：如果当前环境无法满足需求，建议切换到支持的环境
4. **能力提示**：在Skill定义中标注环境依赖，提前告知用户

---

## 配置示例

### YAML配置示例

```yaml
# Skill定义示例
skill:
  name: "design-tokens"
  version: "1.0"
  
  # What: 功能描述
  description: "生成设计令牌系统"
  input_schema:
    type: "object"
    properties:
      brand_color:
        type: "string"
      font:
        type: "string"
  output_schema:
    type: "object"
    properties:
      tokens:
        type: "object"
      file_path:
        type: "string"
  
  # How: 实现渠道配置
  implementation:
    primary_channel: "ai_model"
    fallback_channel: "software_tool"
    
    ai_model:
      provider: "anthropic"
      model: "claude-3-opus-20240229"
      parameters:
        temperature: 0.7
        max_tokens: 4000
    
    software_tool:
      type: "python_script"
      script_path: "scripts/generate_tokens.py"
      dependencies:
        - "pydantic"
        - "jinja2"
    
    # 环境要求
    runtime_requirements:
      - "file_system_access"
      - "terminal_access"
      optional:
        - "git_access"
```

### 代码调用示例

```python
from rams_runtime import RoleInstance, SkillExecutor

# 加载角色
role = RoleInstance.load("designer-role")

# 执行Skill
executor = SkillExecutor(role)

result = executor.execute(
    skill_name="design-tokens",
    input_data={
        "brand_color": "#1A1C1E",
        "font": "Inter"
    },
    # 自动选择实现渠道
    channel_selection="auto",
    # 指定运行环境
    runtime="windsurf"
)

print(f"生成结果: {result}")
print(f"使用的渠道: {result.metadata['channel']}")
print(f"执行环境: {result.metadata['runtime']}")
```

### 环境配置示例

```yaml
# Windsurf环境配置
runtime:
  environment: "windsurf"
  model: "swe-1.6"
  
  # 支持的实现渠道
  supported_channels:
    ai_model:
      providers:
        - anthropropic
        - openai
        - xai
      local_models:
        - llama
        - mistral
    
    software_tool:
      python:
        enabled: true
        version: "3.11"
      javascript:
        enabled: true
        version: "ES2022"
      mcp:
        enabled: true
        servers:
          - "mcp://database"
          - "mcp://filesystem"
      opencli:
        enabled: true
        chrome_path: "/Applications/Google Chrome.app"
  
  # 工具权限
  permissions:
    file_system:
      read: true
      write: true
      allowed_paths: ["/workspace"]
    terminal:
      enabled: true
      allowed_commands: ["git", "npm", "python"]
    network:
      enabled: true
      allowed_domains: ["api.openai.com", "api.anthropic.com"]
```

---

## 最佳实践

### 渠道选择建议

1. **优先使用AI模型渠道**：
   - 对于创造性任务（设计、写作）
   - 对于需要推理的任务（分析、决策）
   - 对于不确定性的任务

2. **使用软件工具渠道**：
   - 对于确定性任务（文件操作、数据处理）
   - 对于需要精确控制的任务
   - 对于性能敏感的任务

3. **混合使用**：
   - AI模型负责创意和决策
   - 软件工具负责执行和验证
   - 形成互补的执行链路

### 环境迁移指南

**从桌面IDE到云端**：

1. 导出角色定义和技能配置
2. 检查云端环境对渠道的支持
3. 调整实现渠道配置（如降级到支持的渠道）
4. 验证功能完整性
5. 更新文档说明环境差异

**从云端到专业工具**：

1. 导出云端配置
2. 转换为专业工具格式
3. 配置专业工具的渠道支持
4. 迁移记忆和状态
5. 验证功能和性能

### 性能优化建议

1. **缓存策略**：
   - 缓存AI模型响应
   - 缓存工具执行结果
   - 智能缓存失效策略

2. **并行执行**：
   - 并行调用多个AI模型
   - 并行执行多个工具
   - 任务依赖图优化

3. **资源管理**：
   - 限制并发调用数
   - 监控API使用量
   - 优化内存使用

4. **错误处理**：
   - 渠道降级机制
   - 自动重试策略
   - 优雅降级方案

### 安全建议

1. **API密钥管理**：
   - 使用环境变量
   - 加密存储密钥
   - 定期轮换密钥

2. **权限控制**：
   - 最小权限原则
   - 工具访问白名单
   - 文件系统隔离

3. **数据安全**：
   - 敏感数据加密
   - 安全传输协议
   - 数据脱敏处理

---

## 总结

RAMS框架的Skill实现架构提供了灵活的执行链路：

- **定义与实现分离**：Skill只定义"做什么"，实现方式可配置
- **多渠道支持**：AI模型渠道和软件工具渠道互补
- **环境适配**：不同运行环境对渠道的支持程度不同
- **智能选择**：根据任务、质量、成本、环境自动选择最佳实现

这种架构使得RAMS框架能够：
- 适应不同的使用场景
- 利用最新的AI技术
- 集成现有的软件生态
- 在不同环境中保持一致性

通过合理配置和优化，可以构建高效、可靠、可扩展的AI角色系统。
