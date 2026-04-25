---
name: nodejs-backend
description: Node.js后端开发技能，使用Node.js和TypeScript构建游戏服务器、API和后端服务。
keywords: [Node.js, 后端开发, TypeScript, 服务器, API]
tags: [游戏, 后端, Node.js, 服务器]
---

# Node.js Backend

Node.js后端开发技能，使用Node.js和TypeScript构建游戏服务器、API和后端服务。

## 适用场景

- 构建游戏服务器和实时通信服务
- 开发RESTful API和GraphQL接口
- 实现WebSocket实时通信
- 构建微服务架构
- 处理游戏数据存储和缓存

## 操作步骤

### 步骤1：项目初始化

**目标**：创建Node.js项目并配置基础环境

**操作方法**：
1. 使用npm或yarn初始化项目
2. 配置TypeScript（tsconfig.json）
3. 安装核心依赖（express, socket.io等）
4. 配置ESLint和Prettier
5. 设置项目结构（src, tests, config等）

**检查清单**：
- [ ] package.json已创建
- [ ] TypeScript已配置
- [ ] 核心依赖已安装
- [ ] 代码规范工具已配置
- [ ] 项目结构已建立

### 步骤2：API开发

**目标**：开发和实现RESTful API

**操作方法**：
1. 设计API端点和路由
2. 实现请求验证中间件
3. 实现业务逻辑控制器
4. 添加错误处理中间件
5. 实现响应格式标准化

**检查清单**：
- [ ] API路由已定义
- [ ] 请求验证已实现
- [ ] 业务逻辑已实现
- [ ] 错误处理已完善
- [ ] 响应格式已统一

### 步骤3：实时通信

**目标**：实现WebSocket实时通信

**操作方法**：
1. 配置Socket.io服务器
2. 实现事件监听和广播
3. 实现房间和命名空间
4. 添加连接状态管理
5. 实现消息序列化和反序列化

**检查清单**：
- [ ] Socket.io已配置
- [ ] 事件监听已实现
- [ ] 房间管理已实现
- [ ] 连接状态已管理
- [ ] 消息处理已优化

### 步骤4：数据库集成

**目标**：集成数据库并实现数据访问层

**操作方法**：
1. 选择数据库（MongoDB, PostgreSQL, Redis等）
2. 配置数据库连接池
3. 实现ORM/ODM（TypeORM, Mongoose等）
4. 定义数据模型和关系
5. 实现数据访问和查询方法

**检查清单**：
- [ ] 数据库已选择和配置
- [ ] 连接池已配置
- [ ] ORM/ODM已集成
- [ ] 数据模型已定义
- [ ] 查询方法已实现

### 步骤5：性能优化

**目标**：优化Node.js应用性能

**操作方法**：
1. 实现缓存策略（Redis）
2. 优化数据库查询（索引、分页）
3. 实现异步处理和队列
4. 优化内存使用（流、缓冲区）
5. 实现负载均衡

**检查清单**：
- [ ] 缓存策略已实现
- [ ] 数据库查询已优化
- [ ] 异步处理已实现
- [ ] 内存使用已优化
- [ ] 负载均衡已配置

### 步骤6：安全加固

**目标**：实现安全措施保护后端服务

**操作方法**：
1. 实现身份验证和授权（JWT）
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
```typescript
// GET /api/players/:id
router.get('/players/:id', async (req, res) => {
  const player = await PlayerService.getById(req.params.id);
  res.json({ success: true, data: player });
});
```

### WebSocket事件
```typescript
socket.on('player:move', (data) => {
  io.to(data.roomId).emit('player:moved', data);
});
```

## 操作注意事项

### 异步处理

1. **使用async/await**：避免回调地狱
2. **错误处理**：所有异步操作都要有错误处理
3. **并发控制**：使用Promise.all或限制并发数

### 内存管理

1. **避免内存泄漏**：及时清理事件监听器和定时器
2. **使用流处理**：大文件使用流而非一次性加载
3. **监控内存**：使用工具监控内存使用情况

### 错误处理

1. **统一错误格式**：所有错误返回统一格式
2. **记录错误日志**：记录详细错误信息用于调试
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

### 错误1：回调地狱

**问题**：嵌套回调导致代码难以维护

**修正**：使用async/await或Promise链

### 错误2：内存泄漏

**问题**：未清理事件监听器导致内存泄漏

**修正**：在适当时机移除事件监听器和定时器

### 错误3：不处理错误

**问题**：异步操作没有错误处理

**修正**：所有async函数都要有try-catch或.catch()

### 错误4：阻塞事件循环

**问题**：同步操作阻塞事件循环

**修正**：使用异步API或Worker线程处理CPU密集型任务

### 错误5：不验证输入

**问题**：直接使用用户输入导致安全漏洞

**修正**：所有输入都要验证和消毒
