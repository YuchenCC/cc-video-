---
name: CC Technical Whiteboard
id: cc-technical-whiteboard
version: 1
description: 浅色白板式程序员技术科普视觉预设，以结构图解、流程关系和克制动画帮助观众理解抽象技术概念。

canvas:
  aspectRatio: "16:9"
  width: 1920
  height: 1080
  compatibleWidth: 1280
  compatibleHeight: 720
  fps: 30
  background: "#F7F8FA"
  safeArea:
    top: 78
    right: 120
    bottom: 150
    left: 120

colors:
  backgroundPrimary: "#F7F8FA"
  backgroundSecondary: "#F4F6F8"
  surface: "#FFFFFF"
  primaryBlue: "#2F6F8F"
  deepBlue: "#233B5E"
  teal: "#2C9A9A"
  green: "#3CAEA3"
  coral: "#EF7B85"
  lightGray: "#D9E1E8"
  mediumGray: "#AAB4BE"
  darkGray: "#333333"
  terminalBackground: "#1F2933"
  terminalText: "#E5E7EB"
  subtitleBackground: "rgba(40, 40, 40, 0.75)"
  subtitleText: "#FFFFFF"
  highlightYellow: "#FFE08A"

typography:
  title:
    fontFamily: "IBM Plex Sans"
    fontWeight: 600
    fontSizeRange: [64, 92]
    color: "#233B5E"
  label:
    fontFamily: "IBM Plex Sans"
    fontWeight: 500
    fontSizeRange: [20, 30]
    color: "#333333"
  body:
    fontFamily: "IBM Plex Sans"
    fontWeight: 400
    fontSizeRange: [24, 34]
    color: "#333333"
  subtitle:
    fontFamily: "IBM Plex Sans"
    fontWeight: 400
    fontSize: 28
    color: "#FFFFFF"
  code:
    fontFamily: "JetBrains Mono"
    fallbacks: ["Menlo", "Fira Code", "monospace"]
    fontWeight: 400
    fontSizeRange: [20, 28]

spacing:
  xs: 4
  sm: 8
  md: 16
  lg: 24
  xl: 32
  xxl: 48
  sceneHorizontal: 120
  sceneTop: 78
  sceneBottom: 150

shape:
  cardRadius: 16
  compactRadius: 12
  subtitleRadius: 14
  pillRadius: 999
  borderWidth: 2
  lineCap: round
  depth: subtle

motion:
  energy: calm
  visualChangeInterval: [2, 4]
  easing:
    entrance: "power2.out"
    emphasis: "power1.inOut"
    transition: "power2.inOut"
  presets:
    fadeIn: { duration: 0.3 }
    slideUp: { duration: 0.4 }
    slideLeft: { duration: 0.4 }
    popIn: { duration: 0.35 }
    typewriterLine: { duration: 0.6 }
    arrowDraw: { duration: 0.5 }
    highlightPulse: { duration: 0.8 }
    dimOthers: { opacity: 0.35 }
    scaleFocus: { from: 1, peak: 1.08, to: 1 }
  transitions:
    primary: fadeToNext
    local: localReplace
    alternatives: [slideReplace, wipeSoft, zoomSlight, objectMorph]

composition:
  sceneDurationSeconds: [8, 20]
  coreConceptsPerBeat: 1
  coreElementsPerBeat: [3, 5]
  primaryVisualPaths: 1
  primaryFlowLines: 1
  subtitleLengthChineseCharacters: [12, 22]
  defaultFlowDirection: left-to-right
  watermarkPosition: top-right
  subtitlePosition: bottom-center

compositionPatterns:
  primary: concept-expansion
  conceptExpansion:
    origin: center
    horizontalZones: [25, 50, 25]
    topPaddingPercent: 22
    bottomPaddingPercent: 22
    expansionDepthPerBeat: 1
    preserveAncestors: true
    ancestorPosition: left
    ancestorOpacity: 0.35
    childEntrance: morph-from-parent
    focusPosition: center
    showSceneHeadings: false
    showSubtitles: false
    showWatermark: true

components:
  concept: [TechCard]
  command: [TerminalWindow]
  environment: [MachineBox, ContainerBox, StackFrame, StackLabel]
  hierarchy: [LayerStack]
  flow: [FlowArrow]
  comparison: [CompareLayout]
  steps: [StepList]
  success: [CheckBadge]
  chapter: [TitleTransition]
  subtitle: [SubtitleBar]
  brand: [Watermark]

avoid:
  - cyberpunk
  - strong-neon-glow
  - heavy-gradients
  - complex-3d
  - realistic-asset-collage
  - corporate-ppt-layout
  - long-text-blocks
  - meaningless-floating
  - infinite-bounce
  - rapid-cutting
  - flash-white
  - fast-rotation
  - particle-explosion
  - exaggerated-camera-whip
---

# Design

本文件是整个工程的设计入口，也是 **CC Technical Whiteboard** 视觉预设的唯一上层定义。

开始设计或实现视频、分镜、组件前，先读取本文件。YAML Front Matter 定义可直接执行的视觉 Token 和构图边界；正文解释设计意图、工作流与判断原则。更细的参数和验收方式再进入 `docs/` 下的专项规范。

当不同文件发生冲突时，按以下顺序裁决：

1. 本文件的设计目标、视觉预设与禁止项。
2. [`docs/PROJECT_MEMORY.md`](docs/PROJECT_MEMORY.md) 的长期原则。
3. `docs/` 下对应的专项规范。
4. `src/styles/` 中的代码 Token 和组件局部实现。

优先选择更清晰、更克制、更有利于理解技术概念的方案。

## 一句话原则

> 图解优先，文字克制；动画辅助理解，转场保持安静；每个镜头只讲清楚一个技术点。

## 视觉预设

### 视觉身份

这套预设面向技术原理、工程流程、系统结构和开发实践类内容。最终画面应接近“程序员小课堂”：像在一张干净的浅色白板上逐步搭建结构，而不是展示发布会舞台、企业汇报 PPT 或科技炫技片。

关键词：

- 技术科普
- 白板动态图解
- 扁平化 SVG
- 浅色画布
- 蓝绿流程关系
- 圆角卡片
- 终端窗口
- 分层结构
- 安静转场

### 色彩角色

颜色必须按语义使用，不能只为丰富画面随意分配：

| 角色 | Token | 用途 |
|---|---|---|
| 主画布 | `backgroundPrimary` | 全局浅灰白背景 |
| 次级区域 | `backgroundSecondary` | 分区、弱层级和浅色卡片 |
| 主强调 | `primaryBlue` | 流程重点、主边框、当前对象 |
| 深色结构 | `deepBlue` | 标题、结构骨架和重要标签 |
| 技术流程 | `teal` | 数据流、连接关系和技术对象 |
| 成功状态 | `green` | 完成、可用、校验通过 |
| 风险状态 | `coral` | 问题、冲突、反例和警告 |
| 局部高亮 | `highlightYellow` | 代码行、短时强调和注意点 |
| 中性信息 | `lightGray` / `mediumGray` | 边框、分隔和次要信息 |

浅色画布不能表现成空白幻灯片。使用 2px 以上结构线、清晰分区、低对比网格或局部色块建立层次，但装饰不得产生第二条阅读路径。

### 字体层级

- 标题、标签和正文统一使用 `IBM Plex Sans`。
- 代码和终端使用 `JetBrains Mono`，缺失时按预设中的 fallback 顺序降级。
- 标题依靠字号、字重和留白建立层级，不使用发光、厚阴影或夸张描边。
- 字幕必须小于主要画面标签。
- 数值列使用 `font-variant-numeric: tabular-nums`。
- 视频正文原则上不小于 24px；若必须继续缩小，优先拆分画面。

### 图形语言

- 使用扁平化 SVG、统一描边粗细和圆润端点。
- 卡片默认 16px 圆角、2px 边框和轻阴影。
- 胶囊标签只用于短标签或状态，不将所有内容做成药丸形。
- 箭头承担观看顺序和数据方向，线宽、箭头头部与标签样式必须统一。
- 图标可以轻度拟物，但不能使用写实截图堆叠代替准确图解。

### StackFrame 与 StackLabel

- `StackFrame` 与 `StackLabel` 组合时，必须先确定一个当前 Frame 内容区宽度，再让同组所有 Label 使用同一个固定宽度；Label 宽度等于当前 StackFrame 的内容区宽度，不随单条文案长短变化。
- Label 默认保持单行；Frame 外框宽度必须等于 Label 内容区宽度加左右 padding 与 border。Frame 内容区宽度可由最长 Label、可选状态图标预留区估算后写入场景变量，但一旦进入该 Beat 就保持不变。同组新旧文案替换时从一开始就按这个宽度预留，避免动画过程中 Frame 或 Label 宽度跳变。
- CheckBadge 等状态图标应作为行内状态覆盖或右侧固定锚点处理，不让某一行因为状态图标额外变宽，也不改变 Label 的固定宽度。
- 口播逐项介绍多个层级或入口时，可让 Label 按语义点依次出现；每项间隔通常为 0.8–1.4 秒。
- Label 颜色按语义动态选择：风险、问题和旧方案使用 `coral-dark`；技术中性、结构和稳定对象使用 `blue-light`；当前流程、已接入和已覆盖状态使用 `teal-light`。
- 同组 Label 不为“颜色丰富”随机换色；颜色变化必须对应语义或状态变化。

### 画面层次

每个 Beat 使用三层组织画面：

1. **背景层**：浅色画布、低对比网格或少量主题装饰。
2. **内容层**：核心结构、流程、卡片、终端或对比关系。
3. **引导层**：箭头、标签、局部高亮、字幕和低存在感水印。

背景层必须保持安静。工程的 3–5 个核心元素限制针对承载信息的内容层；装饰元素不计入核心元素，但数量和运动仍应克制。

### 主构图叙事模式

工程默认使用 `concept-expansion` 作为技术讲解的主场景模式：

- 屏幕中央只保留当前正在讲解的概念。
- 画布固定分为左、中、右三个区域，宽度比例为 25% / 50% / 25%；中区是主视图。
- 主视图顶部保留约 22%、底部保留约 22% 画布高度；底部安全区优先供字幕使用，主概念不得进入。
- 不显示场景主标题、副标题、章节标签、说明段落或底部字幕。
- 右上角只固定展示 Logo；`concept-expansion` 模板使用约 56px 高度，确保在 1920×1080 画面中清晰可辨。
- 子概念从父概念的形态和位置中衍生，再移动到中央主视区。
- 如果新概念语义是“接入、增强、补丁、插件”而不是新的层级替换，父概念应保持在中央主视区不动；新概念可从右上或右侧飞入，植入父概念的边角或内部增强位。
- 父概念保留在画面左侧的概念轨迹中，缩小并降低至 35% 透明度。
- 当前节点始终使用完整对比度和主强调色。
- 当前概念应在主视图可用区域内尽量撑开；图片使用 `object-fit: contain` 等比放大，不因原始像素尺寸较小而维持缩略图大小。
- 从 `assets/` 引入的图标和人物直接使用素材轮廓，不添加卡片、圆形底、描边或有色背景容器；仅允许轻量投影增强分离度。
- 例外：用于“接入、增强、插件、补丁”的小型增强件可以使用白底圆角徽章承载，方便植入 StackFrame、终端或复杂父概念；飞入峰值通常不超过 1.5 倍，完成解释后可替换为稳定的技术徽章。
- 一次只扩展一个层级；禁止一次展开多个层级或平铺所有概念。
- 当左侧概念轨迹无法继续清晰容纳时，应开始新的 Beat，而不是继续缩小节点。

模板优先复用以下槽位：

- `definition-asset`：中区展示一个完整定义图标或图解，多张图片作为一体同时出现和消失。
- `entry-stack`：使用 `StackFrame + StackLabel` 展示入口、层级或候选对象，Label 可按口播逐项出现。
- `enhancer-badge`：插件或增强能力从右上/右侧飞入父概念，植入边角、插槽或内部增强位。
- `state-replacement`：旧状态在原位替换为新状态，配合 `CheckBadge` 表示完成或覆盖。
- `context-character`：右区人物表达人工负担、成功反馈或情绪语义，不遮挡中区。
- `context-artifact`：终端、依赖、记录、脚本等只作为左右辅助证据，不成为新的主焦点。

实现模板位于 [`compositions/concept-expansion.html`](compositions/concept-expansion.html)，详细使用方式见 [`docs/CONCEPT_EXPANSION_PATTERN.md`](docs/CONCEPT_EXPANSION_PATTERN.md)。

## 内容设计目标

- 先让观众看懂问题，再解释原因。
- 用结构、关系和流程代替大段文字。
- 通过元素逐步构建推动理解，不依赖频繁切镜。
- 保持轻量、清晰、克制和程序员友好的整体氛围。
- 不听口播时，观众仍能大致理解结构和流程。

## 设计决策顺序

严格按以下顺序推进：

1. 明确观众看完后必须理解的唯一结论。
2. 将口播拆成独立技术概念。
3. 为每个概念建立一个 8–20 秒 Beat。
4. 为每个 Beat 选择一个主要构图。
5. 选择最多 3–5 个核心画面元素。
6. 使用箭头、层级或对比表达元素关系。
7. 根据口播语义安排每 2–4 秒一次视觉变化。
8. 将结论压缩为 12–22 个中文字的字幕。
9. 选择克制的幕内动画和幕间转场。
10. 使用验收清单检查信息密度和风格一致性。

不要先选择动画效果，再寻找内容与之匹配。动画必须来自信息结构。

## 从口播到画面

### 1. 整理口播

完整口播维护在 [`scripts/voiceover.md`](scripts/voiceover.md)，推荐结构：

```text
提出问题 → 展示现象 → 拆解原因 → 给出结论
```

如果一段口播包含两个无法用同一张图解释的概念，应拆成两个 Beat。

### 2. 建立分镜清单

在 [`scripts/scene-list.md`](scripts/scene-list.md) 中登记：

- Scene ID
- 预计时长
- 唯一核心概念
- 转场方式
- 当前状态

长 Scene 可以作为篇章容器，但内部 Beat 仍必须遵守单一概念、8–20 秒和每 2–4 秒视觉变化的要求。

### 3. 编写分镜

复制 [`docs/STORYBOARD_TEMPLATE.md`](docs/STORYBOARD_TEMPLATE.md)，明确：

- 画面目标
- 口播内容
- 字幕摘要
- 元素及空间关系
- 动画时间点
- 幕间转场
- 验收结果

### 4. 选择视觉结构

| 内容关系 | 推荐构图 |
|---|---|
| 单一对象或定义 | 中心单概念图解 |
| 旧方案与新方案 | 左右对比 |
| 技术栈或系统层次 | 上下分层 |
| 请求、数据或部署过程 | 左到右流程 |
| 命令执行与结果 | 终端窗口 + 结果图解 |
| 服务、节点或依赖关系 | 多节点架构图 |

一个 Beat 只保留一条主要视觉路径，避免多个阅读起点。

### 5. 选择组件

| 设计意图 | 组件 |
|---|---|
| 服务、应用、镜像、数据库 | `TechCard` |
| 命令和日志 | `TerminalWindow` |
| 本地机或服务器 | `MachineBox` |
| 容器或运行环境 | `ContainerBox` |
| 技术栈外框及单层 | `StackFrame` / `StackLabel` |
| 技术分层 | `LayerStack` |
| 方向和数据流 | `FlowArrow` |
| 完成或校验通过 | `CheckBadge` |
| 章节切换 | `TitleTransition` |
| 两种方案差异 | `CompareLayout` |
| 操作步骤 | `StepList` |
| 口播摘要 | `SubtitleBar` |
| 品牌标识 | `Watermark` |

优先组合现有组件，不为单个镜头临时创造新的视觉语言。组件的局部约束位于 [`src/components/`](src/components/)。

## 构图规范

- 画幅为 16:9，默认 1920×1080、30fps。
- 主体居中或沿单一流程线展开。
- 流程默认从左到右。
- 底部预留固定字幕安全区。
- 右上预留低存在感水印，默认使用 `Watermark`。
- 水印不得遮挡图解、标签、箭头或字幕；隐藏或换位必须在分镜中说明。
- 内容容器填满画布，使用 Flex/Grid、padding 和 gap 建立布局。
- 绝对定位只用于装饰、水印和明确的覆盖层，不用于拼装主要内容。

每个 Beat 最多包含：

- 1 个核心概念
- 1 个中心图解
- 3–5 个核心元素
- 1 条主要流程线
- 1 个重点结论
- 1 条底部字幕

如果必须缩小文字才能容纳内容，说明当前 Beat 需要继续拆分。

## 动画语言

动画只承担以下任务：

- 引导观看顺序
- 展示流程方向
- 拆解结构层级
- 强调当前信息
- 表达对象替换或状态变化

### 使用规则

- 先完成元素最清晰时的静态 Hero Frame，再增加动画。
- 当前口播讲到哪里，画面高亮到哪里。
- 同时运动的元素必须属于同一个信息点。
- 动画幅度保持小且稳定。
- 非重点元素可使用 `dimOthers` 降至 35% 透明度。
- 每个信息元素必须有明确入场，不能完整地突然出现。
- 同一场景避免所有元素使用相同方向、距离和缓动。
- 不使用无意义常驻运动；背景装饰如需运动，只允许低幅度、有限时长的呼吸或漂移。

标准动画参数以 YAML 预设及 [`src/styles/motion.ts`](src/styles/motion.ts) 为准，解释见 [`docs/MOTION_PRESETS.md`](docs/MOTION_PRESETS.md)。

## 转场语言

- 新概念切换优先 `fadeToNext`。
- 同一概念局部推进优先 `localReplace` 或 `slideReplace`。
- 结构演化可使用 `objectMorph`。
- 柔和揭示可使用 `wipeSoft`。
- `zoomSlight` 只能使用轻微尺度变化。
- 流程推进通常不切换整幕，使用 `arrowDraw` 或模块滑入。
- 中间场景不提前退场，由转场承担离场。
- 最终场景允许轻量淡出。

禁止强闪白、快速旋转、复杂 3D 翻转、粒子爆炸、大幅甩镜、强光效和过度弹跳。

完整规则见 [`docs/TRANSITION_RULES.md`](docs/TRANSITION_RULES.md)。

## 字幕语言

字幕是口播摘要，不是逐字稿：

- 每条 12–22 个中文字。
- 同一时间只展示一个语义重点。
- 技术名词可以保留英文。
- 避免与画面标签重复。
- 使用底部居中的黑色半透明圆角条。
- 字幕统一维护在 [`scripts/subtitles.md`](scripts/subtitles.md)。

详细规则见 [`docs/SUBTITLE_RULES.md`](docs/SUBTITLE_RULES.md)。

## 人物 IP

人物用于引导视线、表达观众反应和建立识别度，不是技术内容本身。选图前必须阅读 [`assets/characters/CHARACTER_CATALOG.md`](assets/characters/CHARACTER_CATALOG.md)。

使用约束：

- 先明确人物承担的语义，再选择最低但足够准确的情绪强度。
- 默认每个 Beat 最多一个人物。
- 人物面积通常不超过画面 20%；开场和结尾可放宽到 30%。
- 人物优先位于边侧，手势、视线或动作朝向技术主体。
- 不遮挡核心图解、字幕或流程箭头。
- 保留透明背景和原始宽高比，不拉伸、不裁掉手势或情绪符号。
- 不凭数字文件名猜测语义，不复制人物素材到场景目录。
- 入场优先 `fadeIn`、`slideUp` 或轻量 `popIn`。
- 强情绪人物只短暂用于明确的异常、警告或失败语义。

分镜标准写法：

```markdown
人物：assets/characters/39.png
用途：讲解者举手，引出右上方的核心定义
位置：左下
入场：0.4s fadeIn
退场：结论出现后 localReplace
```

## 实现要求

工程实现必须直接使用：

- [`src/styles/colors.ts`](src/styles/colors.ts)
- [`src/styles/typography.ts`](src/styles/typography.ts)
- [`src/styles/spacing.ts`](src/styles/spacing.ts)
- [`src/styles/motion.ts`](src/styles/motion.ts)

实现中的颜色、字体、圆角、间距和动画不得形成第二套隐性 Token。若代码 Token 与本预设不一致，应修改代码 Token 或明确记录例外，不在单个 Scene 中临时绕过。

HyperFrames composition 还必须满足：

- timeline 使用 `{ paused: true }` 并注册到 `window.__timelines`。
- composition ID、host ID 和 timeline key 保持一致。
- 不使用随机时间逻辑、异步 timeline 构造或无限 repeat。
- 视频静音播放，声音使用独立 `<audio>`。
- `data-duration` 是时长真值。
- 多场景必须使用明确转场，不能直接跳切。

## 禁止项

- 赛博朋克和强科技炫光。
- 复杂 3D、厚重渐变和写实素材堆叠。
- 企业汇报式 PPT 排版。
- 一个 Beat 同时解释多个技术概念。
- 大段文字和多行字幕长期占据画面。
- 无意义漂浮、循环跳动和高频快切。
- 快速旋转标题、强闪白、粒子爆炸和大幅甩镜。
- 为展示效果牺牲技术关系的准确性。

## 设计完成标准

提交分镜或画面前，至少确认：

- 不听口播也能大致看懂结构和流程。
- 每个 Beat 可以用一句话说明唯一核心概念。
- 观众视线顺序明确，没有竞争焦点。
- 每个动画都对应一个信息点。
- 每 2–4 秒有一次有意义的视觉变化。
- 字幕是结论摘要，不是画面说明书。
- 使用统一组件与 Token，没有临时自造风格。
- 色彩严格遵守语义角色。
- 没有炫技效果抢夺内容注意力。

完整验收见 [`docs/ACCEPTANCE_CHECKLIST.md`](docs/ACCEPTANCE_CHECKLIST.md)。

## 规范索引

| 文档 | 用途 |
|---|---|
| [`docs/PROJECT_MEMORY.md`](docs/PROJECT_MEMORY.md) | 项目长期风格记忆 |
| [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md) | 色彩、字体、图形和构图细则 |
| [`docs/RHYTHM_RULES.md`](docs/RHYTHM_RULES.md) | Beat 时长与视觉变化节奏 |
| [`docs/MOTION_PRESETS.md`](docs/MOTION_PRESETS.md) | 动画类型与参数 |
| [`docs/SUBTITLE_RULES.md`](docs/SUBTITLE_RULES.md) | 字幕内容和样式 |
| [`docs/TRANSITION_RULES.md`](docs/TRANSITION_RULES.md) | 幕间与局部转场 |
| [`docs/STORYBOARD_TEMPLATE.md`](docs/STORYBOARD_TEMPLATE.md) | 分镜设计模板 |
| [`docs/ACCEPTANCE_CHECKLIST.md`](docs/ACCEPTANCE_CHECKLIST.md) | 最终验收 |
| [`assets/characters/CHARACTER_CATALOG.md`](assets/characters/CHARACTER_CATALOG.md) | 人物姿态、情绪和引用方式 |
