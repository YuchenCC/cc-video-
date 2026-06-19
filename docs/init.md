# HyperFrames 工程重构与分镜占位计划

## Summary

- 将当前规范骨架重构为 HyperFrames `v0.6.112` 可直接预览的工程。
- 全部重新设计，不沿用旧封面和原有 25.2 秒综述分镜。
- 根据 `scripts/voiceover.md` 拆为六个篇章 Scene：综述、接入篇、配置篇、日志篇、治理篇、AI 工程化。
- 每个 Scene 内部通过多个叙事 Beat 推进，不再拆分独立子场景。
- 按 1.1 倍速重新校准口播时间。
- Scene 001 直接进入正文；Scene 002–006 开头使用 `TitleTransition` 显示章节名，占位约 2.5 秒。
- 六幕预设时长共 289.5 秒；扣除五次约 0.4 秒的转场重叠后，成片约 287.5 秒。
- 当前阶段制作可预览占位：完整英雄帧、字幕、基础入场、Beat 变化和幕间转场，不制作最终精细动画。

## Duration

| Scene | 篇章 | 口播 | 标题 Beat | 总时长 |
|---|---|---:|---:|---:|
| 001 | 综述 | 28s | 无 | 28s |
| 002 | 接入篇 | 35s | 2.5s | 37.5s |
| 003 | 配置篇 | 32s | 2.5s | 34.5s |
| 004 | 日志篇 | 51s | 2.5s | 53.5s |
| 005 | 治理篇 | 74s | 2.5s | 76.5s |
| 006 | AI 工程化 | 57s | 2.5s | 59.5s |

Scene 002–006 的口播从各 Scene 的 `2.5s` 开始，不占用章节标题展示时间。

## Engineering Changes

- 重建根 `index.html`，串联 `compositions/scene-001.html` 至 `scene-006.html`。
- 子构图统一使用 `<template>`、1920×1080、暂停 GSAP 时间线及 `window.__timelines` 注册。
- 六个 Scene 使用交替轨道，相邻场景约 0.4 秒重叠，并使用克制的 `wipeSoft` 覆盖转场。
- 前五幕不制作场景级退出动画；Scene 006 可在结尾轻量淡出。
- 根构图常驻右上角 `assets/logos/signature-logo.svg`。
- `src/scenes/scene-001/README.md` 至 `scene-006/README.md` 保存分镜说明。
- `scripts/scene-list.md` 和 `scripts/subtitles.md` 与六幕结构同步。
- 新增共享运行时样式，复用项目色彩、字幕安全区、卡片、流程、分层、终端和人物规范。
- 字体使用中文无衬线与 JetBrains Mono，不使用 `Inter` 运行时回退。
- Node 版本要求提升至 22，并提供 `preview`、`lint`、`inspect`、`snapshot` 和 `check` 命令。
- 忽略 `.hyperframes/`、`.thumbnails/`、`renders/` 等生成产物。

## Storyboard

| Scene | 篇章 | 时长 | 核心概念 | 画面预设 |
|---|---|---:|---|---|
| 001 | 综述 | 28s | 组件统一覆盖多个敏感信息出口，并记录治理线索 | Java 主卡 → 三类出口 → 中央 Hub → 治理报告 |
| 002 | 接入篇 | 37.5s | 低侵入接入不同场景并复用统一规则 | 章节标题 → 依赖与配置 → 自动生效 → 三入口 → 规则引擎 |
| 003 | 配置篇 | 34.5s | 四层配置覆盖通用规则和业务扩展 | 章节标题 → 四层结构 → 常见字段 → 增强与例外 → 自定义策略 |
| 004 | 日志篇 | 53.5s | 根据日志结构选择字段规则或文本兜底 | 章节标题 → 多源日志 → 字段映射 → 文本检测 → 性能边界 |
| 005 | 治理篇 | 76.5s | 运行时发现遗漏并形成治理闭环 | 章节标题 → 人工排查 → 线索收集 → 报告建议 → 配置循环 |
| 006 | AI 工程化 | 59.5s | 用验收、测试和长期约束保障 AI 研发 | 章节标题 → 验收清单 → 任务链 → Demo 验证 → 长期护栏 |

## Chapter Title Beats

Scene 001 不使用章节标题。Scene 002–006 的章节标题分别为“接入篇”“配置篇”“日志篇”“治理篇”“AI 工程化”。

| 时间 | 内容 |
|---|---|
| 0.0–0.2s | 幕间转场缓冲 |
| 0.2–0.9s | `TitleTransition` 标题入场 |
| 0.9–2.2s | 标题居中停留 |
| 2.2–2.5s | 局部切换至正文英雄帧 |
| 2.5s 起 | 开始正文口播和动画 |

## Visual and Motion Rules

- 每个 Scene 只承担一个篇章级核心概念，每个 Beat 只表达一个信息点。
- 同一英雄帧最多展示 3–5 个主要信息元素。
- 每 2–4 秒产生一次与口播语义对应的视觉变化。
- Scene 内优先使用 `localReplace`、`slideReplace`、`objectMorph`、`arrowDraw`、`highlightPulse` 和 `dimOthers`。
- 使用浅灰白背景、扁平化图解、圆角卡片和克制动画。
- 字幕位于底部安全区，Logo 常驻右上角。
- 人物仅在痛点、思考和完成阶段短暂出现，优先使用 `18.png`、`9.png`、`27.png`。
- 禁止赛博朋克、复杂 3D、强光效、快速旋转、频繁弹跳和企业汇报式 PPT 排版。

## Test Plan

- `npm run check`
- `npx hyperframes inspect --samples 30 --at-transitions --strict`
- `npx hyperframes snapshot --frames 11 --describe false`
- 启动 Studio，检查六幕入场、五个章节标题、幕间转场、Logo、字幕和 1.1 倍速口播空间。
- 检查 `git diff` 与 `git status`，不提交缓存、缩略图、备份或渲染产物。

## Assumptions

- 当前阶段不生成配音，也不精确对齐音频波形。
- 最终配音生成后，需要根据真实波形微调 Scene 和 Beat 时间。
- PPT 图片保留在素材库，但新分镜不直接沿用旧封面。
- 可预览占位包含基础布局和动画，不等同于最终精修成片。
