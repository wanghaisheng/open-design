# 游戏开发策划领域 RAMS 角色体系分析

基于 Godogen 架构和 RAMS/Open Design 框架提取的游戏开发策划领域角色体系。

---

## 一、Godogen 管道阶段能力分析

### 阶段 1：Visual Target（视觉目标）
**核心能力需求：**
- 视觉概念设计能力
- 艺术方向设定
- 图像生成提示词工程
- 视觉风格一致性把控

**关键决策：**
- 参考图像生成成本（7¢）
- 艺术风格选择（写实/卡通/抽象等）
- 视觉锚点设定（影响后续所有决策）

**潜在角色：** 视觉设计师、艺术总监

---

### 阶段 2：Decomposition（分解）
**核心能力需求：**
- 技术风险评估
- 实现难度分析
- 验证标准定义
- 任务优先级排序

**关键决策：**
- 风险任务识别（程序化生成、自定义物理、复杂着色器）
- 主构建任务合并（常规功能一次性实现）
- PLAN.md 输出（风险任务 vs 主构建）

**潜在角色：** 技术策划、系统架构师

---

### 阶段 3：Architecture（架构）
**核心能力需求：**
- 场景层次结构设计
- 脚本职责划分
- 信号流设计
- 物理层配置
- 输入映射设计
- Godot C# 项目骨架生成
- 版本敏感字段配置（config_version、Godot.NET.Sdk、TargetFramework）

**关键决策：**
- 场景构建顺序
- 资产提示规划
- STRUCTURE.md 输出（完整架构蓝图）

**潜在角色：** 技术架构师、Godot 程序员

---

### 阶段 4：Asset Generation（资产生成）
**核心能力需求：**
- 视觉资产需求分析
- 成本预算管理
- 图像后端选择（Gemini 5-15¢ vs xAI Grok 2¢）
- 3D 模型转换（Tripo3D）
- 动画生成（xAI Grok Video）
- 网格切片（物品包）
- 背景移除（BiRefNet）
- 循环帧检测

**关键决策：**
- 成本优化（视觉影响优先级）
- 图像后端选择（精确 vs 快速）
- 3D 模型质量预设（default 30¢ vs hd 60¢）
- 角色绑定决策（biped rigging +25¢）
- ASSETS.md 输出（资产清单 + 尺寸 + 动画表）

**潜在角色：** 资产策划、技术美术

---

### 阶段 5：Task Execution（任务执行）
**核心能力需求：**
- 场景构建器脚本生成（C# headless programs）
- 运行时脚本编写（partial classes extending Godot node types）
- 编译验证（dotnet build）
- Godot headless 模式验证
- 测试工具编写
- 截图捕获
- Godot API 查询（850+ classes）
- Godot 引擎怪癖知识（SetScript()、MultiMeshInstance3D、Camera2D 等）

**关键决策：**
- 风险任务优先执行（隔离验证）
- 主构建一次性实现
- 构建时 vs 运行时代码分离
- 所有权链正确设置

**潜在角色：** Godot 程序员、技术美术、QA 工程师

---

### 阶段 6：Visual Quality Assurance（视觉质量保证）
**核心能力需求：**
- 多模态视觉分析（Gemini Flash / Claude Vision）
- 静态模式分析（参考图 + 截图）
- 动态模式分析（参考图 + 帧序列 2 FPS）
- 问题模式分析（自由提问）
- 视觉缺陷检测（z-fighting、纹理拉伸、裁剪、悬浮物体）
- 渲染错误检测（缺失纹理、剔除错误、光照泄漏）
- 实现捷径检测（网格化放置、统一缩放）
- 运动异常检测（卡顿实体、抖动、滑动动画、物理爆炸）

**关键决策：**
- QA 模式选择（静态/动态/问题）
- 后端选择（Gemini Flash / Claude Native / Both）
- 修复循环决策（进度 vs 重复）
- 架构问题升级决策

**潜在角色：** 视觉 QA 工程师、技术美术

---

### 阶段 7：Orchestration（编排）
**核心能力需求：**
- 管道序列管理
- 恢复逻辑处理（PLAN.md 存在时跳过到任务执行）
- 进度通信（Telegram/Slack/其他服务）
- 元决策（何时重新规划、何时重新脚手架、何时重新生成资产）
- 上下文卫生（文件状态持久化：PLAN.md、STRUCTURE.md、MEMORY.md、ASSETS.md）
- 最终任务：演示视频生成（~30秒电影级 MP4）

**关键决策：**
- 上下文压缩时的状态恢复
- 用户进度通知频率
- 失败时的回滚策略

**潜在角色：** 项目经理、技术总监

---

## 二、Python 工具脚本能力映射

### 资产生成工具（asset_gen.py）
**RAMS Skill 实现渠道：软件工具渠道**

- **图像生成**
  - 后端：Gemini（5-15¢）、xAI Grok（2¢）
  - 配置：尺寸（512/1K/2K/4K）、宽高比、image-to-image 编辑
  - Skill：`generate_image_asset`

- **视频生成**
  - 后端：xAI Grok Video（5¢/sec）
  - 配置：时长（1-15秒）、分辨率（480p/720p）
  - Skill：`generate_animated_sprite`

- **3D 模型转换**
  - 后端：Tripo3D
  - 配置：质量预设（default 30¢ / hd 60¢）、面数限制、PBR 开关
  - Skill：`convert_image_to_3d_model`

- **角色绑定**
  - 后端：Tripo3D biped rigging
  - 配置：质量预设 + rigging（+25¢）
  - Skill：`rig_character_model`

- **动画重定向**
  - 后端：Tripo3D retargeting
  - 配置：预设动画（preset:biped:*）
  - Skill：`retarget_animation`

- **预算管理**
  - 功能：成本追踪、预算检查、日志记录
  - Skill：`manage_asset_budget`

---

### 图像处理工具

#### find_loop_frame.py
**RAMS Skill 实现渠道：软件工具渠道**

- **功能**：视频循环帧检测
- **算法**：7帧窗口相似度分析、去重、选择最远的高质量匹配
- **配置**：跳过帧数、最小间隔、Top K
- **Skill：`detect_video_loop_point`

#### grid_slice.py
**RAMS Skill 实现渠道：软件工具渠道**

- **功能**：网格图像切片
- **用途**：物品包拆分（sword, shield, potion, helm）
- **配置**：网格布局（2x2, 3x3）、自定义命名
- **Skill：`slice_grid_assets`

#### rembg_matting.py
**RAMS Skill 实现渠道：软件工具渠道**

- **功能**：背景移除（BiRefNet 软遮罩 + 颜色抠图）
- **模式**：trust（信任遮罩）、adapt（自适应）、color（仅颜色）
- **特性**：GPU 加速（CUDA）、批量处理、QA 预览生成
- **Skill：`remove_background`

---

### Godot 工具

#### godot_api_converter.py
**RAMS Skill 实现渠道：软件工具渠道**

- **功能**：Godot API XML 转 Markdown
- **配置**：描述模式（none/first/brief/full）、语言（GDScript/C#）
- **输出**：统一 API 参考（128 类 ~64k tokens）或分文件
- **Skill：`convert_godot_api_docs`

#### class_list.py
**RAMS Skill 实现渠道：软件工具渠道**

- **功能**：Godot 类分类
- **列表**：
  - CLASS_SCENE（场景生成优化，115 类）
  - CLASS_SCRIPT（脚本生成优化，290 类）
  - CLASS_UNIFIED（统一列表，99% 场景 / 95% 脚本覆盖，148 类）
  - PRIORITY_CLASSES（优先类，454 类）
- **Skill：`classify_godot_classes`

---

### 视觉 QA 工具（visual_qa.py）
**RAMS Skill 实现渠道：AI 模型渠道 + 软件工具渠道**

- **静态模式**：参考图 + 单个游戏截图
- **动态模式**：参考图 + 帧序列（2 FPS 采样）
- **问题模式**：自由提问 + 任意数量截图
- **后端**：Gemini Flash（默认）、Claude Native、Both
- **配置**：任务上下文、模型选择、日志记录
- **Skill：`visual_quality_assurance`

---

## 三、核心角色提取

基于以上分析，提取以下核心角色：

### 1. 视觉设计师（Visual Designer）
**Soul 特质：**
- 视觉敏感度高，注重细节
- 艺术风格一致性把控能力强
- 成本意识强（选择合适的图像后端）
- 善于用视觉锚点指导后续决策

**Skills：**
- `generate_visual_reference`（AI 模型渠道：Gemini/Grok）
- `design_art_direction`（AI 模型渠道）
- `maintain_visual_consistency`（AI 模型渠道）

---

### 2. 技术策划（Technical Designer）
**Soul 特质：**
- 风险优先思维（识别真正的技术风险）
- 务实决策（常规功能合并实现）
- 验证标准清晰
- 善于将复杂问题分解

**Skills：**
- `assess_implementation_risks`（AI 模型渠道）
- `define_verification_criteria`（AI 模型渠道）
- `create_task_plan`（AI 模型渠道）
- `prioritize_tasks`（AI 模型渠道）

---

### 3. 技术架构师（Technical Architect）
**Soul 特质：**
- 系统思维强
- Godot 架构知识深厚
- 版本敏感（Godot/.NET 版本适配）
- 文档化能力强（STRUCTURE.md）

**Skills：**
- `design_scene_hierarchy`（AI 模型渠道）
- `define_script_responsibilities`（AI 模型渠道）
- `design_signal_flow`（AI 模型渠道）
- `configure_physics_layers`（AI 模型渠道）
- `design_input_mapping`（AI 模型渠道）
- `generate_godot_project_skeleton`（软件工具渠道：dotnet）
- `query_godot_api`（软件工具渠道：godot_api_converter.py）

---

### 4. 资产策划（Asset Planner）
**Soul 特质：**
- 预算意识极强（成本优化）
- 视觉影响优先级判断准确
- 多后端选择能力（Gemini vs Grok）
- 批量处理效率高

**Skills：**
- `analyze_asset_requirements`（AI 模型渠道）
- `manage_asset_budget`（软件工具渠道：asset_gen.py）
- `select_image_backend`（AI 模型渠道）
- `prioritize_asset_generation`（AI 模型渠道）
- `generate_asset_manifest`（AI 模型渠道）

---

### 5. 技术美术（Technical Artist）
**Soul 特质：**
- 跨领域能力（美术 + 技术）
- 图像处理专业知识
- 3D 资产生成经验
- 动画处理能力

**Skills：**
- `generate_image_asset`（软件工具渠道：asset_gen.py）
- `generate_animated_sprite`（软件工具渠道：asset_gen.py）
- `convert_image_to_3d_model`（软件工具渠道：asset_gen.py）
- `rig_character_model`（软件工具渠道：asset_gen.py）
- `retarget_animation`（软件工具渠道：asset_gen.py）
- `remove_background`（软件工具渠道：rembg_matting.py）
- `slice_grid_assets`（软件工具渠道：grid_slice.py）
- `detect_video_loop_point`（软件工具渠道：find_loop_frame.py）

---

### 6. Godot 程序员（Godot Programmer）
**Soul 特质：**
- Godot C# 专业知识深厚
- Godot 引擎怪癖知识丰富
- 构建时/运行时分离意识强
- API 查询效率高

**Skills：**
- `generate_scene_builder_script`（AI 模型渠道）
- `write_runtime_script`（AI 模型渠道）
- `compile_project`（软件工具渠道：dotnet build）
- `validate_project_headless`（软件工具渠道：godot --headless）
- `write_test_harness`（AI 模型渠道）
- `capture_screenshots`（软件工具渠道）
- `query_godot_api`（软件工具渠道：godot_api_converter.py）
- `apply_godot_quirks`（AI 模型渠道 - 编码知识）

---

### 7. 视觉 QA 工程师（Visual QA Engineer）
**Soul 特质：**
- 视觉缺陷敏感度高
- 多模态分析能力强
- 静态/动态模式切换灵活
- 问题定位准确

**Skills：**
- `visual_quality_assurance_static`（AI 模型渠道 + 软件工具渠道：visual_qa.py）
- `visual_quality_assurance_dynamic`（AI 模型渠道 + 软件工具渠道：visual_qa.py）
- `visual_quality_assurance_question`（AI 模型渠道 + 软件工具渠道：visual_qa.py）
- `detect_visual_defects`（AI 模型渠道）
- `detect_rendering_bugs`（AI 模型渠道）
- `detect_motion_anomalies`（AI 模型渠道）

---

### 8. 项目经理（Project Manager）
**Soul 特质：**
- 管道序列管理能力强
- 恢复逻辑清晰
- 进度沟通及时
- 元决策能力强

**Skills：**
- `orchestrate_pipeline`（AI 模型渠道）
- `handle_resume_logic`（AI 模型渠道）
- `communicate_progress`（软件工具渠道：Telegram/Slack API）
- `make_meta_decisions`（AI 模型渠道）
- `manage_context_hygiene`（软件工具渠道：文件系统）
- `generate_demo_video`（软件工具渠道：ffmpeg）

---

### 9. 系统架构师（System Architect）
**Soul 特质：**
- 全局视野
- 技术栈选择能力强
- 扩展性考虑周全
- 集成经验丰富

**Skills：**
- `design_technical_architecture`（AI 模型渠道）
- `select_tech_stack`（AI 模型渠道）
- `design_integration_points`（AI 模型渠道）
- `plan_scalability`（AI 模型渠道）

---

### 10. 游戏策划（Game Designer）
**Soul 特质：**
- 游戏设计理念清晰
- 玩法机制设计能力强
- 用户体验敏感
- 平衡性把控准确

**Skills：**
- `design_game_mechanics`（AI 模型渠道）
- `design_level_progression`（AI 模型渠道）
- `balance_gameplay`（AI 模型渠道）
- `design_user_experience`（AI 模型渠道）
- `create_game_design_document`（AI 模型渠道）

---

## 四、角色协作关系

```
视觉设计师 → 资产策划 → 技术美术
                ↓
技术策划 → 技术架构师 → Godot 程序员
                ↓
            视觉 QA 工程师
                ↑
            项目经理（全局编排）
                ↑
            系统架构师（技术指导）
                ↑
            游戏策划（需求输入）
```

**协作流程：**
1. 游戏策划定义需求
2. 视觉设计师生成视觉参考
3. 技术策划分析风险并制定计划
4. 技术架构师设计技术架构
5. 资产策划规划资产需求
6. 技术美术生成资产
7. Godot 程序员实现功能
8. 视觉 QA 工程师验证质量
9. 项目经理全程编排
10. 系统架构师提供技术指导

---

## 五、角色变体设计

### 变体维度

#### 1. 游戏类型变体
- **2D 游戏变体**：专注 2D 物理、Sprite、TileMap
- **3D 游戏变体**：专注 3D 物理、Mesh、着色器
- **VR 游戏变体**：专注 VR 交互、性能优化
- **移动游戏变体**：专注性能优化、触控输入

#### 2. 团队规模变体
- **独立开发者变体**：全能型、快速迭代
- **小团队变体**：协作型、分工明确
- **大团队变体**：专业化、流程化

#### 3. 项目阶段变体
- **原型阶段变体**：快速验证、低成本
- **开发阶段变体**：稳定开发、质量保证
- **发布阶段变体**：优化打磨、Bug 修复

---

## 六、下一步行动

1. 为每个角色创建完整的 Soul 定义文件
2. 为每个角色创建 Skills 配置文件（包括实现渠道）
3. 创建角色变体配置
4. 集成到 Open Design CLI 工具
5. 创建角色市场目录结构
