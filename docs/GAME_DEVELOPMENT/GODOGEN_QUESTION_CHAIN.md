# Godogen框架游戏开发问题链

基于问题链教学法的Godogen框架游戏开发学习材料，涵盖初学者、中级开发者和高级架构师三个层次，帮助深入理解Godogen的设计理念、核心机制和潜在设计漏洞。

**文档版本：** 1.0  
**创建时间：** 2026-04-26  
**适用范围：** Godogen框架游戏开发应用

---

## 使用指南

### 问题类型说明
- **理论问题**：测试对概念、原理、设计思想的理解
- **实践问题**：测试在实际场景中的应用能力
- **批判性问题**：测试对设计缺陷、潜在问题的识别和分析能力

### 难度等级说明
- **初学者**：适合刚接触Godogen框架的学习者
- **中级**：有一定游戏开发和AI应用经验的学习者
- **高级**：适合架构师和深度研究者

### 学习路径建议
- **初学者路径**：Q1-Q8 → Q9-Q12 → Q17-Q20
- **中级路径**：Q1-Q8 → Q9-Q20 → Q21-Q24
- **高级路径**：全部问题，重点关注Q25-Q32

---

## 第一层：初学者级（基础概念理解）

### 模块1：Godogen框架基础

### Q1: Godogen的核心思想是什么？与传统AI游戏生成方式有何本质区别？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 视觉验证优先、单上下文架构、文档协议

**问题**:
Godogen提出"从一句话到可玩游戏"的愿景，通过AI管道完成架构设计、资产生成、代码编写、视觉验证。这与传统的"AI代码生成"方式有何本质区别？这种转变解决了什么核心问题？

**提示**:
思考传统AI编码工具只生成文本代码，而Godogen生成完整可运行项目并验证视觉效果的区别。

**参考答案**:
传统AI游戏生成方式：
1. 只生成代码文本，不验证运行效果
2. 缺乏视觉一致性保证，资产风格可能不统一
3. 无法捕获空间性bug（z-fighting、位置错误、物理问题）
4. 依赖人工调试，需要大量试错
5. 上下文窗口限制，无法处理大型项目

Godogen的核心思想：
1. **视觉验证闭环**：捕获实际游戏截图，用视觉AI验证正确性
2. **单上下文架构**：在1M token窗口内运行完整管道，渐进式加载指令
3. **文档协议通信**：通过结构化文档（PLAN.md、STRUCTURE.md等）传递状态
4. **风险优先分解**：只隔离真正困难的任务（程序化生成、复杂物理），其余批量实现
5. **预算感知资产生成**：双后端（Gemini精确、Grok便宜）优化成本

核心转变：从"生成代码"转变为"交付可验证的游戏"，像人类QA测试员一样检查屏幕。

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - Godogen整体架构
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 管道概览

---

### Q2: 什么是视觉目标、分解、架构、资产生成、任务执行、视觉QA？它们之间的关系是什么？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 管道阶段、阶段依赖、输入输出

**问题**:
Godogen的管道包含多个阶段：视觉目标、分解、架构、资产生成、任务执行、视觉QA。每个阶段的输入输出是什么？它们之间如何协作？

**提示**:
从"一句话"开始，思考每个阶段如何将前一个阶段的输出作为自己的输入。

**参考答案**:
**阶段关系与输入输出**：

1. **视觉目标** (visual-target.md)
   - 输入：游戏描述文本
   - 输出：reference.png（参考截图）+ ASSETS.md（艺术方向）
   - 作用：定义视觉北星，锚定所有后续决策

2. **分解** (decomposer.md)
   - 输入：reference.png + 游戏描述
   - 输出：PLAN.md（风险任务、主构建、验证标准）
   - 作用：识别技术风险，定义验证标准

3. **架构** (scaffold.md)
   - 输入：reference.png + PLAN.md
   - 输出：STRUCTURE.md + project.godot + .csproj + 脚本存根
   - 作用：设计技术架构，生成可编译项目骨架

4. **资产生成** (asset-planner.md + asset-gen.md)
   - 输入：STRUCTURE.md（资产提示）+ PLAN.md（资产需求）+ 预算
   - 输出：ASSETS.md（资产清单）+ 实际资产文件
   - 作用：在预算内生成视觉资产

5. **任务执行** (task-execution.md)
   - 输入：PLAN.md + STRUCTURE.md + ASSETS.md
   - 输出：完整场景、脚本、测试线束
   - 作用：实现游戏逻辑，先风险任务后主构建

6. **视觉QA** (visual-qa.md)
   - 输入：reference.png + 游戏截图
   - 输出：QA报告（pass/fail/warning）
   - 作用：验证视觉效果，捕获空间性bug

**协作关系**：
- 每个阶段读取前序阶段的文档输出
- 文档作为状态载体，支持管道恢复
- 视觉QA在任务执行后运行，形成验证闭环

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 管道流程
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 阶段表格

---

### Q3: 为什么需要将场景构建器和运行时脚本分离？这种设计带来了什么好处？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 场景构建器、运行时脚本、构建时vs运行时

**问题**:
Godogen生成两种C#代码：场景构建器（SceneBuilder）和运行时脚本。为什么需要这种分离？如果混在一起会导致什么问题？

**提示**:
思考"构建时"和"运行时"的区别，以及Godot引擎的序列化机制。

**参考答案**:
**场景构建器**：
- 运行环境：Godot headless模式（`godot --headless --script`）
- 执行时机：构建时，运行一次生成.tscn文件
- 功能：构建节点层次，设置属性，序列化场景
- 限制：不能使用信号连接、空间方法（LookAt）、运行时特性
- 关键问题：必须正确设置Owner链，否则节点不会保存

**运行时脚本**：
- 运行环境：游戏运行时
- 执行时机：游戏运行中，每帧调用
- 功能：游戏逻辑、输入处理、物理、动画
- 特性：使用完整Godot生命周期（_Ready、_Process、_PhysicsProcess）

**分离的好处**：
1. **避免序列化问题**：构建时代码不序列化到.tscn，保持文件简洁
2. **正确的时机**：信号连接在_Ready中（脚本存在时），不在构建时
3. **清晰的职责**：构建器负责结构，脚本负责行为
4. **可维护性**：修改逻辑不需要重新构建场景

**混在一起的问题**：
- 信号在构建时连接，但脚本还不存在 → 连接失败
- 空间方法在构建时调用，但节点不在场景树 → 崩溃
- 运行时逻辑序列化到.tscn → 文件膨胀，难以维护

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 两种代码类型
- [scene-generation.md](../../../godogen/claude/skills/godogen/scene-generation.md) - 场景构建器详解

---

### Q4: 文档协议（PLAN.md、STRUCTURE.md、ASSETS.md、MEMORY.md）的作用是什么？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 文档协议、状态持久化、管道恢复

**问题**:
Godogen使用文档协议进行阶段间通信，而不是消息传递。为什么需要这种设计？每个文档存储什么信息？

**提示**:
思考上下文窗口压缩时，如何保持管道状态不丢失。

**参考答案**:
**文档协议的作用**：
1. **状态持久化**：在上下文压缩后仍可恢复管道状态
2. **阶段解耦**：每个阶段独立，通过文档通信
3. **可检查性**：用户可阅读文档了解项目状态
4. **可调试性**：编辑文档后重新运行阶段

**各文档内容**：

**PLAN.md**（分解阶段输出）：
- 游戏描述
- 风险任务（需要隔离的困难功能）
- 主构建（批量实现的常规功能）
- 每个任务的验证标准（Verify字段）
- 任务状态跟踪

**STRUCTURE.md**（架构阶段输出）：
- 维度（2D/3D）
- 输入动作映射
- 场景列表（文件、根类型、子节点）
- 脚本列表（文件、基类、信号）
- 信号映射
- 资产提示（架构需要的视觉资产）
- 构建顺序（场景依赖关系）

**ASSETS.md**（资产生成阶段输出）：
- 艺术方向（风格描述）
- 3D模型清单（名称、描述、尺寸、图片路径、GLB路径）
- 纹理清单（名称、描述、平铺尺寸、图片路径）
- 背景清单（名称、描述、显示尺寸、图片路径）
- 精灵清单（名称、描述、显示尺寸、图片路径）
- 动画精灵清单（参考、动作表、帧目录）

**MEMORY.md**（任务执行期间更新）：
- 发现的workaround和quirks
- 有效的解决方案
- 失败的尝试（避免重复）
- Godot引擎特定行为

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 文档协议
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 上下文卫生

---

### 模块2：游戏开发基础

### Q5: Godogen如何将游戏开发分为多个阶段？为什么这样划分？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 管道阶段、阶段依赖、风险管理

**问题**:
Godogen的管道包含7个主要阶段。为什么需要这样划分？能否跳过某些阶段？每个阶段的关键决策是什么？

**提示**:
思考游戏开发中的风险管理和资源投入策略。

**参考答案**:
**7个阶段及关键决策**：

1. **视觉目标** → 生成reference.png
   - 关键决策：视觉风格、相机角度、环境结构
   - 能否跳过：不能，这是所有后续决策的锚点

2. **分解** → 生成PLAN.md
   - 关键决策：哪些功能需要风险隔离
   - 能否跳过：不能，没有计划无法执行

3. **架构** → 生成STRUCTURE.md + 项目骨架
   - 关键决策：场景层次、脚本职责、信号流
   - 能否跳过：不能，没有架构无法实现

4. **资产生成** → 生成ASSETS.md + 资产文件
   - 关键决策：预算分配、后端选择（Gemini vs Grok）
   - 能否跳过：可以，如果用户不提供预算

5. **任务执行** → 实现游戏逻辑
   - 关键决策：风险任务隔离、主构建批量实现
   - 能否跳过：不能，这是核心实现

6. **视觉QA** → 验证视觉效果
   - 关键决策：静态vs动态模式、后端选择
   - 能否跳过：可以，但强烈不推荐

7. **最终交付** → 演示视频
   - 关键决策：相机运动、剪辑节奏
   - 能否跳过：可以，但影响用户体验

**划分原因**：
1. **风险管理**：每阶段有明确输入输出，易于定位问题
2. **资源优化**：资产生成可预算控制，避免超支
3. **可恢复性**：任何阶段失败后可从文档恢复
4. **质量保证**：视觉QA捕获空间性bug
5. **渐进式复杂度**：从简单到复杂，逐步深入

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 管道流程
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 管道表格

---

### Q6: 风险任务和主构建的区别是什么？为什么需要风险隔离？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 风险任务、主构建、风险隔离

**问题**:
Godogen的分解器将任务分为"风险任务"和"主构建"。什么是风险任务？为什么需要隔离？哪些功能属于风险任务？

**提示**:
思考哪些游戏功能容易失败且难以调试。

**参考答案**:
**风险任务**：
失败不可预测、错误模糊、需要单独验证的功能：
- 程序化生成（地形、关卡、网格）
- 程序化动画（IK、ragdoll、骨骼操作）
- 精灵/角色动画（多方向移动、状态转换）
- 复杂载具物理（轮子碰撞、悬挂、漂移）
- 自定义着色器（水面、传送门、屏幕空间效果）
- 运行时几何（可破坏环境、CSG操作、网格变形）
- 动态导航（路径规划适应障碍、人群模拟）
- 复杂相机系统（第三人称碰撞避免、电影轨道、分屏）

**主构建**：
Godot处理良好的常规功能，批量实现：
- 基础移动、输入处理
- UI/HUD、菜单
- 简单物理（碰撞、重力）
- 基础AI（简单巡逻、追踪）
- 音频播放
- 粒子效果

**风险隔离的原因**：
1. **失败模式不同**：风险任务失败原因复杂，需要单独调试
2. **验证标准不同**：需要特定的验证方法（动态检查）
3. **避免污染**：风险任务的bug不影响主构建
4. **资源优化**：风险任务可能需要多次迭代，隔离可节省资源
5. **明确边界**：每个任务边界是集成风险，越少越好

**相关文档**:
- [decomposer.md](../../../godogen/claude/skills/godogen/decomposer.md) - 风险分类
- [PROJECT.md](../../../godogen/PROJECT.md) - 风险优先分解

---

### Q7: Godogen的管道流程是怎样的？每个阶段的输入输出是什么？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 管道流程、输入输出、阶段依赖

**问题**:
给定一个游戏描述"一个3D滑雪游戏，包含程序化地形和技巧系统"，请描述Godogen管道的完整流程，包括每个阶段的输入输出。

**提示**:
从用户的一句话开始，追踪到最终可玩游戏的完整路径。

**参考答案**:
**完整管道流程**：

**输入**：用户描述"一个3D滑雪游戏，包含程序化地形和技巧系统"

**阶段1：视觉目标**
- 输入：游戏描述
- 输出：reference.png（雪山滑雪场景参考图）+ ASSETS.md（艺术方向：写实雪景、动态相机）
- 决策：相机角度（第三人称跟随）、环境（雪山、松树）、角色（滑雪者）

**阶段2：分解**
- 输入：reference.png + 游戏描述
- 输出：PLAN.md
  - 风险任务：程序化地形生成（算法复杂）、技巧系统（物理复杂）
  - 主构建：滑雪者移动、相机跟随、UI、音效
  - 验证标准：地形连续性、技巧判定准确性

**阶段3：架构**
- 输入：reference.png + PLAN.md
- 输出：STRUCTURE.md + project.godot + .csproj + 脚本存根
  - 场景：main.tscn（世界）、player.tscn（滑雪者）、terrain.tscn（地形）
  - 脚本：PlayerController.cs、TerrainGenerator.cs、TrickSystem.cs
  - 信号：Player.Landed、TrickScored

**阶段4：资产生成**（如果提供预算）
- 输入：STRUCTURE.md + PLAN.md + 预算
- 输出：ASSETS.md + 资产文件
  - 3D模型：滑雪者GLB、松树GLB
  - 纹理：雪地纹理、岩石纹理
  - 背景：雪山全景

**阶段5：任务执行**
- 输入：PLAN.md + STRUCTURE.md + ASSETS.md
- 输出：完整场景、脚本、测试线束
  - 风险任务1：实现TerrainGenerator.cs，验证地形连续性
  - 风险任务2：实现TrickSystem.cs，验证技巧判定
  - 主构建：实现PlayerController.cs、相机、UI、音效
  - 每个任务后运行视觉QA

**阶段6：视觉QA**
- 输入：reference.png + 游戏截图
- 输出：QA报告
  - 检查：地形无裂缝、滑雪者移动自然、技巧判定准确
  - 模式：动态（检查运动和物理）

**阶段7：最终交付**
- 输入：完整游戏
- 输出：演示视频（~30秒滑雪技巧展示）

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 管道流程
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 管道表格

---

### Q8: 在概念验证阶段，哪些技能是核心技能？为什么？

**问题类型**: 理论  
**难度等级**: 初学者  
**相关概念**: 核心技能、渐进式加载、技能依赖

**问题**:
Godogen的SKILL.md列出了多个子文件（visual-target.md、decomposer.md、scaffold.md等）。哪些是核心技能，必须在每个项目中使用？哪些是可选的？

**提示**:
思考哪些技能是管道必须的，哪些是特定场景需要的。

**参考答案**:
**核心技能**（必须使用）：

1. **visual-target.md** - 生成参考图像
   - 原因：视觉锚点，所有后续决策依赖它
   - 时机：管道开始

2. **decomposer.md** - 风险分析和任务规划
   - 原因：没有计划无法执行
   - 时机：视觉目标后

3. **scaffold.md** - 架构设计和项目骨架
   - 原因：没有架构无法实现
   - 时机：分解后

4. **task-execution.md** - 任务执行工作流
   - 原因：核心实现逻辑
   - 时机：架构后

5. **quirks.md** - Godot引擎quirks
   - 原因：避免常见陷阱
   - 时机：写代码前

6. **scene-generation.md** - 场景构建器模式
   - 原因：生成.tscn文件必需
   - 时机：生成场景时

**条件性技能**（按需使用）：

7. **asset-planner.md** - 资产规划
   - 条件：用户提供了预算
   - 时机：架构后

8. **asset-gen.md** - 资产生成CLI
   - 条件：实际生成资产时
   - 时机：资产生成阶段

9. **rembg.md** - 背景移除
   - 条件：资产需要透明背景
   - 时机：生成精灵时

10. **visual-qa.md** - 视觉QA
    - 条件：验证视觉效果
    - 时机：任务执行后

11. **capture.md** - 截图/视频捕获
    - 条件：需要验证或演示
    - 时机：任务执行后

12. **test-harness.md** - 测试线束
    - 条件：需要自动化测试
    - 时机：验证阶段

13. **android-build.md** - Android构建
    - 条件：用户请求Android APK
    - 时机：游戏完成后

**相关文档**:
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 技能表格

---

## 第二层：中级开发者（实践应用与机制理解）

### 模块3：Skill实现机制

### Q9: Godogen的渐进式加载设计原则是什么？为什么需要这种设计？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: 渐进式加载、上下文窗口、单上下文架构

**问题**:
Godogen采用"单上下文架构"，在1M token窗口内运行完整管道，但采用渐进式加载指令。什么是渐进式加载？为什么不是一次性加载所有指令？

**提示**:
思考上下文窗口的限制和管道各阶段的独立性。

**参考答案**:
**渐进式加载设计**：
- 编排器只在到达某个阶段时才读取该阶段的指令文件
- 例如：只在开始资产生成时读取asset-gen.md
- 未到达阶段的指令不占用上下文

**为什么需要渐进式加载**：
1. **上下文窗口优化**：1M token虽大，但完整管道指令可能超过
2. **聚焦当前任务**：只加载当前阶段需要的知识，减少干扰
3. **内存效率**：避免加载不相关的大型文档（如850+类API文档）
4. **灵活性**：不同项目可能跳过某些阶段（如无资产生成）

**单上下文架构的优势**：
1. **完整上下文**：执行器有权限访问规划阶段的所有决策
2. **无需重载**：不需要从文档重新加载上下文
3. **连贯性**：同一上下文下的决策更一致
4. **简化调试**：所有交互在同一对话中

**对比多智能体架构**：
- 多智能体：每个阶段独立上下文，需要文档传递状态
- 单上下文：阶段共享上下文，文档用于持久化和恢复

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 单上下文架构
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 渐进式加载

---

### Q10: Godot API Lookup技能的作用是什么？如何避免加载大型API文档？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: Godot API Lookup、forked context、API文档

**问题**:
Godot有850+个类，API文档很大。Godogen如何处理API查询？为什么需要单独的godot-api技能？

**提示**:
思考将大型文档加载到主上下文的影响。

**参考答案**:
**Godot API Lookup技能的作用**：
- 在forked context中运行，避免加载大型API文档到主上下文
- 使用Sonnet模型和Explore agent
- 提供C# Godot语法参考（csharp.md）
- 850+类API文档从Godot XML源转换而来

**如何避免加载大型文档**：
1. **Forked context**：API查询在独立上下文中运行
2. **索引优化**：小索引（_common.md，~128常见类）+ 大索引（_other.md，其余）
3. **按需加载**：只加载查询的特定类文档
4. **目标查询**：鼓励具体查询而非全API

**查询策略**：
- **目标查询**（推荐）：询问特定方法/信号
  - "CharacterBody3D: what method applies velocity and slides along collisions?"
  - 返回：简洁答案
- **全API查询**（谨慎）：需要完整类API时
  - "full API for AnimationPlayer"
  - 返回：完整API（较大）

**为什么需要单独技能**：
1. **上下文卫生**：主上下文专注于管道执行
2. **性能优化**：避免每次API查询都加载850+类
3. **专业化**：API查询需要不同的模型和工具
4. **可扩展性**：未来可支持更多引擎（如Bevy）

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - API参考
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - Godot API Lookup

---

### Q11: 视觉QA的三种模式（静态、动态、问题）分别适用于什么场景？

**问题类型**: 实践  
**难度等级**: 中级  
**相关概念**: 视觉QA模式、静态vs动态、问题模式

**问题**:
视觉QA支持静态模式、动态模式和问题模式。给定以下任务，应该使用哪种模式？为什么？
1. 验证地形贴图是否正确
2. 验证角色动画是否流畅
3. 调试角色穿墙问题
4. 验证UI布局是否正确

**提示**:
思考哪些场景需要检查运动，哪些只需要静态检查。

**参考答案**:
**模式选择**：

**1. 验证地形贴图 - 静态模式**
- 原因：地形是静态的，不需要检查运动
- 输入：reference.png + 一张代表性截图
- 选择标准：无 meaningful motion

**2. 验证角色动画 - 动态模式**
- 原因：动画是动态的，需要检查流畅性和过渡
- 输入：reference.png + 帧序列（2 FPS cadence）
- 选择标准：任务提到"smooth"、"transition"、"handoff"、"blend"

**3. 调试角色穿墙 - 问题模式**
- 原因：调试特定问题，不需要参考图像
- 输入：问题 + 截图序列
- 示例："角色是否穿墙？截图frame0001.png frame0005.png frame0010.png"

**4. 验证UI布局 - 静态模式**
- 原因：UI是静态的，不需要检查运动
- 输入：reference.png + 一张代表性截图
- 选择标准：无 meaningful motion

**模式选择规则**：
- **静态模式**：装饰、地形、UI/HUD、标题 - 无运动契约
- **动态模式**：运动、动画、物理 - 需要检查时序、冻结姿态、弹跳
- **问题模式**：调试、调查 - 自由提问，无需参考

**动态模式的帧选择**：
- 捕获时：--fixed-fps 10
- 选择：每N帧，N = capture_fps / 2 = 5
- 示例：30秒@10fps = 300帧 → 60帧 + 1参考 = 61图像

**相关文档**:
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 模式选择
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 动画调试

---

### Q12: 给定一个具体的游戏开发任务（如"实现角色移动"），如何设计其执行流程？

**问题类型**: 实践  
**难度等级**: 中级  
**相关概念**: 任务执行流程、实现循环、验证

**问题**:
设计"实现2D平台跳跃角色移动"任务的完整执行流程，包括场景生成、脚本编写、编译、验证、视觉QA。

**提示**:
参考task-execution.md的实现循环。

**参考答案**:
**完整执行流程**：

**步骤1：规划**
- 使用Plan子agent生成实现策略
- 输入：PLAN.md中的任务描述 + 验证标准
- 输出：具体实现方法（使用CharacterBody2D、输入映射、跳跃逻辑）

**步骤2：实现循环**

**循环1：初始实现**
1. **导入资产**：`timeout 60 godot --headless --import`
2. **生成场景**：
   - 编写scenes/BuildPlayer.cs
   - 设置CharacterBody2D、CollisionShape2D、Sprite2D
   - 设置Owner链
3. **生成脚本**：
   - 编写scripts/PlayerController.cs
   - 实现_MoveAndSlide()、跳跃逻辑
4. **编译**：`timeout 60 dotnet build 2>&1`
5. **验证**：`timeout 60 godot --headless --quit 2>&1`
6. **捕获**：
   - 编写test/TestPlayerMovement.cs
   - 运行`godot --headless --script test/TestPlayerMovement.cs --write-movie`
7. **验证**：检查截图，角色是否移动、跳跃
8. **视觉QA**：
   - 静态模式：检查角色位置
   - 动态模式：检查跳跃流畅性（2 FPS帧序列）

**循环2：修复（如果验证失败）**
- 假设：角色跳跃高度不够
- 修复：调整JumpVelocity参数
- 重复步骤2-8

**循环3：再修复（如果仍有问题）**
- 假设：角色落地时卡住
- 修复：检查碰撞形状，调整CollisionShape2D
- 重复步骤2-8

**步骤3：完成**
- 更新PLAN.md状态
- 写入MEMORY.md（发现的quirks）
- Git commit

**关键点**：
- 每次修改后重新编译和验证
- 使用视觉QA捕获空间性bug
- 动态模式检查运动流畅性
- 最多3次修复循环，否则重新规划

**相关文档**:
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 实现循环
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 模式选择

---

### 模块4：协作与编排

### Q13: 编排器如何实现任务驱动的多阶段协作？文档协议如何支持恢复？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: 编排器、文档协议、管道恢复

**问题**:
如果管道在任务执行阶段崩溃，如何恢复？文档协议如何确保状态不丢失？

**提示**:
思考上下文压缩或崩溃后，如何从文档恢复管道状态。

**参考答案**:
**管道恢复机制**：

**恢复检查**（管道开始时）：
```python
if PLAN.md exists:
    read PLAN.md, STRUCTURE.md, MEMORY.md
    skip to task execution
else:
    continue with fresh pipeline
```

**文档作为状态载体**：
- **PLAN.md**：任务状态（pending/in_progress/completed）
- **STRUCTURE.md**：架构蓝图（不变，除非重新架构）
- **MEMORY.md**：发现的quirks和workarounds
- **ASSETS.md**：资产清单和路径

**恢复流程**：
1. 检查PLAN.md是否存在
2. 如果存在，读取所有文档
3. 识别当前阶段（从PLAN.md任务状态）
4. 从中断点继续执行
5. 跳过已完成的阶段

**上下文压缩处理**：
- 文档在压缩后仍可读取
- 压缩只影响对话历史，不影响文件系统
- 管道可从任何点恢复

**崩溃场景示例**：
- 场景1：上下文压缩，需要继续任务执行
  - 恢复：读取PLAN.md，继续未完成任务
- 场景2：资产生成阶段崩溃
  - 恢复：读取ASSETS.md，继续生成剩余资产
- 场景3：任务执行中崩溃
  - 恢复：读取PLAN.md，继续未完成任务

**文档更新时机**：
- 每个阶段完成后立即更新文档
- 每个任务完成后更新PLAN.md状态
- 发现quirk后立即写入MEMORY.md
- Git commit确保版本控制

**相关文档**:
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 上下文卫生
- [PROJECT.md](../../../godogen/PROJECT.md) - 文档协议

---

### Q14: 风险优先分解的设计思路是什么？为什么不是所有任务都隔离？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: 风险优先分解、任务边界、集成风险

**问题**:
为什么Godogen只隔离"真正困难"的任务，而不是将所有任务都拆分成小任务？这种设计基于什么经验？

**提示**:
思考任务边界带来的集成风险。

**参考答案**:
**风险优先分解的设计思路**：
- 只隔离失败不可预测、错误模糊的功能
- 其余功能批量实现，减少任务边界

**基于的经验**：
1. **任务边界是集成风险**
   - 每个边界需要验证
   - 边界越多，bug越多
   - 集成测试成本高

2. **Godot处理常规功能良好**
   - 基础移动、输入、UI、简单物理
   - 这些功能失败可预测、错误明确
   - 不需要单独隔离

3. **真正困难的功能需要隔离**
   - 程序化生成：算法复杂，失败模式多样
   - 复杂物理：物理引擎quirks多
   - 动画系统：时序问题难以调试

**反例：过度分解的问题**
- 将"移动"拆分为"输入处理"、"速度计算"、"碰撞检测"
- 每个边界需要验证
- 集成时可能发现边界不匹配
- 总成本高于批量实现

**风险任务的特征**：
- 失败不可预测
- 错误模糊
- 需要特定验证方法
- 调试成本高

**主构建的特征**：
- Godot处理良好
- 失败可预测
- 错误明确
- 可批量验证

**相关文档**:
- [decomposer.md](../../../godogen/claude/skills/godogen/decomposer.md) - 风险分类
- [PROJECT.md](../../../godogen/PROJECT.md) - 风险优先分解

---

### Q15: 场景构建器和运行时脚本的分离是如何实现的？具体代码示例？

**问题类型**: 实践  
**难度等级**: 中级  
**相关概念**: 场景构建器、运行时脚本、Owner链

**问题**:
编写一个场景构建器BuildPlayer.cs，生成包含CharacterBody2D、CollisionShape2D、Sprite2D的player.tscn场景，并附加PlayerController.cs脚本。

**提示**:
参考scene-generation.md的模板和Owner链设置。

**参考答案**:
**scenes/BuildPlayer.cs**：
```csharp
using Godot;

public partial class BuildPlayer : SceneBuilderBase
{
    public override void _Initialize()
    {
        GD.Print("Generating: player");

        var temp = new Node();
        var root = new CharacterBody2D();
        root.Name = "Player";
        temp.AddChild(root);

        // CollisionShape2D
        var collision = new CollisionShape2D();
        var shape = new RectangleShape2D();
        shape.Size = new Vector2(32, 32);
        collision.Shape = shape;
        root.AddChild(collision);

        // Sprite2D
        var sprite = new Sprite2D();
        sprite.Texture = GD.Load<Texture2D>("res://assets/img/player.png");
        root.AddChild(sprite);

        // Set script LAST (SetScript disposes C# wrapper)
        root.SetScript(GD.Load<Script>("res://scripts/PlayerController.cs"));

        // Re-obtain root (old wrapper is disposed)
        var rootNode = temp.GetChild(0);
        temp.RemoveChild(rootNode);
        temp.Free();

        PackAndSave(rootNode, "res://scenes/player.tscn");
    }
}
```

**scripts/PlayerController.cs**：
```csharp
using Godot;

public partial class PlayerController : CharacterBody2D
{
    [Export] public float Speed = 200.0f;
    [Export] public float JumpVelocity = -400.0f;

    public override void _Ready()
    {
        // Signal connections here
    }

    public override void _PhysicsProcess(double delta)
    {
        Vector2 velocity = Velocity;

        // Add the gravity.
        if (!IsOnFloor())
            velocity.Y += (float)GetGravity().Y * (float)delta;

        // Handle Jump.
        if (Input.IsActionJustPressed("ui_accept") && IsOnFloor())
            velocity.Y = JumpVelocity;

        // Get the input direction and handle the movement/deceleration.
        Vector2 direction = Input.GetVector("ui_left", "ui_right", "ui_up", "ui_down");
        if (direction != Vector2.Zero)
        {
            velocity.X = direction.X * Speed;
        }
        else
        {
            velocity.X = Mathf.MoveToward(Velocity.X, 0, Speed);
        }

        Velocity = velocity;
        MoveAndSlide();
    }
}
```

**关键点**：
1. **SetScript最后调用**：因为会dispose C# wrapper
2. **使用temp parent**：重新获取root引用
3. **Owner链**：SceneBuilderBase.SetOwnerOnNewNodes()自动设置
4. **运行时脚本**：在_Ready中连接信号，不在构建时

**相关文档**:
- [scene-generation.md](../../../godogen/claude/skills/godogen/scene-generation.md) - 场景模板
- [scaffold.md](../../../godogen/claude/skills/godogen/scaffold.md) - 脚本存根

---

### Q16: 在主构建阶段，如何协调多个任务的执行？避免混乱的关键是什么？

**问题类型**: 实践  
**难度等级**: 中级  
**相关概念**: 主构建、任务协调、构建顺序

**问题**:
主构建阶段包含多个任务（移动、UI、音效、粒子等）。如何确保它们按正确顺序执行？避免混乱的关键机制是什么？

**提示**:
参考STRUCTURE.md的构建顺序。

**参考答案**:
**任务协调机制**：

**1. 构建顺序（STRUCTURE.md）**
```markdown
## Build Order
1. dotnet build
2. scenes/BuildPlayer.cs → scenes/player.tscn
3. scenes/BuildUI.cs → scenes/ui.tscn
4. scenes/BuildMain.cs → scenes/main.tscn (depends: player.tscn, ui.tscn)
```

**执行者遵循顺序**：
- 严格执行STRUCTURE.md中的顺序
- 不推断或重排依赖关系
- 叶场景（无依赖）先构建

**2. 场景依赖管理**
- 子场景先构建，父场景后构建
- 例如：player.tscn → main.tscn（main实例化player）
- 构建失败时，依赖任务标记为失败

**3. 批量实现策略**
- 所有场景一起生成
- 所有脚本一起编写
- 一次dotnet build编译所有
- 一次godot --headless --quit验证所有

**4. 验证标准**
- 每个任务有明确的Verify字段
- 主构建的Verify是交叉检查：
  - 移动方向匹配输入
  - 动画方向匹配移动
  - UI可读，无重叠
  - 无missing textures
  - reference.png一致性

**5. 避免混乱的关键**
- **标准化流程**：所有任务遵循相同的实现循环
- **明确顺序**：STRUCTURE.md指定构建顺序
- **文档驱动**：PLAN.md和STRUCTURE.md作为单一真相源
- **Git commit**：每个阶段完成后commit，可回滚
- **视觉QA**：每个任务后验证，及早发现问题

**示例流程**：
```bash
# 1. 编译所有脚本
dotnet build

# 2. 构建叶场景
godot --headless --script scenes/BuildPlayer.cs
godot --headless --script scenes/BuildUI.cs

# 3. 构建父场景
godot --headless --script scenes/BuildMain.cs

# 4. 验证
godot --headless --quit

# 5. 捕获和QA
godot --headless --script test/TestMain.cs --write-movie
Skill(skill="visual-qa") "Check reference.png against screenshots/main/frame*.png"
```

**相关文档**:
- [scaffold.md](../../../godogen/claude/skills/godogen/scaffold.md) - 构建顺序
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 主构建流程

---

### 模块5：评估与进化

### Q17: 视觉验证闭环是如何工作的？它如何实现"代码验证"？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: 视觉验证闭环、代码验证、空间性bug

**问题**:
视觉验证闭环是Godogen的核心机制。请描述这个闭环的完整流程，并举例说明它如何捕获空间性bug。

**提示**:
思考传统代码验证无法发现的问题。

**参考答案**:
**视觉验证闭环流程**：
```
任务实现 → 编译 → 验证 → 捕获截图 → 视觉QA → 
  ↓ (pass)
完成
  ↓ (fail)
修复 → 重新捕获 → 重新QA → ...
```

**详细步骤**：

1. **任务实现**
   - 生成场景和脚本
   - 编译（dotnet build）
   - 验证（godot --headless --quit）

2. **捕获截图**
   - 编写测试线束
   - 运行`godot --headless --script test/TestXxx.cs --write-movie`
   - 生成截图序列

3. **视觉QA**
   - 静态模式：reference.png + 单帧
   - 动态模式：reference.png + 帧序列（2 FPS）
   - 问题模式：自由提问

4. **QA判断**
   - pass：继续
   - warning：可接受，继续
   - fail：修复

5. **修复循环**
   - 最多3次修复循环
   - 如果无进展，重新规划
   - 如果根本问题，升级到用户

**捕获空间性bug的例子**：

**Bug1：z-fighting**
- 代码验证：无错误，代码正确
- 视觉QA：检测到表面闪烁
- 原因：两个表面在同一深度
- 修复：偏移0.15m垂直距离

**Bug2：角色穿墙**
- 代码验证：无错误，碰撞形状正确
- 视觉QA：检测到角色穿过墙壁
- 原因：CollisionMask未包含墙壁层
- 修复：设置CollisionMask = 1 | 2 | 4

**Bug3：missing texture**
- 代码验证：无错误，路径正确
- 视觉QA：检测到magenta表面
- 原因：纹理未导入
- 修复：运行godot --headless --import

**为什么代码验证无法发现**：
- 空间性bug只在运行时出现
- 代码正确不等于视觉效果正确
- 物理引擎quirks无法从代码推断

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 视觉验证
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - QA模式

---

### Q18: MEMORY.md的作用是什么？如何实现知识积累？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: MEMORY.md、知识积累、quirks

**问题**:
MEMORY.md存储什么信息？如何从项目级quirks提升到框架级quirks？这种知识积累机制如何工作？

**提示**:
参考quirks.md的反馈循环。

**参考答案**:
**MEMORY.md的作用**：
- 项目级的quirks和workarounds
- 发现的Godot引擎特定行为
- 有效的解决方案
- 失败的尝试（避免重复）

**MEMORY.md内容示例**：
```markdown
# Memory

## CharacterBody2D MotionMode
- Floating模式不沿表面投影速度
- 解决：手动表面物理（法线投影、重力分解）

## ArrayMesh Shadows
- 必须调用GenerateNormals()才能接收阴影
- 否则阴影不出现，无错误无警告

## GLB MaterialOverride
- 设置在GLB内部节点不序列化
- 解决：使用程序化ArrayMesh
```

**知识积累机制**：

**项目级**（MEMORY.md）：
- 任务执行期间写入
- 项目特定quirks
- 可能只在当前项目有效

**框架级**（quirks.md）：
- 技能维护者定期审查
- 跨项目的重复模式
- 提升到框架级文档

**反馈循环**：
```
任务执行 → 发现quirk → 写入MEMORY.md → 
  ↓ (项目结束)
技能维护者审查 → 识别重复模式 → 提升到quirks.md
```

**提升标准**：
- 多个项目出现相同quirk
- 解决方案通用性强
- 属于Godot引擎行为而非项目特定

**例子**：
- 项目A发现：SetScript() disposes C# wrapper
- 项目B发现：SetScript() disposes C# wrapper
- 项目C发现：SetScript() disposes C# wrapper
- 维护者提升：添加到quirks.md

**为什么需要这种机制**：
- LLM无法从单个项目学习通用模式
- 需要人工审查和提升
- 框架级quirks对所有项目有益

**相关文档**:
- [quirks.md](../../../godogen/claude/skills/godogen/quirks.md) - 反馈循环
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 上下文卫生

---

### Q19: Godogen的上下文卫生策略是什么？如何处理上下文压缩？

**问题类型**: 理论  
**难度等级**: 中级  
**相关概念**: 上下文卫生、上下文压缩、文档协议

**问题**:
当1M token上下文接近限制时，Godogen如何处理？如何确保重要状态不丢失？

**提示**:
思考文档协议在上下文压缩中的作用。

**参考答案**:
**上下文卫生策略**：

**1. 重要状态存储在文件**
- PLAN.md：任务状态
- STRUCTURE.md：架构蓝图
- MEMORY.md：quirks和workarounds
- ASSETS.md：资产清单

**2. 文件在压缩后仍可读取**
- 压缩只影响对话历史
- 文件系统不受影响
- 管道可从任何点恢复

**3. 每个阶段完成后更新文档**
- 立即写入，不延迟
- Git commit确保版本控制
- 即使压缩，状态仍保留

**4. 调试循环的上下文管理**
- 如果上下文被调试循环污染
- 手动压缩：`/compact "Discard failed debugging attempts."`
- 然后从文档恢复状态

**上下文压缩场景**：

**场景1：正常压缩**
- 对话历史增长到接近1M
- 系统自动压缩早期消息
- 文档状态不受影响
- 管道继续执行

**场景2：调试循环污染**
- 多次失败尝试占用上下文
- 上下文充满错误信息
- 手动压缩清理
- 从文档恢复干净状态

**场景3：阶段间压缩**
- 完成视觉目标阶段
- 开始分解阶段前压缩
- 保留reference.png和ASSETS.md
- 清理早期对话

**最佳实践**：
- 每个阶段完成后考虑压缩
- 调试循环失败3次后压缩
- 总是从文档恢复状态
- 不要依赖对话历史

**为什么文档协议关键**：
- 对话历史不可靠（可能压缩）
- 文件系统可靠（持久化）
- 文档是单一真相源

**相关文档**:
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 上下文卫生
- [PROJECT.md](../../../godogen/PROJECT.md) - 文档协议

---

### Q20: 如何设计有效的视觉QA测试？需要考虑哪些因素？

**问题类型**: 实践  
**难度等级**: 中级  
**相关概念**: 视觉QA测试、验证标准、测试设计

**问题**:
为"角色跳跃"任务设计视觉QA测试。应该使用什么模式？捕获哪些帧？验证标准是什么？

**提示**:
参考task-execution.md的动画调试部分。

**参考答案**:
**视觉QA测试设计**：

**任务**：实现角色跳跃（idle → jump → land → idle）

**模式选择**：动态模式
- 原因：任务涉及状态转换和运动
- 需要检查：流畅性、无冻结姿态、无弹跳

**帧捕获策略**：
```bash
# 捕获参数
--fixed-fps 10  # 10 FPS
--write-movie

# 捕获时长
5秒  # 足够覆盖 idle → jump → land → idle

# 总帧数
50帧

# 选择帧（2 FPS cadence）
STEP=5  # 10 / 2 = 5
选择帧：frame0000, frame0005, frame0010, ..., frame0045
```

**验证标准**：
```markdown
Verify:
- 角色从idle平滑过渡到jump
- 跳跃轨迹自然（抛物线）
- 落地时平滑过渡到idle
- 无冻结姿态
- 无姿态弹跳
- 动画方向匹配移动方向
```

**视觉QA调用**：
```bash
# 动态模式
FRAMES=$(ls screenshots/jump/frame*.png | awk "NR % 5 == 0" | tr '\n' ' ')
Skill(skill="visual-qa") "Check reference.png against $FRAMES — Goal: 实现角色跳跃, Requirements: idle→jump→land→idle, Verify: 平滑过渡、无冻结、无弹跳"
```

**额外检查（问题模式）**：
```bash
# 检查特定问题
Skill(skill="visual-qa") "角色在跳跃过程中是否有冻结姿态？截图：screenshots/jump/frame*.png"

Skill(skill="visual-qa") "落地时是否有姿态弹跳？截图：screenshots/jump/frame0015.png frame0020.png frame0025.png"
```

**测试设计考虑因素**：
1. **模式选择**：动态（运动）vs 静态（无运动）
2. **帧率**：10 FPS足够，更高不必要
3. **时长**：覆盖完整状态转换
4. **帧选择**：2 FPS cadence，平衡细节和成本
5. **验证标准**：针对失败模式（冻结、弹跳）
6. **问题模式**：调试特定问题

**常见错误**：
- 使用静态模式检查动画 → 无法发现时序问题
- 捕获帧数不足 → 漏过关键帧
- 验证标准太泛 → 无法定位问题
- 只检查单帧 → 无法看到运动

**相关文档**:
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 模式选择
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 动画调试

---

## 第三层：高级架构师（设计理念与批判性分析）

### 模块6：架构设计哲学

### Q21: Godogen的"视觉验证优先"设计思路是什么？从终局倒推的路线图如何制定？

**问题类型**: 理论  
**难度等级**: 高级  
**相关概念**: 视觉验证优先、终局愿景、倒推路径

**问题**:
Godogen的终局愿景是"从一句话到可玩游戏"。请描述从终局倒推到当前（Week 0）的完整路线图，包括关键里程碑和前置条件。

**提示**:
思考从100%自动化到当前实现的路径。

**参考答案**:
**终局愿景**：
- 从一句话到完全可玩的游戏
- 无需人工干预
- 支持任意游戏类型
- 质量达到发布标准

**倒推路线图**：

**终局**（Week 52+）：
- 100%自动化
- 支持所有游戏类型
- 质量达到3A标准
- 自动发布到平台

**5年目标**（Week 260）：
- 支持复杂游戏（MMO、开放世界）
- 多引擎支持（Godot、Unreal、Bevy）
- 企业级部署
- 年生成1000+游戏

**2年目标**（Week 104）：
- 完整动画系统
- 音频生成
- 网络多人游戏
- 移动平台支持

**1年目标**（Week 52）：
- 完善视觉QA（误判率<5%）
- 更多资产生成后端
- 优化成本（平均<$5/游戏）
- 社区贡献的quirks库

**6个月目标**（Week 26）：
- 完整文档和教程
- 10个完整案例
- 开源核心组件
- CI/CD集成

**3个月目标**（Week 12）：
- 稳定的管道
- 错误恢复机制
- 性能优化
- 基础测试套件

**1个月目标**（Week 4）：
- MVP管道
- 基础资产生成
- 简单视觉QA
- 单一游戏类型（2D平台跳跃）

**当前**（Week 0）：
- 核心管道实现
- 基础资产生成
- 视觉QA原型
- Godot 4 C#支持

**关键里程碑**：
1. Week 4：MVP可用
2. Week 12：稳定管道
3. Week 26：社区采用
4. Week 52：生产就绪
5. Week 104：多引擎
6. Week 260：企业级

**前置条件**：
- Week 4：基础管道
- Week 12：错误恢复
- Week 26：文档和案例
- Week 52：完善QA
- Week 104：引擎抽象
- Week 260：分布式架构

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 路线图
- [README.md](../../../godogen/README.md) - 当前状态

---

### Q22: 单上下文架构的设计优势是什么？对性能和可扩展性有什么影响？

**问题类型**: 理论  
**难度等级**: 高级  
**相关概念**: 单上下文架构、性能、可扩展性

**问题**:
Godogen采用单上下文架构（1M token窗口内运行完整管道）。这种设计的优势是什么？对性能和可扩展性有什么影响？

**提示**:
对比多智能体架构的优缺点。

**参考答案**:
**单上下文架构的优势**：

1. **完整上下文访问**
   - 执行器有权限访问规划阶段的所有决策
   - 不需要从文档重新加载上下文
   - 决策更连贯一致

2. **简化调试**
   - 所有交互在同一对话中
   - 易于追踪决策链
   - 减少上下文切换成本

3. **减少文档依赖**
   - 文档用于持久化，不用于通信
   - 减少文档解析开销
   - 降低文档同步错误

4. **渐进式加载**
   - 只加载当前阶段需要的指令
   - 优化上下文使用
   - 保持聚焦

**性能影响**：

**优势**：
- 减少上下文切换开销
- 避免重复加载大型文档
- 决策连贯性减少迭代

**劣势**：
- 1M token仍是限制
- 大型项目可能超出
- 上下文压缩可能丢失细节

**可扩展性影响**：

**优势**：
- 简化架构，易于维护
- 减少智能体间通信复杂度
- 降低集成风险

**劣势**：
- 难以并行执行（单上下文串行）
- 扩展到多引擎需要重构
- 分布式部署困难

**对比多智能体架构**：

| 维度 | 单上下文 | 多智能体 |
|------|---------|---------|
| 上下文访问 | 完整 | 分段 |
| 调试难度 | 低 | 高 |
| 文档依赖 | 低 | 高 |
| 并行执行 | 否 | 是 |
| 分布式部署 | 困难 | 容易 |
| 架构复杂度 | 低 | 高 |
| 上下文限制 | 1M token | 每个智能体独立 |

**设计权衡**：
- Godogen选择单上下文：优先简化架构和调试
- 未来可能混合：单上下文主流程 + 多智能体子任务

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 单上下文架构
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 渐进式加载

---

### Q23: 预算感知的双后端资产生成设计解决了什么问题？如何平衡成本和质量？

**问题类型**: 理论  
**难度等级**: 高级  
**相关概念**: 预算感知、双后端、成本质量平衡

**问题**:
Godogen使用Gemini（精确但贵）和Grok（便宜但不够精确）双后端。这种设计解决了什么问题？如何平衡成本和质量？

**提示**:
思考不同资产类型对精度的需求差异。

**参考答案**:
**双后端设计解决的问题**：

1. **成本控制**
   - 单一后端（如Gemini）成本过高
   - 用户预算有限
   - 需要优化每分钱的视觉影响

2. **精度需求差异**
   - 不同资产类型对精度要求不同
   - 角色设计需要精确
   - 纹理可以容忍偏差

3. **生成速度**
   - Grok生成更快
   - 适合批量生成简单资产

**成本对比**：
| 操作 | Gemini | Grok |
|------|--------|------|
| 1K图像 | 7¢ | 2¢ |
| 2K图像 | 10¢ | 2¢ |
| 3D模型参考 | 7¢ | - |
| 动画精灵 | 7¢+ | - |

**后端选择策略**：

**使用Gemini**（精确优先）：
- 参考图像
- 角色设计
- 3D模型参考
- 动画精灵参考/姿态
- 精确布局的背景

**使用Grok**（成本优先）：
- 纹理
- 简单对象
- 道具包
- 简单场景背景（天空、云、抽象）

**成本质量平衡**：

**预算分配示例**（总预算$5 = 500¢）：
- 角色设计（Gemini 1K）：7¢
- 3D模型（Gemini 1K + GLB）：7¢ + 30¢ = 37¢
- 地形纹理（Grok）：2¢
- 天空背景（Grok）：2¢
- 道具包（Grok 4项）：2¢
- 总计：50¢（剩余450¢用于重试和扩展）

**优化策略**：
1. **视觉影响优先**：角色 > 地形 > 道具
2. **锚点-衍生模式**：生成一个高质量锚点，衍生其他资产
3. **批量生成**：道具包比单独生成便宜
4. **重试预算**：预留10%用于重试

**潜在问题**：
- Grok不够精确 → 可能需要多次重试
- 重试成本可能超过直接用Gemini
- 需要智能选择后端

**相关文档**:
- [asset-planner.md](../../../godogen/claude/skills/godogen/asset-planner.md) - 后端选择
- [asset-gen.md](../../../godogen/claude/skills/godogen/asset-gen.md) - 成本表

---

### Q24: 文档协议的设计考虑是什么？为什么需要文档化通信？

**问题类型**: 理论  
**难度等级**: 高级  
**相关概念**: 文档协议、阶段通信、状态持久化

**问题**:
Godogen使用文档协议进行阶段间通信，而不是消息传递。这种设计考虑是什么？为什么不是直接在上下文中传递状态？

**提示**:
思考上下文压缩和管道恢复。

**参考答案**:
**文档协议的设计考虑**：

1. **状态持久化**
   - 上下文可能压缩
   - 文件系统持久
   - 管道可从任何点恢复

2. **阶段解耦**
   - 每个阶段独立
   - 通过文档通信
   - 易于替换或重排

3. **可检查性**
   - 用户可阅读文档
   - 了解项目状态
   - 调试更容易

4. **可调试性**
   - 编辑文档
   - 重新运行阶段
   - 快速迭代

5. **版本控制**
   - Git跟踪文档变化
   - 可回滚到任何状态
   - 支持分支开发

**为什么不是消息传递**：

**消息传递的问题**：
1. **上下文依赖**：状态在对话历史中，压缩后丢失
2. **难以恢复**：压缩后无法重建完整状态
3. **难以检查**：用户无法直接查看消息历史
4. **难以调试**：修改状态需要重新运行整个对话
5. **难以版本控制**：消息历史不易版本化

**文档协议的优势**：
1. **持久化**：文件系统不受上下文压缩影响
2. **可读性**：Markdown格式，易于阅读
3. **可编辑性**：用户可直接编辑
4. **版本控制**：Git原生支持
5. **独立性**：阶段可独立运行

**文档协议的代价**：
1. **解析开销**：需要解析文档
2. **同步风险**：文档可能不同步
3. **格式约束**：需要严格格式
4. **学习曲线**：需要理解文档结构

**设计权衡**：
- Godogen选择文档协议：优先持久化和可恢复性
- 未来可能混合：文档协议 + 消息传递（临时状态）

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 文档协议
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 上下文卫生

---

### 模块7：潜在设计漏洞与优化

### Q25: Godogen在项目规模扩大时可能遇到什么瓶颈？如何缓解？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: 规模化瓶颈、性能优化、架构扩展

**问题**:
当游戏项目从简单2D游戏扩展到复杂3D游戏（如开放世界）时，Godogen可能遇到哪些技术瓶颈？如何设计架构以支持大型项目？

**提示**:
思考上下文窗口、资产生成、视觉QA的规模化挑战。

**参考答案**:
**潜在瓶颈**：

1. **上下文窗口限制**
   - 问题：1M token可能不足以处理大型项目
   - 表现：上下文频繁压缩，状态丢失
   - 影响：决策质量下降，重复工作

2. **资产生成成本**
   - 问题：大型项目需要大量资产
   - 表现：预算超支，生成时间过长
   - 影响：无法完成项目

3. **视觉QA成本**
   - 问题：大量截图需要QA
   - 表现：API调用成本高，处理时间长
   - 影响：迭代速度慢

4. **场景构建复杂度**
   - 问题：大型场景层次深，节点多
   - 表现：构建时间长，序列化文件大
   - 影响：开发效率低

5. **Godot编译时间**
   - 问题：大量脚本编译慢
   - 表现：dotnet build时间长
   - 影响：迭代速度慢

**缓解方案**：

**1. 上下文窗口优化**
- 分层上下文：主上下文 + 子上下文
- 智能压缩：保留关键决策，压缩调试信息
- 文档优先：更多状态存储在文档
- 增量加载：只加载当前需要的部分

**2. 资产生成优化**
- 程序化生成：减少资产数量
- 资产复用：共享纹理、模型
- 预算分层：核心资产高预算，次要资产低预算
- 并行生成：多线程生成

**3. 视觉QA优化**
- 采样策略：关键帧QA，跳过相似帧
- 分层QA：粗QA（快速）→ 精QA（详细）
- 本地模型：部署本地视觉模型减少API成本
- 缓存机制：缓存相似场景的QA结果

**4. 场景构建优化**
- 分层构建：子场景独立构建
- 增量构建：只重建修改部分
- 并行构建：多进程构建独立场景
- 压缩序列化：优化.tscn文件大小

**5. 编译优化**
- 增量编译：只编译修改的脚本
- 并行编译：多线程编译
- 预编译头：减少重复编译
- 脚本拆分：减少单个文件大小

**大型项目架构设计**：
```
主上下文（1M token）
  ├─ 规划阶段（200K）
  ├─ 架构阶段（200K）
  ├─ 资产生成阶段（200K）
  └─ 任务执行阶段（400K）
      ├─ 子上下文1（风险任务1）
      ├─ 子上下文2（风险任务2）
      └─ 子上下文3（主构建）
```

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 单上下文架构
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 迭代策略

---

### Q26: 视觉QA的误判可能导致什么问题？如何防止误判？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: 视觉QA误判、误判防范、QA可靠性

**问题**:
视觉QA可能误判（false positive或false negative）。误判可能导致什么问题？如何设计机制防止误判？

**提示**:
思考视觉模型的局限性和验证策略。

**参考答案**:
**误判类型和问题**：

**False Positive（误报）**：
- 问题：QA报告fail，但实际正确
- 影响：不必要的修复循环，浪费时间
- 原因：视觉模型对某些风格或效果理解错误

**False Negative（漏报）**：
- 问题：QA报告pass，但实际有bug
- 影响：bug流入发布，影响质量
- 原因：视觉模型漏检某些缺陷

**常见误判场景**：

1. **风格差异误判**
   - 艺术风格与参考不同但合理
   - QA误认为错误
   - 示例：卡通风格vs写实风格

2. **光照差异误判**
   - 光照条件不同但合理
   - QA误认为颜色错误
   - 示例：黄昏vs正午

3. **视角差异误判**
   - 相机角度不同但合理
   - QA误认为构图错误
   - 示例：俯视vs侧视

4. **细微bug漏报**
   - 细小z-fighting或纹理拉伸
   - QA漏检
   - 原因：分辨率不足或注意力分散

**防范机制**：

**1. 多后端验证**
```bash
# 使用Gemini和Claude双后端
Skill(skill="visual-qa") "--both Check reference.png against screenshot.png"
```
- 两个后端都报fail才认为fail
- 减少单个后端的误判

**2. 人工审核**
- 重大fail需要人工确认
- 提供截图和问题描述
- 用户可覆盖QA判断

**3. 上下文增强**
- 提供更多上下文信息
- 游戏类型、艺术风格、技术约束
- 帮助QA理解合理性

**4. 分层验证**
- 粗QA：快速检查明显bug
- 精QA：详细检查细微问题
- 减少误判的影响

**5. 阈值调整**
- 调整QA的严格度
- 开发阶段宽松，发布阶段严格
- 平衡误报和漏报

**6. 反馈学习**
- 记录误判案例
- 训练QA模型避免重复误判
- 持续改进

**误判处理流程**：
```
QA报告fail
  ↓
检查是否常见误判（风格、光照、视角）
  ↓ (是)
人工审核
  ↓ (确认误判)
忽略，继续
  ↓ (否)
修复
```

**相关文档**:
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 后端选择
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 误判处理

---

### Q27: 后端API依赖（Gemini、xAI、Tripo3D）可能带来什么风险？如何缓解？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: API依赖、供应商锁定、风险缓解

**问题**:
Godogen依赖多个外部API（Gemini、xAI Grok、Tripo3D）。这些依赖可能带来什么风险？如何设计架构以缓解这些风险？

**提示**:
思考供应商锁定、服务中断、价格波动等问题。

**参考答案**:
**潜在风险**：

1. **供应商锁定**
   - 问题：依赖特定供应商，难以切换
   - 表现：API格式不兼容，迁移成本高
   - 影响：缺乏议价能力，价格被动

2. **服务中断**
   - 问题：API服务宕机或限流
   - 表现：生成失败，管道中断
   - 影响：项目延期，用户体验差

3. **价格波动**
   - 问题：API价格突然上涨
   - 表现：预算超支，项目无法完成
   - 影响：成本不可控

4. **质量下降**
   - 问题：API质量下降或模型变更
   - 表现：生成质量不稳定
   - 影响：项目质量下降

5. **合规风险**
   - 问题：API服务违反地区法规
   - 表现：服务不可用
   - 影响：项目无法在特定地区部署

**缓解方案**：

**1. 抽象层设计**
```python
class ImageGenerator:
    def generate(self, prompt, backend="gemini"):
        if backend == "gemini":
            return self._generate_gemini(prompt)
        elif backend == "grok":
            return self._generate_grok(prompt)
        else:
            raise ValueError(f"Unknown backend: {backend}")
```
- 统一接口，隐藏后端细节
- 易于切换后端
- 降低迁移成本

**2. 多后端支持**
- 同时支持多个供应商
- 自动故障转移
- 负载均衡

**3. 缓存机制**
- 缓存生成结果
- 减少API调用
- 降低成本和依赖

**4. 本地模型**
- 部署本地视觉模型
- 减少外部依赖
- 提高可靠性

**5. 监控和告警**
- 监控API可用性
- 告警服务中断
- 自动切换后端

**6. 预算控制**
- 设置预算上限
- 超限自动停止
- 避免价格波动风险

**7. 合规检查**
- 检查地区法规
- 选择合规供应商
- 避免合规风险

**架构设计**：
```
Godogen
  ├─ 抽象层
  │   ├─ ImageGenerator
  │   ├─ ModelGenerator
  │   └─ VisualQA
  ├─ 后端适配器
  │   ├─ GeminiAdapter
  │   ├─ GrokAdapter
  │   ├─ Tripo3DAdapter
  │   └─ ClaudeAdapter
  └─ 缓存层
      ├─ ImageCache
      └─ ModelCache
```

**相关文档**:
- [asset-gen.md](../../../godogen/claude/skills/godogen/asset-gen.md) - 后端选择
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 后端选择

---

### Q28: Godot引擎的quirks对Godogen的影响是什么？如何系统化管理这些quirks？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: Godot quirks、quirks管理、知识积累

**问题**:
Godot引擎有许多非直观的行为（quirks），如SetScript() dispose C# wrapper、RID leak错误等。这些quirks对Godogen有什么影响？如何系统化管理？

**提示**:
参考quirks.md的反馈循环和MEMORY.md的作用。

**参考答案**:
**Quirks的影响**：

1. **开发效率**
   - 问题：quirks导致调试时间增加
   - 表现：重复遇到相同问题
   - 影响：项目延期

2. **代码质量**
   - 问题：quirks导致workaround代码
   - 表现：代码不直观，难以维护
   - 影响：长期维护成本高

3. **管道稳定性**
   - 问题：quirks导致管道失败
   - 表现：随机错误，难以复现
   - 影响：用户体验差

4. **学习曲线**
   - 问题：quirks增加学习成本
   - 表现：新用户难以理解
   - 影响：采用率低

**系统化管理机制**：

**1. 框架级quirks文档（quirks.md）**
- 收集跨项目的通用quirks
- 提供标准workaround
- 定期更新

**2. 项目级记忆（MEMORY.md）**
- 记录项目特定quirks
- 发现新quirks立即写入
- 项目结束后审查

**3. 反馈循环**
```
任务执行 → 发现quirk → 写入MEMORY.md → 
  ↓ (项目结束)
技能维护者审查 → 识别重复模式 → 提升到quirks.md
```

**4. 自动检测**
- 检测常见错误模式
- 自动建议workaround
- 减少人工干预

**5. 测试覆盖**
- 为quirks编写测试
- 确保workaround有效
- 防止回归

**Quirks分类**：

**C#/.NET 9 Quirks**：
- SetScript() disposes C# wrapper
- RID leak错误
- _Ready()在_Initialize()中跳过

**Godot Engine Quirks**：
- MultiMeshInstance3D和GLB问题
- CollisionLayer bitmask vs UI index
- ArrayMesh阴影需要GenerateNormals()

**序列化Quirks**：
- GLB内部节点MaterialOverride不序列化
- Owner链不正确导致节点不保存

**管理策略**：

**短期**（项目级）：
- MEMORY.md记录
- 快速workaround
- 项目结束审查

**中期**（框架级）：
- quirks.md收集
- 标准化workaround
- 定期更新

**长期**（社区级）：
- 开源quirks库
- 社区贡献
- 自动化检测

**相关文档**:
- [quirks.md](../../../godogen/claude/skills/godogen/quirks.md) - Quirks列表
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 反馈循环

---

### Q29: 资产生成的成本控制机制是什么？如何优化预算使用？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: 成本控制、预算优化、资产生成

**问题**:
Godogen的资产生成依赖外部API，成本是重要考虑因素。现有的成本控制机制是什么？如何进一步优化预算使用？

**提示**:
参考asset-planner.md和asset-gen.md的成本表。

**参考答案**:
**现有成本控制机制**：

**1. 双后端选择**
- Gemini：精确但贵（7¢/1K图像）
- Grok：便宜但不够精确（2¢/1K图像）
- 根据资产类型选择后端

**2. 预算分配**
- 用户设置总预算
- 按视觉影响优先级分配
- 核心资产高预算，次要资产低预算

**3. 锚点-衍生模式**
- 生成一个高质量锚点
- 从锚点衍生其他资产
- 减少生成次数

**4. 批量生成**
- 道具包比单独生成便宜
- 一次生成多个相关资产
- 减少API调用

**5. 重试预算**
- 预留10%用于重试
- 避免预算耗尽
- 确保项目完成

**优化策略**：

**1. 智能后端选择**
```python
def select_backend(asset_type, precision_requirement):
    if asset_type in ["character", "3d_model_reference"]:
        return "gemini"  # 高精度需求
    elif asset_type in ["texture", "simple_object"]:
        return "grok"  # 低精度需求
    else:
        return "gemini" if precision_requirement == "high" else "grok"
```

**2. 程序化生成**
- 使用算法生成纹理
- 减少API调用
- 降低成本

**3. 资产复用**
- 共享纹理和模型
- 减少生成数量
- 提高一致性

**4. 缓存机制**
- 缓存生成结果
- 避免重复生成
- 降低成本

**5. 分辨率优化**
- 根据显示尺寸选择分辨率
- 小精灵不需要高分辨率
- 节省成本

**6. 成本监控**
- 实时监控成本
- 超限告警
- 自动停止

**预算分配示例**（$5预算）：
```
核心资产（60% = $3）：
- 角色设计（Gemini 1K）：7¢
- 3D模型（Gemini 1K + GLB）：37¢
- 参考图像（Gemini 1K）：7¢

次要资产（30% = $1.5）：
- 纹理（Grok）：2¢ × 5 = 10¢
- 道具（Grok）：2¢ × 10 = 20¢
- 背景（Grok）：2¢ × 2 = 4¢

重试预算（10% = $0.5）：
- 用于失败重试
```

**成本优化效果**：
- 单后端（Gemini）：~$10/游戏
- 双后端优化：~$5/游戏
- 程序化生成：~$2/游戏

**相关文档**:
- [asset-planner.md](../../../godogen/claude/skills/godogen/asset-planner.md) - 预算分配
- [asset-gen.md](../../../godogen/claude/skills/godogen/asset-gen.md) - 成本表

---

### Q30: 场景构建器的Owner链机制是什么？为什么它如此关键？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: Owner链、序列化、场景构建

**问题**:
场景构建器必须正确设置Owner链，否则节点不会保存到.tscn文件。Owner链是什么？为什么它如此关键？如何确保正确设置？

**提示**:
参考scene-generation.md的Owner链部分。

**参考答案**:
**Owner链机制**：

**什么是Owner链**：
- Godot的序列化机制
- 只有Owner链上的节点才会保存到.tscn
- Owner通常是场景的根节点

**为什么关键**：
1. **序列化要求**：没有Owner的节点不会保存
2. **场景完整性**：丢失节点导致场景不完整
3. **调试困难**：序列化错误难以发现

**Owner链规则**：
1. 根节点的Owner必须是null
2. 子节点的Owner必须是父节点
3. 所有节点必须在Owner链上

**正确设置方法**：

**方法1：SceneBuilderBase.SetOwnerOnNewNodes()**
```csharp
public partial class BuildPlayer : SceneBuilderBase
{
    public override void _Initialize()
    {
        var temp = new Node();
        var root = new CharacterBody2D();
        root.Name = "Player";
        temp.AddChild(root);

        var collision = new CollisionShape2D();
        root.AddChild(collision);

        // 自动设置Owner链
        SetOwnerOnNewNodes(root);

        PackAndSave(root, "res://scenes/player.tscn");
    }
}
```

**方法2：手动设置**
```csharp
root.Owner = root;  // 根节点Owner为null
collision.Owner = root;  // 子节点Owner为父节点
```

**常见错误**：

**错误1：忘记设置Owner**
```csharp
var root = new CharacterBody2D();
var collision = new CollisionShape2D();
root.AddChild(collision);
// 忘记设置Owner → collision不会保存
```

**错误2：Owner设置错误**
```csharp
collision.Owner = temp;  // 错误：Owner应该是root
```

**错误3：SetScript()后使用旧wrapper**
```csharp
root.SetScript(...);
root.Owner = root;  // 错误：旧wrapper已dispose
```

**验证方法**：
```csharp
// 检查.tscn文件内容
var content = File.ReadAllText("res://scenes/player.tscn");
if (!content.Contains("CollisionShape2D"))
{
    GD.PrintErr("CollisionShape2D not saved! Check Owner chain.");
}
```

**最佳实践**：
1. 使用SceneBuilderBase自动设置
2. SetScript()最后调用
3. 重新获取root引用
4. 验证.tscn文件内容

**相关文档**:
- [scene-generation.md](../../../godogen/claude/skills/godogen/scene-generation.md) - Owner链
- [scaffold.md](../../../godogen/claude/skills/godogen/scaffold.md) - 场景模板

---

### Q31: 如何评估Godogen的生成质量？质量指标有哪些？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: 质量评估、质量指标、QA指标

**问题**:
如何评估Godogen生成的游戏质量？应该使用哪些指标？如何量化这些指标？

**提示**:
思考功能性、视觉质量、性能等多个维度。

**参考答案**:
**质量评估维度**：

**1. 功能性**
- 游戏是否可玩
- 核心机制是否正确
- 无崩溃或严重bug

**指标**：
- Playability Rate：可玩率（用户测试）
- Bug Density：bug密度（bug/千行代码）
- Crash Rate：崩溃率（崩溃/小时）

**2. 视觉质量**
- 视觉效果是否符合reference.png
- 资产风格是否一致
- 无视觉缺陷

**指标**：
- Visual Similarity：视觉相似度（视觉QA评分）
- Asset Consistency：资产一致性（风格匹配度）
- Defect Rate：缺陷率（视觉缺陷/场景）

**3. 性能**
- 帧率是否稳定
- 加载时间是否合理
- 内存占用是否可接受

**指标**：
- FPS：帧率（目标60 FPS）
- Load Time：加载时间（目标<5秒）
- Memory：内存占用（目标<500MB）

**4. 代码质量**
- 代码是否可维护
- 是否遵循最佳实践
- 无代码异味

**指标**：
- Code Complexity：代码复杂度（圈复杂度）
- Test Coverage：测试覆盖率（目标>80%）
- Code Smell：代码异味数量

**5. 用户体验**
- 游戏是否有趣
- 操作是否直观
- 难度是否合理

**指标**：
- Engagement：参与度（游戏时长）
- Learning Curve：学习曲线（上手时间）
- Difficulty Balance：难度平衡（通关率）

**量化方法**：

**视觉相似度**：
```python
def calculate_visual_similarity(reference, generated):
    # 使用视觉模型计算相似度
    similarity = visual_model.compare(reference, generated)
    return similarity  # 0-1，1为完全匹配
```

**Bug密度**：
```python
bug_density = total_bugs / (lines_of_code / 1000)
```

**帧率稳定性**：
```python
fps_stability = 1 - (fps_std_dev / fps_mean)
```

**质量评分**：
```
总分 = 功能性 × 0.3 + 视觉质量 × 0.25 + 性能 × 0.2 + 代码质量 × 0.15 + 用户体验 × 0.1
```

**质量基准**：
- MVP：总分>0.6
- 生产就绪：总分>0.8
- 优秀：总分>0.9

**相关文档**:
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 视觉质量
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 功能验证

---

### Q32: Godogen的未来发展方向是什么？有哪些潜在的技术突破点？

**问题类型**: 批判性  
**难度等级**: 高级  
**相关概念**: 未来发展、技术突破、路线图

**问题**:
基于当前的技术趋势和Godogen的局限，未来的发展方向是什么？哪些技术突破可能带来质的飞跃？

**提示**:
思考多模态AI、程序化生成、分布式架构等方向。

**参考答案**:
**未来发展方向**：

**1. 多模态AI集成**
- **现状**：主要使用文本和图像
- **未来**：集成音频、视频、3D模型直接生成
- **突破点**：端到端多模态模型（如GPT-5V）
- **影响**：减少后端依赖，提高一致性

**2. 程序化生成增强**
- **现状**：主要依赖AI生成资产
- **未来**：结合程序化生成算法
- **突破点**：AI辅助的程序化生成
- **影响**：降低成本，提高可扩展性

**3. 分布式架构**
- **现状**：单上下文架构
- **未来**：分布式多智能体架构
- **突破点**：高效的智能体通信协议
- **影响**：支持大型项目，提高并行性

**4. 自主学习**
- **现状**：依赖人工维护quirks
- **未来**：自动学习和适应
- **突破点**：强化学习框架
- **影响**：减少人工干预，持续改进

**5. 多引擎支持**
- **现状**：仅支持Godot
- **未来**：支持Unreal、Bevy等引擎
- **突破点**：引擎抽象层
- **影响**：扩大适用范围

**6. 实时协作**
- **现状**：单用户使用
- **未来**：多人实时协作
- **突破点**：实时同步技术
- **影响**：团队开发支持

**技术突破点**：

**短期**（1年内）：
- 视觉QA误判率<5%
- 成本优化至<$2/游戏
- 支持复杂动画系统

**中期**（2-3年）：
- 端到端多模态模型
- 程序化生成AI辅助
- 分布式架构原型

**长期**（5年+）：
- 完全自主开发
- 多引擎支持
- 企业级部署

**潜在挑战**：
- 计算资源需求
- 模型可靠性
- 法律和伦理问题
- 用户接受度

**相关文档**:
- [PROJECT.md](../../../godogen/PROJECT.md) - 路线图
- [README.md](../../../godogen/README.md) - 当前状态

---

## 附录

### A. 文档索引

**核心文档**：
- [PROJECT.md](../../../godogen/PROJECT.md) - Godogen项目概述
- [README.md](../../../godogen/README.md) - 项目说明
- [SKILL.md](../../../godogen/claude/skills/godogen/SKILL.md) - 编排器技能

**管道阶段文档**：
- [visual-target.md](../../../godogen/claude/skills/godogen/visual-target.md) - 视觉目标
- [decomposer.md](../../../godogen/claude/skills/godogen/decomposer.md) - 分解器
- [scaffold.md](../../../godogen/claude/skills/godogen/scaffold.md) - 架构生成
- [asset-planner.md](../../../godogen/claude/skills/godogen/asset-planner.md) - 资产规划
- [asset-gen.md](../../../godogen/claude/skills/godogen/asset-gen.md) - 资产生成
- [task-execution.md](../../../godogen/claude/skills/godogen/task-execution.md) - 任务执行
- [visual-qa.md](../../../godogen/claude/skills/godogen/visual-qa.md) - 视觉QA

**技术文档**：
- [scene-generation.md](../../../godogen/claude/skills/godogen/scene-generation.md) - 场景生成
- [quirks.md](../../../godogen/claude/skills/godogen/quirks.md) - Godot quirks
- [capture.md](../../../godogen/claude/skills/godogen/capture.md) - 截图捕获
- [test-harness.md](../../../godogen/claude/skills/godogen/test-harness.md) - 测试线束

**部署文档**：
- [android-build.md](../../../godogen/claude/skills/godogen/android-build.md) - Android构建
- [rembg.md](../../../godogen/claude/skills/godogen/rembg.md) - 背景移除

### B. 术语表

**术语定义**：

- **视觉验证闭环**：通过捕获实际游戏截图，用视觉AI验证正确性的机制
- **单上下文架构**：在1M token窗口内运行完整管道的架构设计
- **文档协议**：通过结构化文档（PLAN.md、STRUCTURE.md等）传递状态的通信机制
- **风险任务**：失败不可预测、错误模糊、需要单独验证的功能
- **主构建**：Godot处理良好的常规功能，批量实现
- **场景构建器**：运行在Godot headless模式，生成.tscn文件的C#代码
- **运行时脚本**：游戏运行时执行的C#代码，实现游戏逻辑
- **Owner链**：Godot的序列化机制，只有Owner链上的节点才会保存到.tscn
- **渐进式加载**：只在到达某个阶段时才读取该阶段的指令文件
- **视觉QA**：分析游戏截图，验证视觉效果的技能
- **双后端**：使用Gemini（精确）和Grok（便宜）两个后端的资产生成策略
- **预算感知**：根据预算分配和优化资产生成的策略
- **上下文卫生**：管理上下文窗口，确保重要状态不丢失的策略
- **Forked context**：在独立上下文中运行，避免加载大型文档到主上下文

### C. 设计漏洞总结

**已识别的设计漏洞**：

1. **上下文窗口限制**
   - 影响：大型项目可能超出1M token
   - 缓解：分层上下文、智能压缩、文档优先

2. **视觉QA误判**
   - 影响：误报浪费时间，漏报影响质量
   - 缓解：多后端验证、人工审核、反馈学习

3. **API依赖风险**
   - 影响：供应商锁定、服务中断、价格波动
   - 缓解：抽象层、多后端、缓存、本地模型

4. **Godot quirks**
   - 影响：开发效率低、代码质量差
   - 缓解：quirks.md、MEMORY.md、反馈循环

5. **资产生成成本**
   - 影响：预算超支、项目无法完成
   - 缓解：双后端、程序化生成、资产复用

6. **场景构建复杂度**
   - 影响：构建时间长、序列化文件大
   - 缓解：分层构建、增量构建、并行构建

7. **单上下文可扩展性**
   - 影响：难以并行执行、分布式部署困难
   - 缓解：未来混合架构

### D. 参考资源

**官方资源**：
- Godot文档：https://docs.godotengine.org/
- Godot C# API：https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html
- Gemini API：https://ai.google.dev/
- xAI API：https://docs.x.ai/
- Tripo3D：https://www.tripo3d.ai/

**相关研究**：
- AI游戏生成：文献综述
- 视觉QA：计算机视觉在游戏测试中的应用
- 程序化生成：算法和工具

**社区资源**：
- Godot社区论坛
- AI游戏开发Discord
- Godogen GitHub（如开源）

---

**文档结束**
