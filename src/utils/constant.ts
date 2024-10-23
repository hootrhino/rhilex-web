// 默认登录路由
export const LOGIN_PATH = '/login';

// 登录页默认 title
export const DEFAULT_TITLE = 'RHILEX';

// export const DEFAULT_SUBTITLE = '数据无边 万物有声';

// 官方文档地址
export const DOC_URL = 'http://www.hootrhino.com/';

// 分组类型
export const GROUP_TYPE_DEVICE = 'DEVICE';
export const GROUP_TYPE_LUA_TPL = 'USER_LUA_TEMPLATE';

// 分组默认 key
export const DEFAULT_GROUP_KEY_DEVICE = 'DROOT';
export const DEFAULT_GROUP_KEY_LUA_TPL = 'ULTROOT';

// 其他
export const isDev = process.env.NODE_ENV === 'development';

export const defaultPagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  hideOnSinglePage: true,
  showSizeChanger: false,
};

// 限制试用版最大资源数
export const MAX_TOTAL = 2;

// 列表 URL
export const DEVICE_LIST = '/device/list';
export const INEND_LIST = '/inend/list';
export const OUTEND_LIST = '/outend/list';
export const APP_LIST = '/app/list';
