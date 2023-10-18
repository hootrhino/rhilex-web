// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 仓库结构 GET /api/v1/dataCenter/schema/define */
export async function getDataCenterSchemaDefine(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataCenterSchemaDefineParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; columns?: { name?: string; type?: string; description?: string }[] };
  }>('/api/v1/dataCenter/schema/define', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 仓库查询 POST /api/v1/dataCenter/schema/delete */
export async function postDataCenterSchema__openAPI__delete(
  body: {
    uuid: string;
    query: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>(
    '/api/v1/dataCenter/schema/delete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 仓库详情 GET /api/v1/dataCenter/schema/detail */
export async function getDataCenterSchemaDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataCenterSchemaDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid?: string;
      name?: string;
      local_path?: string;
      net_addr?: string;
      create_ts?: number;
      size?: number;
      store_path?: string;
      description?: string;
    };
  }>('/api/v1/dataCenter/schema/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 仓库列表 GET /api/v1/dataCenter/schema/list */
export async function getDataCenterSchemaList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dataCenter/schema/list', {
    method: 'GET',
    ...(options || {}),
  });
}
