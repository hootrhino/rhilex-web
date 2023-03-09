import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';

import { deleteRules, getRules, postRules } from '@/services/rulex/guizeguanli';

import type { FormItem } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

export type Item = {
  uuid: string;
  [key: string]: any;
};

const Rules = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Item>();

  // 新建&编辑
  const handleOnFinish = async (values: FormItem) => {
    try {
      if (initialValue?.uuid) {
        // TODO 编辑
      } else {
        await postRules(values);
      }
      setModalVisible(false);
      setInitialValue(undefined);
      actionRef.current?.reload();
      message.success(initialValue?.uuid ? '更新成功' : '新建成功');
      return true;
    } catch (error) {
      return false;
    }
  };

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
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            // TODO 详情
          }}
        >
          详情
        </a>,
        // <a
        //   key="edit"
        //   onClick={() => {
        //     setModalVisible(true);
        //     setInitialValue(record);
        //   }}
        // >
        //   编辑
        // </a>,
        <Popconfirm
          title="确定要删除该规则？"
          onConfirm={() => handleOnDelete({ uuid: record?.uuid })}
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
            const res = await getRules();

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
          setInitialValue(undefined);
        }}
        updateModalVisible={modalVisible}
        onVisibleChange={setModalVisible}
        values={initialValue}
      />
    </>
  );
};

export default Rules;
