# UI Function Constants

游戏UI功能常量，用于在游戏设计 role 和 skill 中引用复用。

## UI功能分类

| 中文名称 | 英文名称 | ID |
|---------|---------|-----|
| 登录界面 | Login Screen | 1067 |
| 创建角色 | Character Creation | 369 |
| 服务器选择 | Server Selection | 234 |
| 游戏公告 | Game Announcement | 651 |
| 过场动画 | Cutscene | 541 |
| 新手引导 | New Player Guide/Tutorial | 604 |
| 主界面 | Main Interface | 797 |
| Loading | Loading | 850 |
| 战斗界面 | Combat Interface | 1132 |
| 战斗提示 | Combat Hint/Tip | 889 |
| VS/匹配 | VS/Matchmaking | 277 |
| 升级提示 | Level Up Notification | 625 |
| 恭喜获得 | Congratulations/Reward Screen | 764 |
| 结算 | Settlement/Results Screen | 634 |
| 数据统计 | Data Statistics | 720 |
| 姓名输入 | Name Input | 407 |
| NPC对话 | NPC Dialogue | 785 |
| 章节提示 | Chapter Notification | 332 |
| 阵营选择 | Faction Selection | 202 |
| 功能解锁 | Feature Unlock | 182 |
| 菜单 | Menu | 878 |
| 玩家信息 | Player Information | 972 |
| 角色 | Character | 1074 |
| 背包 | Backpack/Inventory | 901 |
| 锻造/合成 | Forging/Synthesis | 466 |
| 技能 | Skills | 579 |
| 任务 | Quests | 796 |
| 成就 | Achievements | 257 |
| 关卡/挑战 | Levels/Challenges | 936 |
| 工会/帮派 | Guild/Clan | 201 |
| 外观/时装 | Appearance/Cosmetics | 406 |
| 图鉴 | Encyclopedia/Collection | 733 |
| 排行榜 | Leaderboard | 448 |
| 设置 | Settings | 1072 |
| 胜利/失败 | Victory/Defeat | 713 |
| 聊天 | Chat | 380 |
| 地图 | Map | 625 |
| 社交/好友 | Social/Friends | 438 |
| 赛季/段位 | Season/Rank | 138 |
| 宠物/坐骑 | Pets/Mounts | 214 |
| 邮件 | Mail | 578 |
| 拍卖行 | Auction House | 45 |
| 组队/阵容 | Team/Party | 536 |
| 暂停 | Pause | 127 |
| 卡组/卡牌 | Deck/Cards | 152 |
| 建造/家园 | Building/Homestead | 229 |
| 七日/签到 | 7-Day/Check-In | 562 |
| 变强 | Get Stronger | 206 |
| 十连抽 | 10-Pull Gacha | 219 |
| 招募 | Recruit | 565 |
| 商城 | Shop | 880 |
| 充值 | Recharge/Top-Up | 758 |
| 通行证 | Battle Pass | 206 |
| VIP | VIP | 135 |
| 首充 | First Recharge Bonus | 155 |
| 福利 | Benefits | 252 |
| 活动 | Events | 674 |
| 转盘/抽奖 | Spin Wheel/Lottery | 436 |
| 拍脸图 | Face-Touching Picture | 377 |
| 邀请好友 | Invite Friends | 39 |
| 拍照 | Photo | 43 |
| 结婚 | Marriage | 14 |
| 头像框/称号 | Avatar Frame/Title | 126 |
| 宝箱/金币 | Treasure Chest/Gold Coins | 220 |
| 红包 | Red Envelope | 39 |
| 提示 | Hint | 1228 |
| TIPS | TIPS | 237 |
| 节日 | Festival | 12 |

## 使用示例

```markdown
在游戏设计文档中引用UI功能：
- 核心界面：{{UI_FUNCTION_CONSTANTS.主界面}}
- 商业化功能：{{UI_FUNCTION_CONSTANTS.商城}}、{{UI_FUNCTION_CONSTANTS.充值}}
- 社交功能：{{UI_FUNCTION_CONSTANTS.社交/好友}}、{{UI_FUNCTION_CONSTANTS.公会/帮派}}
```

## 数据格式

```json
{
  "UI_FUNCTION_CONSTANTS": {
    "登录界面": {
      "english": "Login Screen",
      "id": 1067
    },
    "创建角色": {
      "english": "Character Creation",
      "id": 369
    },
    "服务器选择": {
      "english": "Server Selection",
      "id": 234
    },
    "游戏公告": {
      "english": "Game Announcement",
      "id": 651
    },
    "过场动画": {
      "english": "Cutscene",
      "id": 541
    },
    "新手引导": {
      "english": "New Player Guide/Tutorial",
      "id": 604
    },
    "主界面": {
      "english": "Main Interface",
      "id": 797
    },
    "Loading": {
      "english": "Loading",
      "id": 850
    },
    "战斗界面": {
      "english": "Combat Interface",
      "id": 1132
    },
    "战斗提示": {
      "english": "Combat Hint/Tip",
      "id": 889
    },
    "VS/匹配": {
      "english": "VS/Matchmaking",
      "id": 277
    },
    "升级提示": {
      "english": "Level Up Notification",
      "id": 625
    },
    "恭喜获得": {
      "english": "Congratulations/Reward Screen",
      "id": 764
    },
    "结算": {
      "english": "Settlement/Results Screen",
      "id": 634
    },
    "数据统计": {
      "english": "Data Statistics",
      "id": 720
    },
    "姓名输入": {
      "english": "Name Input",
      "id": 407
    },
    "NPC对话": {
      "english": "NPC Dialogue",
      "id": 785
    },
    "章节提示": {
      "english": "Chapter Notification",
      "id": 332
    },
    "阵营选择": {
      "english": "Faction Selection",
      "id": 202
    },
    "功能解锁": {
      "english": "Feature Unlock",
      "id": 182
    },
    "菜单": {
      "english": "Menu",
      "id": 878
    },
    "玩家信息": {
      "english": "Player Information",
      "id": 972
    },
    "角色": {
      "english": "Character",
      "id": 1074
    },
    "背包": {
      "english": "Backpack/Inventory",
      "id": 901
    },
    "锻造/合成": {
      "english": "Forging/Synthesis",
      "id": 466
    },
    "技能": {
      "english": "Skills",
      "id": 579
    },
    "任务": {
      "english": "Quests",
      "id": 796
    },
    "成就": {
      "english": "Achievements",
      "id": 257
    },
    "关卡/挑战": {
      "english": "Levels/Challenges",
      "id": 936
    },
    "工会/帮派": {
      "english": "Guild/Clan",
      "id": 201
    },
    "外观/时装": {
      "english": "Appearance/Cosmetics",
      "id": 406
    },
    "图鉴": {
      "english": "Encyclopedia/Collection",
      "id": 733
    },
    "排行榜": {
      "english": "Leaderboard",
      "id": 448
    },
    "设置": {
      "english": "Settings",
      "id": 1072
    },
    "胜利/失败": {
      "english": "Victory/Defeat",
      "id": 713
    },
    "聊天": {
      "english": "Chat",
      "id": 380
    },
    "地图": {
      "english": "Map",
      "id": 625
    },
    "社交/好友": {
      "english": "Social/Friends",
      "id": 438
    },
    "赛季/段位": {
      "english": "Season/Rank",
      "id": 138
    },
    "宠物/坐骑": {
      "english": "Pets/Mounts",
      "id": 214
    },
    "邮件": {
      "english": "Mail",
      "id": 578
    },
    "拍卖行": {
      "english": "Auction House",
      "id": 45
    },
    "组队/阵容": {
      "english": "Team/Party",
      "id": 536
    },
    "暂停": {
      "english": "Pause",
      "id": 127
    },
    "卡组/卡牌": {
      "english": "Deck/Cards",
      "id": 152
    },
    "建造/家园": {
      "english": "Building/Homestead",
      "id": 229
    },
    "七日/签到": {
      "english": "7-Day/Check-In",
      "id": 562
    },
    "变强": {
      "english": "Get Stronger",
      "id": 206
    },
    "十连抽": {
      "english": "10-Pull Gacha",
      "id": 219
    },
    "招募": {
      "english": "Recruit",
      "id": 565
    },
    "商城": {
      "english": "Shop",
      "id": 880
    },
    "充值": {
      "english": "Recharge/Top-Up",
      "id": 758
    },
    "通行证": {
      "english": "Battle Pass",
      "id": 206
    },
    "VIP": {
      "english": "VIP",
      "id": 135
    },
    "首充": {
      "english": "First Recharge Bonus",
      "id": 155
    },
    "福利": {
      "english": "Benefits",
      "id": 252
    },
    "活动": {
      "english": "Events",
      "id": 674
    },
    "转盘/抽奖": {
      "english": "Spin Wheel/Lottery",
      "id": 436
    },
    "拍脸图": {
      "english": "Face-Touching Picture",
      "id": 377
    },
    "邀请好友": {
      "english": "Invite Friends",
      "id": 39
    },
    "拍照": {
      "english": "Photo",
      "id": 43
    },
    "结婚": {
      "english": "Marriage",
      "id": 14
    },
    "头像框/称号": {
      "english": "Avatar Frame/Title",
      "id": 126
    },
    "宝箱/金币": {
      "english": "Treasure Chest/Gold Coins",
      "id": 220
    },
    "红包": {
      "english": "Red Envelope",
      "id": 39
    },
    "提示": {
      "english": "Hint",
      "id": 1228
    },
    "TIPS": {
      "english": "TIPS",
      "id": 237
    },
    "节日": {
      "english": "Festival",
      "id": 12
    }
  }
}
```
