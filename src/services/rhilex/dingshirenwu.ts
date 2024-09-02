// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建定时任务 POST /api/v1/crontask/create */
export async function postCrontaskCreate(
  body: API.CronTaskCreateDTO,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/v1/crontask/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除定时任务 DELETE /api/v1/crontask/del */
export async function deleteCrontaskDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCrontaskDelParams,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/v1/crontask/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有定时任务 GET /api/v1/crontask/list */
export async function getCrontaskList(options?: { [key: string]: any }) {
  return request<API.R>('/api/v1/crontask/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取定时任务执行结果 GET /api/v1/crontask/results/page */
export async function getCrontaskResultsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskResultsPageParams,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/v1/crontask/results/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启动定时任务 GET /api/v1/crontask/start */
export async function getCrontaskStart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskStartParams,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/v1/crontask/start', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 停止定时任务 GET /api/v1/crontask/stop */
export async function getCrontaskStop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskStopParams,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/v1/crontask/stop', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新定时任务 PUT /api/v1/crontask/update */
export async function putCrontaskUpdate(
  body: API.CronTaskUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/v1/crontask/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
