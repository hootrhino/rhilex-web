// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 请求插件提供的接口 POST /api/v1/plugin/service */
export async function postPluginService(
  body: {
    uuid: string;
    name: string;
    args: string | Record<string, any> | Record<string, any>[] | number | boolean;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: string | Record<string, any> | Record<string, any>[] | number | boolean;
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

/** 插件详情 GET /api/v1/plugins/detail */
export async function getPluginsDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPluginsDetailParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/plugins/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
