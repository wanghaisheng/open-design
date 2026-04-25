---
name: csharp-backend
description: C#后端开发技能，使用C#和ASP.NET Core构建游戏服务器、API和后端服务。
keywords: [C#, 后端开发, ASP.NET Core, 服务器, API, .NET]
tags: [游戏, 后端, C#, 服务器]
---

# C# Backend

C#后端开发技能，使用C#和ASP.NET Core构建游戏服务器、API和后端服务。

## 适用场景

- 构建游戏服务器和实时通信服务
- 开发RESTful API和gRPC服务
- 实现WebSocket实时通信
- 构建微服务架构
- 处理游戏数据存储和缓存
- 与Unity游戏引擎集成

## 操作步骤

### 步骤1：项目初始化

**目标**：创建C#项目并配置基础环境

**操作方法**：
1. 使用dotnet CLI初始化项目
2. 配置项目文件（.csproj）
3. 安装核心依赖（ASP.NET Core, Entity Framework等）
4. 配置代码规范工具（StyleCop, EditorConfig）
5. 设置项目结构（Controllers, Services, Models等）

**检查清单**：
- [ ] .csproj已创建
- [ ] 核心依赖已安装
- [ ] 代码规范工具已配置
- [ ] 项目结构已建立
- [ ] 启动配置已设置

### 步骤2：API开发

**目标**：开发和实现RESTful API

**操作方法**：
1. 设计API端点和控制器
2. 实现请求验证（Data Annotations或FluentValidation）
3. 实现业务逻辑服务层
4. 添加中间件（日志、异常处理、CORS）
5. 实现响应格式标准化

**检查清单**：
- [ ] API控制器已定义
- [ ] 请求验证已实现
- [ ] 业务逻辑已实现
- [ ] 中间件已配置
- [ ] 响应格式已统一

### 步骤3：实时通信

**目标**：实现WebSocket实时通信

**操作方法**：
1. 配置SignalR或原生WebSocket
2. 实现Hub和连接管理
3. 实现消息广播和组管理
4. 添加连接状态管理
5. 实现消息序列化（JSON或MessagePack）

**检查清单**：
- [ ] SignalR/WebSocket已配置
- [ ] Hub已实现
- [ ] 消息广播已实现
- [ ] 连接状态已管理
- [ ] 消息处理已优化

### 步骤4：数据库集成

**目标**：集成数据库并实现数据访问层

**操作方法**：
1. 选择数据库（SQL Server, PostgreSQL, Redis等）
2. 配置数据库连接字符串
3. 实现ORM（Entity Framework Core）
4. 定义DbContext和数据模型
5. 实现Repository模式或直接使用DbContext

**检查清单**：
- [ ] 数据库已选择和配置
- [ ] 连接字符串已配置
- [ ] EF Core已集成
- [ ] DbContext已定义
- [ ] 数据访问已实现

### 步骤5：性能优化

**目标**：优化ASP.NET Core应用性能

**操作方法**：
1. 实现缓存策略（IMemoryCache, Redis）
2. 优化数据库查询（Include, AsNoTracking）
3. 使用异步编程（async/await）
4. 实现响应压缩
5. 使用依赖注入优化服务生命周期

**检查清单**：
- [ ] 缓存策略已实现
- [ ] 数据库查询已优化
- [ ] 异步编程已使用
- [ ] 响应压缩已配置
- [ ] DI生命周期已优化

### 步骤6：安全加固

**目标**：实现安全措施保护后端服务

**操作方法**：
1. 实现身份验证和授权（JWT, Identity）
2. 添加输入验证和消毒
3. 实现速率限制
4. 配置CORS策略
5. 实现HTTPS和TLS配置

**检查清单**：
- [ ] 身份验证已实现
- [ ] 输入验证已添加
- [ ] 速率限制已配置
- [ ] CORS策略已设置
- [ ] HTTPS已配置

## 输出格式

### API端点
```csharp
// ASP.NET Core Controller
[HttpGet("players/{id}")]
public async Task<ActionResult<Player>> GetPlayer(int id)
{
    var player = await _playerService.GetByIdAsync(id);
    return Ok(new { success = true, data = player });
}
```

### SignalR Hub
```csharp
public class GameHub : Hub
{
    public async Task SendMessage(string room, string message)
    {
        await Clients.Group(room).SendAsync("ReceiveMessage", message);
    }
}
```

## 操作注意事项

### 异步编程

1. **使用async/await**：所有I/O操作都应该是异步的
2. **避免async void**：除了事件处理器外不要使用async void
3. **正确使用ConfigureAwait**：在库代码中使用ConfigureAwait(false)

### 依赖注入

1. **正确使用生命周期**：Transient, Scoped, Singleton
2. **避免服务定位**：通过构造函数注入依赖
3. **使用接口**：依赖抽象而非具体实现

### 错误处理

1. **统一错误格式**：所有错误返回统一格式
2. **使用异常过滤器**：全局异常处理
3. **记录错误日志**：使用ILogger记录详细错误

### 内存管理

1. **使用IDisposable**：正确释放资源
2. **避免内存泄漏**：注意事件订阅和定时器
3. **使用using语句**：确保资源被释放

## 协作协议

### 向谁汇报

- lead-programmer：技术方向和架构决策
- technical-director：后端架构和技术选型

### 协调对象

- frontend-programmer：API接口对接
- devops-engineer：部署和运维
- database-administrator：数据库设计和优化
- unity-developer：Unity游戏集成

## 常见错误

### 错误1：同步阻塞异步

**问题**：在异步方法中使用.Result或.Wait()

**修正**：使用await等待异步操作

### 错误2：不正确使用DI生命周期

**问题**：在Singleton服务中使用Scoped服务

**修正**：使用IServiceScopeFactory创建作用域

### 错误3：N+1查询问题

**问题**：循环中查询数据库导致性能问题

**修正**：使用Include预加载关联数据

### 错误4：不处理异常

**问题**：异常没有被捕获和处理

**修正**：使用try-catch或全局异常过滤器

### 错误5：不验证输入

**问题**：直接使用用户输入导致安全漏洞

**修正**：使用Data Annotations或FluentValidation验证所有输入
