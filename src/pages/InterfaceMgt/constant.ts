// 接口类型
export const typeOptions = [
  {
    label: '串口',
    value: 'UART',
  },
];

// 波特率
export const baudRateEnum = new Map([
  [4800, '4800'],
  [9600, '9600'],
  [115200, '115200'],
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
export const parityEnum = { E: '奇校验', O: '偶校验', N: '不校验' };

// 停止位
export const stopBitsEnum = new Map([
  [1, '1'],
  [1.5, '1.5'],
  [2, '2'],
]);
