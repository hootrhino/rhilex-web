import { useRef, useState } from 'react';

import { history } from 'umi';

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

import { message } from '@/components/PopupHack';
import { deleteInends, getInends } from '@/services/rulex/shuruziyuanguanli';
import { useRequest } from '@umijs/max';
import { typeEnum } from './components/columns';
import Detail from './components/Detail';
import StateTag from '@/components/StateTag';

export type InendsItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  uuid: string;
};

const Inends = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteInendsParams) => deleteInends(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      message.success('删除成功');
    },
  });

  const columns: ProColumns<InendsItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: typeEnum,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      renderText: state => <StateTag state={state} />
    },
    {
      title: '信息',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid }) => [
        <a key="rules" onClick={() => history.push(`/inends/${uuid}/rule`)}>
          规则配置
        </a>,
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/inends/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该资源?"
          onConfirm={() => remove({ uuid })}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          actionRef={actionRef}
          columns={columns}
          request={async () => {
            const res = await getInends();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/inends/new')}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setConfig({ ...detailConfig, open: false })} />
    </>
  );
};

export default Inends;
