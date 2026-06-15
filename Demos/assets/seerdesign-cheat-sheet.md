# SeerDesign 组件与避坑精炼速查表 (Cheat Sheet)

本速查表集成了 SeerDesign 核心 Token 配置、所有 16 种高频组件的标准 HTML 骨架、Tailwind 扩展类以及 Alpine.js 常见交互模式。AI 在生成任何 Demo 前，应优先阅读本速查表，严格遵循以下代码结构与避坑指引。

---

## 1. 顶层配置 (Tailwind Config & CSS 引入)

每个 HTML Demo 的 `<head>` 部分必须引入 `css-overrides.css`，并对运行时 Tailwind CSS 进行如下扩展配置，以便直接使用合规类名：

```html
<!-- 引入 SeerDesign 全局样式与 Token -->
<link rel="stylesheet" href="../assets/css-overrides.css">
<!-- 引入 Alpine.js 用于交互 -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
<!-- Tailwind CDN 及运行时配置 -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'PingFang SC', 'sans-serif'],
          outfit: ['Outfit', 'sans-serif'],
        },
        // 1. 字号与行高规范：行高 = 字号 + 8px
        fontSize: {
          'xs': ['12px', '20px'],   // 常规与表格内容字号
          'md': ['14px', '22px'],   // 弹窗与抽屉按钮/表单字号
          'lg': ['16px', '24px'],   // 标题字号
          'xl': ['20px', '28px'],
        },
        // 2. 圆角规范
        borderRadius: {
          'control': '2px',         // 按钮、输入框、下拉框等控件圆角 2px
          'container': '4px',       // 卡片、弹窗等容器圆角 4px
          'table': '0px',           // 表格强制无圆角 (直角)
        },
        // 3. 间距规范（必须属于 {2, 4, 8, 12, 16, 24, 32}）
        spacing: {
          '0.5': '2px',
          '1': '4px',
          '2': '8px',
          '3': '12px',
          '4': '16px',
          '6': '24px',
          '8': '32px',
        },
        // 4. 颜色 Token 命名简化
        colors: {
          brand: {
            DEFAULT: 'var(--color-blue)',      // 品牌蓝 #1C6EFF
            hover: 'var(--color-blue-l10)',    // 悬浮蓝 #4FA1FF
            active: 'var(--color-blue-d10)',   // 点击蓝 #1458CC
            lightBg: 'var(--color-blue-l50)',  // 选中底色 #E8F4FF
          },
          risk: 'var(--color-red)',            // #F52727
          warning: 'var(--color-orange)',      // #FA721B
          text: {
            DEFAULT: 'var(--color-graphite-d40)', // 正文 #2F3540
            title: 'var(--color-graphite-d30)',   // 标题 #454C59
            mute: 'var(--color-graphite)',        // 辅助色 #A1A7B3
          },
          border: 'var(--color-graphite-l20)',    // 一级边框 #D3D7DE
          bg: {
            light: 'var(--color-graphite-l50)',   // 浅底色 #F7F9FC
            line: 'var(--color-graphite-l30)',    // 二级分割线 #E1E5EB
          }
        }
      }
    }
  }
</script>
```

---

## 2. Alpine.js 交互模式速查

禁止写繁琐的原生 JS 操作 DOM，统一使用 Alpine.js 响应式绑定：

```html
<!-- 1. 侧边栏/子菜单折叠 -->
<div x-data="{ open: true }">
  <div @click="open = !open" class="cursor-pointer">一级菜单</div>
  <div x-show="open" x-transition.opacity>子菜单内容</div>
</div>

<!-- 2. Tabs 切换 -->
<div x-data="{ activeTab: 'visible' }">
  <div @click="activeTab = 'visible'" :class="activeTab === 'visible' && 'active'">可视视图</div>
  <div @click="activeTab = 'analysis'" :class="activeTab === 'analysis' && 'active'">分析视图</div>
  <div x-show="activeTab === 'visible'">内容 A</div>
  <div x-show="activeTab === 'analysis'">内容 B</div>
</div>

<!-- 3. Drawer / Modal 开关 -->
<div x-data="{ show: false }">
  <button @click="show = true">打开</button>
  <!-- 遮罩 -->
  <div class="drawer-overlay" :class="show && 'open'" @click="show = false" x-show="show" x-transition></div>
  <!-- 抽屉体 -->
  <div class="sd-drawer-container" :class="show && 'open'" x-show="show">
     <button @click="show = false">关闭</button>
  </div>
</div>
```

---

## 3. 高频组件 HTML 结构与避坑红线

### 3.1 按钮 (Button)
*   **⚠️ 避坑红线**：
    *   主按钮必须是蓝色 (`bg-brand`)，**即使是危险删除操作也严禁使用红色主按钮**。
    *   双字按钮：12px 常见场景推荐固定为 `w-14` (56px) 且 `p-0`。**但 14px 弹窗/抽屉底部按钮为防止文字溢出折行，必须采用自适应宽度，左右内边距 `px-4`**。
    *   多字按钮：宽度自适应，左右内边距 `px-4` (16px)。
    *   字号：默认场景使用 `text-xs` (12px)，**弹窗和抽屉底部按钮栏强制使用 `text-md` (14px)**。
    *   字重为 `font-normal` (400)；圆角为 `rounded-control` (2px)；焦点态消除阴影 `focus:shadow-none`。
    *   默认不带图标，仅在有明确功能需求时添加。

*   **标准骨架**：
    ```html
    <!-- 主按钮 (双字，12px 场景) -->
    <button class="sd-btn sd-btn-primary w-14 p-0 text-xs justify-center">确定</button>
    <!-- 普通/次按钮 (多字) -->
    <button class="sd-btn sd-btn-default px-4 text-xs">取消操作</button>
    <!-- 弹窗/抽屉底部主/次按钮 (14px 场景，自适应宽度防止折行) -->
    <button class="sd-btn sd-btn-primary px-4 text-md">确定</button>
    <button class="sd-btn sd-btn-default px-4 text-md">取消</button>
    ```

---

### 3.2 输入框 (Input)
*   **⚠️ 避坑红线**：
    *   常规高度锁定在 32px (`h-8`)，清除焦点外发光阴影 `focus:shadow-none` / `outline-none`。
    *   带前后缀的输入框必须使用包裹容器，并确保内部的真实 `<input>` 边框为 none，由外层容器实现聚焦蓝色边框。

*   **标准骨架**：
    ```html
    <!-- 基础输入框 -->
    <input type="text" class="sd-input w-full h-8 text-xs focus:shadow-none outline-none" placeholder="请输入...">
    ```

---

### 3.3 选择器 (Select)
*   **⚠️ 避坑红线**：
    *   单选选择器高度锁定在 32px (`h-8`)。
    *   下拉面板悬浮层阴影使用 `shadow-[0_4px_16px_rgba(30,35,43,0.14)]`。
    *   选中项采用通栏浅蓝底色背景，但**绝对禁止出现任何勾选图标 (Checkmark Icon)**。
    *   下拉箭头与选择器容器右边距固定为 `8px` (原生 `select` 采用 `appearance: none` 配合 `background-position: right 8px center` 对齐，模拟 select 的内部选择容器可在 flex 布局下使用 `pl-3 pr-2` 对齐)。

*   **标准骨架**：
    ```html
    <div class="sd-select sd-select-single w-[140px] relative" x-data="{ open: false, selected: '全部' }" @click.outside="open = false">
      <div class="sd-select-selector h-8 flex items-center pl-3 pr-2 justify-between cursor-pointer" @click="open = !open">
        <span class="sd-select-selection-item text-xs" x-text="selected">全部</span>
        <svg class="w-3.5 h-3.5 text-text-mute transition-transform" :class="open && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      <!-- 下拉面板 -->
      <div class="sd-select-dropdown w-full absolute mt-1" x-show="open" x-transition.opacity>
        <div class="sd-select-item" :class="selected === '全部' && 'sd-select-item-selected'" @click="selected = '全部'; open = false">全部</div>
        <div class="sd-select-item" :class="selected === '本地桌面' && 'sd-select-item-selected'" @click="selected = '本地桌面'; open = false">本地桌面</div>
      </div>
    </div>
    ```

---

### 3.5 复选框 (Checkbox) & 单选框 (Radio)
*   **⚠️ 避坑红线**：
    *   单选和复选框组件的大小均固定为 14px，且文字距离选项框左侧间距为 `pl-2` (8px)。
    *   选中态无外层呼吸边框，使用 `bg-brand` 填充。

*   **标准骨架**：
    ```html
    <!-- 复选框 -->
    <label class="inline-flex items-center cursor-pointer select-none" x-data="{ checked: false }">
      <span class="sd-checkbox" :class="checked && 'sd-checkbox-checked'" @click="checked = !checked">
        <span class="sd-checkbox-inner"></span>
      </span>
      <span class="text-xs text-text pl-2">选中项</span>
    </label>

    <!-- 单选框 -->
    <label class="inline-flex items-center cursor-pointer select-none" x-data="{ selected: 'A' }">
      <span class="sd-radio" :class="selected === 'A' && 'sd-radio-checked'" @click="selected = 'A'">
        <span class="sd-radio-inner"></span>
      </span>
      <span class="text-xs text-text pl-2">单选项 A</span>
    </label>
    ```

---

### 3.6 警告提示 (Alert)
*   **⚠️ 避坑红线**：
    *   最小高度 32px (`min-h-8`)，去除所有边框线 (`border-none`)，圆角 2px (`rounded-control`)，链接与提示文字有 16px 间隔。

*   **标准骨架**：
    ```html
    <!-- 警告级 (Warning) Alert -->
    <div class="sd-alert sd-alert-warning flex items-center rounded-control border-none min-h-8 px-3 py-1 gap-2">
      <span class="sd-alert-icon text-warning">⚠</span>
      <div class="text-xs text-warning flex-1">
        检测到异常登录风险。 <a class="font-semibold text-brand-active hover:underline ml-4 cursor-pointer">立即查看</a>
      </div>
      <span class="sd-alert-close text-warning cursor-pointer hover:opacity-80" onclick="this.parentElement.remove()">✕</span>
    </div>
    ```

---

### 3.7 基础搜索 (Basic Search)
*   **⚠️ 避坑红线**：
    *   单行高度固定在 32px，清除焦点外发光阴影。
    *   清空按钮（✕）在输入框内容不为空时动态显示在搜索放大镜图标的**左侧**，共同在右端 32px 区域内。

*   **标准骨架**：
    ```html
    <div class="basic-search w-[240px] relative h-8" x-data="{ query: '' }">
      <input type="text" x-model="query" class="sd-input w-full h-8 pr-8 text-xs outline-none focus:shadow-none" placeholder="搜索">
      <div class="search-icon-wrapper absolute right-0 top-0 h-8 w-8 flex items-center justify-center gap-1">
        <!-- 动态清除按钮 -->
        <span class="cursor-pointer text-text-mute hover:text-brand text-[10px]" x-show="query.length > 0" @click="query = ''">✕</span>
        <!-- 搜索图标 -->
        <svg class="w-3.5 h-3.5 text-text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>
    ```

---

### 3.8 表格 (Table) & 分页器 (Pagination)
*   **⚠️ 避坑红线**：
    *   表格四角必须强制为 0px (直角 `rounded-none`)。表头高度固定为 32px，数据行高固定为 40px。
    *   **表头字段文字不加粗**：表头文字字重统一为 `font-weight: 400`（或 `font-normal`），禁止加粗。
    *   **序号列**与**多选框列**宽度必须固定为 40px，内容必须居中对齐。
    *   **数字列**（金额、数量、流量等）表头与内容必须全部右对齐。ID、SN、版本号等标识类字段默认为文本左对齐。
    *   **更多列（列设置列）**必须存在于操作列右侧，列宽固定为 40px，**表头为居中省略号，数据行单元格必须完全空白，不承载任何可点击事件或操作项**。
    *   操作项字体统一品牌蓝，操作项之间使用 `gap-4` (16px) 水平间距，**禁止使用 `|` 等竖线分隔符**。
    *   多个标签折行时，标签竖向间距为 2px，`td` 高度设为 `auto` 且上下内边距 `py-1` (4px)。**绝对禁止在 `<td>` 上直接写 `flex` 布局**，应在 `<td>` 内部包裹 `flex` 容器。
    *   分页器（Pagination）**默认吸底，固定在容器最下方**。当前页码背景必须为蓝色圆形（直径 24px），其他页码无底色。
    *   **🔒 冻结列（操作列 + 更多列）**：当列较多、表格需要横向滚动时，**操作列和更多列必须固定在右侧**。实现方式见「横向滚动 + 冻结列」骨架。**绝对禁止**用 `table-fixed`、`position: absolute`、JS 手动设置偏移等方式实现冻结。

*   **标准骨架**：
    ```html
    <!-- 表格容器 -->
    <div class="flex-1 min-h-0 overflow-y-auto w-full">
      <table class="sd-table w-full rounded-none">
        <thead>
          <tr>
            <th class="w-10 text-center serial-column">序号</th>
            <th class="w-10 text-center sd-table-selection-column">
              <span class="sd-checkbox"><span class="sd-checkbox-inner"></span></span>
            </th>
            <th>文本列名称</th>
            <th class="numeric-column text-right">流量 (GB)</th>
            <th>操作</th>
            <!-- 更多列 (列设置) -->
            <th class="w-10 text-center cursor-pointer hover:text-brand">...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-10 text-center serial-column">1</td>
            <td class="w-10 text-center sd-table-selection-column">
              <span class="sd-checkbox"><span class="sd-checkbox-inner"></span></span>
            </td>
            <td>
              <div class="flex items-center gap-2">
                <span>正常文字</span>
              </div>
            </td>
            <td class="numeric-column text-right font-outfit">42.8</td>
            <td>
              <div class="flex items-center gap-4">
                <a class="action-link text-brand hover:text-brand-hover cursor-pointer">部署</a>
                <a class="action-link text-brand hover:text-brand-hover cursor-pointer">下线</a>
              </div>
            </td>
            <!-- 更多列对应单元格，必须完全为空白 -->
            <td class="w-10"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 吸底分页器 -->
    <div class="h-10 border-t border-bg-line flex items-center justify-between pt-2 mt-2 select-none flex-shrink-0">
      <span class="text-xs text-text-mute">显示 1 到 6 条，共 142 条数据</span>
      <div class="sd-pagination flex items-center gap-1.5">
        <span class="text-xs text-text-mute mr-1">共 142 项</span>
        <button class="sd-pagination-item text-xs w-6 h-6 flex items-center justify-center border border-border rounded-control">❮</button>
        <div class="sd-pagination-item-active w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs">1</div>
        <div class="sd-pagination-item w-6 h-6 border border-border rounded-control flex items-center justify-center text-xs text-text cursor-pointer hover:border-brand">2</div>
        <button class="sd-pagination-item text-xs w-6 h-6 flex items-center justify-center border border-border rounded-control">❯</button>
        <span class="text-xs text-text-mute ml-2">前往</span>
        <div class="sd-pagination-jumper">
          <input type="text" class="w-8 h-6 border border-border rounded-control text-center text-xs" value="1">
        </div>
        <span class="text-xs text-text-mute">页</span>
      </div>
    </div>
    ```

*   **横向滚动 + 冻结列骨架（列数多时必须使用）**：

    > **⚠️ 关键陷阱**：`css-overrides.css` 对 `.sd-table th` 设置了 `position: relative !important`，会导致普通的 `position: sticky` 失效。**必须使用 `table.sd-table th.sticky-xxx` 更高特异性选择器 + `!important`** 才能正确覆盖。禁止用 `table-fixed`。

    **第一步：在页内 `<style>` 中加入冻结列 CSS**
    ```css
    /* 表格可横向滚动容器 */
    .sd-table-responsive {
      overflow-x: auto;
      overflow-y: auto;
      position: relative;
    }
    /* 滚动条美化 */
    .sd-table-responsive::-webkit-scrollbar { width: 6px; height: 6px; }
    .sd-table-responsive::-webkit-scrollbar-thumb { background-color: rgba(120,130,145,0.32); border-radius: 3px; }
    .sd-table-responsive::-webkit-scrollbar-track { background: transparent; }

    /* ==== 操作列 (倒数第二列) ==== */
    /* 注意：必须用 table.sd-table th/td 更高特异性，否则 css-overrides 的 !important 会覆盖 sticky */
    table.sd-table th.sticky-op-col,
    table.sd-table td.sticky-op-col {
      position: sticky !important;
      right: 40px !important;       /* = 更多列宽度 */
      z-index: 12 !important;
      width: 120px !important;
      min-width: 120px !important;
      box-shadow: -4px 0 6px -3px rgba(30,35,43,0.14) !important;
    }
    table.sd-table th.sticky-op-col { background-color: var(--color-graphite-l40) !important; z-index: 20 !important; }
    table.sd-table td.sticky-op-col { background-color: #ffffff !important; }
    table.sd-table tr:hover td.sticky-op-col { background-color: var(--color-graphite-l50) !important; }

    /* ==== 更多列 (最后一列) ==== */
    table.sd-table th.sticky-more-col,
    table.sd-table td.sticky-more-col {
      position: sticky !important;
      right: 0 !important;
      z-index: 12 !important;
      width: 40px !important;
      min-width: 40px !important;
      box-shadow: none !important;
    }
    table.sd-table th.sticky-more-col { background-color: var(--color-graphite-l40) !important; z-index: 20 !important; }
    table.sd-table td.sticky-more-col { background-color: #ffffff !important; }
    table.sd-table tr:hover td.sticky-more-col { background-color: var(--color-graphite-l50) !important; }

    /* ==== 有内容可滚动时加深阴影，滚到最右时隐藏阴影 ==== */
    .table-has-scroll table.sd-table th.sticky-op-col,
    .table-has-scroll table.sd-table td.sticky-op-col {
      box-shadow: -6px 0 10px -4px rgba(30,35,43,0.20) !important;
    }
    .table-scrolled-end table.sd-table th.sticky-op-col,
    .table-scrolled-end table.sd-table td.sticky-op-col {
      box-shadow: none !important;
    }
    ```

    **第二步：HTML 结构**
    ```html
    <!-- 容器：sd-table-responsive 提供横向滚动；Alpine.js 检测滚动状态切换阴影 class -->
    <div class="flex-1 min-h-0 w-full sd-table-responsive"
         x-data="{
           hasScroll: false,
           atEnd: false,
           check() {
             const el = $el;
             const max = el.scrollWidth - el.clientWidth;
             this.hasScroll = max > 2;
             this.atEnd = el.scrollLeft >= max - 2;
           }
         }"
         @scroll="check()"
         x-init="$nextTick(() => { check(); });"
         :class="hasScroll && !atEnd ? 'table-has-scroll' : (atEnd ? 'table-scrolled-end' : '')">

      <!-- min-w-[NNNPX] = 所有列 min-width 之和，确保出现横向滚动条 -->
      <table class="sd-table w-full min-w-[1280px] rounded-none">
        <thead>
          <tr>
            <th class="w-10 text-center sd-table-selection-column"><!-- 复选框 --></th>
            <th class="w-10 text-center serial-column">序号</th>
            <th class="min-w-[200px]">普通列 A</th>
            <th class="min-w-[200px]">普通列 B</th>
            <!-- 操作列：加 sticky-op-col，宽 120px，right 必须 = 更多列宽 40px -->
            <th class="sticky-op-col">操作</th>
            <!-- 更多列：加 sticky-more-col，宽 40px，right: 0 -->
            <th class="sticky-more-col text-center">...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-10 text-center sd-table-selection-column"><!-- 复选框 --></td>
            <td class="w-10 text-center serial-column">1</td>
            <td class="min-w-[200px]">内容 A</td>
            <td class="min-w-[200px]">内容 B</td>
            <!-- 操作列 td 同样加 sticky-op-col -->
            <td class="sticky-op-col">
              <div class="flex items-center gap-4">
                <a class="action-link text-brand cursor-pointer">编辑</a>
                <a class="action-link text-brand cursor-pointer">删除</a>
              </div>
            </td>
            <!-- 更多列 td 同样加 sticky-more-col，内容必须完全为空 -->
            <td class="sticky-more-col"></td>
          </tr>
        </tbody>
      </table>
    </div>
    ```

---

### 3.9 抽屉 (Drawer) & 弹窗 (Modal)
*   **⚠️ 避坑红线**：
    *   **按钮对齐方向**：**抽屉底部按钮为左对齐**，且第一个主按钮距左侧外边缘为 **`32px`**（由容器 `px-4` 内边距 16px + 主按钮 `ml-4` 16px 组成，从而与主体内容边缘垂直对齐）；**弹窗底部按钮为右对齐**，排列为 `[确定] [取消]`。
    *   标题栏固定高度为 48px，无分割线。**底部按钮栏固定高度为 56px，有 1px 顶部分割线（无底色，由 border-t border-bg-line 样式渲染）**！
    *   内容区左右内间距为 32px，上下无 padding。如果内容溢出，**必须只有内容区滚动，标题和底部固定不滚动**。
    *   关闭按钮（X）必须在标题栏的最右侧。
    *   **表单必填/非必填对齐**：必填星号 `*` 必须包裹在 `w-2.5 flex-shrink-0 text-center` 容器中，非必填项使用空 `w-2.5 flex-shrink-0` 容器占位，确保所有文字的首字在垂直方向像素级对齐。

*   **抽屉标准骨架**：
    ```html
    <div class="sd-drawer sd-drawer-container w-[800px] flex flex-col h-full bg-white fixed right-0 top-0 z-50">
      <!-- 标题栏：左标题右关闭按钮 (水平flex分布两端，padding 16px) -->
      <div class="sd-drawer-header h-12 px-4 flex items-center justify-between flex-shrink-0 select-none">
        <span class="sd-drawer-title text-lg font-semibold text-text">抽屉标题</span>
        <span class="cursor-pointer text-text-mute hover:text-text" @click="show = false">✕</span>
      </div>
      <!-- 内容区：自适应并独立滚动，左右 padding 32px，上下 py-0 -->
      <div class="sd-drawer-body flex-1 overflow-y-auto px-8 py-0 custom-scrollbar">
        <div class="sd-form sd-form--drawer space-y-4 py-4">
          <!-- 必填表单项示例 -->
          <div class="sd-form-item flex items-start">
            <div class="sd-form-item-label h-8 flex items-center">
              <label class="text-xs text-text-mute font-normal flex items-center">
                <span class="w-2.5 text-center text-risk mr-1 flex-shrink-0">*</span>
                <span>必填字段</span>
              </label>
            </div>
            <div class="flex-1">
              <input type="text" class="sd-input w-full h-8 text-xs focus:shadow-none outline-none">
            </div>
          </div>
          <!-- 非必填表单项示例 (使用等宽空容器占位，确保文字对齐) -->
          <div class="sd-form-item flex items-start">
            <div class="sd-form-item-label h-8 flex items-center">
              <label class="text-xs text-text-mute font-normal flex items-center">
                <span class="w-2.5 mr-1 flex-shrink-0"></span>
                <span>非必填项</span>
              </label>
            </div>
            <div class="flex-1">
              <input type="text" class="sd-input w-full h-8 text-xs focus:shadow-none outline-none">
            </div>
          </div>
        </div>
      </div>
      <!-- 底部栏：高度 56px，左对齐，有 1px 分割线，无底色，主按钮在最左侧 -->
      <div class="sd-drawer-footer h-14 px-4 border-t border-bg-line flex items-center justify-start gap-2 flex-shrink-0 select-none">
        <button class="sd-btn sd-btn-primary px-6 text-md ml-4 h-8">提交保存</button>
        <button class="sd-btn sd-btn-default px-6 text-md h-8" @click="show = false">取消</button>
      </div>
    </div>
    ```

*   **弹窗标准骨架**：
    ```html
    <div class="modal-container w-[640px] flex flex-col bg-white rounded-container shadow-lg fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <!-- 标题栏 -->
      <div class="h-12 px-8 flex items-center justify-between flex-shrink-0">
        <span class="text-lg font-semibold text-text">弹窗标题</span>
        <span class="cursor-pointer text-text-mute hover:text-text" @click="show = false">✕</span>
      </div>
      <!-- 内容区 -->
      <div class="flex-1 overflow-y-auto px-8 py-0">
        <!-- 弹窗内容 -->
      </div>
      <!-- 底部栏：高度 56px，右对齐，主按钮在左次按钮在右 -->
      <div class="h-14 px-8 flex items-center justify-end gap-2 flex-shrink-0">
        <button class="sd-btn sd-btn-primary px-4 text-md">确定</button>
        <button class="sd-btn sd-btn-default px-4 text-md">取消</button>
      </div>
    </div>
    ```

---

### 3.10 表单 (Form)
*   **⚠️ 避坑红线**：
    *   行高/控件高固定 32px。Label 采用左对齐（Left Aligned），统一宽度（100px 或 120px），Label 与控件横向间距固定 16px。表单项上下间距 8px，一级分组分区间距 16px。
    *   必填项红色星号 `*` 距 Label 4px。非必填项也**必须预留星号隐形占位**，以保证所有 Label 的首个文字在垂直方向上像素级对齐！
    *   表单一级标题（32px 高度，14px 600字重，文本色 graphite-d40）如果带蓝色装饰竖条（2px × 12px），竖条必须绝对定位在左侧（`position: absolute; left: 0`），**不占用横向空间**，有竖条标题和无竖条标题的文字左边缘必须对齐。
    *   表单项右侧的辅助说明小 `i` 图标，属于布局一部分，**占用横向空间（预留辅助列），严禁使用 absolute 定位覆盖在输入框内**！没有小 `i` 图标的字段也需要保留同等宽度的右侧占位，以确保输入控件右边缘全部在一条竖线上。

*   **标准骨架**：
    ```html
    <!-- 表单一级标题 (带蓝竖条，文字与无竖条文字对齐) -->
    <div class="relative h-8 flex items-center pl-3 text-sm font-semibold text-text-title select-none mt-4">
      <span class="absolute left-0 w-0.5 h-3.5 bg-brand rounded-sm"></span>
      <span>基础配置项</span>
    </div>
    
    <!-- 表单行 (必填行) -->
    <div class="flex items-start gap-4 mb-2">
      <!-- Label 占宽 120px，文字左对齐 -->
      <label class="w-[120px] h-8 flex items-center text-xs text-text-mute font-normal">
        <span class="text-risk mr-1 font-semibold">*</span>
        <span>连接器名称</span>
      </label>
      <!-- 右侧主控件与辅助列 -->
      <div class="flex-1 flex items-center gap-2">
        <div class="flex-1">
          <input type="text" class="sd-input w-full h-8 text-xs focus:shadow-none outline-none" placeholder="输入名称">
          <!-- 错误提示 -->
          <div class="text-[11px] text-risk mt-1">名称已存在，请重新输入</div>
        </div>
        <!-- 辅助说明列 (固定占宽，不使用绝对定位) -->
        <span class="w-4 h-8 flex items-center justify-center text-text-mute hover:text-brand cursor-pointer select-none">ⓘ</span>
      </div>
    </div>
    
    <!-- 表单行 (非必填行，必须保留星号隐形占位以对齐文字) -->
    <div class="flex items-start gap-4 mb-2">
      <label class="w-[120px] h-8 flex items-center text-xs text-text-mute font-normal">
        <!-- 隐形星号占位 -->
        <span class="w-2.5 mr-1 flex-shrink-0"></span>
        <span>描述信息</span>
      </label>
      <div class="flex-1 flex items-center gap-2">
        <div class="flex-1">
          <textarea class="sd-textarea w-full text-xs focus:shadow-none outline-none" placeholder="输入描述"></textarea>
        </div>
        <!-- 辅助说明列占位 (保持右边缘对齐) -->
        <span class="w-4"></span>
      </div>
    </div>
    ```

---

### 3.11 页头 (PageTitle)
*   **⚠️ 避坑红线**：
    *   页面标题栏高度固定 48px，标题字号 16px 600字重，颜色 graphite-d40 (#2F3540)，垂直居中，无边框。
    *   分层 Tabs 页头布局：`[页面标题] [1px 垂直分割线] [Tab1] [Tab2]` 全部左对齐水平排列。分割线为 1px 宽，16px 高，颜色 graphite-l30 (#E1E5EB)，分割线左右侧间距各 12px。
    *   Tab 字号 14px，未选中颜色为 `#454C59`，选中为品牌蓝，且下划线与底线重合，无双底线。

*   **标准骨架**：
    ```html
    <div class="h-12 bg-white border-b border-bg-line flex items-center px-4 flex-shrink-0 relative">
      <span class="text-xs font-semibold text-text-title">Agent风险识别</span>
      <span class="w-[1px] h-4 bg-bg-line mx-3"></span>
      <!-- Tabs 区域 -->
      <div class="flex h-full items-center">
        <div class="page-title-tab relative h-full flex items-center px-4 text-xs cursor-pointer text-brand font-semibold active">
          Agent风险可视
        </div>
        <div class="page-title-tab relative h-full flex items-center px-4 text-xs cursor-pointer text-text hover:text-brand transition-colors">
          AI应用分析
        </div>
      </div>
    </div>
    ```

---

### 3.12 标签页 (Tab)
*   **⚠️ 避坑红线**：
    *   **下划线式 (Underline)**：激活下划线高度 2px，颜色品牌蓝，左上右上 2px 圆角，底边与容器底部分割线完全重合，**绝对禁止使用 margin-top 或普通边框导致下划线悬浮产生双底线**。激活态字重 600，未选中字重 400，颜色为正文灰色 `#2F3540`。
    *   **分段式 (Segment)**：圆角固定 2px。重标签样式下，选中项为蓝底白字，未选中项为白底灰字；轻量样式下，选中项为白底蓝字。

*   **标准骨架**：
    ```html
    <!-- 1. 下划线式 Tabs -->
    <div class="border-b border-bg-line flex gap-6 relative h-10 select-none" x-data="{ current: 'tab1' }">
      <div @click="current = 'tab1'" class="relative h-full flex items-center text-xs cursor-pointer pb-0.5"
           :class="current === 'tab1' ? 'text-brand font-semibold' : 'text-text'">
        <span>基础设置</span>
        <!-- 激活下划线，底边与父级 border-b 重合 -->
        <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-t-sm" x-show="current === 'tab1'"></span>
      </div>
      <div @click="current = 'tab2'" class="relative h-full flex items-center text-xs cursor-pointer pb-0.5"
           :class="current === 'tab2' ? 'text-brand font-semibold' : 'text-text'">
        <span>高级设置</span>
        <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-t-sm" x-show="current === 'tab2'"></span>
      </div>
    </div>

    <!-- 2. 分段式 Tabs (重标签样式) -->
    <div class="flex items-center gap-0.5 bg-bg-light border border-border p-[2px] rounded-control inline-flex" x-data="{ current: 'view1' }">
      <button @click="current = 'view1'" class="px-3 h-6 text-xs rounded-control transition-all font-normal"
              :class="current === 'view1' ? 'bg-brand text-white' : 'text-text hover:bg-brand/5'">列表视图</button>
      <button @click="current = 'view2'" class="px-3 h-6 text-xs rounded-control transition-all font-normal"
              :class="current === 'view2' ? 'bg-brand text-white' : 'text-text hover:bg-brand/5'">网格视图</button>
    </div>
    ```

---

### 3.13 标签 (Tag)
*   **⚠️ 避坑红线**：
    *   圆角固定 2px。内边距固定 `py-0.5 px-2` (4px 8px)。字号 12px，字重 400。
    *   **浅色标签**：文字颜色为语义色，背景色为该颜色 **10% 透明度**，无边框！
    *   **点状标签**：背景透明，左侧为 6px × 6px 的圆点，右侧为 `#2F3540` 的文字，间距 4px，无色块背景。
    *   **文字+数字标签 (Badge Tag)**：左侧文字区深色背景（圆角仅左上左下），右侧数字区为同色系 10% 透明度背景（圆角仅右上右下），文字为该颜色，中间拼接处为直角且无缝隙。
    *   **防折行与超长截断**：所有标签仅允许单行高度，**绝对禁止折行/换行**。在 Flex 布局或受挤压场景中，必须加 `flex-shrink-0 whitespace-nowrap`。如果可能超出显示空间，必须加 `truncate` 截断，限制最大宽度（如 `max-w-[80px]`），并绑定 `title` 属性或 Tooltip 以在鼠标悬浮时展示完整文字。

*   **标准骨架**：
    ```html
    <!-- 浅色标签 (防折行、带截断与悬浮提示) -->
    <span class="inline-flex items-center px-2 py-0.5 rounded-control text-xs font-normal bg-brand/10 text-brand flex-shrink-0 whitespace-nowrap truncate max-w-[80px]" title="进行中">进行中</span>
    
    <!-- 点状状态标签 (失陷/严重级别，防折行) -->
    <span class="inline-flex items-center gap-1 bg-transparent flex-shrink-0 whitespace-nowrap">
      <span class="w-1.5 h-1.5 rounded-full bg-risk"></span>
      <span class="text-xs text-text" title="高危风险">高危风险</span>
    </span>

    <!-- 文字+数字标签 (高危风险等级，防折行) -->
    <span class="inline-flex items-center text-[11px] rounded-control overflow-hidden flex-shrink-0 whitespace-nowrap" title="高危 28">
      <span class="px-1.5 py-0.5 bg-risk text-white font-normal rounded-l-control">高危</span>
      <span class="px-1.5 py-0.5 bg-risk/10 text-risk font-normal rounded-r-control">28</span>
    </span>
    ```

---

### 3.14 复合高级搜索 (ProSearch)
*   **⚠️ 避坑红线**：
    *   搜索核心区由输入框和搜索按钮合并为一个整体控件，四周圆角 2px。搜索按钮（32px x 32px）固定在右侧，**背景为蓝色，图标为白色，无独立圆角，与输入框之间仅 1px 细线分隔，严禁出现独立的圆边或双边框**。
    *   Tag 为极简灰色背景（`bg-bg-light`），关闭按钮为极简 `✕`，**严禁使用蓝色圆圈背景的关闭图标**。
    *   点击字段后，**必须立即生成一个蓝框编辑态 Tag，并且用户在此 Tag 内部输入数值（如 `源IP：|请输入 ×`）**，数值确认后变为灰色边框完成态 Tag。
    *   当需要支持收藏条件功能时，**收藏按钮组（包含收藏星形按钮和下拉按钮）必须作为独立操作区，位于搜索核心外框右侧 8px 处独立放置**，严禁与搜索核心框合并。
    *   焦点态只有投影 `0 4px 16px rgba(30, 35, 43, 0.14)`，**绝对禁止出现蓝色外发光阴影**。

*   **标准骨架**：
    ```html
    <div class="flex items-center gap-2 select-none" x-data="{ focus: false, query: '', tags: [{field: '动作', value: '阻断'}] }">
      <!-- 搜索核心区 (带圆角和合并搜索按钮) -->
      <div class="flex-1 flex items-center border rounded-control bg-white transition-all max-w-[660px]"
           :class="focus ? 'border-brand shadow-[0_4px_16px_rgba(30,35,43,0.14)]' : 'border-border'">
        
        <!-- Tag 展示与输入区 -->
        <div class="flex-1 flex flex-wrap items-center p-0.5 min-h-[30px] gap-1 px-2">
          <!-- 已完成的条件 Tag -->
          <template x-for="(tag, index) in tags">
            <span class="inline-flex items-center px-1.5 py-0.5 bg-bg-light border border-bg-line rounded-control text-xs text-text">
              <span x-text="tag.field + '：' + tag.value"></span>
              <span class="ml-1 cursor-pointer text-text-mute hover:text-text text-[10px]" @click="tags.splice(index, 1)">✕</span>
            </span>
          </template>
          
          <!-- 输入框 -->
          <input type="text" class="flex-1 min-w-[120px] h-7 text-xs outline-none focus:shadow-none bg-transparent"
                 placeholder="输入搜索条件..." @focus="focus = true" @blur="focus = false">
        </div>
        
        <!-- 搜索按钮：直角拼接在最右侧，高度 30px 或 32px -->
        <button class="w-8 h-[30px] bg-brand text-white flex items-center justify-center rounded-r-control hover:bg-brand-hover active:bg-brand-active border-none outline-none">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
      
      <!-- 收藏按钮组：独立外置在右侧 8px (仅在需要收藏功能时展现) -->
      <div class="flex border border-border rounded-control h-8 overflow-hidden bg-white">
        <button class="w-8 h-full flex items-center justify-center text-text-mute hover:text-brand hover:bg-brand/5 border-r border-border border-none bg-transparent outline-none">★</button>
        <button class="w-6 h-full flex items-center justify-center text-text-mute hover:text-brand hover:bg-brand/5 border-none bg-transparent outline-none">▼</button>
      </div>
    </div>
    ```

---

### 3.15 详情概览卡片 (Card)
*   **⚠️ 避坑红线**：
    *   卡片背景色统一使用极其柔和的品牌浅蓝背景 `var(--color-blue-l50)` (#E8F4FF)，四周内边距 16px，圆角 2px。
    *   左侧为 32px × 32px 对象图标区（不压缩，与核心信息区间距 24px），中间为核心信息区，右侧为按钮操作区。
    *   **右侧操作按钮区始终置于右上角对齐，禁止随卡片垂直居中**！无论核心信息区由于换行撑高到多少，按钮均保持置顶。

*   **标准骨架**：
    ```html
    <div class="w-full bg-brand-lightBg rounded-control p-4 flex items-start justify-between select-none">
      <!-- 左侧图标与中间信息区 -->
      <div class="flex items-start gap-6 flex-1 min-w-0">
        <!-- 图标 (固定 32x32px 不压缩) -->
        <div class="w-8 h-8 rounded-control bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <!-- 核心属性区 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold text-text leading-tight truncate">gz-device-server-01</span>
            <!-- 状态标签 (浅色) -->
            <span class="px-2 py-0.5 text-[10px] bg-brand/10 text-brand rounded-control font-normal">运行中</span>
          </div>
          <!-- 属性项横向排列 -->
          <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-mute">
            <div>IP地址：<span class="text-text font-outfit">10.10.22.14</span></div>
            <div>所属分组：<span class="text-text">广州办事处</span></div>
            <div>责任人：<span class="text-text">张三</span></div>
          </div>
        </div>
      </div>
      
      <!-- 右侧操作区 (置于右上角对齐，不随卡片垂直居中) -->
      <div class="flex items-center gap-3 flex-shrink-0 ml-4">
        <button class="sd-btn sd-btn-primary px-3 text-xs">管理设备</button>
        <button class="sd-btn sd-btn-default px-3 text-xs">下线</button>
      </div>
    </div>
    ```
