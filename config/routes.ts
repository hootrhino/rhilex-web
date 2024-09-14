export default [
  {
    path: '/login',
    layout: false,
    component: './User/Login',
    wrappers: ['@/wrappers/auth'],
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
    icon: 'icon-menu-device',
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
        component: './Rule',
      },
      {
        path: '/device/:groupId/:deviceId/rule/new',
        title: 'menu.rule.new',
        component: './Rule/Update',
      },
      {
        path: '/device/:groupId/:deviceId/rule/edit/:ruleId',
        title: 'menu.rule.update',
        component: './Rule/Update',
      },
      {
        path: '/device/:groupId/:deviceId/plc-sheet',
        title: 'menu.device.sheet',
        component: './Device/Plc',
      },
      {
        path: '/device/:groupId/:deviceId/modbus-master-sheet',
        title: 'menu.device.sheet',
        component: './Device/ModbusMaster',
      },
      {
        path: '/device/:groupId/:deviceId/modbus-slaver-registers',
        title: 'menu.device.registers',
        component: './Device/ModbusSlaver',
      },
      {
        path: '/device/:groupId/:deviceId/mbus-master-sheet',
        title: 'menu.device.sheet',
        component: './Device/MbusMaster',
      },
      {
        path: '/device/:groupId/:deviceId/snmp-sheet',
        title: 'menu.device.objectList',
        component: './Device/Snmp',
      },
      {
        path: '/device/:groupId/:deviceId/bacnet-sheet',
        title: 'menu.device.sheet',
        component: './Device/BacnetIP',
      },
      {
        path: '/device/:groupId/:deviceId/bacnet-router-sheet',
        title: 'menu.device.sheet',
        component: './Device/BacnetRouter',
      },
    ],
  },
  {
    path: '/schema',
    title: 'menu.schema',
    icon: 'icon-menu-schema',
    component: './DataSchema',
    key: 'schema',
  },
  {
    path: '/repository',
    title: 'menu.dataRepository',
    icon: 'database',
    component: './DataRepository',
    key: 'repository',
  },
  {
    path: '/inend',
    title: 'menu.inend',
    icon: 'alignLeft',
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
        component: './Rule',
      },
      {
        path: '/inend/:inendId/rule/new',
        title: 'menu.rule.new',
        component: './Rule/Update',
      },
      {
        path: '/inend/:inendId/rule/edit/:ruleId',
        title: 'menu.rule.update',
        component: './Rule/Update',
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
    icon: 'alignRight',
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
    path: '/app',
    title: 'menu.appStack',
    icon: 'appstoreAdd',
    hideChildrenInMenu: true,
    key: 'app',
    routes: [
      {
        path: '/app',
        redirect: '/app/list',
      },
      {
        path: '/app/list',
        title: 'menu.appStack.list',
        component: './AppStack',
      },
      {
        path: '/app/new',
        title: 'menu.appStack.new',
        component: './AppStack/Update',
      },
      {
        path: '/app/edit/:uuid',
        title: 'menu.appStack.update',
        component: './AppStack/Update',
      },
    ],
  },
  {
    path: '/plugin',
    title: 'menu.plugin',
    icon: 'icon-menu-plugin',
    key: 'plugin',
    component: './Plugin',
  },
  {
    path: '/module',
    title: 'menu.cm',
    icon: 'icon-menu-com',
    key: 'module',
    component: './CommunicationModule',
  },
  {
    path: '/system',
    title: 'menu.system',
    icon: 'setting',
    component: './System',
    key: 'system',
  },
  {
    path: '/notification',
    title: 'menu.notification',
    component: './Notification',
    hideInMenu: true,
    key: 'notification',
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
  {
    path: '/403',
    layout: false,
    component: './403',
  },
];
