import ProDescriptions from '@/components/ProDescriptions';
import { getSettingsNetDetails, getSettingsNetStatus } from '@/services/rulex/wangluopeizhi';
import { pick } from '@/utils/redash';
import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useState } from 'react';

type NetStatusItem = {
  device: string;
  type: string;
  state: string;
  connection: string;
};

const typeEnum = {
  ethernet: <FormattedMessage id="system.type.ethernet" />,
  wifi: 'WIFI',
  bridge: <FormattedMessage id="system.type.bridge" />,
  loopback: <FormattedMessage id="system.type.loopback" />,
};

const stateEnum = {
  connected: <FormattedMessage id="system.state.connected" />,
  disconnected: <FormattedMessage id="system.state.disconnected" />,
  unmanaged: <FormattedMessage id="system.state.unmanaged" />,
  unavailable: <FormattedMessage id="system.state.unavailable" />,
};

const detailColumns = [
  {
    title: <FormattedMessage id="system.table.title.device" />,
    dataIndex: 'device',
  },
  {
    title: <FormattedMessage id="system.table.title.type" />,
    dataIndex: 'type',
  },
  {
    title: <FormattedMessage id="system.table.title.hwAddr" />,
    dataIndex: 'hwAddr',
  },
  {
    title: <FormattedMessage id="system.table.title.mtu" />,
    dataIndex: 'mtu',
  },
  {
    title: <FormattedMessage id="system.table.title.connection" />,
    dataIndex: 'connection',
  },
  {
    title: <FormattedMessage id="system.table.title.ipv4Addr" />,
    dataIndex: 'ipv4Addr',
  },
  {
    title: <FormattedMessage id="system.table.title.ipv6Addr" />,
    dataIndex: 'ipv6Addr',
  },
];

const NetworkStatus = () => {
  const { formatMessage, locale } = useIntl();
  const [open, setOpen] = useState<boolean>(false);

  const { data: detail, run: getDetail } = useRequest(
    (params: API.getSettingsNetDetailsParams) => getSettingsNetDetails(params),
    {
      manual: true,
      formatResult: (res) =>
        pick(res.data, ['device', 'type', 'hwAddr', 'mtu', 'connection', 'ipv4Addr', 'ipv6Addr']),
      onSuccess: () => setOpen(true),
    },
  );

  const columns: ProColumns<Partial<NetStatusItem>>[] = [
    {
      title: formatMessage({ id: 'system.table.title.device' }),
      dataIndex: 'device',
    },
    {
      title: formatMessage({ id: 'system.table.title.type' }),
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: typeEnum,
    },
    {
      title: formatMessage({ id: 'system.table.title.state' }),
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: stateEnum,
    },
    {
      title: formatMessage({ id: 'system.table.title.connection' }),
      dataIndex: 'connection',
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: 80,
      render: (_, { device }) => [
        <a
          key="detail"
          onClick={() => {
            if (!device) return;
            getDetail({ iface: device });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
      ],
    },
  ];

  return (
    <ProCard title={formatMessage({ id: 'system.tab.netStatus' })} headStyle={{ paddingBlock: 0 }}>
      <ProTable
        rowKey="device"
        columns={columns}
        search={false}
        pagination={false}
        options={false}
        request={async () => {
          const { data } = await getSettingsNetStatus();
          return Promise.resolve({
            data,
            success: true,
          });
        }}
      />
      <Modal
        open={open}
        title={formatMessage({ id: 'system.title.network.detail' })}
        destroyOnClose
        footer={
          <Button type="primary" onClick={() => setOpen(false)}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
        onCancel={() => setOpen(false)}
      >
        <ProDescriptions
          columns={detailColumns}
          dataSource={detail}
          labelWidth={locale === 'en-US' ? 130 : 100}
        />
      </Modal>
    </ProCard>
  );
};

export default NetworkStatus;
