import { SheetType } from '@/utils/enum';

export type Point = {
  uuid?: string;
  device_uuid?: string;
  siemensAddress?: string;
  tag?: string;
  alias?: string;
  dataOrder?: string;
  dataType?: string;
  weight: number;
  frequency?: number;
};

export type PlcSheetItem = Point & {
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
  siemens_data_points: Point[];
};

export type PlcSheetProps = {
  type: SheetType;
  uuid?: string;
};
