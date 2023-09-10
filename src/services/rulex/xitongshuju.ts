// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 网卡列表 GET /api/v1/os/netInterfaces */
export async function getOsNetInterfaces(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/os/netInterfaces', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 系统发行 GET /api/v1/os/osRelease */
export async function getOsOsRelease(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/os/osRelease', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 开机时间 GET /api/v1/os/startedAt */
export async function getOsStartedAt(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/os/startedAt', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 串口列表 GET /api/v1/os/uarts */
export async function getOsUarts(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/os/uarts', {
    method: 'GET',
    ...(options || {}),
  });
}

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
        ip?: string[];
        wsUrl?: string[];
      };
      sourceCount: { inends?: number; outends?: number; plugins?: number; rules?: number };
      statistic: { inSuccess?: number; outSuccess?: number; inFailed?: number; outFailed?: number };
    };
  }>('/api/v1/system', {
    method: 'GET',
    ...(options || {}),
  });
}
