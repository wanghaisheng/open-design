# Version Control Feature Matrix

This document tracks the implementation status of Git-like version control features for RAMS skill execution history, organized by user-facing functionality.

## Version Control Usage Scenarios by Skill Stage

本章节说明版本控制在RAMS框架不同skill阶段的作用和使用场景。

### 游戏策划阶段 (Game Design Stage)

游戏策划阶段涉及游戏机制、玩法、关卡等设计工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 回顾设计方案的演变过程 | `execution log` | 了解设计思路的发展轨迹 |
| **撤销操作** | 设计方向错误时快速回退 | `execution undo` | 避免错误设计影响后续工作 |
| **重做操作** | 恢复被撤销的设计尝试 | `execution redo` | 重新评估之前的设计方案 |
| **切换到指定版本** | 对比不同设计方案 | `execution checkout` | 快速切换到历史设计版本进行对比 |
| **创建分支** | 尝试不同的设计方向而不影响主设计 | `execution branch create` | 并行探索多个设计可能性 |
| **切换分支** | 在不同设计方向间切换 | `execution branch switch` | 灵活管理多个设计线 |
| **查看分支** | 查看所有正在进行的设计方向 | `execution branch list` | 了解整体设计探索进度 |
| **删除分支** | 清理废弃的设计方向 | `execution branch delete` | 保持设计库整洁 |
| **创建标签** | 为重要的设计里程碑打标签 | `execution tag create` | 标记关键设计版本（如v1.0设计方案） |
| **查看标签** | 查看所有设计里程碑 | `execution tag list` | 快速定位重要设计版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存当前未完成的设计状态 | `execution stash save` | 临时保存设计进度 |
| **查看暂存** | 查看所有暂存的设计状态 | `execution stash list` | 管理多个设计草稿 |
| **恢复暂存** | 恢复暂存的设计状态 | `execution stash apply` | 继续之前的设计工作 |
| **删除暂存** | 删除不需要的暂存 | `execution stash drop` | 清理设计草稿 |
| **合并分支** | 将一个设计方向合并到主设计 | `execution merge` | 将实验性设计合并到主设计 |
| **变基操作** | 将提交重新应用到另一个分支 | `execution rebase` | 保持设计历史线性整洁 |

**典型工作流：**
```
1. 创建主设计方案分支
2. 创建实验性分支尝试新玩法
3. 在实验分支上执行设计skill
4. 如果满意，合并到主分支
5. 如果不满意，撤销或切换分支
6. 为重要版本打标签（如"v1.0-战斗系统设计"）
```

### 技术设计阶段 (Technical Design Stage)

技术设计阶段涉及架构、技术方案、API设计等工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 追踪技术方案的迭代 | `execution log` | 理解技术决策的演进 |
| **撤销操作** | 技术方案有问题时回退 | `execution undo` | 快速回退有问题的技术方案 |
| **重做操作** | 重新评估技术方案 | `execution redo` | 对比不同技术方案 |
| **切换到指定版本** | 回到之前的技术方案 | `execution checkout` | 测试历史技术方案 |
| **创建分支** | 尝试不同的技术架构 | `execution branch create` | 并行测试多种技术方案 |
| **切换分支** | 在不同技术方案间切换 | `execution branch switch` | 灵活比较技术方案 |
| **查看分支** | 查看所有技术方案分支 | `execution branch list` | 了解技术探索范围 |
| **删除分支** | 清理废弃的技术方案 | `execution branch delete` | 保持技术库整洁 |
| **创建标签** | 标记技术里程碑版本 | `execution tag create` | 标记关键技术版本（如"v2.0-架构重构"） |
| **查看标签** | 查看所有技术里程碑 | `execution tag list` | 快速定位关键技术版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存未完成的技术设计 | `execution stash save` | 临时保存技术草稿 |
| **查看暂存** | 查看所有技术草稿 | `execution stash list` | 管理多个技术草稿 |
| **恢复暂存** | 恢复技术草稿 | `execution stash apply` | 继续之前的技术工作 |
| **删除暂存** | 删除不需要的技术草稿 | `execution stash drop` | 清理技术草稿 |
| **合并分支** | 将技术方案整合到主架构 | `execution merge` | 整合技术方案 |
| **变基操作** | 让技术方案基于最新架构 | `execution rebase` | 保持技术历史线性 |

**典型工作流：**
```
1. 创建技术方案分支
2. 设计并测试技术架构
3. 如果架构可行，合并到主分支
4. 如果不可行，撤销或切换到其他方案
5. 为重要技术版本打标签
```

### 美术设计阶段 (Art Design Stage)

美术设计阶段涉及角色、场景、UI等视觉设计工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 回顾美术风格的演变 | `execution log` | 了解美术风格的发展 |
| **撤销操作** | 美术方向错误时回退 | `execution undo` | 快速回退不满意的美术设计 |
| **重做操作** | 恢复被撤销的美术尝试 | `execution redo` | 重新评估美术方案 |
| **切换到指定版本** | 对比不同美术风格 | `execution checkout` | 快速切换到历史美术版本 |
| **创建分支** | 尝试不同的美术风格 | `execution branch create` | 并行探索多种美术风格 |
| **切换分支** | 在不同美术风格间切换 | `execution branch switch` | 灵活比较美术方案 |
| **查看分支** | 查看所有美术风格分支 | `execution branch list` | 了解美术探索范围 |
| **删除分支** | 清理废弃的美术风格 | `execution branch delete` | 保持美术库整洁 |
| **创建标签** | 标记美术里程碑版本 | `execution tag create` | 标记关键美术版本（如"v1.0-角色设计"） |
| **查看标签** | 查看所有美术里程碑 | `execution tag list` | 快速定位关键美术版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存未完成的美术设计 | `execution stash save` | 临时保存美术草稿 |
| **查看暂存** | 查看所有美术草稿 | `execution stash list` | 管理多个美术草稿 |
| **恢复暂存** | 恢复美术草稿 | `execution stash apply` | 继续之前的美术工作 |
| **删除暂存** | 删除不需要的美术草稿 | `execution stash drop` | 清理美术草稿 |
| **合并分支** | 将美术方案整合到主设计 | `execution merge` | 整合美术方案 |
| **变基操作** | 让美术方案基于最新设计 | `execution rebase` | 保持美术历史线性 |

**典型工作流：**
```
1. 创建美术风格分支
2. 设计角色/场景/UI
3. 如果风格合适，合并到主分支
4. 如果不合适，撤销或切换到其他风格
5. 为重要美术版本打标签
```

### 生产管理阶段 (Production Stage)

生产管理阶段涉及项目规划、进度跟踪、资源分配等工作。

| 版本控制功能 | 使用场景 | 典型操作 | 价值 |
|------------|---------|---------|------|
| **查看执行历史** | 追踪项目进展 | `execution log` | 了解项目执行历史 |
| **撤销操作** | 项目决策错误时回退 | `execution undo` | 回退错误的项目决策 |
| **重做操作** | 恢复被撤销的项目操作 | `execution redo` | 重新评估项目决策 |
| **切换到指定版本** | 回到之前的项目状态 | `execution checkout` | 查看历史项目状态 |
| **创建分支** | 尝试不同的项目方案 | `execution branch create` | 并行测试多种项目方案 |
| **切换分支** | 在不同项目方案间切换 | `execution branch switch` | 灵活管理项目方案 |
| **查看分支** | 查看所有项目方案分支 | `execution branch list` | 了解项目方案范围 |
| **删除分支** | 清理废弃的项目方案 | `execution branch delete` | 保持项目库整洁 |
| **创建标签** | 标记项目里程碑 | `execution tag create` | 标记关键项目版本（如"v1.0-Alpha版本"） |
| **查看标签** | 查看所有项目里程碑 | `execution tag list` | 快速定位关键项目版本 |
| **删除标签** | 清理不需要的标签 | `execution tag delete` | 维护标签库 |
| **暂存工作** | 保存未完成的项目状态 | `execution stash save` | 临时保存项目进度 |
| **查看暂存** | 查看所有项目暂存 | `execution stash list` | 管理多个项目草稿 |
| **恢复暂存** | 恢复项目暂存 | `execution stash apply` | 继续之前的项目工作 |
| **删除暂存** | 删除不需要的项目暂存 | `execution stash drop` | 清理项目草稿 |
| **合并分支** | 整合项目方案 | `execution merge` | 合并项目方案 |
| **变基操作** | 让项目基于最新状态 | `execution rebase` | 保持项目历史线性 |

**典型工作流：**
```
1. 创建项目方案分支
2. 执行项目规划和管理
3. 如果方案可行，合并到主分支
4. 如果不可行，撤销或切换到其他方案
5. 为重要项目版本打标签
```

---

## 资产生产案例：版本管理的实际作用

本章节以游戏资产生产为例，说明不同skill、不同模型实现下版本管理的具体作用。

### 案例：角色资产生产流程

假设我们要生产一个游戏角色资产，涉及多个skill和不同的模型实现。

#### Skill 1: 角色概念设计 (Character Concept Design)

**模型实现 A**: 使用 DALL-E 3 生成概念图
**模型实现 B**: 使用 Midjourney 生成概念图

**版本管理作用：**

| 场景 | 版本控制操作 | 价值 |
|------|------------|------|
| 对比不同AI模型生成的概念图 | 创建分支 `concept-dalle` 和 `concept-midjourney` | 并行对比不同模型的效果 |
| 某个模型结果不满意 | `execution undo` 撤销该次生成 | 快速回退，节省成本 |
| 想要重新评估之前的概念图 | `execution checkout` 切换到历史版本 | 回溯查看之前的设计 |
| 找到满意的概念图版本 | `execution tag create` 标记为 `v1.0-concept-final` | 锁定重要版本 |

**实际工作流：**
```bash
# 1. 创建DALL-E分支
open-design execution branch create --instance character-artist --name concept-dalle
# 执行DALL-E skill生成概念图
# ... 生成多个版本 ...

# 2. 创建Midjourney分支
open-design execution branch create --instance character-artist --name concept-midjourney
# 执行Midjourney skill生成概念图
# ... 生成多个版本 ...

# 3. 对比两个分支的结果
open-design execution branch list --instance character-artist
open-design execution log --instance character-artist --skill character-concept-dalle
open-design execution log --instance character-artist --skill character-concept-midjourney

# 4. 选择满意的版本，切换到该分支
open-design execution branch switch --instance character-artist --name concept-dalle

# 5. 标记最终概念图
open-design execution tag create --instance character-artist --name v1.0-concept-final
```

#### Skill 2: 3D建模 (3D Modeling)

**模型实现 A**: 使用 Blender 自动建模
**模型实现 B**: 使用 Maya 自动建模

**版本管理作用：**

| 场景 | 版本控制操作 | 价值 |
|------|------------|------|
| 尝试不同的建模工具 | 创建分支 `model-blender` 和 `model-maya` | 对比不同工具的建模效果 |
| 建模过程中出现错误 | `execution undo` 撤销错误的建模步骤 | 避免浪费时间和资源 |
| 需要基于概念图调整模型 | `execution checkout` 回到概念图版本 | 确保模型符合设计 |
| 建模完成需要保存进度 | `execution stash save` 暂存当前建模状态 | 临时保存，可以切换其他任务 |

**实际工作流：**
```bash
# 1. 基于概念图创建建模分支
open-design execution branch create --instance character-artist --name model-blender
# 执行Blender建模skill
# ... 建模过程 ...

# 2. 如果建模不满意，撤销
open-design execution undo --instance character-artist --steps 1

# 3. 尝试Maya建模
open-design execution branch create --instance character-artist --name model-maya
# 执行Maya建模skill
# ... 建模过程 ...

# 4. 建模完成，打标签
open-design execution tag create --instance character-artist --name v1.0-model-final
```

#### Skill 3: 纹理生成 (Texture Generation)

**模型实现 A**: 使用 Stable Diffusion 生成纹理
**模型实现 B**: 使用专业纹理软件生成纹理

**版本管理作用：**

| 场景 | 版本控制操作 | 价值 |
|------|------------|------|
| 尝试不同的纹理风格 | 创建分支 `texture-sd` 和 `texture-pro` | 探索多种纹理风格 |
| 纹理生成失败 | `execution undo` 撤销失败的生成 | 快速回退，重新尝试 |
| 需要对比不同纹理版本 | `execution checkout` 切换到不同纹理版本 | 直观对比效果 |
| 纹理满意但需要调整模型 | `execution stash save` 暂存纹理 | 保存纹理，调整模型后再恢复 |

**实际工作流：**
```bash
# 1. 基于模型创建纹理分支
open-design execution branch create --instance character-artist --name texture-sd
# 执行Stable Diffusion纹理生成skill
# ... 纹理生成过程 ...

# 2. 如果纹理不满意，撤销
open-design execution undo --instance character-artist --steps 1

# 3. 尝试专业纹理软件
open-design execution branch create --instance character-artist --name texture-pro
# 执行专业纹理软件skill
# ... 纹理生成过程 ...

# 4. 纹理完成，打标签
open-design execution tag create --instance character-artist --name v1.0-texture-final
```

#### Skill 4: 动画制作 (Animation)

**模型实现 A**: 使用 AI 动画生成
**模型实现 B**: 使用传统动画工具

**版本管理作用：**

| 场景 | 版本控制操作 | 价值 |
|------|------------|------|
| 尝试不同的动画风格 | 创建分支 `anim-ai` 和 `anim-traditional` | 探索不同动画风格 |
| 动画效果不理想 | `execution undo` 撤销动画生成 | 快速调整参数重新生成 |
| 需要基于不同模型制作动画 | `execution checkout` 切换到不同模型版本 | 确保动画匹配模型 |
| 动画满意但需要调整纹理 | `execution stash save` 暂存动画 | 保存动画，调整纹理后再恢复 |

**实际工作流：**
```bash
# 1. 基于纹理创建动画分支
open-design execution branch create --instance character-artist --name anim-ai
# 执行AI动画生成skill
# ... 动画生成过程 ...

# 2. 如果动画不满意，撤销
open-design execution undo --instance character-artist --steps 1

# 3. 尝试传统动画工具
open-design execution branch create --instance character-artist --name anim-traditional
# 执行传统动画工具skill
# ... 动画制作过程 ...

# 4. 动画完成，打标签
open-design execution tag create --instance character-artist --name v1.0-anim-final
```

### 完整资产生产流程的版本管理

#### 场景：多skill协作，需要整合不同skill的输出

**问题**：概念图、模型、纹理、动画分别在不同分支上，需要整合到最终版本。

**解决方案**：使用分支合并

```bash
# 1. 创建主分支
open-design execution branch create --instance character-artist --name main

# 2. 合并概念图分支
open-design execution merge --instance character-artist --source concept-dalle --target main

# 3. 合并建模分支
open-design execution merge --instance character-artist --source model-blender --target main

# 4. 合并纹理分支
open-design execution merge --instance character-artist --source texture-sd --target main

# 5. 合并动画分支
open-design execution merge --instance character-artist --source anim-ai --target main

# 6. 标记最终资产版本
open-design execution tag create --instance character-artist --name v1.0-character-final
```

#### 场景：某个skill的模型实现升级

**问题**：Stable Diffusion升级到新版本，需要重新生成纹理，但保留历史版本。

**解决方案**：使用分支和标签

```bash
# 1. 创建新分支使用新模型
open-design execution branch create --instance character-artist --name texture-sd-v2

# 2. 执行新模型纹理生成
# ... 使用新模型生成纹理 ...

# 3. 对比新旧版本
open-design execution log --instance character-artist --skill texture-generation-sd
open-design execution log --instance character-artist --skill texture-generation-sd-v2

# 4. 如果新版本更好，合并到主分支
open-design execution merge --instance character-artist --source texture-sd-v2 --target main

# 5. 为旧版本打标签保留
open-design execution tag create --instance character-artist --name v1.0-texture-sd-v1 --commit <old-commit-id>
```

### 版本管理在资产生产中的核心价值

1. **并行探索**：不同模型实现可以在不同分支上并行测试，互不干扰
2. **快速回退**：AI生成结果不满意时，可以快速撤销，节省成本
3. **版本对比**：可以随时切换到历史版本进行对比，选择最佳方案
4. **里程碑标记**：为重要版本打标签，方便快速定位
5. **协作整合**：多个skill的输出可以通过分支合并整合到最终版本
6. **模型升级**：模型升级时可以保留历史版本，便于回滚和对比
7. **进度管理**：使用暂存功能管理多个并行任务
8. **历史追溯**：完整的执行历史记录，便于问题排查和经验总结

---

## 同一资产的多Skill多模型版本管理优势

本章节以"角色配图"这一具体资产为例，详细说明不同skill搭配不同模型实现时，版本管理的优势。

### 场景：角色配图资产生产

**目标**：生产一个高质量的角色配图，涉及多个skill，每个skill有多个模型实现可选。

#### Skill与模型实现矩阵

| Skill | 模型实现 A | 模型实现 B | 模型实现 C |
|-------|-----------|-----------|-----------|
| **角色概念设计** | DALL-E 3 | Midjourney | Stable Diffusion XL |
| **角色建模** | Blender Auto | Maya Auto | 3ds Max Auto |
| **纹理生成** | Stable Diffusion | 专业纹理软件 | AI纹理生成器 |
| **光照渲染** | Unreal Engine | Unity | Blender Cycles |
| **后期处理** | AI增强 | 传统后期处理 | 混合方案 |

#### 版本管理优势详解

##### 优势1：系统化探索所有组合

**问题**：5个skill × 3个模型实现 = 243种可能的组合，如何系统化探索？

**版本管理解决方案：**

```bash
# 创建三维分支结构：skill分支 × 模型分支
# 第一层：skill分支
open-design execution branch create --instance character-artist --name concept
open-design execution branch create --instance character-artist --name modeling
open-design execution branch create --instance character-artist --name texture
open-design execution branch create --instance character-artist --name lighting
open-design execution branch create --instance character-artist --name post-process

# 第二层：在concept分支下创建模型分支
open-design execution branch switch --instance character-artist --name concept
open-design execution branch create --instance character-artist --name dalle3
open-design execution branch create --instance character-artist --name midjourney
open-design execution branch create --instance character-artist --name sdxl

# 执行skill并记录结果
# ... 在每个分支执行对应的skill ...
```

**优势**：
- 有组织的分支结构，清晰记录每种组合
- 可以快速定位到任意skill的任意模型实现
- 避免混乱的文件命名和手动管理

##### 优势2：快速对比同一skill的不同模型

**问题**：DALL-E 3、Midjourney、SDXL哪个更适合这个角色？

**版本管理解决方案：**

```bash
# 切换到concept分支
open-design execution branch switch --instance character-artist --name concept

# 切换到DALL-E 3分支查看结果
open-design execution branch switch --instance character-artist --name dalle3
open-design execution log --instance character-artist --skill concept-dalle3

# 切换到Midjourney分支查看结果
open-design execution branch switch --instance character-artist --name midjourney
open-design execution log --instance character-artist --skill concept-midjourney

# 切换到SDXL分支查看结果
open-design execution branch switch --instance character-artist --name sdxl
open-design execution log --instance character-artist --skill concept-sdxl

# 对比三个分支的输出质量，选择最佳方案
```

**优势**：
- 一键切换，无需手动查找文件
- 执行历史自动记录，包含参数和结果
- 可以快速回溯到任意版本进行重新评估

##### 优势3：保存最优组合路径

**问题**：找到最优组合（DALL-E 3 + Blender + SDXL + Unreal + AI增强），如何保存这个完整路径？

**版本管理解决方案：**

```bash
# 为最优组合的每个skill打标签
open-design execution tag create --instance character-artist --name optimal-concept --commit <dalle3-commit-id>
open-design execution tag create --instance character-artist --name optimal-modeling --commit <blender-commit-id>
open-design execution tag create --instance character-artist --name optimal-texture --commit <sdxl-commit-id>
open-design execution tag create --instance character-artist --name optimal-lighting --commit <unreal-commit-id>
open-design execution tag create --instance character-artist --name optimal-post --commit <ai-enhance-commit-id>

# 为整个最优流程打标签
open-design execution tag create --instance character-artist --name v1.0-optimal-workflow
```

**优势**：
- 标签系统可以记录最优组合的完整路径
- 未来可以快速重现最优流程
- 便于团队共享最佳实践

##### 优势4：A/B测试不同组合

**问题**：想对比两种组合的效果：
- 组合A：DALL-E 3 + Blender + SDXL + Unreal + AI增强
- 组合B：Midjourney + Maya + 专业纹理 + Unity + 传统后期

**版本管理解决方案：**

```bash
# 创建组合A分支
open-design execution branch create --instance character-artist --name combo-a
# 执行组合A的skill序列
# ...

# 创建组合B分支
open-design execution branch create --instance character-artist --name combo-b
# 执行组合B的skill序列
# ...

# 对比两个分支的最终结果
open-design execution checkout --instance character-artist --commit <combo-a-final-commit>
open-design execution checkout --instance character-artist --commit <combo-b-final-commit>
```

**优势**：
- 分支隔离，两种组合互不干扰
- 可以快速切换对比最终效果
- 保留完整的执行历史，便于分析差异原因

##### 优势5：增量优化单个skill

**问题**：组合A效果不错，但想优化纹理生成部分，尝试SDXL的不同参数。

**版本管理解决方案：**

```bash
# 基于组合A创建纹理优化分支
open-design execution branch create --instance character-artist --name texture-optimization --from combo-a

# 在新分支上只执行纹理skill，尝试不同参数
# ... 执行多次纹理生成，调整参数 ...

# 如果优化成功，合并回组合A
open-design execution merge --instance character-artist --source texture-optimization --target combo-a

# 如果优化失败，直接切回组合A
open-design execution branch switch --instance character-artist --name combo-a
```

**优势**：
- 可以单独优化某个skill而不影响其他skill
- 优化失败可以快速回退
- 优化成功可以合并到主流程

##### 优势6：模型升级时的平滑过渡

**问题**：Stable Diffusion升级到新版本，想测试新版本但保留旧版本作为备选。

**版本管理解决方案：**

```bash
# 创建新版本分支
open-design execution branch create --instance character-artist --name texture-sd-v2

# 在新分支上使用新模型
# ... 执行纹理生成 ...

# 对比新旧版本
open-design execution log --instance character-artist --skill texture-sd-v1
open-design execution log --instance character-artist --skill texture-sd-v2

# 如果新版本更好，合并到主分支
open-design execution merge --instance character-artist --source texture-sd-v2 --target main

# 保留旧版本作为备选
open-design execution tag create --instance character-artist --name backup-sd-v1 --commit <old-commit-id>
```

**优势**：
- 平滑过渡，新旧版本并存
- 可以随时回退到旧版本
- 保留完整的对比历史

##### 优势7：成本控制和资源管理

**问题**：AI生成成本高，如何避免重复生成相同组合？

**版本管理解决方案：**

```bash
# 查看执行历史，避免重复
open-design execution log --instance character-artist --skill concept-dalle3

# 如果发现已有满意的版本，直接checkout
open-design execution checkout --instance character-artist --commit <existing-commit-id>

# 如果需要重新生成，先撤销之前的不满意版本
open-design execution undo --instance character-artist --steps 1
```

**优势**：
- 执行历史记录避免重复工作
- 撤销功能快速回退，节省成本
- 可以复用已有的满意版本

##### 优势8：团队协作和知识共享

**问题**：团队成员如何共享最优组合和经验？

**版本管理解决方案：**

```bash
# 团队成员A找到最优组合
open-design execution tag create --instance character-artist --name team-best-practice

# 团队成员B查看最优组合
open-design execution tag list --instance character-artist
open-design execution log --instance character-artist --skill concept-dalle3 --limit 10

# 团队成员B基于最优组合进行改进
open-design execution branch create --instance character-artist --name improvement --from team-best-practice
```

**优势**：
- 标签系统便于团队共享最佳实践
- 执行历史记录便于知识传递
- 分支系统支持协作改进

### 多Skill多模型版本管理的核心优势总结

| 优势维度 | 具体价值 | 版本管理功能 |
|---------|---------|------------|
| **系统化探索** | 有组织地探索所有可能的skill+模型组合 | 分支管理 |
| **快速对比** | 一键切换对比同一skill的不同模型 | checkout + log |
| **路径保存** | 记录最优组合的完整skill路径 | 标签系统 |
| **A/B测试** | 隔离测试不同组合的效果 | 分支隔离 |
| **增量优化** | 单独优化某个skill而不影响整体 | 分支 + merge |
| **平滑升级** | 模型升级时保留旧版本作为备选 | 分支 + 标签 |
| **成本控制** | 避免重复生成，快速回退 | log + undo |
| **团队协作** | 共享最优组合和执行历史 | 标签 + 分支 |

### 实际应用建议

1. **建立分支命名规范**：`<skill>-<model>-<version>` 或 `<combo-name>-<purpose>`
2. **使用标签标记里程碑**：`v<major>.<minor>-<skill>-<model>`
3. **定期清理废弃分支**：使用 `branch delete` 保持分支库整洁
4. **记录重要决策**：在commit message中说明选择某个模型的原因
5. **建立最佳实践库**：为常用组合打标签，便于快速复用

---

## User Features (Complete List)

| User Action | Description | Filesystem | libsql | CLI Command |
|------------|-------------|-----------|--------|-------------|
| **查看执行历史** | 查看技能执行的历史记录 | ✅ | ✅ | `execution log` |
| **撤销操作** | 撤回最近的执行步骤 | ✅ | ✅ | `execution undo` |
| **重做操作** | 恢复已撤销的操作 | ✅ | ✅ | `execution redo` |
| **切换到指定版本** | 回到任意历史执行状态 | ✅ | ✅ | `execution checkout` |
| **创建分支** | 创建新的开发分支进行实验 | ✅ | ✅ | `execution branch create` |
| **切换分支** | 在不同分支间切换 | ✅ | ✅ | `execution branch switch` |
| **查看分支** | 列出所有分支 | ✅ | ✅ | `execution branch list` |
| **删除分支** | 删除不需要的分支 | ✅ | ✅ | `execution branch delete` |
| **创建标签** | 为重要版本打标签 | ✅ | ✅ | `execution tag create` |
| **查看标签** | 列出所有标签 | ✅ | ✅ | `execution tag list` |
| **删除标签** | 删除不需要的标签 | ✅ | ✅ | `execution tag delete` |
| **暂存工作** | 保存当前工作状态 | ✅ | ✅ | `execution stash save` |
| **查看暂存** | 列出所有暂存记录 | ✅ | ✅ | `execution stash list` |
| **恢复暂存** | 恢复暂存的工作状态 | ✅ | ✅ | `execution stash apply` |
| **删除暂存** | 删除不需要的暂存 | ✅ | ✅ | `execution stash drop` |
| **合并分支** | 将一个分支合并到另一个分支 | ✅ | ⚠️ | `execution merge` |
| **变基操作** | 将提交重新应用到另一个分支 | ✅ | ⚠️ | `execution rebase` |
| **添加远程仓库** | 添加远程版本库 | ✅ | ⚠️ | `execution remote add` |
| **查看远程仓库** | 列出所有远程仓库 | ✅ | ⚠️ | `execution remote list` |
| **推送到远程** | 将本地更改推送到远程 | ✅ | ⚠️ | `execution remote push` |
| **从远程拉取** | 从远程仓库拉取更改 | ✅ | ⚠️ | `execution remote pull` |

**图例:**
- ✅ 完全支持
- ⚠️ 部分支持（仅文件系统后端）
- ❌ 不支持

---

## Technical Implementation Details

### CLI Commands Support

| Command | Subcommand | Filesystem | libsql | Backend Option |
|---------|-----------|-----------|--------|----------------|
| execution | log | ✅ | ✅ | ✅ |
| execution | undo | ✅ | ✅ | ✅ |
| execution | redo | ✅ | ✅ | ✅ |
| execution | checkout | ✅ | ✅ | ✅ |
| execution | branch create | ✅ | ✅ | ✅ |
| execution | branch switch | ✅ | ✅ | ✅ |
| execution | branch list | ✅ | ✅ | ✅ |
| execution | branch delete | ✅ | ✅ | ✅ |
| execution | tag create | ✅ | ✅ | ✅ |
| execution | tag list | ✅ | ✅ | ✅ |
| execution | tag delete | ✅ | ✅ | ✅ |
| execution | stash save | ✅ | ✅ | ✅ |
| execution | stash list | ✅ | ✅ | ✅ |
| execution | stash apply | ✅ | ✅ | ✅ |
| execution | stash drop | ✅ | ✅ | ✅ |
| execution | merge | ✅ | ❌ | ❌ |
| execution | rebase | ✅ | ❌ | ❌ |
| execution | remote add | ✅ | ❌ | ❌ |
| execution | remote list | ✅ | ❌ | ❌ |
| execution | remote push | ✅ | ❌ | ❌ |
| execution | remote pull | ✅ | ❌ | ❌ |

### Manager Classes

| Manager | Filesystem Implementation | libsql Implementation | Status |
|---------|-------------------------|---------------------|--------|
| CommitManager | commit-manager.ts | commit-manager-db.ts | ✅ |
| BranchManager | branch-manager.ts | branch-manager-db.ts | ✅ |
| TagManager | tag-manager.ts | tag-manager-db.ts | ✅ |
| StashManager | stash-manager.ts | stash-manager-db.ts | ✅ |
| UndoRedoManager | undo-redo-manager.ts | undo-redo-manager-db.ts | ✅ |
| MergeManager | merge-manager.ts | - | ⚠️ |
| RebaseManager | rebase-manager.ts | - | ⚠️ |
| RemoteManager | remote-manager.ts | - | ⚠️ |
| DatabaseManager | - | database-manager.ts | ✅ |

### Database Schema (libsql)

| Table | Purpose | Status |
|-------|---------|--------|
| commits | 存储执行提交记录 | ✅ |
| output_data | 存储输出数据 | ✅ |
| branches | 存储分支引用 | ✅ |
| tags | 存储标签引用 | ✅ |
| stashes | 存储暂存条目 | ✅ |
| reflog | 存储操作历史 | ✅ |
| remotes | 存储远程仓库配置 | ✅ |
| merge_state | 存储合并状态 | ✅ |

### Test Coverage

| Component | Unit Tests | Integration Tests | Status |
|-----------|-----------|------------------|--------|
| DatabaseManager | ✅ | ❌ | ✅ |
| CommitManager (libsql) | ✅ | ❌ | ✅ |
| CommitManager (FS) | ❌ | ❌ | ⏳ |
| BranchManager (FS) | ❌ | ❌ | ⏳ |
| BranchManager (libsql) | ❌ | ❌ | ⏳ |
| TagManager (FS) | ❌ | ❌ | ⏳ |
| TagManager (libsql) | ❌ | ❌ | ⏳ |
| StashManager (FS) | ❌ | ❌ | ⏳ |
| StashManager (libsql) | ❌ | ❌ | ⏳ |
| UndoRedoManager (FS) | ❌ | ❌ | ⏳ |
| UndoRedoManager (libsql) | ❌ | ❌ | ⏳ |
| CLI Commands | ❌ | ❌ | ⏳ |

## Known Limitations

1. **合并/变基/远程仓库不支持libsql**: 这些管理器与文件系统管理器紧密耦合。要支持libsql，需要重构以接受通用接口。

2. **libsql缺少HEAD跟踪**: 当前libsql实现没有单独的HEAD表。当前提交由最新时间戳确定。可以改进以获得更好的Git行为。

3. **没有迁移脚本**: 没有从文件系统到libsql后端的自动迁移。如果切换后端，用户需要手动迁移数据。

4. **不支持远程libsql**: 虽然DatabaseManager支持远程libsql URL，但CLI命令尚未公开此选项。

## Future Enhancements

- [ ] 添加HEAD表以更好地跟踪当前提交
- [ ] 实现数据迁移脚本（文件系统 → libsql）
- [ ] 在CLI中添加远程libsql URL支持
- [ ] 重构MergeManager以支持libsql
- [ ] 重构RebaseManager以支持libsql
- [ ] 重构RemoteManager以支持libsql
- [ ] 添加全面的单元测试
- [ ] 添加集成测试
- [ ] 添加CLI命令的端到端测试
- [ ] 性能基准测试（文件系统 vs libsql）
