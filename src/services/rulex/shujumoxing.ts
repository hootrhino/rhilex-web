// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建模型 POST /api/v1/schema/create */
export async function postSchemaCreate(
  body: {
    name: string;
    description?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/schema/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除模型 DELETE /api/v1/schema/del */
export async function deleteSchemaDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSchemaDelParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/schema/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 模型详情 GET /api/v1/schema/detail */
export async function getSchemaDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSchemaDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { uuid: string; name: string; description: string };
  }>('/api/v1/schema/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 模型列表 GET /api/v1/schema/list */
export async function getSchemaList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { uuid?: string; published?: boolean; name?: string; description?: string }[];
  }>('/api/v1/schema/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建属性 POST /api/v1/schema/properties/create */
export async function postSchemaPropertiesCreate(
  body: {
    schemaId: string;
    label: string;
    name: string;
    type: string;
    rw: string;
    unit: string;
    rule: {
      defaultValue: string;
      max: number;
      min: number;
      trueLabel: string;
      falseLabel: string;
      round: number;
    };
    description?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>(
    '/api/v1/schema/properties/create',
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

/** 删除属性 DELETE /api/v1/schema/properties/del */
export async function deleteSchemaPropertiesDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSchemaPropertiesDelParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/schema/properties/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 属性详情 GET /api/v1/schema/properties/detail */
export async function getSchemaPropertiesDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSchemaPropertiesDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid: string;
      schemaId: string;
      label: string;
      name: string;
      description: string;
      type: string;
      rw: string;
      unit: string;
      rule: {
        defaultValue: string;
        max: number;
        min: number;
        trueLabel: string;
        falseLabel: string;
        round: number;
      };
    };
  }>('/api/v1/schema/properties/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 属性列表 GET /api/v1/schema/properties/list */
export async function getSchemaPropertiesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSchemaPropertiesListParams,
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
        schemaId?: string;
        label?: string;
        name?: string;
        description?: string;
        type?: string;
        rw?: string;
        unit?: string;
        rule: {
          defaultValue: string;
          max: number;
          min: number;
          trueLabel: string;
          falseLabel: string;
          round: number;
        };
      }[];
    };
  }>('/api/v1/schema/properties/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新属性 PUT /api/v1/schema/properties/update */
export async function putSchemaPropertiesUpdate(
  body: {
    uuid: string;
    schemaId: string;
    label: string;
    name: string;
    type: string;
    rw: string;
    unit: string;
    rule: {
      defaultValue: string;
      max: number;
      min: number;
      trueLabel: string;
      falseLabel: string;
      round: number;
    };
    description?: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/schema/properties/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发布模型 POST /api/v1/schema/publish */
export async function postSchemaPublish(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSchemaPublishParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/schema/publish', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新模型 PUT /api/v1/schema/update */
export async function putSchemaUpdate(
  body: {
    uuid: string;
    name: string;
    description?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/schema/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
