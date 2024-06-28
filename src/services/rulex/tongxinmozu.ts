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
  return request<{
    code: number;
    msg: string;
    data: { name: string; cmd: string; result: string };
  }>('/api/v1/transceiver/ctrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取详情 GET /api/v1/transceiver/detail */
export async function getTransceiverDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransceiverDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      name: string;
      model: string;
      type: number;
      vendor: string;
      mac: string;
      firmware: string;
      status: number;
      errMsg: string;
    };
  }>('/api/v1/transceiver/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 通信模组列表 GET /api/v1/transceiver/list */
export async function getTransceiverList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      name: string;
      model: string;
      type: number;
      vendor: string;
      mac: string;
      firmware: string;
      status: number;
      errMsg: null;
    }[];
  }>('/api/v1/transceiver/list', {
    method: 'GET',
    ...(options || {}),
  });
}
