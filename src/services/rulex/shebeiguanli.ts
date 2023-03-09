// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 设备列表 设备列表 GET /api/v1/devices */
export async function getDevices(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      type?: string;
      actionScript?: string;
      description?: string;
      state?: number;
      config: {
        config: {
          baudRate?: number;
          dataBits?: number;
          ip?: string;
          parity?: string;
          port?: number;
          stopBits?: number;
          uart?: string;
        };
        frequency?: number;
        mode?: string;
        registers?: {
          address?: number;
          function?: number;
          quantity?: number;
          slaverId?: number;
          tag?: string;
        }[];
        timeout?: number;
      };
    }[];
  }>('/api/v1/devices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新设备 PUT /api/v1/devices */
export async function putDevices(
  body: {
    uuid: string;
    name: string;
    type: string;
    actionScript: string;
    description: string;
    config: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/devices', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建设备 POST /api/v1/devices */
export async function postDevices(
  body: {
    type: string;
    name: string;
    description: string;
    config: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/devices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除设备 DELETE /api/v1/devices */
export async function deleteDevices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDevicesParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/devices', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
