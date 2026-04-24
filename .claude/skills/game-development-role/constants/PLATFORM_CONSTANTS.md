# Platform Constants

游戏平台常量，用于在游戏设计 role 和 skill 中引用复用。

## 平台分类

| 中文名称 | 英文名称 | 说明 |
|---------|---------|------|
| 手游 | Mobile Game | 移动端游戏 |
| 手游iOS | Mobile Game iOS | iOS平台手游 |
| 手游安卓 | Mobile Game Android | Android平台手游 |
| 手游微信小程序 | WeChat Mini Program | 微信小程序游戏 |
| 手游抖音小程序 | Douyin Mini Program | 抖音小程序游戏 |
| 手游支付宝小程序 | Alipay Mini Program | 支付宝小程序游戏 |
| PC | PC Game | PC端游戏 |
| 主机 | Console Game | 主机游戏 |
| 掌机 | Handheld Game | 掌机游戏 |

## 使用示例

```markdown
在游戏设计文档中引用平台：
- 目标平台：{{PLATFORM_CONSTANTS.手游}}
- 多平台支持：{{PLATFORM_CONSTANTS.手游iOS}}、{{PLATFORM_CONSTANTS.手游安卓}}、{{PLATFORM_CONSTANTS.PC}}
```

## 数据格式

```json
{
  "PLATFORM_CONSTANTS": {
    "手游": {
      "english": "Mobile Game",
      "description": "移动端游戏"
    },
    "手游iOS": {
      "english": "Mobile Game iOS",
      "description": "iOS平台手游"
    },
    "手游安卓": {
      "english": "Mobile Game Android",
      "description": "Android平台手游"
    },
    "手游微信小程序": {
      "english": "WeChat Mini Program",
      "description": "微信小程序游戏"
    },
    "手游抖音小程序": {
      "english": "Douyin Mini Program",
      "description": "抖音小程序游戏"
    },
    "手游支付宝小程序": {
      "english": "Alipay Mini Program",
      "description": "支付宝小程序游戏"
    },
    "PC": {
      "english": "PC Game",
      "description": "PC端游戏"
    },
    "主机": {
      "english": "Console Game",
      "description": "主机游戏"
    },
    "掌机": {
      "english": "Handheld Game",
      "description": "掌机游戏"
    }
  }
}
```
