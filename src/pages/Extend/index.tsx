import { message } from '@/components/PopupHack';
import {
  deleteGoods,
  getDataCenterGoodsList,
  getGoodsDetail,
  postGoodsCreate,
  putGoodsUpdate,
} from '@/services/rulex/kuozhanxieyi';
import { PlusOutlined } from '@ant-design/icons';
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
import { Button, Modal, Popconfirm } from 'antd';
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
  local_path: string;
  description: string;
};

const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
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
  },
  {
    title: '运行状态',
    dataIndex: 'running',
    valueEnum: {
      false: { text: '停止', status: 'Error' },
      true: { text: '运行中', status: 'Processing' },
    },
  },
  {
    title: '备注信息',
    dataIndex: 'description',
    ellipsis: true,
  },
];

const defaultValue = { net_addr: '', description: '', args: [], local_path: '', running: false };

const ExtendedProtocol = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Item>(defaultValue);

  // 新建&编辑
  const handleOnFinish = async (values: FormParams) => {
    try {
      if (initialValue?.uuid) {
        // TODO 更新
        await putGoodsUpdate({ ...values, uuid: initialValue?.uuid });
        message.success('更新成功');
      } else {
        // TODO 新建
        await postGoodsCreate(values);
        message.success('新建成功');
      }
      console.log(values);
      return true;
    } catch (error) {
      return false;
    }
  };

  // 删除
  const { run: remove } = useRequest((params) => deleteGoods(params), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
    },
  });

  // 详情
  const { run: getDetail } = useRequest((params) => getGoodsDetail(params), {
    manual: true,
    onSuccess: (res: any) => {
      setInitialValue(res?.data);
    },
  });

  const columns: ProColumns<Item>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 200,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            setOpenDetail(true);
            getDetail({ uuid });
          }}
        >
          详情
        </a>,
        <a
          key="edit"
          onClick={() => {
            setOpen(true);
            getDetail({ uuid });
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确定要删除该扩展协议？" onConfirm={() => remove({ uuid })} key="remove">
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
            const { data } = await getDataCenterGoodsList();

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
          name="local_path"
          label="可执行包"
          max={1}
          description=""
          rules={[{ required: true, message: '请上传可执行包' }]}
        />
        <ProFormText name="description" label="备注信息" placeholder="请输入备注信息" />
      </ModalForm>
      <Modal open={openDetail}>
        <ProDescriptions title="扩展协议详情" dataSource={initialValue} columns={baseColumns} column={1} />
      </Modal>
    </>
  );
};

export default ExtendedProtocol;
