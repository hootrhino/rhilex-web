/**
 * 校验 IPv4 是否有效
 * IPv4地址由四组数字组成，每组数字的范围是0到255，并通过点号分隔。
 * 此函数使用正则表达式来确保每组数字都在有效范围内，并且格式正确。
 * @param ip 需要校验的 IPv4 地址字符串
 * @returns 返回一个布尔值，指示IPv4是否通过校验
 */
export const validateIPv4 = (ip: string): boolean => {
  const reg =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
  return reg.test(ip);
};

/**
 * 校验子网掩码是否有效
 * 子网掩码是一种用于划分IP网络和主机部分的32位数字，通常由四个八位组表示，每个八位组的取值范围为0到255，并以点分十进制格式书写。
 * 此函数校验子网掩码的每个八位组是否符合上述取值范围。
 * @param ip 需要校验的子网掩码字符串，应为形如"255.255.255.0"的点分十进制数
 * @returns 返回一个布尔值，指示子网掩码是否通过校验
 */
export const validateMask = (ip: string): boolean => {
  const reg = /^(?:\d{1,2}|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
  return reg.test(ip);
};

/**
 * 校验网关是否有效
 * 此函数专门校验192.168.x.x格式的私有网关地址
 * @param ip 需要校验的网关地址
 * @returns 返回一个布尔值，指示网关是否通过校验
 */
export const validateGateway = (ip: string): boolean => {
  const pattern = /^(192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2})$/;
  return pattern.test(ip);
};

/**
 * 校验端口是否有效
 * 端口号必须是一个介于0到65535之间的数字
 * @param port 需要校验的端口
 * @returns 返回一个布尔值，指示端口是否通过校验
 */
export const validatePort = (port: number): boolean => {
  const pattern = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
  return pattern.test(port.toString());
};

/**
 * 校验名称是否有效
 * 名称必须由字母、数字、下划线或中文字符组成，长度在6到14个字符之间
 * @param name 需要校验的名称字符串
 * @returns 返回一个布尔值，指示名称是否通过校验
 */
export const validateName = (name: string): boolean => {
  const pattern = /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,64}$/;
  return pattern.test(name);
};

/**
 * 校验 CIDR
 * 此函数用于校验输入的字符串是否符合CIDR（无类别域间路由）表示法的IPv4地址。
 * CIDR表示法包括一个IPv4地址和一个斜杠后面的子网掩码位数，子网掩码的范围限制在0到24之间。
 * @param {string} value - 需要校验的CIDR表示法的字符串。
 * @returns {boolean} - 如果字符串是有效的CIDR表示法，则返回true，否则返回false。
 */
export const validateCIDR = (value: string) => {
  const pattern =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\/([0-9]|1[0-9]|2[0-4])$/;
  return pattern.test(value);
};
