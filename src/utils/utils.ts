import { OutputMode } from '@/pages/Devices/enum';
import { createFromIconfontCN } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import CryptoJS from 'crypto-js';
import { twMerge } from 'tailwind-merge';
import { isDev } from './constant';
import { isEmpty } from './redash';
import { validateGateway, validateIPv4, validateMask, validateName, validatePort } from './regExp';

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
  scriptUrl: '//at.alicdn.com/t/c/font_4195235_n3ktgdssna.js', // 在 iconfont.cn 上生成
});

/**
 * 获取名称
 * @param list
 * @param key
 * @returns
 */
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

// 获取设备通用摄像机流处理网关播放地址
export const getPlayAddress = (
  deviceName: string,
  mode: OutputMode,
  serviceType: 'pull' | 'push',
) => {
  const params = {
    LOCAL_H264_STREAM_SERVER: {
      steam: 'h264_stream',
      port: 9400,
    },
    LOCAL_JPEG_STREAM_SERVER: {
      steam: 'jpeg_stream',
      port: 9401,
    },
  };
  const hash = deviceName && CryptoJS.MD5(deviceName).toString();
  const hostname = window?.location?.hostname;
  const devPlayAddr = `http://1365866fz0.vicp.fun/${params[mode]?.steam}/${serviceType}?liveId=${hash}`;
  const playAddress = `http://${hostname}:${params[mode]?.port}/${params[mode]?.steam}/${serviceType}?liveId=${hash}`;

  return isDev ? devPlayAddr : playAddress;
};

// 首字母大写
export const firstUpperCase = (value: string) => value.replace(/^\w/, (c) => c.toUpperCase());

export const stringToBool = (value: string) => {
  const valueMap = {
    true: true,
    false: false,
  };

  return valueMap[value];
};

export const ensureArrayLength = (arr: string[], maxLength = 50) => {
  if (arr.length > maxLength) {
    // 当数组长度超出最大长度时，从数组头部移除元素
    arr.shift(); // 移除数组的第一个元素
  }
};

// log
export const handleNewMessage = (source: string[] | undefined, target: string, topic: string) => {
  const newData = [...(source || [])]; // Clone the existing array or create a new one if it's undefined

  if (target && target !== 'Connected') {
    const parsedNewMsg = target && JSON.parse(target);
    if (parsedNewMsg?.topic === topic) {
      newData.push(target);
      ensureArrayLength(newData); // Ensure the array doesn't exceed the maximum length
    }
  }

  return newData; // Return the updated array
};

export enum FormItemType {
  NAME = 'name', // 名称
  PORT = 'port', // 端口
  ADDRESS = 'address', // 起始地址
  IP = 'ip', // IPv4
  NETMASK = 'netmask', // 子网掩码
  GATEWAY = 'gateway', // 网关
}
/**
 * 校验表单字段
 * @param value 校验字段的值
 * @param type FormItemType 表单字段的类型
 * @returns Promise<boolean> 异步解析为布尔值，表示校验是否通过
 */
export const validateFormItem = (value: string | number, type: FormItemType) => {
  if (!value) {
    return Promise.resolve();
  }
  switch (type) {
    case FormItemType.NAME:
      return typeof value === 'string' && validateName(value)
        ? Promise.resolve()
        : Promise.reject('名称仅支持中文、字母、数字或下划线，长度在 6-14 个字符之间');
    case FormItemType.PORT:
    case FormItemType.ADDRESS:
      return typeof value === 'number' && validatePort(value)
        ? Promise.resolve()
        : Promise.reject(
            `${type === FormItemType.PORT ? '端口' : '起始地址'}的值应在 0 到 65535 之间`,
          );
    case FormItemType.IP:
      return typeof value === 'string' && validateIPv4(value)
        ? Promise.resolve()
        : Promise.reject('IP 地址格式不正确');
    case FormItemType.NETMASK:
      return typeof value === 'string' && validateMask(value)
        ? Promise.resolve()
        : Promise.reject('子网掩码格式不正确');
    case FormItemType.GATEWAY:
      return typeof value === 'string' && validateGateway(value)
        ? Promise.resolve()
        : Promise.reject('网关格式不正确');
    default:
      return Promise.reject('格式不正确');
  }
};
