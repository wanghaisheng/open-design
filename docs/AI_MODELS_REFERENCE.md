# AI Models Reference

本文档列出了 RAMS 框架中可用的图像和视频模型，包括各提供商的模型名称、支持的功能和尺寸规格。

---

## Image Models

### xAI

| Model | Support sizes (width x height) or aspect ratios (width : height) |
|-------|------------------------------------------------------------------|
| grok-imagine-image | 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto |

### OpenAI

| Model | Support sizes |
|-------|---------------|
| gpt-image-2 | 1024x1024, 1536x1024, 1024x1536 |
| dall-e-3 | 1024x1024, 1792x1024, 1024x1792 |
| dall-e-2 | 256x256, 512x512, 1024x1024 |

### Amazon Bedrock

| Model | Support sizes |
|-------|---------------|
| amazon.nova-canvas-v1:0 | 320-4096 (multiples of 16), 1:4 to 4:1, max 4.2M pixels |

### Fal

| Model | Support aspect ratios |
|-------|------------------------|
| fal-ai/flux/dev | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/flux-lora | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/fast-sdxl | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/flux-pro/v1.1-ultra | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/ideogram/v2 | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/recraft-v3 | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/stable-diffusion-3.5-large | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| fal-ai/hyper-sdxl | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |

### DeepInfra

| Model | Support sizes or aspect ratios |
|-------|--------------------------------|
| stabilityai/sd3.5 | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| black-forest-labs/FLUX-1.1-pro | 256-1440 (multiples of 32) |
| black-forest-labs/FLUX-1-schnell | 256-1440 (multiples of 32) |
| black-forest-labs/FLUX-1-dev | 256-1440 (multiples of 32) |
| black-forest-labs/FLUX-pro | 256-1440 (multiples of 32) |
| stabilityai/sd3.5-medium | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| stabilityai/sdxl-turbo | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |

### Replicate

| Model | Support aspect ratios or sizes |
|-------|-------------------------------|
| black-forest-labs/flux-schnell | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| recraft-ai/recraft-v3 | 1024x1024, 1365x1024, 1024x1365, 1536x1024, 1024x1536, 1820x1024, 1024x1820, 1024x2048, 2048x1024, 1434x1024, 1024x1434, 1024x1280, 1280x1024, 1024x1707, 1707x1024 |

### Google

| Model | Support aspect ratios |
|-------|------------------------|
| imagen-4.0-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |
| imagen-4.0-fast-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |
| imagen-4.0-ultra-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |

### Google Vertex

| Model | Support aspect ratios |
|-------|------------------------|
| imagen-4.0-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |
| imagen-4.0-fast-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |
| imagen-4.0-ultra-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |
| imagen-3.0-fast-generate-001 | 1:1, 3:4, 4:3, 9:16, 16:9 |

### Fireworks

| Model | Support sizes or aspect ratios |
|-------|--------------------------------|
| accounts/fireworks/models/flux-1-dev-fp8 | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| accounts/fireworks/models/flux-1-schnell-fp8 | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| accounts/fireworks/models/playground-v2-5-1024px-aesthetic | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| accounts/fireworks/models/japanese-stable-diffusion-xl | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| accounts/fireworks/models/playground-v2-1024px-aesthetic | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| accounts/fireworks/models/SSD-1B | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| accounts/fireworks/models/stable-diffusion-xl-1024-v1-0 | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |

### Luma

| Model | Support aspect ratios |
|-------|------------------------|
| photon-1 | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| photon-flash-1 | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |

### Together.ai

| Model | Support sizes |
|-------|---------------|
| stabilityai/stable-diffusion-xl-base-1.0 | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-dev | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-dev-lora | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-schnell | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-canny | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-depth | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-redux | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1.1-pro | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-pro | 512x512, 768x768, 1024x1024 |
| black-forest-labs/FLUX.1-schnell-Free | 512x512, 768x768, 1024x1024 |

### Black Forest Labs

| Model | Support aspect ratios |
|-------|------------------------|
| flux-kontext-pro | From 3:7 (portrait) to 7:3 (landscape) |
| flux-kontext-max | From 3:7 (portrait) to 7:3 (landscape) |
| flux-pro-1.1-ultra | From 3:7 (portrait) to 7:3 (landscape) |
| flux-pro-1.1 | From 3:7 (portrait) to 7:3 (landscape) |
| flux-pro-1.0-fill | From 3:7 (portrait) to 7:3 (landscape) |

---

## Video Models

### FAL

| Model | Features |
|-------|----------|
| luma-dream-machine/ray-2 | Text-to-video, image-to-video |
| minimax-video | Text-to-video |

### Google

| Model | Features |
|-------|----------|
| veo-2.0-generate-001 | Text-to-video, up to 4 videos per call |

### Google Vertex

| Model | Features |
|-------|----------|
| veo-3.1-generate-001 | Text-to-video, audio generation |
| veo-3.1-fast-generate-001 | Text-to-video, audio generation |
| veo-3.0-generate-001 | Text-to-video, audio generation |
| veo-3.0-fast-generate-001 | Text-to-video, audio generation |
| veo-2.0-generate-001 | Text-to-video, up to 4 videos per call |

### Kling AI

| Model | Features |
|-------|----------|
| kling-v2.6-t2v | Text-to-video |
| kling-v2.6-i2v | Image-to-video |
| kling-v2.6-motion-control | Motion control |

### Replicate

| Model | Features |
|-------|----------|
| minimax/video-01 | Text-to-video |

### xAI

| Model | Features |
|-------|----------|
| grok-imagine-video | Text-to-video, image-to-video, editing, extension, R2V |

---

## 使用说明

这些模型可以在 RAMS 框架中作为演员（Actor）使用。编排器会根据任务需求选择合适的模型：

- **图像生成任务**：根据所需的尺寸和比例选择合适的图像模型
- **视频生成任务**：根据功能需求（text-to-video、image-to-video等）选择合适的视频模型

### 模型选择建议

1. **高质量图像**：推荐使用 OpenAI 的 dall-e-3 或 Google 的 imagen-4.0-ultra-generate-001
2. **快速生成**：推荐使用 Google 的 imagen-4.0-fast-generate-001 或 stabilityai/sdxl-turbo
3. **多样化比例**：推荐使用 xAI 的 grok-imagine-image（支持最多种比例）
4. **视频生成**：推荐使用 Google Vertex 的 veo-3.1 系列（支持音频生成）或 Kling AI 的 kling-v2.6 系列

---

## 注意事项

1. 不同提供商的 API 调用方式和定价可能不同
2. 某些模型可能有调用频率限制
3. 建议根据实际需求和预算选择合适的模型
4. 模型的可用性和功能可能随时间变化，请参考各提供商的最新文档
