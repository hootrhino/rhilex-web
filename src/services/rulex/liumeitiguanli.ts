// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取详情 GET /api/v1/jpeg_stream/detail */
export async function getJpegStreamDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getJpegStreamDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      type?: string;
      liveId?: string;
      pulled?: boolean;
      resolution: { width?: number; height?: number };
    };
  }>('/api/v1/jpeg_stream/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前所有的流 GET /api/v1/jpeg_stream/list */
export async function getJpegStreamList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/jpeg_stream/list', {
    method: 'GET',
    ...(options || {}),
  });
}
