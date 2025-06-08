// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 立即更新NTP时间 PUT /api/v1/settings/ntp */
export async function putSettingsNtp(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/settings/ntp', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 时间获取 GET /api/v1/settings/time */
export async function getSettingsTime(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/settings/time', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 时间设置 POST /api/v1/settings/time */
export async function postSettingsTime(
  body: {
    sysTime: string;
    sysTimeZone: string;
    enableNtp: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/settings/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
