import LogTable from '@/components/LogTable';
import { message } from '@/components/PopupHack';
import {
  deleteGoods,
  getGoodsDetail,
  getGoodsList,
  putGoodsStart,
  putGoodsStop,
} from '@/services/rulex/kuozhanxieyi';
import { IconFont } from '@/utils/utils';
import { MinusCircleOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { DetailItem } from './Update';
import UpdateForm, { defaultValue } from './Update';

export type ExtendItem = {
  uuid?: string;
  running: boolean;
  net_addr: string;
  args: string[];
  local_path: string;
  description?: string;
  [key: string]: any;
};

const baseColumns = [
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
    renderText: (goodsType: string) => {
      const isLocal = goodsType === 'LOCAL';
      return <Tag color={isLocal ? 'green' : 'purple'}>{isLocal ? '内部' : '外部'}</Tag>;
    },
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
    title: '参数',
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
    renderText: (running: boolean) => (
      <Tag
        icon={running ? <SyncOutlined spin /> : <MinusCircleOutlined />}
        color={running ? 'processing' : 'error'}
      >
        {running ? '运行中' : '停止'}
      </Tag>
    ),
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const ExtendedProtocol = () => {
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState<boolean>(false);
  const [detailConfig, setDetailConfig] = useState<DetailLogModalConfig>({
    type: 'detail',
    open: false,
    uuid: '',
  });
  const [formData, setFormData] = useState<DetailItem>(defaultValue);

  // 删除
  const { run: remove } = useRequest((params: API.deleteGoodsParams) => deleteGoods(params), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    },
  });

  // 启动
  const { run: start } = useRequest((params: API.putGoodsStartParams) => putGoodsStart(params), {
    manual: true,
    onSuccess: () => {
      message.success('启动成功');
      actionRef.current?.reload();
    },
  });

  // 停止
  const { run: stop } = useRequest((params: API.putGoodsStopParams) => putGoodsStop(params), {
    manual: true,
    onSuccess: () => {
      message.success('停止成功');
      actionRef.current?.reload();
    },
  });

  // 详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getGoodsDetailParams) => getGoodsDetail(params),
    {
      manual: true,
    },
  );

  const columns: ProColumns<ExtendItem>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 200,
      fixed: 'right',
      render: (_, { uuid, running }) => [
        <a
          key="log"
          onClick={() => {
            setDetailConfig({ type: 'log', open: true, uuid: uuid || '' });
          }}
        >
          日志
        </a>,
        <a
          key="detail"
          onClick={() => {
            setDetailConfig({ type: 'detail', open: true, uuid: '' });
            getDetail({ uuid: uuid || '' });
          }}
        >
          详情
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
          {running ? '停止' : '启动'}
        </a>,
        <a
          key="edit"
          onClick={() => {
            if (!uuid) return;
            setOpen(true);
            getDetail({ uuid });
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该扩展协议？"
          onConfirm={() => uuid && remove({ uuid })}
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    if (detail) {
      setFormData(detail);
    } else {
      setFormData(defaultValue);
    }
  }, [detail]);

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
                setOpen(true);
                setFormData(defaultValue);
              }}
              icon={<PlusOutlined />}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <UpdateForm
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        data={formData}
        reload={() => actionRef.current?.reload()}
      />
      <Modal
        title={`扩展协议${detailConfig.type === 'detail' ? '详情' : '日志'}`}
        open={detailConfig.open}
        width="40%"
        footer={
          <Button
            key="close"
            type="primary"
            onClick={() => setDetailConfig({ type: 'detail', open: false, uuid: '' })}
          >
            关闭
          </Button>
        }
        maskClosable={false}
        onCancel={() => setDetailConfig({ type: 'detail', open: false, uuid: '' })}
      >
        {detailConfig.type === 'detail' ? (
          <ProDescriptions
            dataSource={detail}
            columns={baseColumns.filter((col) => col.dataIndex !== 'args')}
            column={1}
            labelStyle={{ width: 120, justifyContent: 'end', paddingRight: 10 }}
          >
            <ProDescriptions.Item label="协议参数">{detail?.args}</ProDescriptions.Item>
          </ProDescriptions>
        ) : (
          <LogTable
            topic={`goods/console/${detailConfig?.uuid}`}
            options={false}
            headerTitle={undefined}
          />
        )}
      </Modal>
    </>
  );
};

export default ExtendedProtocol;
