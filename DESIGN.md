# Design

本文件是 Hyperframes 技术科普视频的设计主入口。

开始设计新视频、分镜或组件前，先阅读本文件；具体参数和检查项再进入对应规范文档。

## 一句话原则

> 图解优先，文字克制；动画辅助理解，转场保持安静；每个镜头只讲清楚一个技术点。

## 设计目标

将抽象技术概念转化为程序员容易理解的白板动态图解：

- 先让观众看懂问题，再解释原因。
- 用结构、关系和流程代替大段文字。
- 通过元素逐步构建推动理解，不依赖频繁切镜。
- 保持轻量、清晰、克制和技术友好的整体氛围。

最终画面应接近“程序员小课堂”，而不是发布会视觉、企业汇报 PPT 或科技炫技片。

## 设计决策顺序

设计每个视频时，严格按以下顺序推进：

1. 明确观众看完后必须理解的唯一结论。
2. 将口播拆成多个独立技术概念。
3. 为每个概念建立一个 8–20 秒分镜。
4. 为每幕选择一个主要构图。
5. 选择最多 3–5 个核心画面元素。
6. 使用箭头、层级或对比表达元素关系。
7. 根据口播语义安排每 2–4 秒一次视觉变化。
8. 将结论压缩为 12–22 个中文字的字幕。
9. 选择克制的幕内动画和幕间转场。
10. 使用验收清单检查信息密度和风格一致性。

不要先考虑动画效果，再寻找内容与之匹配。动画必须来自信息结构。

## 从口播到画面的工作流

### 1. 整理口播

将完整口播写入 [`scripts/voiceover.md`](scripts/voiceover.md)。

口播应遵循：

```text
提出问题 → 展示现象 → 拆解原因 → 给出结论
```

如果一段口播包含两个无法用同一张图解释的概念，应拆成两个分镜。

### 2. 建立分镜清单

在 [`scripts/scene-list.md`](scripts/scene-list.md) 中登记：

- Scene ID
- 预计时长
- 唯一核心概念
- 转场方式
- 当前状态

单幕时长控制在 8–20 秒。

### 3. 编写分镜

复制 [`docs/STORYBOARD_TEMPLATE.md`](docs/STORYBOARD_TEMPLATE.md)，为每个分镜明确：

- 画面目标
- 口播内容
- 字幕摘要
- 元素及空间关系
- 动画时间点
- 幕间转场
- 验收结果

### 4. 选择视觉结构

优先从以下结构中选择一个：

| 内容关系 | 推荐构图 |
|---|---|
| 单一对象或定义 | 中心单概念图解 |
| 旧方案与新方案 | 左右对比 |
| 技术栈或系统层次 | 上下分层 |
| 请求、数据或部署过程 | 左到右流程 |
| 命令执行与结果 | 终端窗口 + 结果图解 |
| 服务、节点或依赖关系 | 多节点架构图 |

一个分镜只保留一条主要视觉路径，避免同时出现多个阅读起点。

### 5. 选择组件

| 设计意图 | 组件 |
|---|---|
| 展示服务、应用、镜像、数据库 | `TechCard` |
| 展示命令和日志 | `TerminalWindow` |
| 表示本地机或服务器 | `MachineBox` |
| 表示容器或运行环境 | `ContainerBox` |
| 表示技术栈外层方框 | `StackFrame` |
| 表示技术栈中的单层标签 | `StackLabel` |
| 表示技术分层 | `LayerStack` |
| 表示方向和数据流 | `FlowArrow` |
| 表示完成、成功或校验通过 | `CheckBadge` |
| 表示两种方案差异 | `CompareLayout` |
| 表示操作步骤 | `StepList` |
| 展示口播摘要 | `SubtitleBar` |
| 展示品牌标识 | `Watermark` |

组件的详细用途和状态约束位于 [`src/components/`](src/components/)。

## 画面规范

### 基础规格

- 画幅：16:9。
- 推荐分辨率：1920×1080。
- 兼容分辨率：1280×720。
- 帧率：30fps。
- 背景：浅灰白。
- 主体：居中或沿单一流程线展开。
- 字幕：底部居中。
- 水印：右上角，低存在感。

### 信息密度

每个分镜最多包含：

- 1 个核心概念
- 1 个中心图解
- 3–5 个核心元素
- 1 条主要流程线
- 1 个重点结论
- 1 条底部字幕

如果必须缩小文字才能容纳内容，说明当前分镜需要继续拆分。

### 色彩、字体和间距

工程实现必须直接使用统一 Token：

- [`src/styles/colors.ts`](src/styles/colors.ts)
- [`src/styles/typography.ts`](src/styles/typography.ts)
- [`src/styles/spacing.ts`](src/styles/spacing.ts)
- [`src/styles/motion.ts`](src/styles/motion.ts)

完整视觉说明见 [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md)。

## 动画设计

动画只承担以下任务：

- 引导观看顺序
- 展示流程方向
- 拆解结构层级
- 强调当前信息
- 表达对象替换或状态变化

推荐使用：

```text
fadeIn
slideUp
slideLeft
popIn
typewriter
arrowDraw
scaleFocus
highlightPulse
dimOthers
layerStack
```

### 节奏规则

- 每 2–4 秒发生一次有意义的视觉变化。
- 当前口播讲到哪里，画面高亮到哪里。
- 同时运动的元素应属于同一个信息点。
- 动画幅度保持小且稳定。
- 非重点元素可以降低到 35% 透明度。

完整参数见 [`docs/MOTION_PRESETS.md`](docs/MOTION_PRESETS.md)，镜头节奏见 [`docs/RHYTHM_RULES.md`](docs/RHYTHM_RULES.md)。

## 转场设计

新概念切换优先使用 `fadeToNext`。

同一概念内部演化优先使用：

- `localReplace`
- `slideReplace`
- `objectMorph`
- `wipeSoft`
- `zoomSlight`

流程推进通常不需要切换整幕，应使用 `arrowDraw` 或模块滑入完成。

禁止强闪白、快速旋转、复杂 3D 翻转、粒子爆炸、大幅甩镜和过度弹跳。

完整规则见 [`docs/TRANSITION_RULES.md`](docs/TRANSITION_RULES.md)。

## 字幕设计

字幕是口播摘要，不是逐字稿。

- 每条 12–22 个中文字。
- 同一时间只展示一个语义重点。
- 技术名词可以保留英文。
- 避免与画面标签重复。
- 使用底部居中的黑色半透明圆角条。

字幕统一维护在 [`scripts/subtitles.md`](scripts/subtitles.md)，详细规则见 [`docs/SUBTITLE_RULES.md`](docs/SUBTITLE_RULES.md)。

## 人物 IP 引用

人物 IP 用于引导视线、表达观众反应和建立视频识别度。人物不是技术内容本身，不应替代结构图、流程图或准确标签。

选图前必须查阅 [`assets/characters/CHARACTER_CATALOG.md`](assets/characters/CHARACTER_CATALOG.md)。目录按姿态、情绪、视觉方向和推荐场景分析了全部人物 PNG。

### 使用步骤

1. 先明确人物承担的语义：问候、疑问、警告、行动、成功或收尾。
2. 在人物目录的“快速选择”中选择情绪强度最低但足够准确的图片。
3. 根据人物手势、视线和运动方向安排技术主体。
4. 在分镜中明确路径、用途、位置、入场和退场。
5. 确认人物没有遮挡核心图解、字幕或流程箭头。

分镜中的标准写法：

```markdown
人物：assets/characters/39.png
用途：讲解者举手，引出右上方的核心定义
位置：左下
入场：0.4s fadeIn
退场：结论出现后 localReplace
```

### 引用规则

- 素材统一从 `assets/characters/<文件名>.png` 引用。
- 不将人物图片复制到各个场景目录。
- 不凭数字文件名判断语义，必须通过人物目录选图。
- 每个分镜默认最多出现一个人物。
- 人物面积建议不超过画面的 20%；开场和结尾可放宽到 30%。
- 保留透明背景和原始宽高比，不拉伸、不裁掉手势或情绪符号。
- 人物优先位于画面边侧，手势、视线或动作朝向技术主体。
- 入场优先使用 `fadeIn`、`slideUp` 或轻量 `popIn`。
- 强情绪人物只短暂用于明确的异常、警告或失败语义。

## 禁止项

- 赛博朋克和强科技炫光。
- 复杂 3D、厚重渐变和写实素材堆叠。
- 企业汇报式 PPT 排版。
- 一个分镜同时解释多个技术概念。
- 大段文字和多行字幕长期占据画面。
- 无意义漂浮、循环跳动和高频快切。
- 为展示效果而牺牲技术关系的准确性。

## 设计完成标准

提交分镜或画面前，至少确认：

- 不听口播也能大致看懂结构和流程。
- 每幕可以用一句话说明唯一核心概念。
- 观众的视线顺序明确，没有多个竞争焦点。
- 每个动画都能对应到一个信息点。
- 画面在 2–4 秒内不会长期静止。
- 字幕是结论摘要，不是画面说明书。
- 使用了统一组件与 Token，没有临时自造风格。
- 没有炫技效果抢夺内容注意力。

完整验收项见 [`docs/ACCEPTANCE_CHECKLIST.md`](docs/ACCEPTANCE_CHECKLIST.md)。

## 规范索引

| 文档 | 用途 |
|---|---|
| [`docs/PROJECT_MEMORY.md`](docs/PROJECT_MEMORY.md) | 项目长期风格记忆 |
| [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md) | 色彩、字体、图形和构图 |
| [`docs/RHYTHM_RULES.md`](docs/RHYTHM_RULES.md) | 分镜时长与视觉变化节奏 |
| [`docs/MOTION_PRESETS.md`](docs/MOTION_PRESETS.md) | 动画类型与参数 |
| [`docs/SUBTITLE_RULES.md`](docs/SUBTITLE_RULES.md) | 字幕内容和样式 |
| [`docs/TRANSITION_RULES.md`](docs/TRANSITION_RULES.md) | 幕间与局部转场 |
| [`docs/STORYBOARD_TEMPLATE.md`](docs/STORYBOARD_TEMPLATE.md) | 分镜设计模板 |
| [`docs/ACCEPTANCE_CHECKLIST.md`](docs/ACCEPTANCE_CHECKLIST.md) | 最终验收 |
| [`assets/characters/CHARACTER_CATALOG.md`](assets/characters/CHARACTER_CATALOG.md) | 人物姿态、情绪、场景与引用方式 |

当不同文件的描述出现冲突时，以本文件的设计目标和 `PROJECT_MEMORY.md` 的核心原则为判断依据，并优先选择更清晰、更克制、更有利于理解技术概念的方案。
