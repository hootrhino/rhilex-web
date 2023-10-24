import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { message } from '@/components/PopupHack';
import { postPluginService } from '@/services/rulex/chajianguanli';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useRef } from 'react';
import { useParams } from 'umi';

type Item = Record<string, any>;

const Detail = () => {
  const { id: uuid } = useParams();
  const actionRef = useRef<ActionType>();

  const handleOffLine = async (ids: string[]) => {
    try {
      await postPluginService({ uuid: uuid || '', name: 'kickout', args: ids });
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<Item>[] = [
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
          icon={cleanSession ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={cleanSession ? 'success' : 'error'}
        >
          {cleanSession === true ? 'true' : 'false'}
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
        <a key="offline" onClick={() => handleOffLine([id])}>
          下线
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={async () => {
          const { data } = await postPluginService({ uuid: uuid || '', name: 'clients', args: [] });

          return Promise.resolve({
            data: data as Item[],
            success: true,
          });
        }}
        search={false}
        pagination={false}
      />
    </PageContainer>
  );
};

export default Detail;
