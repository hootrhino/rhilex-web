// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取WIFI配置 GET /api/v1/settings/wifi */
export async function getSettingsWifi(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { wlan0: { interface: string; ssid: string; password: string; security: string } };
  }>('/api/v1/settings/wifi', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置WIFI参数 POST /api/v1/settings/wifi */
export async function postSettingsWifi(
  body: {
    interface: string;
    ssid: string;
    password: string;
    security: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/settings/wifi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新DNS GET /api/v1/settings/wifi/refreshDNS */
export async function getSettingsWifiRefreshDns(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      eth0: {
        interface: string;
        address: string;
        netmask: string;
        gateway: string;
        dns: string[];
        dhcp_enabled: boolean;
      };
      eth1: {
        interface: string;
        address: string;
        netmask: string;
        gateway: string;
        dns: string[];
        dhcp_enabled: boolean;
      };
    };
  }>('/api/v1/settings/wifi/refreshDNS', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 扫描WIFI GET /api/v1/settings/wifi/scan */
export async function getSettingsWifiScan(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[] }>('/api/v1/settings/wifi/scan', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 扫描WIFI信号强度 GET /api/v1/settings/wifi/scanSignal */
export async function getSettingsWifiScanSignal(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string[][] }>(
    '/api/v1/settings/wifi/scanSignal',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
