// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 插件列表 GET /api/v1/plugins */
export async function getPlugins(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/plugins', {
    method: 'GET',
    ...(options || {}),
  });
}
