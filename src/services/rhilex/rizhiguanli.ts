// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 日志列表 系统日志列表 GET /api/v1/logs */
export async function getLogs(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/logs', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 远程日志操作 系统日志列表 PUT /api/v1/logs/remote */
export async function putLogsRemote(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putLogsRemoteParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/logs/remote', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
