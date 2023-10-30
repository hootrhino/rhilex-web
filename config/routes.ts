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
        component: './Devices/components/Update',
        hideInMenu: true,
      },
      {
        path: '/device/edit/:id',
        name: '编辑',
        component: './Devices/components/Update',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/screen-mgt',
    name: '数据大屏',
    icon: 'group',
    routes: [
      {
        path: '/screen-mgt',
        redirect: '/screen-mgt/screen/list',
      },
      {
        path: '/screen-mgt/screen/list',
        name: '数据大屏列表',
        component: './ScreenMgt/Screen',
        hideInMenu: true
      },
    ],
  },
  {
    path: '/screen-mgt/screen/edit/:uuid',
    name: '编辑大屏',
    component: './ScreenMgt/Screen/components/Editor',
    hideInMenu: true,
    layout: false,
  },
  {
    path: '/inends',
    name: '南向资源',
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
    name: '北向资源',
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
  // {
  //   path: '/rules',
  //   name: '规则管理',
  //   icon: 'profile',
  //   routes: [
  //     {
  //       path: '/rules',
  //       redirect: '/rules/list',
  //     },
  //     {
  //       path: '/rules/list',
  //       name: '规则列表',
  //       component: './Rules',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/rules/new',
  //       name: '新建',
  //       component: './Rules/components/Update',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/rules/edit/:id',
  //       name: '编辑',
  //       component: './Rules/components/Update',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    path: '/data-center',
    name: '数据中心',
    icon: 'database',
    routes: [
      {
        path: '/data-center',
        redirect: '/data-center/list',
      },
      {
        path: '/data-center/list',
        name: '数据中心列表',
        component: './DataCenter',
        hideInMenu: true,
      },
      {
        path: '/data-center/:uuid',
        name: '数据中心详情',
        component: './DataCenter/Detail',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/extend',
    name: '扩展协议',
    icon: 'cluster',
    component: './Extend',
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
        component: './Plugins/components/Detail',
        hideInMenu: true,
      },
    ],
  },
  // {
  //   path: '/drives',
  //   name: '驱动管理',
  //   icon: 'cloudServer',
  //   component: './Drives',
  // },
  // {
  //   path: '/ai',
  //   name: `A${'\xa0'}I${'\xa0\xa0\xa0'}能力`,
  //   icon: 'reddit',
  //   routes: [
  //     {
  //       path: '/ai',
  //       redirect: '/ai/list',
  //     },
  //     {
  //       path: '/ai/list',
  //       name: 'AI 能力列表',
  //       component: './AI',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    path: '/system-mgt',
    name: '系统管理',
    icon: 'setting',
    component: './System',
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
