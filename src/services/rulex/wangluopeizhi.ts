// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 当前网卡连接 GET /api/v1/settings/connection */
export async function getSettingsConnection(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { device?: string; type?: string; state?: string; connection?: string }[];
  }>('/api/v1/settings/connection', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取ETH0网口参数 GET /api/v1/settings/eth */
export async function getSettingsEth(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      eth0: {
        interface?: string;
        address?: string;
        netmask?: string;
        gateway?: string;
        dns?: string[];
        dhcp_enabled?: boolean;
      };
      eth1: {
        interface?: string;
        address?: string;
        netmask?: string;
        gateway?: string;
        dns?: string[];
        dhcp_enabled?: boolean;
      };
    };
  }>('/api/v1/settings/eth', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置ETH0网口参数 POST /api/v1/settings/eth */
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

/** 获取网络详情 GET /api/v1/settings/netDetails */
export async function getSettingsNetDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSettingsNetDetailsParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      device?: string;
      type?: string;
      hwAddr?: string;
      mtu?: number;
      state?: string;
      connection?: string;
      carrier?: string;
      ipv4Addr?: string;
      ipv4Gateway?: string;
      ipv4Dns?: string;
      ipv6Addr?: string;
      ipv6Gateway?: string;
    };
  }>('/api/v1/settings/netDetails', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取网络状态 GET /api/v1/settings/netStatus */
export async function getSettingsNetStatus(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { device?: string; type?: string; state?: string; connection?: string }[];
  }>('/api/v1/settings/netStatus', {
    method: 'GET',
    ...(options || {}),
  });
}
