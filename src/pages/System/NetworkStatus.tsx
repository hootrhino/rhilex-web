import { getSettingsNetDetails, getSettingsNetStatus } from '@/services/rulex/wangluopeizhi';
import { pick } from '@/utils/redash';
import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Descriptions, Modal } from 'antd';
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

const detailColumns = {
  device: <FormattedMessage id="system.table.title.device" />,
  type: <FormattedMessage id="system.table.title.type" />,
  hwAddr: <FormattedMessage id="system.table.title.hwAddr" />,
  mtu: <FormattedMessage id="system.table.title.mtu" />,
  connection: <FormattedMessage id="system.table.title.connection" />,
  ipv4Addr: <FormattedMessage id="system.table.title.ipv4Addr" />,
  ipv6Addr: <FormattedMessage id="system.table.title.ipv6Addr" />,
};

const NetworkStatus = () => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);

  const { data: detail, run: getDetail } = useRequest(
    (params: API.getSettingsNetDetailsParams) => getSettingsNetDetails(params),
    {
      manual: true,
      formatResult: (res) =>
        pick(res.data, ['device', 'type', 'hwAddr', 'mtu', 'connection', 'ipv4Addr', 'ipv6Addr']),
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
            getDetail({ iface: device }).then(() => setOpen(true));
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
      ],
    },
  ];

  return (
    <ProCard title={formatMessage({ id: 'system.tab.netStatus' })}>
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
        <Descriptions column={1}>
          {detail &&
            Object.keys(detail)?.map((item) => (
              <Descriptions.Item
                label={detailColumns[item]}
                key={item}
                labelStyle={{ minWidth: 130, justifyContent: 'end' }}
              >
                {detail[item]}
              </Descriptions.Item>
            ))}
        </Descriptions>
      </Modal>
    </ProCard>
  );
};

export default NetworkStatus;
