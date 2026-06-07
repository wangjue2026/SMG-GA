# AI Dem 产品设计说明

## 当前阶段

当前页面处于快速设计阶段，暂不引入 Vue / React / Vite 等工程化框架。

## 文件维护原则

- `AI Dem.html`：只保留页面结构、第三方 CDN 引用和资源引用。
- `assets/css/ai-dem.css`：维护页面样式、布局、视觉效果、动画。
- `assets/js/`：维护页面数据、交互逻辑和配置。
- `docs/changelog.md`：记录关键变更，方便回溯。
- 不建议在快速设计阶段把 HTML 拆成大量片段，避免预览和维护复杂化。

## 后续迭代约束

- 新增页面区块时，优先在 HTML 中添加独立 section。
- 修改样式时，优先只修改 `assets/css/ai-dem.css`。
- 修改交互或模拟数据时，优先只修改 `assets/js/` 下对应文件。
- 不要整页重写 `AI Dem.html`。
- 不轻易删除已有模块，删除前先确认是否为废弃内容。
