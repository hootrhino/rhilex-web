// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取配置菜单 GET /api/v1/menu/distConfig */
export async function getMenuDistConfig(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { id: number; key: string; access: boolean }[];
  }>('/api/v1/menu/distConfig', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取主菜单 GET /api/v1/menu/main */
export async function getMenuMain(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { id: number; key: string; access: boolean }[];
  }>('/api/v1/menu/main', {
    method: 'GET',
    ...(options || {}),
  });
}
