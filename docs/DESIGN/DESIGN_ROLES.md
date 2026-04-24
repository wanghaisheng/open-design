# Design Roles 说明

基于 Designpowers 项目分析，以下是设计角色（Agents）的详细说明以及它们与 Skills 的对应关系。

## Roles 概览（24个）

| Role | 职责 |
|-------|------|
| **design-strategist** | 上游设计思维 - 用户流程、IA、旅程映射、人物画像、设计原则 |
| **design-scout** | 竞争UX分析、设计基准、用户洞察综合、设计模式研究、无障碍审计 |
| **inspiration-scout** | 美学参考、交互示例、视觉灵感 |
| **design-lead** | 视觉设计执行 - 布局、色彩系统、排版、组件设计、响应式行为、交互模式、设计系统工作、AI交互设计 |
| **motion-designer** | 动画和动效设计 - 微交互、页面过渡、滚动驱动动画、加载状态、弹簧物理、缓动曲线、编排 |
| **content-writer** | UX写作、界面文案、标签、错误消息、空状态、引导文本、帮助文本、工具提示、alt文本、链接文本、表单说明 |
| **design-builder** | 生产就绪的原型和实现 - 组件组装、交互连接、API集成、项目脚手架、设计决策到工作软件的桥梁 |
| **accessibility-reviewer** | 无障碍设计合规评审 - WCAG、COGA、包容性设计原则（通用角色） |
| **cognitive-accessibility-specialist** | 认知无障碍专家 - 降低认知负荷、简化信息、错误预防 |
| **adaptive-interface-specialist** | 自适应界面专家 - 个性化定制、响应式无障碍、用户偏好 |
| **inclusive-researcher** | 包容性研究员 - 包容性用户画像、场景映射、边缘案例识别 |
| **heuristic-evaluator** | 启式评估 - Nielsen's 10可用性启发式、认知走查 |
| **design-critic** | 设计评审 - 对照原始计划、设计简报、设计原则评审 |
| **responsible-ai-specialist** | 负责任AI专家 - 护栏设计、偏见检测、价值对齐、透明度机制 |
| **ai-personality-designer** | AI个性设计师 - 个性设计、语调校准、行为一致性、情感设计 |
| **agent-orchestrator** | 智能体编排者 - 智能体角色设计、交接协议、人在回路、故障恢复 |
| **prompt-engineer** | 提示词工程师 - 系统提示词结构、思维链设计、上下文工程、模板设计 |
| **model-evaluation-specialist** | 模型评估专家 - AI启发式评估、输出质量评分、任务成功指标、用户满意度 |
| **rams-role-audition-specialist** | RAMS角色海选专家 - 角色海选测试、演员适配评分、任务级校验、适配度矩阵 |
| **rams-post-task-learning-specialist** | RAMS后置学习专家 - 任务日志分析、模式识别、技能提炼、角色进化 |
| **rams-orchestrator-specialist** | RAMS编排器专家 - 任务DAG解析、角色匹配、演员调度、记忆管理 |
| **rams-memory-management-specialist** | RAMS记忆管理专家 - 五层记忆架构、容量压缩、记忆协调、检索策略 |
| **rams-task-definition-specialist** | RAMS任务定义专家 - TDL设计、Schema定义、依赖建模、能力规范 |
| **rams-model-adaptation-specialist** | RAMS模型适配专家 - 统一API、模型适配、Soul微调、性能监控 |

## Skills × Roles Matrix

| Skill | design-strategist | design-scout | inspiration-scout | design-lead | motion-designer | content-writer | design-builder | accessibility-reviewer | cognitive-accessibility-specialist | adaptive-interface-specialist | inclusive-researcher | heuristic-evaluator | design-critic |
|-------|------------------|--------------|-------------------|-------------|-----------------|----------------|----------------|----------------------|--------------------------------|------------------------------|-------------------------|---------------------|---------------|
| **design-discovery** | ✅ | ✅ | | | | | | | | | | |
| **research-planning** | ✅ | ✅ | | | | | | | | ✅ | | |
| **inclusive-personas** | ✅ | | | | | | | | | | ✅ | |
| **inspiration-scouting** | | | ✅ | | | | | | | | | |
| **synthetic-user-testing** | | ✅ | | | | | | | | | | ✅ |
| **usability-testing** | | ✅ | | | | | | | | | | ✅ |
| **design-strategy** | ✅ | | | | | | | | | | | |
| **design-state** | ✅ | | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **design-memory** | ✅ | | | | | | | | | | | |
| **design-taste** | | | ✅ | ✅ | | | | | | | | ✅ |
| **taste-feedback** | | | | ✅ | | | | | | | | ✅ |
| **token-architecture** | | | | ✅ | | | ✅ | | | | | |
| **design-system-alignment** | | | | ✅ | | | ✅ | | | | | |
| **ui-composition** | | | | ✅ | | | | | | | | |
| **responsive-patterns** | | | | ✅ | | | ✅ | | | | | |
| **interaction-design** | | | | ✅ | ✅ | | ✅ | | | | | |
| **motion-choreography** | | | | | ✅ | | ✅ | | | | | |
| **voice-and-tone** | | | | | | ✅ | | | | | | |
| **writing-design-plans** | ✅ | | | | | ✅ | | | | | | |
| **accessible-content** | | | | | | ✅ | | ✅ | | | | |
| **cognitive-accessibility** | | | | | | | | ✅ | ✅ | | | |
| **adaptive-interfaces** | | | | ✅ | | | | ✅ | | ✅ | | |
| **design-debate** | ✅ | | | | | | | | | | | ✅ |
| **design-debt-tracker** | | | | | | | | | | | | ✅ |
| **design-retrospective** | | | | | | | | | | | | ✅ |
| **design-handoff** | | | | | | | ✅ | | | | | |
| **verification-before-shipping** | | | | | | | ✅ | ✅ | | | | ✅ |
| **using-designpowers** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Role 详细说明

### design-strategist
**职责范围：** 上游设计思维
- 用户流程设计
- 信息架构（IA）
- 旅程映射
- 人物画像开发
- 设计原则定义
- 体验映射
- 竞品定位

**核心 Skills：**
- design-discovery
- inclusive-personas
- design-strategy
- design-state
- design-memory
- design-debate
- research-planning
- writing-design-plans
- using-designpowers

### design-scout
**职责范围：** 竞争UX分析和设计研究
- 竞争UX分析
- 设计基准
- 用户洞察综合
- 设计模式研究
- 无障碍审计
- 趋势识别

**核心 Skills：**
- design-discovery
- research-planning
- synthetic-user-testing
- usability-testing
- using-designpowers

### inspiration-scout
**职责范围：** 美学参考和视觉灵感
- 美学研究
- 交互参考
- 跨领域灵感
- 品味感知策展
- 情绪板组装

**核心 Skills：**
- inspiration-scouting
- design-state
- design-taste
- using-designpowers

### design-lead
**职责范围：** 视觉设计执行
- 布局网格
- 色彩系统
- 排版系统
- 组件设计
- 响应式行为
- 交互模式
- 设计系统工作
- 自适应设计
- 工艺和品味
- AI交互设计（对话模式、生成式UI、反馈循环）

**核心 Skills：**
- design-state
- design-taste
- taste-feedback
- token-architecture
- design-system-alignment
- ui-composition
- responsive-patterns
- interaction-design
- adaptive-interfaces
- conversation-patterns
- generative-ui
- feedback-loops
- mixed-initiative-flow
- progressive-disclosure
- multimodal-orchestration
- context-window-design
- using-designpowers

### motion-designer
**职责范围：** 动画和动效设计
- 微交互
- 页面过渡
- 滚动驱动动画
- 加载状态
- 弹簧物理
- 缓动曲线
- 编排
- 减少运动替代方案
- 性能

**核心 Skills：**
- design-state
- interaction-design
- motion-choreography
- using-designpowers

### content-writer
**职责范围：** UX写作和界面文案
- 界面标签
- 错误消息
- 空状态
- 帮助文本
- 引导文本
- 工具提示
- alt文本
- 链接文本
- 表单说明
- 内容审查

**核心 Skills：**
- design-state
- voice-and-tone
- writing-design-plans
- accessible-content
- using-designpowers

### design-builder
**职责范围：** 生产就绪的原型和实现
- 组件实现
- 页面组装
- 交互连接
- 原型构建
- 设计到代码翻译
- 渐进增强
- 性能优化

**核心 Skills：**
- design-state
- token-architecture
- design-system-alignment
- responsive-patterns
- interaction-design
- motion-choreography
- design-handoff
- verification-before-shipping
- using-designpowers

### accessibility-reviewer
**职责范围：** 无障碍设计合规评审（通用角色）
- WCAG评估
- 内容无障碍
- 交互无障碍
- 无障碍策略
- 整体无障碍合规性
- 角色协调

**核心 Skills：**
- design-state
- accessible-content
- cognitive-accessibility
- adaptive-interfaces
- verification-before-shipping
- using-designpowers

**角色协作：**
- 协调cognitive-accessibility-specialist进行深入认知无障碍分析
- 协调adaptive-interface-specialist进行自适应界面设计
- 协调inclusive-researcher进行包容性用户研究

### cognitive-accessibility-specialist
**职责范围：** 认知无障碍专家
- 认知负荷评估
- 记忆负荷减少
- 平实语言设计
- 注意力聚焦设计
- 错误预防和恢复
- 寻路导航优化

**核心 Skills：**
- cognitive-load-assessment
- memory-load-reduction
- plain-language-design
- focus-attention-design
- error-prevention-recovery
- wayfinding-navigation
- design-state

### adaptive-interface-specialist
**职责范围：** 自适应界面专家
- 色彩独立性
- 灵活排版
- 信息密度管理
- 简化视图
- 用户偏好尊重
- 响应式无障碍

**核心 Skills：**
- colour-independence
- flexible-typography
- information-density
- simplified-views
- user-preference-respect
- responsive-accessibility
- design-state

### inclusive-researcher
**职责范围：** 包容性研究员
- 残障包容性用户画像
- 包容性用户故事
- 能力谱映射
- 情境性障碍映射
- 辅助技术场景
- 边缘案例识别

**核心 Skills：**
- disability-inclusive-personas
- inclusive-user-stories
- ability-spectrum-mapping
- situational-impairment-mapping
- assistive-technology-scenarios
- edge-case-identification
- research-planning
- design-state

### heuristic-evaluator
**职责范围：** 启发式评估
- 启发式评估（Nielsen's 10）
- 认知走查
- 错误路径分析
- 可学性评估
- 效率评估

**核心 Skills：**
- synthetic-user-testing
- usability-testing
- verification-before-shipping
- using-designpowers

### design-critic
**职责范围：** 设计评审
- 计划对齐
- 简报对齐
- 原则遵循
- 一致性
- 用户画像覆盖
- 差距识别
- 工艺质量

**核心 Skills：**
- design-state
- design-taste
- taste-feedback
- design-debate
- design-debt-tracker
- design-retrospective
- design-memory
- using-designpowers

### responsible-ai-specialist
**职责范围：** 负责任AI专家
- 设计AI行为护栏和安全边界
- 检测和缓解AI系统中的偏见
- 预判和防范AI可能造成的伤害
- 设计透明度机制，建立用户信任
- 定义AI系统的价值规范和伦理约束
- 设计升级路径，处理超出AI能力的情况
- 确保用户同意和代理权得到尊重

**核心 Skills：**
- guardrail-design
- bias-detection-design
- harm-anticipation
- transparency-patterns
- value-specification
- escalation-design
- consent-and-agency

**角色协作：**
- 与design-lead协作，确保交互模式符合安全要求
- 与AI个性设计师协作，确保个性设计符合伦理标准
- 与智能体编排者协作，确保智能体行为对齐
- 与提示词工程师协作，确保提示词包含对齐约束
- 与模型评估专家协作，评估AI系统的对齐程度

### ai-personality-designer
**职责范围：** AI个性设计师
- 设计AI个性架构，定义核心特质
- 校准AI语调，确保适合不同情境
- 确保AI行为一致性，避免随机漂移
- 设计情感表达，让AI有适当的情感智能
- 设计领域语调，适应不同专业领域
- 设计错误个性，让AI在错误时保持个性
- 确保文化适应，尊重不同文化背景

**核心 Skills：**
- persona-architecture
- tone-calibration
- behavioral-consistency
- emotional-design
- domain-voice
- error-personality
- cultural-adaptation

**角色协作：**
- 与负责任AI专家协作，确保个性设计符合伦理标准
- 与design-lead协作，确保个性在交互中体现
- 与提示词工程师协作，将个性嵌入提示词
- 与智能体编排者协作，确保多智能体个性协调

### agent-orchestrator
**职责范围：** 智能体编排者
- 设计智能体角色，明确每个智能体的职责和边界
- 设计交接协议，确保智能体之间平滑过渡
- 设计人在回路流程，保持人类最终控制权
- 设计故障恢复机制，确保系统可靠性
- 设计可观测性，让系统行为透明可见
- 设计状态管理，确保智能体共享正确上下文
- 设计任务分解，将复杂任务分配给合适的智能体

**核心 Skills：**
- agent-role-design
- handoff-protocols
- human-in-the-loop
- failure-recovery
- observability-design
- state-management
- task-decomposition

**角色协作：**
- 与负责任AI专家协作，确保智能体行为对齐
- 与design-lead协作，设计智能体与用户的交互
- 与AI个性设计师协作，确保智能体个性协调
- 与提示词工程师协作，优化智能体提示词

### prompt-engineer
**职责范围：** 提示词工程师
- 设计系统提示词结构，定义AI身份和行为
- 设计思维链模式，引导AI逐步推理
- 设计上下文工程，优化AI理解能力
- 设计约束规范，明确AI行为边界
- 设计少样本模式，通过示例引导AI
- 设计提示词模板，提高复用性
- 管理提示词版本，追踪变更和效果

**核心 Skills：**
- system-prompt-structure
- chain-of-thought-design
- context-engineering
- constraint-specification
- few-shot-patterns
- template-design
- prompt-versioning

**角色协作：**
- 与负责任AI专家协作，在提示词中嵌入对齐约束
- 与AI个性设计师协作，将个性嵌入提示词
- 与design-lead协作，优化提示词以支持交互模式
- 与智能体编排者协作，设计智能体特定的提示词

### model-evaluation-specialist
**职责范围：** 模型评估专家
- 设计AI启发式评估，评估AI产品可用性
- 设计输出质量评分，评估AI输出质量
- 设计任务成功指标，衡量AI任务完成度
- 收集和分析用户满意度信号
- 进行比较评估，对比不同AI方案
- 设计失败分类，分析AI失败模式
- 进行纵向测量，追踪AI长期表现

**核心 Skills：**
- heuristic-evaluation-ai
- output-quality-rubrics
- task-success-metrics
- user-satisfaction-signals
- comparative-evaluation
- failure-taxonomy
- longitudinal-measurement

**角色协作：**
- 与负责任AI专家协作，评估AI对齐程度
- 与design-lead协作，评估交互效果
- 与AI个性设计师协作，评估个性表现
- 与智能体编排者协作，评估系统协作效果

### rams-role-audition-specialist
**职责范围：** RAMS角色海选专家
- 设计角色海选测试集，评估（角色, 演员）组合表现
- 计算演员适配分，动态更新信誉系统
- 执行任务级校验，验证输出质量
- 分析角色市场评价，收集用户反馈
- 生成适配度矩阵，支持编排器智能调度
- 设计评估指标，平衡质量、成本、延迟
- 追踪演员历史表现，识别趋势和异常

**核心 Skills：**
- role-audition-design
- actor-adaptation-scoring
- task-level-validation
- role-market-evaluation
- suitability-matrix-generation
- evaluation-metric-design
- performance-tracking

**角色协作：**
- 与RAMS编排器专家协作，提供适配度数据支持智能调度
- 与角色设计者协作，优化角色定义以提升适配度
- 与演员市场协作，更新演员信誉评分
- 与用户协作，收集角色使用反馈

### rams-post-task-learning-specialist
**职责范围：** RAMS后置学习专家
- 分析任务执行日志，识别成功模式
- 识别用户修正和反馈，发现改进机会
- 自动创建新技能，从成功任务中提炼知识
- 优化角色Soul，根据用户反馈调整人设
- 触发角色进化，更新角色定义文件
- 管理技能版本，支持技能回滚
- 追踪进化历史，记录角色变化轨迹

**核心 Skills：**
- task-log-analysis
- pattern-recognition
- skill-extraction
- soul-optimization
- role-evolution-trigger
- skill-versioning
- evolution-history-tracking

**角色协作：**
- 与RAMS编排器专家协作，接收任务执行数据
- 与RAMS角色海选专家协作，评估进化效果
- 与RAMS记忆管理专家协作，存储进化历史
- 与角色设计者协作，优化角色定义

### rams-orchestrator-specialist
**职责范围：** RAMS编排器专家
- 解析任务DAG，识别任务依赖关系
- 动态角色匹配，根据任务需求选择合适角色
- 演员调度与负载均衡，优化资源利用
- 记忆管理，协调角色级记忆的读写
- 后置学习触发，调用后置学习组件
- 变体选择，根据场景选择合适的角色变体
- Soul优先级加载，按优先级加载Soul（演员专用 > 变体 > 基础）
- 并行执行管理，支持并行、投票、路由等协作模式

**核心 Skills：**
- task-dag-parsing
- dynamic-role-matching
- actor-scheduling
- load-balancing
- memory-coordination
- post-task-learning-trigger
- variant-selection
- soul-priority-loading
- parallel-execution-management

**角色协作：**
- 与RAMS角色海选专家协作，获取适配度矩阵支持调度
- 与RAMS后置学习专家协作，触发角色进化
- 与RAMS记忆管理专家协作，协调记忆读写
- 与RAMS模型适配专家协作，调用不同模型
- 与角色市场协作，获取角色定义
- 与演员市场协作，获取演员实例

### rams-memory-management-specialist
**职责范围：** RAMS记忆管理专家
- 管理提示词记忆，优化上下文窗口使用
- 管理会话存档，按（角色, 用户, 项目）隔离存储
- 管理技能记忆，存储角色进化的技能
- 管理向量索引，实现长期知识库检索
- 管理用户画像，记录用户偏好和历史
- 实现容量驱动的主动压缩，优化存储效率
- 协调记忆读写，确保多演员共享角色记忆
- 设计记忆检索策略，平衡召回率和精度

**核心 Skills：**
- prompt-memory-management
- session-archiving
- skill-memory-management
- vector-index-management
- user-profiling
- capacity-driven-compression
- memory-coordination
- retrieval-strategy-design

**角色协作：**
- 与RAMS编排器专家协作，协调任务执行中的记忆读写
- 与RAMS后置学习专家协作，存储进化历史
- 与RAMS角色海选专家协作，提供历史数据支持评估
- 与角色设计者协作，优化记忆结构

### rams-task-definition-specialist
**职责范围：** RAMS任务定义专家
- 设计TDL结构，定义任务描述格式
- 定义输入输出Schema，规范数据格式
- 定义任务依赖关系，构建DAG
- 定义能力要求，指定角色和技能需求
- 验证TDL格式，确保任务定义正确
- 设计任务模板，支持常见任务类型
- 管理TDL版本，支持任务定义演进
- 提供TDL工具，辅助用户编写任务定义

**核心 Skills：**
- tdl-structure-design
- schema-definition
- dependency-modeling
- capability-specification
- tdl-validation
- task-template-design
- tdl-versioning
- tdl-tooling

**角色协作：**
- 与RAMS编排器专家协作，提供任务定义支持DAG解析
- 与RAMS角色海选专家协作，定义能力要求
- 与角色设计者协作，对齐任务需求与角色能力
- 与用户协作，提供TDL编写指导

### rams-model-adaptation-specialist
**职责范围：** RAMS模型适配专家
- 设计统一API接口，抽象不同模型的差异
- 适配不同模型（GPT-5, Claude, Kimi, Llama等）
- 处理模型差异（上下文窗口、输出格式、参数等）
- 实现演员专用Soul微调，充分利用模型优势
- 管理模型连接池，优化资源利用
- 处理模型错误和重试逻辑
- 监控模型性能（延迟、成功率、成本）
- 实现模型降级策略，确保可用性

**核心 Skills：**
- unified-api-design
- model-adaptation
- model-difference-handling
- actor-soul-fine-tuning
- connection-pool-management
- error-handling-and-retry
- model-performance-monitoring
- model-degradation-strategy

**角色协作：**
- 与RAMS编排器专家协作，提供统一的模型调用接口
- 与演员市场协作，获取模型实例信息
- 与角色设计者协作，实现演员专用Soul微调
- 与RAMS角色海选专家协作，提供模型性能数据
