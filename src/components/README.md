# Components

`src/components` provides framework-agnostic HTML render helpers and reusable visual components for scene implementations.

Import from the module entry:

```ts
import { TechCard, FlowArrow, SubtitleBar } from './components/index'
```

Components return HTML strings and use the shared style tokens from `src/styles/`. Text props are escaped at component boundaries; child slots such as `ContainerBox.children` and `CompareLayout.left/right` are intended for trusted component HTML.

Class-based components such as `CheckBadge`, `StackFrame`, and `StackLabel` require their component CSS to be loaded by the HTML renderer.

Keep component implementations aligned with:

- `DESIGN.md`
- `docs/STYLE_GUIDE.md`
- `docs/MOTION_PRESETS.md`
- the component-specific README files in this directory
