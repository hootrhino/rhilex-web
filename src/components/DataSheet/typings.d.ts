export type Point = {
  uuid?: string;
  device_uuid?: string;
  tag?: string;
  alias?: string;
  [key: string]: any;
};

/**
 * 删除点位表
 */
export type removeParams = {
  device_uuid: string;
  uuids: string[];
};

/**
 * 更新点位表
 */
export type UpdateParams<T = Point> = {
  device_uuid: string;
  data_points: T[];
};

export type DataSheetValue = string | number | boolean;

export type DataSheetItem = Point & {
  status: number;
  lastFetchTime: number;
  value: DataSheetValue[];
  [key: string]: any;
};

export type DataSheetProps = ProTableProps & {
  isDetail?: boolean;
  defaultConfig: Record<string, any>;
  defaultUploadData: Record<string, any>;
  remove: (uuids: string[]) => void;
  update: (points: Point[]) => void;
  upload: (file: File) => void;
};

export type BaseDataSheetProps = {
  isDetail?: boolean;
};

/**
 * 导入
 */
export type UploadParams = {
  device_uuid: string;
  file: File;
};
