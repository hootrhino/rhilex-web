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

export type SnmpDataSheetItem = Point & {
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
  snmp_oids: Point[];
};

export type SnmpOidsSheetProps = {
  type: SheetType;
  uuid?: string;
};
