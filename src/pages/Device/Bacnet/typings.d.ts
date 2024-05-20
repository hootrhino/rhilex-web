import { SheetType } from '@/utils/enum';

export type Point = {
  uuid?: string;
  device_uuid?: string;
  tag?: string;
  alias?: string;
  bacnetDeviceId?: number;
  objectType?: string;
  objectId?: number;
};

export type BacnetDataSheetItem = Point & {
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
  points: Point[];
};

export type BacnetDataSheetProps = {
  uuid?: string;
  type: SheetType;
};
