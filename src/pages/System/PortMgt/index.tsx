import PageContainer from '@/components/PageContainer';
import UnitTitle from '@/components/UnitTitle';
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
      title: formatMessage({ id: 'portMgt.form.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'portMgt.form.title.alias' }),
      dataIndex: 'alias',
    },
    {
      title: formatMessage({ id: 'portMgt.form.title.type' }),
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: typeOption,
      },
    },
    {
      title: formatMessage({ id: 'portMgt.form.title.busy' }),
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
      title: formatMessage({ id: 'portMgt.form.title.occupyBy' }),
      dataIndex: 'occupyBy',
      renderText: (occupyBy) => {
        return occupyBy?.name;
      },
    },
    {
      title: formatMessage({ id: 'portMgt.form.title.config' }),
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
                width: getLocale() === 'en-US' ? 155 : 120,
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Descriptions.Item
                label={<UnitTitle title={formatMessage({ id: 'portMgt.form.title.timeout' })} />}
              >
                {timeout}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'portMgt.form.title.baudRate' })}>
                {baudRate}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'portMgt.form.title.dataBits' })}>
                {dataBits}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'portMgt.form.title.parity' })}>
                {parityEnum[parity]}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'portMgt.form.title.stopBits' })}>
                {stopBits}
              </Descriptions.Item>
              <Descriptions.Item label={formatMessage({ id: 'portMgt.form.title.uart' })}>
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
              {formatMessage({ id: 'portMgt.button.scan' })}
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
        title={formatMessage({ id: 'portMgt.modal.title.detail' })}
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
