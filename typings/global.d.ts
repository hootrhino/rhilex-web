export {};

declare global {
  declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

  interface Window {
    __POWERED_BY_QIANKUN__: boolean | undefined;
  }

  type TplVariables = {
    name?: string;
    type?: string;
    label?: string;
    value?: any;
  };

  // 代码模板
  type TplItem = {
    label?: string;
    apply?: string;
    type?: string;
    detail?: string;
    gid?: string;
    uuid?: string;
    variables?: TplVariables[];
  };

  type TplGroupItem = {
    uuid: string;
    name: string;
    children: TplItem[];
  };

  // 公共弹窗配置
  type BaseConfig = {
    open: boolean;
  }

  type DetailModalConfig = BaseConfig & {
    uuid: string;
  }

  type DetailLogModalConfig = BaseConfig & {
    type: 'detail' | 'log';
    uuid: string;
  }

  type RemoveModalConfig = BaseConfig & {
    content: string;
  }

  type QuickStyleConfig = BaseConfig & {
    title: string;
  }

  type GroupConfig = BaseConfig & {
    title: string;
    type: 'edit' | 'new';
  }

  // 其他
  type Option = {
    label: string;
    value: string;
  };

  type RecordKey = React.Key | React.Key[];
}
