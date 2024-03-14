import { createFromIconfontCN } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload';
import { clsx, type ClassValue } from 'clsx';
import CryptoJS from 'crypto-js';
import { isEmpty, omit, orderBy } from 'lodash';
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
  scriptUrl: '//at.alicdn.com/t/c/font_4195235_prigcy40cr.js', // 在 iconfont.cn 上生成
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
