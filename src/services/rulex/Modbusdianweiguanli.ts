// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 多行删除 DELETE /api/v1/modbus_data_sheet/delIds */
export async function deleteModbusDataSheetDelIds(
  body: {
    device_uuid: string;
    uuids: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>(
    '/api/v1/modbus_data_sheet/delIds',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 分页查看点位表 GET /api/v1/modbus_data_sheet/list */
export async function getModbusDataSheetList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getModbusDataSheetListParams,
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
        device_uuid: string;
        tag: string;
        alias: string;
        function: number;
        slaverId: number;
        address: number;
        frequency: number;
        quantity: number;
        dataType: string;
        dataOrder: string;
        weight: number;
        status: number;
        lastFetchTime: number;
        value: string;
        errMsg: string;
      }[];
    };
  }>('/api/v1/modbus_data_sheet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出点表 GET /api/v1/modbus_data_sheet/sheetExport */
export async function getModbusDataSheetSheetExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getModbusDataSheetSheetExportParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/modbus_data_sheet/sheetExport', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入点位表 POST /api/v1/modbus_data_sheet/sheetImport */
export async function postModbusDataSheetSheetImport(
  body: {
    device_uuid: string;
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
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<Record<string, any>>('/api/v1/modbus_data_sheet/sheetImport', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 更新点位表 POST /api/v1/modbus_data_sheet/update */
export async function postModbusDataSheetUpdate(
  body: {
    device_uuid: string;
    modbus_data_points: {
      uuid?: string;
      device_uuid?: string;
      tag?: string;
      alias?: string;
      function?: number;
      slaverId?: number;
      address?: number;
      frequency?: number;
      quantity?: number;
      dataType: string;
      dataOrder: string;
      weight: number;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>(
    '/api/v1/modbus_data_sheet/update',
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
