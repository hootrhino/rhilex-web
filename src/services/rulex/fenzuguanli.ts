// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建分组 POST /api/v1/group/create */
export async function postGroupCreate(
  body: {
    name: string;
    type: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除分组 DELETE /api/v1/group/del */
export async function deleteGroupDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGroupDelParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/group/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看分组 GET /api/v1/group/detail */
export async function getGroupDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGroupDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; name?: string; type?: string; parent?: string };
  }>('/api/v1/group/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分组列表 GET /api/v1/group/list */
export async function getGroupList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; name?: string; type?: string; parent?: string }[];
  }>('/api/v1/group/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 把某个子项移除分组 POST /api/v1/group/unbind */
export async function postGroupUnbind(
  body: {
    gid: string;
    rid: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/group/unbind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新分组 PUT /api/v1/group/update */
export async function putGroupUpdate(
  body: {
    uuid: string;
    name: string;
    type: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/group/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
