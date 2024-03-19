import { IconFont } from '@/utils/utils';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';

type StateTagProps = {
  state: number;
};

const StateTag = ({ state }: StateTagProps) => {
  const valueEnum = {
    0: { text: '故障', color: 'error', icon: <IconFont type="icon-close-circle" /> },
    1: { text: '启用', color: 'success', icon: <CheckCircleOutlined /> },
    2: { text: '暂停', color: 'warning', icon: <ClockCircleOutlined /> },
    3: { text: '停止', color: 'default', icon: <MinusCircleOutlined /> },
    4: { text: '加载中', color: 'processing', icon: <SyncOutlined spin /> },
  };

  return (
    <Tag icon={valueEnum[state]?.icon} color={valueEnum[state]?.color}>
      {valueEnum[state]?.text}
    </Tag>
  );
};

export default StateTag;
