import { deviceAvatar } from '@/pages/Device/enum';
import { getDevicesList } from '@/services/rulex/shebeiguanli';
import { cn } from '@/utils/utils';
import { ProList } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Avatar, Badge } from 'antd';
import { useState } from 'react';

const DeviceList = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);

  const { data } = useRequest(() => getDevicesList({ current: 1, size: 999 }));

  return (
    <div className={cn('h-full bg-[#fff]')}>
      <ProList
        rowKey="uuid"
        size="small"
        headerTitle={<span className="text-[14px]">活跃设备</span>}
        dataSource={data?.records}
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            dataIndex: 'uuid',
          },
          avatar: {
            render: (_, { type }) => (
              <Avatar className="w-[18px] h-[18px]">{deviceAvatar[type]}</Avatar>
            ),
          },
          description: {
            render: (_, { description }) => <div className="truncate">{description}</div>,
          },
          actions: {
            render: (_, { state }) => (
              <Badge
                status={state === 0 ? 'error' : 'success'}
                text={state === 0 ? '离线' : '在线'}
              />
            ),
          },
        }}
        className="device-card"
      />
    </div>
  );
};

export default DeviceList;
