// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Shelly设备详情 GET /api/v1/shelly_gen1/detail */
export async function getShellyGen1Detail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShellyGen1DetailParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/shelly_gen1/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Shelly设备列表 GET /api/v1/shelly_gen1/list */
export async function getShellyGen1List(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShellyGen1ListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      ip?: string;
      name?: string;
      id?: string;
      mac?: string;
      slot?: number;
      model?: string;
      gen?: number;
      fw_id?: string;
      ver?: string;
      app?: string;
      auth_en?: boolean;
      auth_domain?: null;
      input?: { id: number; status: boolean }[];
      switch?: {
        id?: number;
        source?: string;
        output?: boolean;
        temperature: { tC: number; tF: number };
      }[];
    }[];
  }>('/api/v1/shelly_gen1/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 移除WebHook POST /api/v1/shelly_gen1/pro1/configWebHook */
export async function postShellyGen1Pro1ConfigWebHook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postShellyGen1Pro1ConfigWebHookParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>(
    '/api/v1/shelly_gen1/pro1/configWebHook',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Pro1拨动开关 GET /api/v1/shelly_gen1/pro1/switch1/toggle */
export async function getShellyGen1Pro1Switch1Toggle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShellyGen1Pro1Switch1ToggleParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { was_on: boolean } }>(
    '/api/v1/shelly_gen1/pro1/switch1/toggle',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Shelly设备扫描 POST /api/v1/shelly_gen1/scan */
export async function postShellyGen1Scan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postShellyGen1ScanParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/shelly_gen1/scan', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Shelly设备状态 GET /api/v1/shelly_gen1/status */
export async function getShellyGen1Status(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShellyGen1StatusParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      mac: string;
      restart_required: boolean;
      time: string;
      unixtime: number;
      uptime: number;
      ram_size: number;
      ram_free: number;
      fs_size: number;
      fs_free: number;
      cfg_rev: number;
      kvs_rev: number;
      schedule_rev: number;
      webhook_rev: number;
      available_updates: { stable: { version: string } };
    };
  }>('/api/v1/shelly_gen1/status', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
