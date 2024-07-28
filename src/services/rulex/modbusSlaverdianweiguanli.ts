// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查看点位表 GET /api/v1/modbus_slaver_sheet/list */
export async function getModbusSlaverSheetList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getModbusSlaverSheetListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      current: number;
      size: number;
      total: number;
      records: { uuid: string; type: number; address: number; value: string }[];
    };
  }>('/api/v1/modbus_slaver_sheet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
