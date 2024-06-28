import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export enum TransceiverTopic {
  CSQ = 'mn4g.ec200a.info.csq',
  RESTART = 'mn4g.ec200a.opt.restart',
  SEND = 'mn4g.ec200a.cmd.send',
}

export enum TransceiverType {
  COMMON_RF = 0,
  WIFI = 1,
  BLC = 2,
  BLE = 3,
  ZIGBEE = 4,
  RF24g = 5,
  RF433M = 6,
  MN4G = 7,
  MN5G = 8,
  NBIoT = 9,
  LORA = 10,
  LORA_WAN = 11,
}

export const TransceiverTypeOption = {
  [TransceiverType.COMMON_RF]: {
    icon: 'commonrf',
    text: intl.formatMessage({ id: 'com.type.urf' }),
  },
  [TransceiverType.WIFI]: {
    icon: 'wifi',
    text: 'WIFI',
  },
  [TransceiverType.BLC]: {
    icon: 'blc',
    text: intl.formatMessage({ id: 'com.type.blc' }),
  },
  [TransceiverType.BLE]: {
    icon: 'ble',
    text: intl.formatMessage({ id: 'com.type.ble' }),
  },
  [TransceiverType.ZIGBEE]: {
    icon: 'zigbee',
    text: 'Zigbee',
  },
  [TransceiverType.RF24g]: {
    icon: 'rf24g',
    text: intl.formatMessage({ id: 'com.type.rf' }, { type: '2.4G' }),
  },
  [TransceiverType.RF433M]: {
    icon: 'rf433m',
    text: intl.formatMessage({ id: 'com.type.rf' }, { type: '433M' }),
  },
  [TransceiverType.MN4G]: {
    icon: 'mn4g',
    text: intl.formatMessage({ id: 'com.type.rf' }, { type: '4G' }),
  },
  [TransceiverType.MN5G]: {
    icon: 'mn5g',
    text: intl.formatMessage({ id: 'com.type.rf' }, { type: '5G' }),
  },
  [TransceiverType.NBIoT]: {
    icon: 'nbiot',
    text: intl.formatMessage({ id: 'com.type.rf' }, { type: 'NB-IoT' }),
  },
  [TransceiverType.LORA]: {
    icon: 'lora',
    text: intl.formatMessage({ id: 'com.type.rf' }, { type: 'LoRa' }),
  },
  [TransceiverType.LORA_WAN]: {
    icon: 'lorawan',
    text: 'LoRaWAN',
  },
};
