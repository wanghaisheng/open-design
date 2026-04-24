# IDE Integration Guide

本文档详细说明如何在Cursor、Claude Desktop、Windsurf等IDE中使用基于RAMS框架的Open Design。

---

## 概述

### RAMS框架在IDE中的集成方式

RAMS框架通过角色（Role）和技能（Skills）的定义，使得AI助手能够在不同的IDE环境中以专业设计师的角色执行设计任务。每个IDE作为运行时环境，提供角色实例化、技能执行、模型调用、记忆存储等功能。

### 支持的IDE列表

| IDE | 类型 | 当前模型 | 支持渠道 | 适用场景 |
|-----|------|----------|----------|----------|
| Cursor | 桌面IDE | 多模型支持 | 全部 | 代码开发、设计实现 |
| Claude Desktop | 桌面IDE | Claude系列 | 全部（除OpenCLI） | 文档编写、设计评审 |
| Windsurf | 桌面IDE | SWE-1.6 | 全部 | 本地开发、全流程设计 |

### 集成优势

- **一致性**：相同角色在不同IDE中表现一致
- **可移植性**：角色定义可在不同IDE间迁移
- **灵活性**：根据IDE特性选择最佳实现渠道
- **专业性**：通过Soul和Skills提供专业设计能力

---

## Cursor集成

### 安装与配置

#### 1. 安装Cursor IDE

```bash
# 下载Cursor IDE
# 访问 https://cursor.sh 下载安装包
# 按照安装向导完成安装
```

#### 2. 克隆Open Design项目

```bash
# 克隆项目
git clone https://github.com/wanghaisheng/open-design.git
cd open-design

# 安装依赖（如果需要）
npm install
```

#### 3. 配置RAMS扩展

在项目根目录创建配置文件：

```json
// .cursor/rules/rams.json
{
  "role": {
    "definition_path": ".claude/roles",
    "default_role": "design-lead"
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
  },
  "skills": {
    "auto_load": true,
    "cache": true
  }
}
```

#### 4. 配置模型选择

在Cursor设置中配置API密钥：

```json
// Cursor设置中的模型配置
{
  "models": {
    "openai": {
      "api_key": "your-openai-api-key",
      "default_model": "gpt-4-turbo"
    },
    "anthropic": {
      "api_key": "your-anthropic-api-key",
      "default_model": "claude-3-opus-20240229"
    }
  }
}
```

### 使用方式

#### 通过@符号调用角色

在Cursor的聊天面板中：

```
@design-lead

请为电商App设计按钮组件，要求：
- 支持primary、secondary、ghost三种变体
- 包含hover、active、disabled状态
- 符合无障碍标准
```

#### 选择技能执行

```
@design-lead

使用ui-composition技能，设计一个卡片组件：
- 包含图片、标题、描述、操作按钮
- 响应式设计
- 支持深色主题
```

#### 查看输出结果

Cursor会：
1. 加载design-lead角色的Soul和Skills
2. 根据任务选择合适的技能
3. 通过AI模型渠道执行技能
4. 将结果输出到文件或显示在聊天面板

### 配置示例

#### 完整的.cursor配置

```json
// .cursor/rules/rams.json
{
  "role": {
    "definition_path": ".claude/roles",
    "default_role": "design-lead",
    "available_roles": [
      "design-lead",
      "design-builder",
      "design-strategist",
      "design-scout",
      "motion-designer",
      "content-writer"
    ]
  },
  "actors": {
    "default": "openai_gpt4",
    "fallback": "anthropic_claude",
    "models": {
      "openai_gpt4": {
        "provider": "openai",
        "model": "gpt-4-turbo",
        "capabilities": ["code", "vision", "reasoning"]
      },
      "anthropic_claude": {
        "provider": "anthropic",
        "model": "claude-3-opus-20240229",
        "capabilities": ["code", "vision", "long_context"]
      }
    }
  },
  "memory": {
    "type": "file",
    "path": ".claude/memory/",
    "compression": {
      "enabled": true,
      "retention_days": 180
    }
  },
  "tools": {
    "file_system": {
      "enabled": true,
      "allowed_paths": ["/workspace", "/tmp"]
    },
    "git": {
      "enabled": true,
      "allowed_commands": ["status", "add", "commit", "push"]
    },
    "terminal": {
      "enabled": true,
      "allowed_commands": ["npm", "git", "python"]
    },
    "browser": {
      "enabled": true,
      "allowed_domains": ["*"]
    }
  },
  "skills": {
    "auto_load": true,
    "cache": true,
    "execution": {
      "primary_channel": "ai_model",
      "fallback_channel": "software_tool"
    }
  }
}
```

### 实战示例

#### 示例1：设计令牌生成

```
@design-lead

使用token-architecture技能，生成设计令牌：
- 品牌主色：#1A1C1E
- 辅助色：#6C7278
- 强调色：#4A90E2
- 字体：Inter
- 输出到：packages/ui/src/tokens/index.ts
```

**执行流程**：
1. Cursor加载design-lead角色
2. 识别token-architecture技能
3. 通过GPT-4 Turbo执行技能
4. 生成TypeScript设计令牌文件
5. 保存到指定路径

#### 示例2：组件设计

```
@design-builder

使用ui-composition技能，实现按钮组件：
- 基于设计令牌
- 支持多种变体
- 包含交互状态
- 输出到：packages/ui/src/components/Button.tsx
```

**执行流程**：
1. Cursor加载design-builder角色
2. 识别ui-composition技能
3. 读取设计令牌文件
4. 通过GPT-4 Turbo生成React组件
5. 保存到指定路径

#### 示例3：原型构建

```
@design-builder

使用web-html-prototype技能，生成原型：
- 基于设计稿
- 包含交互效果
- 响应式设计
- 输出到：prototypes/landing-page.html
```

---

## Claude Desktop集成

### 安装与配置

#### 1. 安装Claude Desktop

```bash
# 下载Claude Desktop
# 访问 https://claude.ai/download 下载安装包
# 按照安装向导完成安装
```

#### 2. 配置项目上下文

在Claude Desktop中添加项目：

```
1. 打开Claude Desktop
2. 点击"Add Project"
3. 选择项目目录：open-design
4. 配置项目名称和描述
```

#### 3. 配置角色引用

在项目根目录创建配置文件：

```yaml
# .claude/claude_desktop_config.yaml
runtime:
  environment: "claude_desktop"
  role:
    id: "design-lead"
    path: ".claude/roles/design-lead"
    soul_ref: "./soul.md"
  
  actors:
    - provider: "anthropic"
      model: "claude-3-opus-20240229"
      priority: 1
    - provider: "anthropic"
      model: "claude-3-sonnet-20240229"
      priority: 2
  
  memory:
    type: "project"
    location: ".claude/memory/"
    compression:
      enabled: true
      retention_days: 180
  
  tools:
    - file_read
    - file_write
    - directory_list
    - git_status
    - git_commit
  
  skills:
    auto_load: true
    cache: true
```

### 使用方式

#### 通过@符号调用角色

在Claude Desktop的聊天面板中：

```
@design-lead

请编写设计系统文档，包括：
- 色彩系统
- 排版系统
- 间距系统
- 组件规范
```

#### 使用Artifacts功能

Claude Desktop支持Artifacts，可以预览和编辑生成的代码：

```
@design-lead

使用design-tokens技能生成设计令牌，并在Artifact中预览
```

#### 多项目切换

Claude Desktop支持多项目切换：

```
1. 点击项目切换按钮
2. 选择不同的项目
3. 每个项目有独立的角色配置和记忆
```

### 配置示例

#### 完整的Claude Desktop配置

```yaml
# .claude/claude_desktop_config.yaml
runtime:
  environment: "claude_desktop"
  
  role:
    id: "design-lead"
    path: ".claude/roles/design-lead"
    soul_ref: "./soul.md"
    variant: null  # 可选：b2b, b2c, mobile
    
    # 可用角色列表
    available_roles:
      - id: "design-lead"
        path: ".claude/roles/design-lead"
      - id: "design-builder"
        path: ".claude/roles/design-builder"
      - id: "design-strategist"
        path: ".claude/roles/design-strategist"
  
  actors:
    - provider: "anthropic"
      model: "claude-3-opus-20240229"
      priority: 1
      capabilities:
        - long_context
        - vision
        - code
    - provider: "anthropic"
      model: "claude-3-sonnet-20240229"
      priority: 2
      capabilities:
        - code
        - vision
  
  memory:
    type: "project"
    location: ".claude/memory/"
    
    # 记忆类型
    types:
      - prompt_memory
      - session_archive
      - skill_memory
      - vector_index
      - user_profile
    
    # 压缩策略
    compression:
      enabled: true
      retention_days: 180
      vector_retention: "permanent"
  
  tools:
    - name: "file_read"
      enabled: true
      allowed_paths: ["/workspace"]
    - name: "file_write"
      enabled: true
      allowed_paths: ["/workspace"]
    - name: "directory_list"
      enabled: true
    - name: "git_status"
      enabled: true
    - name: "git_commit"
      enabled: true
      requires_confirmation: true
  
  skills:
    auto_load: true
    cache: true
    
    # 技能执行配置
    execution:
      primary_channel: "ai_model"
      fallback_channel: "software_tool"
      timeout: 300  # 秒
  
  # Artifacts配置
  artifacts:
    enabled: true
    auto_preview: true
    supported_formats:
      - "typescript"
      - "javascript"
      - "html"
      - "css"
      - "markdown"
```

### 实战示例

#### 示例1：设计文档编写

```
@design-lead

使用design-system-alignment技能，编写设计系统文档：
- 色彩系统规范
- 排版系统规范
- 组件使用指南
- 输出到：docs/DESIGN-SYSTEM.md
```

**执行流程**：
1. Claude Desktop加载design-lead角色
2. 识别design-system-alignment技能
3. 通过Claude 3 Opus执行技能
4. 生成Markdown文档
5. 在Artifact中预览
6. 保存到指定路径

#### 示例2：原型生成

```
@design-builder

使用web-html-prototype技能，生成HTML原型：
- 基于设计令牌
- 包含交互效果
- 响应式设计
- 输出到：prototypes/dashboard.html
```

**执行流程**：
1. Claude Desktop加载design-builder角色
2. 识别web-html-prototype技能
3. 读取设计令牌文件
4. 通过Claude 3 Opus生成HTML原型
5. 在Artifact中预览
6. 保存到指定路径

#### 示例3：设计评审

```
@design-critic

使用design-critique技能，评审现有设计：
- 检查设计一致性
- 评估无障碍性
- 提供改进建议
- 输出到：docs/design-review.md
```

---

## Windsurf集成

### 环境特性

#### 当前环境信息

- **IDE**：Windsurf IDE
- **模型**：SWE-1.6
- **支持渠道**：
  - ✅ AI模型渠道（所有模型）
  - ✅ Python/JS脚本
  - ✅ MCP协议
  - ✅ OpenCLI

#### Windsurf优势

- **完整工具链**：文件系统、Git、终端、浏览器
- **Workflow系统**：集成.windsurf/workflows
- **多模型支持**：可配置不同模型
- **本地执行**：无网络延迟，离线可用
- **深度集成**：与项目上下文深度集成

### 配置方式

#### 1. 配置Windsurf设置

在Windsurf设置中配置：

```json
// .windsurf/config.json
{
  "model": {
    "default": "swe-1.6",
    "fallback": "claude-3-opus-20240229"
  },
  "role": {
    "definition_path": ".claude/roles",
    "default_role": "design-lead"
  },
  "memory": {
    "enabled": true,
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

#### 2. 配置角色路径

```yaml
# .windsurf/role-config.yaml
roles:
  default: "design-lead"
  available:
    - "design-lead"
    - "design-builder"
    - "design-strategist"
    - "design-scout"
    - "motion-designer"
    - "content-writer"
  
  paths:
    base: ".claude/roles"
    souls: "soul.md"
    skills: "skills"
```

#### 3. 配置模型

```yaml
# .windsurf/model-config.yaml
models:
  default: "swe-1.6"
  
  swe_1_6:
    provider: "windsurf"
    model: "swe-1.6"
    capabilities:
      - code
      - reasoning
      - tools
    channels:
      ai_model: true
      python_script: true
      mcp: true
      opencli: true
  
  claude_opus:
    provider: "anthropic"
    model: "claude-3-opus-20240229"
    capabilities:
      - long_context
      - vision
      - code
    channels:
      ai_model: true
      python_script: true
      mcp: true
      opencli: false
```

### 使用方式

#### 通过对话调用角色

在Windsurf的聊天面板中：

```
@design-lead

请为RPG游戏设计角色血条UI组件：
- 支持不同血量状态（满血、受伤、濒死）
- 支持血量变化动画
- 支持不同角色类型（战士、法师、弓箭手）
- 符合游戏整体视觉风格
```

#### Workflow系统集成

Windsurf支持通过Workflow系统执行任务：

```bash
# 使用workflow
/w prd-to-mvp

# 或通过对话
@rams-orchestrator

使用prd-to-mvp workflow，从PRD到MVP的完整实施
```

#### 技能执行

```
@design-lead

使用token-architecture技能，生成设计令牌：
- 品牌色：#1A1C1E
- 字体：Inter
- 输出到：packages/ui/src/tokens/index.ts
```

### 配置示例

#### 完整的Windsurf配置

```yaml
# .windsurf/config.yaml
runtime:
  environment: "windsurf"
  model: "swe-1.6"
  
  role:
    definition_path: ".claude/roles"
    default_role: "design-lead"
    soul_ref: "./soul.md"
    
    available_roles:
      - id: "design-lead"
        path: ".claude/roles/design-lead"
        priority: 1
      - id: "design-builder"
        path: ".claude/roles/design-builder"
        priority: 2
      - id: "design-strategist"
        path: ".claude/roles/design-strategist"
        priority: 3
  
  actors:
    default: "swe-1.6"
    fallback: "claude-3-opus-20240229"
    
    models:
      swe_1_6:
        provider: "windsurf"
        model: "swe-1.6"
        capabilities:
          - code
          - reasoning
          - tools
        channels:
          ai_model: true
          python_script: true
          mcp: true
          opencli: true
      
      claude_opus:
        provider: "anthropic"
        model: "claude-3-opus-20240229"
        capabilities:
          - long_context
          - vision
          - code
        channels:
          ai_model: true
          python_script: true
          mcp: true
          opencli: false
  
  memory:
    type: "file"
    path: ".claude/memory/"
    
    types:
      - prompt_memory
      - session_archive
      - skill_memory
      - vector_index
      - user_profile
    
    compression:
      enabled: true
      retention_days: 180
      vector_retention: "permanent"
  
  tools:
    file_system:
      enabled: true
      allowed_paths: ["/workspace", "/tmp"]
      read_only: false
    
    git:
      enabled: true
      allowed_commands:
        - status
        - add
        - commit
        - push
        - pull
        - branch
    
    terminal:
      enabled: true
      allowed_commands:
        - npm
        - git
        - python
        - node
      shell: "powershell"
    
    browser:
      enabled: true
      allowed_domains: ["*"]
      headless: false
  
  skills:
    auto_load: true
    cache: true
    
    execution:
      primary_channel: "ai_model"
      fallback_channel: "software_tool"
      timeout: 300
      
      # 渠道配置
      channels:
        ai_model:
          enabled: true
          models:
            - "swe-1.6"
            - "claude-3-opus-20240229"
        
        software_tool:
          enabled: true
          types:
            - "python_script"
            - "mcp"
            - "opencli"
  
  # Workflow集成
  workflows:
    enabled: true
    path: ".windsurf/workflows"
    auto_execute: false
    
    available:
      - "prd-to-mvp"
      - "prd-to-prototype"
      - "requirement-to-task"
```

### 实战示例

#### 示例1：RPG血条设计

```
@design-lead

使用ui-composition技能，为RPG游戏设计血条组件：
- 支持不同血量状态（满血、受伤、濒死）
- 支持血量变化动画
- 支持不同角色类型（战士、法师、弓箭手）
- 输出到：packages/ui/src/components/HealthBar.tsx
```

**执行流程**：
1. Windsurf加载design-lead角色
2. 识别ui-composition技能
3. 通过SWE-1.6执行技能
4. 生成React组件代码
5. 保存到指定路径

详细示例参见 [RPG_HEALTH_BAR_DESIGN_EXAMPLE.md](RPG_HEALTH_BAR_DESIGN_EXAMPLE.md)

#### 示例2：设计系统构建

```
@design-lead

使用design-system-alignment技能，构建完整设计系统：
- 设计令牌
- 布局网格
- 组件库
- 输出到：docs/DESIGN-SYSTEM.md
```

**执行流程**：
1. Windsurf加载design-lead角色
2. 识别design-system-alignment技能
3. 通过SWE-1.6执行技能
4. 生成设计系统文档
5. 保存到指定路径

#### 示例3：原型开发

```
@design-builder

使用web-html-prototype技能，开发交互原型：
- 基于设计系统
- 包含交互效果
- 响应式设计
- 输出到：prototypes/app.html
```

**执行流程**：
1. Windsurf加载design-builder角色
2. 识别web-html-prototype技能
3. 读取设计系统文档
4. 通过SWE-1.6生成HTML原型
5. 在浏览器中预览
6. 保存到指定路径

---

## 通用配置

### 角色定义结构

#### 目录结构

```
.claude/roles/{role_name}/
├── soul.md              # 基础人格设定（独立存储，可复用）
├── role.md              # 角色定义（元数据 + Skills + soul_ref）
├── actors/              # 演员专用Soul微调
│   ├── claude-opus-soul.md
│   └── gpt4-turbo-soul.md
└── variants/            # 角色变体
    ├── b2b/
    │   ├── soul.md
    │   └── role.md
    ├── b2c/
    │   ├── soul.md
    │   └── role.md
    └── mobile/
        ├── soul.md
        └── role.md
```

#### role.md配置

```yaml
---
name: design-lead
version: 1.0.0
description: 视觉设计执行专家
tags: [视觉设计, 设计系统, UI设计]
capabilities: [视觉设计, 系统思维, 细节把控]
soul_ref: "./soul.md"
---

# Design Lead

## Soul 引用
人格设定定义在 [soul.md](./soul.md) 文件中。

## Skills（技能堆栈）

### 核心技能
- **token-architecture**：设计令牌架构
- **design-system-alignment**：设计系统对齐
- **ui-composition**：UI组合
- **interaction-design**：交互设计

## 典型任务
### 任务1：布局网格设计
**输入**：设备类型、内容类型
**输出**：布局网格规范
**所需技能**：token-architecture, responsive-patterns
```

#### soul.md配置

```markdown
---
name: design-lead-soul
version: 1.0.0
description: 视觉设计执行专家的人格设定
---

# Design Lead Soul

你是一名资深视觉设计专家，拥有丰富的设计系统构建经验。

## 核心特质
- **视觉敏感**：对色彩、排版、布局有敏锐的感知力
- **系统思维**：能够从整体视角构建设计系统
- **细节把控**：对每个像素、每个间距都精益求精

## 工作原则
1. 一致性优先
2. 可扩展性
3. 用户中心
4. 性能考虑
```

### 记忆配置

#### 记忆类型选择

```yaml
memory:
  types:
    - prompt_memory        # 提示词记忆
    - session_archive      # 会话存档
    - skill_memory         # 技能记忆
    - vector_index         # 向量索引
    - user_profile         # 用户画像
```

#### 记忆路径配置

```yaml
memory:
  type: "file"
  path: ".claude/memory/"
  
  structure:
    prompt_memory: ".claude/memory/prompts/"
    session_archive: ".claude/memory/sessions/"
    skill_memory: ".claude/memory/skills/"
    vector_index: ".claude/memory/vectors/"
    user_profile: ".claude/memory/users/"
```

#### 压缩策略

```yaml
memory:
  compression:
    enabled: true
    retention_days: 180
    vector_retention: "permanent"
    
    # 压缩规则
    rules:
      - type: "session_archive"
        age_days: 30
        action: "compress"
      - type: "prompt_memory"
        age_days: 90
        action: "compress"
      - type: "vector_index"
        action: "keep"
```

### 工具权限

#### 文件系统访问

```yaml
tools:
  file_system:
    enabled: true
    allowed_paths:
      - "/workspace"
      - "/tmp"
    read_only: false
    max_file_size: "10MB"
```

#### Git集成

```yaml
tools:
  git:
    enabled: true
    allowed_commands:
      - status
      - add
      - commit
      - push
      - pull
      - branch
      - log
    requires_confirmation:
      - push
      - commit
```

#### 终端访问

```yaml
tools:
  terminal:
    enabled: true
    allowed_commands:
      - npm
      - git
      - python
      - node
      - yarn
    shell: "powershell"  # Windows
    # shell: "bash"  # Linux/Mac
    timeout: 300
```

#### 浏览器自动化

```yaml
tools:
  browser:
    enabled: true
    allowed_domains:
      - "*"
    headless: false
    viewport:
      width: 1920
      height: 1080
```

---

## 最佳实践

### 开发工作流

#### 角色选择策略

**根据任务类型选择角色**：

| 任务类型 | 推荐角色 | 理由 |
|---------|---------|------|
| 设计系统构建 | design-lead | 系统思维，设计专家 |
| 组件实现 | design-builder | 代码实现，性能优化 |
| 用户研究 | design-strategist | 策略思维，用户洞察 |
| 创意探索 | design-scout | 灵感发现，创意生成 |
| 动画设计 | motion-designer | 动画专业，交互设计 |
| 内容编写 | content-writer | 文案专业，内容创作 |

#### 技能组合建议

**设计系统构建**：
```
design-lead
├── token-architecture (P0)
├── design-system-alignment (P0)
└── ui-composition (P0)
```

**组件实现**：
```
design-builder
├── token-architecture (P0)
├── design-system-alignment (P0)
└── responsive-patterns (P0)
```

**原型开发**：
```
design-builder
├── web-html-prototype (P0)
├── interaction-design (P1)
└── design-state (P1)
```

#### 迭代优化方法

1. **初稿生成**：使用design-lead生成初稿
2. **设计评审**：使用design-critic评审设计
3. **实现优化**：使用design-builder优化实现
4. **用户测试**：使用design-strategist进行用户测试
5. **最终交付**：使用design-builder生成最终版本

### 性能优化

#### 缓存策略

```yaml
skills:
  cache:
    enabled: true
    ttl: 3600  # 缓存1小时
    max_size: "100MB"
    
    # 缓存规则
    rules:
      - skill: "token-architecture"
        ttl: 7200  # 设计令牌缓存2小时
      - skill: "ui-composition"
        ttl: 1800  # 组件设计缓存30分钟
```

#### 并行执行

```yaml
execution:
  parallel:
    enabled: true
    max_parallel: 3
    
    # 并行规则
    rules:
      - skills: ["token-architecture", "design-system-alignment"]
        can_parallel: true
      - skills: ["ui-composition", "interaction-design"]
        can_parallel: false  # 需要顺序执行
```

#### 资源管理

```yaml
execution:
  resources:
    max_memory: "2GB"
    max_cpu: "80%"
    timeout: 300
    
    # 资源限制
    limits:
      - skill: "web-html-prototype"
        max_memory: "1GB"
        timeout: 600
```

### 故障排查

#### 常见问题

**问题1：角色加载失败**

```
错误：Role not found: design-lead
解决：
1. 检查角色路径配置
2. 确认role.md文件存在
3. 验证soul_ref路径正确
```

**问题2：技能执行失败**

```
错误：Skill execution timeout
解决：
1. 增加timeout配置
2. 检查网络连接
3. 验证模型API密钥
```

**问题3：文件保存失败**

```
错误：File write permission denied
解决：
1. 检查文件系统权限配置
2. 确认目标路径存在
3. 验证allowed_paths配置
```

#### 调试方法

**启用调试日志**：

```yaml
runtime:
  logging:
    level: "debug"
    output:
      - console
      - file
    
    # 日志配置
    format: "json"
    file_path: ".claude/logs/debug.log"
```

**查看执行日志**：

```bash
# 查看日志
cat .claude/logs/debug.log

# 过滤错误
cat .claude/logs/debug.log | grep ERROR

# 查看特定角色
cat .claude/logs/debug.log | grep design-lead
```

---

## 迁移指南

### 从Cursor到Claude Desktop

#### 配置迁移

**步骤1：导出Cursor配置**

```bash
# 导出Cursor配置
cp .cursor/rules/rams.json cursor-config-backup.json
```

**步骤2：转换为Claude Desktop格式**

```yaml
# cursor-config-backup.json → .claude/claude_desktop_config.yaml
runtime:
  environment: "claude_desktop"
  role:
    id: "design-lead"  # 从default_role转换
    path: ".claude/roles/design-lead"
  
  actors:
    - provider: "anthropic"  # Cursor的fallback
      model: "claude-3-opus-20240229"
```

**步骤3：调整工具权限**

```yaml
# Claude Desktop不支持OpenCLI
tools:
  - file_read
  - file_write
  - directory_list
  - git_status
  # 移除terminal和browser
```

#### 记忆迁移

```bash
# 迁移记忆
cp -r .claude/memory/ .claude/memory-cursor-backup/

# Claude Desktop会自动识别现有记忆
```

#### 验证步骤

```bash
# 1. 验证角色加载
@design-lead
请输出你的角色信息

# 2. 验证技能执行
@design-lead
使用token-architecture技能生成测试令牌

# 3. 验证文件保存
@design-lead
将测试令牌保存到test-output.md
```

### 从Claude Desktop到Windsurf

#### 配置转换

**步骤1：导出Claude Desktop配置**

```bash
# 导出Claude Desktop配置
cp .claude/claude_desktop_config.yaml claude-desktop-backup.yaml
```

**步骤2：转换为Windsurf格式**

```yaml
# claude-desktop-backup.yaml → .windsurf/config.yaml
runtime:
  environment: "windsurf"
  model: "swe-1.6"  # Windsurf默认模型
  
  role:
    definition_path: ".claude/roles"
    default_role: "design-lead"
```

**步骤3：添加Windsurf特有配置**

```yaml
# Windsurf支持OpenCLI
tools:
  browser:
    enabled: true
    allowed_domains: ["*"]
  
  # Windsurf支持Workflow
  workflows:
    enabled: true
    path: ".windsurf/workflows"
```

#### 模型适配

```yaml
# Claude Desktop使用Claude模型
# Windsurf使用SWE-1.6，需要适配

actors:
  default: "swe-1.6"
  fallback: "claude-3-opus-20240229"
  
  models:
    swe_1_6:
      provider: "windsurf"
      model: "swe-1.6"
      capabilities:
        - code
        - reasoning
        - tools
```

#### 功能验证

```bash
# 1. 验证SWE-1.6模型
@design-lead
请使用SWE-1.6模型执行任务

# 2. 验证OpenCLI支持
@design-builder
使用OpenCLI生成浏览器截图

# 3. 验证Workflow集成
/w prd-to-mvp
```

---

## 总结

通过本指南，您应该能够在Cursor、Claude Desktop、Windsurf等IDE中成功集成和使用基于RAMS框架的Open Design。

### 关键要点

1. **配置一致性**：确保角色定义、技能配置、记忆设置在所有IDE中保持一致
2. **环境适配**：根据IDE特性调整配置（如Claude Desktop不支持OpenCLI）
3. **工具权限**：合理配置文件系统、Git、终端、浏览器权限
4. **性能优化**：启用缓存、并行执行、资源管理
5. **故障排查**：使用调试日志定位问题

### 下一步

- 阅读完整的 [RAMS_FRAMEWORK.md](RAMS_FRAMEWORK.md) 了解框架详情
- 查看 [SKILL_IMPLEMENTATION.md](SKILL_IMPLEMENTATION.md) 了解技能实现
- 参考 [RPG_HEALTH_BAR_DESIGN_EXAMPLE.md](RPG_HEALTH_BAR_DESIGN_EXAMPLE.md) 查看实战示例
- 探索 [RUNTIME_ENVIRONMENTS.md](../ref/RUNTIME_ENVIRONMENTS.md) 了解更多运行时环境

### 获取帮助

如遇到问题，请：
1. 查看故障排查章节
2. 检查配置文件语法
3. 查看调试日志
4. 参考实战示例
