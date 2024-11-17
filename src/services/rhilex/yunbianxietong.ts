// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 云边协同异常信息 GET /api/v1/cecollas/cecollaErrMsg */
export async function getCecollasCecollaErrMsg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCecollasCecollaErrMsgParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/cecollas/cecollaErrMsg', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取物模型 GET /api/v1/cecollas/cecollaSchema */
export async function getCecollasCecollaSchema(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCecollasCecollaSchemaParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      gatewaySchema: {
        properties: { id: string; name: string; mode: string; type: string; mapping: null }[];
        events: null;
        actions: null;
      };
      subDeviceSchema: { properties: null; events: null; actions: null };
    };
  }>('/api/v1/cecollas/cecollaSchema', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建云边协同 POST /api/v1/cecollas/create */
export async function postCecollasCreate(
  body: {
    name: string;
    type: string;
    gid: string;
    config: Record<string, any>;
    description: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/cecollas/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除云边协同 DELETE /api/v1/cecollas/del */
export async function deleteCecollasDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCecollasDelParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/cecollas/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 云边协同详情 设备列表 GET /api/v1/cecollas/detail */
export async function getCecollasDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCecollasDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid: string;
      gid: string;
      name: string;
      type: string;
      state: number;
      config: Record<string, any>;
      description: string;
    };
  }>('/api/v1/cecollas/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 云边协同列表 设备列表 GET /api/v1/cecollas/listByGroup */
export async function getCecollasListByGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCecollasListByGroupParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      current: number;
      size: number;
      total: number;
      records: {
        uuid?: string;
        gid?: string;
        name?: string;
        type?: string;
        action?: string;
        state?: number;
        errMsg?: string;
        config: {
          deviceName: string;
          devicePsk: string;
          mode: string;
          productId: string;
          serverEndpoint: string;
          subProduct: string;
        };
        description?: string;
      }[];
    };
  }>('/api/v1/cecollas/listByGroup', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 重启云边协同 PUT /api/v1/cecollas/restart */
export async function putCecollasRestart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putCecollasRestartParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/cecollas/restart', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新云边协同 PUT /api/v1/cecollas/update */
export async function putCecollasUpdate(
  body: {
    uuid: string;
    name: string;
    type: string;
    gid: string;
    description: string;
    config: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/cecollas/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新Action PUT /api/v1/cecollas/updateAction */
export async function putCecollasUpdateAction(
  body: {
    uuid: string;
    action: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/cecollas/updateAction', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
