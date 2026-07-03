/* SASE 全球加速 - Alpine.js 共享交互状态与逻辑 */

window.globalAccelerationApp = function() {
  return {
    topNav: '全球安全互联',
    expandedL2: 'm_1_2', 
    expandedL3: '',
    activeLeaf: 'm_1_2_1',
    navDefaults: {
      '监控中心': { l2: 'm_0_0', l3: '', leaf: 'm_0_0_0' },
      '全球安全互联': { l2: 'm_1_2', l3: '', leaf: 'm_1_2_1' },
      '零信任安全接入': { l2: '', l3: '', leaf: 'm_2_0' },
      '互联网安全访问': { l2: '', l3: '', leaf: 'm_3_0' },
      '数据保护': { l2: 'm_4_0', l3: 'm_4_0_0', leaf: 'm_4_0_0_0' },
      '业务管理': { l2: '', l3: '', leaf: 'm_5_0' },
      '系统管理': { l2: 'm_6_0', l3: '', leaf: 'm_6_0_0' },
      '审计中心': { l2: 'm_7_0', l3: '', leaf: 'm_7_0_0' }
    },
    setTopNav(nav) {
      this.topNav = nav;
      const d = this.navDefaults[nav];
      if(d) {
        this.expandedL2 = d.l2; 
        this.expandedL3 = d.l3; 
        this.activeLeaf = d.leaf;
      }
    },
    toggleL2(key, isLeaf = false) {
      if(isLeaf) { 
        this.activeLeaf = key; 
        this.expandedL2 = key; 
        this.expandedL3 = ''; 
      } else { 
        this.expandedL2 = this.expandedL2 === key ? '' : key; 
      }
    },
    toggleL3(key) { 
      this.expandedL3 = this.expandedL3 === key ? '' : key; 
    },
    toggleL4(key) { 
      this.activeLeaf = key; 
      if (key === 'm_1_2_0') {
        const path = window.location.pathname;
        if (!path.endsWith('GA-usage.html')) {
          window.location.href = 'GA-usage.html';
        }
      }
      if (key === 'm_1_2_1') {
        const path = window.location.pathname;
        if (path.endsWith('GA-usage.html')) {
          window.location.href = 'GA-display.html';
        } else if (!path.endsWith('GA-initial.html') && !path.endsWith('/Demos/') && path !== '/') {
          window.location.href = 'GA-initial.html';
        }
      }
    },

    // --- SASE 全球加速专有交互状态 ---
    pageMode: 'initial', // 'initial', 'config', 'deployed'
    selectedScenario: 'atrust', // 'atrust', 'sdwan', 'saas', 'custom'
    configStep: 1, // 1, 2, 3
    activeGateways: ['shanghai', 'singapore'], // 顶部多选下拉框选中的网关，控制下方展示哪些卡片
    selectedGateway: 'shanghai', // 当前选中高亮的单个网关（互斥），控制右侧预览拓扑
    expandedGateway: null, // 折叠展开对应的网关关联应用 'shanghai'|'singapore'|'beijing'|null
    sourceRegion: 'guangzhou', // 智能推荐或选中的源站区域
    authAccelerate: true, // 接入与认证加速开关
    authDropdown: false, // 认证服务列表展开状态
    bandwidthConfig: 15, // 划拨带宽 (Mbps)
    
    // 可选的加速群体及上车点
    accelerationGroups: {
      us: { name: '美国分支机构', pop: '美东(弗吉尼亚) POP', coords: { x: 50, y: 150 } },
      ca: { name: '加拿大分支机构', pop: '美东(多伦多) POP', coords: { x: 70, y: 120 } },
      eu: { name: '欧洲分支机构', pop: '法兰克福 POP', coords: { x: 100, y: 80 } },
      sg: { name: '新加坡分支机构', pop: '新加坡 POP', coords: { x: 190, y: 310 } },
      hk: { name: '香港分支机构', pop: '香港 POP', coords: { x: 310, y: 250 } },
      cn_mobile: { name: '国内移动终端', pop: '广州 POP', coords: { x: 260, y: 230 } }
    },

    // 各网关专属加速群体与带宽配置
    gatewayConfigs: {
      shanghai: {
        selectedGroups: ['us', 'sg'],
        bandwidth: 15
      },
      singapore: {
        selectedGroups: ['eu', 'hk'],
        bandwidth: 10
      },
      beijing: {
        selectedGroups: ['us'],
        bandwidth: 15
      },
      shenzhen: {
        selectedGroups: ['cn_mobile'],
        bandwidth: 20
      },
      hongkong: {
        selectedGroups: ['hk', 'sg'],
        bandwidth: 10
      }
    },

    // 辅助函数：根据加速群体变动，计算默认带宽与推荐上车点
    updateGatewayConfig(gwKey, groupKey) {
      const cfg = this.gatewayConfigs[gwKey];
      if (cfg.selectedGroups.includes(groupKey)) {
        if (cfg.selectedGroups.length > 1) {
          cfg.selectedGroups = cfg.selectedGroups.filter(g => g !== groupKey);
        }
      } else {
        cfg.selectedGroups.push(groupKey);
      }
      // 带宽默认算法：5M * 群体数 + 应用数 * 1M
      cfg.bandwidth = (cfg.selectedGroups.length * 5) + this.gateways[gwKey].appCount;
    },

    // 从网关卡片下拉标签快速移除某个群体
    removeGatewayGroup(gwKey, groupKey) {
      const cfg = this.gatewayConfigs[gwKey];
      if (cfg.selectedGroups.length > 1) {
        cfg.selectedGroups = cfg.selectedGroups.filter(g => g !== groupKey);
        cfg.bandwidth = (cfg.selectedGroups.length * 5) + this.gateways[gwKey].appCount;
      }
    },

    // 获取当前所选代理网关的剩余带宽资源
    getRemainingBandwidth() {
      const allocated = this.activeGateways.reduce((sum, g) => sum + (this.gatewayConfigs[g]?.bandwidth || 0), 0);
      return Math.max(0, 40 - allocated);
    },

    getEgressLocation(gwKey) {
      const source = this.gateways[gwKey]?.source;
      if (source === '广州') return { x: 260, y: 230 };
      if (source === '新加坡') return { x: 190, y: 310 };
      if (source === '北京') return { x: 250, y: 100 };
      if (source === '香港') return { x: 310, y: 250 };
      return null;
    },

    getSvgPath(gwKey, groupKey) {
      const start = this.accelerationGroups[groupKey]?.coords;
      const end = this.getEgressLocation(gwKey);
      if (!start || !end) return '';
      if (start.x === end.x && start.y === end.y) return '';
      
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const mx = (start.x + end.x) / 2;
      const my = (start.y + end.y) / 2;
      
      const curvature = -15; 
      const qx = mx - (dy * curvature) / 100;
      const qy = my + (dx * curvature) / 100;
      
      return `M ${start.x} ${start.y} Q ${qx} ${qy} ${end.x} ${end.y}`;
    },

    deploymentProgress: 0, // 部署进度
    deploymentLogs: [], // 模拟日志列表
    isPublishing: false,
    showPublishToast: false,
    deployedPolicies: (() => {
      try {
        const saved = localStorage.getItem('atrust_deployed_policies');
        if (saved) return JSON.parse(saved);
      } catch(e) {}
      return [
        {
          id: 'POL-382',
          name: '零信任访问加速_上海办公网关',
          type: '零信任访问加速',
          gateway: '上海办公网关',
          source: '广州',
          bandwidth: '15 Mbps',
          status: 'active',
          time: '2026-06-13 16:30'
        }
      ];
    })(),


    // 网关及其关联应用数据
    gateways: {
      shanghai: {
        name: '上海办公网关',
        ip: '203.0.113.24',
        appCount: 12,
        source: '广州',
        popCode: 'POP-GZ-01',
        rtt: '22ms',
        jitter: '0.8ms',
        apps: [
          { name: '企业ERP系统', protocol: 'HTTPS', target: '10.0.1.50:443', level: '高安全' },
          { name: 'OA协同办公', protocol: 'HTTP', target: '10.0.1.55:80', level: '中安全' },
          { name: '企业CRM系统', protocol: 'HTTPS', target: '10.0.2.100:443', level: '高安全' },
          { name: '研发GitLab', protocol: 'SSH/HTTP', target: '10.0.3.10:80', level: '极高安全' },
          { name: 'Jira项目管理', protocol: 'HTTP', target: '10.0.3.12:8080', level: '中安全' },
          { name: 'Confluence知识库', protocol: 'HTTP', target: '10.0.3.15:8090', level: '中安全' },
          { name: 'HR管理系统', protocol: 'HTTPS', target: '10.0.4.20:443', level: '高安全' },
          { name: '内网文件共享', protocol: 'SMB/TCP', target: '10.0.4.40:445', level: '高安全' },
          { name: '企业内部Wiki', protocol: 'HTTP', target: '10.0.5.10:80', level: '低安全' },
          { name: '数据库管理控制台', protocol: 'HTTPS', target: '10.0.5.20:8443', level: '极高安全' },
          { name: 'Jenkins持续集成', protocol: 'HTTP', target: '10.0.3.30:8080', level: '中安全' },
          { name: '内部邮箱服务', protocol: 'IMAP/SMTP', target: '10.0.1.10:143', level: '高安全' }
        ]
      },
      singapore: {
        name: '新加坡业务网关',
        ip: '198.51.100.16',
        appCount: 8,
        source: '新加坡',
        popCode: 'POP-SG-01',
        rtt: '45ms',
        jitter: '1.2ms',
        apps: [
          { name: '海外CRM站点', protocol: 'HTTPS', target: '172.16.1.10:443', level: '高安全' },
          { name: '全球SaaS网关代理', protocol: 'HTTPS', target: '172.16.1.20:443', level: '中安全' },
          { name: '海外文件备份点', protocol: 'SFTP', target: '172.16.2.5:22', level: '高安全' },
          { name: '亚太区报销系统', protocol: 'HTTP', target: '172.16.3.15:80', level: '中安全' },
          { name: '核心服务中心', protocol: 'TCP', target: '172.16.4.8:9000', level: '极高安全' },
          { name: '亚太测试环境', protocol: 'HTTP', target: '172.16.5.12:80', level: '低安全' },
          { name: '新加坡AD域控制器', protocol: 'LDAP/TCP', target: '172.16.1.5:389', level: '极高安全' },
          { name: '视频会议中转站', protocol: 'UDP', target: '172.16.6.30:5060', level: '中安全' }
        ]
      },
      beijing: {
        name: '北京研发网关',
        ip: '192.0.2.10',
        appCount: 6,
        source: '北京',
        popCode: 'POP-BJ-01',
        rtt: '25ms',
        jitter: '0.9ms',
        apps: [
          { name: '北京编译集群', protocol: 'TCP', target: '192.168.10.50:9999', level: '极高安全' },
          { name: '北京研发测试机', protocol: 'SSH', target: '192.168.10.60:22', level: '高安全' },
          { name: '本地Wiki知识库', protocol: 'HTTP', target: '192.168.11.10:80', level: '中安全' },
          { name: '北京代码审查节点', protocol: 'HTTPS', target: '192.168.12.5:443', level: '高安全' },
          { name: '本地HR查询端', protocol: 'HTTP', target: '192.168.1.5:80', level: '低安全' },
          { name: '内网DNS缓存服务', protocol: 'DNS/UDP', target: '192.168.1.1:53', level: '中安全' }
        ]
      },
      shenzhen: {
        name: '深圳研发网关',
        ip: '120.24.8.19',
        appCount: 5,
        source: '广州',
        popCode: 'POP-GZ-01',
        rtt: '3ms',
        jitter: '0.3ms',
        apps: [
          { name: '代码仓库群', protocol: 'HTTPS', target: '10.10.1.10:443', level: '极高安全' },
          { name: '编译流水线', protocol: 'TCP', target: '10.10.2.20:8000', level: '高安全' },
          { name: '深圳本地Wiki', protocol: 'HTTP', target: '10.10.1.5:80', level: '中安全' },
          { name: '开发测试机A', protocol: 'SSH', target: '10.10.3.4:22', level: '高安全' },
          { name: '本地AD集成域', protocol: 'LDAP/TCP', target: '10.10.1.2:389', level: '极高安全' }
        ]
      },
      hongkong: {
        name: '香港业务网关',
        ip: '47.75.12.98',
        appCount: 4,
        source: '香港',
        popCode: 'POP-HK-01',
        rtt: '12ms',
        jitter: '0.5ms',
        apps: [
          { name: '亚太业务后台', protocol: 'HTTPS', target: '192.168.200.5:443', level: '高安全' },
          { name: '海外文件交换站', protocol: 'SFTP', target: '192.168.200.10:22', level: '高安全' },
          { name: '全球通知中间件', protocol: 'TCP', target: '192.168.201.2:9092', level: '中安全' },
          { name: '亚太DB同步节点', protocol: 'MySQL', target: '192.168.200.8:3306', level: '高安全' }
        ]
      }
    },

    // 下拉选择器添加或移除网关卡片
    toggleActiveGateway(key) {
      if (this.activeGateways.includes(key)) {
        if (this.activeGateways.length > 1) {
          this.activeGateways = this.activeGateways.filter(k => k !== key);
          if (this.selectedGateway === key) {
            this.selectedGateway = this.activeGateways[0];
          }
        }
      } else {
        this.activeGateways.push(key);
        this.selectedGateway = key; // 默认将新添加的设为选中预览状态
      }
    },

    // 移除单个网关卡片
    removeActiveGateway(key) {
      if (this.activeGateways.length > 1) {
        this.activeGateways = this.activeGateways.filter(k => k !== key);
        if (this.selectedGateway === key) {
          this.selectedGateway = this.activeGateways[0];
        }
      }
    },

    // 后台发布全球加速策略
    startDeployment() {
      if (this.isPublishing) return;

      this.isPublishing = true;
      this.deploymentProgress = 0;
      this.deploymentLogs = [];

      const gatewayNames = this.activeGateways.map(g => this.gateways[g].name).join('、');
      const totalAppCount = this.activeGateways.reduce((sum, g) => sum + this.gateways[g].appCount, 0);
      const totalBandwidth = this.activeGateways.reduce((sum, g) => sum + this.gatewayConfigs[g].bandwidth, 0);

      setTimeout(() => {
        const newPolicy = {
          id: 'POL-' + String(Math.floor(Math.random() * 900) + 100),
          name: '零信任多网关访问加速',
          type: '零信任访问加速',
          gateway: gatewayNames,
          source: this.activeGateways.map(g => {
            if (g === 'shanghai') return '广州';
            if (g === 'singapore') return '新加坡';
            if (g === 'beijing') return '北京';
            if (g === 'shenzhen') return '广州';
            if (g === 'hongkong') return '香港';
            return '未知';
          }).join('、'),
          bandwidth: totalBandwidth + ' Mbps',
          status: 'active',
          time: new Date().toISOString().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 5)
        };

        this.deployedPolicies.unshift(newPolicy);
        try {
          localStorage.setItem('atrust_deployed_policies', JSON.stringify(this.deployedPolicies));
        } catch(e) {}

        this.deploymentProgress = 100;
        this.isPublishing = false;
        this.showPublishToast = true;
        setTimeout(() => {
          this.showPublishToast = false;
        }, 2500);
      }, 1200);
    },
    
    // 删除已部署策略并持久化
    deletePolicy(id) {
      this.deployedPolicies = this.deployedPolicies.filter(p => p.id !== id);
      try {
        localStorage.setItem('atrust_deployed_policies', JSON.stringify(this.deployedPolicies));
      } catch(e) {}
      if(this.deployedPolicies.length === 0) {
        window.location.href = 'GA-initial.html';
      }
    },

    // 重置到首次使用场景
    resetToInitial() {
      this.pageMode = 'initial';
      this.configStep = 1;
      this.activeGateways = ['shanghai', 'singapore'];
      this.selectedGateway = 'shanghai';
      this.bandwidthConfig = 15;
      this.deploymentProgress = 0;
    }
  }
}
