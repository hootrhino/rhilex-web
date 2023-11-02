// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** DHCP参数获取 GET /api/v1/softRouter/dhcpClients */
export async function getSoftRouterDhcpClients(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/softRouter/dhcpClients', {
    method: 'GET',
    ...(options || {}),
  });
}
