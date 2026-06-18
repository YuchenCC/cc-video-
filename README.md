# Hyperframes Tech Explainer

面向程序员技术讲解、技术科普和白板动态图解的视频工程模板。

## 设计原则

图解优先，文字克制；动画辅助理解，转场保持安静；每个镜头只讲清楚一个技术点。

画面统一使用浅灰白背景、扁平化 SVG 图形、圆角卡片、流程箭头、终端窗口和局部高亮。单个分镜建议为 8–20 秒，并确保每 2–4 秒发生一次有意义的视觉变化。

## 目录

- `docs/`：工程记忆、视觉、节奏、动画、字幕、转场和验收规范。
- `assets/`：图标、品牌、角色和背景素材。
- `src/components/`：可复用图解组件的规格说明。
- `src/scenes/`：分镜定义与实现。
- `src/styles/`：颜色、字体、间距和动画 token。
- `src/utils/`：时间与分镜数据工具。
- `scripts/`：口播、字幕和分镜清单。
- `exports/`：导出物说明。

## 开始制作

设计新视频前，先阅读 [`DESIGN.md`](DESIGN.md)。它是设计思路、执行顺序和详细规范的主入口。

1. 将完整口播写入 `scripts/voiceover.md`。
2. 按 8–20 秒拆分分镜，并登记到 `scripts/scene-list.md`。
3. 复制 `docs/STORYBOARD_TEMPLATE.md` 编写每幕设计。
4. 按 `docs/ACCEPTANCE_CHECKLIST.md` 验收。

当前骨架不绑定具体渲染框架。接入框架后，组件实现仍须遵守 `docs/` 中的统一规范。
