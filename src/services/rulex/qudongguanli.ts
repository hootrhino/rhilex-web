// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 驱动列表 GET /api/v1/drivers */
export async function getDrivers(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/drivers', {
    method: 'GET',
    ...(options || {}),
  });
}
