# Open Design CLI 优化建议

本文档分析当前CLI工具的设计，并提供基于RAMS框架的优化思路。

---

## 当前CLI工具分析

### 现有功能

**@open-design/cli** 当前提供以下命令：

1. **lint** - 验证规范文档的结构正确性
2. **template** - 基于规范类型生成文档模板
3. **validate** - 验证实际文档是否符合其规范
4. **export** - 将规范文档导出为其他格式（JSON、HTML、TypeScript）

### 技术栈

- **框架**：citty（CLI框架）
- **解析**：yaml, remark（Markdown解析）
- **验证**：zod
- **运行时**：Bun

### 架构

```
src/
├── index.ts           # CLI入口
├── commands/          # CLI命令
│   ├── lint.ts
│   ├── template.ts
│   ├── validate.ts
│   └── export.ts
├── validators/        # 规范验证器
├── parsers/           # YAML和Markdown解析器
├── exporters/         # 格式导出器
└── utils/             # 工具函数
```

---

## 优化思路

### 1. 集成RAMS框架角色执行

#### 问题
当前CLI工具是独立的文档处理工具，与RAMS框架的角色系统没有集成。

#### 优化方案

**新增命令：role**

```bash
# 使用RAMS角色执行设计任务
open-design role execute design-lead --skill token-architecture --input design-input.yaml

# 列出可用角色
open-design role list

# 查看角色详情
open-design role info design-lead

# 切换角色
open-design role switch design-builder
```

**实现方式**：

```typescript
// src/commands/role.ts
import { defineCommand } from 'citty';
import { RoleInstance } from '../rams/role-instance.js';

export default defineCommand({
  meta: {
    name: 'role',
    description: 'Execute RAMS framework roles for design tasks',
  },
  subCommands: {
    execute: executeRoleCommand,
    list: listRolesCommand,
    info: roleInfoCommand,
    switch: switchRoleCommand,
  },
});
```

**优势**：
- 将CLI工具与RAMS框架深度集成
- 支持在命令行中使用角色执行设计任务
- 适合CI/CD自动化场景

### 2. 添加Workflow系统集成

#### 问题
当前CLI工具不支持Windsurf的Workflow系统。

#### 优化方案

**新增命令：workflow**

```bash
# 执行workflow
open-design workflow run prd-to-mvp --input prd.md

# 列出可用workflow
open-design workflow list

# 查看workflow详情
open-design workflow info prd-to-mvp

# 创建自定义workflow
open-design workflow create my-workflow --template prd-to-mvp
```

**实现方式**：

```typescript
// src/commands/workflow.ts
import { defineCommand } from 'citty';
import { WorkflowExecutor } from '../rams/workflow-executor.js';

export default defineCommand({
  meta: {
    name: 'workflow',
    description: 'Execute Open Design workflows',
  },
  subCommands: {
    run: runWorkflowCommand,
    list: listWorkflowsCommand,
    info: workflowInfoCommand,
    create: createWorkflowCommand,
  },
});
```

**优势**：
- 支持在命令行中执行完整的workflow
- 适合自动化构建和部署
- 与Windsurf的Workflow系统保持一致

### 3. 增强Skill执行能力

#### 问题
当前CLI工具没有Skill执行能力。

#### 优化方案

**新增命令：skill**

```bash
# 执行特定skill
open-design skill execute token-architecture --role design-lead --input tokens.yaml

# 列出角色的skills
open-design skill list --role design-lead

# 查看skill详情
open-design skill info token-architecture

# 测试skill
open-design skill test token-architecture --test-case test-1.yaml
```

**实现方式**：

```typescript
// src/commands/skill.ts
import { defineCommand } from 'citty';
import { SkillExecutor } from '../rams/skill-executor.js';

export default defineCommand({
  meta: {
    name: 'skill',
    description: 'Execute RAMS framework skills',
  },
  subCommands: {
    execute: executeSkillCommand,
    list: listSkillsCommand,
    info: skillInfoCommand,
    test: testSkillCommand,
  },
});
```

**优势**：
- 支持单独执行skill
- 便于测试和调试
- 支持skill组合执行

### 4. 添加运行时环境管理

#### 问题
当前CLI工具没有运行时环境管理功能。

#### 优化方案

**新增命令：runtime**

```bash
# 查看当前运行时环境
open-design runtime info

# 切换运行时环境
open-design runtime switch windsurf

# 配置运行时环境
open-design runtime config --model swe-1.6 --channels ai_model,python_script

# 验证环境兼容性
open-design runtime validate --skill browser-automation
```

**实现方式**：

```typescript
// src/commands/runtime.ts
import { defineCommand } from 'citty';
import { RuntimeManager } from '../rams/runtime-manager.js';

export default defineCommand({
  meta: {
    name: 'runtime',
    description: 'Manage RAMS runtime environments',
  },
  subCommands: {
    info: runtimeInfoCommand,
    switch: switchRuntimeCommand,
    config: configRuntimeCommand,
    validate: validateRuntimeCommand,
  },
});
```

**优势**：
- 支持运行时环境管理
- 支持环境切换和配置
- 支持环境兼容性验证

### 5. 增强记忆管理

#### 问题
当前CLI工具没有记忆管理功能。

#### 优化方案

**新增命令：memory**

```bash
# 查看记忆统计
open-design memory stats

# 搜索记忆
open-design memory search "design tokens"

# 导出记忆
open-design memory export --format json --output memory-backup.json

# 导入记忆
open-design memory import memory-backup.json

# 清理记忆
open-design memory cleanup --days 90
```

**实现方式**：

```typescript
// src/commands/memory.ts
import { defineCommand } from 'citty';
import { MemoryManager } from '../rams/memory-manager.js';

export default defineCommand({
  meta: {
    name: 'memory',
    description: 'Manage RAMS memory and learning',
  },
  subCommands: {
    stats: memoryStatsCommand,
    search: searchMemoryCommand,
    export: exportMemoryCommand,
    import: importMemoryCommand,
    cleanup: cleanupMemoryCommand,
  },
});
```

**优势**：
- 支持记忆管理
- 支持记忆搜索和导出
- 支持记忆清理和压缩

### 6. 添加后置学习触发

#### 问题
当前CLI工具没有后置学习功能。

#### 优化方案

**新增命令：learn**

```bash
# 触发后置学习
open-design learn trigger --task-id task-123

# 查看学习进度
open-design learn status

# 查看学习历史
open-design learn history

# 手动添加学习样本
open-design learn add --sample good-example.yaml
```

**实现方式**：

```typescript
// src/commands/learn.ts
import { defineCommand } from 'citty';
import { LearningManager } from '../rams/learning-manager.js';

export default defineCommand({
  meta: {
    name: 'learn',
    description: 'Trigger and manage post-task learning',
  },
  subCommands: {
    trigger: triggerLearningCommand,
    status: learningStatusCommand,
    history: learningHistoryCommand,
    add: addLearningSampleCommand,
  },
});
```

**优势**：
- 支持后置学习触发
- 支持学习进度跟踪
- 支持手动添加学习样本

### 7. 增强配置管理

#### 问题
当前CLI工具的配置分散，没有统一的配置管理。

#### 优化方案

**新增命令：config**

```bash
# 查看配置
open-design config get

# 设置配置
open-design config set default.role design-lead

# 初始化配置
open-design config init

# 验证配置
open-design config validate
```

**实现方式**：

```typescript
// src/commands/config.ts
import { defineCommand } from 'citty';
import { ConfigManager } from '../utils/config-manager.js';

export default defineCommand({
  meta: {
    name: 'config',
    description: 'Manage CLI configuration',
  },
  subCommands: {
    get: getConfigCommand,
    set: setConfigCommand,
    init: initConfigCommand,
    validate: validateConfigCommand,
  },
});
```

**配置文件结构**：

```yaml
# .open-design/config.yaml
runtime:
  environment: "windsurf"
  model: "swe-1.6"

role:
  default: "design-lead"
  path: ".claude/roles"

memory:
  enabled: true
  path: ".claude/memory/"
  compression:
    enabled: true
    retention_days: 180

skills:
  auto_load: true
  cache: true

workflows:
  enabled: true
  path: ".windsurf/workflows"
```

**优势**：
- 统一的配置管理
- 支持配置初始化和验证
- 便于团队协作

### 8. 添加插件系统

#### 问题
当前CLI工具功能固定，不支持扩展。

#### 优化方案

**新增命令：plugin**

```bash
# 列出已安装插件
open-design plugin list

# 安装插件
open-design plugin install @open-design/plugin-figma

# 卸载插件
open-design plugin uninstall @open-design/plugin-figma

# 查看插件信息
open-design plugin info @open-design/plugin-figma
```

**实现方式**：

```typescript
// src/commands/plugin.ts
import { defineCommand } from 'citty';
import { PluginManager } from '../rams/plugin-manager.js';

export default defineCommand({
  meta: {
    name: 'plugin',
    description: 'Manage CLI plugins',
  },
  subCommands: {
    list: listPluginsCommand,
    install: installPluginCommand,
    uninstall: uninstallPluginCommand,
    info: pluginInfoCommand,
  },
});
```

**插件示例**：

```typescript
// 插件：Figma集成
export default {
  name: '@open-design/plugin-figma',
  version: '1.0.0',
  commands: {
    'figma:sync': syncFigmaCommand,
    'figma:export': exportFigmaCommand,
  },
  skills: {
    'figma-component': figmaComponentSkill,
  },
};
```

**优势**：
- 支持功能扩展
- 支持第三方插件
- 增强生态系统

### 9. 增强导出功能

#### 问题
当前export功能有限，只支持JSON、HTML、TypeScript。

#### 优化方案

**扩展export命令**：

```bash
# 导出为设计令牌
open-design export docs/DESIGN-SPEC.md --format tokens --output tokens.ts

# 导出为CSS变量
open-design export docs/DESIGN-SPEC.md --format css-variables --output variables.css

# 导出为Tailwind配置
open-design export docs/DESIGN-SPEC.md --format tailwind --output tailwind.config.js

# 导出为Storybook配置
open-design export docs/DESIGN-SPEC.md --format storybook --output .storybook/config.js

# 批量导出
open-design export docs/DESIGN-SPEC.md --format all --output ./exports/
```

**实现方式**：

```typescript
// src/exporters/tokens-exporter.ts
export class TokensExporter {
  export(spec: DesignSpec): string {
    return `export const tokens = ${JSON.stringify(spec.tokens, null, 2)};`;
  }
}

// src/exporters/css-variables-exporter.ts
export class CSSVariablesExporter {
  export(spec: DesignSpec): string {
    const css = Object.entries(spec.colors).map(([key, value]) => {
      return `--color-${key}: ${value};`;
    }).join('\n');
    return `:root {\n${css}\n}`;
  }
}
```

**优势**：
- 支持更多导出格式
- 支持批量导出
- 与设计工具集成

### 10. 添加交互式模式

#### 问题
当前CLI工具是命令式的，不支持交互式操作。

#### 优化方案

**新增命令：interactive**

```bash
# 进入交互式模式
open-design interactive

# 交互式示例
> role execute design-lead
> skill list
> skill execute token-architecture
> exit
```

**实现方式**：

```typescript
// src/commands/interactive.ts
import { defineCommand } from 'citty';
import { createInterface } from 'readline';

export default defineCommand({
  meta: {
    name: 'interactive',
    description: 'Enter interactive mode',
  },
  async run() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('Open Design Interactive Mode');
    console.log('Type "help" for available commands, "exit" to quit');

    while (true) {
      const answer = await rl.question('> ');
      
      if (answer === 'exit') {
        rl.close();
        break;
      }
      
      // 处理命令
      await handleInteractiveCommand(answer);
    }
  },
});
```

**优势**：
- 支持交互式操作
- 提升用户体验
- 便于探索和学习

---

## 优化后的架构

```
src/
├── index.ts                    # CLI入口
├── commands/                   # CLI命令
│   ├── lint.ts
│   ├── template.ts
│   ├── validate.ts
│   ├── export.ts
│   ├── role.ts                 # 新增：角色管理
│   ├── skill.ts                # 新增：技能管理
│   ├── workflow.ts             # 新增：工作流管理
│   ├── runtime.ts              # 新增：运行时管理
│   ├── memory.ts               # 新增：记忆管理
│   ├── learn.ts                # 新增：学习管理
│   ├── config.ts               # 新增：配置管理
│   ├── plugin.ts               # 新增：插件管理
│   └── interactive.ts          # 新增：交互式模式
├── rams/                       # RAMS框架集成
│   ├── role-instance.ts
│   ├── skill-executor.ts
│   ├── workflow-executor.ts
│   ├── runtime-manager.ts
│   ├── memory-manager.ts
│   ├── learning-manager.ts
│   └── plugin-manager.ts
├── validators/                 # 规范验证器
├── parsers/                    # YAML和Markdown解析器
├── exporters/                  # 格式导出器
│   ├── json-exporter.ts
│   ├── html-exporter.ts
│   ├── tokens-exporter.ts      # 新增
│   ├── css-variables-exporter.ts # 新增
│   ├── tailwind-exporter.ts    # 新增
│   └── storybook-exporter.ts   # 新增
└── utils/                      # 工具函数
    ├── file-utils.ts
    ├── format-utils.ts
    └── config-manager.ts      # 新增
```

---

## 实施优先级

### 高优先级（立即实施）

1. **配置管理** - 统一配置管理是基础
2. **角色执行** - 与RAMS框架核心集成
3. **Skill执行** - 核心功能增强

### 中优先级（近期实施）

4. **Workflow集成** - 与Windsurf Workflow系统对齐
5. **运行时管理** - 支持多环境切换
6. **记忆管理** - 支持学习功能

### 低优先级（长期规划）

7. **后置学习** - 高级功能
8. **插件系统** - 生态扩展
9. **交互式模式** - 用户体验优化
10. **导出增强** - 功能扩展

---

## 总结

通过以上优化，Open Design CLI将从单纯的文档处理工具升级为完整的RAMS框架命令行接口，支持：

- ✅ 角色执行和技能调用
- ✅ Workflow系统集成
- ✅ 运行时环境管理
- ✅ 记忆和学习管理
- ✅ 统一配置管理
- ✅ 插件系统扩展
- ✅ 交互式操作
- ✅ 丰富的导出格式

这将使得CLI工具成为RAMS框架在命令行环境中的完整运行时，支持CI/CD自动化、批量处理、远程执行等场景。
