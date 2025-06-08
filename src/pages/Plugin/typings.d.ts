export type PluginItem = {
  name: string;
  version: string;
  uuid: PluginUUID;
  [key: string]: any;
};

export type PluginConfig = {
  open: boolean;
  name: PluginName | undefined;
  title: string;
  args?: any;
};

export type PluginParams = {
  uuid: string;
  name: string;
  args: any;
};

export type DetailParams = {
  name: PluginName;
  titleId: string;
  args?: any;
};

export type ClientItem = {
  id: string;
  username: string;
  remote: string;
  cleanSession: boolean;
  [key: string]: any;
};
