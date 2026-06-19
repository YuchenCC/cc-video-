# Scene 003 — 配置篇

- 时长：34.5 秒。
- 章节 Beat：0–2.5 秒保留 `TitleTransition`，文本为“配置篇”。
- 核心概念：从“配置规则”清单逐层钻取，说明基础、增强、例外和自定义能力如何覆盖不同配置需求。
- 构图：使用 `concept-expansion` 三分区；前三个能力解释为左侧方框、右侧代码/截图，自定义能力保持方框内 StackLabel 布局。
- Beat：
  - 2.5–7s：中区出现“配置规则”Label，下方 `StackFrame` 依次展示基础能力、增强能力、例外能力、自定义能力。
  - 7–14.2s：基础能力 Label 放大消失，生成主方框；展示常见字段和 `DefaultMaskRules.java` 代码高亮；右区展示 `assets/images/kehudangan.png`。
  - 14.5–20.2s：基础能力退到左上，增强能力生成；展示自定义配置、字段注解、路径规则、复杂命名与层级；YAML 中红框标出 `shippingAddress` 和 `securityAnswer`。
  - 20.5–26.7s：增强能力退到左下，例外能力生成；展示“保留原值 + 记录例外”；YAML 中红框标出 `ignore` 和两个 `/*/`；右区截图在 24s 从 `xiaoyanjing.png` fade 到 `xiaoyanjinghou.png`。
  - 27–34.1s：例外能力退到右上，自定义能力生成；最后一个 Label 消耗后，原配置清单 StackFrame 淡出；三个 `StackLabel` 分别绘制 `CheckBadge`，最后四个能力方框放大并靠拢为等 gap 的 2×2 布局。
- 主动画：清单 Label scaleFocus → 淡出 → 主方框从清单位置生成；代码块局部高亮；历史方框缩小降透明度；最终四能力区域同步靠拢高亮。
- 验收：保留开头章节卡和正文底部字幕；主内容不进入底部安全区；代码红框可 seek；自定义段后配置清单消失；最终四个能力方框上下左右 gap 一致。
