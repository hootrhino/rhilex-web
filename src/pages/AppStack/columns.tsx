import ProSegmented from '@/components/ProSegmented';
import StateTag, { StateType } from '@/components/StateTag';
import { stringToBool } from '@/utils/utils';
import { FormattedMessage } from '@umijs/max';

export const baseColumns = [
  {
    title: <FormattedMessage id="appStack.table.title.name" />,
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: <FormattedMessage id="appStack.table.title.version" />,
    dataIndex: 'version',
    required: true,
  },
  {
    title: <FormattedMessage id="appStack.table.title.autoStart" />,
    dataIndex: 'autoStart',
    required: true,
    convertValue: (value: boolean) => value?.toString(),
    transform: (value: string) => ({ autoStart: stringToBool(value) }),
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (autoStart: boolean) => <StateTag state={autoStart} type={StateType.BOOL} />,
  },
  {
    title: <FormattedMessage id="appStack.table.title.appState" />,
    dataIndex: 'appState',
    hideInForm: true,
    renderText: (appState: number) => <StateTag state={appState} type={StateType.APPSTACK} />,
  },
  {
    title: <FormattedMessage id="appStack.table.title.type" />,
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      lua: 'LUA 脚本',
    },
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: <FormattedMessage id="appStack.table.title.luaSource" />,
    dataIndex: 'luaSource',
    valueType: 'code',
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: <FormattedMessage id="table.desc" />,
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];
