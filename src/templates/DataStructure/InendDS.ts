import { InendType } from '@/pages/Inend/enum';

// COAP
const inend_coap_ds = `{
  "token": {},
  "options": {},
  "code": "success",
  "context": {},
  "body": {}
}`;

// UDP_SERVER HTTP GRPC
const inend_udp_ds = `{
  "k1": "v1",
  "k2": "v2",
  "kn": "vn"
}`;

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
  [InendType.COAP_SERVER]: inend_coap_ds,
  [InendType.UDP_SERVER]: inend_udp_ds,
  [InendType.TCP_SERVER]: inend_udp_ds,
  [InendType.HTTP_SERVER]: inend_udp_ds,
  [InendType.GRPC_SERVER]: inend_udp_ds,
  [InendType.INTERNAL_EVENT]: inend_event_ds,
  [InendType.COMTC_EVENT_FORWARDER]: inend_com_ds,
};
