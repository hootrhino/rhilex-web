// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 输出资源列表 输出资源列表 GET /api/v1/outends */
export async function getOutends(options?: { [key: string]: any }) {
  return request<{ type: string; name: string; description: string; config: Record<string, any> }>(
    '/api/v1/outends',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新输出资源 更新输出资源 PUT /api/v1/outends */
export async function putOutends(
  body: {
    type: string;
    name: string;
    description: string;
    config: { server?: string; port?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    uuid: string;
    name: string;
    type: string;
    actionScript: string;
    description: string;
    config: Record<string, any>;
  }>('/api/v1/outends', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建输出资源 新建资源 POST /api/v1/outends */
export async function postOutends(
  body: {
    type: string;
    name: string;
    description: string;
    config: {
      host?: string;
      port?: number;
      clientId?: string;
      username?: string;
      password?: string;
      productId?: string;
      deviceName?: string;
    };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/outends', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除输出资源 删除输出资源 DELETE /api/v1/outends */
export async function deleteOutends(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteOutendsParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/outends', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 输出资源详情 输出资源列表 GET /api/v1/outends/detail */
export async function getOutendsDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOutendsDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data?: {
      uuid?: string;
      name?: string;
      type?: string;
      autoRestart?: boolean;
      description?: string;
      state?: number;
      config?: Record<string, any>;
    };
  }>('/api/v1/outends/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
