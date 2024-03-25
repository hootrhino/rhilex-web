import type { PluginConfig, PluginParams } from '@/models/usePlugin';
import { omit } from '@/utils/redash';
import { IconFont } from '@/utils/utils';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message, Tag } from 'antd';
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
    icon: <IconFont type="icon-close-circle" />,
  },
};

const ClientList = () => {
  const { data, run, setDetailConfig, detailConfig, refresh } = useModel('usePlugin');

  const columns: ProColumns<DetailItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '客户端地址',
      dataIndex: 'remote',
    },
    {
      title: 'Clean Session',
      dataIndex: 'cleanSession',
      renderText: (cleanSession) => (
        <Tag
          icon={cleanSessionEnum[cleanSession]?.icon}
          color={cleanSessionEnum[cleanSession]?.color}
        >
          {cleanSessionEnum[cleanSession]?.text}
        </Tag>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      key: 'option',
      render: (_, { id }) => [
        <a
          key="offline"
          onClick={() => {
            const params = { uuid: detailConfig.uuid, name: 'kickout', args: [id] };
            run(params).then(() => {
              setDetailConfig({ ...params, title: '', open: false } as PluginConfig);
              message.success('下线成功');
              refresh();
            });
          }}
        >
          下线
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
