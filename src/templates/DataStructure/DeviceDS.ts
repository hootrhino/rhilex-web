import { DeviceType } from "@/pages/Device/enum";

// GENERIC_MODBUS_MASTER - 通用 Modbus 主机网关 && GENERIC_MODBUS_SLAVER - 通用 Modbus 从机网关
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

// GENERIC_SNMP - 通用 SNMP 协议采集网关
const device_snmp_ds = `[
  {
    "oid": ".1.3.6.1.2.1.1.7.0",
    "tag": "SysServices",
    "alias": "SysServices",
    "value": 0
  }
]`;

// GENERIC_BACNET_IP & BACNET_ROUTER_GW
const device_bacnet_ds = `{
  "humi": {
      "tag": "humi",
      "deviceId": 1,
      "propertyType": "AnalogInput",
      "propertyInstance": 1,
      "value": 56.78
  },
  "temp": {
      "tag": "temp",
      "deviceId": 1,
      "propertyType": "AnalogInput",
      "propertyInstance": 0,
      "value": 12.34
  }
}`;

// TODO 补充新增协议的数据结构
export const deviceDS = {
  [DeviceType.GENERIC_MODBUS_MASTER]: device_modbus_ds,
  [DeviceType.GENERIC_MODBUS_SLAVER]: device_modbus_ds,
  [DeviceType.GENERIC_HTTP_DEVICE]: device_http_ds,
  [DeviceType.SIEMENS_PLC]: device_siemens_ds,
  [DeviceType.GENERIC_SNMP]: device_snmp_ds,
  [DeviceType.GENERIC_BACNET_IP]: device_bacnet_ds,
  [DeviceType.BACNET_ROUTER_GW]: device_bacnet_ds,
};
