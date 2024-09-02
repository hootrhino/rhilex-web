// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查看寄存器表 GET /api/v1/modbus_slaver_sheet/list */
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
      records: {
        uuid: string;
        addressCoils: number;
        valueCoils: string;
        addressDiscrete: number;
        valueDiscrete: string;
        addressHolding: number;
        valueHolding: string;
        addressInput: number;
        valueInput: string;
      }[];
    };
  }>('/api/v1/modbus_slaver_sheet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
