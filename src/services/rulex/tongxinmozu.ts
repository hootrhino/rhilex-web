// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送指令 POST /api/v1/transceiver/ctrl */
export async function postTransceiverCtrl(
  body: {
    name: string;
    cmd: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/transceiver/ctrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通信模组列表 GET /api/v1/transceiver/list */
export async function getTransceiverList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { name?: string; model?: string; type?: number; status?: number; vendor?: string }[];
  }>('/api/v1/transceiver/list', {
    method: 'GET',
    ...(options || {}),
  });
}
