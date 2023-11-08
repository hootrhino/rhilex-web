import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';

type StateTagProps = {
  state: number;
};

const StateTag = ({ state }: StateTagProps) => {
  const valueEnum = {
    0: { text: '故障', color: 'error', icon: <CloseCircleOutlined /> },
    1: { text: '启用', color: 'success', icon: <CheckCircleOutlined /> },
    2: { text: '暂停', color: 'warning', icon: <ClockCircleOutlined /> },
    3: { text: '停止', color: 'default', icon: <MinusCircleOutlined /> },
  };

  return (
    <Tag icon={valueEnum[state]?.icon} color={valueEnum[state]?.color}>
      {valueEnum[state]?.text}
    </Tag>
  );
};

export default StateTag;
