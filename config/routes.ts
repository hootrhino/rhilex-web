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
    icon: 'group',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/device',
        redirect: '/device/list',
      },
      {
        path: '/device/list',
        name: '设备列表',
        component: './Devices',
      },
      {
        path: '/device/:groupId/new',
        name: '新建设备',
        component: './Devices/UpdateForm',
      },
      {
        path: '/device/:groupId/edit/:deviceId',
        name: '编辑设备',
        component: './Devices/UpdateForm',
      },
      {
        path: '/device/:groupId/:deviceId/rule',
        name: '规则配置',
        component: './Devices/RuleConfig',
      },
      {
        path: '/device/:groupId/:deviceId/rule/new',
        name: '新增规则配置',
        component: './Devices/RuleConfig/Update',
      },
      {
        path: '/device/:groupId/:deviceId/rule/edit/:ruleId',
        name: '编辑规则配置',
        component: './Devices/RuleConfig/Update',
      },
      {
        path: '/device/:groupId/:deviceId/specific-sheet/:deviceType',
        name: '点位表配置',
        component: './Devices/SpecificSheet',
      },
    ],
  },
  {
    path: '/schema',
    name: '数据模型',
    icon: 'apartment',
    component: './Schema',
  },
  // {
  //   path: '/screen-mgt',
  //   name: '数据大屏',
  //   icon: 'fundProjectionScreen',
  //   component: './ScreenMgt',
  // },
  // {
  //   path: '/screen-mgt/edit/:uuid',
  //   name: '编辑大屏',
  //   component: './ScreenMgt/components/Editor',
  //   hideInMenu: true,
  //   layout: false,
  // },
  {
    path: '/inends',
    name: '南向资源',
    icon: 'medicineBox',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/inends',
        redirect: '/inends/list',
      },
      {
        path: '/inends/list',
        name: '资源列表',
        component: './Inends',
      },
      {
        path: '/inends/new',
        name: '新建资源',
        component: './Inends/components/Update',
      },
      {
        path: '/inends/edit/:uuid',
        name: '编辑资源',
        component: './Inends/components/Update',
      },
      {
        path: '/inends/:inendId/rule',
        name: '规则配置',
        component: './Inends/RuleConfig',
      },
      {
        path: '/inends/:inendId/rule/new',
        name: '新增规则配置',
        component: './Inends/RuleConfig/Update',
      },
      {
        path: '/inends/:inendId/rule/edit/:ruleId',
        name: '编辑规则配置',
        component: './Inends/RuleConfig/Update',
      },
    ],
  },
  {
    path: '/outends',
    name: '北向资源',
    icon: 'api',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/outends',
        redirect: '/outends/list',
      },
      {
        path: '/outends/list',
        name: '资源列表',
        component: './Outends',
      },
      {
        path: '/outends/new',
        name: '新建资源',
        component: './Outends/Update',
      },
      {
        path: '/outends/edit/:uuid',
        name: '编辑资源',
        component: './Outends/Update',
      },
    ],
  },
  {
    path: '/app-stack',
    name: '轻量应用',
    icon: 'appstoreAdd',
    hideChildrenInMenu: true,
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
        component: './AppStack/components/Update',
      },
      {
        path: '/app-stack/edit/:uuid',
        name: '编辑应用',
        component: './AppStack/components/Update',
      },
    ],
  },
  // {
  //   path: '/data-center',
  //   name: '数据中心',
  //   icon: 'database',
  //   hideChildrenInMenu: true,
  //   routes: [
  //     {
  //       path: '/data-center',
  //       redirect: '/data-center/list',
  //     },
  //     {
  //       path: '/data-center/list',
  //       name: '数据列表',
  //       component: './DataCenter',
  //     },
  //     {
  //       path: '/data-center/:uuid',
  //       name: '数据详情',
  //       component: './DataCenter/Detail',
  //     },
  //   ],
  // },
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
    hideChildrenInMenu: true,
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
  },
  {
    path: '/system-mgt',
    name: '系统管理',
    icon: 'setting',
    component: './System',
  },
  {
    path: '/notify-log',
    name: '站内日志',
    component: './NotifyLog',
    hideInMenu: true,
  },
  {
    path: '/custom-tpl',
    name: '自定义模板',
    hideInMenu: true,
    routes: [
      {
        path: '/custom-tpl',
        redirect: '/custom-tpl/list',
      },
      {
        path: '/custom-tpl/list',
        name: '自定义模板列表',
        component: './CustomTpl',
      },
      {
        path: '/custom-tpl/:groupId/new',
        name: '新增自定义模板',
        component: './CustomTpl/Update',
      },
      {
        path: '/custom-tpl/:groupId/edit/:tplId',
        name: '编辑自定义模板',
        component: './CustomTpl/Update',
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
