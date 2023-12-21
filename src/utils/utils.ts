import { createFromIconfontCN } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import { orderBy } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import luamin from 'lua-format';
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

export const getBlob = (file: UploadFile) => {
  const blobFile = new Blob([file?.originFileObj as RcFile], { type: file.type });

  return blobFile;
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4195235_bgkqj0abuk5.js', // 在 iconfont.cn 上生成
});

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

// 格式化 lua 代码
export const FormatCode = (code: string) => {
  const formatCode = luamin.Beautify(code, {
    RenameVariables: false,
    RenameGlobals: false,
    SolveMath: true,
  });

  let formattedCode = formatCode
    .toString()
    .replace(/--discord\.gg\/boronide, code generated using luamin\.js™\n?/g, '');

  formattedCode = formattedCode.replace(/^\s*\n/gm, '');

  return formattedCode;
};

// 获取名称
export const getName = (list: Record<string, any>[], key: string) => {
  const currentItem = list?.find((item: Record<string, any>) => item.uuid === key);

  return currentItem?.name;
};

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

export const filterLogByTopic = (data: string[], topic?: string) => {
  let newData = data?.map((item) => JSON.parse(item));

  if (topic) {
    newData = newData?.filter((log) => log?.topic === topic);
  }

  return orderBy(newData, 'time', 'desc');
};
