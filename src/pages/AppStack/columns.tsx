import ProSegmented from '@/components/ProSegmented';
import { boolEnum, boolMap } from '@/utils/enum';
import { MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

export const appStateEnum = {
  1: {
    text: '正在运行',
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  0: {
    text: '已结束',
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

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
    transform: (value: string) => ({ autoStart: boolMap[value] }),
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (autoStart: boolean) => {
      const key = autoStart ? 'true' : 'false';
      return <Tag color={boolEnum[key]?.color}>{boolEnum[key]?.text}</Tag>;
    },
  },
  {
    title: 'APP 状态',
    dataIndex: 'appState',
    hideInForm: true,
    renderText: (appState: number) => (
      <Tag icon={appStateEnum[appState]?.icon} color={appStateEnum[appState]?.color}>
        {appStateEnum[appState]?.text}
      </Tag>
    ),
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
