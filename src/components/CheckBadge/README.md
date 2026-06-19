# CheckBadge

用于表现完成、成功或校验通过状态的圆形打勾徽标。组件使用 SVG path 绘制勾形，并通过 CSS `stroke-dashoffset` 实现打勾动画。

视觉特征：

- 圆形背景，默认青绿色。
- 白色圆角勾线。
- 打勾动画默认时长为 `500ms`。
- 可通过 `animationDurationMs` 配置单个组件实例的动画时长。
- 支持 `sm`、`md`、`lg` 三种尺寸。
- 颜色由 `colorScheme` 决定，与 `label` 文案无关。

推荐用法：

```ts
import { CheckBadge } from '../components/index'

const badge = CheckBadge()
const slowBadge = CheckBadge({ animationDurationMs: 800 })
const staticBadge = CheckBadge({ animated: false, colorScheme: 'green' })
```

样式来自 `src/components/CheckBadge/styles.css`。渲染 HTML 时需加载该 CSS 文件。
