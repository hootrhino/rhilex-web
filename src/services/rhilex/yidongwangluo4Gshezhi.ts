// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取APN参数 GET /api/v1/mn4g/apn */
export async function getMn4GApn(options?: { [key: string]: any }) {
  return request<{
    senceId: number;
    ptytpe: number;
    auth: number;
    cdmapwd: number;
    apn: string;
    apn_username: string;
    apn_password: string;
  }>('/api/v1/mn4g/apn', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置APN参数 POST /api/v1/mn4g/apn */
export async function postMn4GApn(
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
  return request<Record<string, any>>('/api/v1/mn4g/apn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 移动网络4G参数获取 GET /api/v1/mn4g/info */
export async function getMn4GInfo(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { cops: string; csq: number; iccid: string; imel: string };
  }>('/api/v1/mn4g/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 关闭4G POST /api/v1/mn4g/turnoff */
export async function postMn4GTurnoff(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/mn4g/turnoff', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 开启4G POST /api/v1/mn4g/turnon */
export async function postMn4GTurnon(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/mn4g/turnon', {
    method: 'POST',
    ...(options || {}),
  });
}
