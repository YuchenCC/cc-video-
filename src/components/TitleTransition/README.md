# TitleTransition

用于章节切换或段落转场的大标题组件，例如“配置篇”“接入篇”。组件本身是透明背景的大画布，标题最终停在中央。

视觉特征：

- 背景透明，适合叠在已有画面上。
- 文案居中，使用大标题字号。
- 标题使用一次性的 `1080deg` 三圈快速旋转飞入动画。
- 动画默认时长为 `520ms`，可通过 `animationDurationMs` 调整。
- 颜色由 `colorScheme` 决定，与标题文案无关。

推荐用法：

```ts
import { TitleTransition } from '../components/index'

const transition = TitleTransition({ text: '配置篇' })
const custom = TitleTransition({
  text: '接入篇',
  colorScheme: 'teal',
  animationDurationMs: 680,
})
```

样式来自 `src/components/TitleTransition/styles.css`。渲染 HTML 时需加载该 CSS 文件。
