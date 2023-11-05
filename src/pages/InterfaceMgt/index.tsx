import { getHwifaceDetail, getHwifaceList, postHwifaceUpdate } from '@/services/rulex/jiekouguanli';
import { getOsUarts } from '@/services/rulex/xitongshuju';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { AutoComplete, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  baudRateEnum,
  dataBitsEnum,
  parityEnum,
  stopBitsEnum,
} from '../Devices/components/columns';

type InterfaceItem = {
  uuid?: string;
  name?: string;
  type?: string;
  alias?: string;
  description?: string;
};

type InterfaceFormParams = InterfaceItem & {
  config: {
    timeout: number;
    baudRate: number;
    dataBits: number;
    parity: string;
    stopBits: number;
    uart: string;
  };
};

type UpdateParams = {
  uuid: string;
  config: Record<string, any>;
};

const Interface = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const { isWindows } = useModel('useSystem');
  const [open, setOpen] = useState<boolean>(false);

  const defaultInitialValues = {
    config: [
      {
        timeout: 3000,
        baudRate: '9600',
        dataBits: '8',
        stopBits: '1',
        parity: 'N',
        uart: isWindows ? 'COM1' : '/dev/ttyS1',
      },
    ],
  };

  // 获取串口配置
  const { data: uartOptions } = useRequest(() => getOsUarts(), {
    formatResult: (res) =>
      res?.data?.map((item) => ({
        value: item.port,
        label: item.alias,
      })),
  });

  // 详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getHwifaceDetailParams) => getHwifaceDetail(params),
    {
      manual: true,
    },
  );

  // 更新接口配置
  const handleOnFinish = async ({ config }: InterfaceFormParams) => {
    try {
      const params: UpdateParams = {
        uuid: detail?.uuid || '',
        config: config?.[0],
      };

      await postHwifaceUpdate(params);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<InterfaceItem>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
    },
    {
      title: '接口类型',
      dataIndex: 'type',
      valueEnum: {
        UART: '串口',
      },
    },
    {
      title: '别名',
      dataIndex: 'alias',
    },
    {
      title: '备注',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            getDetail({ uuid }).then(() => setOpen(true));
          }}
        >
          详情
        </a>,
        <a key="edit" onClick={() => setOpen(true)}>
          编辑
        </a>,
      ],
    },
  ];

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, config: [detail?.config] });
    } else {
      formRef.current?.setFieldsValue({ ...defaultInitialValues });
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
            const { data } = await getHwifaceList();

            return Promise.resolve({
              data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
        />
      </PageContainer>
      <ModalForm
        formRef={formRef}
        title="更新接口"
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        modalProps={{ destroyOnClose: true, maskClosable: false }}
        onFinish={handleOnFinish}
      >
        <ProForm.Group>
          <ProFormText
            name="name"
            label="接口名称"
            placeholder="请输入接口名称"
            width="sm"
            disabled
          />
          <ProFormText
            name="type"
            label="接口类型"
            placeholder="请选择接口类型"
            width="sm"
            disabled
          />
          <ProFormText name="alias" label="别名" placeholder="请输入别名" width="sm" disabled />
        </ProForm.Group>
        <ProFormList
          name="config"
          label="接口配置"
          creatorButtonProps={false}
          copyIconProps={false}
          deleteIconProps={false}
          itemContainerRender={(doms) => (
            <Card type="inner" bodyStyle={{ padding: '16px 18px' }}>
              {doms}
            </Card>
          )}
        >
          <ProForm.Group>
            <ProFormDigit
              name="timeout"
              label="超时时间（毫秒）"
              width="sm"
              placeholder="请输入超时时间"
              rules={[{ required: true, message: '请输入超时时间' }]}
            />
            <ProFormSelect
              label="波特率"
              name="baudRate"
              width="sm"
              valueEnum={baudRateEnum}
              placeholder="请选择波特率"
              rules={[{ required: true, message: '请选择波特率' }]}
            />
            <ProFormSelect
              label="数据位"
              name="dataBits"
              width="sm"
              valueEnum={dataBitsEnum}
              placeholder="请选择数据位"
              rules={[{ required: true, message: '请选择数据位' }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              label="奇偶校验"
              name="parity"
              width="sm"
              valueEnum={parityEnum}
              placeholder="请选择奇偶校验"
              rules={[{ required: true, message: '请选择奇偶校验' }]}
            />
            <ProFormSelect
              label="停止位"
              name="stopBits"
              width="sm"
              valueEnum={stopBitsEnum}
              placeholder="请选择停止位"
              rules={[{ required: true, message: '请选择停止位' }]}
            />
            <ProForm.Item
              label="串口路径"
              name="uart"
              rules={[{ required: true, message: '请输入本地系统的串口路径' }]}
              className="w-[216px]"
            >
              <AutoComplete
                className="w-full"
                options={uartOptions}
                placeholder="请输入本地系统的串口路径"
              />
            </ProForm.Item>
          </ProForm.Group>
        </ProFormList>
        <ProFormText name="description" label="备注" placeholder="请输入备注" disabled />
      </ModalForm>
    </>
  );
};

export default Interface;
