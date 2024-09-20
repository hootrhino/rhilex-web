import type { ProColumns } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';

export type DataPoint = {
  uuid?: string;
  device_uuid?: string;
  tag?: string;
  alias?: string;
  [key: string]: any;
};

export type DataSheetItem = DataPoint & {
  status: number;
  lastFetchTime: number;
  value: string;
  [key: string]: any;
};

export type DataType = Partial<DataSheetItem>;

export type ValueType = ParamsType;

export type SheetColumnsType = ProColumns<DataType>;
