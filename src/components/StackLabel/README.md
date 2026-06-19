# StackLabel

用于表现技术栈、机器、容器或运行环境中的单层标签。标签文案和颜色搭配彼此独立，同一个文案可以使用不同颜色，同一个颜色也可以承载不同文案。

视觉特征：

- 胶囊圆角矩形，横向撑满容器。
- 在 `StackFrame` 中，同组 Label 由最长文案确定可用宽度，其余 Label 使用 `width: 100%` 撑到相同宽度。
- 颜色由 `colorScheme` 显式决定，不根据文案字符串自动猜测；场景应按语义动态选择。
- `coral-dark`：粉红背景 + 深色文字。
- `blue-light`：深蓝背景 + 白色文字。
- `teal-light`：青绿色背景 + 白色文字。
- 推荐语义：`coral-dark` 表示风险、问题或旧状态；`blue-light` 表示技术中性和结构；`teal-light` 表示当前流程、已接入或已覆盖。
- 同组 Label 可随状态变化切换颜色，但不能为了装饰随机换色。
- 固定高度、居中文本、无阴影，适合作为机器、容器或环境盒子内部的层级块。

推荐用法：

```ts
import { StackLabel } from '../components/index'

const app = StackLabel({ text: '代码应用', colorScheme: 'coral-dark' })
const deps = StackLabel({ text: '依赖+配置', colorScheme: 'teal-light' })
const os = StackLabel({ text: 'ubuntu', colorScheme: 'blue-light' })
```

样式来自 `src/components/StackLabel/styles.css`。渲染 HTML 时需加载该 CSS 文件。
