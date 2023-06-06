import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Popconfirm } from 'antd';

import { message } from '@/components/PopupHack';
import { deleteRules, getRules } from '@/services/rulex/guizeguanli';
import { history } from 'umi';

export type Item = {
  uuid: string;
  [key: string]: any;
};

const Rules = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

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
      width: 150,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            setId(uuid);
            setOpen(true);
          }}
        >
          详情
        </a>,
        // <a key="edit" onClick={() => history.push(`/rules/edit/${uuid}`)}>
        //   编辑
        // </a>,
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

  const detailColumns: ProDescriptionsItemProps<Record<string, any>>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '数据来源',
      dataIndex: 'type',
      valueEnum: {
        fromSource: '输入资源',
        fromDevice: '设备',
      },
    },
    {
      title: '输入资源',
      dataIndex: 'fromSource',
      render: (_, { fromSource, fromDevice }) => fromSource || fromDevice,
    },
    {
      title: '规则回调',
      dataIndex: 'actions',
      valueType: 'code',
    },
    {
      title: '成功回调',
      dataIndex: 'success',
      valueType: 'code',
    },
    {
      title: '失败回调',
      dataIndex: 'failed',
      valueType: 'code',
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
            const res = await getRules();

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
      <Drawer
        title="规则详情"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width="30%"
      >
        <ProDescriptions
          column={1}
          columns={detailColumns}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
          request={async () => {
            const res = await getRules({ uuid: id });

            return Promise.resolve({
              success: true,
              data: res?.data?.[0],
            });
          }}
        />
      </Drawer>
    </>
  );
};

export default Rules;
