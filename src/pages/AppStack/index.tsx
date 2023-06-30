import { message } from '@/components/PopupHack';
import { deleteApp, getApp, putAppStart, putAppStop } from '@/services/rulex/qingliangyingyong';
import { MinusCircleOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Tag } from 'antd';

import { useRef, useState } from 'react';
import { history } from 'umi';
import Detail from './components/Detail';

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

const AppStack = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

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

  // 启动
  const handleScript = async (values: API.putAppStartParams, type: 'start' | 'stop') => {
    try {
      if (type === 'start') {
        await putAppStart(values);
        message.success('启动成功');
      } else {
        await putAppStop(values);
        message.success('停止成功');
      }

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
        <Tag color={autoStart ? 'success' : 'error'}>{autoStart === true ? '开启' : '关闭'}</Tag>
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
      width: 180,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, appState }) => [
        <a
          key="detail"
          onClick={() => {
            setConfig({ uuid: uuid || '', open: true });
          }}
        >
          详情
        </a>,
        <a
          key="start"
          onClick={() => handleScript({ uuid: uuid || '' }, appState === 1 ? 'stop' : 'start')}
        >
          {appState === 1 ? '停止' : '启动'}
        </a>,
        <a key="edit" onClick={() => history.push(`/app-stack/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该应用?"
          onConfirm={() => handleDelete({ uuid: uuid || '' })}
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
