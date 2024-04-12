// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 备份数据 GET /api/v1/backup/download */
export async function getBackupDownload(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/backup/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 运行日志 GET /api/v1/backup/runningLog */
export async function getBackupRunningLog(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/backup/runningLog', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 运行快照 GET /api/v1/backup/snapshot */
export async function getBackupSnapshot(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/backup/snapshot', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 上传备份 POST /api/v1/backup/upload */
export async function postBackupUpload(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<{ code: number; msg: string; data: string }>('/api/v1/backup/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
