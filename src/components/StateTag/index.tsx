import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import { useEffect, useState } from 'react';

export enum StateType {
  POINT = 'point',
  APPSTACK = 'appStack',
  BOOL = 'bool',
  PARSE = 'parse',
  NOTICE = 'notice',
  LEVEL = 'level',
  RUNNING = 'running',
  DEVICE = 'device',
  GOODSTYPE = 'goodsType',
  DEFAULT = 'default',
}

type StateTagProps = {
  state: number | boolean | string;
  type?: StateType;
};

const defaultStateEnum = {
  0: { text: '故障', color: 'error', icon: <CloseCircleOutlined /> },
  1: { text: '启用', color: 'success', icon: <CheckCircleOutlined /> },
  2: { text: '暂停', color: 'warning', icon: <ClockCircleOutlined /> },
  3: { text: '停止', color: 'default', icon: <MinusCircleOutlined /> },
  4: { text: '加载中', color: 'processing', icon: <SyncOutlined spin /> },
};

const pointStateEnum = {
  1: {
    text: '正常',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  0: {
    text: '异常',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};

const appStackStateEnum = {
  1: {
    text: '运行中',
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  0: {
    text: '已结束',
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

const boolStateEnum = {
  true: {
    text: '开启',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  false: {
    text: '关闭',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};

const deviceStateEnum = {
  true: {
    text: '在线',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  false: {
    text: '离线',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};

const parseStateEnum = {
  true: {
    text: '解析',
    color: 'processing',
  },
  false: {
    text: '不解析',
    color: 'default',
  },
};

const noticeStateEnum = {
  INFO: {
    text: '信息',
    color: 'processing',
  },
  ERROR: {
    text: '错误',
    color: 'error',
  },
  WARNING: {
    text: '报警',
    color: 'warning',
  },
};

export const levelStateEnum = {
  fatal: { text: 'Fatal', status: 'Error' },
  error: {
    text: 'Error',
    status: 'Error',
  },
  warn: {
    text: 'Warn',
    status: 'Warning',
  },
  debug: {
    text: 'Debug',
    status: 'Default',
  },
  info: {
    text: 'Info',
    status: 'Processing',
  },
};

const runningStateEnum = {
  true: {
    text: '运行中',
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  false: {
    text: '停止',
    color: 'error',
    icon: <MinusCircleOutlined />,
  },
};

const goodsTypeStateEnum = {
  true: {
    text: '内部',
    color: 'green',
  },
  false: {
    text: '外部',
    color: 'purple',
  },
};

const dataSource = {
  [StateType.POINT]: pointStateEnum,
  [StateType.APPSTACK]: appStackStateEnum,
  [StateType.BOOL]: boolStateEnum,
  [StateType.PARSE]: parseStateEnum,
  [StateType.NOTICE]: noticeStateEnum,
  [StateType.LEVEL]: levelStateEnum,
  [StateType.RUNNING]: runningStateEnum,
  [StateType.DEVICE]: deviceStateEnum,
  [StateType.GOODSTYPE]: goodsTypeStateEnum,
  [StateType.DEFAULT]: defaultStateEnum,
};

const StateTag = ({ state, type = StateType.DEFAULT }: StateTagProps) => {
  const [activeState, setActiveState] = useState<number | string>(0);

  const props = [StateType.PARSE, StateType.LEVEL, StateType.NOTICE, StateType.GOODSTYPE].includes(
    type,
  )
    ? {
        color: dataSource[type][activeState]?.color,
      }
    : {
        icon: dataSource[type][activeState]?.icon,
        color: dataSource[type][activeState]?.color,
      };

  useEffect(() => {
    if (typeof state === 'boolean') {
      setActiveState(state ? 'true' : 'false');
    } else {
      setActiveState(state);
    }
  }, [state]);

  return <Tag {...props}>{dataSource[type][activeState]?.text}</Tag>;
};

export default StateTag;
