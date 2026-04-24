# Game Constants

游戏常量库，用于在游戏设计 role 和 skill 中引用复用。

## 可用常量文件

| 文件名 | 描述 | 用途 |
|--------|------|------|
| GAME_STYLE_CONSTANTS.md | 游戏风格常量 | 定义游戏视觉风格（国风、欧美、二次元等） |
| GAME_TYPE_CONSTANTS.md | 游戏类型常量 | 定义游戏类型（RPG、卡牌、MOBA等） |
| GAME_THEME_CONSTANTS.md | 游戏主题常量 | 定义游戏主题（武侠、科幻、赛博朋克等） |
| UI_FUNCTION_CONSTANTS.md | UI功能常量 | 定义游戏UI功能（登录、战斗、商城等） |
| MATERIAL_PATTERN_CONSTANTS.md | 材质图案常量 | 定义UI材质和图案（木头、金属、云纹等） |
| PLATFORM_CONSTANTS.md | 平台常量 | 定义游戏平台（手游、PC、主机等） |
| LAYOUT_CONSTANTS.md | 版式常量 | 定义屏幕版式（横屏、竖屏） |

## 使用方法

在游戏设计文档中引用常量：

```markdown
- 游戏风格：{{GAME_STYLE_CONSTANTS.国风}}
- 游戏类型：{{GAME_TYPE_CONSTANTS.角色扮演}}
- 游戏主题：{{GAME_THEME_CONSTANTS.武侠}}
- 核心界面：{{UI_FUNCTION_CONSTANTS.主界面}}
- UI材质：{{MATERIAL_PATTERN_CONSTANTS.木头}}
- 目标平台：{{PLATFORM_CONSTANTS.手游}}
- 屏幕方向：{{LAYOUT_CONSTANTS.横屏}}
```

## 数据格式

每个常量文件都包含：
- 中文名称
- 英文名称
- ID（如有）
- 描述（如有）

同时提供 JSON 格式数据，便于程序化处理。

## 维护说明

- 所有常量数据来源于 `game-assets.md`
- 如需更新常量，请同步更新源文件和常量文件
- 新增常量类别时，请在此 README 中添加说明
