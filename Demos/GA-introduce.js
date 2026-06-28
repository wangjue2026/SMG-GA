(function() {
  const modalHTML = `
<div id="ga-learn-modal"
     x-data="{ activeStep: 1 }"
     @open-learn-modal.window="activeStep = 1; document.getElementById('ga-learn-modal').style.display = 'flex'"
     style="display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;padding:20px;">

  <!-- Backdrop -->
  <div style="position:fixed;inset:0;background:rgba(15,23,42,.45);backdrop-filter:blur(3px);"
       onclick="gaModal.hide()"></div>

  <!-- Panel -->
  <div id="ga-learn-panel" 
       style="position:relative;background:#fff;border-radius:16px;box-shadow:0 24px 64px rgba(15,23,42,0.18);width:100%;max-width:960px;height:580px;display:flex;flex-direction:column;z-index:1;overflow:hidden;transition:all 0.3s ease-in-out;">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #f1f5f9;background:linear-gradient(135deg,#f8fafc 0%,#fff 100%);flex-shrink:0;">
      <div>
        <div style="display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700;color:#0f172a;">
          <div class="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          全球加速 (GA) 配置原理互动课堂
        </div>
        <p style="font-size:11px;color:#64748b;margin:3px 0 0;line-height:1.4;">背景介绍：A公司业务遍布全球，经常遇到跨境访问卡顿问题。下面我们以员工小A和IT运维老张的视角来拆解优化过程。</p>
      </div>
      <button onclick="gaModal.hide()"
              style="background:transparent;border:none;cursor:pointer;padding:6px;border-radius:6px;display:flex;align-items:center;color:#64748b;"
              onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='transparent'">
        <svg style="width:20px;height:20px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div style="flex:1;display:flex;overflow:hidden;min-height:0;background:#fff;">

      <!-- ── 左栏：故事版区域 (漫画情景/浅色可视化 58%) ── -->
      <div style="width:58%;display:flex;flex-direction:column;padding:14px 24px 24px;background:#f8fafc;border-right:1px solid #e2e8f0;overflow-y:auto;position:relative;">
        <div class="mb-2">
          <span class="text-brand bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide" x-text="['1/5 跨境公网访问：卡顿延迟高', '2/5 优化第一步：确定加速业务(源站对象)', '3/5 优化第二步：指定专线出口(源站区域)', '4/5 优化第三步：配置专线入口(加速区域)', '5/5 优化效果：GA专线加速成功'][activeStep - 1]"></span>
        </div>

        <div class="flex-1 flex flex-col justify-center items-center relative select-none min-h-[300px]">
          <!-- 浅色微小网格背景 -->
          <div style="position:absolute;inset:0;background-image:radial-gradient(#cbd5e1 1px,transparent 1px);background-size:16px 16px;opacity:0.35;pointer-events:none;"></div>

          <!-- ==================== Step 1 Visual ==================== -->
          <div x-show="activeStep === 1" x-cloak class="w-full flex flex-col items-center justify-center space-y-3">
            <div class="flex items-center justify-between w-full max-w-[460px] relative px-4">
              <!-- 吉隆坡分部卡片 -->
              <div class="bg-white border border-slate-200 rounded-xl p-3 shadow-sm w-[130px] flex flex-col items-center" style="position:relative;z-index:1;">
                <span class="text-2xl">🏢</span>
                <span class="text-xs font-bold text-slate-700 mt-1">吉隆坡分部</span>
                <!-- 人物头像与痛苦对话气泡 -->
                <div class="flex items-center gap-1 mt-2 p-1 bg-rose-50 border border-rose-100 rounded-md">
                  <span class="text-sm">👨‍💻</span>
                  <span class="text-[9.5px] text-rose-600 font-medium">小A: CRM又断了!</span>
                </div>
              </div>

              <!-- 连线 (拥堵红线) -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 120" preserveAspectRatio="none" style="z-index: 5;">
                <path d="M 80 50 L 120 20 L 160 80 L 200 30 L 240 50" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4 3" class="animate-flow-dash" fill="none" />
                <circle cx="120" cy="20" r="2.5" fill="#f43f5e" />
                <circle cx="160" cy="80" r="2.5" fill="#f43f5e" />
                <circle cx="200" cy="30" r="2.5" fill="#f43f5e" />
              </svg>
              <!-- 丢包/卡顿飘窗 -->
              <div class="absolute left-[36%] top-[15px] bg-rose-500 text-white rounded text-[9.5px] px-1.5 py-0.5 shadow-sm font-bold" style="z-index:30;">丢包率 15.4%</div>
              <div class="absolute left-[44%] top-[70px] bg-rose-500 text-white rounded text-[9.5px] px-1.5 py-0.5 shadow-sm font-bold" style="z-index:30;">延时 380ms 拥堵</div>

              <!-- 深圳总部卡片 -->
              <div class="bg-white border border-slate-200 rounded-xl p-3 shadow-sm w-[130px] flex flex-col items-center" style="position:relative;z-index:1;">
                <span class="text-2xl">🏢</span>
                <span class="text-xs font-bold text-slate-700 mt-1">深圳总部机房</span>
                <div class="flex items-center gap-1 mt-2 p-1 bg-slate-50 border border-slate-100 rounded-md">
                  <span class="text-sm">🖥️</span>
                  <span class="text-[9.5px] text-slate-500">CRM应用服务器</span>
                </div>
              </div>
            </div>
            <div class="w-full max-w-[460px] text-[11px] text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-1.5 font-bold tracking-wide">
              ⚠️ 公网跨国路由跳数多、链路长、易拥堵，导致跨境访问面临“死循环卡慢”。
            </div>
            <!-- GA 破局思路 -->
            <div class="w-full max-w-[460px] bg-emerald-50 border border-emerald-100 rounded-xl p-3 space-y-2 mt-2">
              <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <span class="text-xs">💡</span> GA 破局思路
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed">
                全球加速 (GA) 直接在两地间铺设一条<b>“专享网络高铁” (SASE 骨干网)</b>，用高质量专线网段承载用户跨境业务流量，从根本上绕过公网跨国出口的拥堵和不可靠路由。
              </p>
              <!-- 简易可视化 -->
              <div class="flex items-center justify-between bg-white border border-emerald-100 rounded-lg p-1.5 mt-1">
                <div class="flex items-center gap-1 text-[9.5px] font-bold text-blue-600">
                  <span>🔵</span> 吉隆坡 (上车点)
                </div>
                <div class="flex-1 mx-2 relative h-3 flex items-center">
                  <div class="w-full h-1.5 bg-cyan-100 rounded-full overflow-hidden relative">
                    <div class="absolute w-4 h-full bg-cyan-500 rounded-full animate-flow-horizontal"></div>
                  </div>
                </div>
                <div class="flex items-center gap-1 text-[9.5px] font-bold text-emerald-600">
                  <span>🟢</span> 深圳 (下车点)
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== Step 2 Visual ==================== -->
          <div x-show="activeStep === 2" x-cloak class="w-full flex flex-col items-center justify-center space-y-4">
            <!-- 深圳服务器主体 -->
            <div class="bg-white border-2 border-amber-400 rounded-xl p-3.5 shadow-md w-full max-w-[220px] flex flex-col items-center relative animate-flow-light">
              <div class="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl mb-2 shadow-inner">
                🖥️
              </div>
              <span class="text-xs font-bold text-slate-800">深圳 CRM 应用</span>
              <span class="text-[9px] text-slate-400 mt-0.5">crm.company-a.com</span>
              <div class="mt-2.5 px-2.5 py-0.5 bg-amber-500 text-white rounded-full text-[9px] font-bold tracking-wider shadow-sm">
                【源站对象】
              </div>
              <div class="w-full border-t border-slate-100 mt-3 pt-2.5 flex justify-around text-[8.5px] text-slate-500">
                <div class="flex flex-col items-center">
                  <span>协议类型</span>
                  <span class="font-bold text-slate-700 mt-0.5">HTTPS</span>
                </div>
                <div class="w-px h-5 bg-slate-100"></div>
                <div class="flex flex-col items-center">
                  <span>默认端口</span>
                  <span class="font-bold text-slate-700 mt-0.5">443</span>
                </div>
              </div>
            </div>

            <!-- 老张的自白 -->
            <div class="w-full max-w-[420px] bg-amber-50/70 border border-amber-100 rounded-xl p-3 flex items-start gap-3 mt-2 shadow-sm">
              <div class="flex flex-col items-center flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-white border border-amber-200 flex items-center justify-center text-xl shadow-sm">👨‍💼</div>
                <span class="text-[9px] font-bold text-slate-600 mt-1">运维老张</span>
              </div>
              <div class="flex-1">
                <p class="text-[11px] text-slate-700 leading-relaxed font-medium">
                  “收到吉隆坡小A反馈卡顿后，我基于GA的优化原理立即着手处理。首先，需要锁定这次要加速的目标——把我们总部的<b>『深圳CRM应用』</b>指定为<b>『源站对象』</b>。这是整个加速链路的终点站，后续所有加速配置都将围绕它展开！”
                </p>
              </div>
            </div>
          </div>

          <!-- ==================== Step 3 Visual ==================== -->
          <div x-show="activeStep === 3" x-cloak class="w-full flex flex-col items-center justify-center space-y-4">
            <div class="flex items-center justify-between w-full max-w-[430px] relative px-4">
              <!-- 下车点传送门 (左侧，源站区域，略微小一些) -->
              <div class="bg-white border-2 border-emerald-500 rounded-xl p-2.5 shadow-md w-[130px] flex flex-col items-center relative">
                <div class="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-md shadow-inner">🟢</div>
                <span class="text-[9.5px] font-bold text-slate-700 mt-1">源站区域：深圳 POP</span>
                <span class="text-[8px] text-emerald-600 font-bold scale-90 mt-1">【源站地理位置】</span>
              </div>

              <!-- 出口管道 (从左向右) -->
              <div class="flex-1 flex justify-center items-center px-2">
                <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                  <path d="M 0 12 L 56 12 M 48 6 L 56 12 L 48 18" stroke="#10b981" stroke-width="2" stroke-dasharray="3 2" />
                </svg>
              </div>

              <!-- 深圳服务器 (右侧，源站对象，略微大一些) -->
              <div class="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm w-[155px] flex flex-col items-center">
                <span class="text-3xl">🖥️</span>
                <span class="text-[10.5px] font-bold text-slate-800 mt-1">CRM系统（业务地址）</span>
                <span class="text-[8px] text-amber-600 font-bold scale-90 mt-1.5 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">【源站对象】</span>
              </div>
            </div>

            <!-- 老张的自白 -->
            <div class="w-full max-w-[420px] bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 flex items-start gap-3 mt-2 shadow-sm">
              <div class="flex flex-col items-center flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-xl shadow-sm">👨‍💼</div>
                <span class="text-[9px] font-bold text-slate-600 mt-1">运维老张</span>
              </div>
              <div class="flex-1">
                <p class="text-[11px] text-slate-700 leading-relaxed font-medium">
                  “专线优化的第一步，是确定 CRM 服务器的物理位置。既然系统部署在深圳总部，我们的<b>『源站区域（即下车点）』</b>就应当就近选择<b>『深圳 POP』</b>，确保加速流量能够以最短路径、最快速度安全出站！”
                </p>
              </div>
            </div>
          </div>

          <!-- ==================== Step 4 Visual ==================== -->
          <div x-show="activeStep === 4" x-cloak class="w-full flex flex-col items-center justify-center space-y-4">
            <div class="flex items-center justify-between w-full max-w-[460px] relative px-1 py-2 min-h-[160px]">
              
              <!-- SVG Background Paths -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 0;" viewBox="0 0 460 160" preserveAspectRatio="none">
                <defs>
                  <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#10b981" />
                  </marker>
                </defs>
                <!-- 小A to 吉隆坡 POP -->
                <path d="M 65 40 L 95 40" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3 2" />
                <!-- 小B to 首尔 POP -->
                <path d="M 65 120 L 95 120" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3 2" />
                <!-- 吉隆坡 POP to 深圳下车点 -->
                <path d="M 185 40 L 232 77.6" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#arrow-green)" />
                <!-- 首尔 POP to 深圳下车点 -->
                <path d="M 185 120 L 232 82.4" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#arrow-green)" />
                <!-- 深圳下车点 to CRM系统 -->
                <path d="M 335 80 L 350 80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2" />
              </svg>

              <!-- Col 1: Employees -->
              <div class="flex flex-col space-y-6 relative" style="z-index: 10;">
                <!-- 小A -->
                <div class="bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm w-[65px] flex flex-col items-center">
                  <span class="text-base">👨‍💻</span>
                  <span class="text-[7.5px] font-bold text-slate-600 mt-0.5">吉隆坡 (小A)</span>
                </div>
                <!-- 小B -->
                <div class="bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm w-[65px] flex flex-col items-center">
                  <span class="text-base">👩‍💻</span>
                  <span class="text-[7.5px] font-bold text-slate-600 mt-0.5">首尔 (小B)</span>
                </div>
              </div>

              <!-- Col 2: POPs -->
              <div class="flex flex-col space-y-5 relative" style="z-index: 10;">
                <!-- 吉隆坡 POP -->
                <div class="bg-white border-2 border-blue-500 rounded-lg p-1.5 shadow-md w-[90px] flex flex-col items-center">
                  <span class="text-xs">🔵</span>
                  <span class="text-[8px] font-bold text-slate-700 mt-0.5">吉隆坡 POP</span>
                  <span class="text-[7px] text-blue-600 font-bold scale-90 mt-0.5">【加速区域】</span>
                </div>
                <!-- 首尔 POP -->
                <div class="bg-white border-2 border-blue-500 rounded-lg p-1.5 shadow-md w-[90px] flex flex-col items-center">
                  <span class="text-xs">🔵</span>
                  <span class="text-[8px] font-bold text-slate-700 mt-0.5">首尔 POP</span>
                  <span class="text-[7px] text-blue-600 font-bold scale-90 mt-0.5">【加速区域】</span>
                </div>
              </div>

              <!-- Col 3: Origin Area -->
              <div class="bg-white border border-emerald-500 rounded-lg p-2 shadow-sm w-[100px] flex flex-col items-center relative" style="z-index: 10;">
                <div class="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xs shadow-inner">🟢</div>
                <span class="text-[8px] font-bold text-slate-700 mt-1">源站区域：深圳 POP</span>
                <span class="text-[7px] text-emerald-600 font-bold scale-90 mt-0.5">【源站地理位置】</span>
              </div>

              <!-- Col 4: Origin Server -->
              <div class="bg-white border border-slate-200 rounded-lg p-2 shadow-sm w-[110px] flex flex-col items-center relative" style="z-index: 10;">
                <span class="text-lg">🖥️</span>
                <span class="text-[8px] font-bold text-slate-800 mt-0.5 text-center leading-tight">CRM系统<br>(业务地址)</span>
                <span class="text-[7px] text-amber-600 font-bold scale-90 mt-1 bg-amber-50 px-1 py-0.5 rounded border border-amber-100">【源站对象】</span>
              </div>

            </div>

            <!-- 老张的自白 -->
            <div class="w-full max-w-[420px] bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-start gap-3 mt-1 shadow-sm">
              <div class="flex flex-col items-center flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-xl shadow-sm">👨‍💼</div>
                <span class="text-[9px] font-bold text-slate-600 mt-1">运维老张</span>
              </div>
              <div class="flex-1">
                <p class="text-[11px] text-slate-700 leading-relaxed font-medium">
                  “明确了下车点后，接着要考虑让吉隆坡和首尔的员工就近『上车』。在配置<b>『加速区域（即上车点）』</b>时，勾选<b>『吉隆坡 POP』和『首尔 POP』</b>，这样员工的访问流量一出门就能直接接入高速专线，告别跨国公网卡顿！”
                </p>
              </div>
            </div>
          </div>

          <!-- ==================== Step 5 Visual ==================== -->
          <div x-show="activeStep === 5" x-cloak class="w-full flex flex-col items-center justify-center space-y-4">
            <div class="w-full max-w-[440px] text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5 font-bold tracking-wide">
              💡 完成 GA 加速配置后，小A 重新访问 CRM 业务系统：
            </div>
            <div class="flex items-center justify-between w-full max-w-[440px] relative px-2">
              <!-- 吉隆坡上车点 -->
              <div class="bg-white border border-blue-500 rounded-xl p-2 w-[110px] flex flex-col items-center shadow-sm">
                <span class="text-xl">🔵</span>
                <span class="text-[9px] font-bold text-slate-700 mt-1">吉隆坡上车点</span>
                <span class="text-[8px] text-blue-500 font-semibold scale-90">入口</span>
              </div>

              <!-- 高速专线 -->
              <div class="flex-1 relative mx-2 h-6 flex items-center justify-center">
                <div class="w-full h-2 bg-cyan-100 border border-cyan-200 rounded-full overflow-hidden relative">
                  <!-- 穿梭流动粒子 -->
                  <div class="absolute w-6 h-full bg-gradient-to-r from-transparent to-cyan-500 rounded-full animate-flow-horizontal"></div>
                </div>
                <!-- 专线文字标识 -->
                <span class="absolute -top-4 text-[8px] font-bold text-cyan-600 scale-90 bg-cyan-50 border border-cyan-100 px-1 rounded-full whitespace-nowrap">SASE 骨干物理专线</span>
              </div>

              <!-- 深圳下车点 -->
              <div class="bg-white border border-emerald-500 rounded-xl p-2 w-[110px] flex flex-col items-center shadow-sm">
                <span class="text-xl">🟢</span>
                <span class="text-[9px] font-bold text-slate-700 mt-1">深圳下车点</span>
                <span class="text-[8px] text-emerald-500 font-semibold scale-90">出口</span>
              </div>

              <!-- 高速对接 -->
              <div class="w-8 flex justify-center">
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                  <path d="M 0 5 L 14 5 M 10 2 L 14 5 L 10 8" stroke="#10b981" stroke-width="1.5" />
                </svg>
              </div>

              <!-- 深圳服务器 -->
              <div class="bg-white border border-amber-400 rounded-xl p-2 w-[110px] flex flex-col items-center shadow-sm">
                <span class="text-xl">🖥️</span>
                <span class="text-[9px] font-bold text-slate-700 mt-1">深圳 CRM 服务器</span>
                <span class="text-[8px] text-amber-500 font-semibold scale-90">源站目的地</span>
              </div>
            </div>

            <!-- 人物欢快互动 -->
            <div class="flex items-center gap-6 bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 px-4 shadow-sm">
              <div class="flex items-center gap-1.5">
                <span class="text-xl">👨‍💻</span>
                <span class="text-[9px] text-slate-700 font-medium">小A：<b>“秒开！时延降到80ms，太丝滑了！🚀”</b></span>
              </div>
              <div class="w-px h-6 bg-slate-200"></div>
              <div class="flex items-center gap-1.5">
                <span class="text-xl">👨‍💼</span>
                <span class="text-[9px] text-slate-700 font-medium">老张：<b>“高铁全线合龙，搞定！”</b></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ── 右栏：旁白区域 (精简文案/提炼重点 42%) ── -->
      <div style="width:42%;display:flex;flex-direction:column;justify-content:space-between;padding:24px;overflow-y:auto;background:#fff;">
        
        <div class="flex-1 flex flex-col justify-start">

          <!-- Page 1: 故事背景 -->
          <div x-show="activeStep === 1" x-cloak class="space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <span class="w-1.5 h-4 bg-brand rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">故事背景与角色</span>
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <p class="text-[11px] text-slate-600 leading-relaxed">
                <b>A公司业务场景</b>：总部位于深圳，在吉隆坡设有分公司。因跨国公网长途传输且容易拥堵，吉隆坡员工访问深圳 CRM 系统时卡顿异常严重。
              </p>
              <div class="h-px bg-slate-200 my-1"></div>
              <div class="space-y-2">
                <div class="text-[11px]"><strong class="text-blue-600">🧑‍💻 员工小A（吉隆坡）</strong>：吐槽“CRM系统慢得像PPT，而且经常掉线，没法干活！”</div>
                <div class="text-[11px]"><strong class="text-emerald-600">👨‍💼 运维老张（深圳）</strong>：着手解决网络卡顿问题，决定采用<b>全球加速 (GA)</b> 进行网络专线链路优化。</div>
              </div>
            </div>
          </div>

          <!-- Page 2 旁白：源站对象 -->
          <div x-show="activeStep === 2" x-cloak class="space-y-3.5">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <span class="w-1.5 h-4 bg-brand rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">核心概念解析</span>
            </div>
            <div class="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-2">
              <div class="text-xs font-bold text-amber-800 flex items-center gap-1">
                <span>🎯</span> 核心概念：源站对象 (Origin Object)
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed">
                <b>大白话比喻</b>：我们要搭乘网络高铁去拜访应用的<b>“具体门牌号”</b>。
              </p>
            </div>
            <div class="text-[11px] text-slate-600 leading-relaxed space-y-2">
              <p>📍 <b>做什么用</b>：锁定需要被加速的业务系统实体（支持 IP 或域名输入）。</p>
              <p>📍 <b>配置要点</b>：本场景中，需要加速深圳总部的 CRM 服务器，因此配置“源站对象”为公网域名 <code class="bg-slate-100 px-1 rounded text-slate-700 font-mono">crm.company-a.com</code>。</p>
            </div>
          </div>

          <!-- Page 3 旁白：源站区域 -->
          <div x-show="activeStep === 3" x-cloak class="space-y-3.5">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <span class="w-1.5 h-4 bg-brand rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">核心概念解析</span>
            </div>
            <div class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-2">
              <div class="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <span>🚪</span> 核心概念：源站区域
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed">
                <b>大白话比喻</b>：网络专线高铁在应用服务器一侧的<b>“下车点” (出口)</b>。
              </p>
            </div>
            <div class="text-[11px] text-slate-600 leading-relaxed space-y-2">
              <p>📍 <b>做什么用</b>：选择离物理服务器最近的专线出口区域，以便就近对接出口网关。</p>
              <p>📍 <b>配置要点</b>：因为 CRM 服务器物理存放于深圳，所以在配置中选择<b>“深圳”</b>（即深圳 POP）。流量出专线后，直接通过极速专用网络送达服务器。</p>
            </div>
          </div>

          <!-- Page 4 旁白：加速区域 -->
          <div x-show="activeStep === 4" x-cloak class="space-y-3.5">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <span class="w-1.5 h-4 bg-brand rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">核心概念解析</span>
            </div>
            <div class="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2">
              <div class="text-xs font-bold text-blue-800 flex items-center gap-1">
                <span>⚡</span> 核心概念：加速区域
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed">
                <b>大白话比喻</b>：员工一出门最近的<b>“高铁上车点” (入口)</b>。
              </p>
            </div>
            <div class="text-[11px] text-slate-600 leading-relaxed space-y-2">
              <p>📍 <b>做什么用</b>：配置使用该系统的员工所处地理区域，就近接入高速专线。</p>
              <p>📍 <b>配置要点</b>：本场景中吉隆坡和首尔员工访问最卡，故配置中勾选<b>“吉隆坡”和“首尔”</b>。系统会在当地部署加速 POP 节点，流量就近接入专线。</p>
            </div>
          </div>

          <!-- Page 5 旁白 -->
          <div x-show="activeStep === 5" x-cloak class="space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <span class="w-1.5 h-4 bg-brand rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">链路贯通效果</span>
            </div>
            <div class="bg-cyan-50/60 border border-cyan-100 rounded-xl p-3.5 space-y-2">
              <div class="text-xs font-bold text-cyan-800 flex items-center gap-1">
                <span>🚄</span> 高铁合龙：全线闭环运转
              </div>
              <p class="text-[11px] text-slate-600 leading-normal">
                吉隆坡员工小A发起 CRM 访问，流量一出门自动进入<b>吉隆坡上车点</b>，通过 <b>SASE全球加密专线</b> 直达<b>深圳下车点</b>，高速注入<b>深圳CRM服务器</b>。
              </p>
            </div>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              *通过该专线模式，完全绕过了公网跨国出口的重重拥堵和包过滤，实现秒级高可靠的数据安全闪传。
            </p>
          </div>

        </div>



      </div>

    </div>

    <!-- Footer (翻页区域 3) -->
    <div style="padding:14px 24px;border-top:1px solid #f1f5f9;background:#fafafa;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <!-- Indicator Dots -->
      <div class="flex items-center gap-1.5">
        <template x-for="p in [1,2,3,4,5]" :key="p">
          <button @click="activeStep = p" 
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="activeStep === p ? 'bg-brand w-5' : 'bg-slate-200 hover:bg-slate-300'"></button>
        </template>
      </div>
      <!-- Controls -->
      <div class="flex items-center gap-2">
        <button x-show="activeStep > 1" @click="activeStep--" x-cloak
          class="h-8 px-4 rounded text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
          上一页
        </button>
        <button x-show="activeStep < 5" @click="activeStep++"
          class="h-8 px-5 rounded text-xs text-white bg-brand hover:bg-brand-hover transition-colors font-medium">
          下一页
        </button>
        <button x-show="activeStep === 5" @click="gaModal.hide()" x-cloak
          class="h-8 px-5 rounded text-xs text-white bg-brand hover:bg-brand-hover transition-colors font-semibold shadow-sm">
          我懂了，开始配置
        </button>
      </div>
    </div>

  </div>
</div>

<style>
  @keyframes ga-dash {
    to { stroke-dashoffset: -40; }
  }
  .animate-flow-dash {
    animation: ga-dash 2s linear infinite;
  }
  
  @keyframes ga-flow-light {
    0% { transform: scale(1); }
    50% { transform: scale(1.03); box-shadow: 0 8px 24px rgba(245,158,11,0.15); }
    100% { transform: scale(1); }
  }
  .animate-flow-light {
    animation: ga-flow-light 2.5s infinite ease-in-out;
  }

  @keyframes ga-flow-horizontal {
    0% { left: -20%; }
    100% { left: 100%; }
  }
  .animate-flow-horizontal {
    animation: ga-flow-horizontal 1.8s linear infinite;
  }
</style>
`;

  // 插入 DOM 的函数
  function injectModal() {
    if (!document.getElementById('ga-learn-modal')) {
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
  }

  // 确保在 DOM 就绪时插入
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectModal);
  } else {
    injectModal();
  }

  // 暴露全局方法
  window.gaModal = {
    show: function() {
      try { localStorage.setItem('hideLearnBubble', 'true'); } catch(e){}
      window.dispatchEvent(new CustomEvent('hide-learn-bubble'));
      window.dispatchEvent(new CustomEvent('open-learn-modal'));
    },
    hide: function() {
      var el = document.getElementById('ga-learn-modal');
      if (el) el.style.display = 'none';
    }
  };

  // 监听 ESC 键关闭
  document.addEventListener('keydown', function(e) { 
    if (e.key === 'Escape') {
      window.gaModal.hide(); 
    }
  });

})();
