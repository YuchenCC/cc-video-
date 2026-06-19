# Scene 002 — 接入篇

- 时长：37.5 秒。
- 章节 Beat：0–2.5 秒保留 `TitleTransition`，文本为“接入篇”。
- 核心概念：Spring Boot 项目通过组件依赖和少量配置完成低侵入接入，日志、导出和消息等入口最终汇入同一套脱敏规则。
- 构图：正文使用 `concept-expansion` 三分区；中区是 `jup.png` 项目主概念，右区展示 plug、terminal 和 config，左区展示按需接入入口。
- 素材：
  - `assets/icons/jup.png`：Spring Boot 项目概念。
  - `assets/icons/plug.png`：白底增强徽章。
  - `assets/icons/config.png`：右区配置上下文物料。
- Beat：
  1. 0.2–2.5s：章节标题进入并淡出。
  2. 2.7–6.7s：`jup.png` 在中区作为项目概念出现。
  3. 7.0–15.2s：右区 plug 与 terminal 出现，terminal 逐字写入 `PatternLayout` 配置；二者缩小飞入中区项目；随后 `组件依赖`、`少量配置` 两个 StackLabel 指向项目并渐隐。
  4. 15.5–22.2s：中区依次显示 `Controller 不改`、`返回对象不改`，CheckBadge 由主 GSAP timeline 绘制。
  5. 22.5–29.7s：左区 StackFrame 依次高亮 `日志格式`、`导出场景`、`消息发送`，非当前项降至 35%，最后箭头指向中区。
  6. 30.0–37.1s：大框包住左区与中区，右区 `config.png` 出现并向中区平移渐隐，表达统一规则收束。
- 动画约束：不改字幕时间、不改音频；StackLabel 固定同宽并居中；CheckBadge 不使用独立 CSS 动画；正文不显示主标题、副标题或 Scene Meta。
- 转场：由根构图在下一场景边界执行 `wipeSoft`。
- 验收：关键帧 `2.8、7、10、13、16、20、24、30、33、37s` 无溢出，字幕不被遮挡，Logo 不重复。
