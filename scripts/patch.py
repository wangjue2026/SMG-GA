import sys

# read file
filepath = 'Demos/atrust-access-experience-monitoring.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

start_str = """        <template x-if="topNav === '监控中心' && activeLeaf.startsWith('m_0_0_')">"""
end_str = """        <template x-if="!(topNav === '监控中心' && activeLeaf.startsWith('m_0_0_'))">"""

start_idx = text.find(start_str)
end_idx = text.find(end_str)

if start_idx == -1 or end_idx == -1:
    print("Failed to find boundaries.")
    sys.exit(1)

new_content = """        <template x-if="topNav === '监控中心' && activeLeaf.startsWith('m_0_0_')">
          <div class="bg-white rounded-container shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1 flex flex-col overflow-hidden relative"
               x-data="{ 
                 pageTab: '智能运维',
                 smartOpsTab: '实时体验监测',
                 aiDrawerOpen: false,
                 diagState: 'idle',
                 chatState: 'init'
               }">
            
            <!-- PageTitle (48px) - Strictly adhering to comp-page-title.md -->
            <div class="h-[48px] flex items-center flex-shrink-0 bg-white relative">
              <div class="flex items-center h-full pl-[16px]">
                <span class="text-[16px] font-[600] text-text-title leading-none">访问体验监测</span>
                <div class="w-[1px] h-[16px] mx-[12px]" style="background-color: var(--color-graphite-l30);"></div>
                
                <div class="flex items-center h-full gap-6 relative">
                  <template x-for="tab in ['智能运维', '站点', '应用', '用户']">
                    <div class="relative h-full flex items-center cursor-pointer select-none group" @click="pageTab = tab">
                      <span class="text-[14px] transition-colors"
                            :class="pageTab === tab ? 'text-brand font-[600]' : 'text-text-title font-[400] group-hover:text-brand'"
                            x-text="tab"></span>
                      <div x-show="pageTab === tab" class="absolute bottom-0 left-0 right-0 h-[2px] bg-brand" x-cloak></div>
                    </div>
                  </template>
                </div>
              </div>
              <!-- Right actions -->
              <div class="ml-auto pr-4 flex items-center gap-2">
                <button class="h-8 px-4 text-xs border border-border text-text rounded-control hover:text-brand hover:border-brand transition-colors">导出报告</button>
              </div>
              <!-- Header Bottom Border -->
              <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-bg-line"></div>
            </div>

            <!-- Content Area -->
            <div class="flex-1 flex flex-col bg-bg-light overflow-hidden relative">
              <!-- 智能运维 -->
              <div x-show="pageTab === '智能运维'" class="flex-1 flex flex-col h-full overflow-hidden" x-cloak>
                 
                 <!-- Sub-tab Scenarios -->
                 <div class="flex items-center gap-3 px-4 py-3 flex-shrink-0 bg-white">
                    <template x-for="sTab in ['实时体验监测', '报障定位', '模拟测试']">
                       <div class="px-4 py-1.5 rounded-[4px] text-xs font-medium cursor-pointer transition-colors border"
                            :class="smartOpsTab === sTab ? 'bg-brand/10 border-brand/50 text-brand' : 'bg-white border-bg-line text-text hover:border-brand/50 hover:text-brand'"
                            @click="smartOpsTab = sTab" x-text="sTab"></div>
                    </template>
                 </div>
                 
                 <!-- Main scrollable view -->
                 <div class="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
                    
                    <!-- 1. 实时体验监测 -->
                    <div x-show="smartOpsTab === '实时体验监测'" class="flex flex-col gap-4">
                      <!-- AI Banner -->
                      <div class="flex items-center bg-gradient-to-r from-brand/10 to-success/5 border border-brand/20 rounded-container px-4 py-3 gap-3">
                        <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        <span class="text-sm text-text-title flex-1">
                          <span class="font-semibold text-brand">SeerAgent 辅助驾驶中：</span> 当前全网体验优良，发现 <span class="text-risk font-bold">1 个</span> 局部体验劣化问题，已生成修复建议。
                        </span>
                      </div>
                      
                      <!-- AI Card -->
                      <div class="bg-white border border-warning/30 rounded-container shadow-sm flex flex-col overflow-hidden relative group hover:border-warning/50 transition-colors">
                        <div class="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
                        <div class="p-4 flex flex-col gap-3">
                          <div class="flex justify-between items-start">
                            <div class="flex items-center gap-2">
                              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-warning/10 text-warning border border-warning/20">中危</span>
                              <span class="text-sm font-semibold text-text-title">华东分公司-研发部 访问核心仓储系统卡顿</span>
                              <span class="text-[11px] text-text-mute ml-2">最近发生：5分钟前</span>
                            </div>
                          </div>
                          <div class="flex gap-4">
                            <!-- Base Data -->
                            <div class="w-[280px] bg-bg-light rounded p-3 flex flex-col gap-2 text-xs border border-bg-line">
                              <div class="flex justify-between"><span class="text-text-mute">影响范围</span><span class="text-text-title">华东分公司 (约15人)</span></div>
                              <div class="flex justify-between"><span class="text-text-mute">受阻业务</span><span class="text-text-title font-medium">仓储管理 (10.0.0.5)</span></div>
                              <div class="flex justify-between"><span class="text-text-mute">当前体验</span><span class="text-warning">TCP时延 450ms</span></div>
                            </div>
                            <!-- AI Insight -->
                            <div class="flex-1 bg-brand-lightBg/30 border border-brand/20 rounded p-3 flex flex-col gap-2 relative">
                              <div class="flex items-center gap-2 text-xs font-semibold text-brand">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                AI 智能诊断
                              </div>
                              <div class="text-xs text-text leading-relaxed">
                                <span class="font-semibold text-text-title">问题说明：</span>客户端到网关连通性良好，但 <span class="font-semibold">接入网关到应用服务器</span> 之间存在严重的高延时及偶发丢包。
                                <br>
                                <span class="font-semibold text-text-title mt-1 block">建议动作：</span>目前云端已匹配到一条更优的备用 BGP 专线 (时延 25ms)。是否立即切换引流？
                              </div>
                              <div class="mt-2 flex gap-3">
                                <button class="h-7 px-4 text-xs bg-brand text-white rounded hover:bg-brand-hover shadow-sm transition-colors">一键切换专线</button>
                                <button class="h-7 px-3 text-xs bg-white border border-border text-text rounded hover:text-brand hover:border-brand transition-colors" @click="aiDrawerOpen = true">抽屉查看详情及证据图</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 2. 报障定位 -->
                    <div x-show="smartOpsTab === '报障定位'" class="flex h-[calc(100vh-210px)] min-h-[500px] gap-4">
                      <!-- Chat UI -->
                      <div class="w-[350px] bg-white border border-bg-line rounded-container flex flex-col overflow-hidden shadow-sm">
                        <div class="h-12 border-b border-bg-line px-4 flex items-center bg-bg-light/30 flex-shrink-0">
                          <svg class="w-5 h-5 text-brand mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                          <span class="text-sm font-semibold text-text-title">AI 排障助手</span>
                        </div>
                        <div class="flex-1 p-4 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
                           <div class="flex flex-col gap-3">
                             <div class="flex items-start gap-2">
                                <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 text-brand">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                </div>
                                <div class="bg-bg-light p-3 rounded-[8px] rounded-tl-none text-xs text-text leading-relaxed">
                                  您好，我是零信任排障助手。您可以直接描述遇到的问题，或选择以下常见场景快速排查：
                                </div>
                             </div>
                             <div class="pl-10 flex flex-wrap gap-2" x-show="chatState === 'init'">
                                <div class="px-3 py-1.5 bg-white border border-brand/30 text-brand rounded-full text-[11px] cursor-pointer hover:bg-brand hover:text-white transition-colors" @click="chatState = 'analyzing'; setTimeout(() => chatState = 'result', 1500)">财务部反馈OA系统打不开</div>
                                <div class="px-3 py-1.5 bg-white border border-brand/30 text-brand rounded-full text-[11px] cursor-pointer hover:bg-brand hover:text-white transition-colors">研发反馈GitLab访问慢</div>
                             </div>
                           </div>
                           
                           <div class="flex flex-col gap-4" x-show="chatState !== 'init'" x-cloak>
                             <!-- User msg -->
                             <div class="flex items-start gap-2 justify-end">
                                <div class="bg-brand text-white p-3 rounded-[8px] rounded-tr-none text-xs leading-relaxed max-w-[80%]">
                                  财务部反馈OA系统打不开
                                </div>
                                <div class="w-8 h-8 rounded-full bg-border flex items-center justify-center flex-shrink-0 text-text font-bold text-xs">U</div>
                             </div>
                             <!-- AI Analyzing -->
                             <div class="flex items-start gap-2" x-show="chatState === 'analyzing'">
                                <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 text-brand"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                                <div class="bg-bg-light p-3 rounded-[8px] rounded-tl-none text-xs text-text leading-relaxed flex items-center gap-2">
                                  <svg class="w-4 h-4 animate-spin text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.415 31.415" stroke-dashoffset="0"></circle></svg>
                                  正在对相关终端、网关及应用链路进行交叉分析...
                                </div>
                             </div>
                             <!-- AI Result -->
                             <div class="flex items-start gap-2" x-show="chatState === 'result'" x-cloak>
                                <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 text-brand">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div class="bg-bg-light p-3 rounded-[8px] rounded-tl-none text-xs text-text leading-relaxed">
                                  排查完成！右侧已生成链路多维报告。<br><br>
                                  <span class="font-semibold text-risk">根因诊断：</span> 财务部客户端 Agent 被第三方安全软件拦截了网络组件加载，导致无法建立安全隧道。<br><br>
                                  <span class="font-semibold text-brand">处置建议：</span> 建议配置该终端防护软件的白名单策略，或重置 Agent 网络组件。
                                  <button class="mt-3 w-full h-7 bg-white border border-brand text-brand rounded hover:bg-brand hover:text-white transition-colors" @click="chatState = 'init'">重置排查</button>
                                </div>
                             </div>
                           </div>
                        </div>
                        <!-- Input -->
                        <div class="p-3 border-t border-bg-line flex items-center gap-2 bg-white flex-shrink-0">
                          <input type="text" class="flex-1 h-8 px-3 border border-border rounded text-xs focus:border-brand outline-none" placeholder="输入问题排查或指令...">
                          <button class="h-8 w-8 bg-brand text-white rounded flex items-center justify-center hover:bg-brand-hover">
                            <svg class="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                          </button>
                        </div>
                      </div>

                      <!-- Visual Map -->
                      <div class="flex-1 bg-white border border-bg-line rounded-container shadow-sm flex flex-col p-4 relative overflow-hidden">
                         <div class="flex items-center justify-between mb-4 flex-shrink-0">
                           <span class="font-semibold text-text-title text-sm">智能链路诊断拓扑</span>
                           <span class="text-xs text-brand bg-brand/10 px-2 py-1 rounded" x-show="chatState === 'result'" x-cloak>AI 诊断完成</span>
                         </div>
                         
                         <!-- Empty State -->
                         <div class="flex-1 flex flex-col items-center justify-center text-text-mute" x-show="chatState === 'init'">
                            <svg class="w-16 h-16 opacity-30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <span class="text-sm">等待指令以生成链路拓扑...</span>
                         </div>
                         
                         <!-- Result State -->
                         <div class="flex-1 flex flex-col justify-center relative" x-show="chatState !== 'init'" x-cloak>
                            <!-- Loading pulse overlay -->
                            <div class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center" x-show="chatState === 'analyzing'">
                               <div class="flex flex-col items-center gap-2 text-brand">
                                  <svg class="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                  <span class="text-xs font-semibold">深度诊断中...</span>
                               </div>
                            </div>
                            
                            <!-- Graph -->
                            <div class="flex items-center justify-between px-6 py-10 bg-bg-light/50 border border-bg-line rounded-lg">
                               <!-- Terminal -->
                               <div class="flex flex-col items-center gap-3 relative">
                                 <div class="absolute -top-8 text-[11px] text-risk bg-risk/10 px-2 py-0.5 rounded border border-risk/20 shadow-sm whitespace-nowrap">组件加载异常</div>
                                 <div class="w-14 h-14 rounded-full bg-risk/10 border-2 border-risk flex items-center justify-center text-risk shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                 </div>
                                 <div class="text-xs font-semibold text-text-title">财务部终端</div>
                                 <div class="text-[10px] text-text-mute">Agent v2.1</div>
                               </div>
                               
                               <!-- Link 1 -->
                               <div class="flex-1 flex flex-col items-center">
                                 <div class="w-full h-0 border-t-2 border-dashed border-risk relative">
                                   <svg class="w-4 h-4 text-risk absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                 </div>
                                 <span class="text-[10px] text-risk mt-1">隧道建立失败</span>
                               </div>
                               
                               <!-- Gateway -->
                               <div class="flex flex-col items-center gap-3 opacity-50">
                                 <div class="w-14 h-14 rounded-full bg-success/10 border border-success flex items-center justify-center text-success">
                                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                                 </div>
                                 <div class="text-xs font-semibold text-text-title">aTrust节点</div>
                                 <div class="text-[10px] text-text-mute">未连接</div>
                               </div>
                               
                               <!-- Link 2 -->
                               <div class="flex-1 flex flex-col items-center opacity-50">
                                 <div class="w-full h-[2px] bg-bg-line relative"></div>
                                 <span class="text-[10px] text-text-mute mt-1">-</span>
                               </div>
                               
                               <!-- App -->
                               <div class="flex flex-col items-center gap-3 opacity-50">
                                 <div class="w-14 h-14 rounded-full bg-success/10 border border-success flex items-center justify-center text-success">
                                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                 </div>
                                 <div class="text-xs font-semibold text-text-title">OA 系统</div>
                                 <div class="text-[10px] text-text-mute">10.1.1.20</div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>

                    <!-- 3. 模拟测试 -->
                    <div x-show="smartOpsTab === '模拟测试'" class="flex flex-col gap-4">
                      <!-- Top Form -->
                      <div class="bg-white border border-bg-line rounded-container shadow-sm p-4">
                        <div class="flex items-end gap-6">
                          <div class="flex-1 flex flex-col gap-2">
                            <span class="text-xs text-text-title font-semibold">发起源 (终端/分支)</span>
                            <select class="h-8 px-3 border border-border rounded outline-none focus:border-brand text-xs bg-white">
                              <option>华南分公司 - 张三 (PC)</option>
                              <option>华北区 - 测试网段 (10.0.x.x)</option>
                            </select>
                          </div>
                          <div class="flex-1 flex flex-col gap-2">
                            <span class="text-xs text-text-title font-semibold">目标应用</span>
                            <select class="h-8 px-3 border border-border rounded outline-none focus:border-brand text-xs bg-white">
                              <option>内部 GitLab (10.2.2.5)</option>
                              <option>财务系统 (oa.corp.com)</option>
                            </select>
                          </div>
                          <div class="w-32 flex flex-col gap-2">
                            <span class="text-xs text-text-title font-semibold">拨测协议</span>
                            <select class="h-8 px-3 border border-border rounded outline-none focus:border-brand text-xs bg-white">
                              <option>ICMP Ping</option>
                              <option>TCP 探测</option>
                              <option>HTTP 测速</option>
                            </select>
                          </div>
                          <button class="h-8 px-6 bg-brand text-white rounded hover:bg-brand-hover text-xs shadow-sm font-medium transition-colors"
                                  @click="diagState = 'running'; setTimeout(() => diagState = 'done', 2000)">开始诊断</button>
                        </div>
                      </div>

                      <!-- Result Vis -->
                      <div class="bg-white border border-bg-line rounded-container shadow-sm p-4 min-h-[300px] flex flex-col relative">
                         <span class="text-sm font-semibold text-text-title mb-4">实时拨测链路</span>
                         
                         <div x-show="diagState === 'idle'" class="flex-1 flex items-center justify-center text-text-mute text-sm">
                           点击上方按钮开始跨网模拟测试
                         </div>
                         
                         <div x-show="diagState === 'running'" class="flex-1 flex flex-col items-center justify-center gap-3">
                           <svg class="w-8 h-8 animate-spin text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.415 31.415" stroke-dashoffset="0"></circle></svg>
                           <span class="text-xs text-text">正在发送探测报文并追踪路由...</span>
                         </div>
                         
                         <div x-show="diagState === 'done'" class="flex-1 flex flex-col gap-6" x-cloak>
                           <div class="flex items-center justify-between px-10 py-8 bg-bg-light/30 border border-bg-line rounded-lg mt-4">
                             <!-- Source -->
                             <div class="flex flex-col items-center gap-2">
                               <div class="w-12 h-12 rounded-full bg-brand/10 border border-brand flex items-center justify-center text-brand bg-white">
                                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                               </div>
                               <span class="text-xs font-medium">发起源</span>
                             </div>
                             
                             <div class="flex-1 h-[2px] bg-brand relative flex items-center justify-center">
                                <span class="absolute -top-5 text-[10px] text-text-mute">15ms</span>
                             </div>
                             
                             <!-- ISP -->
                             <div class="flex flex-col items-center gap-2">
                               <div class="w-12 h-12 rounded-full bg-brand/10 border border-brand flex items-center justify-center text-brand bg-white">
                                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                               </div>
                               <span class="text-xs font-medium">本地ISP出口</span>
                             </div>

                             <div class="flex-1 h-0 border-t-2 border-dashed border-warning relative flex items-center justify-center">
                                <span class="absolute -top-5 text-[10px] text-warning font-bold">420ms (拥塞)</span>
                             </div>

                             <!-- Gateway -->
                             <div class="flex flex-col items-center gap-2">
                               <div class="w-12 h-12 rounded-full bg-brand/10 border border-brand flex items-center justify-center text-brand bg-white">
                                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                               </div>
                               <span class="text-xs font-medium">接入网关</span>
                             </div>

                             <div class="flex-1 h-[2px] bg-brand relative flex items-center justify-center">
                                <span class="absolute -top-5 text-[10px] text-text-mute">3ms</span>
                             </div>

                             <!-- Dest -->
                             <div class="flex flex-col items-center gap-2">
                               <div class="w-12 h-12 rounded-full bg-brand/10 border border-brand flex items-center justify-center text-brand bg-white">
                                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                               </div>
                               <span class="text-xs font-medium">GitLab</span>
                             </div>
                           </div>

                           <!-- AI Conclu -->
                           <div class="bg-warning/10 border border-warning/20 p-4 rounded text-xs text-text leading-relaxed">
                             <span class="font-semibold text-warning">探测结论：</span> 发起源到目标链路整体可达，但在 <span class="font-bold">本地ISP出口 -> 接入网关</span> 这一段存在明显的高延迟和抖动，怀疑为本地专线带宽跑满或公网路由绕弯。<br>
                             <span class="font-semibold text-text-title mt-2 block">修复建议：</span> 建议登录 SD-WAN 控制台查看专线流控策略，或在本系统临时将受影响用户切换至备用接入点。
                           </div>
                         </div>
                      </div>
                    </div>

                 </div>
              </div>
              
              <!-- 其他 Tabs -->
              <div x-show="pageTab !== '智能运维'" class="flex-1 flex flex-col items-center justify-center text-text-mute text-sm" x-cloak>
                <svg class="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <span x-text="pageTab + ' 模块建设中...'"></span>
              </div>
              
              <!-- Drawer for 实时体验监测 Detail -->
              <div x-show="aiDrawerOpen" class="fixed inset-0 z-50 flex justify-end" x-cloak>
                <div class="absolute inset-0 bg-black/45 transition-opacity" @click="aiDrawerOpen = false"></div>
                <div class="w-[800px] bg-white h-full shadow-2xl flex flex-col relative z-10 transform transition-transform"
                     x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0">
                  <div class="h-12 px-4 flex items-center justify-between border-b border-bg-line flex-shrink-0">
                    <span class="text-sm font-semibold text-text">诊断详情及证据链</span>
                    <span class="cursor-pointer text-graphite hover:text-text" @click="aiDrawerOpen = false">✕</span>
                  </div>
                  <div class="flex-1 overflow-y-auto p-6 bg-bg-light">
                     <div class="bg-white p-5 rounded border border-bg-line shadow-sm flex flex-col gap-6">
                       <div class="text-sm font-semibold text-text-title border-b border-bg-line pb-2">问题链路复现</div>
                       <!-- Vis inside drawer -->
                       <div class="flex items-center justify-between px-4 mt-2">
                          <!-- User -->
                          <div class="flex flex-col items-center gap-2 z-10">
                            <div class="w-12 h-12 rounded-full bg-brand/10 text-brand flex justify-center items-center bg-white border border-brand/20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                            <span class="text-xs font-semibold">华东-张三</span>
                          </div>
                          <!-- line -->
                          <div class="flex-1 h-[2px] bg-brand relative flex items-center justify-center"><span class="absolute -top-5 text-[10px] text-text-mute">10ms</span></div>
                          <!-- Gateway -->
                          <div class="flex flex-col items-center gap-2 z-10">
                            <div class="w-12 h-12 rounded-full bg-brand/10 text-brand flex justify-center items-center bg-white border border-brand/20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg></div>
                            <span class="text-xs font-semibold">接入网关</span>
                          </div>
                          <!-- error line -->
                          <div class="flex-1 h-0 border-t-2 border-dashed border-warning relative flex items-center justify-center"><span class="absolute -top-6 text-[10px] text-warning font-bold text-center">450ms<br>丢包 12%</span></div>
                          <!-- App -->
                          <div class="flex flex-col items-center gap-2 z-10">
                            <div class="w-12 h-12 rounded-full bg-brand/10 text-brand flex justify-center items-center bg-white border border-brand/20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></div>
                            <span class="text-xs font-semibold">仓储系统</span>
                          </div>
                       </div>
                       
                       <!-- Logs -->
                       <div class="text-sm font-semibold text-text-title border-b border-bg-line pb-2 mt-4">举证日志 (原始抓包提取)</div>
                       <div class="bg-[#1e1e1e] rounded p-3 text-[11px] font-mono text-success overflow-x-auto leading-relaxed">
[2024-05-20 14:02:11] AI Monitor: Trace initiated for trace_id=89a1b2c<br>
[2024-05-20 14:02:12] Node Gateway-01: ICMP Ping to 10.0.0.5 sent.<br>
<span class="text-risk">[2024-05-20 14:02:14] Node Gateway-01: Reply timeout. Packets dropped (Seq=1,2,3).</span><br>
[2024-05-20 14:02:15] Node Gateway-01: TCP Handshake to 10.0.0.5:80...<br>
<span class="text-warning">[2024-05-20 14:02:16] Node Gateway-01: TCP SYN-ACK received in 450ms (RTT).</span><br>
[2024-05-20 14:02:16] AI Monitor: Core network congestion detected. Confidence: 98%.
                       </div>
                     </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </template>"""

text = text[:start_idx] + new_content + text[end_idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Patch applied successfully.")