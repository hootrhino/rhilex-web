import { SheetType } from '@/utils/enum';

export type Point = {
  uuid?: string;
  device_uuid?: string;
  tag?: string;
  alias?: string;
  function?: number;
  slaverId?: number;
  address?: number;
  frequency?: number;
  quantity?: number;
  dataType: string;
  dataOrder: string;
  weight: number;
};

export type ModbusDataSheetItem = Point & {
  id?: number;
  created_at?: string;
  status: number;
  lastFetchTime: number;
  value: string;
  [key: string]: any;
};

export type removeParams = {
  device_uuid: string;
  uuids: string[];
};

export type UpdateParams = {
  device_uuid: string;
  modbus_data_points: Point[];
};

export type ModbusDataSheetProps = {
  uuid?: string;
  type: SheetType;
};
