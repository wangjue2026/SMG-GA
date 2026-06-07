import json
import re

menus = {
    "监控中心": [
        {"name": "访问体验监测", "icon": "wave", "children": ["总览", "运维告警", "监测配置"]},
        {"name": "设备状态", "icon": "server"},
        {"name": "用户监控", "icon": "users", "children": ["在线列表", "用户状态", "爆破锁定IP", "闲置账号"]},
        {"name": "设备监控", "icon": "monitor"},
        {"name": "告警管理", "icon": "bell", "children": ["告警列表", "告警设置", "邮件告警配置"]},
    ],
    "全球安全互联": [
        {"name": "防火墙集中管理", "icon": "shield", "children": ["TOPN", "策略管理", "模版管理", "设备视图"]},
        {"name": "SD-WAN组网", "icon": "network", "children": ["VPN配置列表", "拓扑管理", "智能选路"]},
        {"name": "全球加速", "icon": "lightning", "children": ["加速用量分析", "加速配置", "加速资源"]},
        {"name": "下发任务管理", "icon": "task"},
    ],
    "零信任安全接入": [
        {"name": "安全概览", "icon": "board"},
        {"name": "安全雷达", "icon": "target", "children": ["防线可视", "实体调查", "行为洞察"]},
        {"name": "威胁诱捕", "icon": "magnet", "children": ["蜜罐主机", "诱捕策略", "诱捕日志"]},
        {"name": "恶意识别", "icon": "bug", "children": ["恶意文件分析", "恶意流量检测", "恶意样本库"]},
        {"name": "处置策略", "icon": "shield"},
        {"name": "安全基线", "icon": "ruler", "children": ["应用防护策略", "上线准入策略"]},
        {"name": "服务隐身", "icon": "eye-off", "children": ["SPA防护", "安全码管理"]},
        {"name": "虚拟网络域", "icon": "cloud", "children": ["网络域管理", "网络切换策略"]},
        {"name": "第三方安全集成", "icon": "plugin"},
        {"name": "可信进程", "icon": "terminal"},
    ],
    "互联网安全访问": [
        {"name": "互联网安全访问概览", "icon": "board"},
        {"type": "group", "name": "分析"},
        {"name": "上网行为分析", "icon": "chart"},
        {"name": "上网管控分析", "icon": "lock"},
        {"name": "云威胁情报分析", "icon": "cloud-shield"},
        {"name": "风险终端分析", "icon": "target"},
        {"type": "group", "name": "策略"},
        {"name": "互联网应用管控", "icon": "app"},
        {"name": "互联网应用审计", "icon": "search-file"},
        {"name": "威胁管理", "icon": "shield"},
        {"name": "接入管理", "icon": "plug"},
        {"name": "SSL解密配置", "icon": "key"},
        {"name": "重定向设置", "icon": "arrow-turn"},
    ],
    "数据保护": [
        {"name": "UEM", "icon": "devices", "children": [
            {"name": "移动数据安全", "children": ["终端管控", "应用管控", "数据管控"]},
            {"name": "PC数据安全", "children": ["终端管控", "应用管控", "数据管控"]},
            {"name": "审批管理", "children": ["审批流程", "审批记录"]},
            "UEM高级设置",
            "UEM授权终端统计"
        ]},
        {"name": "数据防泄密", "icon": "file-lock", "children": [
            "数据防泄密概览",
            {"type": "group", "name": "分析", "pl": "48px"},
            "数据外发分析",
            "泄密事件分析",
            "泄密风险用户",
            "泄密追溯中心",
            {"type": "group", "name": "策略", "pl": "48px"},
            "终端泄密审计",
            "终端泄密管控",
            "泄密分析规则",
            "敏感对象定义",
            "高级配置"
        ]}
    ],
    "业务管理": [
        {"name": "用户与角色", "icon": "user-group"},
        {"name": "认证管理", "icon": "badge", "children": ["认证服务器", "认证策略"]},
        {"name": "应用管理", "icon": "app", "children": ["应用列表", "应用授权", "应用权限审批"]},
        {"name": "终端管理", "icon": "devices", "children": ["终端资产", "软件管理", "终端管控", "终端日志获取"]},
        {"name": "设备管理", "icon": "server", "children": ["设备列表", "设备备份", "版本补丁包升级", "规则库升级"]},
        {"name": "策略管理", "icon": "doc", "children": ["全局策略", "用户策略"]},
        {"name": "对象管理", "icon": "objects", "children": ["网络区域", "IP地址", "文件类型组", "终端应用库", "应用识别库", "URL分类库", "进程库", "时间计划"]},
    ],
    "系统管理": [
        {"name": "管理员配置", "icon": "admin", "children": ["管理员账号", "管理员认证"]},
        {"name": "系统配置", "icon": "gear"},
        {"name": "客户端个性配置", "icon": "palette"},
        {"name": "网络部署", "icon": "network"},
        {"name": "集群管理", "icon": "cluster"},
        {"name": "特性中心", "icon": "star"},
        {"name": "升级管理", "icon": "upload"},
        {"name": "系统运维", "icon": "wrench"},
        {"name": "扩展能力对接", "icon": "plugin"},
        {"name": "代理网关管理", "icon": "gateway"},
        {"name": "深信服联动设备", "icon": "link"},
    ],
    "审计中心": [
        {"name": "防火墙集中管理日志", "icon": "log", "children": ["应用控制日志", "安全日志", "本地操作日志", "本地系统日志"]},
        {"name": "零信任安全接入日志", "icon": "log"},
        {"name": "互联网安全访问日志", "icon": "log", "children": ["上网行为日志", "威胁防护日志"]},
        {"name": "数据防泄密日志", "icon": "log"},
        {"name": "终端管理日志", "icon": "log", "children": ["终端管控日志", "软件管控日志"]},
        {"name": "用户登录日志", "icon": "log"},
        {"name": "设备运维日志", "icon": "log", "children": ["管理员运维日志", "设备与系统日志"]},
        {"name": "审计中心配置", "icon": "gear", "children": ["日志存储及审计配置", "Syslog日志同步", "零信任流量镜像", "零信任分析中心对接"]},
    ]
}

ICONS = {
    "wave": "M22 12h-4l-3 9L9 3l-3 9H2",
    "server": "M4 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM6 15h.01M6 7h.01",
    "users": "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    "monitor": "M9 17v-6a2 2 0 012-2h2m4 8V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10",
    "bell": "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    "shield": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    "network": "M10 6H6a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2zm0 10H6a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2v-3a2 2 0 00-2-2zm10-5h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2v-3a2 2 0 00-2-2zM12 9h4M12 19h4M8 11v5",
    "lightning": "M13 10V3L4 14h7v7l9-11h-7z",
    "task": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    "board": "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M4 10h16 M10 10v10",
    "target": "M12 22a10 10 0 100-20 10 10 0 000 20z M12 16a4 4 0 100-8 4 4 0 000 8z M12 2v4 M12 18v4 M2 12h4 M18 12h4",
    "magnet": "M4 8V6a6 6 0 1112 0v2m-9 4v4m6-4v4",
    "bug": "M12 20v-2M6.5 15.5l-2 2M17.5 15.5l2 2M5 10H3M21 10h-2M6.5 4.5l-2-2M17.5 4.5l2-2M15 10a3 3 0 01-6 0c0-1.5.5-3 3-5s3 3.5 3 5z",
    "ruler": "M4 6h16v12H4z M8 6v4 M12 6v6 M16 6v4",
    "eye-off": "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
    "cloud": "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    "plugin": "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
    "terminal": "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M8 10l2 2-2 2 M14 14h2",
    "chart": "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M8 14v-4 M12 14v-6 M16 14v-8",
    "lock": "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    "cloud-shield": "M9 12l2 2 4-4 M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    "app": "M4 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm10 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z",
    "search-file": "M9 17v1a3 3 0 11-6 0v-1m6 0a3 3 0 006 0v-1m-6 0H9 M15 10a3 3 0 11-6 0 3 3 0 016 0z M17.5 12.5L21 16",
    "plug": "M8 7h8M8 11h8M10 3v4M14 3v4M12 15v6",
    "key": "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    "arrow-turn": "M3 10h10a8 8 0 018 8v2 M3 10l6 6 M3 10l6-6",
    "devices": "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    "file-lock": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z M15 10V7",
    "user-group": "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    "badge": "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    "doc": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    "objects": "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    "admin": "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    "gear": "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    "palette": "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    "cluster": "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    "star": "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    "upload": "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    "wrench": "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.121 2.121 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
    "gateway": "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    "link": "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    "log": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    "default": "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
}

html_aside = "<aside class=\"at-sider flex flex-col flex-shrink-0 select-none\">\n"
html_aside += "  <div class=\"at-sider-title flex-shrink-0\">\n"
html_aside += "    <span x-text=\"topNav\"></span>\n"
html_aside += "    <svg class=\"w-4 h-4 opacity-60 cursor-pointer\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6h16M4 12h16M4 18h16\"></path></svg>\n"
html_aside += "  </div>\n"
html_aside += "  <div class=\"flex-1 overflow-y-auto py-2 custom-scrollbar\">\n"

for top_idx, (top_name, l2_list) in enumerate(menus.items()):
    html_aside += f"    <template x-if=\"topNav === '{top_name}'\">\n      <div>\n"
    for l2_idx, l2_item in enumerate(l2_list):
        if isinstance(l2_item, dict) and l2_item.get("type") == "group":
            pl = l2_item.get("pl", "28px")
            html_aside += f"        <div class=\"at-menu-group\" style=\"padding-left: {pl};\">{l2_item['name']}</div>\n"
            continue
            
        l2_key = f"m_{top_idx}_{l2_idx}"
        l2_name = l2_item["name"]
        l2_icon = ICONS.get(l2_item.get("icon", "default"), ICONS["default"])
        has_children = "children" in l2_item
        act_cond = f"(activeLeaf === '{l2_key}' || activeLeaf.startsWith('{l2_key}_'))"
        
        if has_children:
            html_aside += f"        <div class=\"at-menu-l2\" :class=\"{act_cond} ? 'active' : (expandedL2 === '{l2_key}' ? 'text-white' : '')\" @click=\"toggleL2('{l2_key}')\">\n"
            html_aside += f"          <svg class=\"at-menu-l2-icon\" :stroke=\"{act_cond} ? 'url(#icon-grad)' : 'currentColor'\" fill=\"none\" viewBox=\"0 0 24 24\">\n"
            html_aside += f"            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"{l2_icon}\"></path>\n"
            html_aside += f"          </svg>\n"
            html_aside += f"          <span :class=\"{act_cond} ? 'font-semibold' : ''\">{l2_name}</span>\n"
            html_aside += f"          <svg class=\"ml-auto mr-4 w-4 h-4 opacity-60 transition-transform\" :class=\"expandedL2 === '{l2_key}' ? 'rotate-180' : ''\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>\n"
            html_aside += f"        </div>\n"
            html_aside += f"        <div x-show=\"expandedL2 === '{l2_key}'\" x-collapse x-cloak>\n"
            
            for l3_idx, l3_item in enumerate(l2_item["children"]):
                if isinstance(l3_item, dict) and l3_item.get("type") == "group":
                    pl = l3_item.get("pl", "28px")
                    html_aside += f"          <div class=\"at-menu-group\" style=\"padding-left: {pl};\">{l3_item['name']}</div>\n"
                    continue
                
                l3_is_dict = isinstance(l3_item, dict)
                l3_name = l3_item["name"] if l3_is_dict else l3_item
                l3_key = f"{l2_key}_{l3_idx}"
                l3_has_children = l3_is_dict and "children" in l3_item
                l3_act_cond = f"(activeLeaf === '{l3_key}' || activeLeaf.startsWith('{l3_key}_'))"
                
                if l3_has_children:
                    html_aside += f"          <div class=\"at-menu-l3\" :class=\"{l3_act_cond} ? 'text-white' : ''\" @click=\"toggleL3('{l3_key}')\">\n"
                    html_aside += f"            <span :class=\"{l3_act_cond} ? 'font-semibold' : ''\">{l3_name}</span>\n"
                    html_aside += f"            <svg class=\"ml-auto w-3 h-3 opacity-60 transition-transform\" :class=\"expandedL3 === '{l3_key}' ? 'rotate-180' : ''\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>\n"
                    html_aside += f"          </div>\n"
                    html_aside += f"          <div x-show=\"expandedL3 === '{l3_key}'\" x-collapse x-cloak>\n"
                    for l4_idx, l4_name in enumerate(l3_item["children"]):
                        l4_key = f"{l3_key}_{l4_idx}"
                        html_aside += f"            <div class=\"at-menu-l4\" :class=\"activeLeaf === '{l4_key}' ? 'active' : ''\" @click=\"toggleL4('{l4_key}')\">\n"
                        html_aside += f"              <span class=\"w-1 h-1 rounded-full flex-shrink-0\" :class=\"activeLeaf === '{l4_key}' ? 'bg-white' : 'bg-[#6F7785]'\"></span>\n"
                        html_aside += f"              <span class=\"ml-2\">{l4_name}</span>\n"
                        html_aside += f"            </div>\n"
                    html_aside += f"          </div>\n"
                else:
                    html_aside += f"          <div class=\"at-menu-l3\" :class=\"activeLeaf === '{l3_key}' ? 'active' : ''\" @click=\"toggleL4('{l3_key}')\">{l3_name}</div>\n"
            
            html_aside += f"        </div>\n"
        else:
            html_aside += f"        <div class=\"at-menu-l2\" :class=\"activeLeaf === '{l2_key}' ? 'active' : ''\" @click=\"toggleL2('{l2_key}', true)\">\n"
            html_aside += f"          <svg class=\"at-menu-l2-icon\" :stroke=\"activeLeaf === '{l2_key}' ? 'url(#icon-grad)' : 'currentColor'\" fill=\"none\" viewBox=\"0 0 24 24\">\n"
            html_aside += f"            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"{l2_icon}\"></path>\n"
            html_aside += f"          </svg>\n"
            html_aside += f"          <span :class=\"activeLeaf === '{l2_key}' ? 'font-semibold' : ''\">{l2_name}</span>\n"
            html_aside += f"        </div>\n"
            
    html_aside += "      </div>\n    </template>\n"

html_aside += "  </div>\n</aside>"

with open("Demos/atrust-access-experience-monitoring.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. 替换 <style> 中增加 .at-menu-l4 和 group
css_inject = """
    .at-menu-l4 {
      height: 32px; padding-left: 60px; padding-right: 16px; display: flex; align-items: center;
      cursor: pointer; color: #BEC3CC; font-size: 12px; font-weight: 400; transition: color 0.2s;
    }
    .at-menu-l4:hover { color: #FFFFFF; background: rgba(255,255,255,0.04); }
    .at-menu-l4.active { color: #FFFFFF; font-weight: 600; }
    .at-menu-group {
      height: 32px; display: flex; align-items: center; color: #5E6573; font-size: 12px;
      cursor: default; user-select: none; pointer-events: none;
    }
"""
content = re.sub(r'(\[x-cloak\] \{ display: none !important; \})', r'\1' + '\n' + css_inject, content)

# 2. 替换 x-data 驱动
xdata_inject = """{
         topNav: '监控中心',
         expandedL2: 'm_0_0', 
         expandedL3: '',
         activeLeaf: 'm_0_0_0',
         drawer: false,
         navDefaults: {
           '监控中心': { l2: 'm_0_0', l3: '', leaf: 'm_0_0_0' },
           '全球安全互联': { l2: 'm_1_0', l3: '', leaf: 'm_1_0_0' },
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
             this.expandedL2 = d.l2; this.expandedL3 = d.l3; this.activeLeaf = d.leaf;
           }
         },
         toggleL2(key, isLeaf = false) {
           if(isLeaf) { this.activeLeaf = key; this.expandedL2 = key; this.expandedL3 = ''; } 
           else { this.expandedL2 = this.expandedL2 === key ? '' : key; }
         },
         toggleL3(key) { this.expandedL3 = this.expandedL3 === key ? '' : key; },
         toggleL4(key) { this.activeLeaf = key; }
       }"""
content = re.sub(r'x-data="\{\n         topNav: \'监控中心\',[\s\S]*?}\n       }"', f'x-data="{xdata_inject}"', content)

# 3. 替换顶部导航点击
content = re.sub(r'@click="topNav = nav"', r'@click="setTopNav(nav)"', content)

# 4. 替换 aside
content = re.sub(r'<aside class="at-sider[\s\S]*?</aside>', html_aside, content)

# 5. 包装 main 内容 (保护原先页面的代码，其它页面显示暂无数据)
main_match = re.search(r'<main[\s\S]*?<div class="bg-white rounded-container shadow-\[0_1px_3px_rgba\(0,0,0,0\.05\)\] flex-1 flex flex-col overflow-hidden">([\s\S]*?)</main>', content)
if main_match:
    inner_main = main_match.group(1)
    new_main = f"""<main class="flex-1 bg-bg-light p-3 flex flex-col overflow-hidden">
        <template x-if="topNav === '监控中心' && activeLeaf === 'm_0_0_0'">
          <div class="bg-white rounded-container shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1 flex flex-col overflow-hidden">
{inner_main}
          </div>
        </template>
        <template x-if="!(topNav === '监控中心' && activeLeaf === 'm_0_0_0')">
          <div class="bg-white rounded-container shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1 flex flex-col items-center justify-center text-graphite-d10">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <span class="text-sm">模块建设中...</span>
          </div>
        </template>
      </main>"""
    content = re.sub(r'<main class="flex-1 bg-bg-light p-3 flex flex-col overflow-hidden">[\s\S]*?</main>', new_main, content)

with open("Demos/atrust-access-experience-monitoring.html", "w", encoding="utf-8") as f:
    f.write(content)
