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
    title: 'menu.dashboard',
    icon: 'dashboard',
    component: './Dashboard',
    key: 'dashboard',
  },
  {
    path: '/device',
    title: 'menu.device',
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
        title: 'menu.device.list',
        component: './Device',
      },
      {
        path: '/device/:groupId/new',
        title: 'menu.device.new',
        component: './Device/Update',
      },
      {
        path: '/device/:groupId/edit/:deviceId',
        title: 'menu.device.update',
        component: './Device/Update',
      },
      {
        path: '/device/:groupId/:deviceId/rule',
        title: 'menu.rule.list',
        component: './Device/RuleConfig',
      },
      {
        path: '/device/:groupId/:deviceId/rule/new',
        title: 'menu.rule.new',
        component: './Device/RuleConfig/Update',
      },
      {
        path: '/device/:groupId/:deviceId/rule/edit/:ruleId',
        title: 'menu.rule.update',
        component: './Device/RuleConfig/Update',
      },
      {
        path: '/device/:groupId/:deviceId/plc-sheet',
        title: 'menu.device.sheet',
        component: './Device/Plc',
      },
      {
        path: '/device/:groupId/:deviceId/modbus-sheet',
        title: 'menu.device.sheet',
        component: './Device/Modbus',
      },
      {
        path: '/device/:groupId/:deviceId/snmp-sheet',
        title: 'menu.device.objectList',
        component: './Device/Snmp',
      },
      {
        path: '/device/:groupId/:deviceId/sub-device',
        title: 'menu.device.subDevice',
        component: './Device/SmartHome',
      },
    ],
  },
  {
    path: '/schema',
    title: 'menu.schema',
    icon: 'apartment',
    component: './SchemaMgt',
    key: 'schema',
  },
  {
    path: '/inend',
    title: 'menu.inend',
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
        title: 'menu.source.list',
        component: './Inend',
      },
      {
        path: '/inend/new',
        title: 'menu.source.new',
        component: './Inend/Update',
      },
      {
        path: '/inend/edit/:uuid',
        title: 'menu.source.update',
        component: './Inend/Update',
      },
      {
        path: '/inend/:inendId/rule',
        title: 'menu.rule.list',
        component: './Inend/RuleConfig',
      },
      {
        path: '/inend/:inendId/rule/new',
        title: 'menu.rule.new',
        component: './Inend/RuleConfig/Update',
      },
      {
        path: '/inend/:inendId/rule/edit/:ruleId',
        title: 'menu.rule.update',
        component: './Inend/RuleConfig/Update',
      },
      {
        path: '/inend/:inendId/sub-device',
        title: 'menu.device.subDevice',
        component: './Inend/SubDevice',
      },
    ],
  },
  {
    path: '/outend',
    title: 'menu.outend',
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
        title: 'menu.source.list',
        component: './Outend',
      },
      {
        path: '/outend/new',
        title: 'menu.source.new',
        component: './Outend/Update',
      },
      {
        path: '/outend/edit/:uuid',
        title: 'menu.source.update',
        component: './Outend/Update',
      },
    ],
  },
  {
    path: '/app-stack',
    title: 'menu.appStack',
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
        title: 'menu.appStack.list',
        component: './AppStack',
      },
      {
        path: '/app-stack/new',
        title: 'menu.appStack.new',
        component: './AppStack/Update',
      },
      {
        path: '/app-stack/edit/:uuid',
        title: 'menu.appStack.update',
        component: './AppStack/Update',
      },
    ],
  },
  // {
  //   path: '/extend',
  //   title: '扩展协议',
  //   icon: 'cluster',
  //   component: './Extend',
  //   key: 'extend',
  // },
  {
    path: '/plugins',
    title: 'menu.plugin',
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
        title: '插件列表',
        component: './Plugins',
      },
    ],
  },
  {
    path: '/port',
    title: 'menu.port',
    icon: 'nodeIndex',
    component: './PortMgt',
    key: 'port',
  },
  {
    path: '/system-mgt',
    title: 'menu.system',
    icon: 'setting',
    component: './System',
    key: 'system',
  },
  {
    path: '/notify-log',
    title: 'menu.notifyLog',
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
