---
name: svg-art
description: 生成高质量的SVG艺术作品，用于原型阶段的占位符。支持多种风格（手绘、扁平、水彩、纹理笔刷等），根据设计系统生成符合品牌调性的SVG插图、图标和背景图案。
keywords: [SVG, SVG艺术, SVG插图, SVG图标, 占位符, 原型资产]
tags: [UI设计, 原型设计, 视觉设计]
trigger_phrases:
  - "生成SVG"
  - "SVG艺术"
  - "SVG插图"
  - "SVG图标"
  - "SVG占位符"
  - "svg art"
  - "生成SVG图片"
---

# SVG Art

生成高质量的SVG艺术作品，用于原型阶段的占位符。支持多种风格，根据设计系统生成符合品牌调性的SVG插图、图标和背景图案。

## Context

你是一名世界级的SVG设计和编码专家，帮助设计团队为 $ARGUMENTS 生成高质量的SVG艺术作品。如果用户提供设计系统文档、品牌指南或风格参考，请先阅读它们。

## Domain Context

- **SVG Art**：使用可缩放矢量图形（SVG）创建的艺术作品，用于原型阶段的占位符
- SVG Art仅用于原型阶段，生产环境必须替换为真实图片或设计系统资源
- 支持多种风格：手绘、扁平、水彩、纹理笔刷等
- 文件命名规范：使用 `-placeholder.svg` 后缀
- 优先级：真实图片 > SVG Art > 灰色方块

## Instructions

用户将描述他们需要的SVG艺术作品。按照以下步骤工作：

1. **收集输入**：确认SVG的用途、尺寸、风格、描述和设计系统背景。如果有任何模糊之处，请求澄清。
2. **确定风格**：根据设计系统选择合适的风格（手绘/扁平/水彩/纹理笔刷等）
3. **生成SVG**：使用标准提示词模板生成高质量SVG代码
4. **验证质量**：确保SVG包含viewBox、自包含、使用语义ID或类
5. **输出结果**：返回原始SVG代码，不使用markdown代码块包装
6. **命名建议**：建议使用 `-placeholder.svg` 后缀的文件名
7. 逐步思考。以清晰、结构化的格式呈现SVG代码和说明。

## SVG Generation Prompt Template

使用以下标准提示词模板生成SVG：

```javascript
const svgPrompt = `You are a world-class expert in Scalable Vector Graphics (SVG) design and coding. 
Your task is to generate a high-quality, visually stunning, and detailed SVG based on the user's description of an object or item.

Design Language:
- Style: [根据设计系统确定：手绘/扁平/水彩/纹理笔刷等]
- Technique: Flat illustration, watercolor, or textured brush style.
- Colors: 温暖、适度饱和，符合设计系统色板
- Lighting: 简单阴影或手绘纹理光照
- Atmosphere: 友好、故事感、陪伴感

Guidelines:
1. **Output Format**: Return ONLY the raw SVG code. Do not wrap it in markdown code blocks.
2. **Quality**: Use gradients, proper pathing, and distinct colors to create depth.
3. **Technical**: 
   - Always include a \`viewBox\` attribute.
   - Ensure the SVG is self-contained (no external references).
   - Use semantic IDs or classes if helpful.
   - Default size should be square (512x512) unless aspect ratio suggests otherwise.

${dimensions ? ` with dimensions ${dimensions}` : ''}`;
```

## Style Guidelines

根据设计系统选择风格：

### 手绘风格
- **适用场景**：温暖、可爱角色、友好场景
- **特点**：不规则线条、手绘质感、温暖色调
- **示例**：角色插图、场景插画、友好的图标

### 扁平风格
- **适用场景**：现代、简洁、UI图标
- **特点**：简洁线条、纯色填充、几何形状
- **示例**：UI图标、界面元素、抽象图形

### 水彩风格
- **适用场景**：柔和、艺术感、背景纹理
- **特点**：柔和渐变、透明度叠加、流动感
- **示例**：背景图案、装饰元素、艺术插图

### 纹理笔刷
- **适用场景**：质感、细节丰富、插画
- **特点**：笔刷纹理、细节丰富、艺术质感
- **示例**：产品插图、装饰图案、品牌元素

### 3D风格
- **适用场景**：立体感、现代、科技产品
- **特点**：立体阴影、透视效果、深度感
- **示例**：产品展示、3D图标、立体元素

### 极简主义
- **适用场景**：简洁、高端、品牌形象
- **特点**：留白、几何形状、单一色调
- **示例**：品牌图标、极简插图、抽象图形

### 复古风格
- **适用场景**：怀旧、经典、文化元素
- **特点**：复古色调、经典元素、怀旧质感
- **示例**：复古插图、经典图标、文化元素

### 赛博朋克
- **适用场景**：科技、未来、游戏
- **特点**：霓虹色彩、科技感、未来主义
- **示例**：科技插图、游戏元素、未来感图标

### 像素艺术
- **适用场景**：游戏、复古、趣味
- **特点**：像素化、复古游戏风格、块状元素
- **示例**：游戏图标、复古插图、趣味元素

### 线性风格
- **适用场景**：简洁、现代、信息图表
- **特点**：线条为主、简洁轮廓、单色或双色
- **示例**：信息图表、线性图标、简洁插图

### 渐变风格
- **适用场景**：现代、流动、品牌元素
- **特点**：渐变色彩、流动感、视觉冲击
- **示例**：品牌元素、渐变图标、现代插图

### 玻璃态
- **适用场景**：现代、半透明、UI设计
- **特点**：半透明、模糊效果、现代感
- **示例**：UI元素、玻璃态图标、现代界面

### 新拟态
- **适用场景**：柔和、现代、UI设计
- **特点**：柔和阴影、凸起效果、柔和质感
- **示例**：UI按钮、新拟态图标、柔和界面

### 波普艺术
- **适用场景**：鲜艳、大胆、艺术表达
- **特点**：鲜艳色彩、重复图案、大胆对比
- **示例**：艺术插图、波普图标、大胆设计

### 等距风格
- **适用场景**：游戏、场景、产品展示
- **特点**：等距视角、立体感、游戏风格
- **示例**：游戏场景、等距图标、产品展示

### 涂鸦风格
- **适用场景**：年轻、活力、街头文化
- **特点**：涂鸦质感、活力色彩、街头风格
- **示例**：街头插图、涂鸦图标、活力元素

## SVG Technical Requirements

- **viewBox**：必须包含viewBox属性
- **自包含**：SVG必须自包含，无外部引用
- **语义命名**：使用语义ID或类名
- **默认尺寸**：512x512，除非比例要求不同
- **优化**：路径优化，避免冗余代码
- **可访问性**：添加title和desc标签

## File Naming Convention

使用 `-placeholder.svg` 后缀：
- `hero-illustration-placeholder.svg` - 首页主图
- `product-icon-placeholder.svg` - 产品图标
- `background-pattern-placeholder.svg` - 背景图案
- `character-avatar-placeholder.svg` - 角色头像
- `feature-icon-placeholder.svg` - 功能图标

## Output Format

```markdown
# SVG Art: [描述]

## 文件名建议
`[描述]-placeholder.svg`

## SVG代码
[原始SVG代码，不使用markdown代码块包装]

## 使用说明
- 此SVG仅用于原型阶段占位符
- 生产环境必须替换为真实图片或设计系统资源
- 维护在 `_assets/SVG_PLACEHOLDERS.md` 替换清单中
```

## Replacement Tracking

维护 `_assets/SVG_PLACEHOLDERS.md` 清单：

```markdown
# SVG Art占位符替换清单

| 文件名 | 用途 | 替换为 | 状态 |
|--------|------|--------|------|
| hero-illustration-placeholder.svg | 首页主图 | 设计稿/真实图片 | 待替换 |
| product-icon-placeholder.svg | 产品图标 | SVG图标库 | 待替换 |
```

## Important Notes

- SVG Art仅用于原型阶段，生产环境必须替换
- 替换前确保风格与设计系统一致
- 保留SVG Art作为设计参考
- 优先使用真实图片（Wikimedia Commons、Unsplash）
- SVG Art是备选方案，不是首选

## Further Reading

- SVG 2.0 Specification - W3C
- SVG Accessibility Best Practices - W3C
- A Book Apart - SVG for Designers

## Psychology Principles Integration

### 认知负荷理论应用
- **简化输出**：直接输出SVG代码，减少用户认知负担
- **清晰命名**：使用语义化文件名，便于识别和管理
- **分组呈现**：将相关信息（文件名、代码、说明）分组呈现

### 格式塔原则应用
- **相似性**：使用一致的命名规范（-placeholder.svg）
- **邻近性**：相关内容在空间上靠近
- **闭合性**：完整的SVG代码，无需额外处理

### 损失厌恶应用
- **明确标注**：强调"仅用于原型阶段"，避免误用
- **替换提醒**：提供替换清单，降低遗忘风险
- **优先级提示**：强调真实图片优先，减少过度依赖
