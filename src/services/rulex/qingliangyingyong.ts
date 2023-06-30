// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 应用列表 设备列表 GET /api/v1/app */
export async function getApp(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      version?: string;
      autoStart?: boolean;
      appState?: number;
      filepath?: string;
      luaSource?: string;
    }[];
  }>('/api/v1/app', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新应用 PUT /api/v1/app */
export async function putApp(
  body: {
    uuid: string;
    name: string;
    version: string;
    autoStart: boolean;
    description: string;
    luaSource: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/app', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建应用 POST /api/v1/app */
export async function postApp(
  body: {
    name: string;
    version: string;
    autoStart: boolean;
    description: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除应用 DELETE /api/v1/app */
export async function deleteApp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAppParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/app', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 应用详情 设备列表 GET /api/v1/app/detail */
export async function getAppDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAppDetailParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>('/api/v1/app/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启动应用 设备列表 PUT /api/v1/app/start */
export async function putAppStart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putAppStartParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      version?: string;
      autoStart?: boolean;
      appState?: number;
      filepath?: string;
      luaSource?: string;
    };
  }>('/api/v1/app/start', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 停止应用 设备列表 PUT /api/v1/app/stop */
export async function putAppStop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putAppStopParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      version?: string;
      autoStart?: boolean;
      appState?: number;
      filepath?: string;
      luaSource?: string;
    };
  }>('/api/v1/app/stop', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
