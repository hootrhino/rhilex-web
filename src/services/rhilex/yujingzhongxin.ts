// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除预警日志 DELETE /api/v1/alarm_log/del */
export async function deleteAlarmLogDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAlarmLogDelParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/alarm_log/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 预警日志详情 GET /api/v1/alarm_log/detail */
export async function getAlarmLogDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlarmLogDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid: string;
      ruleId: string;
      source: string;
      eventType: string;
      ts: number;
      summary: string;
      info: string;
    };
  }>('/api/v1/alarm_log/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 预警日志列表 GET /api/v1/alarm_log/list */
export async function getAlarmLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlarmLogListParams,
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
        ruleId: string;
        source: string;
        eventType: string;
        ts: number;
        summary: string;
        info: string;
      }[];
    };
  }>('/api/v1/alarm_log/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 POST /api/v1/alarm_rule/create */
export async function postAlarmRuleCreate(
  body: {
    name: string;
    interval: number;
    threshold: number;
    description?: string;
    handleId: string;
    exprDefine: { eventType?: string; expr?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/alarm_rule/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/v1/alarm_rule/del */
export async function deleteAlarmRuleDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAlarmRuleDelParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/alarm_rule/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 规则详情 GET /api/v1/alarm_rule/detail */
export async function getAlarmRuleDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlarmRuleDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uuid: string;
      name: string;
      exprDefine: { expr?: string; eventType?: string }[];
      interval: number;
      threshold: number;
      handleId: string;
      description: string;
    };
  }>('/api/v1/alarm_rule/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 规则列表 GET /api/v1/alarm_rule/list */
export async function getAlarmRuleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlarmRuleListParams,
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
        name?: string;
        exprDefine?: { expr?: string; eventType?: string }[];
        interval?: number;
        threshold?: number;
        handleId?: string;
        description?: string;
      }[];
    };
  }>('/api/v1/alarm_rule/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 规则测试 POST /api/v1/alarm_rule/testRule */
export async function postAlarmRuleTestRule(
  body: {
    expr: string;
    data: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/alarm_rule/testRule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/v1/alarm_rule/update */
export async function putAlarmRuleUpdate(
  body: {
    uuid: string;
    name: string;
    interval: number;
    threshold: number;
    handleId: string;
    description?: string;
    exprDefine: { expr?: string; eventType?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/alarm_rule/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
