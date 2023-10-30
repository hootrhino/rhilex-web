import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import { deleteDevices, getDevices } from '@/services/rulex/shebeiguanli';
import { history, useRequest } from '@umijs/max';
import Detail from './components/Detail';

export type Item = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

const Devices = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteDevicesParams) => deleteDevices(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      message.success('删除成功');
    },
  });

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
      valueEnum: {
        GENERIC_SNMP: '通用SNMP协议采集',
        USER_G776: '通用串口DTU',
        GENERIC_PROTOCOL: '通用串口协议',
        GENERIC_MODBUS: '通用Modbus Master',
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 120,
      valueEnum: {
        0: { text: '停止', status: 'Default' },
        1: { text: '启用', status: 'Success' },
        2: { text: '故障', status: 'Error' },
      },
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
        <a key="rule" onClick={() => history.push(`/device/${uuid}/rule`)}>
          规则配置
        </a>,
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/device/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该设备?"
          onConfirm={() => remove({ uuid })}
          okText="是"
          cancelText="否"
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
            const res = await getDevices();

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
              onClick={() => history.push('/device/new')}
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

export default Devices;
