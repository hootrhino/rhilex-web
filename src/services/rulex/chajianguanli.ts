// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 插件详情 GET /api/v1/plugware/detail */
export async function getPlugwareDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlugwareDetailParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/plugware/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 插件列表 GET /api/v1/plugware/list */
export async function getPlugwareList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      version?: string;
      homepage?: string;
      helpLink?: string;
      author?: string;
      email?: string;
      license?: string;
    }[];
  }>('/api/v1/plugware/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 请求插件提供的接口 POST /api/v1/plugware/service */
export async function postPlugwareService(
  body: {
    uuid: string;
    name: string;
    args?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/plugware/service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
