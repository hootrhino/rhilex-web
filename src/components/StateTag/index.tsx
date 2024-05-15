import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
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
  RULE = 'rule',
}

type StateTagProps = {
  state: number | boolean | string;
  type?: StateType;
};

const defaultStateEnum = {
  0: {
    text: <FormattedMessage id="status.fault" />,
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
  1: {
    text: <FormattedMessage id="status.enabled" />,
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  2: {
    text: <FormattedMessage id="status.pause" />,
    color: 'warning',
    icon: <ClockCircleOutlined />,
  },
  3: {
    text: <FormattedMessage id="status.stop" />,
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
  4: {
    text: <FormattedMessage id="status.loading" />,
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
};

const pointStateEnum = {
  1: {
    text: <FormattedMessage id="status.normal" />,
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  0: {
    text: <FormattedMessage id="status.exception" />,
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};

const appStackStateEnum = {
  1: {
    text: <FormattedMessage id="status.running" />,
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  0: {
    text: <FormattedMessage id="status.finished" />,
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

const ruleStateEnum = {
  1: {
    text: <FormattedMessage id="status.running" />,
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  0: {
    text: <FormattedMessage id="status.stop" />,
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

const boolStateEnum = {
  true: {
    text: <FormattedMessage id="status.enabled" />,
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  false: {
    text: <FormattedMessage id="status.disabled" />,
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

const deviceStateEnum = {
  true: {
    text: <FormattedMessage id="status.online" />,
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  false: {
    text: <FormattedMessage id="status.offline" />,
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};

const parseStateEnum = {
  true: {
    text: <FormattedMessage id="status.parse" />,
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  false: {
    text: <FormattedMessage id="status.unparse" />,
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

const noticeStateEnum = {
  INFO: {
    text: <FormattedMessage id="status.info" />,
    color: 'processing',
  },
  ERROR: {
    text: <FormattedMessage id="status.error" />,
    color: 'error',
  },
  WARNING: {
    text: <FormattedMessage id="status.warning" />,
    color: 'warning',
  },
};

const levelStateEnum = {
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
    text: <FormattedMessage id="status.running" />,
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  false: {
    text: <FormattedMessage id="status.stop" />,
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
};

const goodsTypeStateEnum = {
  true: {
    text: <FormattedMessage id="status.internal" />,
    color: 'green',
  },
  false: {
    text: <FormattedMessage id="status.external" />,
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
  [StateType.RULE]: ruleStateEnum,
};

const StateTag = ({ state, type = StateType.DEFAULT }: StateTagProps) => {
  const [activeState, setActiveState] = useState<number | string>(0);

  const props = [StateType.LEVEL, StateType.NOTICE, StateType.GOODSTYPE].includes(type)
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
