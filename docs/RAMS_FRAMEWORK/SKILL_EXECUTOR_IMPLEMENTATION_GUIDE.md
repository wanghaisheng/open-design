# Skill Executor Implementation Guide

技能执行器实现指南，说明如何实现技能执行系统的各个组件。

---

## 概述

本文档提供技能执行系统的实现指南，包括执行器、验证器、解析器、管理器等组件的实现方法和示例代码。

## 架构设计

### 核心组件

```
SkillExecutor (技能执行器)
├── AIModelExecutor (AI模型执行器)
├── APIExecutor (API执行器)
├── ScriptExecutor (脚本执行器)
├── ToolExecutor (工具执行器)
└── CompositeExecutor (组合执行器)

SkillValidator (技能验证器)
├── SchemaValidator (Schema验证器)
└── DependencyResolver (依赖解析器)

SkillManager (技能管理器)
├── CacheManager (缓存管理器)
└── MonitoringManager (监控管理器)
```

## 执行器实现

### 1. SkillExecutor 基类

```python
from abc import ABC, abstractmethod
from typing import Dict, Any
import yaml

class SkillExecutor(ABC):
    """技能执行器基类"""
    
    def __init__(self, skill_name: str, skill_path: str):
        self.skill_name = skill_name
        self.skill_path = skill_path
        self.config = self._load_config()
    
    def _load_config(self) -> Dict[str, Any]:
        """加载技能配置"""
        impl_path = f"{self.skill_path}/implementation.yaml"
        try:
            with open(impl_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            return {"implementation": {"default": {"type": "ai-model"}}}
    
    @abstractmethod
    def execute(self, input_data: Dict[str, Any], implementation_config: Dict[str, Any]) -> Dict[str, Any]:
        """执行技能"""
        pass
    
    def get_executor(self, impl_type: str) -> 'SkillExecutor':
        """根据类型获取执行器"""
        executors = {
            'ai-model': AIModelExecutor,
            'api': APIExecutor,
            'script': ScriptExecutor,
            'tool': ToolExecutor,
            'composite': CompositeExecutor
        }
        executor_class = executors.get(impl_type)
        if not executor_class:
            raise ValueError(f"Unknown implementation type: {impl_type}")
        return executor_class(self.skill_name, self.skill_path)
```

### 2. AIModelExecutor 实现

```python
import requests
from typing import Dict, Any

class AIModelExecutor(SkillExecutor):
    """AI模型执行器"""
    
    def execute(self, input_data: Dict[str, Any], implementation_config: Dict[str, Any]) -> Dict[str, Any]:
        """执行AI模型"""
        provider = implementation_config.get('provider', 'anthropic')
        model = implementation_config.get('model', 'claude-3-opus')
        api_key = implementation_config.get('api_key')
        base_url = implementation_config.get('base_url')
        temperature = implementation_config.get('temperature', 0.7)
        max_tokens = implementation_config.get('max_tokens', 4000)
        
        # 根据provider选择API
        if provider == 'anthropic':
            return self._execute_anthropic(model, api_key, base_url, input_data, temperature, max_tokens)
        elif provider == 'openai':
            return self._execute_openai(model, api_key, base_url, input_data, temperature, max_tokens)
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    def _execute_anthropic(self, model: str, api_key: str, base_url: str, 
                          input_data: Dict[str, Any], temperature: float, max_tokens: int) -> Dict[str, Any]:
        """执行Anthropic API"""
        headers = {
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        }
        
        data = {
            'model': model,
            'max_tokens': max_tokens,
            'temperature': temperature,
            'messages': [
                {
                    'role': 'user',
                    'content': str(input_data)
                }
            ]
        }
        
        response = requests.post(
            f"{base_url}/v1/messages",
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        result = response.json()
        
        return {
            'output': result['content'][0]['text'],
            'model': model,
            'tokens_used': result['usage']['input_tokens'] + result['usage']['output_tokens']
        }
    
    def _execute_openai(self, model: str, api_key: str, base_url: str,
                       input_data: Dict[str, Any], temperature: float, max_tokens: int) -> Dict[str, Any]:
        """执行OpenAI API"""
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': model,
            'messages': [
                {
                    'role': 'user',
                    'content': str(input_data)
                }
            ],
            'temperature': temperature,
            'max_tokens': max_tokens
        }
        
        response = requests.post(
            f"{base_url}/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        result = response.json()
        
        return {
            'output': result['choices'][0]['message']['content'],
            'model': model,
            'tokens_used': result['usage']['total_tokens']
        }
```

### 3. APIExecutor 实现

```python
import requests
import json
from typing import Dict, Any

class APIExecutor(SkillExecutor):
    """API执行器"""
    
    def execute(self, input_data: Dict[str, Any], implementation_config: Dict[str, Any]) -> Dict[str, Any]:
        """执行API调用"""
        endpoint = implementation_config.get('endpoint')
        method = implementation_config.get('method', 'POST')
        headers = implementation_config.get('headers', {})
        body_template = implementation_config.get('body_template')
        response_parser = implementation_config.get('response_parser', 'json')
        timeout = implementation_config.get('timeout', 30)
        retry_count = implementation_config.get('retry_count', 3)
        retry_delay = implementation_config.get('retry_delay', 5)
        
        # 替换模板变量
        body = self._render_template(body_template, input_data)
        
        # 执行请求（带重试）
        for attempt in range(retry_count):
            try:
                response = requests.request(
                    method,
                    endpoint,
                    headers=headers,
                    json=json.loads(body) if body else None,
                    timeout=timeout
                )
                response.raise_for_status()
                
                # 解析响应
                if response_parser == 'json':
                    return response.json()
                else:
                    return {'output': response.text}
                    
            except requests.RequestException as e:
                if attempt == retry_count - 1:
                    raise
                time.sleep(retry_delay)
    
    def _render_template(self, template: str, context: Dict[str, Any]) -> str:
        """渲染模板"""
        from string import Template
        return Template(template).safe_substitute(**context)
```

### 4. ScriptExecutor 实现

```python
import subprocess
import json
from typing import Dict, Any

class ScriptExecutor(SkillExecutor):
    """脚本执行器"""
    
    def execute(self, input_data: Dict[str, Any], implementation_config: Dict[str, Any]) -> Dict[str, Any]:
        """执行脚本"""
        script = implementation_config.get('script')
        runtime = implementation_config.get('runtime', 'python')
        args = implementation_config.get('args', [])
        env_vars = implementation_config.get('env_vars', {})
        timeout = implementation_config.get('timeout', 60)
        working_dir = implementation_config.get('working_dir', './')
        
        # 构建命令
        if runtime == 'python':
            cmd = ['python', script] + self._render_args(args, input_data)
        elif runtime == 'nodejs':
            cmd = ['node', script] + self._render_args(args, input_data)
        elif runtime == 'bash':
            cmd = ['bash', script] + self._render_args(args, input_data)
        elif runtime == 'powershell':
            cmd = ['powershell', script] + self._render_args(args, input_data)
        else:
            raise ValueError(f"Unsupported runtime: {runtime}")
        
        # 设置环境变量
        env = os.environ.copy()
        env.update(env_vars)
        
        # 执行脚本
        result = subprocess.run(
            cmd,
            cwd=working_dir,
            env=env,
            timeout=timeout,
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            raise RuntimeError(f"Script execution failed: {result.stderr}")
        
        # 解析输出
        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            return {'output': result.stdout}
    
    def _render_args(self, args: list, context: Dict[str, Any]) -> list:
        """渲染参数"""
        from string import Template
        rendered = []
        for arg in args:
            if isinstance(arg, str):
                rendered.append(Template(arg).safe_substitute(**context))
            else:
                rendered.append(arg)
        return rendered
```

### 5. ToolExecutor 实现

```python
from typing import Dict, Any

class ToolExecutor(SkillExecutor):
    """工具执行器"""
    
    def execute(self, input_data: Dict[str, Any], implementation_config: Dict[str, Any]) -> Dict[str, Any]:
        """执行工具"""
        tool = implementation_config.get('tool')
        config = implementation_config.get('config', {})
        
        # 根据工具类型执行
        if tool == 'figma':
            return self._execute_figma(config, input_data)
        elif tool == 'godot':
            return self._execute_godot(config, input_data)
        else:
            raise ValueError(f"Unsupported tool: {tool}")
    
    def _execute_figma(self, config: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """执行Figma工具"""
        # 实现Figma API调用
        pass
    
    def _execute_godot(self, config: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """执行Godot工具"""
        # 实现Godot脚本调用
        pass
```

### 6. CompositeExecutor 实现

```python
from typing import Dict, Any, List

class CompositeExecutor(SkillExecutor):
    """组合执行器"""
    
    def execute(self, input_data: Dict[str, Any], implementation_config: Dict[str, Any]) -> Dict[str, Any]:
        """执行组合步骤"""
        steps = implementation_config.get('steps', [])
        
        result = input_data
        for step in steps:
            step_name = step.get('name')
            step_type = step.get('type')
            step_config = step.get('config', {})
            
            # 获取对应执行器
            executor = self.get_executor(step_type)
            
            # 执行步骤
            result = executor.execute(result, step_config)
        
        return result
```

## 验证器实现

### SchemaValidator 实现

```python
import jsonschema
from typing import Dict, Any
import yaml

class SchemaValidator:
    """Schema验证器"""
    
    def __init__(self, skill_name: str, skill_path: str):
        self.skill_name = skill_name
        self.skill_path = skill_path
        self.schema = self._load_schema()
    
    def _load_schema(self) -> Dict[str, Any]:
        """加载Schema"""
        schema_path = f"{self.skill_path}/schema.yaml"
        try:
            with open(schema_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            return None
    
    def validate_input(self, input_data: Dict[str, Any]) -> bool:
        """验证输入"""
        if not self.schema:
            return True  # 无Schema则跳过验证
        
        input_schema = self.schema.get('schema', {}).get('input', {})
        try:
            jsonschema.validate(input_data, input_schema)
            return True
        except jsonschema.ValidationError as e:
            print(f"Input validation failed: {e}")
            return False
    
    def validate_output(self, output_data: Dict[str, Any]) -> bool:
        """验证输出"""
        if not self.schema:
            return True  # 无Schema则跳过验证
        
        output_schema = self.schema.get('schema', {}).get('output', {})
        try:
            jsonschema.validate(output_data, output_schema)
            return True
        except jsonschema.ValidationError as e:
            print(f"Output validation failed: {e}")
            return False
```

### DependencyResolver 实现

```python
from typing import Dict, Any, List
import yaml

class DependencyResolver:
    """依赖解析器"""
    
    def __init__(self, skill_name: str, skill_path: str):
        self.skill_name = skill_name
        self.skill_path = skill_path
        self.dependencies = self._load_dependencies()
    
    def _load_dependencies(self) -> Dict[str, Any]:
        """加载依赖配置"""
        dep_path = f"{self.skill_path}/dependencies.yaml"
        try:
            with open(dep_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            return {'dependencies': {}}
    
    def check_dependencies(self) -> Dict[str, Any]:
        """检查依赖"""
        result = {
            'satisfied': True,
            'missing': [],
            'optional_missing': []
        }
        
        deps = self.dependencies.get('dependencies', {})
        
        # 检查技能依赖
        for skill_dep in deps.get('skills', []):
            if not self._check_skill(skill_dep):
                if skill_dep.get('optional', False):
                    result['optional_missing'].append(skill_dep['name'])
                else:
                    result['missing'].append(skill_dep['name'])
                    result['satisfied'] = False
        
        # 检查工具依赖
        for tool_dep in deps.get('tools', []):
            if not self._check_tool(tool_dep):
                if tool_dep.get('optional', False):
                    result['optional_missing'].append(tool_dep['name'])
                else:
                    result['missing'].append(tool_dep['name'])
                    result['satisfied'] = False
        
        return result
    
    def _check_skill(self, skill_dep: Dict[str, Any]) -> bool:
        """检查技能依赖"""
        # 实现技能检查逻辑
        return True
    
    def _check_tool(self, tool_dep: Dict[str, Any]) -> bool:
        """检查工具依赖"""
        # 实现工具检查逻辑
        return True
```

## 管理器实现

### CacheManager 实现

```python
import hashlib
import json
import time
from typing import Dict, Any
import yaml

class CacheManager:
    """缓存管理器"""
    
    def __init__(self, skill_name: str, skill_path: str):
        self.skill_name = skill_name
        self.skill_path = skill_path
        self.config = self._load_cache_config()
        self.cache = {}
    
    def _load_cache_config(self) -> Dict[str, Any]:
        """加载缓存配置"""
        cache_path = f"{self.skill_path}/cache.yaml"
        try:
            with open(cache_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            return {'cache': {'enabled': False}}
    
    def get(self, input_data: Dict[str, Any]) -> Any:
        """获取缓存"""
        if not self.config.get('cache', {}).get('enabled', False):
            return None
        
        key = self._generate_key(input_data)
        cache_entry = self.cache.get(key)
        
        if not cache_entry:
            return None
        
        # 检查TTL
        ttl = self.config.get('cache', {}).get('ttl', 3600)
        if time.time() - cache_entry['timestamp'] > ttl:
            del self.cache[key]
            return None
        
        return cache_entry['data']
    
    def set(self, input_data: Dict[str, Any], data: Any):
        """设置缓存"""
        if not self.config.get('cache', {}).get('enabled', False):
            return
        
        key = self._generate_key(input_data)
        self.cache[key] = {
            'data': data,
            'timestamp': time.time()
        }
        
        # 检查缓存大小
        max_size = self.config.get('cache', {}).get('max_size', 1000)
        if len(self.cache) > max_size:
            self._evict()
    
    def _generate_key(self, input_data: Dict[str, Any]) -> str:
        """生成缓存键"""
        key_template = self.config.get('cache', {}).get('key_template', '{skill_name}:{input_hash}')
        input_hash = hashlib.sha256(json.dumps(input_data, sort_keys=True).encode()).hexdigest()
        return key_template.format(skill_name=self.skill_name, input_hash=input_hash)
    
    def _evict(self):
        """淘汰缓存条目"""
        strategy = self.config.get('cache', {}).get('strategy', 'lru')
        
        if strategy == 'lru':
            # LRU淘汰
            oldest_key = min(self.cache.keys(), key=lambda k: self.cache[k]['timestamp'])
            del self.cache[oldest_key]
        elif strategy == 'lfu':
            # LFU淘汰
            pass
```

### MonitoringManager 实现

```python
import time
from typing import Dict, Any
import yaml

class MonitoringManager:
    """监控管理器"""
    
    def __init__(self, skill_name: str, skill_path: str):
        self.skill_name = skill_name
        self.skill_path = skill_path
        self.config = self._load_monitoring_config()
        self.metrics = {}
    
    def _load_monitoring_config(self) -> Dict[str, Any]:
        """加载监控配置"""
        monitor_path = f"{self.skill_path}/monitoring.yaml"
        try:
            with open(monitor_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            return {'monitoring': {'enabled': False}}
    
    def record_execution(self, success: bool, duration: float, tokens: int = 0):
        """记录执行指标"""
        if not self.config.get('monitoring', {}).get('enabled', False):
            return
        
        # 记录执行时间
        self._record_histogram('execution_time', duration)
        
        # 记录执行次数
        self._increment_counter('execution_count')
        
        # 记录成功/失败
        if success:
            self._increment_counter('success_count')
        else:
            self._increment_counter('error_count')
        
        # 记录Token使用
        if tokens > 0:
            self._record_histogram('token_usage', tokens)
    
    def _record_histogram(self, metric_name: str, value: float):
        """记录直方图指标"""
        if metric_name not in self.metrics:
            self.metrics[metric_name] = []
        self.metrics[metric_name].append(value)
    
    def _increment_counter(self, metric_name: str):
        """递增计数器"""
        if metric_name not in self.metrics:
            self.metrics[metric_name] = 0
        self.metrics[metric_name] += 1
    
    def get_metrics(self) -> Dict[str, Any]:
        """获取指标"""
        return self.metrics
```

## 集成实现

### SkillExecutor 集成

```python
class IntegratedSkillExecutor:
    """集成技能执行器"""
    
    def __init__(self, skill_name: str, skill_path: str):
        self.skill_name = skill_name
        self.skill_path = skill_path
        
        # 初始化组件
        self.executor = SkillExecutor(skill_name, skill_path)
        self.validator = SchemaValidator(skill_name, skill_path)
        self.dependency_resolver = DependencyResolver(skill_name, skill_path)
        self.cache_manager = CacheManager(skill_name, skill_path)
        self.monitoring_manager = MonitoringManager(skill_name, skill_path)
    
    def execute(self, input_data: Dict[str, Any], implementation_override: Dict[str, Any] = None) -> Dict[str, Any]:
        """执行技能（完整流程）"""
        start_time = time.time()
        success = False
        
        try:
            # 1. 检查依赖
            dep_result = self.dependency_resolver.check_dependencies()
            if not dep_result['satisfied']:
                raise RuntimeError(f"Dependencies not satisfied: {dep_result['missing']}")
            
            # 2. 验证输入
            if not self.validator.validate_input(input_data):
                raise RuntimeError("Input validation failed")
            
            # 3. 检查缓存
            cached_result = self.cache_manager.get(input_data)
            if cached_result is not None:
                return cached_result
            
            # 4. 加载实现配置
            impl_config = self.executor.config.get('implementation', {})
            if implementation_override:
                impl_config = {**impl_config, **implementation_override}
            
            # 5. 选择执行器
            impl_type = impl_config.get('default', {}).get('type', 'ai-model')
            executor = self.executor.get_executor(impl_type)
            
            # 6. 执行技能
            result = executor.execute(input_data, impl_config.get('default', {}))
            
            # 7. 验证输出
            if not self.validator.validate_output(result):
                raise RuntimeError("Output validation failed")
            
            # 8. 设置缓存
            self.cache_manager.set(input_data, result)
            
            success = True
            return result
            
        except Exception as e:
            print(f"Skill execution failed: {e}")
            raise
        finally:
            # 9. 记录监控指标
            duration = time.time() - start_time
            self.monitoring_manager.record_execution(success, duration)
```

## 测试

### 单元测试

```python
import unittest

class TestSkillExecutor(unittest.TestCase):
    """技能执行器测试"""
    
    def test_ai_model_executor(self):
        """测试AI模型执行器"""
        executor = AIModelExecutor('test-skill', './test-skills')
        result = executor.execute({'input': 'test'}, {
            'provider': 'anthropic',
            'model': 'claude-3-opus',
            'api_key': 'test-key'
        })
        self.assertIn('output', result)
    
    def test_schema_validator(self):
        """测试Schema验证器"""
        validator = SchemaValidator('test-skill', './test-skills')
        self.assertTrue(validator.validate_input({'game_concept': 'test'}))
        self.assertFalse(validator.validate_input({}))
```

## 部署

### 依赖安装

```bash
pip install pyyaml jsonschema requests
```

### 配置环境变量

```bash
export ANTHROPIC_API_KEY="your-api-key"
export OPENAI_API_KEY="your-api-key"
```

## 总结

本指南提供了技能执行系统的完整实现框架，包括：

1. **执行器实现**：AI模型、API、脚本、工具、组合执行器
2. **验证器实现**：Schema验证器、依赖解析器
3. **管理器实现**：缓存管理器、监控管理器
4. **集成实现**：完整执行流程集成
5. **测试和部署**：单元测试和部署指南

实际实现时需要根据具体需求调整和完善各个组件。
