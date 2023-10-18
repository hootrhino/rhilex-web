// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除进程 DELETE /api/v1/goods/ */
export async function deleteGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGoodsParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/goods/', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建扩展 POST /api/v1/goods/create */
export async function postGoodsCreate(
  body: {
    net_addr: string;
    args: string;
    description?: string;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<Record<string, any>>('/api/v1/goods/create', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 扩展详情 GET /api/v1/goods/detail */
export async function getGoodsDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      running?: boolean;
      uuid?: string;
      local_path?: string;
      net_addr?: string;
      description?: string;
      args?: string[];
    };
  }>('/api/v1/goods/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 扩展列表 GET /api/v1/goods/list */
export async function getGoodsList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      running?: boolean;
      uuid?: string;
      local_path?: string;
      net_addr?: string;
      description?: string;
      args?: string[];
    }[];
  }>('/api/v1/goods/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新扩展 PUT /api/v1/goods/update */
export async function putGoodsUpdate(
  body: {
    uuid: string;
    net_addr: string;
    args: string;
    description?: string;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<Record<string, any>>('/api/v1/goods/update', {
    method: 'PUT',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
