# 游戏分类参考文档

## 概述

本文档提供了游戏开发中常用的分类体系，包括风格、类型、主题、功能、材质图案、平台、版式等维度。这些分类信息可以帮助游戏开发 role skill 在设计、开发、测试等阶段做出更准确的决策。

**数据来源：** openagenticgame-gdd-master/ref/game-category-list.md  
**最后更新：** 2025-04-25

---

## 1. 风格 (Style)

游戏美术风格分类，用于确定游戏的视觉方向。

### 主要风格

| 风格 | 英文 | 热度 |
|------|------|------|
| 国风 | Guofeng / Chinese Style | 305006 |
| 欧美 | Oumei / Western Style | 238751 |
| 二次元 | Ercitciyuan / Anime Style | 305925 |
| 日韩 | RiHan / Japanese & Korean Style | 105021 |
| Q版卡通 | Qban Katong / Q-Style Cartoon / Chibi | 404174 |
| 科幻 | Kehuan / Sci-Fi | 45170 |
| 军事 | Junshi / Military | 28596 |

### 在 Skill 中的应用

- **concept-art**：确定游戏概念美术风格
- **concept-art-generation**：生成特定风格的概念美术
- **visual-exploration**：探索游戏视觉风格
- **character-development**：设计角色风格
- **environment-design**：设计环境风格

---

## 2. 类型 (Type)

游戏类型分类，用于确定游戏的核心玩法机制。

### 主要类型

| 类型 | 英文 | 热度 |
|------|------|------|
| 角色扮演 | Role-Playing Game / RPG | 2476 |
| 模拟经营 | Simulation & Management Game | 1001 |
| 卡牌 | Card Game | 1054 |
| 策略游戏 | Strategy Game | 1260 |
| 射击游戏 | Shooting Game | 562 |
| 动作游戏 | Action Game | 544 |
| 冒险游戏 | Adventure Game | 892 |
| 消除游戏 | Puzzle Game / Matching Game | 416 |
| 塔防 | Tower Defense | 248 |
| 桌游棋牌 | Tabletop & Card Games | 204 |
| MMORPG | Massively Multiplayer Online Role-Playing Game | 294 |
| MOBA | Multiplayer Online Battle Arena | 120 |
| 即时战略 | Real-Time Strategy / RTS | 218 |
| 格斗游戏 | Fighting Game | 100 |
| 竞速游戏 | Racing Game | 165 |
| 体育游戏 | Sports Game | 93 |
| 音乐游戏 | Music Game | 89 |
| 恋爱养成 | Dating Sim | 155 |
| SLOTS | SLOTS | 38 |

### 在 Skill 中的应用

- **system-design**：确定游戏系统设计方向
- **core-loop-design**：设计核心玩法循环
- **gameplay-implementation**：实现特定类型的玩法
- **level-design**：设计适合该类型的关卡
- **balance-check**：平衡该类型的游戏数值

---

## 3. 主题 (Theme)

游戏主题分类，用于确定游戏的故事背景和世界观。

### 主要主题

| 主题 | 英文 | 热度 |
|------|------|------|
| 奇幻/幻想 | Qihuan/Huanxiang / Fantasy | 1427 |
| 魔幻 | Mohuan / Fantasy | 1049 |
| 美式 | Meishi / American Style | 1089 |
| 扁平 | Bianping / Flat | 1599 |
| 卡通 | Katong / Cartoon | 3524 |
| 休闲 | Xiuxian / Casual | 3833 |
| 益智 | Yizhi / Puzzle | 1858 |
| 可爱 | Ke'ai / Cute/Lovely | 1365 |
| 回合制 | Hehezhi / Turn-Based | 1094 |
| 多人 | Duoren / Multiplayer | 1277 |
| 放置 | Fangzhi / Idle | 1275 |
| 挂机 | Guaji / AFK | 993 |
| 萌系 | Mengxi / Moe/Cute Style | 938 |
| 东方 | Dongfang / Oriental | 931 |
| 独立游戏 | Duli Youxi / Indie Game | 919 |
| 现代军事 | Xiandai Junshi / Modern Military | 208 |
| 赛博朋克 | Saibopengke / Cyberpunk | 273 |
| 末日废土 | Mori Feitu / Post-Apocalyptic Wasteland | 268 |
| Roguelike | Roguelike | 441 |
| 大逃杀 | Dataosha / Battle Royale | 126 |
| 武侠 | Wuxia / Martial Arts | 526 |
| 仙侠 | Xianxia / Fantasy-Martial Arts | 627 |
| 三国 | Sanguo / Three Kingdoms | 354 |
| 动漫ACG | Anime, Comics, Games | 894 |
| 科幻未来 | Kehuan Weilai / Sci-Fi Future | 778 |
| 现代 | Xiandai / Modern | 784 |
| 中世纪 | Zhongshiji / Medieval | 505 |
| 战争 | Zhanzheng / War | 488 |
| 恐怖 | Kongbu / Horror | 246 |
| 像素 | Xiangsu / Pixel | 246 |
| 沙盒 | Shazhuo / Sandbox | 171 |
| 文字 | Wenzi / Text-Based | 172 |
| 机甲 | Jijia / Mecha | 243 |
| 女性向 | Nvxing Xiang / Female-Oriented | 412 |
| 乙女 | Yinv / Otome | 200 |

### 在 Skill 中的应用

- **world-creation**：创建游戏世界和主题
- **narrative-design**：设计符合主题的叙事
- **story-design**：设计符合主题的故事
- **environment-design**：设计符合主题的环境
- **character-development**：设计符合主题的角色

---

## 4. 功能 (Function)

游戏 UI 功能分类，用于确定游戏需要实现的功能模块。

### 核心功能

| 功能 | 英文 | 热度 |
|------|------|------|
| 提示 | Hint | 1228 |
| 战斗界面 | Combat Interface | 1132 |
| 角色 | Character | 1074 |
| 设置 | Settings | 1072 |
| 登录界面 | Login Screen | 1067 |
| 主界面 | Main Interface | 797 |
| 任务 | Quests | 796 |
| Loading | Loading | 850 |
| 战斗提示 | Combat Hint/Tip | 889 |
| 菜单 | Menu | 878 |
| 商城 | Shop | 880 |
| 玩家信息 | Player Information | 972 |
| 背包 | Backpack/Inventory | 901 |
| 关卡/挑战 | Levels/Challenges | 936 |
| 充值 | Recharge/Top-Up | 758 |
| 胜利/失败 | Victory/Defeat | 713 |
| NPC对话 | NPC Dialogue | 785 |
| 恭喜获得 | Congratulations/Reward Screen | 764 |
| 数据统计 | Data Statistics | 720 |
| 升级提示 | Level Up Notification | 625 |
| 地图 | Map | 625 |
| 邮件 | Mail | 578 |
| 游戏公告 | Game Announcement | 651 |
| 新手引导 | New Player Guide/Tutorial | 604 |
| 招募 | Recruit | 565 |
| 过场动画 | Cutscene | 541 |
| 组队/阵容 | Team/Party | 536 |
| 图鉴 | Encyclopedia/Collection | 733 |
| 技能 | Skills | 579 |
| 活动 | Events | 674 |
| 锻造/合成 | Forging/Synthesis | 466 |
| 转盘/抽奖 | Spin Wheel/Lottery | 436 |
| 十连抽 | 10-Pull Gacha | 219 |
| 宝箱/金币 | Treasure Chest/Gold Coins | 220 |
| 结算 | Settlement/Results Screen | 634 |
| 社交/好友 | Social/Friends | 438 |
| 排行榜 | Leaderboard | 448 |
| 聊天 | Chat | 380 |
| 外观/时装 | Appearance/Cosmetics | 406 |
| 工会/帮派 | Guild/Clan | 201 |
| 宠物/坐骑 | Pets/Mounts | 214 |
| 建造/家园 | Building/Homestead | 229 |
| 七日/签到 | 7-Day/Check-In | 562 |
| 通行证 | Battle Pass | 206 |
| VIP | VIP | 135 |
| 首充 | First Recharge Bonus | 155 |
| 变强 | Get Stronger | 206 |
| 福利 | Benefits | 252 |
| 拍脸图 | Face-Touching Picture | 377 |
| 成就 | Achievements | 257 |

### 在 Skill 中的应用

- **ui-design**：设计游戏 UI 功能
- **ui-implementation**：实现 UI 功能
- **system-design**：设计游戏系统功能
- **gameplay-implementation**：实现游戏功能
- **economy-design**：设计经济相关功能（商城、充值、VIP等）
- **vip-system-design**：设计 VIP 功能
- **gacha-system-design**：设计抽卡功能（十连抽、转盘等）

---

## 5. 材质图案 (Material & Pattern)

游戏 UI 材质和图案分类，用于确定 UI 的视觉质感。

### 主要材质

| 材质 | 英文 | 热度 |
|------|------|------|
| 纸张 | Zhizhang / Paper | 292 |
| 书籍 | Shuji / Book | 160 |
| 卷轴 | Juanzhou / Scroll | 105 |
| 台子/桌面 | Taizi/Zhuomian / Platform/Tabletop | 67 |
| 木头 | Mutou / Wood | 60 |
| 水晶/玻璃 | Shuijing/Boli / Crystal/Glass | 135 |
| 代码/发光 | Daima/Faguang / Code/Glow | 96 |
| 魔法阵 | Mofazhen / Magic Circle | 104 |
| 华丽 | Huali / Gorgeous/Ornate | 21 |
| 场景化 | Changjinghua / Scenic | 155 |
| 海报 | Haibao / Poster | 32 |
| 镭射 | Leishe / Laser | 31 |
| 云纹 | Yunwen / Cloud Pattern | 9 |
| 花瓣/樱花 | Huaban/Yinghua / Petal/Cherry Blossom | 9 |
| 光影 | Guangying / Light & Shadow | 17 |
| 笔触/做旧 | Bichu/Zuojiu / Brushstroke/Aged | 14 |

### 在 Skill 中的应用

- **ui-design**：设计 UI 材质和图案
- **concept-art**：确定美术材质风格
- **visual-exploration**：探索材质和图案效果

---

## 6. 平台 (Platform)

游戏平台分类，用于确定游戏的目标平台。

### 主要平台

| 平台 | 说明 |
|------|------|
| 手游 | 移动端游戏 |
| 手游 iOS | iOS 平台 |
| 手游安卓 | Android 平台 |
| 手游微信小程序 | 微信小程序 |
| 手游抖音小程序 | 抖音小程序 |
| 手游支付宝小程序 | 支付宝小程序 |
| PC | PC 平台 |
| 主机 | 主机平台（PS、Xbox等） |
| 掌机 | 掌机平台（Switch等） |

### 在 Skill 中的应用

- **mobile-development**：移动端开发
- **pc-development**：PC 端开发
- **console-development**：主机端开发
- **unity-development**：Unity 引擎开发（跨平台）
- **unreal-development**：Unreal Engine 开发（跨平台）

---

## 7. 版式 (Layout)

游戏版式分类，用于确定游戏的屏幕方向。

### 主要版式

| 版式 | 说明 |
|------|------|
| 横屏 | 横向屏幕布局 |
| 竖屏 | 纵向屏幕布局 |

### 在 Skill 中的应用

- **ui-design**：设计 UI 版式
- **ui-implementation**：实现 UI 版式
- **mobile-development**：移动端版式适配

---

## 8. 上线年份 (Release Year)

游戏上线年份，用于确定游戏的时代背景或发布时间。

### 在 Skill 中的应用

- **concept-creation**：确定游戏的时代背景
- **world-creation**：创建符合时代的游戏世界
- **narrative-design**：设计符合时代的故事

---

## 使用指南

### 在游戏开发流程中的应用

#### 前期策划阶段

- **brainstorm**：使用风格、类型、主题分类进行创意头脑风暴
- **concept-creation**：基于分类确定游戏概念
- **concept-evaluation**：评估概念的可行性和市场潜力

#### 设计阶段

- **system-design**：基于类型和功能分类设计游戏系统
- **core-loop-design**：基于类型设计核心玩法循环
- **ui-design**：基于功能和材质分类设计 UI
- **world-creation**：基于主题分类创建游戏世界
- **character-development**：基于风格和主题设计角色

#### 开发阶段

- **gameplay-implementation**：基于类型实现玩法
- **ui-implementation**：基于功能实现 UI
- **mobile-development** / **pc-development**：基于平台进行开发

#### 测试阶段

- **functional-testing**：基于功能分类进行功能测试
- **ui-qa**：基于功能和材质进行 UI 质量检查

### 在商业化设计中的应用

- **economy-design**：基于功能分类设计经济系统（商城、充值、VIP等）
- **vip-system-design**：基于功能分类设计 VIP 系统
- **gacha-system-design**：基于功能分类设计抽卡系统（十连抽、转盘等）
- **commercialization-benchmark-analysis**：基于类型和主题分析竞品商业化策略

### 在运营策略中的应用

- **3b-habit-formation**：基于功能分类设计用户习惯养成策略（七日签到、活动等）
- **community-system-design**：基于功能分类设计社区系统（社交、好友、公会等）

---

## 技能映射表

| Skill | 主要使用的分类 |
|-------|---------------|
| concept-art | 风格、主题、材质图案 |
| concept-art-generation | 风格、主题、材质图案 |
| visual-exploration | 风格、主题、材质图案 |
| system-design | 类型、功能 |
| core-loop-design | 类型 |
| ui-design | 功能、材质图案、版式 |
| ui-implementation | 功能、版式 |
| world-creation | 主题、风格 |
| narrative-design | 主题、风格 |
| character-development | 风格、主题 |
| environment-design | 风格、主题、材质图案 |
| economy-design | 功能（商城、充值、VIP等） |
| vip-system-design | 功能（VIP、首充等） |
| gacha-system-design | 功能（十连抽、转盘等） |
| 3b-habit-formation | 功能（七日签到、活动等） |
| community-system-design | 功能（社交、好友、公会等） |
| mobile-development | 平台、版式 |
| pc-development | 平台 |
| console-development | 平台 |

---

## 附录

### 分类热度说明

热度数值表示该分类在游戏市场中的流行程度，数值越高表示越常见。热度可以帮助：

- **concept-creation**：选择市场接受度高的风格和类型
- **prd-evaluation**：评估 PRD 中选择的分类是否符合市场趋势
- **commercialization-benchmark-analysis**：分析竞品的分类选择

### 分类组合建议

基于热度数据，以下分类组合较为常见：

**高热度组合：**
- 风格：Q版卡通 + 类型：卡牌 + 主题：休闲
- 风格：国风 + 类型：角色扮演 + 主题：武侠/仙侠
- 风格：二次元 + 类型：卡牌 + 主题：动漫ACG

**中等热度组合：**
- 风格：欧美 + 类型：策略游戏 + 主题：魔幻
- 风格：科幻 + 类型：射击游戏 + 主题：科幻未来

**小众组合：**
- 风格：水墨风 + 类型：文字游戏 + 主题：武侠
- 风格：像素 + 类型：独立游戏 + 主题：Roguelike

---

**文档维护：** 本文档应随着游戏市场变化和新增分类而更新。
