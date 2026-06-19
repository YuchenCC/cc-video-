# StackFrame

用于表现图中的机器、环境或技术栈外层方框。组件只负责边界和可选标题，内部内容由 children 决定，因此框体高度会随内容自适应。

视觉特征：

- 标题位于方框上方，居中显示。
- 方框为粗描边圆角矩形。
- 内部使用纵向布局，适合放置多个 `StackLabel`。
- 高度不固定，由内部内容、间距和 padding 自然撑开。
- 颜色由 `colorScheme` 或 CSS 变量决定，与标题和内部内容无关。

推荐用法：

```ts
import { StackFrame, StackLabel } from '../components/index'

const frame = StackFrame({
  title: 'A机器',
  colorScheme: 'blue',
  children: [
    StackLabel({ text: '代码应用', colorScheme: 'coral-dark' }),
    StackLabel({ text: '依赖+配置', colorScheme: 'blue-light' }),
    StackLabel({ text: 'ubuntu', colorScheme: 'blue-light' }),
  ],
})
```

自定义颜色：

```ts
StackFrame({
  title: '自定义环境',
  style: {
    '--cc-stack-frame-border-color': '#2c9a9a',
    '--cc-stack-frame-title-color': '#2c9a9a',
  },
  children: StackLabel({ text: 'runtime', colorScheme: 'teal-light' }),
})
```

样式来自 `src/components/StackFrame/styles.css`。渲染 HTML 时需加载该 CSS 文件。
