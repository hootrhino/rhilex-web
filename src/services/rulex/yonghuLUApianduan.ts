// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建模板 POST /api/v1/userlua/create */
export async function postUserluaCreate(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: { uuid?: string } }>('/api/v1/userlua/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除模板 DELETE /api/v1/userlua/delete */
export async function deleteUserlua__openAPI__delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserlua_openAPI_deleteParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/userlua/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分组列表 GET /api/v1/userlua/group */
export async function getUserluaGroup(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; name?: string; type?: string; parent?: string }[];
  }>('/api/v1/userlua/group', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 列表查看 GET /api/v1/userlua/listByGroup */
export async function getUserluaListByGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserluaListByGroupParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { gid?: string; uuid?: string; label?: string; apply?: string; type?: string }[];
  }>('/api/v1/userlua/listByGroup', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新模板 PUT /api/v1/userlua/update */
export async function putUserluaUpdate(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: { uuid?: string } }>('/api/v1/userlua/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
