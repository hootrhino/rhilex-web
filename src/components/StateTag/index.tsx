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

  const props = ['default', 'point', 'appStack', 'running', 'bool'].includes(type)
    ? {
        icon: dataSource[activeState]?.icon,
        color: dataSource[activeState]?.color,
      }
    : {
        color: dataSource[activeState]?.color,
      };

  useEffect(() => {
    switch (type) {
      case 'point':
        setDataSource(pointStateEnum);
        break;
      case 'appStack':
        setDataSource(appStackStateEnum);
        break;
      case 'bool':
        setDataSource(boolStateEnum);
        break;
      case 'notice':
        setDataSource(noticeStateEnum);
        break;
      case 'parse':
        setDataSource(parseStateEnum);
        break;
      case 'level':
        setDataSource(levelStateEnum);
        break;
      case 'running':
        setDataSource(runningStateEnum);
        break;
      case 'default':
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
