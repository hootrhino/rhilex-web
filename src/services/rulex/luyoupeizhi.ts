// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** DHCP配置查看 GET /api/v1/softRouter/dhcp */
export async function getSoftRouterDhcp(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      iface?: string;
      ip?: string;
      gateway?: string;
      network?: string;
      netmask?: string;
      ip_pool_begin?: string;
      ip_pool_end?: string;
      iface_from?: string;
      iface_to?: string;
    };
  }>('/api/v1/softRouter/dhcp', {
    method: 'GET',
    ...(options || {}),
  });
}

/** DHCP配置更新 POST /api/v1/softRouter/dhcp */
export async function postSoftRouterDhcp(
  body: {
    iface: string;
    ip: string;
    gateway: string;
    network: string;
    netmask: string;
    ip_pool_begin: string;
    ip_pool_end: string;
    iface_from: string;
    iface_to: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    iface: string;
    ip: string;
    gateway: string;
    network: string;
    netmask: string;
    ip_pool_begin: string;
    ip_pool_end: string;
    iface_from: string;
    iface_to: string;
  }>('/api/v1/softRouter/dhcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** DHCP客户端列表 GET /api/v1/softRouter/dhcp/clients */
export async function getSoftRouterDhcpClients(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { mac_address?: string; ip_address?: string; hostname?: string }[];
  }>('/api/v1/softRouter/dhcp/clients', {
    method: 'GET',
    ...(options || {}),
  });
}
