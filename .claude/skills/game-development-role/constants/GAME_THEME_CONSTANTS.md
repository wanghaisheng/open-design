# Game Theme Constants

游戏主题常量，用于在游戏设计 role 和 skill 中引用复用。

## 游戏主题分类

| 中文名称 | 英文名称 | ID |
|---------|---------|-----|
| 武侠 | Wuxia / Martial Arts | 526 |
| 仙侠 | Xianxia / Fantasy-Martial Arts | 627 |
| 三国 | Sanguo / Three Kingdoms | 354 |
| 西游 | Xiyou / Journey to the West | 97 |
| 宫廷 | Gongting / Imperial Court | 91 |
| 动漫ACG | Anime, Comics, Games | 894 |
| 魔幻 | Mohuan / Fantasy | 1049 |
| 科幻未来 | Kehuan Weilai / Sci-Fi Future | 778 |
| 奇幻/幻想 | Qihuan/Huanxiang / Fantasy | 1427 |
| 中世纪 | Zhongshiji / Medieval | 505 |
| 现代 | Xiandai / Modern | 784 |
| 末日废土 | Mori Feitu / Post-Apocalyptic Wasteland | 268 |
| 赛博朋克 | Saibopengke / Cyberpunk | 273 |
| 蒸汽朋克 | Zhengqi Pengke / Steampunk | 117 |
| 现代军事 | Xiandai Junshi / Modern Military | 208 |
| 战争 | Zhanzheng / War | 488 |
| 坦克 | Tank | 59 |
| 机甲 | Jijia / Mecha | 243 |
| 哥特 | Gete / Gothic | 117 |
| 文艺复兴 | Wenyi Fuxing / Renaissance | 91 |
| 恐怖 | Kongbu / Horror | 246 |
| 唯美 | Weimei / Aesthetic/Beautiful | 643 |
| 东方 | Dongfang / Oriental | 931 |
| 和风 | Hefeng / Japanese Style | 183 |
| 美式 | Meishi / American Style | 1089 |
| 美漫风 | Meiman Feng / American Comic Style | 465 |
| 轻国风 | Qing Guofeng / Light Chinese Style | 569 |
| 敦煌风 | Dunhuang Feng / Dunhuang Style | 73 |
| 像素 | Xiangsu / Pixel | 246 |
| 赛璐璐 | Sailulu / Cel-Shaded | 72 |
| 水墨风 | Shuimo Feng / Ink Wash Painting Style | 326 |
| 扁平 | Bianping / Flat | 1599 |
| 厚涂 | Houtu / Impasto/Thick Paint | 158 |
| 萌系 | Mengxi / Moe/Cute Style | 938 |
| 卡通 | Katong / Cartoon | 3524 |
| 休闲 | Xiuxian / Casual | 3833 |
| 可爱 | Ke'ai / Cute/Lovely | 1365 |
| 写实 | Xieshi / Realistic | 579 |
| 石器时代 | Shiqi Shidai / Stone Age | 56 |
| 烹饪 | Pengren / Cooking | 61 |
| 传奇 | Chuanqi / Legend/Myth | 34 |
| 女性向 | Nvxing Xiang / Female-Oriented | 412 |
| 乙女 | Yinv / Otome | 200 |
| 回合制 | Hehezhi / Turn-Based | 1094 |
| 沙盒 | Shazhuo / Sandbox | 171 |
| 多人 | Duoren / Multiplayer | 1277 |
| 益智 | Yizhi / Puzzle | 1858 |
| 大逃杀 | Dataosha / Battle Royale | 126 |
| 校园 | Xiaoyuan / School | 43 |
| 盗墓 | Daomu / Tomb Raiding | 9 |
| 文字 | Wenzi / Text-Based | 172 |
| 跑酷 | Paoku / Parkour/Running | 81 |
| 棋牌 | Qipai / Board Games/Card Games | 212 |
| 老虎机 | Laohuji / Slot Machine | 38 |
| 捕鱼 | Buyu / Fishing | 50 |
| 独立游戏 | Duli Youxi / Indie Game | 919 |
| 放置 | Fangzhi / Idle | 1275 |
| 挂机 | Guaji / AFK | 993 |
| Roguelike | Roguelike | 441 |
| 丧尸 | Sangshi / Zombie | 160 |
| 暗黑 | Anhei / Dark | 324 |
| 影视 | Yingshi / Film & Television | 114 |
| 风格化 | Fenggehua / Stylized | - |

## 使用示例

```markdown
在游戏设计文档中引用游戏主题：
- 游戏主题：{{GAME_THEME_CONSTANTS.武侠}}
- 视觉风格：{{GAME_THEME_CONSTANTS.赛博朋克}}
- 目标用户：{{GAME_THEME_CONSTANTS.女性向}}
```

## 数据格式

```json
{
  "GAME_THEME_CONSTANTS": {
    "武侠": {
      "english": "Wuxia / Martial Arts",
      "id": 526
    },
    "仙侠": {
      "english": "Xianxia / Fantasy-Martial Arts",
      "id": 627
    },
    "三国": {
      "english": "Sanguo / Three Kingdoms",
      "id": 354
    },
    "西游": {
      "english": "Xiyou / Journey to the West",
      "id": 97
    },
    "宫廷": {
      "english": "Gongting / Imperial Court",
      "id": 91
    },
    "动漫ACG": {
      "english": "Anime, Comics, Games",
      "id": 894
    },
    "魔幻": {
      "english": "Mohuan / Fantasy",
      "id": 1049
    },
    "科幻未来": {
      "english": "Kehuan Weilai / Sci-Fi Future",
      "id": 778
    },
    "奇幻/幻想": {
      "english": "Qihuan/Huanxiang / Fantasy",
      "id": 1427
    },
    "中世纪": {
      "english": "Zhongshiji / Medieval",
      "id": 505
    },
    "现代": {
      "english": "Xiandai / Modern",
      "id": 784
    },
    "末日废土": {
      "english": "Mori Feitu / Post-Apocalyptic Wasteland",
      "id": 268
    },
    "赛博朋克": {
      "english": "Saibopengke / Cyberpunk",
      "id": 273
    },
    "蒸汽朋克": {
      "english": "Zhengqi Pengke / Steampunk",
      "id": 117
    },
    "现代军事": {
      "english": "Xiandai Junshi / Modern Military",
      "id": 208
    },
    "战争": {
      "english": "Zhanzheng / War",
      "id": 488
    },
    "坦克": {
      "english": "Tank",
      "id": 59
    },
    "机甲": {
      "english": "Jijia / Mecha",
      "id": 243
    },
    "哥特": {
      "english": "Gete / Gothic",
      "id": 117
    },
    "文艺复兴": {
      "english": "Wenyi Fuxing / Renaissance",
      "id": 91
    },
    "恐怖": {
      "english": "Kongbu / Horror",
      "id": 246
    },
    "唯美": {
      "english": "Weimei / Aesthetic/Beautiful",
      "id": 643
    },
    "东方": {
      "english": "Dongfang / Oriental",
      "id": 931
    },
    "和风": {
      "english": "Hefeng / Japanese Style",
      "id": 183
    },
    "美式": {
      "english": "Meishi / American Style",
      "id": 1089
    },
    "美漫风": {
      "english": "Meiman Feng / American Comic Style",
      "id": 465
    },
    "轻国风": {
      "english": "Qing Guofeng / Light Chinese Style",
      "id": 569
    },
    "敦煌风": {
      "english": "Dunhuang Feng / Dunhuang Style",
      "id": 73
    },
    "像素": {
      "english": "Xiangsu / Pixel",
      "id": 246
    },
    "赛璐璐": {
      "english": "Sailulu / Cel-Shaded",
      "id": 72
    },
    "水墨风": {
      "english": "Shuimo Feng / Ink Wash Painting Style",
      "id": 326
    },
    "扁平": {
      "english": "Bianping / Flat",
      "id": 1599
    },
    "厚涂": {
      "english": "Houtu / Impasto/Thick Paint",
      "id": 158
    },
    "萌系": {
      "english": "Mengxi / Moe/Cute Style",
      "id": 938
    },
    "卡通": {
      "english": "Katong / Cartoon",
      "id": 3524
    },
    "休闲": {
      "english": "Xiuxian / Casual",
      "id": 3833
    },
    "可爱": {
      "english": "Ke'ai / Cute/Lovely",
      "id": 1365
    },
    "写实": {
      "english": "Xieshi / Realistic",
      "id": 579
    },
    "石器时代": {
      "english": "Shiqi Shidai / Stone Age",
      "id": 56
    },
    "烹饪": {
      "english": "Pengren / Cooking",
      "id": 61
    },
    "传奇": {
      "english": "Chuanqi / Legend/Myth",
      "id": 34
    },
    "女性向": {
      "english": "Nvxing Xiang / Female-Oriented",
      "id": 412
    },
    "乙女": {
      "english": "Yinv / Otome",
      "id": 200
    },
    "回合制": {
      "english": "Hehezhi / Turn-Based",
      "id": 1094
    },
    "沙盒": {
      "english": "Shazhuo / Sandbox",
      "id": 171
    },
    "多人": {
      "english": "Duoren / Multiplayer",
      "id": 1277
    },
    "益智": {
      "english": "Yizhi / Puzzle",
      "id": 1858
    },
    "大逃杀": {
      "english": "Dataosha / Battle Royale",
      "id": 126
    },
    "校园": {
      "english": "Xiaoyuan / School",
      "id": 43
    },
    "盗墓": {
      "english": "Daomu / Tomb Raiding",
      "id": 9
    },
    "文字": {
      "english": "Wenzi / Text-Based",
      "id": 172
    },
    "跑酷": {
      "english": "Paoku / Parkour/Running",
      "id": 81
    },
    "棋牌": {
      "english": "Qipai / Board Games/Card Games",
      "id": 212
    },
    "老虎机": {
      "english": "Laohuji / Slot Machine",
      "id": 38
    },
    "捕鱼": {
      "english": "Buyu / Fishing",
      "id": 50
    },
    "独立游戏": {
      "english": "Duli Youxi / Indie Game",
      "id": 919
    },
    "放置": {
      "english": "Fangzhi / Idle",
      "id": 1275
    },
    "挂机": {
      "english": "Guaji / AFK",
      "id": 993
    },
    "Roguelike": {
      "english": "Roguelike",
      "id": 441
    },
    "丧尸": {
      "english": "Sangshi / Zombie",
      "id": 160
    },
    "暗黑": {
      "english": "Anhei / Dark",
      "id": 324
    },
    "影视": {
      "english": "Yingshi / Film & Television",
      "id": 114
    },
    "风格化": {
      "english": "Fenggehua / Stylized",
      "id": -1
    }
  }
}
```
