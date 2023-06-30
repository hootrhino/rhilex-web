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
  },
  {
    path: '/inends',
    name: '资源管理',
    icon: 'medicineBox',
    routes: [
      {
        path: '/inends',
        redirect: '/inends/list',
      },
      {
        path: '/inends/list',
        name: '资源列表',
        component: './Inends',
        hideInMenu: true,
      },
      {
        path: '/inends/new',
        name: '新建',
        component: './Inends/components/Update',
        hideInMenu: true,
      },
      {
        path: '/inends/edit/:id',
        name: '编辑',
        component: './Inends/components/Update',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/outends',
    name: '目标管理',
    icon: 'api',
    routes: [
      {
        path: '/outends',
        redirect: '/outends/list',
      },
      {
        path: '/outends/list',
        name: '目标列表',
        component: './Outends',
        hideInMenu: true,
      },
      {
        path: '/outends/new',
        name: '新建',
        component: './Outends/components/Update',
        hideInMenu: true,
      },
      {
        path: '/outends/edit/:id',
        name: '编辑',
        component: './Outends/components/Update',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/device',
    name: '设备管理',
    icon: 'fundProjectionScreen',
    routes: [
      {
        path: '/device',
        redirect: '/device/list',
      },
      {
        path: '/device/list',
        name: '设备列表',
        component: './Devices',
        hideInMenu: true,
      },
      {
        path: '/device/new',
        name: '新建',
        component: './Devices/components/BaseForm',
        hideInMenu: true,
      },
      {
        path: '/device/edit/:id',
        name: '编辑',
        component: './Devices/components/BaseForm',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/rules',
    name: '规则管理',
    icon: 'profile',
    routes: [
      {
        path: '/rules',
        redirect: '/rules/list',
      },
      {
        path: '/rules/list',
        name: '规则列表',
        component: './Rules',
        hideInMenu: true,
      },
      {
        path: '/rules/new',
        name: '新建',
        component: './Rules/components/Update',
        hideInMenu: true,
      },
      {
        path: '/rules/edit/:id',
        name: '编辑',
        component: './Rules/components/Update',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/plugins',
    name: '插件管理',
    icon: 'control',
    routes: [
      {
        path: '/plugins',
        redirect: '/plugins/list',
      },
      {
        path: '/plugins/list',
        name: '插件列表',
        component: './Plugins',
        hideInMenu: true,
      },
      {
        path: '/plugins/:id/detail',
        name: '客户端列表',
        component: './Plugins/Detail',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/drives',
    name: '驱动管理',
    icon: 'setting',
    routes: [
      {
        path: '/drives',
        redirect: '/drives/list',
      },
      {
        path: '/drives/list',
        name: '驱动列表',
        component: './Drives',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/app-stack',
    name: '轻量应用',
    icon: 'appstoreAdd',
    routes: [
      {
        path: '/app-stack',
        redirect: '/app-stack/list',
      },
      {
        path: '/app-stack/list',
        name: '轻量应用列表',
        component: './AppStack',
        hideInMenu: true,
      },
      {
        path: '/app-stack/new',
        name: '新建',
        component: './AppStack/components/Update',
        hideInMenu: true,
      },
      {
        path: '/app-stack/edit/:id',
        name: '编辑',
        component: './AppStack/components/Update',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/ai',
    name: `A${'\xa0'}I${'\xa0\xa0\xa0'}能力`,
    icon: 'reddit',
    routes: [
      {
        path: '/ai',
        redirect: '/ai/list',
      },
      {
        path: '/ai/list',
        name: 'AI 能力列表',
        component: './AI',
        hideInMenu: true,
      },
    ],
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
