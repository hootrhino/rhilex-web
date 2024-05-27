import { getIntl, getLocale } from '@umijs/max';

/**
 * 接口类型
 */
export const typeOption = [
  {
    label: getIntl(getLocale()).formatMessage({ id: 'system.option.uart' }),
    value: 'UART',
  },
];

// 波特率
export const baudRateEnum = new Map([
  [4800, '4800'],
  [9600, '9600'],
  [19200, '19200'],
  [38400, '38400'],
  [57600, '57600'],
  [115200, '115200'],
  [230400, '230400'],
  [460800, '460800'],
  [500000, '500000'],
  [576000, '576000'],
  [921600, '921600'],
  [1000000, '1000000'],
  [1152000, '1152000'],
  [1500000, '1500000'],
  [2000000, '2000000'],
  [2500000, '2500000'],
  [3000000, '3000000'],
  [3500000, '3500000'],
  [4000000, '4000000'],
]);

// 数据位
export const dataBitsEnum = new Map([
  [1, '1'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
  [5, '5'],
  [6, '6'],
  [7, '7'],
  [8, '8'],
]);

// 奇偶校验
export const parityEnum = {
  E: getIntl(getLocale()).formatMessage({ id: 'system.option.e' }),
  O: getIntl(getLocale()).formatMessage({ id: 'system.option.o' }),
  N: getIntl(getLocale()).formatMessage({ id: 'system.option.n' }),
};

// 停止位
export const stopBitsEnum = new Map([
  [1, '1'],
  [2, '2'],
]);
