import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { message } from '@/components/PopupHack';
import { postPluginService } from '@/services/rulex/chajianguanli';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Tag } from 'antd';
import { useRef } from 'react';
import { useParams } from 'umi';

type DetailItem = {
  id: string;
  username: string;
  remote: string;
  cleanSession: boolean;
  [key: string]: any;
};

type OffLineParams = {
  uuid: string;
  name: string;
  args: string[];
};

const Detail = () => {
  const { id: uuid } = useParams();
  const actionRef = useRef<ActionType>();

  // 下线
  const { run: OffLine } = useRequest((params: OffLineParams) => postPluginService(params), {
    manual: true,
    onSuccess: () => {
      message.success('下线成功');
      actionRef.current?.reload();
    },
  });

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
        <a key="offline" onClick={() => OffLine({ uuid: uuid || '', name: 'kickout', args: [id] })}>
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
            data: data as DetailItem[],
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
