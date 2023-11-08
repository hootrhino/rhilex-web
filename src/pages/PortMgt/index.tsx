import { getHwifaceList, postHwifaceUpdate } from '@/services/rulex/jiekouguanli';
import { getOsUarts } from '@/services/rulex/xitongshuju';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { AutoComplete, Button, Card, Descriptions, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum, typeOptions } from './constant';

type InterfaceItem = {
  uuid?: string;
  name?: string;
  type?: string;
  alias?: string;
  description?: string;
  config?: Record<string, any>;
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
  const [open, setOpen] = useState<boolean>(false);
  const { detailConfig, setDetailConfig, detail, getDetail } = useModel('usePort');

  // 获取串口配置
  const { data: uartOptions } = useRequest(() => getOsUarts(), {
    formatResult: (res) =>
      res?.data?.map((item) => ({
        value: item.port,
        label: item.alias,
      })),
  });

  // 更新接口配置
  const handleOnFinish = async ({ config }: InterfaceFormParams) => {
    try {
      const params: UpdateParams = {
        uuid: detail?.uuid || '',
        config: config?.[0],
      };
      message.success('更新成功');
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
      title: '别名',
      dataIndex: 'alias',
    },
    {
      title: '接口类型',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: typeOptions,
      },
    },
    {
      title: '状态',
      dataIndex: 'busy',
      valueEnum: {
        true: {
          text: '占用',
          status: 'warning',
        },
        false: {
          text: '空闲',
          status: 'success',
        },
      },
    },
    {
      title: '占用设备',
      dataIndex: 'occupyBy',
      renderText: (occupyBy) => {
        return occupyBy?.name;
      },
    },
    {
      title: '接口配置',
      dataIndex: 'config',
      valueType: 'formList',
      hideInTable: true,
      renderText: (config) => {
        return (
          <Card bodyStyle={{ padding: '16px 18px' }}>
            <Descriptions column={1} labelStyle={{ width: 130, justifyContent: 'flex-end' }}>
              <Descriptions.Item label="超时时间（毫秒）">{config?.timeout}</Descriptions.Item>
              <Descriptions.Item label="波特率">{config?.baudRate}</Descriptions.Item>
              <Descriptions.Item label="数据位">{config?.dataBits}</Descriptions.Item>
              <Descriptions.Item label="奇偶校验">{parityEnum[config?.parity]}</Descriptions.Item>
              <Descriptions.Item label="停止位">{config?.stopBits}</Descriptions.Item>
              <Descriptions.Item label="串口路径">{config?.uart}</Descriptions.Item>
            </Descriptions>
          </Card>
        );
      },
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
      hideInDescriptions: true,
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            getDetail({ uuid });
            setDetailConfig({ open: true, uuid });
          }}
        >
          详情
        </a>,
        <a
          key="edit"
          onClick={() => {
            if (!uuid) return;
            getDetail({ uuid });
            setOpen(true);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, config: [detail?.config] });
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
          <ProFormSelect
            name="type"
            label="接口类型"
            placeholder="请选择接口类型"
            width="sm"
            disabled
            options={typeOptions}
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
      <Modal
        title="接口详情"
        open={detailConfig.open}
        onCancel={() => setDetailConfig({ open: false, uuid: '' })}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={() => setDetailConfig({ open: false, uuid: '' })}>
            关闭
          </Button>
        }
      >
        <ProDescriptions
          column={1}
          columns={columns as any}
          dataSource={detail}
          labelStyle={{ width: 80, justifyContent: 'flex-end' }}
        />
      </Modal>
    </>
  );
};

export default Interface;
