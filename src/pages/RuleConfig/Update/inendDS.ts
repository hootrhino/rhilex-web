import { getIntl, getLocale } from '@umijs/max';
import { InendType } from '../../Inend/enum';

const inend_coap_ds = `{
  "from": "ID00000",    // 数据来源
  "data": {}            // 数据体
}`;

export const inend_ds = {
  [InendType.COAP]: inend_coap_ds,
  [InendType.HTTP]: inend_coap_ds,
  [InendType.RULEX_UDP]: inend_coap_ds,
  [InendType.GRPC]: inend_coap_ds,
  [InendType.NATS_SERVER]: inend_coap_ds,
};

// 内部事件源
const event_connected_ds = `{
  "type": "DEVICE",                       // 事件类型
  "event": "event.device.connected",      // 事件名称
  "ts": 100000000,                        // 时间戳
  "device_info": {
      "uuid": "UUID1234567",              // 设备 ID
      "name": "test-device"               // 设备名称
  }
}`;
const event_disconnected_ds = `{
  "type": "DEVICE",                       // 事件类型
  "event": "event.device.disconnected",   // 事件名称
  "ts": 100000000,                        // 时间戳
  "device_info": {
      "uuid": "UUID1234567",              // 设备 ID
      "name":"test-device"                // 设备名称
  }
}`;
const event_up_ds = `{
  "type": "SOURCE",                       // 事件类型
  "event": "event.source.up",             // 事件名称
  "ts": 100000000,                        // 时间戳
  "source_info": {
      "uuid": "UUID1234567",              // 资源 ID
      "name": "test-source"               // 资源名称
  }
}`;
const event_down_ds = `{
  "type": "SOURCE",                       // 事件类型
  "event": "event.source.down",           // 事件名称
  "ts": 100000000,                        // 时间戳
  "source_info": {
      "uuid": "UUID1234567",              // 资源 ID
      "name": "test-source"               // 资源名称
  }
}`;

const intl = getIntl(getLocale());

export const inend_event_ds = [
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.connected' }),
    json: event_connected_ds,
    key: 'device_connected',
  },
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.disconnected' }),
    json: event_disconnected_ds,
    key: 'device_disconnected',
  },
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.up' }),
    json: event_up_ds,
    key: 'source_up',
  },
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.down' }),
    json: event_down_ds,
    key: 'source_down',
  },
];

export const links = [
  {
    label: intl.formatMessage({ id: 'ruleConfig.inend.link.ali' }),
    link: 'https://help.aliyun.com/zh/iot/user-guide/what-is-a-tsl-model',
    key: 'aliyun',
  },
  {
    label: intl.formatMessage({ id: 'ruleConfig.inend.link.tencent' }),
    link: 'https://cloud.tencent.com/document/product/1081/34916',
    key: 'tencent',
  },
  {
    label: intl.formatMessage({ id: 'ruleConfig.inend.link.w3c' }),
    link: 'https://www.w3.org/TR/wot-architecture/#abstract',
    key: 'w3c',
  },
];
