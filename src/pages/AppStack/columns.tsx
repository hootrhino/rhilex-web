import ProSegmented from '@/components/ProSegmented';
import StateTag from '@/components/StateTag';
import { stringToBool } from '@/utils/utils';

export const baseColumns = [
  {
    title: 'APP 名称',
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: 'APP 版本',
    dataIndex: 'version',
    required: true,
  },
  {
    title: '是否自启',
    dataIndex: 'autoStart',
    required: true,
    convertValue: (value: boolean) => value?.toString(),
    transform: (value: string) => ({ autoStart: stringToBool(value) }),
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (autoStart: boolean) => <StateTag state={autoStart} type="bool" />,
  },
  {
    title: 'APP 状态',
    dataIndex: 'appState',
    hideInForm: true,
    renderText: (appState: number) => <StateTag state={appState} type="appStack" />,
  },
  {
    title: '脚本类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      lua: 'LUA 脚本',
    },
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: 'Lua 源码',
    dataIndex: 'luaSource',
    valueType: 'code',
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];
