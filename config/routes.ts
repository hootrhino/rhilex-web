export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '系统首页',
    icon: 'dashboard',
    component: './Dashboard',
    key: 'dashboard',
  },
  {
    path: '/device',
    name: '设备接入',
    icon: 'group',
    hideChildrenInMenu: true,
    key: 'device',
    routes: [
      {
        path: '/device',
        redirect: '/device/list',
      },
      {
        path: '/device/list',
        name: '设备列表',
        component: './Device',
      },
      {
        path: '/device/:groupId/new',
        name: '新建设备',
        component: './Device/Update',
      },
      {
        path: '/device/:groupId/edit/:deviceId',
        name: '编辑设备',
        component: './Device/Update',
      },
      {
        path: '/device/:groupId/:deviceId/rule',
        name: '规则配置',
        component: './Device/RuleConfig',
      },
      {
        path: '/device/:groupId/:deviceId/rule/new',
        name: '新建规则配置',
        component: './Device/RuleConfig/Update',
      },
      {
        path: '/device/:groupId/:deviceId/rule/edit/:ruleId',
        name: '编辑规则配置',
        component: './Device/RuleConfig/Update',
      },
      {
        path: '/device/:groupId/:deviceId/plc-sheet',
        name: '点位表配置',
        component: './Device/Plc',
      },
      {
        path: '/device/:groupId/:deviceId/modbus-sheet',
        name: '点位表配置',
        component: './Device/Modbus',
      },
      {
        path: '/device/:groupId/:deviceId/snmp-sheet',
        name: 'SNMP 对象列表',
        component: './Device/Snmp',
      },
      {
        path: '/device/:groupId/:deviceId/sub-device',
        name: '子设备列表',
        component: './Device/SmartHome',
      },
    ],
  },
  {
    path: '/schema',
    name: '数据模型',
    icon: 'apartment',
    component: './SchemaMgt',
    key: 'schema',
  },
  {
    path: '/inend',
    name: '南向资源',
    icon: 'medicineBox',
    hideChildrenInMenu: true,
    key: 'inend',
    routes: [
      {
        path: '/inend',
        redirect: '/inend/list',
      },
      {
        path: '/inend/list',
        name: '资源列表',
        component: './Inend',
      },
      {
        path: '/inend/new',
        name: '新建资源',
        component: './Inend/Update',
      },
      {
        path: '/inend/edit/:uuid',
        name: '编辑资源',
        component: './Inend/Update',
      },
      {
        path: '/inend/:inendId/rule',
        name: '规则配置',
        component: './Inend/RuleConfig',
      },
      {
        path: '/inend/:inendId/rule/new',
        name: '新建规则配置',
        component: './Inend/RuleConfig/Update',
      },
      {
        path: '/inend/:inendId/rule/edit/:ruleId',
        name: '编辑规则配置',
        component: './Inend/RuleConfig/Update',
      },
      {
        path: '/inend/:inendId/sub-device',
        name: '子设备列表',
        component: './Inend/SubDevice',
      },
    ],
  },
  {
    path: '/outend',
    name: '北向资源',
    icon: 'api',
    hideChildrenInMenu: true,
    key: 'outend',
    routes: [
      {
        path: '/outend',
        redirect: '/outend/list',
      },
      {
        path: '/outend/list',
        name: '资源列表',
        component: './Outend',
      },
      {
        path: '/outend/new',
        name: '新建资源',
        component: './Outend/Update',
      },
      {
        path: '/outend/edit/:uuid',
        name: '编辑资源',
        component: './Outend/Update',
      },
    ],
  },
  {
    path: '/app-stack',
    name: '轻量应用',
    icon: 'appstoreAdd',
    hideChildrenInMenu: true,
    key: 'appStack',
    routes: [
      {
        path: '/app-stack',
        redirect: '/app-stack/list',
      },
      {
        path: '/app-stack/list',
        name: '应用列表',
        component: './AppStack',
      },
      {
        path: '/app-stack/new',
        name: '新建应用',
        component: './AppStack/Update',
      },
      {
        path: '/app-stack/edit/:uuid',
        name: '编辑应用',
        component: './AppStack/Update',
      },
    ],
  },
  // {
  //   path: '/extend',
  //   name: '扩展协议',
  //   icon: 'cluster',
  //   component: './Extend',
  //   key: 'extend',
  // },
  {
    path: '/plugins',
    name: '插件管理',
    icon: 'control',
    hideChildrenInMenu: true,
    key: 'plugins',
    routes: [
      {
        path: '/plugins',
        redirect: '/plugins/list',
      },
      {
        path: '/plugins/list',
        name: '插件列表',
        component: './Plugins',
      },
    ],
  },
  {
    path: '/port',
    name: '端口设置',
    icon: 'nodeIndex',
    component: './PortMgt',
    key: 'port',
  },
  {
    path: '/system-mgt',
    name: '系统管理',
    icon: 'setting',
    component: './System',
    key: 'system',
  },
  {
    path: '/notify-log',
    name: '站内日志',
    component: './NotifyLog',
    hideInMenu: true,
    key: 'notify',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
