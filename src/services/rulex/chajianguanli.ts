// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 请求插件提供的接口 POST /api/v1/plugin/service */
export async function postPluginService(
  body: {
    uuid: string;
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      id?: string;
      remote?: string;
      listener?: string;
      username?: string;
      cleanSession?: boolean;
    }[];
  }>('/api/v1/plugin/service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 插件列表 GET /api/v1/plugins */
export async function getPlugins(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/plugins', {
    method: 'GET',
    ...(options || {}),
  });
}
