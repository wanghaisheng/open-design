---
name: python-backend
description: Python后端开发技能，使用Python和FastAPI/Django构建游戏服务器、API和后端服务。
keywords: [Python, 后端开发, FastAPI, Django, 服务器, API]
tags: [游戏, 后端, Python, 服务器]
---

# Python Backend

Python后端开发技能，使用Python和FastAPI/Django构建游戏服务器、API和后端服务。

## 适用场景

- 构建游戏服务器和实时通信服务
- 开发RESTful API和GraphQL接口
- 实现WebSocket实时通信
- 构建微服务架构
- 处理游戏数据存储和缓存
- 实现游戏逻辑和AI服务

## 操作步骤

### 步骤1：项目初始化

**目标**：创建Python项目并配置基础环境

**操作方法**：
1. 使用pip或poetry初始化项目
2. 配置虚拟环境
3. 安装核心依赖（fastapi/django, uvicorn等）
4. 配置代码规范工具（black, flake8, mypy）
5. 设置项目结构（app, tests, config等）

**检查清单**：
- [ ] requirements.txt/pyproject.toml已创建
- [ ] 虚拟环境已配置
- [ ] 核心依赖已安装
- [ ] 代码规范工具已配置
- [ ] 项目结构已建立

### 步骤2：API开发

**目标**：开发和实现RESTful API

**操作方法**：
1. 设计API端点和路由
2. 实现请求验证（Pydantic模型）
3. 实现业务逻辑控制器
4. 添加依赖注入中间件
5. 实现响应格式标准化

**检查清单**：
- [ ] API路由已定义
- [ ] Pydantic模型已定义
- [ ] 业务逻辑已实现
- [ ] 依赖注入已配置
- [ ] 响应格式已统一

### 步骤3：实时通信

**目标**：实现WebSocket实时通信

**操作方法**：
1. 配置WebSocket支持（FastAPI WebSocket或Django Channels）
2. 实现事件监听和广播
3. 实现房间和频道管理
4. 添加连接状态管理
5. 实现消息序列化和反序列化

**检查清单**：
- [ ] WebSocket已配置
- [ ] 事件监听已实现
- [ ] 房间管理已实现
- [ ] 连接状态已管理
- [ ] 消息处理已优化

### 步骤4：数据库集成

**目标**：集成数据库并实现数据访问层

**操作方法**：
1. 选择数据库（PostgreSQL, MongoDB, Redis等）
2. 配置数据库连接池
3. 实现ORM（SQLAlchemy, Django ORM）
4. 定义数据模型和关系
5. 实现数据访问和查询方法

**检查清单**：
- [ ] 数据库已选择和配置
- [ ] 连接池已配置
- [ ] ORM已集成
- [ ] 数据模型已定义
- [ ] 查询方法已实现

### 步骤5：性能优化

**目标**：优化Python应用性能

**操作方法**：
1. 实现缓存策略（Redis）
2. 优化数据库查询（索引、select_related/prefetch_related）
3. 实现异步处理（asyncio）
4. 使用C扩展优化关键路径
5. 实现任务队列（Celery）

**检查清单**：
- [ ] 缓存策略已实现
- [ ] 数据库查询已优化
- [ ] 异步处理已实现
- [ ] C扩展已使用（如需要）
- [ ] 任务队列已配置

### 步骤6：安全加固

**目标**：实现安全措施保护后端服务

**操作方法**：
1. 实现身份验证和授权（JWT, OAuth2）
2. 添加输入验证和消毒
3. 实现速率限制
4. 配置CORS策略
5. 实现HTTPS和加密

**检查清单**：
- [ ] 身份验证已实现
- [ ] 输入验证已添加
- [ ] 速率限制已配置
- [ ] CORS策略已设置
- [ ] HTTPS已配置

## 输出格式

### API端点
```python
# FastAPI
@app.get("/players/{player_id}")
async def get_player(player_id: int):
    player = await PlayerService.get_by_id(player_id)
    return {"success": True, "data": player}
```

### WebSocket事件
```python
# FastAPI WebSocket
@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    await manager.connect(room_id, websocket)
```

## 操作注意事项

### 异步处理

1. **使用async/await**：FastAPI和Django Channels都支持异步
2. **避免阻塞操作**：CPU密集型任务使用线程池或进程池
3. **正确使用异步ORM**：使用异步数据库驱动

### 内存管理

1. **避免循环引用**：注意对象间的循环引用
2. **使用生成器**：大数据集使用生成器而非列表
3. **监控内存**：使用memory_profiler监控内存使用

### 错误处理

1. **统一错误格式**：所有错误返回统一格式
2. **记录错误日志**：使用logging模块记录详细错误
3. **不暴露敏感信息**：错误响应不暴露内部实现细节

## 协作协议

### 向谁汇报

- lead-programmer：技术方向和架构决策
- technical-director：后端架构和技术选型

### 协调对象

- frontend-programmer：API接口对接
- devops-engineer：部署和运维
- database-administrator：数据库设计和优化

## 常见错误

### 错误1：全局状态

**问题**：使用全局变量导致并发问题

**修正**：使用依赖注入或上下文管理器

### 错误2：不使用异步

**问题**：在异步框架中使用同步阻塞操作

**修正**：使用异步库或在线程池中运行同步操作

### 错误3：不处理异常

**问题**：异常没有被捕获和处理

**修正**：使用try-except或全局异常处理器

### 错误4：SQL注入

**问题**：直接拼接SQL字符串导致注入漏洞

**修正**：使用ORM参数化查询

### 错误5：不验证输入

**问题**：直接使用用户输入导致安全漏洞

**修正**：使用Pydantic模型验证所有输入
