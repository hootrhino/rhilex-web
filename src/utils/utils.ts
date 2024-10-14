import { createFromIconfontCN } from '@ant-design/icons';
import { getIntl, getLocale } from '@umijs/max';
import type { RcFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';
import { FormItemType } from './enum';
import { isEmpty } from './redash';
import {
  validateGateway,
  validateIPv4,
  validateMask,
  validateName,
  validatePort,
  validateTimeout,
} from './regExp';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4557572_i7kuo8qjow7.js', // 在 iconfont.cn 上生成
});

// 格式化 k-v
export const formatHeaders2Obj = (data: { k: string; v: string }[]) => {
  const newData = data.reduce((acc: any, curr: { k: string; v: string }) => {
    if (curr.k && curr.v) {
      acc[curr.k] = curr.v;
    }

    return acc;
  }, {});

  return newData;
};

export const formatHeaders2Arr = (data: Record<string, any>) => {
  const newData = !isEmpty(data)
    ? Object.keys(data)?.map((item) => ({
        k: item,
        v: data[item],
      }))
    : [{ k: '', v: '' }];

  return newData;
};

// 首字母大写
export const toPascalCase = (str: string) => {
  if (str === 'id') {
    return 'ID';
  } else if (!str.includes('_')) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str
    .replace(/_([a-z])/g, (match, char) => char.toUpperCase())
    .replace(/_/g, '')
    .replace(/^\w/, (char) => char.toUpperCase());
};

export const stringToBool = (value: string) => {
  const valueMap = {
    true: true,
    false: false,
  };

  return valueMap[value];
};

export const bool2String = (value: boolean | string | number) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return value;
};

// 生成随机字符串的函数
export const generateRandomId = () => {
  const nanoId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

  return nanoId();
};

/**
 * 校验表单字段
 * @param value 校验字段的值
 * @param type FormItemType 表单字段的类型
 * @returns Promise<boolean> 异步解析为布尔值，表示校验是否通过
 */
const getRuleName = (type: FormItemType) => {
  switch (type) {
    case FormItemType.PORT:
      return getIntl(getLocale()).formatMessage({ id: 'form.rules.port' });
    case FormItemType.ADDRESS:
      return getIntl(getLocale()).formatMessage({ id: 'form.rules.address' });
    case FormItemType.VENDORID:
      return getIntl(getLocale()).formatMessage({ id: 'form.rules.vendorId' });
    default:
      return '';
  }
};

export const validateFormItem = (value: string | number, type: FormItemType) => {
  if (!value) {
    return Promise.resolve();
  }
  switch (type) {
    case FormItemType.NAME:
      return typeof value === 'string' && validateName(value)
        ? Promise.resolve()
        : Promise.reject(getIntl(getLocale()).formatMessage({ id: 'form.rules.name' }));
    case FormItemType.PORT:
    case FormItemType.ADDRESS:
    case FormItemType.VENDORID:
      return typeof value === 'number' && validatePort(value)
        ? Promise.resolve()
        : Promise.reject(getRuleName(type));
    case FormItemType.IP:
      return typeof value === 'string' && validateIPv4(value)
        ? Promise.resolve()
        : Promise.reject(getIntl(getLocale()).formatMessage({ id: 'form.rules.ip' }));
    case FormItemType.NETMASK:
      return typeof value === 'string' && validateMask(value)
        ? Promise.resolve()
        : Promise.reject(getIntl(getLocale()).formatMessage({ id: 'form.rules.netmask' }));
    case FormItemType.GATEWAY:
      return typeof value === 'string' && validateGateway(value)
        ? Promise.resolve()
        : Promise.reject(getIntl(getLocale()).formatMessage({ id: 'form.rules.gateway' }));
    case FormItemType.TIMEOUT:
      return typeof value === 'number' && validateTimeout(value)
        ? Promise.resolve()
        : Promise.reject(getIntl().formatMessage({ id: 'form.rules.uartTimeout' }));
    default:
      return Promise.reject(getIntl(getLocale()).formatMessage({ id: 'form.rules.default' }));
  }
};
