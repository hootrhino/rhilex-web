import { DeviceType } from '../enum';
import { ObjectType, Quantity } from './enum';

const baseConfig = {
  tag: '',
  alias: '',
};

const baseUploadData = {
  uuid: 'uploadData',
  tag: 'a1',
  alias: 'a1',
};

export const defaultConfig = {
  [DeviceType.GENERIC_BACNET_IP]: {
    ...baseConfig,
    bacnetDeviceId: 1,
    objectType: ObjectType.AI,
    objectId: 1,
  },
  [DeviceType.BACNET_ROUTER_GW]: {
    ...baseConfig,
    objectType: ObjectType.AI,
    objectId: 1,
  },
  [DeviceType.GENERIC_SNMP]: {
    ...baseConfig,
    oid: '',
    frequency: 1000,
  },
  [DeviceType.SIEMENS_PLC]: {
    ...baseConfig,
    type: ['FLOAT32', 'DCBA'],
    siemensAddress: '',
    frequency: 1000,
    weight: 1,
  },
  [DeviceType.GENERIC_MODBUS_MASTER]: {
    ...baseConfig,
    function: 3,
    frequency: 1000,
    slaverId: 1,
    address: 0,
    quantity: Quantity['RAW'],
    type: ['RAW', 'DCBA'],
    weight: 1,
  },
};

export const defaultUploadData = {
  [DeviceType.GENERIC_BACNET_IP]: {
    ...baseUploadData,
    bacnetDeviceId: 1,
    objectType: ObjectType.AI,
    objectId: 1,
  },
  [DeviceType.BACNET_ROUTER_GW]: {
    ...baseUploadData,
    objectType: ObjectType.AI,
    objectId: 1,
  },
  [DeviceType.GENERIC_SNMP]: {
    ...baseUploadData,
    oid: '.1.3.6.1.2.1.1.1.0',
    tag: 'Total Processes',
    alias: '线程总数',
    frequency: 1000,
  },
  [DeviceType.SIEMENS_PLC]: {
    ...baseUploadData,
    address: 'DB4900.DBD1000',
    tag: 'R0',
    alias: '新砂轮直径（mm）',
    type: 'FLOAT32',
    order: 'ABCD',
    weight: 1,
    frequency: 1000,
  },
  [DeviceType.GENERIC_MODBUS_MASTER]: {
    ...baseUploadData,
    function: 3,
    frequency: 1000,
    slaverId: 1,
    address: 0,
    quantity: Quantity['FLOAT32'],
    type: 'FLOAT32',
    order: 'DCBA',
    weight: 1,
  },
};
