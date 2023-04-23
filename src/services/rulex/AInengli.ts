// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** AI能力列表 GET /api/v1/aibase */
export async function getAibase(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/aibase', {
    method: 'GET',
    ...(options || {}),
  });
}
