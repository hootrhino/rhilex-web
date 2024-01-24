import { getSettingsNetStatus } from '@/services/rulex/wangluopeizhi';
import { ProTable } from '@ant-design/pro-components';
import Title from './components/Title';

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

const NetworkStatus = () => {
  const columns = [
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
  ];

  return (
    <>
      <Title name="网络状态" />
      <ProTable
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
    </>
  );
};

export default NetworkStatus;
