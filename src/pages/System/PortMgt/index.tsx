import PageContainer from '@/components/PageContainer';
import UnitValue from '@/components/UnitValue';
import { getHwifaceList, getHwifaceRefresh } from '@/services/rulex/jiekouguanli';
import { ScanOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { getLocale, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Card, Descriptions, message, Modal } from 'antd';
import { useRef, useState } from 'react';
import { parityEnum, typeOption } from './enum';
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
  const { formatMessage } = useIntl();
  const [formConfig, setFormConfig] = useState<DetailModalConfig>({ open: false, uuid: '' });
  const { detailConfig, setDetailConfig, detail, getDetail } = useModel('usePort');

  // 扫描端口
  const { run: refresh } = useRequest(() => getHwifaceRefresh(), {
    manual: true,
    onSuccess: () => message.success(formatMessage({ id: 'message.success.scan' })),
  });

  const columns: ProColumns<InterfaceItem>[] = [
    {
      title: formatMessage({ id: 'system.form.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'system.form.title.alias' }),
      dataIndex: 'alias',
    },
    {
      title: formatMessage({ id: 'system.form.title.type' }),
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: typeOption,
      },
    },
    {
      title: formatMessage({ id: 'system.form.title.busy' }),
      dataIndex: 'busy',
      valueEnum: {
        true: {
          text: formatMessage({ id: 'status.busy' }),
          status: 'warning',
        },
        false: {
          text: formatMessage({ id: 'status.free' }),
          status: 'success',
        },
      },
    },
    {
      title: formatMessage({ id: 'system.form.title.occupyBy' }),
      dataIndex: 'occupyBy',
      renderText: (occupyBy) => {
        return occupyBy?.name;
      },
    },
    {
      title: formatMessage({ id: 'system.form.title.config' }),
      dataIndex: 'config',
      valueType: 'formList',
      hideInTable: true,
      renderText: (config) => {
        if (!config) return;
        const { timeout, baudRate, dataBits, parity, stopBits, uart } = config;

        return (
          <Card styles={{ body: { padding: '16px 18px' } }}>
            <Descriptions
              column={1}
              labelStyle={{
                width: 100,
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Descriptions.Item label={formatMessage({ id: 'system.form.title.timeout' })}>
                <UnitValue value={timeout} />
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'system.form.title.baudRate' })}>
                {baudRate}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'system.form.title.dataBits' })}>
                {dataBits}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'system.form.title.parity' })}>
                {parityEnum[parity]}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'system.form.title.stopBits' })}>
                {stopBits}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'system.form.title.uart' })}>
                {uart}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        );
      },
    },
    {
      title: formatMessage({ id: 'table.desc' }),
      dataIndex: 'description',
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      key: 'option',
      width: 120,
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
          {formatMessage({ id: 'button.detail' })}
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
          rootClassName="stripe-table"
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
              {formatMessage({ id: 'system.button.scan' })}
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
        title={formatMessage({ id: 'system.modal.title.portDetail' })}
        open={detailConfig.open}
        onCancel={() => setDetailConfig({ open: false, uuid: '' })}
        maskClosable={false}
        destroyOnClose
        footer={
          <Button type="primary" onClick={() => setDetailConfig({ open: false, uuid: '' })}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
      >
        <ProDescriptions
          column={1}
          columns={columns as any}
          dataSource={detail}
          labelStyle={{
            width: getLocale() === 'en-US' ? 180 : 80,
            justifyContent: 'flex-end',
            paddingRight: 10,
          }}
        />
      </Modal>
    </>
  );
};

export default Interface;
