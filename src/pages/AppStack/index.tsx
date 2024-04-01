import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import {
  deleteAppDel,
  getAppList,
  putAppStart,
  putAppStop,
} from '@/services/rulex/qingliangyingyong';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { history } from 'umi';
import { baseColumns } from './columns';
import Detail, { DetailModalType } from './Detail';

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

type DetailLogModalConfig = {
  open: boolean;
  type: DetailModalType;
  uuid: string;
};

const AppStack = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<DetailLogModalConfig>({
    uuid: '',
    open: false,
    type: DetailModalType.Detail,
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteAppDelParams) => deleteAppDel(params), {
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

  const actions: ProColumns<AppStackItem>[] = [
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, appState }) => [
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            setConfig({ uuid, open: true, type: DetailModalType.Detail });
          }}
        >
          详情
        </a>,
        <a
          key="log"
          onClick={() => {
            if (!uuid) return;
            setConfig({ uuid, open: true, type: DetailModalType.Log });
          }}
        >
          日志
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
          columns={[...baseColumns, ...actions] as ProColumns<AppStackItem>[]}
          search={false}
          pagination={false}
          request={async () => {
            const { data } = await getAppList();

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
