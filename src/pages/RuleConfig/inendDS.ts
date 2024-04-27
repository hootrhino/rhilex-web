import { InendType } from '../Inend/enum';

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

export const inend_event_ds = [
  {
    title: '设备上线事件',
    json: event_connected_ds,
    key: 'device_connected',
  },
  {
    title: '设备离线事件',
    json: event_disconnected_ds,
    key: 'device_disconnected',
  },
  {
    title: '资源上线事件',
    json: event_up_ds,
    key: 'source_up',
  },
  {
    title: '资源离线事件',
    json: event_down_ds,
    key: 'source_down',
  },
];

export const links = [
  {
    label: '阿里云：',
    link: 'https://help.aliyun.com/zh/iot/user-guide/what-is-a-tsl-model',
    key: 'aliyun',
  },
  {
    label: '腾讯云：',
    link: 'https://cloud.tencent.com/document/product/1081/34916',
    key: 'tencent',
  },
  {
    label: 'W3C 规范：',
    link: 'https://www.w3.org/TR/wot-architecture/#abstract',
    key: 'w3c',
  },
];
