/**
 * 正则表达式
 */
// 校验IPv4
export const IpPattern =
  /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

export const validateIPv4 = (ip: string) => {
  return IpPattern.test(ip);
};

// 子网掩码
export const MaskPattern =
  /^(?:\d{1,2}|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d{2}|2[0-4]\d|25[0-5])){3}$/;

export const validateMask = (ip: string) => {
  return MaskPattern.test(ip);
};

// 网关
export const validateGateway = (ip: string) => {
  const pattern = /^(192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2})$/;
  return pattern.test(ip);
};
