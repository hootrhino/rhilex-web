// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取配置 GET /api/v1/cronReboot/config */
export async function getCronRebootConfig(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: { enable: boolean; cron_expr: string } }>(
    '/api/v1/cronReboot/config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新配置 POST /api/v1/cronReboot/update */
export async function postCronRebootUpdate(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/cronReboot/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
