// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 4G参数获取 GET /api/v1/4g/info */
export async function get4gInfo(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { cops?: string; csq?: number; iccid?: string };
  }>('/api/v1/4g/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 重启4G POST /api/v1/settings/4g/restart */
export async function postSettings4gRestart(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/settings/4g/restart', {
    method: 'POST',
    ...(options || {}),
  });
}
