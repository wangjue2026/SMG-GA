import sys
import re

with open('Demos/atrust-access-experience-monitoring.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_tag = '<main class="flex-1 bg-bg-light p-3 flex flex-col overflow-hidden">'
end_tag = '</main>'

start_idx = text.find(start_tag)
end_idx = text.find(end_tag, start_idx)

if start_idx == -1 or end_idx == -1:
    print("Cannot find main tag")
    sys.exit(1)

new_main = """      <main class="flex-1 bg-bg-light p-3 flex flex-col overflow-hidden" x-data="{ datePanelOpen: false, dateShortcut: '近7天', dateRange: '2023-10-18 00:00:00 ~ 2023-10-24 23:59:59' }">
        <template x-if="topNav === '监控中心' && activeLeaf.startsWith('m_0_0_')">
          <div class="flex-1 flex flex-col overflow-hidden">
          
            <!-- 1. 总览页 (Dashboard 布局：无白底容器，无页头 Tab，自带时间筛选) -->
            <div x-show="activeLeaf === 'm_0_0_0'" class="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar" x-cloak>
              
              <!-- Dashboard 工具栏 -->
              <div class="flex items-center justify-between flex-shrink-0">
                <span class="text-[16px] font-semibold text-text-title">访问体验监测总览</span>
                <div class="flex items-center gap-2">
                  
                  <!-- 复合日期筛选器 (遵循 comp-date-picker 规范) -->
                  <div class="flex items-center border border-border rounded-[2px] h-8 bg-white cursor-pointer hover:border-brand transition-colors relative" @click="datePanelOpen = !datePanelOpen">
                    <!-- 左侧快捷区 (保底 88px) -->
                    <div class="min-w-[88px] h-full bg-bg-light flex items-center px-3 border-r border-bg-line flex-shrink-0">
                      <span class="text-xs text-text-title" x-text="dateShortcut"></span>
                      <svg class="w-3.5 h-3.5 ml-auto text-text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <!-- 右侧日期区 (固定 340px) -->
                    <div class="w-[340px] h-full flex items-center px-2 flex-shrink-0">
                      <span class="text-xs text-text flex-1 text-center font-outfit" x-text="dateRange"></span>
                      <svg class="w-4 h-4 text-text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>

                    <!-- 下拉面板 -->
                    <div x-show="datePanelOpen" @click.away="datePanelOpen = false" class="absolute top-[36px] left-0 w-[88px] bg-white border border-border rounded-[2px] shadow-[0_4px_16px_rgba(30,35,43,0.14)] py-1 z-50" x-cloak>
                      <div class="px-3 py-1.5 text-xs text-text hover:bg-bg-light" @click="dateShortcut='今天'; dateRange='2023-10-24 00:00:00 ~ 2023-10-24 23:59:59'">今天</div>
                      <div class="px-3 py-1.5 text-xs text-text hover:bg-bg-light" @click="dateShortcut='近24小时'; dateRange='2023-10-23 14:00:00 ~ 2023-10-24 14:00:00'">近24小时</div>
                      <div class="px-3 py-1.5 text-xs text-brand bg-brand-lightBg" @click="dateShortcut='近7天'; dateRange='2023-10-18 00:00:00 ~ 2023-10-24 23:59:59'">近7天</div>
                      <div class="px-3 py-1.5 text-xs text-text hover:bg-bg-light" @click="dateShortcut='近30天'; dateRange='2023-09-25 00:00:00 ~ 2023-10-24 23:59:59'">近30天</div>
                      <div class="px-3 py-1.5 text-xs text-text hover:bg-bg-light" @click="dateShortcut='自定义'; dateRange='2023-10-01 00:00:00 ~ 2023-10-10 23:59:59'">自定义</div>
                    </div>
                  </div>
                  
                  <!-- 刷新按钮 -->
                  <button class="w-8 h-8 flex items-center justify-center border border-border bg-white rounded-[2px] hover:text-brand hover:border-brand transition-colors">
                    <svg class="w-4 h-4 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  </button>
                </div>
              </div>

              <!-- Top Metrics -->
              <div class="grid grid-cols-4 gap-3 flex-shrink-0">
                <!-- 综合分数 -->
                <div class="bg-white border border-bg-line rounded-container p-4 flex flex-col gap-2 relative overflow-hidden">
                  <div class="text-xs text-text-title font-semibold">体验健康度打分</div>
                  <div class="flex items-baseline gap-2 mt-1">
                    <span class="text-3xl font-bold font-outfit text-brand">94</span>
                    <span class="text-xs text-text-mute">/ 100 分</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs mt-2">
                    <span class="px-1.5 py-0.5 rounded-[2px] bg-success/10 text-success">良好</span>
                    <span class="text-text-mute flex items-center gap-1">较上期 <span class="text-success">↑ 2.4%</span></span>
                  </div>
                  <svg class="absolute right-0 bottom-0 w-24 h-24 text-brand opacity-5 pointer-events-none transform translate-x-4 translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                </div>
                
                <!-- 问题闭环 -->
                <div class="bg-white border border-bg-line rounded-container p-4 flex flex-col gap-2">
                  <div class="text-xs text-text-title font-semibold flex justify-between">
                    <span>区间内体验问题闭环</span>
                    <span class="text-brand cursor-pointer hover:underline text-[11px] font-normal">详情</span>
                  </div>
                  <div class="flex items-baseline gap-2 mt-1">
                    <span class="text-3xl font-bold font-outfit text-text-title">118</span>
                    <span class="text-xs text-text-mute">/ 124 起</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs mt-2">
                    <span class="text-text-mute">闭环率</span>
                    <span class="font-outfit font-semibold text-text-title">95.1%</span>
                    <div class="flex-1 h-1.5 bg-bg-line rounded-full overflow-hidden ml-1">
                      <div class="h-full bg-brand rounded-full" style="width: 95.1%"></div>
                    </div>
                  </div>
                </div>

                <!-- 对内 SLA -->
                <div class="bg-white border border-bg-line rounded-container p-4 flex flex-col gap-2">
                  <div class="text-xs text-text-title font-semibold">内部业务 SLA 达标率</div>
                  <div class="flex items-baseline gap-2 mt-1">
                    <span class="text-3xl font-bold font-outfit text-text-title">99.2%</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs mt-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-warning"></span>
                    <span class="text-text-mute">1 个业务未达标，已自动收集</span>
                    <a class="text-brand hover:underline cursor-pointer">证据链</a>
                  </div>
                </div>

                <!-- 对外 SLA -->
                <div class="bg-white border border-bg-line rounded-container p-4 flex flex-col gap-2">
                  <div class="text-xs text-text-title font-semibold">外部 SaaS SLA 达标率</div>
                  <div class="flex items-baseline gap-2 mt-1">
                    <span class="text-3xl font-bold font-outfit text-warning">96.5%</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs mt-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-risk"></span>
                    <span class="text-text-mute">2 个 SaaS 未达标，已自动收集</span>
                    <a class="text-brand hover:underline cursor-pointer">证据链</a>
                  </div>
                </div>
              </div>

              <!-- Charts Row -->
              <div class="flex gap-3 h-[300px] flex-shrink-0">
                <!-- 体验趋势 -->
                <div class="bg-white border border-bg-line rounded-container flex flex-col flex-[3]">
                  <div class="h-10 px-4 border-b border-bg-line flex items-center justify-between">
                    <span class="text-xs font-semibold text-text-title" x-text="'体验健康度趋势 (' + dateShortcut + ')'"></span>
                  </div>
                  <div class="flex-1 p-4 relative">
                    <svg class="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                      <!-- Grid lines -->
                      <line x1="0" y1="50" x2="800" y2="50" stroke="var(--color-graphite-l30)" stroke-dasharray="4" />
                      <line x1="0" y1="100" x2="800" y2="100" stroke="var(--color-graphite-l30)" stroke-dasharray="4" />
                      <line x1="0" y1="150" x2="800" y2="150" stroke="var(--color-graphite-l30)" stroke-dasharray="4" />
                      <!-- Area -->
                      <path d="M0 120 Q 150 140, 300 90 T 600 80 T 800 60 L 800 200 L 0 200 Z" fill="rgba(28,110,255,0.05)" />
                      <!-- Line -->
                      <path d="M0 120 Q 150 140, 300 90 T 600 80 T 800 60" fill="none" stroke="var(--color-blue)" stroke-width="2" />
                    </svg>
                    <div class="absolute left-6 top-6 flex items-center gap-4 text-xs text-text-mute">
                      <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-[2px] bg-brand"></span>综合健康度</div>
                    </div>
                  </div>
                </div>

                <!-- 排名榜单 -->
                <div class="bg-white border border-bg-line rounded-container flex flex-col flex-[2]">
                  <div class="h-10 px-4 border-b border-bg-line flex items-center justify-between">
                    <span class="text-xs font-semibold text-text-title">分支/地域体验红黑榜</span>
                  </div>
                  <div class="flex-1 p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                    <!-- Item 1 -->
                    <div class="flex items-center gap-3">
                      <span class="w-4 text-center text-xs font-outfit text-text-mute">1</span>
                      <div class="w-20 text-xs text-text-title truncate" title="华东分公司">华东分公司</div>
                      <div class="flex-1 h-1.5 bg-bg-light rounded-full overflow-hidden">
                        <div class="h-full bg-success rounded-full" style="width: 98%"></div>
                      </div>
                      <span class="w-8 text-right text-xs font-outfit text-text-title">98</span>
                    </div>
                    <!-- Item 2 -->
                    <div class="flex items-center gap-3">
                      <span class="w-4 text-center text-xs font-outfit text-text-mute">2</span>
                      <div class="w-20 text-xs text-text-title truncate" title="华南分公司">华南分公司</div>
                      <div class="flex-1 h-1.5 bg-bg-light rounded-full overflow-hidden">
                        <div class="h-full bg-success rounded-full" style="width: 96%"></div>
                      </div>
                      <span class="w-8 text-right text-xs font-outfit text-text-title">96</span>
                    </div>
                    <!-- Item 3 -->
                    <div class="flex items-center gap-3">
                      <span class="w-4 text-center text-xs font-outfit text-text-mute">3</span>
                      <div class="w-20 text-xs text-text-title truncate" title="欧洲办事处">欧洲办事处</div>
                      <div class="flex-1 h-1.5 bg-bg-light rounded-full overflow-hidden">
                        <div class="h-full bg-brand rounded-full" style="width: 92%"></div>
                      </div>
                      <span class="w-8 text-right text-xs font-outfit text-text-title">92</span>
                    </div>
                    <!-- Item 4 -->
                    <div class="flex items-center gap-3">
                      <span class="w-4 text-center text-xs font-outfit text-text-mute">4</span>
                      <div class="w-20 text-xs text-text-title truncate" title="北美办事处">北美办事处</div>
                      <div class="flex-1 h-1.5 bg-bg-light rounded-full overflow-hidden">
                        <div class="h-full bg-warning rounded-full" style="width: 82%"></div>
                      </div>
                      <span class="w-8 text-right text-xs font-outfit text-text-title">82</span>
                    </div>
                    <!-- Item 5 (红榜拖后腿) -->
                    <div class="flex items-center gap-3">
                      <span class="w-4 text-center text-xs font-outfit text-risk font-semibold">5</span>
                      <div class="w-20 text-xs text-risk font-semibold truncate" title="拉美办事处">拉美办事处</div>
                      <div class="flex-1 h-1.5 bg-risk/20 rounded-full overflow-hidden relative">
                        <div class="h-full bg-risk rounded-full" style="width: 65%"></div>
                      </div>
                      <span class="w-8 text-right text-xs font-outfit text-risk font-semibold">65</span>
                    </div>
                  </div>
                  <div class="p-2 border-t border-bg-line bg-risk/5 mx-2 mb-2 rounded-[4px] flex items-start gap-2">
                    <svg class="w-4 h-4 text-risk flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div class="text-[11px] text-text">
                      拉美办事处体验低于基线 (65分)，主要原因为<span class="text-risk font-semibold">跨国专线丢包</span>，拖累全局健康度，建议优化路由。
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. 非总览页 (常规带有白底 Tab Header 的布局) -->
            <div x-show="activeLeaf !== 'm_0_0_0'" class="bg-white rounded-container shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1 flex flex-col overflow-hidden border border-bg-line" x-cloak>
              
              <!-- Tab Header -->
              <div class="h-12 border-b border-bg-line flex items-center px-4 flex-shrink-0 justify-between">
                <div class="flex items-center h-full">
                  <span class="text-[16px] font-semibold text-text-title" x-text="activeLeaf === 'm_0_0_1' ? '运维告警' : '监测配置'"></span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="h-8 px-4 text-xs border border-border text-text rounded-control hover:text-brand hover:border-brand transition-colors">导出报告</button>
                  <button class="h-8 px-4 text-xs bg-brand text-white rounded-control hover:bg-brand-hover transition-colors" @click="drawer = true">新建监测任务</button>
                </div>
              </div>

              <div class="flex-1 overflow-y-auto bg-bg-light">
                <!-- 运维告警页 (m_0_0_1) -->
                <div x-show="activeLeaf === 'm_0_0_1'" class="p-4 flex flex-col gap-4" x-cloak>
                  <!-- SeerAgent Banner -->
                  <div class="flex items-center bg-gradient-to-r from-[rgba(28,110,255,0.1)] to-[rgba(109,212,5,0.05)] border border-[rgba(28,110,255,0.2)] rounded-container min-h-[40px] px-4 py-2 gap-3 flex-shrink-0">
                    <svg class="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    <span class="text-sm text-text-title flex-1">
                      <span class="font-semibold text-brand">SeerAgent 辅助驾驶中：</span> 已为您识别到 <span class="text-risk font-bold">2 个</span> 阻塞型业务访问异常，建议立即进行处理。
                    </span>
                    <button class="h-8 px-4 text-xs bg-white border border-brand text-brand rounded-control hover:bg-brand-lightBg transition-colors">一键采纳与修复</button>
                  </div>

                  <!-- Smart Alert List -->
                  <div class="flex flex-col gap-4">
                    
                    <!-- Alert Card 1 (Can be auto-fixed) -->
                    <div class="bg-white border border-risk/20 rounded-container shadow-sm flex flex-col relative overflow-hidden">
                      <div class="absolute left-0 top-0 bottom-0 w-1 bg-risk"></div>
                      
                      <div class="p-4 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                          <div class="flex items-center gap-2">
                            <span class="px-1.5 py-0.5 rounded-[2px] bg-risk/10 text-risk border border-risk/20 text-[11px] font-semibold">紧急</span>
                            <span class="text-sm font-semibold text-text-title">华南区访问研发 GitLab 持续高延迟</span>
                            <span class="text-[11px] text-text-mute ml-2">发生时间：10分钟前</span>
                          </div>
                          <span class="text-xs text-warning flex items-center gap-1">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            待处理
                          </span>
                        </div>
                        
                        <div class="flex gap-4">
                           <!-- Basic Info -->
                           <div class="w-[280px] bg-bg-light rounded-[4px] p-3 flex flex-col gap-2 text-xs border border-bg-line">
                             <div class="flex justify-between"><span class="text-text-mute">影响范围</span><span class="text-text-title">华南分公司 (约45人)</span></div>
                             <div class="flex justify-between"><span class="text-text-mute">受阻业务</span><span class="text-text-title font-medium">GitLab (10.2.1.5)</span></div>
                             <div class="flex justify-between"><span class="text-text-mute">当前体验</span><span class="text-risk font-outfit">首包时延 850ms</span></div>
                             <div class="flex justify-between"><span class="text-text-mute">接入网关</span><span class="text-text-title">广州-01 节点</span></div>
                           </div>
                           
                           <!-- AI Diagnosis & Action -->
                           <div class="flex-1 bg-brand-lightBg/30 border border-brand/20 rounded-[4px] p-3 flex flex-col gap-2">
                             <div class="flex items-center gap-2 text-xs font-semibold text-brand">
                               <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                               AI 智能诊断与根因分析
                             </div>
                             <div class="text-xs text-text leading-relaxed">
                               探测到本地 ISP (中国电信) 骨干网出口发生拥塞，丢包率达 <span class="text-risk font-bold">18%</span>。当前广州-01接入节点受此影响严重，导致访问内网 GitLab 链路劣化。
                             </div>
                             <div class="h-[1px] w-full bg-brand/10 my-1"></div>
                             <div class="text-xs text-text flex items-center gap-2">
                               <span class="text-brand font-medium">修复建议：</span>云端已匹配到备用健康节点 <span class="font-mono bg-white px-1 py-0.5 rounded border border-border">深圳-02 (时延45ms)</span>，支持一键切换引流，并生成证据链。
                             </div>
                             <div class="mt-2 flex items-center gap-3">
                               <button class="h-8 px-4 text-xs bg-brand text-white rounded-control hover:bg-brand-hover transition-colors shadow-[0_2px_4px_rgba(28,110,255,0.2)]">一键切换节点</button>
                               <button class="h-8 px-3 text-xs bg-white border border-border text-text rounded-control hover:text-brand hover:border-brand transition-colors">查看完整链路</button>
                               <button class="h-8 px-3 text-xs text-text-mute hover:text-brand transition-colors flex items-center gap-1">
                                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                 导出追责证据链
                               </button>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <!-- Alert Card 2 (Cannot be auto-fixed) -->
                    <div class="bg-white border border-warning/30 rounded-container shadow-sm flex flex-col relative overflow-hidden">
                      <div class="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
                      
                      <div class="p-4 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                          <div class="flex items-center gap-2">
                            <span class="px-1.5 py-0.5 rounded-[2px] bg-warning/10 text-warning border border-warning/20 text-[11px] font-semibold">中危</span>
                            <span class="text-sm font-semibold text-text-title">财务部部分用户访问 OA 系统失败</span>
                            <span class="text-[11px] text-text-mute ml-2">发生时间：2小时前</span>
                          </div>
                          <span class="text-xs text-text-mute flex items-center gap-1">待处理</span>
                        </div>
                        
                        <div class="flex gap-4">
                           <!-- Basic Info -->
                           <div class="w-[280px] bg-bg-light rounded-[4px] p-3 flex flex-col gap-2 text-xs border border-bg-line">
                             <div class="flex justify-between"><span class="text-text-mute">影响范围</span><span class="text-text-title">财务部 (3人)</span></div>
                             <div class="flex justify-between"><span class="text-text-mute">受阻业务</span><span class="text-text-title font-medium">OA 系统 (oa.corp.com)</span></div>
                             <div class="flex justify-between"><span class="text-text-mute">当前体验</span><span class="text-risk">DNS 解析失败</span></div>
                             <div class="flex justify-between"><span class="text-text-mute">接入端</span><span class="text-text-title">Windows aTrust Agent</span></div>
                           </div>
                           
                           <!-- AI Diagnosis & Action -->
                           <div class="flex-1 bg-warning/5 border border-warning/20 rounded-[4px] p-3 flex flex-col gap-2">
                             <div class="flex items-center gap-2 text-xs font-semibold text-warning">
                               <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                               AI 智能诊断与根因分析
                             </div>
                             <div class="text-xs text-text leading-relaxed">
                               网络连通性正常。但检测到受影响的 3 台设备本地网卡被篡改了自定义 DNS（指向了不可达的 192.168.1.100），导致无法解析内网域名。
                             </div>
                             <div class="h-[1px] w-full bg-warning/10 my-1"></div>
                             <div class="text-xs text-text flex items-center gap-2">
                               <span class="text-warning font-medium">修复建议：</span>该问题属于终端环境异常，无法通过云端调度修复。建议向受影响设备下发网络重置指令。
                             </div>
                             <div class="mt-2 flex items-center gap-3">
                               <button class="h-8 px-4 text-xs bg-white border border-border text-text rounded-control hover:text-brand hover:border-brand transition-colors">下发网络重置指令</button>
                               <button class="h-8 px-3 text-xs bg-white border border-border text-text rounded-control hover:text-brand hover:border-brand transition-colors">查看受影响终端</button>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                <!-- 监测配置页 (m_0_0_2) -->
                <div x-show="activeLeaf === 'm_0_0_2'" class="p-3 flex flex-col gap-3" x-cloak>
                  <div class="bg-white rounded-container p-8 flex flex-col items-center justify-center text-graphite-d10 min-h-[400px]">
                    <svg class="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span class="text-sm">监测配置模块建设中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template x-if="!(topNav === '监控中心' && activeLeaf.startsWith('m_0_0_'))">
          <div class="bg-white rounded-container shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1 flex flex-col items-center justify-center text-graphite-d10">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <span class="text-sm">模块建设中...</span>
          </div>
        </template>
      </main>"""

text = text[:start_idx] + new_main + text[end_idx+len(end_tag):]

with open('Demos/atrust-access-experience-monitoring.html', 'w', encoding='utf-8') as f:
    f.write(text)

