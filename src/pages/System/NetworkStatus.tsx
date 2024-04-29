import { getSettingsNetDetails, getSettingsNetStatus } from '@/services/rulex/wangluopeizhi';
import { pick } from '@/utils/redash';
import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Descriptions, Modal } from 'antd';
import { useState } from 'react';

type NetStatusItem = {
  device: string;
  type: string;
  state: string;
  connection: string;
};

const typeEnum = {
  ethernet: '以太网',
  wifi: 'WiFi',
  bridge: '桥接设备',
};

const stateEnum = {
  connected: '已连接到',
  disconnected: '未连接',
  unmanaged: '系统默认',
  unavailable: '网络不可用',
};

const detailColumns = {
  device: '网卡名称',
  type: '网卡类型',
  hwAddr: '物理地址',
  mtu: '网络 MTU',
  connection: '当前网络',
  ipv4Addr: 'IPV4 地址',
  ipv6Addr: 'IPV6 地址',
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
      title: '网卡名称',
      dataIndex: 'device',
    },
    {
      title: '网卡类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: typeEnum,
    },
    {
      title: '网络状态',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: stateEnum,
    },
    {
      title: '当前网络',
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
    <ProCard title="网络状态">
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
        title="网卡详情"
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
                labelStyle={{ minWidth: 100, justifyContent: 'end' }}
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
