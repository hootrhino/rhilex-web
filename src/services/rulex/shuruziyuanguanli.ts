// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 输出输入资源 输出资源列表 GET /api/v1/inends */
export async function getInends(options?: { [key: string]: any }) {
  return request<{ type: string; name: string; description: string; config: Record<string, any> }>(
    '/api/v1/inends',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新输入资源 更新输出资源 PUT /api/v1/inends */
export async function putInends(
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
  }>('/api/v1/inends', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建输入资源 新建资源 POST /api/v1/inends */
export async function postInends(
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
  return request<{ code: number; msg: string }>('/api/v1/inends', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除输入资源 删除输出资源 DELETE /api/v1/inends */
export async function deleteInends(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInendsParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/inends', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 输入资源详情 GET /api/v1/inends/detail */
export async function getInendsDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInendsDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code?: number;
    msg?: string;
    data?: {
      uuid?: string;
      state?: number;
      type?: string;
      name?: string;
      description?: string;
      config?: Record<string, any>;
    };
  }>('/api/v1/inends/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
