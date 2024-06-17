import ProTag from '@/components/ProTag';
import { defaultConfig, PluginName } from '@/models/usePlugin';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

type ClientProps = {
  uuid: string | undefined;
};

type DetailItem = {
  id: string;
  username: string;
  remote: string;
  cleanSession: boolean;
  [key: string]: any;
};

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

const ClientList = ({ uuid }: ClientProps) => {
  const { data, run, setDetailConfig, refresh } = useModel('usePlugin');
  const { formatMessage } = useIntl();

  const handleOnKickout = (args: string[]) => {
    if (!uuid) return;

    const params = { uuid, name: PluginName.KICKOUT, args };
    run(params).then(() => {
      setDetailConfig(defaultConfig);
      message.success(formatMessage({ id: 'plugin.message.success.kickout' }));
      refresh();
    });
  };

  const handleOnClientList = () => {
    if (!uuid) return;

    run({
      uuid,
      name: PluginName.CLIENTS,
      args: [],
    });
  };

  const columns: ProColumns<DetailItem>[] = [
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
        <a key="kickout" onClick={() => handleOnKickout([id])}>
          {formatMessage({ id: 'plugin.button.kickout' })}
        </a>,
      ],
    },
  ];

  useEffect(() => {
    handleOnClientList();
  }, [uuid]);

  return (
    <ProTable
      rowKey="id"
      columns={columns}
      dataSource={data as any}
      search={false}
      pagination={false}
    />
  );
};

export default ClientList;
