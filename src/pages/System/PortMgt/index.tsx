import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import PageContainer from '@/components/ProPageContainer';
import UnitValue from '@/components/UnitValue';
import { getHwifaceList, getHwifaceRefresh } from '@/services/rulex/jiekouguanli';
import { ScanOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getLocale, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Card, message, Modal } from 'antd';
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

  const configColumns = [
    {
      title: formatMessage({ id: 'system.form.title.timeout' }),
      dataIndex: 'timeout',
      renderText: (timeout: number) => <UnitValue value={timeout} />,
    },
    {
      title: formatMessage({ id: 'system.form.title.baudRate' }),
      dataIndex: 'baudRate',
    },
    {
      title: formatMessage({ id: 'system.form.title.dataBits' }),
      dataIndex: 'dataBits',
    },
    {
      title: formatMessage({ id: 'system.form.title.parity' }),
      dataIndex: 'parity',
      valueType: 'select',
      valueEnum: parityEnum,
    },
    {
      title: formatMessage({ id: 'system.form.title.stopBits' }),
      dataIndex: 'stopBits',
    },
    {
      title: formatMessage({ id: 'system.form.title.uart' }),
      dataIndex: 'uart',
    },
  ];

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
      ellipsis: true,
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

        return (
          <Card styles={{ body: { padding: '16px 18px' } }}>
            <ProDescriptions
              columns={configColumns as EnhancedProDescriptionsItemProps[]}
              labelWidth={getLocale() === 'en-US' ? 90 : 70}
              dataSource={config}
            />
          </Card>
        );
      },
    },
    {
      title: formatMessage({ id: 'table.desc' }),
      dataIndex: 'description',
      ellipsis: true,
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
          scroll={{ y: 400 }}
          request={async () => {
            const { data } = await getHwifaceList();

            return Promise.resolve({
              data: [...data, ...data, ...data, ...data],
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
          columns={columns as EnhancedProDescriptionsItemProps[]}
          dataSource={detail}
          labelWidth={getLocale() === 'en-US' ? 180 : 80}
        />
      </Modal>
    </>
  );
};

export default Interface;
