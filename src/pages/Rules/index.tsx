import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import { deleteRules, getRules } from '@/services/rulex/guizeguanli';
import { history, useModel } from 'umi';
import Debug from './components/Debug';
import Detail from './components/Detail';

export type Item = {
  uuid: string;
  [key: string]: any;
};

const Rules = () => {
  const actionRef = useRef<ActionType>();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openDebug, setOpenDebug] = useState<boolean>(false);
  const [uuid, setId] = useState<string>('');

  const { run: getSources } = useModel('useSource');
  const { run: getDevices } = useModel('useDevice');

  // 删除
  const handleOnDelete = async (value: API.deleteRulesParams) => {
    try {
      await deleteRules(value);
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
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        0: { text: '停止', status: 'Error' },
        1: { text: '运行中', status: 'Processing' },
      },
    },
    {
      title: '备注信息',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 180,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="debug" onClick={() => setOpenDebug(true)}>
          测试
        </a>,
        <a
          key="detail"
          onClick={() => {
            getSources();
            getDevices();
            setId(uuid);
            setOpenDetail(true);
          }}
        >
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/rules/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该规则？"
          onConfirm={() => handleOnDelete({ uuid })}
          key="delete"
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
            const res = await getRules({});

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button type="primary" key="primary" onClick={() => history.push('/rules/new')}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail id={uuid} open={openDetail} onClose={() => setOpenDetail(false)} />
      <Debug
        id={uuid}
        open={openDebug}
        onOpenChange={(visible: boolean) => setOpenDebug(visible)}
        onClose={() => setOpenDebug(false)}
      />
    </>
  );
};

export default Rules;
