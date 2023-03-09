import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';

import {
  deleteOutends,
  getOutends,
  postOutends,
  putOutends,
} from '@/services/rulex/shuchuziyuanguanli';

import UpdateForm from './components/UpdateForm';
import type { FormItem } from './components/UpdateForm';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Item | undefined>();

  // 新建&编辑
  const handleOnFinish = async (values: FormItem) => {
    try {
      if (initialValue?.uuid) {
        await putOutends({ ...values, uuid: initialValue.uuid } as any);
      } else {
        await postOutends(values);
      }
      message.success(initialValue?.uuid ? '更新成功' : '新建成功');
      setModalVisible(false);
      setInitialValue(undefined);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

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
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },

    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      valueEnum: {
        0: { text: '故障', status: 'Error' },
        1: { text: '启用', status: 'Success' },
        2: { text: '暂停', status: 'Default' },
        3: { text: '停止', status: 'Default' },
      },
    },

    {
      title: '信息',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setModalVisible(true);
            setInitialValue(record);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该目标？"
          onConfirm={() => handleOnDelete({ uuid: record.uuid })}
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
              key="primary"
              onClick={() => {
                setModalVisible(true);
                setInitialValue(undefined);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
      </PageContainer>
      <UpdateForm
        onSubmit={handleOnFinish}
        onCancel={() => {
          setModalVisible(false);
        }}
        updateModalVisible={modalVisible}
        onVisibleChange={setModalVisible}
        values={initialValue}
      />
    </>
  );
};

export default Targets;
