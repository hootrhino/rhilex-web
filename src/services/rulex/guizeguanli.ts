// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建规则 新建规则 POST /api/v1/rules/create */
export async function postRulesCreate(
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
  return request<{ code: number; msg: string }>('/api/v1/rules/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/v1/rules/del */
export async function deleteRulesDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRulesDelParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/rules/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 规则详情 GET /api/v1/rules/detail */
export async function getRulesDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRulesDetailParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>('/api/v1/rules/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取可用资源 GET /api/v1/rules/getCanUsedResources */
export async function getRulesGetCanUsedResources(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      devices?: { uuid?: string; name?: string }[];
      outends?: { uuid?: string; name?: string }[];
    };
  }>('/api/v1/rules/getCanUsedResources', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 规则列表 GET /api/v1/rules/list */
export async function getRulesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRulesListParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: any }>('/api/v1/rules/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试规则 POST /api/v1/rules/testDevice */
export async function postRulesTestDevice(
  body: {
    uuid: string;
    testData: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/rules/testDevice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/v1/rules/update */
export async function putRulesUpdate(
  body: {
    uuid: string;
    name: string;
    fromSource: string[];
    fromDevice: string[];
    actions: string;
    success: string;
    failed: string;
    description: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/rules/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
