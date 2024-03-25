import { getSettingsNetDetails, getSettingsNetStatus } from '@/services/rulex/wangluopeizhi';
import { pick } from '@/utils/redash';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Descriptions, Modal } from 'antd';
import { useState } from 'react';
import Title from './components/Title';

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
  device: '接口名称',
  type: '接口类型',
  hwAddr: '物理地址',
  mtu: '接口 MTU',
  // "state": "10",
  connection: '当前网络',
  // "carrier": "on",
  ipv4Addr: 'IPV4 地址',
  // "ipv4Gateway": "172.28.0.1",
  // "ipv4Dns": "",
  ipv6Addr: 'IPV6 地址',
  // "ipv6Gateway": "--"
};

const NetworkStatus = () => {
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
      title: '操作',
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
          详情
        </a>,
      ],
    },
  ];

  return (
    <>
      <Title name="网络状态" />
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
            关闭
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
    </>
  );
};

export default NetworkStatus;
