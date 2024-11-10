import { createFromIconfontCN } from '@ant-design/icons';
import { getIntl, getLocale } from '@umijs/max';
import type { RcFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import JSEncrypt from 'jsencrypt';
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

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4557572_1paayid3j8k.js', // 在 iconfont.cn 上生成
});

//  RSA 非对称加密
export const encryptText = (publicKey: string, text: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey); // 设置公钥
  const encrypted = encrypt.encrypt(text) || text; // 使用公钥加密

  return encrypted;
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

// 生成随机字符串的函数
export const generateRandomId = () => {
  const nanoId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

  return nanoId();
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 *
 * 复杂表单数据处理
 */
export const formatHeaders = (headers: { k: string; v: string }[] | Record<string, any>) => {
  if (!headers || typeof headers !== 'object') return;
  if (headers.length >= 0) {
    const newData = headers.reduce((acc: any, curr: { k: string; v: string }) => {
      if (curr.k && curr.v) {
        acc[curr.k] = curr.v;
      }

      return acc;
    }, {});

    return newData;
  } else {
    const newData = !isEmpty(headers)
      ? Object.keys(headers)?.map((item) => ({
          k: item,
          v: headers[item],
        }))
      : [{ k: '', v: '' }];

    return newData;
  }
};

const convertValue = (value: any) => {
  if (typeof value === 'string' && ['true', 'false'].includes(value)) {
    return value === 'true';
  } else if (typeof value === 'boolean') {
    return value.toString();
  }
  return value;
};

export const convertConfig = (config: Record<string, any>) => {
  return (
    config &&
    Object.fromEntries(
      Object.entries(config).map(([key, value]) => {
        return [key, convertValue(value)];
      }),
    )
  );
};

export const filterUndefined = (obj: Record<string, any>) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const filteredObj = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value === undefined) {
      // Skip undefined values
      return;
    }

    // Recursively filter nested objects or arrays
    const filteredValue = filterUndefined(value);

    // Only add the key if the filtered value is not an empty object or array
    if (typeof filteredValue === 'object' && Object.keys(filteredValue).length === 0) {
      return;
    }

    filteredObj[key] = filteredValue;
  });

  return filteredObj;
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
