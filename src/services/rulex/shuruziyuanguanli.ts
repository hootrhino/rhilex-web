// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建输入资源 新建资源 POST /api/v1/inends/create */
export async function postInendsCreate(
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
  return request<{ code: number; msg: string }>('/api/v1/inends/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除输入资源 删除输出资源 DELETE /api/v1/inends/del */
export async function deleteInendsDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInendsDelParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/inends/del', {
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

/** 输出输入资源 输出资源列表 GET /api/v1/inends/list */
export async function getInendsList(options?: { [key: string]: any }) {
  return request<{ type: string; name: string; description: string; config: Record<string, any> }>(
    '/api/v1/inends/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 重启资源 PUT /api/v1/inends/restart */
export async function putInendsRestart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putInendsRestartParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/inends/restart', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新输入资源 更新输出资源 PUT /api/v1/inends/update */
export async function putInendsUpdate(
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
  }>('/api/v1/inends/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据输入ID查资源列表 GET /api/v1/rules/byInend */
export async function getRulesByInend(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRulesByInendParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/rules/byInend', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
