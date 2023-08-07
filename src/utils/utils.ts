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
  scriptUrl: '//at.alicdn.com/t/c/font_4195235_se15y8bxh9.js', // 在 iconfont.cn 上生成
});
