---
name: cocos-development
description: Cocos Creator 引擎开发技能，使用 Cocos Creator 引擎进行游戏开发。
---

# Cocos Development

Cocos Creator 引擎开发技能，使用 Cocos Creator 引擎进行游戏开发。

## 适用场景

- Cocos Creator 项目设置
- TypeScript/JavaScript 脚本开发
- Cocos 资源管理
- Cocos 场景和节点操作
- Cocos 组件系统使用

## 操作步骤

### 步骤1：创建 Cocos Creator 项目

**目标**：创建和配置 Cocos Creator 项目

**操作方法**：
1. 打开 Cocos Creator
2. 点击 New Project
3. 选择项目模板
4. 设置项目名称和位置
5. 点击 Create

**检查清单**：
- [ ] 项目创建成功
- [ ] 模板选择正确
- [ ] 项目配置正确

### 步骤2：创建场景和节点

**目标**：创建游戏场景和节点

**操作方法**：
1. 在 Hierarchy 面板右键
2. 选择 Create Node
3. 选择节点类型（如 Sprite、Label）
4. 设置节点名称
5. 保存场景

**检查清单**：
- [ ] 场景创建成功
- [ ] 节点类型正确
- [ ] 节点名称正确
- [ ] 场景保存成功

### 步骤3：编写 TypeScript 脚本

**目标**：使用 TypeScript 编写游戏逻辑

**操作方法**：
1. 在 Assets 面板右键
2. 选择 Create > TypeScript
3. 命名脚本
4. 编写 TypeScript 代码
5. 将脚本附加到节点

**检查清单**：
- [ ] 脚本创建成功
- [ ] 脚本命名正确
- [ ] 代码语法正确
- [ ] 脚本附加成功

### 步骤4：使用 Cocos API

**目标**：查找和使用 Cocos 引擎 API

**操作方法**：
1. 打开 Cocos Creator API 文档
2. 搜索需要的类或方法
3. 查看 API 文档
4. 在脚本中使用 API
5. 测试功能

**检查清单**：
- [ ] API 查找正确
- [ ] API 使用正确
- [ ] 功能测试通过

### 步骤5：管理资源

**目标**：导入和管理游戏资源

**操作方法**：
1. 将资源文件拖入 Assets 面板
2. 设置导入选项
3. 创建 Prefab
4. 在场景中使用资源
5. 优化资源设置

**检查清单**：
- [ ] 资源导入成功
- [ ] 导入选项正确
- [ ] Prefab 创建成功
- [ ] 资源引用正确

## 操作注意事项

### 场景管理
- 使用场景加载管理
- 保持场景树结构清晰
- 合理使用 Prefab
- 注意场景加载性能

### 脚本编写
- 遵循 TypeScript 编码规范
- 使用 Cocos 生命周期方法
- 合理使用组件系统
- 注意性能优化

### 资源管理
- 压缩纹理和模型
- 使用资源预加载
- 合理使用动态加载
- 注意内存使用

## 输出格式

### 场景文件
- 场景结构
- 节点属性
- 组件配置

### 脚本文件
- TypeScript 代码
- 注释和文档

### 资源文件
- 导入的资源
- Prefab 文件
- 资源配置

## 协作协议

### 向谁汇报
- lead-programmer：技术方向
- technical-director：架构决策

### 协调对象
- gameplay-programmer：游戏逻辑集成
- ui-programmer：UI 集成
- level-designer：关卡实现

## 常见错误

### 错误1：场景加载失败
**问题**：场景文件损坏或路径错误
**修正**：检查场景文件路径，重新创建场景

### 错误2：脚本编译错误
**问题**：TypeScript 语法错误
**修正**：检查代码语法，查看错误信息

### 错误3：资源引用丢失
**问题**：资源文件移动或删除导致引用丢失
**修正**：检查资源引用，重新导入资源

## 参考资料

- Cocos Creator 官方文档
- Cocos Creator API 文档
- TypeScript 编码规范
- Cocos Creator 最佳实践
