import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { history } from 'umi';

import { message } from '@/components/PopupHack';
import StateTag from '@/components/StateTag';
import { deleteOutends, getOutends } from '@/services/rulex/shuchuziyuanguanli';
import Detail from './Detail';
import { typeEnum } from './Update/initialValue';

export type Item = {
  name: string;
  type: string;
  state: number;
  description: string;
  uuid: string;
  [key: string]: any;
};

const Targets = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  // 删除
  const handleOnDelete = async (values: API.deleteOutendsParams) => {
    try {
      await deleteOutends(values);
      actionRef?.current?.reload();
      message.success('删除成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<Item>[] = [
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
      renderText: (state) => <StateTag state={state} />,
    },
    {
      title: '备注',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 150,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/outends/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该目标？"
          onConfirm={() => handleOnDelete({ uuid })}
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
            const res = await getOutends();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="new"
              onClick={() => history.push('/outends/new')}
              icon={<PlusOutlined />}
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

export default Targets;
