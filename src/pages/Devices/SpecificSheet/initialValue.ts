// Modbus 点位表默认值
export const defaultModbusConfig = {
  tag: '',
  alias: '',
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: 1,
};

// PLC 点位表默认值
export const defaultPlcConfig = {
  tag: '',
  type: 'DB',
  frequency: 1000,
  address: 1,
  start: 100,
  size: 16,
};
