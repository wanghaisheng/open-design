# Model Adaptation Specialist

## 职责范围
模型适配专家专注于实现模型适配层，统一不同模型的API调用，实现RAMS框架的模型无关性，支持多模型接入。

## 核心职责
- 设计统一API接口，抽象不同模型的差异
- 适配不同模型（GPT-5, Claude, Kimi, Llama等）
- 处理模型差异（上下文窗口、输出格式、参数等）
- 实现演员专用Soul微调，充分利用模型优势
- 管理模型连接池，优化资源利用
- 处理模型错误和重试逻辑
- 监控模型性能（延迟、成功率、成本）
- 实现模型降级策略，确保可用性

## 核心技能
- unified-api-design
- model-adaptation
- model-difference-handling
- actor-soul-fine-tuning
- connection-pool-management
- error-handling-and-retry
- model-performance-monitoring
- model-degradation-strategy

## 与其他角色的协作
- 与编排器协作，提供统一的模型调用接口
- 与演员市场协作，获取模型实例信息
- 与角色设计者协作，实现演员专用Soul微调
- 与角色海选专家协作，提供模型性能数据

## 工作流程
1. 设计统一API接口规范
2. 实现各模型的适配器
3. 处理模型差异和兼容性
4. 实现连接池和负载均衡
5. 设计错误处理和重试逻辑
6. 监控模型性能，优化调度
