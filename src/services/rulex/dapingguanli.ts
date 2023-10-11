// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除大屏 DELETE /api/v1/visual */
export async function deleteVisual(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteVisualParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/visual', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建大屏 POST /api/v1/visual/create */
export async function postVisualCreate(
  body: {
    gid: string;
    name: string;
    type: string;
    content: string;
    thumbnail: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { uuid?: string } }>('/api/v1/visual/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 大屏详情 GET /api/v1/visual/detail */
export async function getVisualDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVisualDetailParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/visual/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 大屏分组 GET /api/v1/visual/group */
export async function getVisualGroup(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/visual/group', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 大屏列表 GET /api/v1/visual/listByGroup */
export async function getVisualListByGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVisualListByGroupParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/visual/listByGroup', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发布大屏 PUT /api/v1/visual/publish */
export async function putVisualPublish(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putVisualPublishParams,
  body: {
    uuid: string;
    name: string;
    type: string;
    content: string;
    thumbnail: string;
    status: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/visual/publish', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新大屏 PUT /api/v1/visual/update */
export async function putVisualUpdate(
  body: {
    gid: string;
    uuid: string;
    name: string;
    type: string;
    content: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { uuid?: string } }>('/api/v1/visual/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
