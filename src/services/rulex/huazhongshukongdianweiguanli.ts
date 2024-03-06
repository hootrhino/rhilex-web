// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 多行删除 DELETE /api/v1/hnc8_data_sheet/delIds */
export async function deleteHnc8DataSheetDelIds(
  body: {
    device_uuid: string;
    uuids: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/hnc8_data_sheet/delIds', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查看点位表 GET /api/v1/hnc8_data_sheet/list */
export async function getHnc8DataSheetList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHnc8DataSheetListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      current?: number;
      size?: number;
      total?: number;
      records?: {
        uuid?: string;
        device_uuid?: string;
        name?: string;
        alias?: string;
        apiFunction?: string;
        group?: number;
        address?: string;
        status?: number;
        lastFetchTime?: number;
        value?: string;
      }[];
    };
  }>('/api/v1/hnc8_data_sheet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出点表 GET /api/v1/hnc8_data_sheet/sheetExport */
export async function getHnc8DataSheetSheetExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHnc8DataSheetSheetExportParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/hnc8_data_sheet/sheetExport', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入点位表 POST /api/v1/hnc8_data_sheet/sheetImport */
export async function postHnc8DataSheetSheetImport(
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
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<{ code: number; msg: string; data: string[] }>(
    '/api/v1/hnc8_data_sheet/sheetImport',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 更新点位表 POST /api/v1/hnc8_data_sheet/update */
export async function postHnc8DataSheetUpdate(
  body: {
    device_uuid: string;
    Hnc8_data_points: {
      uuid?: string;
      device_uuid?: string;
      name?: string;
      alias?: string;
      apiFunction?: string;
      group?: number;
      address?: string;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/hnc8_data_sheet/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
