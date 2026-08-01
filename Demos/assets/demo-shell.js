/**
 * Demo 运行时外壳与国际化控制助手 (demo-shell.js)
 * 供所有 GA Demo 共享使用：实现 aTrust / SASE 动态底座切换 + 中英文切换
 */

(function (window) {
  // 安全的 localStorage 读写
  function safeGet(key, def) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : def;
    } catch (e) {
      return def;
    }
  }

  function safeSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  }

  // 通用 Demo Shell Mixin 工厂函数
  window.createDemoShellStore = function (extraData = {}) {
    const store = Object.assign({
      // 运行时外壳与语言状态
      shell: safeGet('demoShell', 'atrust'), // 'atrust' | 'sase'
      lang: safeGet('demoLang', 'zh'),       // 'zh' | 'en'

      // 切换方法
      setShell(s) {
        this.shell = s;
        safeSet('demoShell', s);
      },
      setLang(l) {
        this.lang = l;
        safeSet('demoLang', l);
      },

      // 全局词典映射表 (包含整体导航底座及 SDP-config 页面完整词典)
      i18nDict: {
        zh: {
          // 基础与导航
          productNameAtrust: '零信任控制中心',
          productNameSase: '云安全访问服务',
          globalAcceleration: '全球加速服务',
          accelUsageStats: '加速用量统计',
          accelConfig: '加速配置',
          userAdmin: 'Admin',
          btnRefresh: '刷新数据',
          btnNewRule: '新建加速规则',
          btnSave: '保存',
          btnCancel: '取消',
          btnPublish: '确认并发布',
          btnPrev: '上一步',
          btnNext: '下一步',
          btnLearnPrinciple: '学习配置原理',
          learnBubbleTip: '如果您是首次配置，建议先学习配置原理；若您对 GA 加速很熟悉请忽略',

          // 顶部与导航菜单
          navMonitoring: '监控中心',
          navGlobalAccel: '全球安全互联',
          navZtna: '零信任安全接入',
          navSwg: '互联网安全访问',
          navDlp: '数据保护',
          navBusiness: '业务管理',
          navSystem: '系统管理',
          navAudit: '审计中心',

          // 侧边栏菜单分类
          menuOverview: '概览',
          menuDashboard: '首页',
          menuUserStatus: '用户状态',
          menuBranchMonitor: '分支监控',
          menuLogCenter: '日志中心',
          menuZtnaLogs: '零信任访问日志',
          menuDlpLogs: '数据防泄密日志',
          menuSwgLogs: '互联网安全日志',
          menuThreatLogs: '威胁防护日志',
          menuAppLogs: '软件管控日志',
          menuEndpointLogs: '终端管控日志',
          menuAuthLogs: '登录/注销日志',
          menuComplianceLogs: '合规检查日志',
          menuAdminLogs: '管理员操作日志',
          menuSystemLogs: '平台及系统日志',

          // SASE 核心功能
          menuZtnaAccess: '零信任网络访问',
          menuConnectors: '连接器管理',
          menuApps: '应用管理',
          menuSecurityPolicies: '安全策略',
          menuAdvancedConfig: '高级配置',

          menuDlpSection: '数据防泄密',
          menuDataEgress: '数据外发分析',
          menuGenAi: 'GenAI应用保护',
          menuLeakAnalysis: '泄密事件分析',
          menuRiskUsers: '泄密风险用户',
          menuLeakForensics: '泄密追溯中心',
          menuEndpointAudit: '终端泄密审计',
          menuEndpointControl: '终端泄密管控',
          menuAnalysisRules: '泄密分析规则',
          menuSensitiveObjects: '敏感对象定义',

          menuSwgSection: '互联网安全访问',
          menuBehaviorAnalysis: '上网行为分析',
          menuAppControl: '互联网应用管控',
          menuThreatMgmt: '威胁管理',

          menuIdentity: '身份管理',
          menuUserMgmt: '用户管理',
          menuAuthSettings: '认证配置',
          menuAuthPolicies: '认证策略',
          menuEndpointMgmt: '终端管理',
          menuEndpointAssets: '终端资产',
          menuClientSettings: '客户端配置',
          menuClientDeploy: '客户端部署',
          menuObjectMgmt: '对象管理',
          menuIpAddresses: 'IP地址',
          menuSchedules: '时间计划组',

          // 步骤条
          step1Name: '选择要加速的业务',
          step2Name: '选择用户访问区域',
          step3Name: '确认并创建',

          // 步骤 1 表单
          sectionBasicInfo: '基础信息',
          labelAccelSubtype: '加速子类型',
          subtypeTunnelTitle: '隧道应用加速',
          subtypeTunnelDesc: '加速指定业务区域发布的全部隧道应用',
          subtypeWebTitle: 'Web 应用加速',
          subtypeWebDesc: '批量选择需要改善访问体验的 Web 应用',
          subtypeAuthTitle: '客户端接入与认证加速',
          subtypeAuthDesc: '加速客户端接入、控制中心和认证服务',

          sectionSelectBusiness: '选择需要加速的业务',
          subtextSelectBusiness: '请选择代理网关区域，系统会自动关联该区域的代理网关，并加速其发布的全部隧道应用。',
          labelSourceObj: '需要加速的业务对象',
          holderSourceObj: '请选择隧道应用所在的代理网关区域地址',
          labelGeoLocation: '业务所在地理区域 (源站区域/下车点)',
          holderGeoLocation: '请选择',
          labelExclusiveIp: '分配专有加速 IP',
          tipExclusiveIp: '系统将为此网关分配独享的 PoP 出口 IP 资源',
          btnViewExample: '查看示例',

          // 步骤 2 推荐列表
          recommendTitle: '系统已自动匹配推荐最佳加速方案',
          recommendSubtitle: '基于业务所在地理区域及代理网关，智能路由推荐最靠近用户的全球 PoP 上车节点',
          thTargetGateway: '目标代理网关',
          thGatewayIp: '网关 IP 地址',
          thRecommendedPops: '推荐加速区域 (上车点/PoP节点)',
          thBandwidth: '分配通道带宽',
          thSelectPops: '选配上车点',
          btnPreviewLinks: '预览全部链路',

          // 模态弹框与抽屉
          drawerTitle: '全部加速链路',
          drawerSubtitle: '按代理网关展示本次配置的上车点、下车点与带宽。',
          modalExampleTitle: '同步显示位置示例',
          modalExampleDesc: '加速策略保存后，系统将自动分配专有加速 IP。您可以在以下路径查看和编辑对应的加速 IP 信息：',
          examplePath: '系统管理 / 代理网关管理 / [对应网关] / 编辑',

          // 右侧拓扑预览卡片
          previewHeaderTitle: '配置预览',
          legendIngress: '加速区域 (上车点)',
          legendEgress: '源站区域 (下车点)',
          legendOrigin: '源站对象',
          topologyHeading: '全球骨干加速拓扑',

          // 提示 Toast
          toastSuccessTitle: '全球加速策略发布成功',
          toastSuccessDesc: '配置已在后台同步至 SASE 全球骨干加速节点。'
        },

        en: {
          // Basic & Header (Concise & Standard)
          productNameAtrust: 'aTrust Zero Trust Center',
          productNameSase: 'Cloud Security Access Service',
          globalAcceleration: 'Global Accel',
          accelUsageStats: 'Usage Stats',
          accelConfig: 'Accel Config',
          userAdmin: 'Admin',
          btnRefresh: 'Refresh',
          btnNewRule: 'Create Rule',
          btnSave: 'Save',
          btnCancel: 'Cancel',
          btnPublish: 'Confirm & Deploy',
          btnPrev: 'Back',
          btnNext: 'Next',
          btnLearnPrinciple: 'How It Works',
          learnBubbleTip: 'New to GA? We recommend checking how it works first.',

          // Top Navigation (Concise & Standard Industry Abbreviations)
          navMonitoring: 'Monitor',
          navGlobalAccel: 'Global Accel',
          navZtna: 'ZTNA',
          navSwg: 'SWG',
          navDlp: 'DLP',
          navBusiness: 'Apps',
          navSystem: 'System',
          navAudit: 'Audit',

          // Sidebar Category
          menuOverview: 'Overview',
          menuDashboard: 'Dashboard',
          menuUserStatus: 'User Status',
          menuBranchMonitor: 'Branch Monitor',
          menuLogCenter: 'Log Center',
          menuZtnaLogs: 'ZTNA Logs',
          menuDlpLogs: 'DLP Logs',
          menuSwgLogs: 'SWG Logs',
          menuThreatLogs: 'Threat Logs',
          menuAppLogs: 'App Control Logs',
          menuEndpointLogs: 'Endpoint Logs',
          menuAuthLogs: 'Auth Logs',
          menuComplianceLogs: 'Compliance Logs',
          menuAdminLogs: 'Admin Logs',
          menuSystemLogs: 'System Logs',

          // SASE Core Features
          menuZtnaAccess: 'ZTNA',
          menuConnectors: 'Connectors',
          menuApps: 'Applications',
          menuSecurityPolicies: 'Security Policies',
          menuAdvancedConfig: 'Advanced Settings',

          menuDlpSection: 'DLP',
          menuDataEgress: 'Egress Analysis',
          menuGenAi: 'GenAI Protection',
          menuLeakAnalysis: 'Incident Analysis',
          menuRiskUsers: 'Risk Users',
          menuLeakForensics: 'Forensics Center',
          menuEndpointAudit: 'Endpoint Audit',
          menuEndpointControl: 'Endpoint Control',
          menuAnalysisRules: 'Analysis Rules',
          menuSensitiveObjects: 'Sensitive Objects',

          menuSwgSection: 'SWG',
          menuBehaviorAnalysis: 'Web Behavior',
          menuAppControl: 'App Control',
          menuThreatMgmt: 'Threat Management',

          menuIdentity: 'Identity',
          menuUserMgmt: 'User Management',
          menuAuthSettings: 'Auth Settings',
          menuAuthPolicies: 'Auth Policies',
          menuEndpointMgmt: 'Endpoints',
          menuEndpointAssets: 'Endpoint Assets',
          menuClientSettings: 'Client Settings',
          menuClientDeploy: 'Client Deployment',
          menuObjectMgmt: 'Objects',
          menuIpAddresses: 'IP Addresses',
          menuSchedules: 'Schedules',

          // Stepper (Concise & Punchy)
          step1Name: '1. Select Target',
          step2Name: '2. Select Regions',
          step3Name: '3. Confirm',

          // Form & Subtypes (Concise)
          sectionBasicInfo: 'Basic Information',
          labelAccelSubtype: 'Subtype',
          subtypeTunnelTitle: 'Tunnel App Accel',
          subtypeTunnelDesc: 'Accelerate all tunnel apps in business region',
          subtypeWebTitle: 'Web App Accel',
          subtypeWebDesc: 'Select Web apps to optimize access experience',
          subtypeAuthTitle: 'Access & Auth Accel',
          subtypeAuthDesc: 'Accelerate client access and auth services',

          sectionSelectBusiness: 'Select Target Business',
          subtextSelectBusiness: 'Select proxy gateway region to accelerate associated tunnel apps.',
          labelSourceObj: 'Target Business Object (Origin)',
          holderSourceObj: 'Select proxy gateway region address',
          labelGeoLocation: 'Origin Region / Egress PoP',
          holderGeoLocation: 'Please Select',
          labelExclusiveIp: 'Assign Dedicated IP',
          tipExclusiveIp: 'Assign dedicated PoP exit IP for this gateway',
          btnViewExample: 'View Example',

          // Step 2 Table
          recommendTitle: 'Recommended Optimal Acceleration Solution',
          recommendSubtitle: 'Intelligent routing recommends optimal PoP ingress nodes closest to users based on origin region and proxy gateway',
          thTargetGateway: 'Target Proxy Gateway',
          thGatewayIp: 'Gateway IP Address',
          thRecommendedPops: 'Recommended Acceleration Regions (Ingress PoPs)',
          thBandwidth: 'Allocated Channel Bandwidth',
          thSelectPops: 'Configure Ingress PoPs',
          btnPreviewLinks: 'Preview All Links',

          // Modals & Drawers
          drawerTitle: 'All Acceleration Links',
          drawerSubtitle: 'Displays ingress PoPs, egress PoPs, and bandwidth grouped by proxy gateway.',
          modalExampleTitle: 'Display Location Example',
          modalExampleDesc: 'After saving acceleration policy, exclusive acceleration IPs will be automatically assigned. View and edit in path:',
          examplePath: 'System / Proxy Gateway / [Gateway] / Edit',

          // Right Topology Preview
          previewHeaderTitle: 'Configuration Preview',
          legendIngress: 'Ingress Region (Ingress PoP)',
          legendEgress: 'Origin Region (Egress PoP)',
          legendOrigin: 'Origin Target Object',
          topologyHeading: 'Global Backbone Acceleration Topology',

          // Toast
          toastSuccessTitle: 'Global Acceleration Policy Deployed',
          toastSuccessDesc: 'Configuration has been synced to SASE global backbone PoP nodes.'
        }
      },

      // 获取 i18n 文本翻译
      t(key) {
        const dict = this.i18nDict[this.lang] || this.i18nDict.zh;
        return dict[key] || key;
      }
    }, extraData);

    try {
      window.addEventListener('storage', (e) => {
        if (e.key === 'demoShell' && e.newValue && store.shell !== e.newValue) {
          store.shell = e.newValue;
        }
        if (e.key === 'demoLang' && e.newValue && store.lang !== e.newValue) {
          store.lang = e.newValue;
        }
      });
    } catch (e) {}

    return store;
  };
})(window);
