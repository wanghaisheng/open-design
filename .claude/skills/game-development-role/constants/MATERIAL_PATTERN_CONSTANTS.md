# Material & Pattern Constants

游戏UI材质和图案常量，用于在游戏设计 role 和 skill 中引用复用。

## 材质图案分类

| 中文名称 | 英文名称 | ID |
|---------|---------|-----|
| 木头 | Mutou / Wood | 60 |
| 纸张 | Zhizhang / Paper | 292 |
| 布料 | Buliao / Fabric | 14 |
| 水晶/玻璃 | Shuijing/Boli / Crystal/Glass | 135 |
| 金属 | Jinshu / Metal | 54 |
| 石头 | Shitou / Stone | 11 |
| 皮革 | Pige / Leather | 1 |
| 塑料 | Suliao / Plastic | 2 |
| 液体 | Yeti / Liquid | 7 |
| 水墨/涂料 | Shuimo/Tuliao / Ink Wash/Paint | 16 |
| 磨砂 | Musha / Frosted | 1 |
| 玉石/瓷器 | Yushi/Ciqi / Jade/Porcelain | 2 |
| 钢笔/铅笔 | Gangbi/Qianbi / Pen/Pencil | 3 |
| 半色调 | Bansetiao / Halftone | 0 |
| 条纹 | Tiaowen / Stripe | 2 |
| 背景平铺 | Beijing Pingpu / Background Tile | 3 |
| 华丽 | Huali / Gorgeous/Ornate | 21 |
| 笔触/做旧 | Bichu/Zuojiu / Brushstroke/Aged | 14 |
| 代码/发光 | Daima/Faguang / Code/Glow | 96 |
| 云纹 | Yunwen / Cloud Pattern | 9 |
| 花瓣/樱花 | Huaban/Yinghua / Petal/Cherry Blossom | 9 |
| 镭射 | Leishe / Laser | 31 |
| 光影 | Guangying / Light & Shadow | 17 |
| 海报 | Haibao / Poster | 32 |
| 场景化 | Changjinghua / Scenic | 155 |
| 几何切割 | Jihe Qiege / Geometric Cut | 6 |
| 魔法阵 | Mofazhen / Magic Circle | 104 |
| 纹章 | Wenzhang / Heraldry | 8 |
| 旗帜 | Qizhi / Banner | 13 |
| 卷轴 | Juanzhou / Scroll | 105 |
| 书籍 | Shuji / Book | 160 |
| 台子/桌面 | Taizi/Zhuomian / Platform/Tabletop | 67 |

## 使用示例

```markdown
在游戏设计文档中引用材质图案：
- UI材质：{{MATERIAL_PATTERN_CONSTANTS.木头}}
- 装饰图案：{{MATERIAL_PATTERN_CONSTANTS.云纹}}
- 特效风格：{{MATERIAL_PATTERN_CONSTANTS.代码/发光}}
```

## 数据格式

```json
{
  "MATERIAL_PATTERN_CONSTANTS": {
    "木头": {
      "english": "Mutou / Wood",
      "id": 60
    },
    "纸张": {
      "english": "Zhizhang / Paper",
      "id": 292
    },
    "布料": {
      "english": "Buliao / Fabric",
      "id": 14
    },
    "水晶/玻璃": {
      "english": "Shuijing/Boli / Crystal/Glass",
      "id": 135
    },
    "金属": {
      "english": "Jinshu / Metal",
      "id": 54
    },
    "石头": {
      "english": "Shitou / Stone",
      "id": 11
    },
    "皮革": {
      "english": "Pige / Leather",
      "id": 1
    },
    "塑料": {
      "english": "Suliao / Plastic",
      "id": 2
    },
    "液体": {
      "english": "Yeti / Liquid",
      "id": 7
    },
    "水墨/涂料": {
      "english": "Shuimo/Tuliao / Ink Wash/Paint",
      "id": 16
    },
    "磨砂": {
      "english": "Musha / Frosted",
      "id": 1
    },
    "玉石/瓷器": {
      "english": "Yushi/Ciqi / Jade/Porcelain",
      "id": 2
    },
    "钢笔/铅笔": {
      "english": "Gangbi/Qianbi / Pen/Pencil",
      "id": 3
    },
    "半色调": {
      "english": "Bansetiao / Halftone",
      "id": 0
    },
    "条纹": {
      "english": "Tiaowen / Stripe",
      "id": 2
    },
    "背景平铺": {
      "english": "Beijing Pingpu / Background Tile",
      "id": 3
    },
    "华丽": {
      "english": "Huali / Gorgeous/Ornate",
      "id": 21
    },
    "笔触/做旧": {
      "english": "Bichu/Zuojiu / Brushstroke/Aged",
      "id": 14
    },
    "代码/发光": {
      "english": "Daima/Faguang / Code/Glow",
      "id": 96
    },
    "云纹": {
      "english": "Yunwen / Cloud Pattern",
      "id": 9
    },
    "花瓣/樱花": {
      "english": "Huaban/Yinghua / Petal/Cherry Blossom",
      "id": 9
    },
    "镭射": {
      "english": "Leishe / Laser",
      "id": 31
    },
    "光影": {
      "english": "Guangying / Light & Shadow",
      "id": 17
    },
    "海报": {
      "english": "Haibao / Poster",
      "id": 32
    },
    "场景化": {
      "english": "Changjinghua / Scenic",
      "id": 155
    },
    "几何切割": {
      "english": "Jihe Qiege / Geometric Cut",
      "id": 6
    },
    "魔法阵": {
      "english": "Mofazhen / Magic Circle",
      "id": 104
    },
    "纹章": {
      "english": "Wenzhang / Heraldry",
      "id": 8
    },
    "旗帜": {
      "english": "Qizhi / Banner",
      "id": 13
    },
    "卷轴": {
      "english": "Juanzhou / Scroll",
      "id": 105
    },
    "书籍": {
      "english": "Shuji / Book",
      "id": 160
    },
    "台子/桌面": {
      "english": "Taizi/Zhuomian / Platform/Tabletop",
      "id": 67
    }
  }
}
```
