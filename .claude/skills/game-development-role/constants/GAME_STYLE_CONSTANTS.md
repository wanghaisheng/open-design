# Game Style Constants

游戏风格常量，用于在游戏设计 role 和 skill 中引用复用。

## 风格分类

| 中文名称 | 英文名称 | ID |
|---------|---------|-----|
| 国风 | Guofeng / Chinese Style | 305006 |
| 欧美 | Oumei / Western Style | 238751 |
| 二次元 | Ercitciyuan / Anime Style | 305925 |
| 日韩 | RiHan / Japanese & Korean Style | 105021 |
| Q版卡通 | Qban Katong / Q-Style Cartoon / Chibi | 404174 |
| 科幻 | Kehuan / Sci-Fi | 45170 |
| 军事 | Junshi / Military | 28596 |

## 使用示例

```markdown
在游戏设计文档中引用风格：
- 游戏风格：{{GAME_STYLE_CONSTANTS.国风}}
- 视觉风格：{{GAME_STYLE_CONSTANTS.二次元}}
```

## 数据格式

```json
{
  "GAME_STYLE_CONSTANTS": {
    "国风": {
      "english": "Guofeng / Chinese Style",
      "id": 305006
    },
    "欧美": {
      "english": "Oumei / Western Style",
      "id": 238751
    },
    "二次元": {
      "english": "Ercitciyuan / Anime Style",
      "id": 305925
    },
    "日韩": {
      "english": "RiHan / Japanese & Korean Style",
      "id": 105021
    },
    "Q版卡通": {
      "english": "Qban Katong / Q-Style Cartoon / Chibi",
      "id": 404174
    },
    "科幻": {
      "english": "Kehuan / Sci-Fi",
      "id": 45170
    },
    "军事": {
      "english": "Junshi / Military",
      "id": 28596
    }
  }
}
```
