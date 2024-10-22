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

export type DataSheetItem = Point & {
  status: number;
  lastFetchTime: number;
  value: string;
  [key: string]: any;
};

export type DataSheetProps = ProTableProps & {
  defaultConfig: Record<string, any>;
  defaultUploadData: Record<string, any>;
  remove: (uuids: string[]) => void;
  update: (points: Point[]) => void;
  upload: (file: File) => void;
};

export type BaseDataSheetProps = {
  uuid?: string;
};

/**
 * 导入
 */
export type UploadParams = {
  device_uuid: string;
  file: File;
};
