---
name: structured-gdd-generation
description: 结构化GDD生成技能，基于专业GDD模板生成完整的游戏设计文档。
keywords: [GDD, 游戏设计文档, 模板, 结构化输出]
tags: [游戏, 设计, 文档, GDD]
---

# Structured GDD Generation

结构化GDD生成技能，基于专业GDD模板生成完整的游戏设计文档。

## 适用场景

- 生成完整的游戏设计文档
- 按照专业模板输出GDD
- 规范化游戏设计文档结构
- 参考行业最佳实践
- 适配Wiki或文档系统集成

## 操作步骤

### 步骤1：收集游戏信息

**目标**：收集生成GDD所需的游戏信息

**操作方法**：
1. **游戏概述信息**
   - 游戏名称和类型
   - 目标平台
   - 目标受众
   - 核心玩法概述

2. **玩法机制信息**
   - 核心玩法循环
   - 游戏系统
   - 角色和属性
   - 经济系统

3. **故事和角色信息**
   - 游戏世界观
   - 主要角色
   - 故事线
   - 设定背景

4. **技术信息**
   - 技术架构
   - 引擎选择
   - 性能要求
   - 开发工具

**检查清单**：
- [ ] 游戏概述已收集
- [ ] 玩法机制已收集
- [ ] 故事角色已收集
- [ ] 技术信息已收集

### 步骤2：选择GDD模板

**目标**：选择合适的GDD模板章节

**操作方法**：
1. **MVP版本章节**
   - 3_Game Overview.md
   - 4_Gameplay and Mechanics.md
   - 9_Technical.md

2. **完整版本章节**
   - 1_Copyright Information.md
   - 2_Version History.md
   - 3_Game Overview.md
   - 4_Gameplay and Mechanics.md
   - 5_Story, Setting and Character.md
   - 6_Levels.md
   - 7_Interface.md
   - 8_Artificial Intelligence.md
   - 9_Technical.md
   - 10_Game Art.md
   - 11_Secondary Software.md
   - 12_Management.md
   - 13_Appendices.md

3. **扩展章节**
   - 14_AI-Assisted Design.md
   - 15_Game Type Adaptation.md

**检查清单**：
- [ ] 模板版本已选择
- [ ] 章节列表已确定
- [ ] 优先级已设定

### 步骤3：生成GDD章节

**目标**：按照模板生成各章节内容

**操作方法**：
1. **读取模板文件**
   - 从templates/目录读取模板
   - 理解模板结构
   - 识别需要填充的字段

2. **填充章节内容**
   - 基于收集的信息填充模板
   - 保持模板格式和结构
   - 确保内容完整性

3. **章节验证**
   - 验证内容完整性
   - 验证格式正确性
   - 验证逻辑一致性

**检查清单**：
- [ ] 模板已读取
- [ ] 内容已填充
- [ ] 章节已验证

### 步骤4：整合GDD文档

**目标**：将各章节整合为完整GDD

**操作方法**：
1. **章节排序**
   - 按照模板顺序排列章节
   - 确保章节编号正确
   - 添加目录索引

2. **交叉引用**
   - 添加章节间交叉引用
   - 确保引用一致性
   - 验证引用有效性

3. **格式统一**
   - 统一Markdown格式
   - 统一标题层级
   - 统一列表格式

**检查清单**：
- [ ] 章节已排序
- [ ] 交叉引用已添加
- [ ] 格式已统一

### 步骤5：输出GDD文档

**目标**：输出完整的GDD文档

**操作方法**：
1. **文档输出**
   - 输出为单个Markdown文件
   - 或输出为章节文件集合
   - 确保文件编码正确

2. **文档验证**
   - 验证文档完整性
   - 验证链接有效性
   - 验证格式正确性

3. **文档交付**
   - 确定交付格式
   - 确定交付位置
   - 提供使用说明

**检查清单**：
- [ ] 文档已输出
- [ ] 文档已验证
- [ ] 文档已交付

## 输出格式

### GDD文档结构
```markdown
# Game Design Document

## 目录
- [1. Copyright Information](#1-copyright-information)
- [2. Version History](#2-version-history)
- [3. Game Overview](#3-game-overview)
- [4. Gameplay and Mechanics](#4-gameplay-and-mechanics)
- [5. Story, Setting and Character](#5-story-setting-and-character)
- [6. Levels](#6-levels)
- [7. Interface](#7-interface)
- [8. Artificial Intelligence](#8-artificial-intelligence)
- [9. Technical](#9-technical)
- [10. Game Art](#10-game-art)
- [11. Secondary Software](#11-secondary-software)
- [12. Management](#12-management)
- [13. Appendices](#13-appendices)

## 1. Copyright Information
[基于模板生成]

## 2. Version History
[基于模板生成]

## 3. Game Overview
[基于模板生成]

## 4. Gameplay and Mechanics
[基于模板生成]

## 5. Story, Setting and Character
[基于模板生成]

## 6. Levels
[基于模板生成]

## 7. Interface
[基于模板生成]

## 8. Artificial Intelligence
[基于模板生成]

## 9. Technical
[基于模板生成]

## 10. Game Art
[基于模板生成]

## 11. Secondary Software
[基于模板生成]

## 12. Management
[基于模板生成]

## 13. Appendices
[基于模板生成]
```

## 操作注意事项

### 模板使用

1. **保持结构**：保持模板的原始结构
2. **填充完整**：确保所有必填字段都填充
3. **格式一致**：保持Markdown格式一致
4. **引用正确**：确保交叉引用正确

### 内容质量

1. **信息准确**：确保填充的信息准确
2. **逻辑一致**：确保章节间逻辑一致
3. **描述清晰**：确保描述清晰易懂
4. **细节完整**：确保关键细节完整

### 文档管理

1. **版本控制**：使用版本控制管理GDD
2. **定期更新**：定期更新GDD内容
3. **团队协作**：支持团队协作编辑
4. **格式兼容**：确保格式兼容Wiki系统

## 协作协议

### 向谁汇报

- creative-director：GDD内容和结构
- game-designer：玩法机制章节
- technical-director：技术章节

### 协调对象

- art-director：美术章节
- producer：管理章节
- writer：故事章节

## 常见错误

### 错误1：不使用模板

**问题**：不使用模板，格式混乱

**修正**：必须使用提供的模板

### 错误2：填充不完整

**问题**：模板字段填充不完整

**修正**：确保所有必填字段都填充

### 错误3：格式不一致

**问题**：Markdown格式不一致

**修正**：统一Markdown格式

### 错误4：逻辑不一致

**问题**：章节间逻辑不一致

**修正**：确保章节间逻辑一致

### 错误5：交叉引用错误

**问题**：交叉引用错误或缺失

**修正**：验证并修正交叉引用
