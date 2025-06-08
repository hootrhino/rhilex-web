import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteAppDel,
  getAppList,
  putAppStart,
  putAppStop,
} from '@/services/rhilex/qingliangyingyong';
import { MAX_TOTAL } from '@/utils/constant';
import { DetailModalType } from '@/utils/enum';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { baseColumns } from './columns';
import Detail from './Detail';

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
  const { formatMessage } = useIntl();
  const { isFreeTrial, total, changeTotal } = useModel('useCommon');
  const [detailConfig, setConfig] = useState<DetailLogModalConfig>({
    uuid: '',
    open: false,
    type: DetailModalType.DETAIL,
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteAppDelParams) => deleteAppDel(params), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.remove' }));
      actionRef.current?.reload();
    },
  });

  // 启动
  const { run: start } = useRequest((params: API.putAppStartParams) => putAppStart(params), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.start' }));
      actionRef.current?.reload();
    },
  });

  // 停止
  const { run: stop } = useRequest((params: API.putAppStopParams) => putAppStop(params), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.stop' }));
      actionRef.current?.reload();
    },
  });

  const actions: ProColumns<AppStackItem>[] = [
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 220,
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, appState }) => [
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            setConfig({ uuid, open: true, type: DetailModalType.DETAIL });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="log"
          onClick={() => {
            if (!uuid) return;
            setConfig({ uuid, open: true, type: DetailModalType.LOG });
          }}
        >
          {formatMessage({ id: 'button.log' })}
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
          {appState === 1
            ? formatMessage({ id: 'button.stop' })
            : formatMessage({ id: 'button.start' })}
        </a>,
        <a key="edit" onClick={() => history.push(`/app/edit/${uuid}`)}>
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'appStack.popconfirm.title.remove' })}
          onConfirm={() => uuid && remove({ uuid })}
          okText={formatMessage({ id: 'button.yes' })}
          cancelText={formatMessage({ id: 'button.no' })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
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
          rootClassName="stripe-table"
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
          onDataSourceChange={(d) => changeTotal(d.length)}
          toolBarRender={() => [
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              disabled={isFreeTrial && total >= MAX_TOTAL}
              onClick={() => history.push('/app/new')}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setConfig({ ...detailConfig, open: false })} />
    </>
  );
};

export default AppStack;
