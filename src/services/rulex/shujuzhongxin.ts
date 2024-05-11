// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 清空数据 DELETE /api/v1/datacenter/clearSchemaData */
export async function deleteDatacenterClearSchemaData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDatacenterClearSchemaDataParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datacenter/clearSchemaData', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出数据 GET /api/v1/datacenter/exportData */
export async function getDatacenterExportData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatacenterExportDataParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datacenter/exportData', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 仓库列表 GET /api/v1/datacenter/listSchemaDDL */
export async function getDatacenterListSchemaDdl(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; published?: boolean; name?: string; description?: string }[];
  }>('/api/v1/datacenter/listSchemaDDL', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 历史数据查询 GET /api/v1/datacenter/queryDataList */
export async function getDatacenterQueryDataList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatacenterQueryDataListParams,
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
        humi: number;
        id: number;
        msg: string;
        schema_id: string;
        status: boolean;
        temp: number;
        ts: number;
      }[];
    };
  }>('/api/v1/datacenter/queryDataList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询最新数据 GET /api/v1/datacenter/queryLastData */
export async function getDatacenterQueryLastData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatacenterQueryLastDataParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datacenter/queryLastData', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取数据字段定义 GET /api/v1/datacenter/schemaDDLDefine */
export async function getDatacenterSchemaDdlDefine(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatacenterSchemaDDLDefineParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { name: string; type: string; defaultValue: number }[];
  }>('/api/v1/datacenter/schemaDDLDefine', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 仓库结构 GET /api/v1/datacenter/schemaDDLDetail */
export async function getDatacenterSchemaDdlDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatacenterSchemaDDLDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { name: string; type: string; uuid: string; unit: string }[];
  }>('/api/v1/datacenter/schemaDDLDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
