// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取最新配置 GET /api/v1/site/detail */
export async function getSiteDetail(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { siteName?: string; logo?: string; appName?: string };
  }>('/api/v1/site/detail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新最新站点配置 PUT /api/v1/site/update */
export async function putSiteUpdate(
  body: {
    sitename: string;
    logo: string;
    appName: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/site/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
