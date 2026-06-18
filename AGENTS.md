# Agent Instructions

## 项目入口

- 开始设计或实现视频内容前，先阅读 `DESIGN.md`。
- 项目长期风格约束以 `docs/PROJECT_MEMORY.md` 为准。
- 修改人物使用方式前，先阅读 `assets/characters/CHARACTER_CATALOG.md`。
- 所有分镜、组件、动画、字幕和转场必须遵守 `docs/` 下的对应规范。

## 工作完成检查

每次完成用户要求后：

1. 检查本次修改是否完整覆盖需求。
2. 运行与修改范围相符的校验；至少运行 `npm run check`。
3. 检查 `git status` 和 diff，避免提交临时文件、导出产物、缓存或无关修改。
4. 判断当前变更是否已经形成可独立描述、可验证的完整工作单元。

## 自动提交规则

工作完成后，由 Agent 判断是否需要创建 Git commit。

应自动提交的情况：

- 用户要求的功能、文档或素材整理已经完成并通过验证。
- 当前变更构成一个边界清晰的工作单元。
- 提交内容仅包含本次任务或与本次任务直接相关的修改。
- 工作区中不存在来源不明、未确认或不应纳入提交的变更。

不应自动提交的情况：

- 工作仍未完成或验证失败。
- 需要用户做关键选择后才能确定最终方案。
- 工作区包含无法安全区分的用户修改。
- 变更包含凭据、隐私数据、缓存、临时文件或大体积导出产物。
- 用户明确要求不要提交。

提交前必须再次查看暂存区内容。提交信息使用简洁、具体的英文 Conventional Commit 格式，例如：

```text
feat: add character asset catalog
docs: refine storyboard guidelines
fix: correct scene timing validation
```

自动提交只代表创建本地 commit，不自动 push。只有用户明确要求时才推送远程。
