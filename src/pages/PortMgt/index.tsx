import PageContainer from '@/components/PageContainer';
import UnitTitle from '@/components/UnitTitle';
import { getHwifaceList, getHwifaceRefresh } from '@/services/rulex/jiekouguanli';
import { ScanOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button, Card, Descriptions, message, Modal } from 'antd';
import { useRef, useState } from 'react';
import { parityEnum, typeOptions } from './enum';
import Update from './Update';

export type InterfaceItem = {
  uuid?: string;
  name?: string;
  type?: string;
  alias?: string;
  description?: string;
  config?: Record<string, any>;
};

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const Interface = () => {
  const actionRef = useRef<ActionType>();
  const [formConfig, setFormConfig] = useState<DetailModalConfig>({ open: false, uuid: '' });
  const { detailConfig, setDetailConfig, detail, getDetail } = useModel('usePort');

  // 扫描端口
  const { run: refresh } = useRequest(() => getHwifaceRefresh(), {
    manual: true,
    onSuccess: () => message.success('扫描成功'),
  });

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
        if (!config) return;
        const { timeout, baudRate, dataBits, parity, stopBits, uart } = config;

        return (
          <Card styles={{ body: { padding: '16px 18px' } }}>
            <Descriptions column={1} labelStyle={{ width: 130, justifyContent: 'flex-end' }}>
              <Descriptions.Item label={<UnitTitle title="超时时间" />}>
                {timeout}
              </Descriptions.Item>
              <Descriptions.Item label="波特率">{baudRate}</Descriptions.Item>
              <Descriptions.Item label="数据位">{dataBits}</Descriptions.Item>
              <Descriptions.Item label="奇偶校验">{parityEnum[parity]}</Descriptions.Item>
              <Descriptions.Item label="停止位">{stopBits}</Descriptions.Item>
              <Descriptions.Item label="串口路径">{uart}</Descriptions.Item>
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
            setFormConfig({ open: true, uuid });
          }}
        >
          编辑
        </a>,
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
            const { data } = await getHwifaceList();

            return Promise.resolve({
              data,
              success: true,
            });
          }}
          toolBarRender={() => [
            <Button key="refresh" type="primary" icon={<ScanOutlined />} onClick={refresh}>
              扫描端口
            </Button>,
          ]}
        />
      </PageContainer>
      <Update
        {...formConfig}
        onOpenChange={(visible) => setFormConfig({ open: visible, uuid: '' })}
        reload={() => actionRef.current?.reload()}
      />
      <Modal
        title="接口详情"
        open={detailConfig.open}
        onCancel={() => setDetailConfig({ open: false, uuid: '' })}
        maskClosable={false}
        destroyOnClose
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
