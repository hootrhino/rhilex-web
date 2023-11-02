// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取APN参数 GET /api/v1/4g/apn */
export async function get4gApn(options?: { [key: string]: any }) {
  return request<{
    senceId: number;
    ptytpe: number;
    auth: number;
    cdmapwd: number;
    apn: string;
    apn_username: string;
    apn_password: string;
  }>('/api/v1/4g/apn', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置APN参数 POST /api/v1/4g/apn */
export async function post4gApn(
  body: {
    senceId: number;
    ptytpe: number;
    auth: number;
    cdmapwd: number;
    apn: string;
    apn_username: string;
    apn_password: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/4g/apn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

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
