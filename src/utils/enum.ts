/**
 * 详情类型
 */
export enum DetailModalType {
  DETAIL = 'detail',
  LOG = 'log',
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
 * 版本类型
 */
export enum VersionType {
  FREETRIAL = 'FREETRIAL',
  COMMERCIAL = 'COMMERCIAL',
}
