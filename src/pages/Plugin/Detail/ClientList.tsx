import ProTag from '@/components/ProTag';
import type { PluginConfig, PluginParams } from '@/models/usePlugin';
import { omit } from '@/utils/redash';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

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

const ClientList = () => {
  const { data, run, setDetailConfig, detailConfig, refresh } = useModel('usePlugin');
  const { formatMessage } = useIntl();

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
        <a
          key="kickout"
          onClick={() => {
            const params = { uuid: detailConfig.uuid, name: 'kickout', args: [id] };
            run(params).then(() => {
              setDetailConfig({ ...params, title: '', open: false } as PluginConfig);
              message.success(formatMessage({ id: 'plugin.message.success.kickout' }));
              refresh();
            });
          }}
        >
          {formatMessage({ id: 'plugin.button.kickout' })}
        </a>,
      ],
    },
  ];

  useEffect(() => {
    if (detailConfig.uuid) {
      const params = omit(detailConfig, ['title', 'open']);
      run(params as PluginParams);
    }
  }, [detailConfig]);

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
