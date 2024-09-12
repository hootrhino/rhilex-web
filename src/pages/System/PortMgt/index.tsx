import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import UnitValue from '@/components/UnitValue';
import {
  getHwifaceDetail,
  getHwifaceList,
  getHwifaceRefresh,
  postHwifaceUpdate,
} from '@/services/rhilex/jiekouguanli';
import { isEmpty } from '@/utils/redash';
import { ScanOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Card, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { parityEnum, typeOption } from './enum';
import type { InterfaceFormParams, UpdateParams } from './Update';
import Update from './Update';

export type InterfaceItem = {
  uuid?: string;
  name?: string;
  type?: string;
  alias?: string;
  description?: string;
  config?: Record<string, any>;
};

const Interface = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage, locale } = useIntl();
  const { detailConfig, changeConfig, initialConfig } = useModel('useCommon');
  const isEn = locale === 'en-US';

  const [openUpdateModal, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // 接口详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getHwifaceDetailParams) => getHwifaceDetail(params),
    {
      manual: true,
    },
  );

  // 扫描端口
  const { run: refresh } = useRequest(() => getHwifaceRefresh(), {
    manual: true,
  });

  // 更新接口配置
  const handleOnFinish = async ({ config, description }: InterfaceFormParams) => {
    try {
      const params: UpdateParams = {
        uuid: detail?.uuid || '',
        config: config?.[0],
        description: description || '',
      };

      await postHwifaceUpdate(params);
      message.success(formatMessage({ id: 'message.success.update' }));
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

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
      title: formatMessage({ id: 'form.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'form.title.alias' }),
      dataIndex: 'alias',
    },
    {
      title: formatMessage({ id: 'form.title.type' }),
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: typeOption,
      },
    },
    {
      title: formatMessage({ id: 'form.title.status' }),
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
              labelWidth={isEn ? 90 : 70}
              dataSource={config}
            />
          </Card>
        );
      },
    },
    {
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      valueType: 'option',
      key: 'option',
      width: 120,
      hideInDescriptions: true,
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            changeConfig({ open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="edit"
          onClick={async () => {
            if (!uuid) return;
            getDetail({ uuid }).then((res) => {
              if (!isEmpty(res)) {
                setOpen(true);
              }
            });
          }}
        >
          {formatMessage({ id: 'button.edit' })}
        </a>,
      ],
    },
  ];

  useEffect(() => {
    if (detailConfig.open && detailConfig.uuid) {
      getDetail({ uuid: detailConfig.uuid });
    }
  }, [detailConfig]);

  return (
    <ProCard title={formatMessage({ id: 'system.tab.port' })} headStyle={{ paddingBlock: 0 }}>
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
          <Button
            key="refresh"
            type="primary"
            loading={loading}
            icon={<ScanOutlined />}
            onClick={() => {
              refresh();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                actionRef.current?.reload();
                message.success(formatMessage({ id: 'message.success.scan' }));
              }, 2000);
            }}
          >
            {formatMessage({ id: 'system.button.scan' })}
          </Button>,
        ]}
      />

      <Update
        open={openUpdateModal}
        onOpenChange={(visible) => setOpen(visible)}
        onFinish={handleOnFinish}
        dataSource={detail as InterfaceItem}
      />
      <Modal
        destroyOnClose
        title={formatMessage({ id: 'system.modal.title.portDetail' })}
        open={detailConfig.open}
        onCancel={initialConfig}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={initialConfig}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
      >
        <ProDescriptions
          columns={columns as EnhancedProDescriptionsItemProps[]}
          dataSource={detail}
          labelWidth={isEn ? 180 : 80}
        />
      </Modal>
    </ProCard>
  );
};

export default Interface;
