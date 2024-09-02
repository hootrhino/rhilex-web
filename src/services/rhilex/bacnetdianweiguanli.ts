// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** delAll DELETE /api/v1/bacnetip_data_sheet/delAll */
export async function deleteBacnetipDataSheetDelAll(
  body: {
    device_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/bacnetip_data_sheet/delAll', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delIds DELETE /api/v1/bacnetip_data_sheet/delIds */
export async function deleteBacnetipDataSheetDelIds(
  body: {
    uuids: string[];
    device_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/bacnetip_data_sheet/delIds', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** page GET /api/v1/bacnetip_data_sheet/list */
export async function getBacnetipDataSheetList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBacnetipDataSheetListParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/bacnetip_data_sheet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** export GET /api/v1/bacnetip_data_sheet/sheetExport */
export async function getBacnetipDataSheetSheetExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBacnetipDataSheetSheetExportParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/bacnetip_data_sheet/sheetExport', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** import POST /api/v1/bacnetip_data_sheet/sheetImport */
export async function postBacnetipDataSheetSheetImport(
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

  return request<Record<string, any>>('/api/v1/bacnetip_data_sheet/sheetImport', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** createOrupdate POST /api/v1/bacnetip_data_sheet/update */
export async function postBacnetipDataSheetUpdate(
  body: {
    device_uuid: string;
    points: {
      uuid?: string;
      tag?: string;
      alias?: string;
      bacnetDeviceId?: number;
      objectType?: string;
      objectId?: number;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/bacnetip_data_sheet/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
