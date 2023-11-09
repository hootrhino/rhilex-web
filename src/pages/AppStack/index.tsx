import { message } from '@/components/PopupHack';
import { deleteApp, getApp, putAppStart, putAppStop } from '@/services/rulex/qingliangyingyong';
import { MinusCircleOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Tag } from 'antd';

import { useRequest } from '@umijs/max';
import { useRef, useState } from 'react';
import { history } from 'umi';
import Detail from './components/Detail';

export type AppStackItem = {
  uuid?: string;
  name?: string;
  version?: string;
  autoStart?: boolean;
  appState?: number;
  filepath?: string;
  luaSource?: string;
  [key: string]: any;
};

const AppStack = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<{
    uuid: string;
    open: boolean;
    type: 'detail' | 'log';
  }>({
    uuid: '',
    open: false,
    type: 'detail',
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteAppParams) => deleteApp(params), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    },
  });

  // 启动
  const { run: start } = useRequest((params: API.putAppStartParams) => putAppStart(params), {
    manual: true,
    onSuccess: () => {
      message.success('启动成功');
      actionRef.current?.reload();
    },
  });

  // 停止
  const { run: stop } = useRequest((params: API.putAppStopParams) => putAppStop(params), {
    manual: true,
    onSuccess: () => {
      message.success('停止成功');
      actionRef.current?.reload();
    },
  });

  const columns: ProColumns<AppStackItem>[] = [
    {
      title: 'APP 名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'APP 版本',
      dataIndex: 'version',
    },
    {
      title: '是否自启',
      dataIndex: 'autoStart',
      renderText: (autoStart) => (
        <Tag color={autoStart ? 'success' : 'error'}>{autoStart === true ? '开启' : '关闭'}</Tag>
      ),
    },
    {
      title: 'APP 状态',
      dataIndex: 'appState',
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
      title: '备注',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, appState }) => [
        <a
          key="log"
          onClick={() => {
            setConfig({ uuid: uuid || '', open: true, type: 'log' });
          }}
        >
          日志
        </a>,
        <a
          key="detail"
          onClick={() => {
            setConfig({ uuid: uuid || '', open: true, type: 'detail' });
          }}
        >
          详情
        </a>,
        <a
          key="start"
          onClick={() => {
            if (!uuid) return;

            if (appState === 1) {
              stop({ uuid });
            } else {
              start({ uuid });
            }
          }}
        >
          {appState === 1 ? '停止' : '启动'}
        </a>,
        <a key="edit" onClick={() => history.push(`/app-stack/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该应用?"
          onConfirm={() => uuid && remove({ uuid })}
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
          search={false}
          pagination={false}
          request={async () => {
            const { data } = await getApp();

            return Promise.resolve({
              data,
              success: true,
            });
          }}
          toolBarRender={() => [
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/app-stack/new')}
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

export default AppStack;
