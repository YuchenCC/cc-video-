# StackLabel

用于表现技术栈、机器、容器或运行环境中的单层标签。标签文案和颜色搭配彼此独立，同一个文案可以使用不同颜色，同一个颜色也可以承载不同文案。

视觉特征：

- 胶囊圆角矩形，横向撑满容器。
- 颜色只由 `colorScheme` 决定，与 `text` 内容无关。
- `coral-dark`：粉红背景 + 深色文字。
- `blue-light`：深蓝背景 + 白色文字。
- `teal-light`：青绿色背景 + 白色文字。
- 固定高度、居中文本、无阴影，适合作为机器、容器或环境盒子内部的层级块。

推荐用法：

```ts
import { StackLabel } from '../components/index'

const app = StackLabel({ text: '代码应用', colorScheme: 'coral-dark' })
const deps = StackLabel({ text: '依赖+配置', colorScheme: 'teal-light' })
const os = StackLabel({ text: 'ubuntu', colorScheme: 'blue-light' })
```

样式来自 `src/components/StackLabel/styles.css`。渲染 HTML 时需加载该 CSS 文件。
