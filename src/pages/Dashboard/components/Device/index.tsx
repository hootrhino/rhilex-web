import deviceIcon from '@/assets/images/device.svg';
import { DeviceType } from '@/pages/Devices/enum';
import { cn } from '@/utils/utils';
import { ProList } from '@ant-design/pro-components';
import { Avatar, Badge } from 'antd';
import { useState } from 'react';

const defaultData = [
  {
    uuid: 'UUID_123445ffffff',
    name: '语雀的天空',
    image: deviceIcon,
    desc: '我是一条测试的描述我是一条测试的描述我是一条测试的描述我是一条测试的描述我是一条测试的描述我是一条测试的描述我是一条测试的描述我是一条测试的描述',
  },
  {
    uuid: 'UUID_2dhhdhdhd',
    name: 'Ant Design',
    image: deviceIcon,
    desc: '我是一条测试的描述',
  },
  {
    uuid: 'UUID_dhdhdnddhhddh',
    name: '蚂蚁金服体验科技',
    image: deviceIcon,
    desc: '我是一条测试的描述',
  },
  {
    uuid: 'UUID_4sjsjjsjjs',
    name: 'TechUI',
    image: deviceIcon,
    desc: '我是一条测试的描述',
  },
];

export const deviceAvatar = {
  [DeviceType.GENERIC_PROTOCOL]: 'PROT',
  [DeviceType.GENERIC_MODBUS]: 'MB',
  [DeviceType.GENERIC_AIS_RECEIVER]: 'AIS',
  [DeviceType.SIEMENS_PLC]: 'PLC',
  [DeviceType.GENERIC_HTTP_DEVICE]: 'HTTP',
  [DeviceType.GENERIC_CAMERA]: 'CAM',
};

const DeviceList = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);

  return (
    <div className={cn('h-full bg-[#fff]')}>
      <ProList
        rowKey="uuid"
        size="small"
        headerTitle={<span className="text-[14px]">设备状态</span>}
        dataSource={defaultData}
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            dataIndex: 'uuid',
          },
          avatar: {
            render: () => <Avatar className="w-[18px] h-[18px]">AIS</Avatar>,
          },
          description: {
            render: (_, { desc }) => <div className="truncate">{desc}</div>,
          },
          actions: {
            render: () => <Badge status="success" text="在线" />,
          },
        }}
        className="device-card"
      />
    </div>
  );
};

export default DeviceList;
