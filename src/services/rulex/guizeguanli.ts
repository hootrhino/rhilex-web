// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 规则列表 GET /api/v1/rules */
export async function getRules(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      id?: string;
      uuid?: string;
      status?: number;
      name?: string;
      fromSource?: string[];
      fromDevice?: string[];
      actions?: string;
      success?: string;
      failed?: string;
      description?: string;
    }[];
  }>('/api/v1/rules', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建规则 新建规则 POST /api/v1/rules */
export async function postRules(
  body: {
    actions: string;
    description: string;
    failed: string;
    fromSource: string[];
    fromDevice: string[];
    name: string;
    success: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/rules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/v1/rules */
export async function deleteRules(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRulesParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/rules', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
