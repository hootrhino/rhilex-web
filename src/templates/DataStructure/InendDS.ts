import { InendType } from '@/pages/Inend/enum';

// COAP
const inend_coap_ds = `{
  "token": {},
  "options": {},
  "code": "success",
  "context": {},
  "body": {}
}`;

// TODO GENERIC_IOT_HUB
// const inend_iothub_ds = `{
//   "method": "control",
//   "clientToken": "........",
//   "params": {
//     "power_switch": 1,
//     "color": 1,
//     "brightness": 66
//   }
// }`;

// UDP_SERVER HTTP NATS_SERVER GRPC
const inend_udp_ds = `{
  "k1": "v1",
  "k2": "v2",
  "kn": "vn"
}`;

// TODO GENERIC_MQTT
// const inend_mqtt_ds = `{
//   "topic": "control",
//   "payload": {
//     "power_switch": 1,
//     "color": 1,
//     "brightness": 66
//   }
// }`;

// INTERNAL_EVENT
const inend_event_ds = `{
  "type": "DEVICE",
  "event": "event.connected",
  "ts": 121312431432,
  "device_info": {
    "uuid": "UUID1234567",
    "name": "温湿度计"
  }
}`;

// COMTC_EVENT_FORWARDER
const inend_com_ds = `{
  "comName": "COM1",
  "value": "0102030405"
}`;

export const inendDS = {
  [InendType.COAP]: inend_coap_ds,
  // TODO [InendType.GENERIC_IOT_HUB]: inend_iothub_ds,
  [InendType.UDP_SERVER]: inend_udp_ds,
  [InendType.TCP_SERVER]: inend_udp_ds,
  [InendType.HTTP]: inend_udp_ds,
  // TODO [InendType.NATS_SERVER]: inend_udp_ds,
  [InendType.GRPC]: inend_udp_ds,
  // TODO [InendType.GENERIC_MQTT]: inend_mqtt_ds,
  [InendType.INTERNAL_EVENT]: inend_event_ds,
  [InendType.COMTC_EVENT_FORWARDER]: inend_com_ds,
};
