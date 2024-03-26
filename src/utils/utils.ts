import { createFromIconfontCN } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import CryptoJS from 'crypto-js';
import { twMerge } from 'tailwind-merge';
import { isEmpty, omit } from './redash';

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

export const processColumns = (columns: any) => {
  return columns?.map((col: any) => {
    if (col.valueType === 'group') {
      return { ...col, columns: processColumns(col.columns) };
    }

    if (col.valueType === 'dependency') {
      return {
        ...col,
        columns: (params: any) => {
          return processColumns(col.columns(params));
        },
      };
    }
    if (col.valueType === 'formList') {
      if (col.mode === 'single') {
        return {
          ...omit(col, ['mode']),
          columns: processColumns(col.columns),
          fieldProps: {
            creatorButtonProps: false,
            copyIconProps: false,
            deleteIconProps: false,
          },
        };
      } else {
        return {
          ...omit(col, ['mode']),
          columns: processColumns(col.columns),
          fieldProps: {
            creatorButtonProps: {
              position: 'top',
            },
            creatorRecord: col?.initialValue,
            ...col.fieldProps,
          },
        };
      }
    }

    return {
      ...omit(col, ['required']),
      width: col?.width || 'md',
      fieldProps: {
        placeholder: ['groupSelect', 'schemaSelect', 'select'].includes(col?.valueType)
          ? `请选择${col?.title}`
          : `请输入${col?.title}`,
        ...col?.fieldProps,
      },
      formItemProps: {
        rules: [
          {
            required: col?.required,
            message: ['groupSelect', 'schemaSelect', 'select'].includes(col?.valueType)
              ? `请选择${col?.title}`
              : `请输入${col?.title}`,
          },
        ],
        ...col?.formItemProps,
      },
    };
  });
};

// 获取设备通用摄像机流处理网关播放地址
export const getPlayAddress = (
  deviceName: string,
  mode: 'LOCAL_H264_STREAM_SERVER' | 'LOCAL_JPEG_STREAM_SERVER',
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
  const playAddress = `http://${window?.location?.hostname}:${params[mode]?.port}/${params[mode]?.steam}/${serviceType}?liveId=${hash}`;

  return playAddress;
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
