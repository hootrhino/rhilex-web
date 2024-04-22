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
    text: '正在运行',
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

const StateTag = ({ state, type = StateType.DEFAULT }: StateTagProps) => {
  const [activeState, setActiveState] = useState<number | string>(0);
  const [dataSource, setDataSource] = useState<Record<number | string, any>>(defaultStateEnum);

  const props = [
    StateType.DEFAULT,
    StateType.POINT,
    StateType.APPSTACK,
    StateType.RUNNING,
    StateType.BOOL,
    StateType.DEVICE,
  ].includes(type)
    ? {
        icon: dataSource[activeState]?.icon,
        color: dataSource[activeState]?.color,
      }
    : {
        color: dataSource[activeState]?.color,
      };

  useEffect(() => {
    switch (type) {
      case StateType.POINT:
        setDataSource(pointStateEnum);
        break;
      case StateType.APPSTACK:
        setDataSource(appStackStateEnum);
        break;
      case StateType.BOOL:
        setDataSource(boolStateEnum);
        break;
      case StateType.NOTICE:
        setDataSource(noticeStateEnum);
        break;
      case StateType.PARSE:
        setDataSource(parseStateEnum);
        break;
      case StateType.LEVEL:
        setDataSource(levelStateEnum);
        break;
      case StateType.RUNNING:
        setDataSource(runningStateEnum);
        break;
      case StateType.DEVICE:
        setDataSource(deviceStateEnum);
        break;
      case StateType.DEFAULT:
        setDataSource(defaultStateEnum);
        break;
    }
  }, [type]);

  useEffect(() => {
    if (typeof state === 'boolean') {
      setActiveState(state ? 'true' : 'false');
    } else {
      setActiveState(state);
    }
  }, [state]);

  return <Tag {...props}>{dataSource[activeState]?.text}</Tag>;
};

export default StateTag;
