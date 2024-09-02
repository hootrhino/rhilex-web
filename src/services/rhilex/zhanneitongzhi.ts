// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 一键清空 PUT /api/v1/notify/clear */
export async function putNotifyClear(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/notify/clear', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 站内分页通知 GET /api/v1/notify/pageList */
export async function getNotifyPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotifyPageListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      current: number;
      size: number;
      total: number;
      records: {
        uuid?: string;
        type?: string;
        status?: number;
        event?: string;
        ts?: number;
        summary?: string;
        info?: string;
      }[];
    };
  }>('/api/v1/notify/pageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 阅读通知 PUT /api/v1/notify/read */
export async function putNotifyRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putNotifyReadParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/notify/read', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
