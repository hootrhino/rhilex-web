// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建设备 POST /api/v1/devices/create */
export async function postDevicesCreate(
  body: {
    name: string;
    type: string;
    schemaId: string;
    gid: string;
    config: { host: string; port: number };
    description: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/devices/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除设备 DELETE /api/v1/devices/del */
export async function deleteDevicesDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDevicesDelParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/devices/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设备详情 设备列表 GET /api/v1/devices/detail */
export async function getDevicesDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDevicesDetailParams,
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
      schemaId: string;
      state: number;
      config: Record<string, any>;
      description: string;
    };
  }>('/api/v1/devices/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设备异常信息 GET /api/v1/devices/deviceErrMsg */
export async function getDevicesDeviceErrMsg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDevicesDeviceErrMsgParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/devices/deviceErrMsg', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取设备的分组列表 GET /api/v1/devices/group */
export async function getDevicesGroup(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; name?: string; type?: string; parent?: string }[];
  }>('/api/v1/devices/group', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设备不带分组列表 设备列表 GET /api/v1/devices/list */
export async function getDevicesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDevicesListParams,
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
        schemaId?: string;
        state?: number;
        errMsg?: string;
        config: {
          commonConfig: {
            autoRequest: boolean;
            enableOptimize: boolean;
            maxRegNum: number;
            mode: string;
          };
          portUuid: string;
        };
        description?: string;
      }[];
    };
  }>('/api/v1/devices/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设备带分组列表 设备列表 GET /api/v1/devices/listByGroup */
export async function getDevicesListByGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDevicesListByGroupParams,
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
        uuid: string;
        gid: string;
        name: string;
        type: string;
        schemaId: string;
        state: number;
        config: Record<string, any>;
        description?: string;
      }[];
    };
  }>('/api/v1/devices/listByGroup', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 点位异常信息 GET /api/v1/devices/pointErrMsg */
export async function getDevicesPointErrMsg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDevicesPointErrMsgParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/devices/pointErrMsg', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设备的物模型属性 GET /api/v1/devices/properties */
export async function getDevicesProperties(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDevicesPropertiesParams,
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
        label?: string;
        name?: string;
        description?: string;
        type?: string;
        rw?: string;
        unit?: string;
        value?: string;
      }[];
    };
  }>('/api/v1/devices/properties', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 重启设备 PUT /api/v1/devices/restart */
export async function putDevicesRestart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putDevicesRestartParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/devices/restart', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新设备 PUT /api/v1/devices/update */
export async function putDevicesUpdate(
  body: {
    uuid: string;
    name: string;
    type: string;
    schemaId: string;
    gid: string;
    description: string;
    config: { host: string; port: number };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/devices/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据设备ID查规则列表 GET /api/v1/rules/byDevice */
export async function getRulesByDevice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRulesByDeviceParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/rules/byDevice', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
