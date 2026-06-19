# Concept Expansion Pattern

`concept-expansion` 是工程默认的全屏技术讲解构图模板。它通过“中央概念 → 父概念左移 → 子概念从父概念中变形生成”的连续动作讲解概念层级，避免把知识点做成静态卡片平铺。

## 画面契约

- 画布：1920×1080。
- 背景：`#F7F8FA`。
- 中央主视区：只显示当前讲解节点。
- 左侧轨迹区：保留已讲解的父级节点。
- 右上角：固定展示 `assets/logos/signature-logo.svg`，推荐高度 56px，距顶部 36px、距右侧 48px。
- 不显示主标题、副标题、章节标签、说明段落和底部字幕。
- 连接线只表示当前可见的父子关系。
- 从 `assets/` 引入的图标和人物图片直接使用素材自身轮廓，不添加卡片、圆形底、描边或有色背景容器；必要时只允许轻量 `drop-shadow` 帮助素材从浅色画布中分离。

## 叙事步骤

每次扩展只处理一个层级：

1. 当前概念在屏幕中央出现并保持完整对比度。
2. 当前概念向左移动，缩小并降低至 35% 透明度。
3. 新节点从父节点的位置和形态中生成。
4. 父子连接线沿路径绘制。
5. 新节点移动并放大到中央，成为唯一高亮节点。
6. 下一次扩展重复以上过程。

禁止一次生成多个层级，禁止预先平铺尚未讲解的节点。

## 焦点规则

- 当前节点：`opacity: 1`，使用 `primaryBlue` 边框和轻量聚焦阴影。
- 历史父节点：`opacity: 0.35`，缩放到 `0.68–0.76`。
- 新节点进入中央前，不能有其他节点保持完整对比度。
- 历史轨迹只是上下文，不承担新的阅读任务。

## 内容容量

- 单个模板建议承载 3–4 层连续概念。
- 节点文案优先控制在 4–12 个中文字。
- 当前节点最多增加一行 12–18 字的内部说明；默认不使用。
- 左侧轨迹拥挤时切换到新的 Beat，不继续缩小文字。

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
- 子节点是否从父节点位置和形态中衍生？
- 父节点是否保留在左侧并降至 35%？
- 是否一次只扩展一个层级？
- 引入的图片图标是否保持无边框、无底板？
- 是否不存在主标题、副标题、字幕或零碎标签？
- Logo 是否固定在右上且不抢占注意力？
- 不听口播时，是否仍能理解概念的父子演进关系？
