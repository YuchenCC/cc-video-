# Concept Expansion Pattern

`concept-expansion` 是工程默认的全屏技术讲解构图模板。它通过“中央概念 → 父概念左移 → 子概念从父概念中变形生成”的连续动作讲解概念层级，避免把知识点做成静态卡片平铺。

## 画面契约

- 画布：1920×1080。
- 背景：`#F7F8FA`。
- 水平区域：左区 25%（480px）、中区 50%（960px）、右区 25%（480px）。
- 中央主视区：只显示当前讲解节点；顶部保留约 18%（194px），底部保留约 30%（324px），有效区域为 `x=480–1440`、`y=194–756`。
- 底部字幕安全区：从 `y=756` 延伸至画布底部。主概念、历史节点和人物主体不得进入字幕条所在区域。
- 左侧轨迹区：保留已讲解的父级节点；历史节点不得侵入中央主视区。
- 右侧辅助区：放人物、结果反馈或少量辅助状态，不与中央概念争夺焦点。
- 右上角：固定展示 `assets/logos/signature-logo.svg`，推荐高度 56px，距顶部 36px、距右侧 48px。
- 不显示主标题、副标题、章节标签、说明段落和底部字幕。
- 连接线只表示当前可见的父子关系。
- 从 `assets/` 引入的图标和人物图片直接使用素材自身轮廓，不添加卡片、圆形底、描边或有色背景容器；必要时只允许轻量 `drop-shadow` 帮助素材从浅色画布中分离。
- 当前概念在中央有效区域内尽量撑开。图片节点必须保持原始宽高比，并将可见高度限制在中央有效区的约 78%（参考高度 440px）；使用顶部对齐，为字幕保留明确的视觉间隔。

## 区域结构

场景应提供统一的三列区域：

```html
<div class="concept-zones" aria-hidden="true">
  <div class="concept-zone concept-zone--left"></div>
  <div class="concept-zone concept-zone--center"></div>
  <div class="concept-zone concept-zone--right"></div>
</div>
```

- `.concept-zone--left`：历史概念和父级轨迹。
- `.concept-zone--center`：唯一主视图，当前概念尽量填满。
- `.concept-zone--right`：人物和辅助反馈。
- 区域元素用于布局约束，不绘制可见边界。

## 叙事步骤

每次扩展只处理一个层级：

1. 当前概念在屏幕中央出现并保持完整对比度。
2. 当前概念向左移动，缩小并降低至 35% 透明度。
3. 新节点从父节点的位置和形态中生成。
4. 父子连接线沿路径绘制。
5. 新节点移动并放大到中央，成为唯一高亮节点。
6. 下一次扩展重复以上过程。

禁止一次生成多个层级，禁止预先平铺尚未讲解的节点。

### 增强型接入

当口播语义是“接入组件后”“加上插件”“补齐能力”这类增强关系时，不使用父概念左移：

1. 父概念保持在中央主视区，继续作为当前主对象。
2. 新增强件从右上或右侧飞入，落到父概念的边角、插槽或内部增强位。
3. 父概念只做轻微脉冲、边框变色或局部高亮，不能退到左侧轨迹。
4. 后续状态变化在原父概念内部完成，例如 Label 替换、CheckBadge 绘制或局部覆盖。

增强型接入仍然一次只引入一个新对象，不能同时展开多个能力点。

## 焦点规则

- 当前节点：`opacity: 1`，使用 `primaryBlue` 边框和轻量聚焦阴影。
- 历史父节点：`opacity: 0.35`，缩放到 `0.68–0.76`。
- 新节点进入中央前，不能有其他节点保持完整对比度。
- 历史轨迹只是上下文，不承担新的阅读任务。
- 任何时刻，完整对比度的主要概念只能位于中区。

## 内容容量

- 单个模板建议承载 3–4 层连续概念。
- 节点文案优先控制在 4–12 个中文字。
- 当前节点最多增加一行 12–18 字的内部说明；默认不使用。
- 左侧轨迹拥挤时切换到新的 Beat，不继续缩小文字。

## StackFrame 清单

当概念使用 `StackFrame` 包含多个 `StackLabel` 时：

- Frame 必须先确定一个当前内容区宽度，例如 `--concept-stack-label-width: 520px`；每一行、Label 槽和 Label 本体都使用这个固定宽度。
- StackFrame 外框/body 宽度必须等于 Label 内容区宽度加左右 padding 与 border，例如 `calc(var(--concept-stack-label-width) + var(--concept-stack-frame-extra-width))`，避免 Label 顶破边框。
- Label 宽度等于当前 StackFrame 的内容区宽度，不随单条文案、旧新状态或 CheckBadge 出现而变化。
- 内容区宽度可以按最长 Label 和可选 CheckBadge 预留区估算，但该宽度必须作为场景 Token 固定下来，禁止动画过程中自适应跳变。
- 同一位置的新旧 Label 使用 CSS Grid 重叠，共享同一个固定宽度；不要用绝对定位脱离尺寸计算。
- CheckBadge 等状态图标使用行内右侧固定锚点或覆盖层，不能额外撑宽某一行。
- 如果口播依次介绍各项，Label 可以按口播语义点逐个进入，推荐间隔 0.8–1.4 秒。
- 风险/问题使用 `coral-dark`，技术中性使用 `blue-light`，流程或覆盖完成使用 `teal-light`。
- 颜色切换必须表达状态变化，不随机轮换。

推荐结构：

```html
<figure class="cc-stack-frame concept-stack concept-stack--sequential">
  <div class="cc-stack-frame__body">
    <div class="concept-stack-row">
      <div class="concept-stack-label-stage">
        <div class="cc-stack-label cc-stack-label--coral-dark">旧状态</div>
        <div class="cc-stack-label cc-stack-label--teal-light">新状态</div>
      </div>
      <span class="cc-check-badge concept-stack-check"></span>
    </div>
  </div>
</figure>
```

使用 `concept-stack--sequential` 时，各 `.concept-stack-row` 初始为透明，必须在主 GSAP timeline 中按口播时间逐项进入。若口播一次性概括整组内容，则省略该修饰类，让 Label 同时出现。

## 使用方式

复制模板并修改以下内容：

```html
<div id="concept-root" class="concept-node">主概念</div>
<div id="concept-child-1" class="concept-node">第一层子概念</div>
<div id="concept-child-2" class="concept-node">第二层子概念</div>
<div id="concept-child-3" class="concept-node">第三层子概念</div>
```

图片概念使用无边框素材节点：

```html
<div class="concept-node concept-node--asset">
  <img src="../assets/icons/example.png" alt="">
</div>
```

`concept-node--asset` 必须保持透明背景、无边框、无圆角卡片和无容器阴影。不得为了统一形状而给 PNG/SVG 外层增加卡片或圆形框。

图片节点在中区的推荐写法：

```css
.concept-node--asset {
  top: 194px;
  left: 560px;
  width: 800px;
  height: 440px;
}

.concept-node--asset img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
}
```

如需减少层级，同时删除对应节点、连接线和 timeline 段。增加层级时应先确认左侧轨迹仍有足够空间。

作为子构图接入：

```html
<div
  data-composition-id="concept-expansion"
  data-composition-src="compositions/concept-expansion.html"
  data-start="0"
  data-duration="20"
  data-track-index="0"
></div>
```

模板已经包含 Logo。若根构图也包含全局水印，必须隐藏其中一个，避免重复。

## 验收

- 中央是否始终只有一个完整高亮节点？
- 中央主视区是否占画面 50%，顶部是否保留约 18%、底部是否保留约 30% 安全留白？
- 所有主要内容是否停留在 `y=194–756`，没有进入底部字幕安全区？
- 当前概念是否充分使用中央有效区域，而不是保持缩略图尺寸？
- 图片是否等比放大且未被拉伸或裁切？
- 子节点是否从父节点位置和形态中衍生？
- 父节点是否保留在左侧并降至 35%？
- 是否一次只扩展一个层级？
- 引入的图片图标是否保持无边框、无底板？
- 是否不存在主标题、副标题、字幕或零碎标签？
- Logo 是否固定在右上且不抢占注意力？
- 不听口播时，是否仍能理解概念的父子演进关系？
