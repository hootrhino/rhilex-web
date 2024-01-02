// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建模型 POST /api/v1/schema/create */
export async function postSchemaCreate(
  body: {
    name: string;
    schema: {
      iotProperties?: {
        label?: string;
        name?: string;
        description?: string;
        type?: string;
        rw?: string;
        unit?: string;
        rule: {
          defaultValue?: number;
          max?: number;
          min?: number;
          round?: number;
          trueLabel?: string;
          falseLabel?: string;
        };
      }[];
    };
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
    data: {
      uuid?: string;
      name?: string;
      schema: {
        iotProperties?: {
          label?: string;
          name?: string;
          description?: string;
          type?: string;
          rw?: string;
          unit?: string;
          rule: {
            defaultValue?: number;
            max?: number;
            min?: number;
            round?: number;
            trueLabel?: string;
            falseLabel?: string;
          };
        }[];
      };
    };
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
    data: {
      uuid?: string;
      name?: string;
      schema: {
        iotProperties?: {
          label?: string;
          name?: string;
          description?: string;
          type?: string;
          rw?: string;
          unit?: string;
          rule: {
            defaultValue?: number;
            max?: number;
            min?: number;
            round?: number;
            trueLabel?: string;
            falseLabel?: string;
          };
        }[];
      };
    }[];
  }>('/api/v1/schema/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新模型 PUT /api/v1/schema/update */
export async function putSchemaUpdate(
  body: {
    uuid: string;
    name: string;
    schema: {
      iotProperties?: {
        label?: string;
        name?: string;
        description?: string;
        type?: string;
        rw?: string;
        unit?: string;
        rule: {
          defaultValue?: number;
          max?: number;
          min?: number;
          round?: number;
          trueLabel?: string;
          falseLabel?: string;
        };
      }[];
    };
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/schema/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
