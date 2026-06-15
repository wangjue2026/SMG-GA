const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;
const {
  Modal,
  Alert,
  Form,
  InputNumber,
  Button,
  Pagination,
  Select,
  Tree,
  Table,
  Drawer,
  Tabs,
  Input,
  Radio,
  Badge,
  Popover,
  Checkbox,
  message: antdMessage,
  Space,
  Tooltip,
  Dropdown,
  Menu,
  Timeline,
  Popconfirm
} = antd;

// Resolve icons
const AntdIcons = icons || AntDesignIcons;
const {
  HomeOutlined,
  FileTextOutlined,
  SafetyOutlined,
  LockOutlined,
  GlobalOutlined,
  DashboardOutlined,
  UserOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  EditOutlined,
  TagsOutlined,
  DownOutlined,
  FilterOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  WindowsOutlined,
  AppleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  MinusCircleFilled,
  CheckOutlined
} = AntdIcons;

// CSS variables mapped colors
const colors = {
  blue: '#1C6EFF',
  blueL50: '#E8F4FF',
  green: '#12A679',
  red: '#CF171D',
  orange: '#FA721B',
  yellow: '#FDAA1D',
  gray: '#6F7785',
  lightGray: '#A1A7B3',
  darkGray: '#2F3540'
};

// Mock terminal database
const ALL_MOCK_TERMINALS = [{
  key: '1',
  name: 'LAPTOP-CN87F4A',
  status: 'online',
  authStatus: 'certified',
  assetType: 'corporate',
  tags: ['研发部', '总部'],
  os: 'Windows',
  version: 'v2.1.0',
  componentStatus: 'normal',
  boundUser: '陈亮',
  lastLogin: '陈亮',
  lastActive: '2026-05-26 19:55:12',
  ip: '10.10.32.45',
  mac: '80:FA:5B:C2:11:08',
  sn: 'SN987241A0',
  org: '研发一部'
}, {
  key: '2',
  name: 'MacBook-Pro-16',
  status: 'online',
  authStatus: 'certified',
  assetType: 'personal-managed',
  tags: ['核心开发', '北京分部'],
  os: 'macOS',
  version: 'v2.1.0',
  componentStatus: 'normal',
  boundUser: '张林',
  lastLogin: '张林',
  lastActive: '2026-05-26 19:42:01',
  ip: '10.10.34.18',
  mac: 'F0:18:98:C8:FA:7D',
  sn: 'SN12A8FA09',
  org: '架构组'
}, {
  key: '3',
  name: 'DESKTOP-R90J012',
  status: 'offline',
  authStatus: 'certified',
  assetType: 'corporate',
  tags: ['财务部'],
  os: 'Windows',
  version: 'v2.0.8',
  componentStatus: 'normal',
  boundUser: '李美华',
  lastLogin: '李美华',
  lastActive: '2026-05-26 15:30:19',
  ip: '10.10.12.8',
  mac: '00:15:5D:12:F4:A6',
  sn: 'SN0898514C',
  org: '财务管理组'
}, {
  key: '4',
  name: 'DESKTOP-OFFLINE',
  status: 'offline',
  authStatus: 'loggedout',
  assetType: 'personal',
  tags: ['测试组', '上海分部'],
  os: 'Windows',
  version: 'v2.0.8',
  componentStatus: 'abnormal',
  boundUser: '王凯',
  lastLogin: '王凯',
  lastActive: '2026-05-25 18:22:56',
  ip: '10.12.4.155',
  mac: 'A4:5E:60:8C:F4:2C',
  sn: 'SN2214901B',
  org: '系统测试组'
}, {
  key: '5',
  name: 'iPad-Pro-Air',
  status: 'online',
  authStatus: 'certified',
  assetType: 'personal-managed',
  tags: ['设计部'],
  os: 'iOS',
  version: 'v2.1.0',
  componentStatus: 'normal',
  boundUser: '周杰',
  lastLogin: '周杰',
  lastActive: '2026-05-26 19:50:44',
  ip: '10.10.22.9',
  mac: '28:CF:E9:F1:C0:EA',
  sn: 'SN889A128D',
  org: '视觉创意室'
}, {
  key: '6',
  name: 'LAPTOP-UNREGISTER',
  status: 'online',
  authStatus: 'never',
  assetType: 'undefined',
  tags: ['临时接入'],
  os: 'Windows',
  version: 'v1.9.9',
  componentStatus: 'normal',
  boundUser: '访客-01',
  lastLogin: 'guest',
  lastActive: '2026-05-26 19:54:33',
  ip: '192.168.10.122',
  mac: 'C8:5B:76:A3:FA:90',
  sn: 'SN00000000',
  org: '未知网络域'
}, {
  key: '7',
  name: 'UBUNTU-SRV-02',
  status: 'online',
  authStatus: 'certified',
  assetType: 'corporate',
  tags: ['运维部', '总部'],
  os: 'Linux',
  version: 'v2.0.5',
  componentStatus: 'normal',
  boundUser: '管理员-赵',
  lastLogin: 'zhaoliang',
  lastActive: '2026-05-26 19:51:02',
  ip: '10.10.5.2',
  mac: '90:B1:1C:8F:A1:02',
  sn: 'SN998812EF',
  org: '系统运维组'
}, {
  key: '8',
  name: 'MAC-MINI-BUILD',
  status: 'unknown',
  authStatus: 'certified',
  assetType: 'corporate',
  tags: ['编译服务器'],
  os: 'macOS',
  version: 'v2.0.8',
  componentStatus: 'normal',
  boundUser: '构建管理员',
  lastLogin: 'builder',
  lastActive: '2026-05-26 12:12:00',
  ip: '10.10.8.44',
  mac: 'AC:87:A3:1C:6F:0D',
  sn: 'SN8712FFCC',
  org: '开发效能中心'
}, {
  key: '9',
  name: 'PHONE-ANDROID-P',
  status: 'offline',
  authStatus: 'loggedout',
  assetType: 'personal',
  tags: ['销售部'],
  os: 'Android',
  version: 'v2.0.2',
  componentStatus: 'abnormal',
  boundUser: '林强',
  lastLogin: '林强',
  lastActive: '2026-05-24 10:20:11',
  ip: '10.20.15.6',
  mac: '40:83:DE:F5:1C:8F',
  sn: 'SN438290BA',
  org: '华南销售一部'
}, {
  key: '10',
  name: 'LAPTOP-UNINSTALLED',
  status: 'uninstalled',
  authStatus: 'loggedout',
  assetType: 'personal',
  tags: ['已退库'],
  os: 'Windows',
  version: '-',
  componentStatus: '-',
  boundUser: '刘倩',
  lastLogin: '刘倩',
  lastActive: '2026-05-20 16:32:41',
  ip: '10.10.40.112',
  mac: '60:03:08:9E:C1:2A',
  sn: 'SN6677AABB',
  org: '人力资源组'
}, {
  key: '11',
  name: 'LAPTOP-TEST01',
  status: 'online',
  authStatus: 'certified',
  assetType: 'corporate',
  tags: ['测试组'],
  os: 'Windows',
  version: 'v2.1.0',
  componentStatus: 'normal',
  boundUser: '钱七',
  lastLogin: '钱七',
  lastActive: '2026-05-26 19:48:22',
  ip: '10.10.35.44',
  mac: '44:FA:5B:C2:33:09',
  sn: 'SN987241A3',
  org: '系统测试组'
}, {
  key: '12',
  name: 'MacBook-Air-13',
  status: 'online',
  authStatus: 'certified',
  assetType: 'personal-managed',
  tags: ['市场部'],
  os: 'macOS',
  version: 'v2.1.0',
  componentStatus: 'normal',
  boundUser: '孙艳',
  lastLogin: '孙艳',
  lastActive: '2026-05-26 19:53:11',
  ip: '10.10.45.67',
  mac: 'B0:18:98:C8:CC:1E',
  sn: 'SN12A8FA10',
  org: '媒介运营组'
}];

// Mock pending approval request list
const MOCK_APPROVAL_REQUESTS = [{
  key: 'app-1',
  name: 'LAPTOP-CN-F829',
  user: '郭栋',
  time: '2026-05-26 14:22:15',
  reason: '研发部门新配置的笔记本，申请接入企业网并获取授信白名单',
  status: 'pending',
  os: 'Windows',
  ip: '10.10.32.78',
  mac: 'D0:5B:D2:C3:4E:5F',
  org: '研发三部'
}, {
  key: 'app-2',
  name: 'MacBook-BYOD-90',
  user: '许静茹',
  time: '2026-05-26 11:05:44',
  reason: '个人申请自携设备（BYOD）纳管，用作移动端 UI 设计评审',
  status: 'pending',
  os: 'macOS',
  ip: '10.10.22.41',
  mac: 'AC:7F:3E:9B:02:1A',
  org: '体验设计中心'
}, {
  key: 'app-3',
  name: 'DESKTOP-FIN-AUD',
  user: '高明',
  time: '2026-05-25 17:30:19',
  reason: '财务审计临时增设桌面端，需完成终端认证并配置授信访问',
  status: 'pending',
  os: 'Windows',
  ip: '10.10.12.55',
  mac: '00:15:5D:8B:2A:C4',
  org: '审计二组'
}];

// SASE Menus Config (z-SASE/nav-sase.md)
const MENU_TREE = [{
  key: 'overview',
  title: '概览',
  icon: /*#__PURE__*/React.createElement(HomeOutlined, null),
  children: [{
    key: 'overview-home',
    title: '首页'
  }, {
    key: 'user-status',
    title: '用户状态'
  }, {
    key: 'branch-monitor',
    title: '分支监控'
  }]
}, {
  key: 'log-center',
  title: '日志中心',
  icon: /*#__PURE__*/React.createElement(FileTextOutlined, null),
  children: [{
    type: 'group',
    title: '核心功能'
  }, {
    key: 'log-ztna',
    title: '零信任访问日志'
  }, {
    key: 'log-dlp',
    title: '数据防泄密日志'
  }, {
    key: 'log-internet',
    title: '互联网安全日志'
  }, {
    key: 'log-threat',
    title: '威胁防护日志'
  }, {
    type: 'group',
    title: '终端管理日志'
  }, {
    key: 'log-software-ctrl',
    title: '软件管控日志'
  }, {
    key: 'log-endpoint-ctrl',
    title: '终端管控日志'
  }, {
    type: 'group',
    title: '用户接入日志'
  }, {
    key: 'log-login',
    title: '登录/注销日志'
  }, {
    key: 'log-compliance',
    title: '合规检查日志'
  }, {
    type: 'group',
    title: '系统日志'
  }, {
    key: 'log-admin-ops',
    title: '管理员操作日志'
  }, {
    key: 'log-platform',
    title: '平台及系统日志'
  }]
}, {
  type: 'divider-group',
  title: '核心功能'
}, {
  key: 'ztna',
  title: '零信任网络访问',
  icon: /*#__PURE__*/React.createElement(SafetyOutlined, null),
  children: [{
    key: 'connector',
    title: '连接器管理'
  }, {
    key: 'application',
    title: '应用管理'
  }, {
    key: 'security-policy',
    title: '安全策略'
  }, {
    key: 'advanced-config',
    title: '高级配置'
  }]
}, {
  key: 'dlp',
  title: '数据防泄密',
  icon: /*#__PURE__*/React.createElement(LockOutlined, null),
  children: [{
    type: 'group',
    title: '概览'
  }, {
    key: 'dlp-overview',
    title: '数据防泄密概览'
  }, {
    type: 'group',
    title: '分析'
  }, {
    key: 'dlp-data-outbound',
    title: '数据外发分析'
  }, {
    key: 'dlp-genai',
    title: 'GenAI应用保护'
  }, {
    key: 'dlp-event',
    title: '泄密事件分析'
  }, {
    key: 'dlp-risk-user',
    title: '泄密风险用户'
  }, {
    key: 'dlp-trace',
    title: '泄密追溯中心'
  }, {
    type: 'group',
    title: '策略'
  }, {
    key: 'dlp-terminal-audit',
    title: '终端泄密审计'
  }, {
    key: 'dlp-terminal-ctrl',
    title: '终端泄密管控'
  }, {
    key: 'dlp-rule',
    title: '泄密分析规则'
  }, {
    key: 'dlp-sensitive-obj',
    title: '敏感对象定义'
  }, {
    key: 'dlp-advanced',
    title: '高级配置'
  }]
}, {
  key: 'internet-security',
  title: '互联网安全访问',
  icon: /*#__PURE__*/React.createElement(GlobalOutlined, null),
  children: [{
    type: 'group',
    title: '概览'
  }, {
    key: 'inet-overview',
    title: '互联网安全访问概览'
  }, {
    type: 'group',
    title: '分析'
  }, {
    key: 'inet-behavior',
    title: '上网行为分析'
  }, {
    key: 'inet-team-stability',
    title: '团队稳定性管理'
  }, {
    key: 'inet-keyword',
    title: '关键字分析'
  }, {
    key: 'inet-control-analysis',
    title: '上网管控分析'
  }, {
    key: 'inet-cloud-threat',
    title: '云威胁情报分析'
  }, {
    key: 'inet-risk-terminal',
    title: '风险终端分析'
  }, {
    type: 'group',
    title: '策略'
  }, {
    key: 'inet-app-control',
    title: '互联网应用管控'
  }, {
    key: 'inet-app-audit',
    title: '互联网应用审计'
  }, {
    key: 'inet-compliance',
    title: '上网合规检查'
  }, {
    key: 'inet-threat-mgmt',
    title: '威胁管理'
  }]
}, {
  key: 'global-acceleration',
  title: '全球加速服务',
  icon: /*#__PURE__*/React.createElement(DashboardOutlined, null),
  children: [{
    type: 'group',
    title: '分析'
  }, {
    key: 'accel-analysis',
    title: '全球加速分析'
  }, {
    type: 'group',
    title: '配置'
  }, {
    key: 'accel-node',
    title: '加速节点'
  }, {
    key: 'accel-channel',
    title: '加速通道'
  }]
}, {
  type: 'divider-group',
  title: '平台管理'
}, {
  key: 'identity',
  title: '身份管理',
  icon: /*#__PURE__*/React.createElement(UserOutlined, null),
  children: [{
    key: 'user-mgmt',
    title: '用户管理'
  }, {
    key: 'auth-config',
    title: '认证配置'
  }, {
    key: 'auth-policy',
    title: '认证策略'
  }]
}, {
  key: 'endpoint',
  title: '终端管理',
  icon: /*#__PURE__*/React.createElement(DesktopOutlined, null),
  children: [{
    key: 'endpoint-asset',
    title: '终端资产'
  }, {
    key: 'software-mgmt',
    title: '软件管理'
  }, {
    key: 'endpoint-antivirus',
    title: '终端防病毒'
  }, {
    key: 'endpoint-control',
    title: '终端管控'
  }, {
    key: 'client-config',
    title: '客户端配置'
  }, {
    key: 'client-deploy',
    title: '客户端部署'
  }]
}, {
  key: 'object',
  title: '对象管理',
  icon: /*#__PURE__*/React.createElement(AppstoreOutlined, null),
  children: [{
    key: 'ip-address',
    title: 'IP地址'
  }, {
    key: 'schedule-group',
    title: '时间计划组'
  }, {
    key: 'app-recognition',
    title: '应用识别库'
  }, {
    key: 'url-category',
    title: 'URL分类库'
  }, {
    key: 'process-lib',
    title: '进程库'
  }, {
    key: 'file-type-group',
    title: '文件类型组'
  }, {
    key: 'endpoint-app-lib',
    title: '终端应用库'
  }]
}, {
  key: 'system',
  title: '系统管理',
  icon: /*#__PURE__*/React.createElement(SettingOutlined, null)
}];

// =========================================================================
// StatsDetailDrawer Component
// =========================================================================
const StatsDetailDrawer = ({
  open,
  filterKey,
  filterVal,
  onClose,
  onSelectTerminal
}) => {
  const filteredData = useMemo(() => {
    if (!filterKey || !filterVal) return [];
    return ALL_MOCK_TERMINALS.filter(t => t[filterKey] === filterVal);
  }, [filterKey, filterVal]);
  const columns = [{
    title: '终端名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => /*#__PURE__*/React.createElement("span", {
      className: "clickable-cell",
      onClick: () => {
        onSelectTerminal(record);
        onClose();
      }
    }, text)
  }, {
    title: '在线状态',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      const statusMap = {
        online: {
          color: colors.green,
          text: '在线'
        },
        offline: {
          color: colors.gray,
          text: '离线'
        },
        uninstalled: {
          color: colors.red,
          text: '已卸载'
        },
        unknown: {
          color: colors.yellow,
          text: '未知'
        }
      };
      const config = statusMap[text] || statusMap.unknown;
      return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "status-indicator-dot",
        style: {
          backgroundColor: config.color
        }
      }), config.text);
    }
  }, {
    title: '绑定用户',
    dataIndex: 'boundUser',
    key: 'boundUser'
  }, {
    title: '操作系统',
    dataIndex: 'os',
    key: 'os'
  }];
  return /*#__PURE__*/React.createElement(Drawer, {
    title: `过滤展示: ${filterVal} 类型的终端`,
    open: open,
    onClose: onClose,
    width: 480,
    rootClassName: "sd-drawer",
    destroyOnClose: true
  }, /*#__PURE__*/React.createElement(Table, {
    dataSource: filteredData,
    columns: columns,
    pagination: {
      size: 'small',
      pageSize: 8,
      showTotal: t => `共 ${t} 项`
    },
    rowKey: "key",
    size: "small"
  }));
};

// =========================================================================
// TerminalDetailDrawer Component
// =========================================================================
const TerminalDetailDrawer = ({
  open,
  terminal,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('1');
  if (!terminal) return null;

  // Status indicator mapping
  const statusMap = {
    online: {
      color: colors.green,
      text: '在线'
    },
    offline: {
      color: colors.gray,
      text: '离线'
    },
    uninstalled: {
      color: colors.red,
      text: '已卸载'
    },
    unknown: {
      color: colors.yellow,
      text: '未知'
    }
  };
  const statusConfig = statusMap[terminal.status] || statusMap.unknown;
  return /*#__PURE__*/React.createElement(Drawer, {
    title: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(DesktopOutlined, {
      style: {
        fontSize: 16,
        color: colors.blue
      }
    }), /*#__PURE__*/React.createElement("span", null, "\u7EC8\u7AEF\u8BE6\u60C5: ", terminal.name)),
    open: open,
    onClose: onClose,
    width: 520,
    rootClassName: "sd-drawer",
    destroyOnClose: true,
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      onClick: () => antdMessage.success('配置下发命令已发送')
    }, "\u4E0B\u53D1\u914D\u7F6E"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => antdMessage.info('正在获取最新终端诊断包...')
    }, "\u8FDC\u7A0B\u8BCA\u65AD"), /*#__PURE__*/React.createElement(Button, {
      onClick: onClose,
      style: {
        marginLeft: 'auto'
      }
    }, "\u5173\u95ED"))
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeKey: activeTab,
    onChange: setActiveTab,
    size: "small"
  }, /*#__PURE__*/React.createElement(Tabs.TabPane, {
    tab: "\u57FA\u672C\u4FE1\u606F",
    key: "1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, /*#__PURE__*/React.createElement(InfoCircleOutlined, null), " \u57FA\u672C\u5C5E\u6027"), /*#__PURE__*/React.createElement("div", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u7EC8\u7AEF\u540D\u79F0"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.name)), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u5728\u7EBF\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val",
    style: {
      color: statusConfig.color
    }
  }, "\u25CF ", statusConfig.text)), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "IP \u5730\u5740"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val detail-val--copyable"
  }, terminal.ip, " ", /*#__PURE__*/React.createElement(CopyOutlined, {
    style: {
      cursor: 'pointer',
      color: colors.gray
    },
    onClick: () => {
      navigator.clipboard.writeText(terminal.ip);
      antdMessage.success('IP 已复制');
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "MAC \u5730\u5740"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.mac)), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u5E8F\u5217\u53F7 (SN)"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.sn)), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u64CD\u4F5C\u7CFB\u7EDF"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.os))), /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, /*#__PURE__*/React.createElement(SettingOutlined, null), " \u5BA2\u6237\u7AEF\u7EC4\u4EF6\u4E0E\u7248\u672C"), /*#__PURE__*/React.createElement("div", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u5BA2\u6237\u7AEF\u7248\u672C"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.version)), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u7EC4\u4EF6\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val",
    style: {
      color: terminal.componentStatus === 'normal' ? colors.green : colors.red
    }
  }, terminal.componentStatus === 'normal' ? '正常' : '异常告警')), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u5F52\u5C5E\u90E8\u95E8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.org)), /*#__PURE__*/React.createElement("div", {
    className: "detail-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u7ED1\u5B9A\u7528\u6237"), /*#__PURE__*/React.createElement("span", {
    className: "detail-val"
  }, terminal.boundUser)))), /*#__PURE__*/React.createElement(Tabs.TabPane, {
    tab: "\u6700\u8FD1\u767B\u5F55\u8BB0\u5F55",
    key: "2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-timeline",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-node"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot timeline-dot--success"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "timeline-time"
  }, "2026-05-26 19:55:12"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, "\u7EC8\u7AEF\u4E0A\u7EBF (\u767B\u5F55\u6210\u529F)"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, "\u767B\u5F55\u7528\u6237: ", terminal.boundUser, " | \u8BA4\u8BC1\u673A\u5236: \u96F6\u4FE1\u4EFB\u5F3A\u8BA4\u8BC1 | \u8282\u70B9: \u4E0A\u6D77\u603B\u51FA\u53E3"))), /*#__PURE__*/React.createElement("div", {
    className: "timeline-node"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "timeline-time"
  }, "2026-05-26 19:40:02"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, "\u5408\u89C4\u5BA1\u8BA1\u626B\u63CF"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, "\u5B89\u5168\u626B\u63CF\u901A\u8FC7\u3002\u6740\u6BD2\u5F15\u64CE\u6B63\u5E38\u542F\u52A8\uFF0C\u672A\u53D1\u73B0\u5A01\u80C1\u6587\u4EF6\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "timeline-node"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot timeline-dot--warning"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "timeline-time"
  }, "2026-05-26 13:12:00"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, "\u6388\u6743\u53D8\u66F4"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, "\u7BA1\u7406\u5458\u66F4\u65B0\u4E86\u6388\u4FE1\u72B6\u6001\u3002\u5F53\u524D\u72B6\u6001: \u6B63\u5E38\u6388\u4FE1\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "timeline-node"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot timeline-dot--error"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "timeline-time"
  }, "2026-05-25 18:02:44"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, "\u767B\u5F55\u5F02\u5E38\u62E6\u622A"), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, "\u68C0\u6D4B\u5230\u975E\u5E38\u89C4 IP \u767B\u5F55\u5C1D\u8BD5\u3002\u62E6\u622A\u6210\u529F\uFF0C\u5DF2\u53D1\u9001\u4E8C\u6B21\u9A8C\u8BC1\u8981\u6C42\u3002"))))), /*#__PURE__*/React.createElement(Tabs.TabPane, {
    tab: "\u5B89\u5168\u7B56\u7565\u5408\u89C4",
    key: "3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(Table, {
    dataSource: [{
      key: 'c1',
      item: '防病毒引擎运行状态',
      status: 'pass',
      detail: '已启用 (火绒安全终端版)'
    }, {
      key: 'c2',
      item: '操作系统补丁合规性',
      status: 'pass',
      detail: '已更新至 2026-05 补丁包'
    }, {
      key: 'c3',
      item: '磁盘强加密状态',
      status: 'warning',
      detail: 'BitLocker 未对 D 盘开启加密'
    }, {
      key: 'c4',
      item: 'USB 数据防泄密策略',
      status: 'pass',
      detail: '已启用只读审计策略'
    }, {
      key: 'c5',
      item: '本地凭证防火墙',
      status: 'pass',
      detail: '已启用防爆破与凭证锁'
    }],
    columns: [{
      title: '合规性检查项',
      dataIndex: 'item',
      key: 'item',
      fontStyle: 'bold'
    }, {
      title: '结果',
      dataIndex: 'status',
      key: 'status',
      render: val => val === 'pass' ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: colors.green
        }
      }, /*#__PURE__*/React.createElement(CheckCircleFilled, null), " \u901A\u8FC7") : /*#__PURE__*/React.createElement("span", {
        style: {
          color: colors.orange
        }
      }, /*#__PURE__*/React.createElement(ExclamationCircleFilled, null), " \u5F85\u4F18\u5316")
    }, {
      title: '细节',
      dataIndex: 'detail',
      key: 'detail'
    }],
    pagination: false,
    size: "small"
  })))));
};

// =========================================================================
// App Component (Root View)
// =========================================================================
const App = () => {
  // Sidebar fold state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Navigation states
  const [openKeys, setOpenKeys] = useState(['endpoint']); // default open 终端管理
  const [selectedKey, setSelectedKey] = useState('endpoint-asset'); // default selected 终端资产

  // Active tab (终端资产 page right side)
  const [activePageTab, setActivePageTab] = useState('list'); // 'list' or 'approval'

  // Advanced search filter state toggle
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  // Simple Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced filter inputs
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [filterAuth, setFilterAuth] = useState(undefined);
  const [filterType, setFilterType] = useState(undefined);
  const [filterOS, setFilterOS] = useState(undefined);

  // Selected row keys in table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Drawer states
  const [statsDrawerOpen, setStatsDrawerOpen] = useState(false);
  const [statsFilterKey, setStatsFilterKey] = useState('');
  const [statsFilterVal, setStatsFilterVal] = useState('');
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState(null);

  // Modal states for approval tab
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [currentApproveRecord, setCurrentApproveRecord] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // SASE Live interactive stats dataset
  const [terminalsList, setTerminalsList] = useState(ALL_MOCK_TERMINALS);
  const [approvalRequests, setApprovalRequests] = useState(MOCK_APPROVAL_REQUESTS);

  // 5 overview statistics counts calculation
  const stats = useMemo(() => {
    const total = terminalsList.length;

    // Status counts
    const online = terminalsList.filter(t => t.status === 'online').length;
    const offline = terminalsList.filter(t => t.status === 'offline').length;
    const uninstalled = terminalsList.filter(t => t.status === 'uninstalled').length;
    const unknown = terminalsList.filter(t => t.status === 'unknown').length;

    // Auth counts
    const certified = terminalsList.filter(t => t.authStatus === 'certified').length;
    const loggedout = terminalsList.filter(t => t.authStatus === 'loggedout').length;
    const never = terminalsList.filter(t => t.authStatus === 'never').length;

    // Type counts
    const corp = terminalsList.filter(t => t.assetType === 'corporate').length;
    const personal = terminalsList.filter(t => t.assetType === 'personal').length;
    const managed = terminalsList.filter(t => t.assetType === 'personal-managed').length;
    const undef = terminalsList.filter(t => t.assetType === 'undefined').length;

    // Trust counts (Mocking: all certified terminals except uninstalled are trusted)
    const trusted = terminalsList.filter(t => t.authStatus === 'certified' && t.status !== 'uninstalled').length;
    const untrusted = total - trusted;
    return {
      total,
      online,
      offline,
      uninstalled,
      unknown,
      certified,
      loggedout,
      never,
      corp,
      personal,
      managed,
      undef,
      trusted,
      untrusted
    };
  }, [terminalsList]);

  // Filtered terminals list for Table display
  const filteredTerminals = useMemo(() => {
    return terminalsList.filter(t => {
      // 1. Simple search query matching
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = t.name.toLowerCase().includes(query);
        const matchUser = t.boundUser.toLowerCase().includes(query);
        const matchIp = t.ip.toLowerCase().includes(query);
        if (!matchName && !matchUser && !matchIp) return false;
      }
      // 2. Advanced filters matching
      if (filterStatus && t.status !== filterStatus) return false;
      if (filterAuth && t.authStatus !== filterAuth) return false;
      if (filterType && t.assetType !== filterType) return false;
      if (filterOS && t.os !== filterOS) return false;
      return true;
    });
  }, [terminalsList, searchQuery, filterStatus, filterAuth, filterType, filterOS]);

  // Sidebar menu render handler
  const toggleSubmenu = key => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter(k => k !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };
  const handleMenuClick = (item, parentKey = null) => {
    if (parentKey) {
      setSelectedKey(item.key);
      setOpenKeys([parentKey]); // Mutually exclusive menu rule
      if (item.key === 'endpoint-asset') {
        // Keep page active
      } else {
        antdMessage.info(`页面 [${item.title}] 正在开发构建中，目前仅支持演示“终端资产”页面。`);
      }
    } else {
      // Leaf L1 menu
      setSelectedKey(item.key);
      setOpenKeys([]);
      antdMessage.info(`页面 [${item.title}] 正在开发构建中，目前仅支持演示“终端资产”页面。`);
    }
  };

  // L2 menu item click — mutually exclusive parent expansion
  const handleL2Click = (parentKey, item) => {
    setSelectedKey(item.key);
    setOpenKeys([parentKey]);
    if (item.key !== 'endpoint-asset') {
      antdMessage.info(`页面 [${item.title}] 正在开发构建中，目前仅支持演示"终端资产"页面。`);
    }
  };

  // Reset advanced filter fields
  const handleResetFilters = () => {
    setFilterStatus(undefined);
    setFilterAuth(undefined);
    setFilterType(undefined);
    setFilterOS(undefined);
    setSearchQuery('');
    antdMessage.success('筛选过滤条件已清空');
  };

  // Trigger drawer with matched stats list
  const handleStatsCardClick = (filterKey, filterVal) => {
    setStatsFilterKey(filterKey);
    setStatsFilterVal(filterVal);
    setStatsDrawerOpen(true);
  };

  // View terminal detail drawer helper
  const handleShowTerminalDetail = record => {
    setSelectedTerminal(record);
    setDetailDrawerOpen(true);
  };

  // Approval handlers
  const handleApproveRequest = record => {
    // Approve confirmation
    Modal.confirm({
      title: '批准授信确认',
      icon: /*#__PURE__*/React.createElement(ExclamationCircleFilled, {
        style: {
          color: colors.green
        }
      }),
      content: `是否确定为终端 [${record.name}] (申请用户: ${record.user}) 授权并批准授信？`,
      okText: '批准授信',
      cancelText: '取消',
      okButtonProps: {
        style: {
          backgroundColor: colors.green,
          borderColor: colors.green
        }
      },
      onOk() {
        // Remove from approvalRequests
        setApprovalRequests(prev => prev.filter(r => r.key !== record.key));

        // Add a new record to terminalsList
        const newTerminal = {
          key: String(terminalsList.length + 1),
          name: record.name,
          status: 'online',
          authStatus: 'certified',
          assetType: 'corporate',
          tags: ['授权白名单'],
          os: record.os,
          version: 'v2.1.0',
          componentStatus: 'normal',
          boundUser: record.user,
          lastLogin: record.user,
          lastActive: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          ip: record.ip,
          mac: record.mac,
          sn: 'SN' + Math.floor(Math.random() * 90000000 + 10000000),
          org: record.org
        };
        setTerminalsList([newTerminal, ...terminalsList]);
        antdMessage.success(`终端 [${record.name}] 已成功批准授信，并注册录入企业资产列表。`);
      }
    });
  };
  const handleRejectRequestPrompt = record => {
    setCurrentApproveRecord(record);
    setRejectReason('');
    setRejectModalOpen(true);
  };
  const submitRejectRequest = () => {
    if (!rejectReason.trim()) {
      antdMessage.warning('请填写驳回原因说明');
      return;
    }
    // Reject processing
    setApprovalRequests(prev => prev.filter(r => r.key !== currentApproveRecord.key));
    setRejectModalOpen(false);
    antdMessage.error(`已驳回终端 [${currentApproveRecord.name}] 的授信申请。驳回原因: ${rejectReason}`);
  };

  // Table row check keys change
  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Table columns definition (SeerDesign 2.0 standards)
  const listColumns = [{
    title: '终端名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => /*#__PURE__*/React.createElement("span", {
      className: "clickable-cell",
      onClick: () => handleShowTerminalDetail(record)
    }, text)
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: val => {
      const mapper = {
        online: {
          color: colors.green,
          text: '在线'
        },
        offline: {
          color: colors.gray,
          text: '离线'
        },
        uninstalled: {
          color: colors.red,
          text: '已卸载'
        },
        unknown: {
          color: colors.yellow,
          text: '未知'
        }
      };
      const config = mapper[val] || mapper.unknown;
      return /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "status-indicator-dot",
        style: {
          backgroundColor: config.color
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12
        }
      }, config.text));
    }
  }, {
    title: '认证状态',
    dataIndex: 'authStatus',
    key: 'authStatus',
    render: val => {
      const mapper = {
        certified: {
          text: '已认证',
          color: 'blue'
        },
        loggedout: {
          text: '已注销',
          color: 'default'
        },
        never: {
          text: '从未认证',
          color: 'warning'
        }
      };
      const config = mapper[val] || {
        text: val,
        color: 'default'
      };
      return /*#__PURE__*/React.createElement(Badge, {
        status: config.color === 'blue' ? 'processing' : 'default',
        text: config.text
      });
    }
  }, {
    title: '资产类型',
    dataIndex: 'assetType',
    key: 'assetType',
    render: val => {
      const mapper = {
        corporate: '企业终端',
        personal: '个人终端',
        'personal-managed': '企业纳管个人终端',
        undefined: '未定义'
      };
      return mapper[val] || val;
    }
  }, {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: tags => /*#__PURE__*/React.createElement(Space, {
      size: [4, 4],
      wrap: true
    }, tags.map(tag => /*#__PURE__*/React.createElement("span", {
      key: tag,
      className: "ant-tag sd-tag",
      style: {
        border: 'none',
        background: 'var(--color-blue-l50)',
        color: 'var(--color-blue)',
        fontSize: 11,
        padding: '0 6px',
        height: 18,
        lineHeight: '18px',
        borderRadius: 2
      }
    }, tag)))
  }, {
    title: '操作系统',
    dataIndex: 'os',
    key: 'os',
    render: os => {
      let icon = /*#__PURE__*/React.createElement(DesktopOutlined, {
        style: {
          marginRight: 6,
          color: colors.gray
        }
      });
      if (os === 'Windows') icon = /*#__PURE__*/React.createElement(WindowsOutlined, {
        style: {
          marginRight: 6,
          color: '#0078d7'
        }
      });
      if (os === 'macOS' || os === 'iOS') icon = /*#__PURE__*/React.createElement(AppleOutlined, {
        style: {
          marginRight: 6,
          color: '#000000'
        }
      });
      return /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center'
        }
      }, icon, " ", os);
    }
  }, {
    title: '客户端版本',
    dataIndex: 'version',
    key: 'version'
  }, {
    title: '组件状态',
    dataIndex: 'componentStatus',
    key: 'componentStatus',
    render: val => val === 'normal' ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: colors.green
      }
    }, /*#__PURE__*/React.createElement(CheckCircleFilled, {
      style: {
        fontSize: 13,
        verticalAlign: 'middle',
        marginRight: 4
      }
    }), "\u6B63\u5E38") : val === 'abnormal' ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: colors.red
      }
    }, /*#__PURE__*/React.createElement(CloseCircleFilled, {
      style: {
        fontSize: 13,
        verticalAlign: 'middle',
        marginRight: 4
      }
    }), "\u5F02\u5E38") : /*#__PURE__*/React.createElement("span", null, "-")
  }, {
    title: '绑定用户',
    dataIndex: 'boundUser',
    key: 'boundUser'
  }, {
    title: '最后登录用户',
    dataIndex: 'lastLogin',
    key: 'lastLogin'
  }, {
    title: '终端最后活跃时间',
    dataIndex: 'lastActive',
    key: 'lastActive',
    sorter: (a, b) => dayjs(a.lastActive).unix() - dayjs(b.lastActive).unix()
  }, {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 80,
    render: (_, record) => /*#__PURE__*/React.createElement("span", {
      className: "action-link",
      onClick: () => handleShowTerminalDetail(record)
    }, "\u8BE6\u60C5")
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `sase-sidebar ${sidebarCollapsed ? 'sase-sidebar--collapsed' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo"
  }, "\u4E91"), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "\u4E91\u5B89\u5168\u8BBF\u95EE\u670D\u52A1")), /*#__PURE__*/React.createElement("button", {
    className: "toggle-fold-btn",
    onClick: () => setSidebarCollapsed(!sidebarCollapsed)
  }, sidebarCollapsed ? /*#__PURE__*/React.createElement(MenuUnfoldOutlined, null) : /*#__PURE__*/React.createElement(MenuFoldOutlined, null))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-menu-container"
  }, MENU_TREE.map((node, index) => {
    // Divider group titles
    if (node.type === 'divider-group') {
      return /*#__PURE__*/React.createElement("div", {
        key: `div-${index}`,
        className: "menu-group-title"
      }, node.title);
    }

    // Regular menus
    const isOpen = openKeys.includes(node.key);
    const hasChildren = !!node.children;

    // Check if any of children selected (Parent Active Highlight rule)
    const isChildSelected = hasChildren && node.children.some(c => c.key === selectedKey);
    let l1Class = 'menu-item-l1';
    if (isChildSelected) l1Class += ' menu-item-l1--active-parent';
    if (selectedKey === node.key) l1Class += ' menu-item-l1--selected';
    return /*#__PURE__*/React.createElement("div", {
      key: node.key
    }, /*#__PURE__*/React.createElement("div", {
      className: l1Class,
      onClick: () => {
        if (hasChildren) {
          toggleSubmenu(node.key);
        } else {
          handleMenuClick(node);
        }
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "menu-item-icon-l1"
    }, node.icon), /*#__PURE__*/React.createElement("span", {
      className: "menu-item-text-l1"
    }, node.title), hasChildren && /*#__PURE__*/React.createElement(DownOutlined, {
      className: `menu-item-arrow ${isOpen ? 'menu-item-arrow--open' : ''}`
    })), hasChildren && /*#__PURE__*/React.createElement("div", {
      className: `submenu-container ${isOpen ? 'submenu-container--open' : 'submenu-container--closed'} ${isChildSelected ? 'submenu-container--open-parent' : ''}`
    }, node.children.map((sub, sIdx) => {
      if (sub.type === 'group') {
        return /*#__PURE__*/React.createElement("div", {
          key: `g-${sIdx}`,
          className: "menu-item-l2-group-title"
        }, sub.title);
      }
      const isSelected = selectedKey === sub.key;
      let l2Class = 'menu-item-l2';
      if (isSelected) l2Class += ' menu-item-l2--selected';
      return /*#__PURE__*/React.createElement("div", {
        key: sub.key,
        className: l2Class,
        onClick: () => handleL2Click(node.key, sub)
      }, /*#__PURE__*/React.createElement("span", {
        className: "menu-item-dot-l2"
      }), /*#__PURE__*/React.createElement("span", {
        className: "menu-item-text-l2"
      }, sub.title));
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, "A"), /*#__PURE__*/React.createElement("span", {
    className: "user-name"
  }, "Admin"))), /*#__PURE__*/React.createElement("div", {
    className: "sase-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sase-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "page-title"
  }, "\u7EC8\u7AEF\u8D44\u4EA7"), /*#__PURE__*/React.createElement("div", {
    className: "header-tabs"
  }, /*#__PURE__*/React.createElement("div", {
    className: `header-tab-item ${activePageTab === 'list' ? 'header-tab-item--active' : ''}`,
    onClick: () => setActivePageTab('list')
  }, "\u7EC8\u7AEF\u5217\u8868"), /*#__PURE__*/React.createElement("div", {
    className: `header-tab-item ${activePageTab === 'approval' ? 'header-tab-item--active' : ''}`,
    onClick: () => setActivePageTab('approval')
  }, /*#__PURE__*/React.createElement(Badge, {
    count: approvalRequests.length,
    offset: [10, -2],
    size: "small",
    color: colors.orange
  }, "\u6388\u4FE1\u7EC8\u7AEF\u5BA1\u6279")))), /*#__PURE__*/React.createElement("div", {
    className: "sase-content-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sase-card"
  }, activePageTab === 'list' ?
  /*#__PURE__*/
  // Tab 1: Terminal List view
  React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "overview-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card",
    style: {
      cursor: 'default'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card-title"
  }, "\u4F01\u4E1A\u4E00\u5171\u591A\u5C11\u4E2A\u7EC8\u7AEF"), /*#__PURE__*/React.createElement("span", {
    className: "stat-card-main-val",
    style: {
      color: colors.blue
    }
  }, stats.total, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 400,
      color: colors.gray
    }
  }, "\u53F0")), /*#__PURE__*/React.createElement("span", {
    className: "stat-card-desc"
  }, "\u5F53\u524D\u5DF2\u7EB3\u7BA1\u5E76\u63A5\u5165\u7684\u5168\u90E8\u8D44\u4EA7")), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card-title"
  }, "\u5F53\u524D\u7EC8\u7AEF\u72B6\u6001 (\u5BA2\u6237\u7AEF\u63A2\u6D4B)"), /*#__PURE__*/React.createElement("div", {
    className: "segmented-progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.online / stats.total * 100}%`,
      backgroundColor: colors.green
    },
    onClick: () => handleStatsCardClick('status', 'online'),
    title: "\u5728\u7EBF"
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.offline / stats.total * 100}%`,
      backgroundColor: colors.gray
    },
    onClick: () => handleStatsCardClick('status', 'offline'),
    title: "\u79BB\u7EBF"
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.uninstalled / stats.total * 100}%`,
      backgroundColor: colors.red
    },
    onClick: () => handleStatsCardClick('status', 'uninstalled'),
    title: "\u5DF2\u5378\u8F7D"
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.unknown / stats.total * 100}%`,
      backgroundColor: colors.yellow
    },
    onClick: () => handleStatsCardClick('status', 'unknown'),
    title: "\u672A\u77E5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "legend-pills-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--online",
    onClick: () => handleStatsCardClick('status', 'online')
  }, stats.online, " \u5728\u7EBF"), /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--offline",
    onClick: () => handleStatsCardClick('status', 'offline')
  }, stats.offline, " \u79BB\u7EBF"), /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--uninstalled",
    onClick: () => handleStatsCardClick('status', 'uninstalled')
  }, stats.uninstalled, " \u5378\u8F7D"), /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--unknown",
    onClick: () => handleStatsCardClick('status', 'unknown')
  }, stats.unknown, " \u672A\u77E5"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card-title"
  }, "\u7EC8\u7AEF\u8BA4\u8BC1\u60C5\u51B5"), /*#__PURE__*/React.createElement("div", {
    className: "segmented-progress-bar",
    style: {
      height: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.certified / stats.total * 100}%`,
      backgroundColor: colors.blue
    },
    onClick: () => handleStatsCardClick('authStatus', 'certified'),
    title: "\u5DF2\u8BA4\u8BC1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.loggedout / stats.total * 100}%`,
      backgroundColor: '#A1A7B3'
    },
    onClick: () => handleStatsCardClick('authStatus', 'loggedout'),
    title: "\u5DF2\u6CE8\u9500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-segment",
    style: {
      width: `${stats.never / stats.total * 100}%`,
      backgroundColor: colors.yellow
    },
    onClick: () => handleStatsCardClick('authStatus', 'never'),
    title: "\u4ECE\u672A\u8BA4\u8BC1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "legend-pills-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--certified",
    onClick: () => handleStatsCardClick('authStatus', 'certified')
  }, stats.certified, " \u5DF2\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--loggedout",
    onClick: () => handleStatsCardClick('authStatus', 'loggedout')
  }, stats.loggedout, " \u5DF2\u6CE8\u9500"), /*#__PURE__*/React.createElement("span", {
    className: "legend-pill legend-pill--never",
    onClick: () => handleStatsCardClick('authStatus', 'never')
  }, stats.never, " \u4ECE\u672A\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card-title"
  }, "\u7EC8\u7AEF\u8D44\u4EA7\u7C7B\u578B\u5206\u7C7B"), /*#__PURE__*/React.createElement("div", {
    className: "type-stat-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-stat-item",
    onClick: () => handleStatsCardClick('assetType', 'corporate')
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-bullet",
    style: {
      backgroundColor: colors.blue
    }
  }), "\u4F01\u4E1A\u7EC8\u7AEF"), /*#__PURE__*/React.createElement("span", {
    className: "type-stat-val"
  }, stats.corp)), /*#__PURE__*/React.createElement("div", {
    className: "type-stat-item",
    onClick: () => handleStatsCardClick('assetType', 'personal')
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-bullet",
    style: {
      backgroundColor: colors.orange
    }
  }), "\u4E2A\u4EBA\u7EC8\u7AEF"), /*#__PURE__*/React.createElement("span", {
    className: "type-stat-val"
  }, stats.personal)), /*#__PURE__*/React.createElement("div", {
    className: "type-stat-item",
    onClick: () => handleStatsCardClick('assetType', 'personal-managed')
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-bullet",
    style: {
      backgroundColor: colors.green
    }
  }), "\u4F01\u4E1A\u7EB3\u7BA1\u4E2A\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "type-stat-val"
  }, stats.managed)), /*#__PURE__*/React.createElement("div", {
    className: "type-stat-item",
    onClick: () => handleStatsCardClick('assetType', 'undefined')
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-stat-bullet",
    style: {
      backgroundColor: colors.gray
    }
  }), "\u672A\u5B9A\u4E49"), /*#__PURE__*/React.createElement("span", {
    className: "type-stat-val"
  }, stats.undef)))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card",
    style: {
      cursor: 'default'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card-title"
  }, "\u6388\u4FE1\u5B89\u5168\u8D44\u4EA7\u7EDF\u8BA1"), /*#__PURE__*/React.createElement("div", {
    className: "trust-indicator-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-stat-side"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: colors.green,
      fontWeight: 600
    }
  }, "\u25CF \u5DF2\u6388\u4FE1: ", stats.trusted), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: colors.red,
      fontWeight: 600
    }
  }, "\u25CF \u672A\u6388\u4FE1: ", stats.untrusted)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.green,
      fontFamily: 'Outfit'
    }
  }, Math.round(stats.trusted / stats.total * 100), "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: colors.gray
    }
  }, "\u5B89\u5168\u6388\u4FE1\u7387"))))), /*#__PURE__*/React.createElement("div", {
    className: "table-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar-left"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "default",
    icon: /*#__PURE__*/React.createElement(ImportOutlined, null),
    style: {
      height: 32
    },
    onClick: () => antdMessage.info('终端批量导入功能准备就绪')
  }, "\u5BFC\u5165"), /*#__PURE__*/React.createElement(Button, {
    type: "default",
    icon: /*#__PURE__*/React.createElement(ExportOutlined, null),
    style: {
      height: 32
    },
    onClick: () => antdMessage.success('成功导出选中的终端数据表格')
  }, "\u5BFC\u51FA"), /*#__PURE__*/React.createElement(Button, {
    type: "default",
    icon: /*#__PURE__*/React.createElement(EditOutlined, null),
    style: {
      height: 32
    },
    disabled: selectedRowKeys.length === 0,
    onClick: () => antdMessage.info(`批量编辑选中的 ${selectedRowKeys.length} 个对象`)
  }, "\u6279\u91CF\u7F16\u8F91"), /*#__PURE__*/React.createElement(Button, {
    type: "default",
    icon: /*#__PURE__*/React.createElement(TagsOutlined, null),
    style: {
      height: 32
    },
    disabled: selectedRowKeys.length === 0,
    onClick: () => antdMessage.info('批量进行标签分配与编辑')
  }, "\u6807\u7B7E\u7BA1\u7406")), /*#__PURE__*/React.createElement("div", {
    className: "toolbar-right"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u641C\u7D22\u7EC8\u7AEF\u540D\u79F0/\u7ED1\u5B9A\u7528\u6237...",
    prefix: /*#__PURE__*/React.createElement(SearchOutlined, {
      style: {
        color: colors.lightGray
      }
    }),
    style: {
      width: 220,
      height: 32
    },
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    allowClear: true
  }), /*#__PURE__*/React.createElement(Button, {
    type: showAdvancedFilter ? 'primary' : 'default',
    icon: /*#__PURE__*/React.createElement(FilterOutlined, null),
    style: {
      height: 32
    },
    onClick: () => setShowAdvancedFilter(!showAdvancedFilter)
  }, "\u9AD8\u7EA7\u7B5B\u9009"))), showAdvancedFilter && /*#__PURE__*/React.createElement("div", {
    className: "advanced-filter-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "filter-label"
  }, "\u5728\u7EBF\u72B6\u6001"), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%',
      height: 32
    },
    placeholder: "\u5168\u90E8\u72B6\u6001",
    allowClear: true,
    value: filterStatus,
    onChange: setFilterStatus,
    options: [{
      label: '在线',
      value: 'online'
    }, {
      label: '离线',
      value: 'offline'
    }, {
      label: '已卸载',
      value: 'uninstalled'
    }, {
      label: '未知',
      value: 'unknown'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "filter-label"
  }, "\u8BA4\u8BC1\u72B6\u6001"), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%',
      height: 32
    },
    placeholder: "\u5168\u90E8\u8BA4\u8BC1",
    allowClear: true,
    value: filterAuth,
    onChange: setFilterAuth,
    options: [{
      label: '已认证',
      value: 'certified'
    }, {
      label: '已注销',
      value: 'loggedout'
    }, {
      label: '从未认证',
      value: 'never'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "filter-label"
  }, "\u8D44\u4EA7\u7C7B\u578B"), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%',
      height: 32
    },
    placeholder: "\u5168\u90E8\u7C7B\u578B",
    allowClear: true,
    value: filterType,
    onChange: setFilterType,
    options: [{
      label: '企业终端',
      value: 'corporate'
    }, {
      label: '个人终端',
      value: 'personal'
    }, {
      label: '企业纳管个人终端',
      value: 'personal-managed'
    }, {
      label: '未定义',
      value: 'undefined'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "filter-label"
  }, "\u64CD\u4F5C\u7CFB\u7EDF"), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%',
      height: 32
    },
    placeholder: "\u5168\u90E8\u7CFB\u7EDF",
    allowClear: true,
    value: filterOS,
    onChange: setFilterOS,
    options: [{
      label: 'Windows',
      value: 'Windows'
    }, {
      label: 'macOS',
      value: 'macOS'
    }, {
      label: 'Linux',
      value: 'Linux'
    }, {
      label: 'iOS',
      value: 'iOS'
    }, {
      label: 'Android',
      value: 'Android'
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "filter-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      height: 32
    },
    onClick: handleResetFilters
  }, "\u91CD\u7F6E"), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    style: {
      height: 32
    },
    onClick: () => antdMessage.success('已应用高级筛选')
  }, "\u5E94\u7528"))), /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement(Table, {
    rowSelection: {
      selectedRowKeys,
      onChange: onSelectChange
    },
    columns: listColumns,
    dataSource: filteredTerminals,
    pagination: {
      size: 'small',
      showTotal: total => `共 ${total} 项`,
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50']
    },
    rowKey: "key",
    scroll: {
      x: 1200
    },
    className: "sd-table"
  }))) :
  /*#__PURE__*/
  // Tab 2: Trusted Terminal Approval view
  React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "table-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar-left"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: colors.gray
    }
  }, "\u5F85\u5904\u7406\u5BA1\u6279\u7533\u8BF7\uFF1A", approvalRequests.length, " \u9879"))), /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement(Table, {
    dataSource: approvalRequests,
    columns: [{
      title: '终端申请名称',
      dataIndex: 'name',
      key: 'name',
      fontStyle: 'bold'
    }, {
      title: '系统',
      dataIndex: 'os',
      key: 'os',
      render: os => {
        let icon = /*#__PURE__*/React.createElement(DesktopOutlined, {
          style: {
            marginRight: 6
          }
        });
        if (os === 'Windows') icon = /*#__PURE__*/React.createElement(WindowsOutlined, {
          style: {
            marginRight: 6,
            color: '#0078d7'
          }
        });
        if (os === 'macOS') icon = /*#__PURE__*/React.createElement(AppleOutlined, {
          style: {
            marginRight: 6
          }
        });
        return /*#__PURE__*/React.createElement("span", null, icon, os);
      }
    }, {
      title: 'IP 地址',
      dataIndex: 'ip',
      key: 'ip'
    }, {
      title: 'MAC 地址',
      dataIndex: 'mac',
      key: 'mac'
    }, {
      title: '归属机构/部门',
      dataIndex: 'org',
      key: 'org'
    }, {
      title: '申请人',
      dataIndex: 'user',
      key: 'user'
    }, {
      title: '申请发起时间',
      dataIndex: 'time',
      key: 'time'
    }, {
      title: '申请授信原因说明',
      dataIndex: 'reason',
      key: 'reason',
      width: '30%'
    }, {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 140,
      render: (_, record) => /*#__PURE__*/React.createElement(Space, {
        size: 12
      }, /*#__PURE__*/React.createElement("a", {
        style: {
          color: colors.green,
          fontWeight: 500
        },
        onClick: () => handleApproveRequest(record)
      }, "\u6279\u51C6"), /*#__PURE__*/React.createElement("a", {
        style: {
          color: colors.red,
          fontWeight: 500
        },
        onClick: () => handleRejectRequestPrompt(record)
      }, "\u9A73\u56DE"))
    }],
    rowKey: "key",
    pagination: false
  })))))), /*#__PURE__*/React.createElement(StatsDetailDrawer, {
    open: statsDrawerOpen,
    filterKey: statsFilterKey,
    filterVal: statsFilterVal,
    onClose: () => setStatsDrawerOpen(false),
    onSelectTerminal: record => handleShowTerminalDetail(record)
  }), /*#__PURE__*/React.createElement(TerminalDetailDrawer, {
    open: detailDrawerOpen,
    terminal: selectedTerminal,
    onClose: () => {
      setDetailDrawerOpen(false);
      setSelectedTerminal(null);
    }
  }), /*#__PURE__*/React.createElement(Modal, {
    title: "\u9A73\u56DE\u6388\u4FE1\u7533\u8BF7\u539F\u56E0\u8BF4\u660E",
    open: rejectModalOpen,
    onCancel: () => setRejectModalOpen(false),
    onOk: submitRejectRequest,
    okText: "\u786E\u8BA4\u9A73\u56DE",
    cancelText: "\u53D6\u6D88",
    okButtonProps: {
      danger: true
    },
    rootClassName: "sd-modal",
    destroyOnClose: true
  }, /*#__PURE__*/React.createElement(Form, {
    layout: "vertical",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Form.Item, {
    label: "\u9A73\u56DE\u539F\u56E0\u53CD\u9988\u8BF4\u660E (\u53CD\u9988\u7ED9\u7EC8\u7AEF\u7528\u6237)",
    required: true
  }, /*#__PURE__*/React.createElement(Input.TextArea, {
    rows: 4,
    placeholder: "\u5982: \u8BE5\u7EC8\u7AEF\u7F3A\u5C11\u5FC5\u8981\u7684\u5B89\u5168\u7EC4\u7F51\u8BA4\u8BC1\u51ED\u8BC1\uFF0C\u6216\u8005\u6740\u6BD2\u7EC4\u4EF6\u672A\u6B63\u5E38\u52A0\u8F7D\uFF0C\u8BF7\u5148\u8FDB\u884C\u672C\u5730\u6392\u67E5\u3002",
    value: rejectReason,
    onChange: e => setRejectReason(e.target.value)
  })))));
};

// Render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React.createElement(App, null));