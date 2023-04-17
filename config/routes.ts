/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
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
    name: 'Dashboard',
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
        component: './Sources',
        hideInMenu: true,
      },
      {
        path: '/inends/new',
        name: '新建',
        component: './Sources/UpdateForm',
        hideInMenu: true,
      },
      {
        path: '/inends/edit/:id',
        name: '编辑',
        component: './Sources/UpdateForm',
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
        component: './Rules/UpdateForm',
        hideInMenu: true,
      },
      {
        path: '/rules/edit/:id',
        name: '编辑',
        component: './Rules/UpdateForm',
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
        component: './Targets',
        hideInMenu: true,
      },
      {
        path: '/outends/new',
        name: '新建',
        component: './Targets/UpdateForm',
        hideInMenu: true,
      },
      {
        path: '/outends/edit/:id',
        name: '编辑',
        component: './Targets/UpdateForm',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/devices',
    name: '设备管理',
    icon: 'fundProjectionScreen',
    routes: [
      {
        path: '/devices',
        redirect: '/devices/list',
      },
      {
        path: '/devices/list',
        name: '设备列表',
        component: './Devices',
        hideInMenu: true,
      },
      {
        path: '/devices/new',
        name: '新建',
        component: './Devices/components/UpdateForm',
        hideInMenu: true,
      },
      {
        path: '/devices/edit/:id',
        name: '编辑',
        component: './Devices/components/UpdateForm',
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
        component: './AppStack/UpdateForm',
        hideInMenu: true,
      },
      {
        path: '/app-stack/edit/:id',
        name: '编辑',
        component: './AppStack/UpdateForm',
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
