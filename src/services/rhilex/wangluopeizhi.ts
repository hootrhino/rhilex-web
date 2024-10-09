// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 当前网卡连接 GET /api/v1/settings/connection */
export async function getSettingsConnection(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { device: string; type: string; state: string; connection: string }[];
  }>('/api/v1/settings/connection', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取设置面板支持的设备树 GET /api/v1/settings/ctrlTree */
export async function getSettingsCtrlTree(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      network: { name: string; type: string; status: number }[];
      wlan: { name?: string; type?: string; status?: number }[];
      net4g: { name?: string; type?: string; status?: number }[];
      net5g: { name?: string; type?: string; status?: number }[];
      canbus: { name: string; type: string; status: number }[];
    };
  }>('/api/v1/settings/ctrlTree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取网口参数 GET /api/v1/settings/eth */
export async function getSettingsEth(options?: { [key: string]: any }) {
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
  }>('/api/v1/settings/eth', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置网口参数 POST /api/v1/settings/eth */
export async function postSettingsEth(
  body: {
    interface: string;
    address: string;
    netmask: string;
    gateway: string;
    dns: string[];
    dhcp_enabled: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/settings/eth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取网络状态 GET /api/v1/settings/netStatus */
export async function getSettingsNetStatus(options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: string }>('/api/v1/settings/netStatus', {
    method: 'GET',
    ...(options || {}),
  });
}
