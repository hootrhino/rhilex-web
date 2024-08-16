type TplVariables = {
  name?: string;
  type?: TplDataType;
  label?: string;
  value?: number | string;
  dataSource?: TplDataSource;
  hideInForm?: boolean;
};

type baseTplItem = {
  label?: string;
  apply?: string;
  type?: string;
  detail?: string;
  gid?: string;
  uuid?: string;
  variables?: TplVariables[];
};

// 代码模板
export type TplItem = baseTplItem & {
  usage?: baseTplItem;
};

export type TplGroupItem = {
  uuid: string;
  name: string;
  children: TplItem[];
};

export type ValConfig = {
  open: boolean;
  data: TplItem;
};
