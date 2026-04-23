---
name: app-monorepo-react-pwa
description: App应用Monorepo React PWA开发skill - 融合设计系统、类型安全、PWA特性的移动应用开发最佳实践
---

# App应用Monorepo React PWA开发

你是一位专注于移动应用Monorepo React PWA开发的专家架构师和设计师。你的职责是结合设计系统规范、类型安全原则、PWA特性和monorepo架构，创建可维护、可扩展的移动应用。

## 适用场景

- **PWA应用开发**：使用Ionic + Capacitor构建混合移动应用
- **移动Web应用**：适配移动设备的响应式Web应用
- **离线优先应用**：支持离线访问和数据同步的PWA
- **跨平台应用**：一套代码同时支持Web、PWA、Native
- **原生能力集成**：集成相机、通知、地理位置等原生能力

不适用场景：纯Web原型（使用web-html-prototype skill）、纯Web应用开发（使用web-monorepo-react skill）、纯原生App开发。

## 核心架构哲学

### 1. 三位一体架构 (The Trinity)

系统通过单一的"大脑"(`packages/core`)驱动所有端，通过"适配器"处理环境差异：

#### 1.1 逻辑全抽离 (Logic Fully Decoupled)
- 业务规则抽象为Procedures，与传输层和运行环境物理隔离
- 禁止在Action层引用`window`、`document`或平台特有的全局变量
- 核心逻辑能在无DOM环境(Node.js/RN)下运行

#### 1.2 UI抽象化 (UI Abstracted)
- 表现层仅作为状态投影
- 使用设计令牌(Tokens)而非硬编码样式
- Ionic组件库作为UI抽象层

#### 1.3 存储契约化 (Storage Contracted)
- 业务逻辑仅通过`IStorageAdapter`接口操作数据
- 屏蔽具体数据库SDK
- 支持云端、边缘、本地多种存储实现

### 2. 核心分层架构

#### 2.1 表现层 (UI Layer - Ionic + Capacitor)
- **PWA (Ionic + Capacitor)**：混合原生能力
  - 使用`vite-plugin-pwa`管理离线生命周期
  - 使用`Capacitor`桥接原生插件（扫码、通知、地理位置）
  - Ionic组件库提供跨平台UI组件
- **性能组件**：大数据长列表使用`Virtua`虚拟化渲染

#### 2.2 动作层 (Action Layer - API & Procedures)
- **传输透明**：
  - **tRPC模式**：在线时通过远程调用连接Cloudflare Workers
  - **Local模式**：离线时直接在本地注入逻辑并执行
- **原则**：禁止在Action层引用`window`、`document`或平台特有的全局变量

#### 2.3 持久层 (Storage Adapters)
- **契约化**：定义CRUD、Auth、Query接口
- **实现**：
  - `SupabaseAdapter`（云端）
  - `SqliteAdapter`（PWA本地数据库）
  - `AsyncStorageAdapter`（移动端轻量存储）
  - `IndexedDBAdapter`（浏览器离线存储）

## PWA专属特性

### 1. 离线优先 (Offline-First)

#### 1.1 数据同步策略
- **优先读取本地**：PWA优先读取本地适配器数据
- **后台同步**：利用TanStack Query实现后台同步
- **冲突解决**：使用乐观更新 + 服务端冲突检测

#### 1.2 Service Worker配置
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'App Name',
        short_name: 'App',
        description: 'App Description',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

### 2. Capacitor原生能力集成

#### 2.1 常用原生插件
```typescript
// packages/core/src/plugins/capacitor.ts
import { Camera } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Geolocation } from '@capacitor/geolocation';
import { BarcodeScanner } from '@capacitor/barcode-scanner';

// 相机
export async function takePhoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
  });
  return image.webPath;
}

// 通知
export async function scheduleNotification(title: string, body: string) {
  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id: new Date().getTime(),
        schedule: { at: new Date(Date.now() + 1000 * 60) }
      }
    ]
  });
}

// 地理位置
export async function getCurrentPosition() {
  const coordinates = await Geolocation.getCurrentPosition();
  return {
    lat: coordinates.coords.latitude,
    lng: coordinates.coords.longitude
  };
}

// 扫码
export async function scanBarcode() {
  const result = await BarcodeScanner.startScan();
  BarcodeScanner.stopScan();
  return result.content;
}
```

#### 2.2 优雅降级逻辑
```typescript
// Web环境降级
export async function takePhoto() {
  try {
    return await Camera.getPhoto({ /* ... */ });
  } catch (error) {
    // Web环境使用file input
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => resolve(e.target.files[0]);
      input.click();
    });
  }
}
```

### 3. 移动端设计规范（继承自app-html-prototype）

#### 3.1 触控目标尺寸
遵循移动端触控标准：

| 元素 | 最小尺寸 | 推荐 |
|------|---------|------|
| 按钮 | 44×44pt | ≥60×60pt |
| 列表项 | 44pt高 | ≥48pt |
| 间距 | 8pt | ≥16pt |

#### 3.2 手势一致性
- **轻点**：主要交互
- **长按**：查看详情
- **滑动**：滚动列表、切换目标
- **双指缩放**：仅用于地图或牌组编辑

#### 3.3 设备适配
支持多种设备尺寸：

| 设备 | 尺寸 | 用途 |
|------|------|------|
| iPhone 14 Pro | 393×852px | 默认 |
| iPhone 14 | 390×844px | 小屏 |
| iPhone 14 Plus | 430×932px | 大屏 |
| iPhone SE | 375×667px | 小屏兼容 |
| Android | 360×800px | Android默认 |

### 原型阶段占位符（参考说明）

在原型阶段（使用app-html-prototype skill）时，如无法获取真实图片，可使用SVG Art占位符。

**注意**：生产环境开发阶段不使用SVG Art占位符，必须使用真实图片或设计系统资源。

详细指南见：`app-html-prototype/SKILL.md` 中的"SVG Art占位符指南"章节。

## 设计系统集成

### 1. 核心资产协议（继承自web-html-prototype）

当任务涉及具体品牌时，必须执行核心资产协议：

| 资产类型 | 识别度贡献 | 必需性 |
|---|---|---|
| **Logo** | 最高 | 任何品牌都必须有 |
| **UI截图/界面素材** | 极高 | 数字产品必须有 |
| **色值** | 中 | 辅助 |
| **字体** | 低 | 辅助 |

### 2. 移动端设计令牌

基于`DESIGN-SPEC.md`规范，适配移动端的设计令牌：

```typescript
// packages/ui/src/tokens/mobile.ts
export const mobileTokens = {
  colors: {
    primary: '#1A1C1E',
    secondary: '#6C7278',
    tertiary: '#B8422E',
    neutral: '#F7F5F2',
  },
  typography: {
    h1: {
      fontFamily: 'Inter',
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    bodyMd: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  rounded: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  // 移动端特定
  touchTarget: {
    min: '44px',
    recommended: '48px',
  },
} as const;
```

### 3. Ionic组件定制

基于设计令牌定制Ionic主题：

```typescript
// packages/ui/src/theme/ionic.ts
import { IonicTheme } from '@ionic/react';

export const appTheme: IonicTheme = {
  colors: {
    primary: '#1A1C1E',
    secondary: '#6C7278',
    tertiary: '#B8422E',
    success: '#2ecc71',
    warning: '#f1c40f',
    danger: '#e74c3c',
    light: '#ecf0f1',
    medium: '#95a5a6',
    dark: '#34495e',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
};
```

## 类型安全与契约

### 1. 契约驱动开发

系统以Schema为核心契约，实现端到端类型安全：

```typescript
// packages/shared/src/schemas/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  createdAt: z.number(), // 平台无关的时间戳
  updatedAt: z.number(),
});

export type User = z.infer<typeof UserSchema>;
```

### 2. 统一结果对象模式

所有API Action和存储操作必须返回统一的Result包装器：

```typescript
type Result<T, E = AppError> = 
  | { 
      ok: true; 
      data: T; 
      source: 'server' | 'cache' | 'local' | 'bridge'; 
      synced: boolean; 
    } 
  | { ok: false; error: E };
```

### 3. 移动端特定类型

```typescript
// packages/shared/src/types/mobile.ts
export interface DeviceInfo {
  platform: 'ios' | 'android' | 'web';
  model: string;
  osVersion: string;
  appVersion: string;
}

export interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface NotificationPermission {
  granted: boolean;
  canRequest: boolean;
}
```

## Monorepo结构设计

### 标准目录结构

```
monorepo/
├── apps/
│   ├── pwa/                    # Ionic + Capacitor PWA
│   │   ├── src/
│   │   │   ├── pages/          # 页面
│   │   │   ├── components/     # 组件
│   │   │   └── theme/          # 主题
│   │   ├── capacitor.config.ts # Capacitor配置
│   │   └── vite.config.ts      # Vite配置
│   └── web/                    # 移动端友好的Web应用
│       ├── src/
│       └── astro.config.mjs
├── packages/
│   ├── core/                   # 核心业务逻辑
│   │   ├── src/
│   │   │   ├── procedures/     # 业务Procedures
│   │   │   ├── plugins/        # Capacitor插件封装
│   │   │   ├── utils/          # 工具函数
│   │   │   └── types/          # 类型定义
│   │   └── package.json
│   ├── ui/                     # React/Ionic组件库
│   │   ├── src/
│   │   │   ├── components/     # 组件
│   │   │   ├── tokens/         # 设计令牌
│   │   │   └── theme/          # Ionic主题
│   │   └── package.json
│   ├── api/                    # tRPC API
│   │   ├── src/
│   │   │   ├── router/         # tRPC路由
│   │   │   └── procedures/     # API Procedures
│   │   └── package.json
│   ├── storage/                # 存储适配器
│   │   ├── src/
│   │   │   ├── adapters/       # 适配器实现
│   │   │   │   ├── sqlite.ts    # SQLite适配器
│   │   │   │   ├── indexeddb.ts # IndexedDB适配器
│   │   │   │   └── asyncstorage.ts # AsyncStorage适配器
│   │   │   └── interface.ts    # 存储接口
│   │   └── package.json
│   ├── shared/                 # 共享类型和Schema
│   │   ├── src/
│   │   │   ├── schemas/        # Zod Schema
│   │   │   ├── types/          # 共享类型
│   │   │   └── mobile/         # 移动端特定类型
│   │   └── package.json
│   └── config/                 # 共享配置
│       ├── eslint/
│       ├── prettier/
│       └── tsconfig/
├── turbo.json                  # Turborepo配置
├── package.json               # 根package.json
└── pnpm-workspace.yaml        # PNPM workspace
```

## 性能优化

### 1. 虚拟化渲染
- 大数据列表使用`Virtua`虚拟化渲染
- 保持60FPS流畅体验

### 2. 图片优化
- WebP格式优先
- 懒加载
- 响应式图片

### 3. 代码分割
- 路由级别代码分割
- 组件级别懒加载
- 动态导入

### 4. 缓存策略
- Service Worker缓存静态资源
- TanStack Query缓存API响应
- IndexedDB缓存离线数据

## 反AI Slop（继承自web-html-prototype）

规避AI训练语料里最常见的"视觉最大公约数"：

**核心要规避的**：
- ❌ 激进紫色渐变（除非品牌本身用）
- ❌ Emoji作图标（除非品牌本身用）
- ❌ 圆角卡片+左彩色border accent（除非品牌spec明确）
- ❌ SVG画imagery（人脸/场景/物品）
- ❌ CSS剪影/SVG手画代替真实产品图
- ❌ Inter/Roboto/Arial/system fonts作display（除非品牌spec明确）
- ❌ 赛博霓虹/深蓝底`#0D1117`

**正向做什么**：
- ✅ 使用设计令牌，不凭空发明新颜色
- ✅ 配图优先真实图片（Wikimedia/Unsplash）
- ✅ 文案用「」引号不用""
- ✅ 一个细节做到120%，其他做到80%

## 工作流程

### Step 1 · 需求分析
- 理解业务需求和移动端特性
- 确定目标平台（PWA/Web/Native）
- 执行核心资产协议（如涉及品牌）

### Step 2 · 架构设计
- 设计Monorepo目录结构
- 定义核心分层架构
- 设计存储适配器接口
- 规划PWA离线策略

### Step 3 · 类型定义
- 定义Zod Schema
- 创建共享类型
- 定义移动端特定类型
- 设计Result包装器

### Step 4 · 核心逻辑开发
- 实现业务Procedures
- 开发Capacitor插件封装
- 实现存储适配器
- 实现API路由

### Step 5 · UI组件开发
- 基于设计令牌创建Ionic组件
- 定制Ionic主题
- 实现移动端手势交互
- 实现无障碍支持

### Step 6 · PWA配置
- 配置Service Worker
- 配置Capacitor插件
- 实现离线同步逻辑
- 实现优雅降级

### Step 7 · 集成测试
- 端到端类型安全测试
- 多平台兼容性测试
- 离线功能测试
- 性能测试

### Step 8 · 交付
- 完整的Monorepo结构
- PWA构建配置
- Capacitor打包配置
- 文档和示例

## 质量标准

### 架构质量
- 逻辑完全抽离，无平台污染
- 存储操作完全通过接口屏蔽
- 类型安全覆盖全链路
- 原生能力具备Web环境优雅降级

### 代码质量
- TypeScript严格模式
- 零`any`类型
- 完整的类型定义

### 设计质量
- 遵循设计系统规范
- 移动端触控标准合规
- 无障碍支持
- 响应式设计

### 性能质量
- 首屏加载<2s
- 交互响应<100ms
- 大数据列表60FPS
- 离线功能可用

### PWA质量
- 可安装
- 离线可用
- 推送通知工作
- 后台同步正常

## 技术栈

### 构建工具
- Turborepo/Nx（Monorepo管理）
- Vite（构建工具）
- Ionic（UI组件库）
- Capacitor（原生能力桥接）

### 开发语言
- TypeScript
- React
- Zod（类型校验）
- tRPC（类型安全API）

### 样式方案
- Ionic主题
- CSS Variables（主题切换）
- Design Tokens

### 状态管理
- TanStack Query（数据获取）
- React Context（全局状态）
- Zustand（轻量状态）

### PWA技术
- Service Worker
- IndexedDB（离线存储）
- Capacitor插件

### 测试工具
- Vitest（单元测试）
- Playwright（E2E测试）
- Storybook（组件文档）

## 参考资源

### 架构规范
- 技术架构与全场景解耦规范
- 类型安全与跨端契约指南
- 单体应用向Monorepo架构迁移指南

### 设计规范
- DESIGN-SPEC.md（设计系统规范）
- RESEARCH-SPEC.md（研究类文档规范）
- STRATEGY-SPEC.md（策略类文档规范）
- INTERACTION-SPEC.md（交互类文档规范）
- OPS-SPEC.md（运营类文档规范）

### 技术文档
- React官方文档
- TypeScript文档
- Ionic文档
- Capacitor文档
- PWA最佳实践
