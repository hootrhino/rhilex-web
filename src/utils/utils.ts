import { createFromIconfontCN } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tryToJSON = (val: string) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4195235_xv32nau86b.js', // 在 iconfont.cn 上生成
});

// 校验IPv4
export const validateIPv4 = (ip: string) => {
  const pattern =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
  return pattern.test(ip);
};

// 子网掩码
export const validateMask = (ip: string) => {
  const pattern =
    /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
  return pattern.test(ip);
};

// 网关
export const validateGateway = (ip: string) => {
  const pattern = /^(192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2})$/;
  return pattern.test(ip);
};
