// 代码模板
export type TplItem = {
  label?: string;
  apply?: string;
  type?: string;
  detail?: string;
  gid?: string;
  uuid?: string;
  [key: string]: any;
};

export type TplGroupItem = {
  uuid: string;
  name: string;
};

export type ValConfig = {
  open: boolean;
  data: TplItem;
};
