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
        title: 'menu.device',
        component: './Device',
      },
      {
        path: '/device/:groupId/detail/:deviceId',
        title: 'menu.device.detail',
        component: './Device/Detail',
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
        path: '/device/:groupId/:deviceId/data-sheet',
        title: 'menu.device.sheet',
        component: './Device/DataPoints',
      },
      {
        path: '/device/:groupId/:deviceId/registers',
        title: 'menu.device.registers',
        component: './Device/ModbusSlaver',
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
    path: '/alarm',
    title: 'menu.alarm',
    icon: 'alert',
    hideChildrenInMenu: true,
    key: 'alarm',
    routes: [
      {
        path: '/alarm',
        title: 'menu.alarm',
        component: './AlarmCenter',
      },
      {
        path: '/alarm/rule/new',
        title: 'menu.alarm.new',
        component: './AlarmCenter/Rule/Update',
      },
      {
        path: '/alarm/rule/edit/:uuid',
        title: 'menu.alarm.update',
        component: './AlarmCenter/Rule/Update',
      },
      {
        path: '/alarm/rule/detail/:uuid',
        title: 'menu.alarm.detail',
        component: './AlarmCenter/Rule/Detail',
      },
    ],
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
        title: 'menu.inend',
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
        path: '/inend/detail/:uuid',
        title: 'menu.source.detail',
        component: './Inend/Detail',
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
        title: 'menu.outend',
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
      {
        path: '/outend/detail/:uuid',
        title: 'menu.source.detail',
        component: './Outend/Detail',
      },
    ],
  },
  {
    path: '/cecollas',
    title: 'menu.cecollas',
    icon: 'icon-menu-cecollas',
    hideChildrenInMenu: true,
    key: 'cecollas',
    routes: [
      {
        path: '/cecollas',
        title: 'menu.cecollas',
        component: './Cecollas',
      },
      {
        path: '/cecollas/detail/:uuid',
        title: 'menu.cecollas.detail',
        component: './Cecollas/Detail',
      },
      {
        path: '/cecollas/action/:uuid',
        title: 'menu.cecollas.action',
        component: './Cecollas/Action',
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
        title: 'menu.appStack',
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
