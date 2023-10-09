// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除大屏 DELETE /api/v1/visual */
export async function deleteVisual(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/visual', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新大屏 PUT /api/v1/visual/create */
export async function putVisualCreate(
  body: {
    uuid: string;
    name: string;
    type: string;
    content: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/visual/create', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/visual/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 大屏列表 GET /api/v1/visual/list */
export async function getVisualList(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/visual/list', {
    method: 'GET',
    ...(options || {}),
  });
}
