// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 接口详情 GET /api/v1/hwiface/detail */
export async function getHwifaceDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHwifaceDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      type?: string;
      alias?: string;
      config: {
        timeout?: number;
        uart?: string;
        baudRate?: number;
        dataBits?: number;
        parity?: string;
        stopBits?: number;
      };
      description?: string;
    };
  }>('/api/v1/hwiface/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 接口列表 GET /api/v1/hwiface/list */
export async function getHwifaceList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; name?: string; type?: string; alias?: string; description?: string }[];
  }>('/api/v1/hwiface/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新配置 POST /api/v1/hwiface/update */
export async function postHwifaceUpdate(
  body: {
    uuid: string;
    config: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/hwiface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
