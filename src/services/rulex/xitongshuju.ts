// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 系统参数 获取首页dashboard数据 GET /api/v1/system */
export async function getSystem(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      hardWareInfo: {
        allocMem?: number;
        cpuPercent?: number;
        diskInfo?: number;
        osArch?: string;
        startedTime?: string;
        systemMem?: number;
        totalMem?: number;
        version?: string;
      };
      sourceCount: { inends?: number; outends?: number; plugins?: number; rules?: number };
      statistic: { inSuccess?: number; outSuccess?: number; inFailed?: number; outFailed?: number };
    };
  }>('/api/v1/system', {
    method: 'GET',
    ...(options || {}),
  });
}
