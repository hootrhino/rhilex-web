export type Point = {
  uuid?: string;
  device_uuid?: string;
  tag?: string;
  alias?: string;
  [key: string]: any;
};

export type removeParams = {
  device_uuid: string;
  uuids: string[];
};

export type DataSheetItem = Point & {
  status: number;
  lastFetchTime: number;
  value: string;
  [key: string]: any;
};

export type DataSheetProps = ProTableProps & {
  type: SheetType;
  defaultConfig: Record<string, any>;
  defaultUploadData: Record<string, any>;
  remove: (uuids: string[]) => void;
  update: (points: Point[]) => void;
  upload: (file: File) => void;
  download: () => void;
};
