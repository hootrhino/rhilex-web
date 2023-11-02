// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取最新配置 GET /api/v1/site/detail */
export async function getSiteDetail(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { siteName?: string; logo?: string; appName?: string };
  }>('/api/v1/site/detail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取Logo GET /api/v1/site/logo */
export async function getSiteLogo(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/site/logo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 上传logo POST /api/v1/site/logo */
export async function postSiteLogo(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<Record<string, any>>('/api/v1/site/logo', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 更新最新站点配置 PUT /api/v1/site/update */
export async function putSiteUpdate(
  body: {
    siteName: string;
    logo: string;
    appName: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/site/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
