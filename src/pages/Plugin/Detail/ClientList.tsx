import ProTag from '@/components/ProTag';
import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useRef } from 'react';
import { defaultConfig } from '..';
import { PluginName, PluginUUID } from '../enum';
import type { ClientItem, PluginConfig, PluginParams } from '../typings';

const cleanSessionEnum = {
  true: {
    text: 'true',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  false: {
    text: 'false',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};

type ClientProps = {
  changeDetailConfig: (value: PluginConfig) => void;
};

const ClientList = ({ changeDetailConfig }: ClientProps) => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();

  const { run: onKickout } = useRequest((params: PluginParams) => postPlugwareService(params), {
    manual: true,
    onSuccess: () => {
      changeDetailConfig(defaultConfig);
      message.success(formatMessage({ id: 'plugin.message.success.kickout' }));
      actionRef.current?.reload();
    },
  });

  const columns: ProColumns<ClientItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'form.title.username' }),
      dataIndex: 'username',
    },
    {
      title: formatMessage({ id: 'plugin.table.title.remote' }),
      dataIndex: 'remote',
    },
    {
      title: 'Clean Session',
      dataIndex: 'cleanSession',
      renderText: (cleanSession) => (
        <ProTag
          icon={cleanSessionEnum[cleanSession]?.icon}
          color={cleanSessionEnum[cleanSession]?.color}
        >
          {cleanSessionEnum[cleanSession]?.text}
        </ProTag>
      ),
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: 80,
      fixed: 'right',
      key: 'option',
      render: (_, { id }) => [
        <a
          key="kickout"
          onClick={() => onKickout({ uuid: PluginUUID.MQTT, name: PluginName.KICKOUT, args: [id] })}
        >
          {formatMessage({ id: 'plugin.button.kickout' })}
        </a>,
      ],
    },
  ];

  return (
    <ProTable
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={async () => {
        const { data } = await postPlugwareService({
          uuid: PluginUUID.MQTT,
          name: PluginName.CLIENTS,
          args: [],
        } as any);

        return Promise.resolve({
          data: data as any,
          success: true,
        });
      }}
      search={false}
      pagination={false}
    />
  );
};

export default ClientList;
