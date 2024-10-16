import { getIntl, getLocale } from '@umijs/max';
import { baseOptions, byte1Options } from '../ModbusMaster/enum';

const { formatMessage } = getIntl(getLocale());

// 基本数据类型
export const plcDataTypeOptions = [
  {
    value: 'BYTE',
    label: `Byte（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'I',
    label: `I（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'Q',
    label: `Q（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  ...baseOptions,
];
