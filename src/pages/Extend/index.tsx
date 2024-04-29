import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import StateTag, { StateType } from '@/components/StateTag';
import {
  deleteGoods,
  getGoodsList,
  putGoodsStart,
  putGoodsStop,
} from '@/services/rulex/kuozhanxieyi';
import { DetailModalType } from '@/utils/enum';
import { IconFont } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import type { DetailLogModalConfig } from './Detail';
import Detail from './Detail';
import UpdateForm from './Update';

export type ExtendItem = {
  uuid?: string;
  running: boolean;
  net_addr: string;
  args: string[];
  local_path: string;
  description?: string;
  [key: string]: any;
};

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

export const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '扩展类型',
    dataIndex: 'goodsType',
    width: 80,
    renderText: (goodsType: string) => (
      <StateTag state={goodsType === 'LOCAL'} type={StateType.GOODSTYPE} />
    ),
  },
  {
    title: '本地路径',
    dataIndex: 'local_path',
    ellipsis: true,
  },
  {
    title: '协议交互地址',
    dataIndex: 'net_addr',
    ellipsis: true,
  },
  {
    title: '协议参数',
    dataIndex: 'args',
    ellipsis: true,
    renderText: (args: string[]) => args?.join(','),
  },
  {
    title: '执行类型',
    dataIndex: 'executeType',
    width: 100,
    renderText: (executeType: string) => {
      let iconType = 'unknown';
      const defaultType = ['JAVA', 'ELF', 'PYTHON', 'EXE', 'NODEJS', 'LUA'];

      if (defaultType.includes(executeType)) {
        iconType = executeType.toLocaleLowerCase();
      } else {
        iconType = 'unknown';
      }

      return (
        <div className="flex justify-start items-center">
          <IconFont type={`icon-${iconType}`} style={{ fontSize: 22, paddingRight: 5 }} />
          <span>{executeType}</span>
        </div>
      );
    },
  },
  {
    title: '运行状态',
    dataIndex: 'running',
    width: 100,
    renderText: (running: string) => <StateTag state={running} type={StateType.RUNNING} />,
  },
  {
    title: <FormattedMessage id="table.desc" />,
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const ExtendedProtocol = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();

  const [formConfig, setFormConfig] = useState<DetailModalConfig>({ open: false, uuid: '' });
  const [detailConfig, setDetailConfig] = useState<DetailLogModalConfig>({
    type: DetailModalType.DETAIL,
    open: false,
    uuid: '',
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteGoodsParams) => deleteGoods(params), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.remove' }));
      actionRef.current?.reload();
    },
  });

  // 启动
  const { run: start } = useRequest((params: API.putGoodsStartParams) => putGoodsStart(params), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.start' }));
      actionRef.current?.reload();
    },
  });

  // 停止
  const { run: stop } = useRequest((params: API.putGoodsStopParams) => putGoodsStop(params), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.stop' }));
      actionRef.current?.reload();
    },
  });

  const columns: ProColumns<ExtendItem>[] = [
    ...baseColumns,
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      fixed: 'right',
      render: (_, { uuid, running }) => [
        <a
          key="log"
          onClick={() => {
            if (!uuid) return;
            setDetailConfig({ type: DetailModalType.LOG, open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.log' })}
        </a>,
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            setDetailConfig({ type: DetailModalType.DETAIL, open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="run"
          onClick={() => {
            if (!uuid) return;
            if (running) {
              stop({ uuid });
            } else {
              start({ uuid });
            }
          }}
        >
          {running ? formatMessage({ id: 'button.stop' }) : formatMessage({ id: 'button.start' })}
        </a>,
        <a
          key="edit"
          onClick={() => {
            if (!uuid) return;
            setFormConfig({ open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title="确定要删除此扩展协议？"
          onConfirm={() => uuid && remove({ uuid })}
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
          columns={columns}
          request={async () => {
            const { data } = await getGoodsList();

            return Promise.resolve({
              data: data as ExtendItem[],
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="new"
              onClick={() => {
                setFormConfig({ open: true, uuid: '' });
              }}
              icon={<PlusOutlined />}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ]}
        />
      </PageContainer>
      <UpdateForm
        {...formConfig}
        onOpenChange={(visible) => setFormConfig({ open: visible, uuid: '' })}
        reload={() => actionRef.current?.reload()}
      />
      <Detail
        config={detailConfig}
        onClose={() => setDetailConfig({ ...detailConfig, open: false, uuid: '' })}
      />
    </>
  );
};

export default ExtendedProtocol;
