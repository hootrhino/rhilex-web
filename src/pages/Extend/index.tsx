import LogTable from '@/components/LogTable';
import { message } from '@/components/PopupHack';
import {
  deleteGoods,
  getGoodsDetail,
  getGoodsList,
  postGoodsCreate,
  putGoodsStart,
  putGoodsStop,
  putGoodsUpdate,
} from '@/services/rulex/kuozhanxieyi';
import { IconFont } from '@/utils/utils';
import { MinusCircleOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';

type Item = {
  uuid?: string;
  running: boolean;
  net_addr: string;
  args: string[];
  local_path: string;
  description?: string;
  [key: string]: any;
};

type FormParams = {
  net_addr: string;
  args: string[];
  description?: string;
  file: File;
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
    title: '备注信息',
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const defaultValue = { net_addr: '127.0.0.1:8080', description: '', args: ['-arg1=hello -arg2=rulex'], local_path: '', running: false };

const ExtendedProtocol = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [detailConfig, setDetailConfig] = useState<{
    type: 'detail' | 'log';
    open: boolean;
    uuid?: string;
  }>({
    type: 'detail',
    open: false,
  });
  const [initialValue, setInitialValue] = useState<Item>(defaultValue);

  // 新建&编辑
  const handleOnFinish = async ({ file, ...params }: FormParams) => {
    try {
      const blob = new Blob([(file as any).originFileObj]);
      if (initialValue?.uuid) {
        await putGoodsUpdate({ ...params, uuid: initialValue?.uuid } as any, blob as File);
        message.success('更新成功');
      } else {
        await postGoodsCreate(params as any, blob as File);
        message.success('新建成功');
      }

      actionRef.current?.reload();
      setInitialValue(defaultValue);

      return true;
    } catch (error) {
      return false;
    }
  };

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
  const { run: getDetail } = useRequest(
    (params: API.getGoodsDetailParams) => getGoodsDetail(params),
    {
      manual: true,
      onSuccess: (data: any) => {
        setInitialValue(data);
      },
    },
  );

  const columns: ProColumns<Item>[] = [
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
            if (!uuid) return;
            setDetailConfig({ type: 'log', open: true, uuid });
          }}
        >
          日志
        </a>,
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            setDetailConfig({ type: 'detail', open: true });
            getDetail({ uuid });
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
    formRef.current?.setFieldsValue({ ...initialValue });
  }, [initialValue]);

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
              data: data as Item[],
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
                setInitialValue(defaultValue);
              }}
              icon={<PlusOutlined />}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <ModalForm
        title={initialValue?.uuid ? '更新协议' : '新建协议'}
        open={open}
        formRef={formRef}
        width="40%"
        layout="horizontal"
        labelCol={{ span: 4 }}
        onOpenChange={(visible) => setOpen(visible)}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        onFinish={handleOnFinish}
        initialValues={defaultValue}
      >
        <ProFormText
          name="net_addr"
          label="接口地址"
          placeholder="请输入接口地址"
          rules={[{ required: true, message: '请输入接口地址' }]}
        />
        <ProFormTextArea
          name="args"
          label="协议参数"
          placeholder="请输入协议参数"
          rules={[{ required: true, message: '请输入协议参数' }]}
        />
        <ProFormUploadDragger
          name="file"
          label="可执行包"
          max={1}
          description=""
          rules={[{ required: true, message: '请上传可执行包' }]}
        />
        <ProFormText name="description" label="备注信息" placeholder="请输入备注信息" />
      </ModalForm>
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
            dataSource={initialValue}
            columns={baseColumns.filter((col) => col.dataIndex !== 'args')}
            column={1}
            labelStyle={{ width: 120, justifyContent: 'end', paddingRight: 10 }}
          >
            <ProDescriptions.Item label="协议参数">{initialValue.args}</ProDescriptions.Item>
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
