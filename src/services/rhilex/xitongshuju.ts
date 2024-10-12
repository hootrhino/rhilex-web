// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 网卡列表 GET /api/v1/os/netInterfaces */
export async function getOsNetInterfaces(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { name: string; mac: string; addr: string }[];
  }>('/api/v1/os/netInterfaces', {
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

/** 重置度量值 POST /api/v1/os/resetInterMetric */
export async function postOsResetInterMetric(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/os/resetInterMetric', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 开机时间 GET /api/v1/os/startedAt */
export async function getOsStartedAt(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/os/startedAt', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 运行配置 获取首页dashboard数据 GET /api/v1/os/sysConfig */
export async function getOsSysConfig(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      appId: string;
      maxQueueSize: number;
      sourceRestartInterval: number;
      gomaxProcs: number;
      enablePProf: boolean;
      enableConsole: boolean;
      appDebugMode: boolean;
      logLevel: string;
      logPath: string;
      logMaxSize: number;
      logMaxBackups: number;
      logMaxAge: number;
      logCompress: boolean;
      maxKvStoreSize: number;
      maxLostCacheSize: number;
      extLibs: string[];
      dataSchemaSecret: string[];
    };
  }>('/api/v1/os/sysConfig', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 系统参数 获取首页dashboard数据 GET /api/v1/os/system */
export async function getOsSystem(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      hardWareInfo: {
        cpuPercent: number;
        diskInfo: number;
        memPercent: number;
        osArch: string;
        osDist: string;
        osUpTime: string;
        product: string;
        startedAt: string;
        version: string;
      };
      sourceCount: {
        apps: number;
        devices: number;
        goods: number;
        inends: number;
        outends: number;
        plugins: number;
        rules: number;
      };
      statistic: { inSuccess: number; outSuccess: number; inFailed: number; outFailed: number };
    };
  }>('/api/v1/os/system', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 串口列表 GET /api/v1/os/uarts */
export async function getOsUarts(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/os/uarts', {
    method: 'GET',
    ...(options || {}),
  });
}
