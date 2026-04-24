---
name: unreal-development
description: Unreal Engine 开发技能，使用 Unreal Engine 进行游戏开发。
---

# Unreal Development

Unreal Engine 开发技能，使用 Unreal Engine 进行游戏开发。

## 适用场景

- Unreal Engine 项目设置
- C++ 脚本开发
- Blueprints 可视化脚本开发
- Unreal 资源管理
- Unreal 关卡和 Actor 操作

## 操作步骤

### 步骤1：创建 Unreal 项目

**目标**：创建和配置 Unreal 项目

**操作方法**：
1. 打开 Unreal Engine Launcher
2. 点击 New Project
3. 选择模板（Blank、Third Person 等）
4. 选择项目位置和名称
5. 点击 Create

**检查清单**：
- [ ] 项目创建成功
- [ ] 模板选择正确
- [ ] 项目配置正确

### 步骤2：创建关卡和 Actor

**目标**：创建游戏关卡和 Actor

**操作方法**：
1. 在 World Outliner 右键
2. 选择 Place Actor
3. 选择 Actor 类型（如 Cube、Sphere）
4. 设置 Actor 位置
5. 保存关卡

**检查清单**：
- [ ] 关卡创建成功
- [ ] Actor 类型正确
- [ ] Actor 位置正确
- [ ] 关卡保存成功

### 步骤3：编写 C++ 脚本

**目标**：使用 C++ 编写游戏逻辑

**操作方法**：
1. 在 Content Browser 右键
2. 选择 New C++ Class
3. 选择父类（如 Actor、Pawn）
4. 命名类
5. 编写 C++ 代码

**检查清单**：
- [ ] 类创建成功
- [ ] 类命名正确
- [ ] 父类选择正确
- [ ] 代码编译成功

### 步骤4：使用 Unreal API

**目标**：查找和使用 Unreal Engine API

**操作方法**：
1. 打开 Unreal Engine API 文档
2. 搜索需要的类或方法
3. 查看 API 文档
4. 在代码中使用 API
5. 测试功能

**检查清单**：
- [ ] API 查找正确
- [ ] API 使用正确
- [ ] 功能测试通过

### 步骤5：创建 Blueprints

**目标**：使用 Blueprints 创建游戏逻辑

**操作方法**：
1. 在 Content Browser 右键
2. 选择 Blueprint Class
3. 选择父类
4. 命名 Blueprint
5. 在 Blueprint 编辑器中创建逻辑

**检查清单**：
- [ ] Blueprint 创建成功
- [ ] 父类选择正确
- [ ] 逻辑创建正确
- [ ] 编译成功

## 操作注意事项

### 关卡管理
- 使用关卡流管理
- 保持关卡结构清晰
- 合理使用子关卡
- 注意关卡加载性能

### 脚本编写
- 遵循 C++ 编码规范
- 使用 Unreal 宏
- 合理使用反射系统
- 注意性能优化

### 资源管理
- 压缩纹理和模型
- 使用资源重定向
- 合理使用资源热重载
- 注意内存使用

## 输出格式

### 关卡文件
- 关卡结构
- Actor 属性
- 组件配置

### 脚本文件
- C++ 代码
- Blueprint 文件
- 注释和文档

### 资源文件
- 导入的资源
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

### 错误1：C++ 编译失败
**问题**：C++ 代码语法错误或依赖问题
**修正**：检查代码语法，查看编译错误信息

### 错误2：关卡加载失败
**问题**：关卡文件损坏或路径错误
**修正**：检查关卡文件路径，重新创建关卡

### 错误3：资源引用丢失
**问题**：资源文件移动或删除导致引用丢失
**修正**：检查资源引用，重新导入资源

## 参考资料

- Unreal Engine 官方文档
- Unreal Engine API 文档
- Unreal Engine C++ 编程指南
- Unreal Engine 最佳实践
