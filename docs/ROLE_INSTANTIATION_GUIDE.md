# 角色实例化指南：从角色定义到演员实例

本文档说明如何使用配置的模型来创建角色实例，形成扮演该角色的具体演员。

---

## 核心概念

### 角色（Role）vs 角色实例（Role Instance）vs 演员（Actor）

| 概念 | 说明 | 类比 |
|------|------|------|
| 角色定义（Role Definition） | 静态的岗位描述（Soul + Skills），存储在文件中 | 剧本 |
| 角色实例（Role Instance） | 角色定义的运行时实例，包含记忆、状态等 | 剧本 + 演员笔记 |
| 演员（Actor） | 扮演角色的具体模型（GPT-4, Claude 等） | 演员 |

**关系**：
- 角色定义 → 角色实例化 → 演员执行
- 同一个角色定义可以被多个演员扮演
- 同一个演员可以扮演多个角色

---

## 角色实例化流程

```
角色定义文件 (YAML/JSON)
        ↓
    加载 Soul + Skills
        ↓
    创建角色实例
        ↓
    配置模型参数
        ↓
    绑定演员（具体模型）
        ↓
    加载角色记忆
        ↓
    准备执行任务
```

---

## 步骤 1：定义角色

### 角色定义文件结构

```yaml
# role: game_designer.yaml
role_id: "game_designer_pro"
role_name: "资深游戏策划"
role_version: "1.0.0"

# 人格设定
soul: |
  你是一位资深游戏策划，擅长核心玩法设计、数值平衡和经济系统。
  
  核心职责：
  1. 设计游戏核心玩法机制
  2. 设计经济数值系统
  3. 编写游戏设计文档（GDD）
  
  工作原则：
  - 输出需包含可执行的公式和结构化文档
  - 考虑玩家体验和游戏平衡
  - 遵循行业最佳实践

# 技能堆栈
skills:
  - game_documentation
  - spreadsheet_modeling
  - level_design
  - economy_balance

# 能力要求
required_capabilities:
  max_tokens: 128000
  tools: true
  reasoning: high

# 默认模型配置
default_actor:
  provider: "openai"
  model: "gpt-4-turbo"
  temperature: 0.7
  max_tokens: 4000
```

### 技能定义

```markdown
---
name: game_documentation
description: 编写游戏设计文档（GDD）
keywords: [GDD, 游戏设计文档, 文档编写]
---

# Game Documentation

编写结构化的游戏设计文档。

## Instructions

按照以下结构编写 GDD：
1. 游戏概述
2. 核心玩法
3. 数值系统
4. 关卡设计
5. UI/UX 设计
```

---

## 步骤 2：配置模型

### 模型配置文件

```yaml
# config/models.yaml
actors:
  openai_gpt4:
    provider: "openai"
    model: "gpt-4-turbo"
    api_key_env: "OPENAI_API_KEY"
    base_url: "https://api.openai.com/v1"
    default_temperature: 0.7
    default_max_tokens: 4000
    
  anthropic_claude:
    provider: "anthropic"
    model: "claude-3-opus-20240229"
    api_key_env: "ANTHROPIC_API_KEY"
    base_url: "https://api.anthropic.com/v1"
    default_temperature: 0.7
    default_max_tokens: 4000
    
  local_llama:
    provider: "local"
    model: "llama-3-70b"
    base_url: "http://localhost:8080/v1"
    default_temperature: 0.7
    default_max_tokens: 4000
```

### 环境变量配置

```bash
# .env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

---

## 步骤 3：实例化角色

### Python 实现

```python
from typing import Dict, List, Optional
import yaml
from dataclasses import dataclass

@dataclass
class ActorConfig:
    provider: str
    model: str
    api_key: str
    base_url: str
    temperature: float = 0.7
    max_tokens: int = 4000

@dataclass
class RoleDefinition:
    role_id: str
    role_name: str
    role_version: str
    soul: str
    skills: List[str]
    required_capabilities: Dict
    default_actor: Optional[Dict] = None

class RoleInstance:
    """角色实例：角色定义 + 运行时状态"""
    
    def __init__(self, role_definition: RoleDefinition, actor_config: ActorConfig):
        self.role_definition = role_definition
        self.actor_config = actor_config
        self.memory = {}  # 角色记忆
        self.state = {}  # 运行时状态
        self.skill_cache = {}  # 技能缓存
        
    def load_skills(self, skills_path: str):
        """加载技能文件"""
        for skill_name in self.role_definition.skills:
            skill_file = f"{skills_path}/{skill_name}/SKILL.md"
            with open(skill_file, 'r', encoding='utf-8') as f:
                self.skill_cache[skill_name] = f.read()
    
    def build_system_prompt(self) -> str:
        """构建系统提示词"""
        prompt_parts = []
        
        # 添加 Soul
        prompt_parts.append(f"# Role: {self.role_definition.role_name}\n")
        prompt_parts.append(self.role_definition.soul)
        
        # 添加技能
        prompt_parts.append("\n# Skills\n")
        for skill_name in self.role_definition.skills:
            if skill_name in self.skill_cache:
                prompt_parts.append(f"\n## {skill_name}\n")
                prompt_parts.append(self.skill_cache[skill_name])
        
        # 添加记忆
        if self.memory:
            prompt_parts.append("\n# Memory\n")
            prompt_parts.append(str(self.memory))
        
        return "\n".join(prompt_parts)
    
    def execute_task(self, task: str) -> str:
        """执行任务"""
        # 构建系统提示词
        system_prompt = self.build_system_prompt()
        
        # 调用模型
        response = self._call_model(system_prompt, task)
        
        # 更新记忆
        self._update_memory(task, response)
        
        return response
    
    def _call_model(self, system_prompt: str, user_message: str) -> str:
        """调用模型 API"""
        # 这里实现具体的模型调用逻辑
        # 根据 actor_config.provider 选择不同的 API
        pass
    
    def _update_memory(self, task: str, response: str):
        """更新角色记忆"""
        if "conversations" not in self.memory:
            self.memory["conversations"] = []
        
        self.memory["conversations"].append({
            "task": task,
            "response": response,
            "timestamp": time.time()
        })

class Actor:
    """演员：具体的模型实例"""
    
    def __init__(self, config: ActorConfig):
        self.config = config
        self.suitability_scores = {}  # 在不同角色上的适配分
        
    def play_role(self, role_instance: RoleInstance, task: str) -> str:
        """扮演角色执行任务"""
        return role_instance.execute_task(task)
    
    def update_suitability(self, role_id: str, score: float):
        """更新在特定角色上的适配分"""
        if role_id not in self.suitability_scores:
            self.suitability_scores[role_id] = []
        
        self.suitability_scores[role_id].append(score)
        
        # 计算平均分
        self.suitability_scores[role_id] = [
            sum(scores) / len(scores)
            for scores in [self.suitability_scores[role_id]]
        ]

class RoleInstantiator:
    """角色实例化器"""
    
    def __init__(self, config_path: str, skills_path: str):
        self.config_path = config_path
        self.skills_path = skills_path
        self.actors = {}
        self.role_definitions = {}
        
        self._load_actor_configs()
        self._load_role_definitions()
    
    def _load_actor_configs(self):
        """加载模型配置"""
        with open(f"{self.config_path}/models.yaml", 'r') as f:
            config = yaml.safe_load(f)
            
        for actor_id, actor_config in config['actors'].items():
            self.actors[actor_id] = ActorConfig(
                provider=actor_config['provider'],
                model=actor_config['model'],
                api_key=os.getenv(actor_config['api_key_env']),
                base_url=actor_config['base_url'],
                temperature=actor_config.get('default_temperature', 0.7),
                max_tokens=actor_config.get('default_max_tokens', 4000)
            )
    
    def _load_role_definitions(self):
        """加载角色定义"""
        # 实现角色定义加载逻辑
        pass
    
    def instantiate_role(self, role_id: str, actor_id: str) -> RoleInstance:
        """实例化角色"""
        if role_id not in self.role_definitions:
            raise ValueError(f"Role {role_id} not found")
        
        if actor_id not in self.actors:
            raise ValueError(f"Actor {actor_id} not found")
        
        role_def = self.role_definitions[role_id]
        actor_config = self.actors[actor_id]
        
        # 创建角色实例
        role_instance = RoleInstance(role_def, actor_config)
        
        # 加载技能
        role_instance.load_skills(self.skills_path)
        
        return role_instance

# 使用示例
if __name__ == "__main__":
    # 初始化实例化器
    instantiator = RoleInstantiator(
        config_path="config",
        skills_path=".claude/skills/designer-role/skills"
    )
    
    # 实例化角色：使用 GPT-4 扮演游戏策划
    role_instance = instantiator.instantiate_role(
        role_id="game_designer_pro",
        actor_id="openai_gpt4"
    )
    
    # 执行任务
    result = role_instance.execute_task(
        "设计一个RPG游戏的技能升级树"
    )
    
    print(result)
```

---

## 步骤 4：演员适配度管理

### 适配度计算

```python
class SuitabilityCalculator:
    """演员适配度计算器"""
    
    def calculate(self, 
                 actor: Actor, 
                 role_id: str, 
                 task_result: Dict) -> float:
        """计算适配度"""
        quality_score = task_result.get('quality', 0.0)
        cost_score = self._calculate_cost_score(task_result.get('cost', 0))
        latency_score = self._calculate_latency_score(task_result.get('latency', 0))
        success_rate = task_result.get('success', False)
        
        # 加权计算
        weights = {
            'quality': 0.5,
            'cost': 0.2,
            'latency': 0.2,
            'success': 0.1
        }
        
        score = (
            quality_score * weights['quality'] +
            cost_score * weights['cost'] +
            latency_score * weights['latency'] +
            (1.0 if success_rate else 0.0) * weights['success']
        )
        
        # 更新演员适配分
        actor.update_suitability(role_id, score)
        
        return score
    
    def _calculate_cost_score(self, cost: float) -> float:
        """成本分数（越低越好）"""
        max_cost = 1.0  # 假设最大成本为 $1
        return max(0, 1.0 - cost / max_cost)
    
    def _calculate_latency_score(self, latency: float) -> float:
        """延迟分数（越低越好）"""
        max_latency = 10.0  # 假设最大延迟为 10 秒
        return max(0, 1.0 - latency / max_latency)
```

---

## 步骤 5：动态演员选择

### 编排器中的演员选择

```python
class Orchestrator:
    """编排器"""
    
    def __init__(self, instantiator: RoleInstantiator):
        self.instantiator = instantiator
        self.actors = instantiator.actors
        self.suitability_calculator = SuitabilityCalculator()
    
    def select_actor(self, role_id: str, task: Dict) -> Actor:
        """为角色选择最佳演员"""
        candidates = []
        
        for actor_id, actor in self.actors.items():
            # 获取演员在该角色上的适配分
            if role_id in actor.suitability_scores:
                score = actor.suitability_scores[role_id]
            else:
                score = 5.0  # 默认分数
            
            candidates.append((actor_id, score, actor))
        
        # 按适配分排序
        candidates.sort(key=lambda x: x[1], reverse=True)
        
        # 返回最佳演员
        return candidates[0][2]
    
    def execute_task(self, role_id: str, task: str) -> str:
        """执行任务"""
        # 选择演员
        actor = self.select_actor(role_id, {'task': task})
        
        # 实例化角色
        role_instance = self.instantiator.instantiate_role(role_id, actor)
        
        # 执行任务
        result = role_instance.execute_task(task)
        
        # 计算适配度
        self.suitability_calculator.calculate(actor, role_id, {
            'quality': self._evaluate_quality(result),
            'cost': self._calculate_cost(actor),
            'latency': self._calculate_latency(),
            'success': True
        })
        
        return result
```

---

## 完整示例：游戏开发 AI 团队

```python
# 创建游戏开发 AI 团队
orchestrator = Orchestrator(instantiator)

# 定义任务流程
tasks = [
    {
        'role': 'game_designer_pro',
        'task': '设计一个RPG游戏的技能升级树',
        'actor': 'openai_gpt4'
    },
    {
        'role': 'unity_developer',
        'task': '实现技能升级树的 Unity 代码',
        'actor': 'anthropic_claude'
    },
    {
        'role': 'qa_tester',
        'task': '测试技能升级树的功能',
        'actor': 'openai_gpt4'
    }
]

# 执行任务
for task in tasks:
    result = orchestrator.execute_task(task['role'], task['task'])
    print(f"Task: {task['task']}")
    print(f"Result: {result[:100]}...")
    print("-" * 50)
```

---

## 高级特性

### 1. 角色记忆持久化

```python
class RoleInstance:
    def save_memory(self, path: str):
        """保存角色记忆到文件"""
        with open(path, 'w', encoding='utf-8') as f:
            yaml.dump(self.memory, f)
    
    def load_memory(self, path: str):
        """从文件加载角色记忆"""
        with open(path, 'r', encoding='utf-8') as f:
            self.memory = yaml.safe_load(f)
```

### 2. 技能动态加载

```python
class RoleInstance:
    def load_skill_on_demand(self, skill_name: str):
        """按需加载技能"""
        if skill_name not in self.skill_cache:
            skill_file = f"{self.skills_path}/{skill_name}/SKILL.md"
            with open(skill_file, 'r', encoding='utf-8') as f:
                self.skill_cache[skill_name] = f.read()
```

### 3. 多演员并行执行

```python
from concurrent.futures import ThreadPoolExecutor

class Orchestrator:
    def execute_parallel_tasks(self, tasks: List[Dict]) -> List[str]:
        """并行执行多个任务"""
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = []
            for task in tasks:
                future = executor.submit(
                    self.execute_task,
                    task['role'],
                    task['task']
                )
                futures.append(future)
            
            results = [f.result() for f in futures]
        
        return results
```

---

## 总结

角色实例化的关键点：

1. **角色定义是静态的**：存储在文件中，包含 Soul 和 Skills
2. **角色实例是动态的**：包含运行时状态、记忆、技能缓存
3. **演员是模型实例**：具体的 LLM，负责执行任务
4. **适配度是动态的**：根据任务执行结果动态更新

通过这种设计，RAMS 框架实现了角色与演员的解耦，使得同一个角色可以被多个演员扮演，同一个演员可以扮演多个角色，形成了灵活的 AI 劳动力市场。
