import { bool2String } from '@/utils/utils';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { getIntl, getLocale } from '@umijs/max';
import type { TagProps } from 'antd';
import { Tag } from 'antd';

type createStatusEnumProps = {
  type: 'BOOL' | 'DIGIT';
  text: [string, string];
  color: [string | undefined, string | undefined];
  icon: [React.ReactNode, React.ReactNode];
};

const createStatusEnum = ({
  type,
  text,
  color: [falseColor, trueColor],
  icon: [falseIcon, trueIcon],
}: createStatusEnumProps) => ({
  [type === 'BOOL' ? 'false' : 0]: {
    text: text[0],
    color: falseColor || 'default',
    icon: falseIcon || <MinusCircleOutlined />,
  },
  [type === 'BOOL' ? 'true' : 1]: {
    text: text[1],
    color: trueColor,
    icon: trueIcon || <CheckCircleOutlined />,
  },
});

const runningStatusEnum = createStatusEnum({
  type: 'BOOL',
  text: ['status.stop', 'status.running'],
  color: [undefined, 'processing'],
  icon: [undefined, <SyncOutlined spin />],
});

const boolStatusEnum = createStatusEnum({
  type: 'BOOL',
  text: ['status.disabled', 'status.enabled'],
  color: [undefined, 'success'],
  icon: [undefined, undefined],
});

const inendStatusEnum = createStatusEnum({
  type: 'BOOL',
  text: ['status.offline', 'status.online'],
  color: ['error', 'success'],
  icon: [<CloseCircleOutlined />, undefined],
});

const parseStatusEnum = createStatusEnum({
  type: 'BOOL',
  text: ['status.unparse', 'status.parse'],
  color: [undefined, 'success'],
  icon: [<CloseCircleOutlined />, undefined],
});

const pointStatusEnum = createStatusEnum({
  type: 'DIGIT',
  text: ['status.exception', 'status.normal'],
  color: ['error', 'success'],
  icon: [<CloseCircleOutlined />, undefined],
});

const appStatusEnum = createStatusEnum({
  type: 'DIGIT',
  text: ['status.finished', 'status.running'],
  color: [undefined, 'processing'],
  icon: [undefined, <SyncOutlined spin />],
});

const ruleStatusEnum = createStatusEnum({
  type: 'DIGIT',
  text: ['status.stop', 'status.running'],
  color: [undefined, 'processing'],
  icon: [undefined, <SyncOutlined spin />],
});

const noticeStatusEnum = {
  INFO: {
    text: 'status.info',
    color: 'processing',
  },
  ERROR: {
    text: 'status.error',
    color: 'error',
  },
  WARNING: {
    text: 'status.warning',
    color: 'warning',
  },
  DEVICE: {
    text: 'status.device',
    color: 'cyan',
  },
  SOURCE: {
    text: 'status.inend',
    color: 'magenta',
  },
  TARGET: {
    text: 'status.outend',
    color: 'purple',
  },
  SYSTEM: {
    text: 'status.system',
    color: 'geekblue',
  },
  HARDWARE: {
    text: 'status.hardware',
    color: 'lime',
  },
  DEFAULT: {
    text: 'status.unknow',
    color: 'default',
  },
};

const deviceStatusEnum = {
  0: {
    text: 'status.fault',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
  1: {
    text: 'status.enabled',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  2: {
    text: 'status.pause',
    color: 'warning',
    icon: <ClockCircleOutlined />,
  },
  3: {
    text: 'status.stop',
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
  4: {
    text: 'status.loading',
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
};

const levelStatusEnum = {
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

export enum StatusType {
  NOTICE = 'notice',
  RUNNING = 'running',
  BOOL = 'bool',
  DEVICE = 'device',
  INEND = 'inend',
  PARSE = 'parse',
  LEVEL = 'level',
  POINT = 'point',
  APP = 'app',
  RULE = 'rule',
}

const typeEnum = {
  [StatusType.NOTICE]: noticeStatusEnum,
  [StatusType.RUNNING]: runningStatusEnum,
  [StatusType.BOOL]: boolStatusEnum,
  [StatusType.DEVICE]: deviceStatusEnum,
  [StatusType.INEND]: inendStatusEnum,
  [StatusType.PARSE]: parseStatusEnum,
  [StatusType.LEVEL]: levelStatusEnum,
  [StatusType.POINT]: pointStatusEnum,
  [StatusType.APP]: appStatusEnum,
  [StatusType.RULE]: ruleStatusEnum,
};

type ProTagProps = Omit<TagProps, 'children'> & {
  children: string | number | boolean;
  type?: StatusType;
};

const ProTag = ({ children, type, ...props }: ProTagProps) => {
  const activeTypeEnum = type && typeEnum[type];
  const activeItem = activeTypeEnum?.[bool2String(children)];

  const tagProps = {
    color: activeItem?.color,
    icon: activeItem?.icon,
    ...props,
  };

  return (
    <Tag {...tagProps}>
      {type && activeItem?.text
        ? getIntl(getLocale()).formatMessage({ id: activeItem?.text })
        : bool2String(children)}
    </Tag>
  );
};

export default ProTag;
