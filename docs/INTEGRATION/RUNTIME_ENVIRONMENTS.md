# RAMS 运行时环境指南

本文档说明RAMS框架的角色实例在不同运行时环境中的执行方式，包括桌面IDE、云端平台、专业工具等。

---

## 概述

### 什么是运行时环境（Runtime Environment）

**运行时环境**是角色实例执行任务的场所，提供：
- 角色定义加载
- 技能执行
- 模型调用
- 记忆存储
- 状态管理
- 工具集成

### Skill实现渠道

在RAMS框架中，Skill的实现通过两种渠道：AI模型渠道和软件工具渠道。运行环境需要支持这些渠道才能正确执行Skill。

**AI模型渠道**：
- 图像生成模型（xAI, OpenAI, Google等）
- 视频生成模型（FAL, Google, Kling等）
- 文本生成模型（GPT, Claude等）

**软件工具渠道**：
- Python/JS脚本调用
- MCP (Model Context Protocol)调用
- OpenCLI (Chrome CDP)调用

关于Skill实现的详细说明，请参阅 [SKILL_IMPLEMENTATION.md](../docs/SKILL_IMPLEMENTATION.md)。

### 运行时环境分类

| 类别 | 示例 | 特点 |
|------|------|------|
| 桌面IDE | Cursor, Claude Desktop | 本地执行，完整工具链，离线可用 |
| 云端IDE | Claude, ChatGPT Web | 随处访问，协作友好，依赖网络 |
| 专业工具 | OpenClaw, Hermes | 特定领域优化，深度集成 |
| 自定义平台 | 自建Web应用 | 完全控制，可定制 |
| CLI工具 | 命令行工具 | 自动化友好，CI/CD集成 |

---

## 运行时环境架构

### 通用架构

```
┌─────────────────────────────────────────────────────────┐
│                    运行时环境（Runtime）                  │
│  - 环境管理器（Environment Manager）                      │
│  - 角色实例化器（Role Instantiator）                     │
│  - 技能执行器（Skill Executor）                           │
│  - 模型适配层（Model Adapter）                            │
│  - 记忆管理器（Memory Manager）                           │
│  - 工具集成层（Tool Integration）                         │
│  - Skill实现层（Skill Implementation）                     │
└─────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   角色定义       │  │   模型API        │  │   工具链         │
│ - YAML/JSON     │  │ - OpenAI        │  │ - 文件系统       │
│ - Markdown      │  │ - Anthropic     │  │ - Git           │
│ - Code          │  │ - 本地模型      │  │ - 浏览器         │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  AI模型渠道     │  │  软件工具渠道   │  │  运行环境适配    │
│ - 图像模型      │  │ - Python/JS     │  │ - 环境检测       │
│ - 视频模型      │  │ - MCP           │  │ - 渠道选择       │
│ - 文本模型      │  │ - OpenCLI       │  │ - 降级处理       │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 桌面IDE运行时

### Cursor

**特点**：
- 本地VS Code扩展
- 完整的文件系统访问
- Git集成
- 终端访问
- 多模型支持

**适用场景**：
- 开发工作流
- 代码生成
- 项目重构
- 本地开发

**配置示例**：

```json
// .cursor/rules/rams.json
{
  "role": {
    "definition_path": ".claude/skills/designer-role/role.yaml",
    "skills_path": ".claude/skills/designer-role/skills"
  },
  "actors": {
    "default": "openai_gpt4",
    "fallback": "anthropic_claude"
  },
  "memory": {
    "type": "file",
    "path": ".claude/memory/"
  },
  "tools": {
    "file_system": true,
    "git": true,
    "terminal": true,
    "browser": true
  }
}
```

**执行流程**：

```python
# Cursor扩展中的角色实例化
from cursor_rams import RoleInstance

# 加载角色定义
role = RoleInstance.load("designer-role")

# 执行技能
result = role.execute_skill(
    skill_name="design-tokens",
    context={
        "brand_color": "#1A1C1E",
        "font": "Inter"
    }
)

# 输出到文件
role.save_output(result, "packages/ui/src/tokens/index.ts")
```

### Claude Desktop

**特点**：
- 原生Claude集成
- 项目上下文感知
- Artifacts支持
- 多项目切换

**适用场景**：
- 设计文档编写
- 原型生成
- 设计评审
- 技能开发

**配置示例**：

```yaml
# .claude/claude_desktop_config.yaml
runtime:
  environment: "claude_desktop"
  role:
    id: "designer-role"
    path: ".claude/skills/designer-role"
  actors:
    - provider: "anthropic"
      model: "claude-3-opus-20240229"
  memory:
    type: "project"
    location: ".claude/memory/"
  tools:
    - file_read
    - file_write
    - directory_list
    - git_status
```

**执行流程**：

```markdown
# 在Claude Desktop中
@designer-role

请使用design-tokens技能，基于以下品牌色生成设计令牌：
- 品牌主色：#1A1C1E
- 辅助色：#6C7278
- 字体：Inter

输出到：packages/ui/src/tokens/index.ts
```

---

## 云端IDE运行时

### Claude Web

**特点**：
- 随处访问
- 项目上传
- Artifacts支持
- 分享功能

**适用场景**：
- 协作设计
- 快速原型
- 设计评审
- 技能测试

**配置示例**：

```yaml
# Claude Web项目配置
runtime:
  environment: "claude_web"
  project_id: "your-project-id"
  role:
    id: "designer-role"
    skills: ["design-tokens", "layout-grid", "color-system"]
  actors:
    - provider: "anthropic"
      model: "claude-3-opus-20240229"
  memory:
    type: "cloud"
    location: "claude_cloud_memory"
```

### ChatGPT Web

**特点**：
- GPT-4集成
- 插件支持
- 文件上传
- 代码解释器

**适用场景**：
- 数据分析
- 代码生成
- 文档编写
- 快速验证

**配置示例**：

```yaml
runtime:
  environment: "chatgpt_web"
  role:
    id: "designer-role"
    skills: ["design-tokens", "color-system"]
  actors:
    - provider: "openai"
      model: "gpt-4-turbo"
  memory:
    type: "session"
    location: "chatgpt_session"
```

---

## 专业工具运行时

### OpenClaw

**特点**：
- 专业AI工具
- 深度模型集成
- 工作流自动化
- 性能优化

**适用场景**：
- 大规模设计
- 自动化工作流
- 性能敏感任务
- 企业级应用

**配置示例**：

```yaml
# OpenClaw配置文件
runtime:
  environment: "openclaw"
  version: "2.0"
  
role:
  definition:
    type: "yaml"
    path: "roles/designer-role.yaml"
  
skills:
  auto_load: true
  cache: true
  
actors:
  pool:
    - id: "gpt4_turbo"
      provider: "openai"
      model: "gpt-4-turbo"
      priority: 1
    - id: "claude_opus"
      provider: "anthropic"
      model: "claude-3-opus-20240229"
      priority: 2
  
memory:
  type: "vector"
  database: "chromadb"
  collection: "designer_memory"
  
tools:
  - file_system
  - git
  - docker
  - kubernetes
  
optimization:
  parallel_execution: true
  batch_size: 10
  caching: true
```

**执行流程**：

```python
from openclaw import Runtime, Role, Actor

# 初始化运行时
runtime = Runtime(config="openclaw.yaml")

# 加载角色
role = Role.load("designer-role")

# 选择演员
actor = Actor.select(role, criteria="quality")

# 执行任务
result = runtime.execute(
    role=role,
    actor=actor,
    task="使用design-tokens生成设计令牌"
)

# 保存结果
runtime.save(result, "design-tokens.ts")
```

### Hermes

**特点**：
- 进化机制
- 自动技能提炼
- 长期记忆
- 性能追踪

**适用场景**：
- 长期项目
- 持续优化
- 技能进化
- 性能分析

**配置示例**：

```yaml
runtime:
  environment: "hermes"
  evolution:
    enabled: true
    learning_rate: 0.01
    skill_extraction: true
  
role:
  id: "designer-role"
  version: "auto"
  
actors:
  - provider: "openai"
    model: "gpt-4-turbo"
  
memory:
  long_term: true
  compression: true
  
evolution:
  post_task_learning: true
  skill_refinement: true
  performance_tracking: true
```

**执行流程**：

```python
from hermes import EvolutionaryRuntime

# 初始化进化运行时
runtime = EvolutionaryRuntime(config="hermes.yaml")

# 执行任务
result = runtime.execute(
    role="designer-role",
    skill="design-tokens",
    task="生成设计令牌"
)

# 自动进化
runtime.evolve(result)
```

---

## 自定义平台运行时

### Web应用运行时

**特点**：
- 完全控制
- 用户界面
- 多用户支持
- 数据持久化

**适用场景**：
- SaaS产品
- 企业应用
- 多租户系统
- 定制需求

**架构设计**：

```
┌─────────────────────────────────────────────────────────┐
│                    Web应用前端                          │
│  - 角色选择器                                           │
│  - 技能选择器                                           │
│  - 任务输入                                             │
│  - 结果展示                                             │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                    API网关                               │
│  - 认证授权                                             │
│  - 限流                                                 │
│  - 路由                                                 │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                    RAMS运行时服务                        │
│  - 角色实例化                                           │
│  - 技能执行                                             │
│  - 模型调用                                             │
│  - 记忆管理                                             │
└─────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   模型API        │  │   数据库         │  │   文件存储       │
│ - OpenAI        │  │ - PostgreSQL    │  │ - S3           │
│ - Anthropic     │  │ - MongoDB       │  │ - 本地存储      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**实现示例**：

```python
# FastAPI实现
from fastapi import FastAPI
from rams_runtime import Runtime

app = FastAPI()
runtime = Runtime(config="runtime.yaml")

@app.post("/execute")
async def execute_task(request: TaskRequest):
    # 实例化角色
    role = runtime.load_role(request.role_id)
    
    # 选择演员
    actor = runtime.select_actor(role, request.actor_preference)
    
    # 执行任务
    result = await runtime.execute(
        role=role,
        actor=actor,
        skill=request.skill_name,
        task=request.task
    )
    
    return {"result": result}

@app.get("/roles")
async def list_roles():
    return runtime.list_roles()

@app.get("/skills")
async def list_skills():
    return runtime.list_skills()
```

---

## CLI工具运行时

### 命令行工具

**特点**：
- 自动化友好
- CI/CD集成
- 脚本化
- 批量处理

**适用场景**：
- 自动化构建
- CI/CD流水线
- 批量处理
- DevOps

**实现示例**：

```bash
# RAMS CLI工具
rams execute \
  --role designer-role \
  --skill design-tokens \
  --task "生成设计令牌" \
  --actor openai_gpt4 \
  --output packages/ui/src/tokens/index.ts

# 批量执行
rams batch \
  --config batch-config.yaml \
  --parallel 4

# 列出可用角色
rams roles list

# 列出可用技能
rams skills list --role designer-role
```

**配置文件**：

```yaml
# rams-config.yaml
runtime:
  environment: "cli"
  
role:
  default: "designer-role"
  path: ".claude/skills/designer-role"
  
actors:
  default: "openai_gpt4"
  
output:
  format: "json"
  path: "./output/"
  
logging:
  level: "info"
  file: "rams.log"
```

---

## 运行时环境对比

| 特性 | Cursor | Claude Desktop | Claude Web | OpenClaw | Hermes | Web应用 | CLI工具 |
|------|--------|---------------|------------|----------|--------|---------|---------|
| 本地文件访问 | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Git集成 | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| 终端访问 | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| 随处访问 | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| 协作功能 | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| 进化机制 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| 性能优化 | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 自动化 | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 成本 | 低 | 低 | 中 | 高 | 高 | 高 | 低 |
| 复杂度 | 低 | 低 | 低 | 高 | 高 | 高 | 中 |
| AI模型支持 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Python/JS工具 | ✅ | ✅ | ⚠️受限 | ✅ | ✅ | ✅ | ✅ |
| MCP协议 | ✅ | ✅ | ⚠️受限 | ✅ | ✅ | ✅ | ✅ |
| OpenCLI | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

---

## Skill实现渠道支持

### AI模型渠道支持

不同运行环境对AI模型的支持程度有所不同，主要取决于环境支持的模型提供商和API访问方式。

| 运行时环境 | xAI | OpenAI | Anthropic | Google | 本地模型 | 说明 |
|-----------|-----|--------|-----------|--------|---------|------|
| Windsurf | ✅ | ✅ | ✅ | ✅ | ✅ | 支持所有主流模型，当前使用SWE-1.6 |
| Cursor | ✅ | ✅ | ✅ | ✅ | ✅ | 支持所有主流模型 |
| Claude Desktop | ✅ | ✅ | ✅ | ✅ | ❌ | 主要支持Anthropic模型 |
| Claude Web | ✅ | ❌ | ✅ | ✅ | ❌ | 主要支持Anthropic和Google模型 |
| OpenClaw | ✅ | ✅ | ✅ | ✅ | ✅ | 支持所有模型，可配置自定义模型 |
| Hermes | ✅ | ✅ | ✅ | ✅ | ✅ | 支持所有模型，包含进化优化 |
| Web应用 | ✅ | ✅ | ✅ | ✅ | ✅ | 通过API支持所有模型 |
| CLI工具 | ✅ | ✅ | ✅ | ✅ | ✅ | 通过API支持所有模型 |

**说明**：
- ✅ 完全支持
- ⚠️ 部分支持（可能有功能限制）
- ❌ 不支持

### 软件工具渠道支持

#### Python/JS脚本支持

| 运行时环境 | Python | JavaScript | 说明 |
|-----------|--------|-------------|------|
| Windsurf | ✅ | ✅ | 完整支持，可访问文件系统和终端 |
| Cursor | ✅ | ✅ | 完整支持，可访问文件系统和终端 |
| Claude Desktop | ✅ | ✅ | 完整支持，可访问文件系统 |
| Claude Web | ⚠️受限 | ⚠️受限 | 受限于沙箱环境，文件系统访问受限 |
| OpenClaw | ✅ | ✅ | 完整支持，包含Docker支持 |
| Hermes | ✅ | ✅ | 完整支持，包含性能优化 |
| Web应用 | ✅ | ✅ | 后端执行，前端展示 |
| CLI工具 | ✅ | ✅ | 完整支持 |

#### MCP协议支持

| 运行时环境 | MCP支持 | 说明 |
|-----------|---------|------|
| Windsurf | ✅ | 支持MCP服务器连接 |
| Cursor | ✅ | 支持MCP服务器连接 |
| Claude Desktop | ✅ | 支持MCP服务器连接 |
| Claude Web | ⚠️受限 | 受限于网络和权限 |
| OpenClaw | ✅ | 支持MCP服务器连接，可配置 |
| Hermes | ✅ | 支持MCP服务器连接，包含优化 |
| Web应用 | ✅ | 服务器端支持MCP |
| CLI工具 | ✅ | 支持MCP服务器连接 |

#### OpenCLI支持

| 运行时环境 | OpenCLI支持 | 说明 |
|-----------|-------------|------|
| Windsurf | ✅ | 支持Chrome CDP和自定义协议 |
| Cursor | ✅ | 支持Chrome CDP和自定义协议 |
| Claude Desktop | ❌ | 不支持浏览器自动化 |
| Claude Web | ❌ | 不支持浏览器自动化 |
| OpenClaw | ✅ | 支持Chrome CDP和自定义协议 |
| Hermes | ✅ | 支持Chrome CDP和自定义协议 |
| Web应用 | ❌ | 需要特殊配置 |
| CLI工具 | ❌ | 需要GUI环境 |

### 渠道选择建议

**根据环境选择**：
- **Windsurf**：支持所有渠道，推荐用于本地开发
- **Cursor**：支持所有渠道，推荐用于代码开发
- **Claude Desktop**：不支持OpenCLI，适合文档编写和设计任务
- **Claude Web**：渠道受限，适合协作和快速原型
- **OpenClaw**：支持所有渠道，适合企业级应用
- **Hermes**：支持所有渠道，适合长期优化项目
- **Web应用**：不支持OpenCLI，适合SaaS产品
- **CLI工具**：不支持OpenCLI，适合CI/CD集成

**根据任务选择**：
- **图像/视频生成**：优先选择支持AI模型渠道的环境
- **文件操作**：优先选择支持Python/JS脚本的环境
- **数据库查询**：优先选择支持MCP的环境
- **浏览器自动化**：必须选择支持OpenCLI的环境（Windsurf、Cursor、OpenClaw、Hermes）

### 环境适配策略

当Skill的实现渠道与当前运行环境不兼容时，系统会采用以下适配策略：

1. **优先级匹配**：优先使用当前环境原生支持的渠道
2. **降级处理**：如果首选渠道不支持，降级到次选渠道
3. **环境切换**：如果当前环境无法满足需求，建议切换到支持的环境
4. **能力提示**：在Skill定义中标注环境依赖，提前告知用户

**示例**：

```yaml
# Skill定义中的环境依赖
skill:
  name: "browser-automation"
  implementation:
    primary_channel: "software_tool"
    tool_type: "opencli"
    
  # 环境要求
  runtime_requirements:
    required:
      - "opencli_support"
    compatible_environments:
      - "windsurf"
      - "cursor"
      - "openclaw"
      - "hermes"
    incompatible_environments:
      - "claude_desktop"
      - "claude_web"
      - "web_application"
      - "cli_tool"
```

---

## 运行时环境选择指南

### 根据场景选择

| 场景 | 推荐运行时 | 理由 |
|------|------------|------|
| 本地开发 | Cursor, Claude Desktop | 完整工具链，离线可用 |
| 快速原型 | Claude Web | 随处访问，快速验证 |
| 协作设计 | Claude Web | 多人协作，分享功能 |
| 大规模项目 | OpenClaw | 性能优化，自动化 |
| 长期优化 | Hermes | 进化机制，持续改进 |
| SaaS产品 | Web应用 | 完全控制，多用户 |
| CI/CD | CLI工具 | 自动化友好，脚本化 |
| 设计评审 | Claude Desktop | 项目上下文，Artifacts |

### 决策树

```
开始
  │
  ├─ 需要本地文件访问？
  │   ├─ 是 → Cursor / Claude Desktop
  │   └─ 否 → 继续
  │
  ├─ 需要随处访问？
  │   ├─ 是 → Claude Web / Web应用
  │   └─ 否 → 继续
  │
  ├─ 需要协作？
  │   ├─ 是 → Claude Web
  │   └─ 否 → 继续
  │
  ├─ 需要性能优化？
  │   ├─ 是 → OpenClaw
  │   └─ 否 → 继续
  │
  ├─ 需要进化机制？
  │   ├─ 是 → Hermes
  │   └─ 否 → 继续
  │
  ├─ 需要自动化？
  │   ├─ 是 → CLI工具 / OpenClaw
  │   └─ 否 → 继续
  │
  └─ 需要完全控制？
      ├─ 是 → Web应用
      └─ 否 → Cursor / Claude Desktop
```

---

## 运行时环境迁移

### 从桌面IDE到云端

**步骤**：

1. 导出角色定义和技能
2. 配置云端运行时
3. 上传到云端项目
4. 验证功能

**示例**：

```bash
# 导出
rams export --role designer-role --output export/

# 上传到Claude Web
claude-web upload --project export/

# 验证
claude-web execute --role designer-role --skill design-tokens
```

### 从云端到专业工具

**步骤**：

1. 导出云端配置
2. 转换为专业工具格式
3. 配置专业工具
4. 迁移记忆
5. 验证功能

**示例**：

```python
from cloud_to_opclaw import Migrator

migrator = Migrator(
    source="claude_web",
    target="openclaw"
)

# 迁移角色
migrator.migrate_role("designer-role")

# 迁移记忆
migrator.migrate_memory()

# 验证
migrator.verify()
```

---

## 运行时环境最佳实践

### 1. 环境隔离

```yaml
runtime:
  environment: "development"
  isolation:
    memory: true
    actors: true
    tools: true
```

### 2. 配置管理

```yaml
# runtime-config.yaml
runtime:
  environment: "${RUNTIME_ENV}"
  role:
    path: "${ROLE_PATH}"
  actors:
    api_key: "${API_KEY}"
```

### 3. 错误处理

```python
try:
    result = runtime.execute(role, actor, skill, task)
except ActorError as e:
    # 尝试备用演员
    actor = runtime.select_fallback_actor(role)
    result = runtime.execute(role, actor, skill, task)
except SkillError as e:
    # 记录错误，继续执行
    runtime.log_error(e)
```

### 4. 性能监控

```python
from rams_runtime import Monitor

monitor = Monitor(runtime)

# 监控执行
with monitor.track("design-tokens"):
    result = runtime.execute(role, actor, skill, task)

# 获取指标
metrics = monitor.get_metrics()
print(f"执行时间: {metrics['duration']}ms")
print(f"Token使用: {metrics['tokens']}")
```

### 5. 日志记录

```yaml
runtime:
  logging:
    level: "debug"
    format: "json"
    outputs:
      - type: "console"
      - type: "file"
        path: "logs/rams.log"
      - type: "cloud"
        service: "cloudwatch"
```

---

## 总结

RAMS框架支持多种运行时环境，从桌面IDE到云端平台，从专业工具到自定义应用。选择合适的运行时环境取决于：

- **使用场景**：本地开发、协作、自动化
- **性能需求**：简单任务、大规模处理
- **功能需求**：文件访问、Git集成、进化机制
- **成本考虑**：免费工具、专业服务
- **技术栈**：现有工具、新平台

核心原则：
- **灵活性**：支持多种环境，按需选择
- **可移植性**：角色定义可在不同环境间迁移
- **一致性**：相同角色在不同环境表现一致
- **可扩展性**：支持自定义运行时环境
