// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** DHCP设置 POST /api/v1/softRouter/dhcp */
export async function postSoftRouterDhcp(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/softRouter/dhcp', {
    method: 'POST',
    ...(options || {}),
  });
}

/** DHCP参数获取 GET /api/v1/softRouter/dhcpClients */
export async function getSoftRouterDhcpClients(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/softRouter/dhcpClients', {
    method: 'GET',
    ...(options || {}),
  });
}
