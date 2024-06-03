/**
 * 详情类型
 */
export enum DetailModalType {
  DETAIL = 'detail',
  LOG = 'log',
}

/**
 * 点位表 or 对象列表类型
 */
export enum SheetType {
  DETAIL = 'detail',
  LIST = 'list',
}

/**
 * 校验表单类型
 */
export enum FormItemType {
  NAME = 'name', // 名称
  PORT = 'port', // 端口
  ADDRESS = 'address', // 起始地址
  VENDORID = 'vendorId', // 厂商ID
  IP = 'ip', // IPv4
  NETMASK = 'netmask', // 子网掩码
  GATEWAY = 'gateway', // 网关
  TIMEOUT = 'timeout', // 读写超时
}

/**
 * 产品类型
 */
export enum Product {
  RHILEXG1 = 'RHILEXG1',
  EN6400 = 'EN6400',
  COMMON = 'COMMON',
  RASPI4B = 'RASPI4B',
}
