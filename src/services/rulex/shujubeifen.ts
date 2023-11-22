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

/** 上传备份 POST /api/v1/backup/upload */
export async function postBackupUpload(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<{ code: number; msg: string; data: string }>('/api/v1/backup/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
