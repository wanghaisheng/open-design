# Game Type Constants

游戏类型常量，用于在游戏设计 role 和 skill 中引用复用。

## 游戏类型分类

| 中文名称 | 英文名称 | ID |
|---------|---------|-----|
| 射击游戏 | Shooting Game | 562 |
| 动作游戏 | Action Game | 544 |
| 角色扮演 | Role-Playing Game / RPG | 2476 |
| 冒险游戏 | Adventure Game | 892 |
| 竞速游戏 | Racing Game | 165 |
| 策略游戏 | Strategy Game | 1260 |
| 格斗游戏 | Fighting Game | 100 |
| 即时战略 | Real-Time Strategy / RTS | 218 |
| 体育游戏 | Sports Game | 93 |
| 桌游棋牌 | Tabletop & Card Games | 204 |
| 模拟经营 | Simulation & Management Game | 1001 |
| 音乐游戏 | Music Game | 89 |
| 恋爱养成 | Dating Sim | 155 |
| 卡牌 | Card Game | 1054 |
| MOBA | Multiplayer Online Battle Arena | 120 |
| 消除游戏 | Puzzle Game / Matching Game | 416 |
| 塔防 | Tower Defense | 248 |
| MMORPG | Massively Multiplayer Online Role-Playing Game | 294 |
| SLOTS | SLOTS | 38 |

## 使用示例

```markdown
在游戏设计文档中引用游戏类型：
- 游戏类型：{{GAME_TYPE_CONSTANTS.角色扮演}}
- 核心玩法：{{GAME_TYPE_CONSTANTS.卡牌}}
```

## 数据格式

```json
{
  "GAME_TYPE_CONSTANTS": {
    "射击游戏": {
      "english": "Shooting Game",
      "id": 562
    },
    "动作游戏": {
      "english": "Action Game",
      "id": 544
    },
    "角色扮演": {
      "english": "Role-Playing Game / RPG",
      "id": 2476
    },
    "冒险游戏": {
      "english": "Adventure Game",
      "id": 892
    },
    "竞速游戏": {
      "english": "Racing Game",
      "id": 165
    },
    "策略游戏": {
      "english": "Strategy Game",
      "id": 1260
    },
    "格斗游戏": {
      "english": "Fighting Game",
      "id": 100
    },
    "即时战略": {
      "english": "Real-Time Strategy / RTS",
      "id": 218
    },
    "体育游戏": {
      "english": "Sports Game",
      "id": 93
    },
    "桌游棋牌": {
      "english": "Tabletop & Card Games",
      "id": 204
    },
    "模拟经营": {
      "english": "Simulation & Management Game",
      "id": 1001
    },
    "音乐游戏": {
      "english": "Music Game",
      "id": 89
    },
    "恋爱养成": {
      "english": "Dating Sim",
      "id": 155
    },
    "卡牌": {
      "english": "Card Game",
      "id": 1054
    },
    "MOBA": {
      "english": "Multiplayer Online Battle Arena",
      "id": 120
    },
    "消除游戏": {
      "english": "Puzzle Game / Matching Game",
      "id": 416
    },
    "塔防": {
      "english": "Tower Defense",
      "id": 248
    },
    "MMORPG": {
      "english": "Massively Multiplayer Online Role-Playing Game",
      "id": 294
    },
    "SLOTS": {
      "english": "SLOTS",
      "id": 38
    }
  }
}
```
