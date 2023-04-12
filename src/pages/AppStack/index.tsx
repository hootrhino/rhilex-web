import { deleteApp,getApp,postApp,putApp } from '@/services/rulex/qingliangyingyong';
import { MinusCircleOutlined,PlusOutlined,SyncOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormSegmented,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag } from 'antd';

import FullScreenEditor from '@/components/FullScreenEditor';
import { useEffect, useRef, useState } from 'react';
import { useRequest } from 'umi';

type TableItem = {
  uuid?: string;
  name?: string;
  version?: string;
  autoStart?: boolean;
  appState?: number;
  filepath?: string;
  luaSource?: string;
  [key: string]: any;
};

type FormItem = {
  name: string;
  version: string;
  autoStart: boolean;
  description: string;
  luaSource: string;
};

const AppStack = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const editorRef = useRef(null);

  const [open, setOpen] = useState<boolean>(false);
  const [initValue, setValue] = useState<TableItem | undefined>();

  // 获取详情
  const { run: getDetail } = useRequest((id: string) => getApp({ uuid: id }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => setValue(data),
  });

  // 新建 & 编辑
  const handleOnFinish = async (values: FormItem) => {
    try {
      const params = { ...values, autoStart: Boolean(values?.autoStart) };
      if (initValue?.uuid) {
        await putApp({ ...params, uuid: initValue?.uuid });
        message.success('更新成功');
      } else {
        await postApp(params);
        message.success('新建成功');
      }
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  // 删除
  const handleDelete = async (values: API.deleteAppParams) => {
    try {
      await deleteApp(values);
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<TableItem>[] = [
    {
      title: 'APP 名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'APP 版本',
      dataIndex: 'version',
    },
    {
      title: '是否自启',
      dataIndex: 'autoStart',
      renderText: (autoStart) => (
        <Tag color={autoStart ? 'success' : 'error'}>{autoStart ? '是' : '否'}</Tag>
      ),
    },
    {
      title: 'APP 状态',
      dataIndex: 'appState',
      width: 100,
      renderText: (appState) => (
        <Tag
          icon={appState === 1 ? <SyncOutlined spin /> : <MinusCircleOutlined />}
          color={appState === 1 ? 'processing' : 'default'}
        >
          {appState === 1 ? '正在运行' : '已结束'}
        </Tag>
      ),
    },
    {
      title: '描述信息',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setOpen(true);
            getDetail(record?.uuid || '');
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该应用?"
          onConfirm={() => handleDelete({ uuid: record?.uuid || '' })}
          okText="是"
          cancelText="否"
          key="delete"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    if (initValue) {
      formRef.current?.setFieldsValue({
        ...initValue,
        autoStart: initValue?.autoStart?.toString(),
      });
    } else {
      formRef.current?.setFieldsValue({
        name: '',
        version: '',
        autoStart: 'true',
        luaSource: '',
        description: '',
      });
    }
  }, [initValue]);

  return (
    <PageContainer>
      <ProTable
        rowKey="uuid"
        actionRef={actionRef}
        columns={columns}
        search={false}
        pagination={false}
        request={async () => {
          const res = await getApp({ uuid: '' });

          return Promise.resolve({
            data: (res as any)?.data,
            success: true,
          });
        }}
        toolBarRender={() => [
          <Button
            key="new"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpen(true);
              setValue(undefined);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <ModalForm
        formRef={formRef}
        title={initValue?.uuid ? '更新应用' : '新建应用'}
        open={open}
        onFinish={handleOnFinish}
        onOpenChange={setOpen}
        layout="horizontal"
        initialValues={initValue}
      >
        <ProFormText name="name" label="APP 名称" />
        <ProFormText name="version" label="APP 版本" />
        <ProFormSegmented
          name="autoStart"
          label="是否自启"
          valueEnum={{
            true: '是',
            false: '否',
          }}
          width="md"
          fieldProps={{ block: true } as any}
        />
        {initValue?.uuid && (
          <ProForm.Item name="luaSource" label="Lua 源码">
            <FullScreenEditor ref={editorRef} />
          </ProForm.Item>
        )}
        <ProFormText name="description" label="描述信息" />
      </ModalForm>
    </PageContainer>
  );
};

export default AppStack;
