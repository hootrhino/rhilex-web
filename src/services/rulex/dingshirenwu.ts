// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** /api/v1/crontask/create POST /api/v1/crontask/create */
export async function postCrontaskCreate(
  body: {
    name: string;
    cronExpr: string;
    taskType: number;
    args?: string;
    isRoot?: string;
    env?: string[];
    script: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: number }>('/api/v1/crontask/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** /api/v1/crontask/delete DELETE /api/v1/crontask/delete */
export async function deleteCrontask__openAPI__delete(
  body: {
    id: number;
  },
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
        ID?: number;
        CreatedAt?: string;
        name?: string;
        cronExpr?: string;
        enable?: string;
        taskType?: number;
        command?: string;
        args?: string;
        isRoot?: string;
        workDir?: string;
        env?: string;
        script?: string;
        updatedAt?: string;
      }[];
    };
  }>('/api/v1/crontask/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** /api/v1/crontask/listRunningTask 当前正在运行的任务（是指正在运行的任务，不是指start了的任务） GET /api/v1/crontask/listRunningTask */
export async function getCrontaskListRunningTask(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      current?: number;
      size?: number;
      total?: number;
      records?: {
        ID?: number;
        CreatedAt?: string;
        taskId?: number;
        status?: string;
        ExitCode?: string;
        logPath?: string;
        startTime?: string;
        endTime?: string;
      }[];
    };
  }>('/api/v1/crontask/listRunningTask', {
    method: 'GET',
    ...(options || {}),
  });
}

/** /api/v1/crontask/page 分页获取已创建的定时任务 GET /api/v1/crontask/page */
export async function getCrontaskPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskPageParams,
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
        ID?: number;
        CreatedAt?: string;
        name?: string;
        cronExpr?: string;
        enable?: string;
        taskType?: number;
        command?: string;
        args?: string;
        isRoot?: string;
        workDir?: string;
        env?: string;
        script?: string;
        updatedAt?: string;
      }[];
    };
  }>('/api/v1/crontask/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** /api/v1/crontask/results/page 按时间倒序返回定时任务执行记录 GET /api/v1/crontask/results/page */
export async function getCrontaskResultsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskResultsPageParams,
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
        ID?: number;
        CreatedAt?: string;
        taskId?: number;
        status?: string;
        ExitCode?: string;
        logPath?: string;
        startTime?: string;
        endTime?: string;
      }[];
    };
  }>('/api/v1/crontask/results/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启动任务 启动定时任务 GET /api/v1/crontask/start */
export async function getCrontaskStart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskStartParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: any }>('/api/v1/crontask/start', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 停止任务 将任务停止，不再调度运行。 GET /api/v1/crontask/stop */
export async function getCrontaskStop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskStopParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: any }>('/api/v1/crontask/stop', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** /api/v1/crontask/terminateRunningTask 强行终止指定的正在运行的任务 GET /api/v1/crontask/terminateRunningTask */
export async function getCrontaskTerminateRunningTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrontaskTerminateRunningTaskParams,
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
        ID?: number;
        CreatedAt?: string;
        taskId?: number;
        status?: string;
        ExitCode?: string;
        logPath?: string;
        startTime?: string;
        endTime?: string;
      }[];
    };
  }>('/api/v1/crontask/terminateRunningTask', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** /api/v1/crontask/update 更新任务信息 PUT /api/v1/crontask/update */
export async function putCrontaskUpdate(
  body: {
    id: number;
    name?: string;
    cronExpr?: string;
    taskType?: number;
    args?: string;
    isRoot?: string;
    env?: string[];
    script?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/crontask/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
