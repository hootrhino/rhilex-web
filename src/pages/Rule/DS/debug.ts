import { DeviceType } from '@/pages/Device/enum';
import { InendType } from '@/pages/Inend/enum';

// GENERIC_UART_PROTOCOL - 通用串口网关
const device_protocol_ds = `{
  "in": "0001020304ABCDEF",
  "out": "11220ABCDEF"
}`;

// GENERIC_MODBUS - 通用 modbus 采集网关
const device_modbus_ds = `{
  "tag":{
     "tag": "tag",
     "function": 1,
     "slaverId": 1,
     "address": 1,
     "quantity": 1,
     "value": "3.14"
     }
 }`;

// GENERIC_HTTP_DEVICE - 通用 HTTP 协议数据采集网关
const device_http_ds = `{
  "k1": 1,
  "k2": 2,
}`;

// SIEMENS_PLC - 通用西门子 S7 系列 PLC 采集网关
const device_siemens_ds = `{
  "tag":{
    "tag": "tag",
    "type": "DB",
    "frequency": 0,
    "address": 1,
    "start": 1,
    "size": 2,
    "value": "1"
  }
}`;

// TODO GENERIC_CAMERA - 通用摄像机流处理网关 暂时隐藏
// const device_camera_ds = `{
//   "width": 1024,
//   "height": 512,
//   "extra": {}
// }`;

// GENERIC_AIS_RECEIVER - 通用船载 AIS 数据解析网关
// 原始数据
// const device_ais_origin_ds = `{
//   "ais_data": "!AIVDM..............."
// }`;

// GENERIC_SNMP - 通用 SNMP 协议采集网关
const device_snmp_ds = `[
  {
    "oid": ".1.3.6.1.2.1.1.7.0",
    "tag": "SysServices",
    "alias": "SysServices",
    "value": 0
  }
]`;

// SMART_HOME_CONTROLLER - 全屋智能家居中心控制网关
const device_smart_home_ds = `[
  {
    "event": "Input.Toggle",
    "mac": "AA:BB:CC:DD:EE",
    "ip": "192.168.1.107",
    "data": {}
  }
]`;

// COAP
const inend_coap_ds = `{
  "token": {},
  "options": {},
  "code": "success",
  "context": {},
  "body": {}
}`;

// GENERIC_IOT_HUB
const inend_iothub_ds = `{
  "method": "control",
  "clientToken": "........",
  "params": {
    "power_switch": 1,
    "color": 1,
    "brightness": 66
  }
}`;

// RULEX_UDP HTTP NATS_SERVER GRPC
const inend_udp_ds = `{
  "k1": "v1",
  "k2": "v2",
  "kn": "vn"
}`;

// GENERIC_MQTT
const inend_mqtt_ds = `{
  "topic": "control",
  "payload": {
    "power_switch": 1,
    "color": 1,
    "brightness": 66
  }
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

export const device_test_data = {
  [DeviceType.GENERIC_UART_PROTOCOL]: device_protocol_ds,
  [DeviceType.GENERIC_MODBUS]: device_modbus_ds,
  [DeviceType.GENERIC_HTTP_DEVICE]: device_http_ds,
  [DeviceType.SIEMENS_PLC]: device_siemens_ds,
  // [DeviceType.GENERIC_CAMERA]: device_camera_ds,
  [DeviceType.GENERIC_SNMP]: device_snmp_ds,
  [DeviceType.SMART_HOME_CONTROLLER]: device_smart_home_ds,
  // [DeviceType.GENERIC_AIS_RECEIVER]: device_ais_origin_ds,
};

export const inend_test_data = {
  [InendType.COAP]: inend_coap_ds,
  [InendType.GENERIC_IOT_HUB]: inend_iothub_ds,
  [InendType.RULEX_UDP]: inend_udp_ds,
  [InendType.HTTP]: inend_udp_ds,
  [InendType.NATS_SERVER]: inend_udp_ds,
  [InendType.GRPC]: inend_udp_ds,
  [InendType.GENERIC_MQTT]: inend_mqtt_ds,
  [InendType.INTERNAL_EVENT]: inend_event_ds,
};
