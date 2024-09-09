// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除所有点位 DELETE /api/v1/datapoint/delAll */
export async function deleteDatapointDelAll(
  body: {
    device_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datapoint/delAll', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 多行删除 DELETE /api/v1/datapoint/delIds */
export async function deleteDatapointDelIds(
  body: {
    device_uuid: string;
    uuids: string[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datapoint/delIds', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询 GET /api/v1/datapoint/list */
export async function getDatapointList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatapointListParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datapoint/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 点位导出 GET /api/v1/datapoint/sheetExport */
export async function getDatapointSheetExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDatapointSheetExportParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datapoint/sheetExport', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 点位导入 POST /api/v1/datapoint/sheetImport */
export async function postDatapointSheetImport(
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

  return request<Record<string, any>>('/api/v1/datapoint/sheetImport', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 创建或更新点位 # points字段element示例

## Modbus Master
```json
{
    "tag": "tag1",
    "alias": "tag1",
    "frequency": 50,
    "config": {
        "function": 1,
        "slaverId": 1,
        "address": 0,
        "quality": 2,
        "dataType": "INT",
        "dataOrder": "ABCD",
        "weight": 1.0
    }
}
```

## SNMP
```json
{
    "tag": "tag1",
    "alias": "tag1",
    "frequency": 50,
    "config": {
        "oid": "A.B.C"
    }
}
```


## BACnetIP 
```json
{
    "tag": "tag1",
    "alias": "tag1",
    "config": {
        "bacnetDeviceId": 1,
        "objectType": "AO",
        "objectId": 1
    }
}
```

## BACnet Router
```json
{
    "tag": "tag1",
    "alias": "tag1",
    "config": {
        "objectType": "AI",
        "objectId": 1
    }
}
```

## siemens PLC
```json
{
    "tag": "tag1",
    "alias": "tag1",
    "frequency": 100,
    "config": {
        "siemensAddress": "AI",
        "dataBlockType": "FLOAT",
        "dataBlockOrder": "ABCD",
        "weight": 1
    }
}
```
 POST /api/v1/datapoint/update */
export async function postDatapointUpdate(
  body: {
    device_uuid: string;
    points: {
      tag?: string;
      alias?: string;
      frequency?: number;
      config: { bacnetDeviceId: number; objectType: string; objectId: number };
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/datapoint/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
