# RAMS Game - 游戏开发AI角色系统

RAMS Game 是基于 RAMS（Role-Actor Marketplace System）框架的游戏开发专用AI角色系统，为游戏开发的全流程提供AI辅助支持。

## 🎯 什么是 RAMS Game

RAMS Game 是一套专为游戏开发设计的AI角色系统，通过角色（Role）、技能（Skill）、灵魂（Soul）的组合，为游戏开发的各个阶段提供智能化的辅助工具。

### 核心理念

- **角色驱动**：每个AI角色都有明确的职责和技能
- **技能组合**：通过不同技能的组合实现复杂任务
- **版本管理**：内置Git-like版本控制系统，记录所有执行历史
- **灵活配置**：支持多种后端存储（文件系统、libsql数据库）

## 🚀 核心特性

### 1. 完整的游戏开发流程支持

RAMS Game 覆盖游戏开发的各个阶段：

| 阶段 | 支持的AI角色 | 主要功能 |
|------|------------|---------|
| **游戏策划** | 游戏策划师 | 游戏机制设计、玩法设计、关卡设计 |
| **技术设计** | 技术设计师 | 架构设计、API设计、技术方案 |
| **美术设计** | 美术设计师 | 角色设计、场景设计、UI设计 |
| **生产管理** | 生产经理 | 项目规划、进度跟踪、资源分配 |

### 2. Git-like版本控制系统

RAMS Game 内置完整的版本控制系统，支持：

- **提交记录**：记录每次skill执行的输入输出
- **分支管理**：创建、切换、删除分支，支持并行探索
- **标签管理**：为重要版本打标签，快速定位
- **暂存功能**：保存当前工作状态，临时切换任务
- **撤销/重做**：快速回退或恢复操作
- **合并/变基**：整合不同分支的工作成果

### 3. 多后端存储支持

- **文件系统后端**：基于YAML文件存储，适合小规模项目
- **libsql后端**：基于SQLite数据库存储，适合大规模项目

### 4. 灵活的模型实现

每个skill支持多种模型实现：

- **角色概念设计**：DALL-E 3、Midjourney、Stable Diffusion XL
- **3D建模**：Blender Auto、Maya Auto、3ds Max Auto
- **纹理生成**：Stable Diffusion、专业纹理软件、AI纹理生成器
- **光照渲染**：Unreal Engine、Unity、Blender Cycles
- **后期处理**：AI增强、传统后期处理、混合方案

## 📖 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/wanghaisheng/open-design.git
cd open-design

# 安装依赖
cd packages/open-design-cli
bun install
```

### 基本使用

```bash
# 查看可用的游戏开发角色
open-design role list

# 实例化一个游戏策划师角色
open-design role instantiate --role game-designer --instance my-game-designer

# 执行游戏设计skill
open-design skill execute --instance my-game-designer --skill game-mechanics-design

# 查看执行历史
open-design execution log --instance my-game-designer

# 撤销最近的操作
open-design execution undo --instance my-game-designer
```

## 🎮 主要功能

### 1. 角色管理

```bash
# 列出所有可用角色
open-design role list

# 实例化角色
open-design role instantiate --role <role-name> --instance <instance-name>

# 查看角色实例
open-design role instance list
```

### 2. Skill执行

```bash
# 执行skill
open-design skill execute --instance <instance-name> --skill <skill-name>

# 查看skill列表
open-design skill list --instance <instance-name>
```

### 3. 版本控制

```bash
# 查看执行历史
open-design execution log --instance <instance-name>

# 撤销操作
open-design execution undo --instance <instance-name> --steps 1

# 重做操作
open-design execution redo --instance <instance-name> --steps 1

# 切换到指定版本
open-design execution checkout --instance <instance-name> --commit <commit-id>
```

### 4. 分支管理

```bash
# 创建分支
open-design execution branch create --instance <instance-name> --name <branch-name>

# 切换分支
open-design execution branch switch --instance <instance-name> --name <branch-name>

# 查看分支
open-design execution branch list --instance <instance-name>

# 删除分支
open-design execution branch delete --instance <instance-name> --name <branch-name>
```

### 5. 标签管理

```bash
# 创建标签
open-design execution tag create --instance <instance-name> --name <tag-name>

# 查看标签
open-design execution tag list --instance <instance-name>

# 删除标签
open-design execution tag delete --instance <instance-name> --name <tag-name>
```

### 6. 暂存管理

```bash
# 保存当前工作状态
open-design execution stash save --instance <instance-name>

# 查看暂存
open-design execution stash list --instance <instance-name>

# 恢复暂存
open-design execution stash apply --instance <instance-name> --index <index>

# 删除暂存
open-design execution stash drop --instance <instance-name> --index <index>
```

## 📚 文档

### 核心文档

- [RAMS框架说明](../RAMS_FRAMEWORK/RAMS_FRAMEWORK.md) - RAMS框架的完整说明
- [游戏开发指南](../RAMS_FRAMEWORK/RAMS_GAME_DEVELOPMENT_GUIDE.md) - 游戏开发流程详细指南
- [版本控制功能矩阵](../RAMS_FRAMEWORK/VERSION_CONTROL_FEATURE_MATRIX.md) - 版本控制功能详细说明
- [角色实例化指南](../RAMS_FRAMEWORK/ROLE_INSTANTIATION_GUIDE.md) - 如何实例化和使用角色

### 技术文档

- [SQLITE版本控制设计](../RAMS_FRAMEWORK/SQLITE_VERSION_CONTROL_DESIGN.md) - libsql后端设计文档
- [Skill实现指南](../RAMS_FRAMEWORK/SKILL_IMPLEMENTATION.md) - 如何实现新的skill
- [Skill执行器实现指南](../RAMS_FRAMEWORK/SKILL_EXECUTOR_IMPLEMENTATION_GUIDE.md) - skill执行器实现细节

### 规范文档

- [SOUL规范](../RAMS_FRAMEWORK/SOUL_SPECIFICATION.md) - SOUL.md文件规范
- [ROLE规范](../RAMS_FRAMEWORK/ROLE_SPECIFICATION.md) - ROLE.md文件规范
- [SKILL规范](../RAMS_FRAMEWORK/SKILL_SPECIFICATION.md) - SKILL.md文件规范

## 🎯 使用场景

### 场景1：角色资产生产

使用RAMS Game生产游戏角色资产，涉及多个skill和模型实现：

```bash
# 1. 创建角色艺术家实例
open-design role instantiate --role character-artist --instance my-character-artist

# 2. 创建概念设计分支
open-design execution branch create --instance my-character-artist --name concept-dalle

# 3. 执行概念设计skill
open-design skill execute --instance my-character-artist --skill character-concept-dalle3

# 4. 创建建模分支
open-design execution branch create --instance my-character-artist --name modeling-blender

# 5. 执行建模skill
open-design skill execute --instance my-character-artist --skill character-modeling-blender

# 6. 合并分支
open-design execution merge --instance my-character-artist --source modeling-blender --target concept-dalle

# 7. 标记最终版本
open-design execution tag create --instance my-character-artist --name v1.0-character-final
```

### 场景2：游戏机制设计

```bash
# 1. 创建游戏策划师实例
open-design role instantiate --role game-designer --instance my-game-designer

# 2. 创建战斗系统分支
open-design execution branch create --instance my-game-designer --name combat-system

# 3. 执行战斗系统设计skill
open-design skill execute --instance my-game-designer --skill combat-system-design

# 4. 如果不满意，撤销
open-design execution undo --instance my-game-designer --steps 1

# 5. 尝试不同的设计参数
open-design skill execute --instance my-game-designer --skill combat-system-design

# 6. 满意后打标签
open-design execution tag create --instance my-game-designer --name v1.0-combat-system
```

## 🔧 配置

### 后端选择

RAMS Game支持两种后端存储：

```bash
# 使用文件系统后端（默认）
open-design skill execute --instance <instance-name> --skill <skill-name> --backend filesystem

# 使用libsql后端
open-design skill execute --instance <instance-name> --skill <skill-name> --backend libsql
```

### libsql配置

```bash
# 使用本地SQLite数据库
open-design skill execute --instance <instance-name> --skill <skill-name> --backend libsql --db-path ./execution_history.db

# 使用远程libsql数据库
open-design skill execute --instance <instance-name> --skill <skill-name> --backend libsql --db-url libsql://your-database-url
```

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](../INDEX.md)。

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](../../LICENSE) 文件

## 🙏 致谢

本项目受到以下项目的启发：

- **[Google DESIGN.md](https://github.com/google/design.md)** - 设计系统规范的单一事实来源概念和 YAML front matter 格式
- **[Owl-Listener/ai-design-skills](https://github.com/Owl-Listener/ai-design-skills)** - AI 辅助设计工具链的设计理念和实现方式

---

*最后更新：2026-04-25*
