# Layout Constants

游戏版式常量，用于在游戏设计 role 和 skill 中引用复用。

## 版式分类

| 中文名称 | 英文名称 | 说明 |
|---------|---------|------|
| 横屏 | Landscape | 横向屏幕布局 |
| 竖屏 | Portrait | 纵向屏幕布局 |

## 使用示例

```markdown
在游戏设计文档中引用版式：
- 屏幕方向：{{LAYOUT_CONSTANTS.横屏}}
- 布局模式：{{LAYOUT_CONSTANTS.竖屏}}
```

## 数据格式

```json
{
  "LAYOUT_CONSTANTS": {
    "横屏": {
      "english": "Landscape",
      "description": "横向屏幕布局"
    },
    "竖屏": {
      "english": "Portrait",
      "description": "纵向屏幕布局"
    }
  }
}
```
