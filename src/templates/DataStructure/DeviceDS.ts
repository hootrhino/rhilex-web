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
const device_snmp_ds = `{
    "oid": ".1.3.6.1.2.1.1.7.0",
    "tag": "SysServices",
    "alias": "SysServices",
    "value": 0
  }`;

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

// 国标协议 & MBUS
const device_national_ds = `{
  "tag": "tag",
  "meterId": "W0001",
  "value": "12345.67"
}`;

// GENERIC_UART_RW - 通用串口读写网关
const device_uart_ds = `{
  "tag": "tag",
  "value": "12345.67"
}`;

// GENERIC_USER_PROTOCOL - 通用自定义协议采集网关
const device_user_ds = `{
  "tag": "tag",
  "value": "12345.67",
  "command": "010300000002C40B"
}`;

// TENCENT_IOTHUB_GATEWAY - 腾讯云物联网平台
const device_iothub_control_ds = `{
  "method": "control",
  "clientToken": "123",
  "params": {
      "power_switch": 1,
      "color": 1,
      "brightness": 66
  }
}`;

const device_iothub_action_ds = `{
  "method": "action",
  "clientToken": "20a4ccfd-d308-****-86c6-5254008a4f10",
  "actionId": "openDoor",
  "timestamp": 1212121221,
  "params": {
      "userid": "323343"
  }
}`;

// ITHINGS_IOTHUB_GATEWAY - 联犀物联网平台
const device_ithings_control_ds = `{
  "method": "control",
  "msgToken": "123",
  "params": {
    "power_switch": 1,
    "color": 1,
    "brightness": 66
  }
}`;

const device_ithings_action_ds = `{
  "method": "action",
  "msgToken": "20a4ccfd-d308-****-86c6-5254008a4f10",
  "actionID": "openDoor",
  "timestamp": 1677762028638,
  "params": {
    "userid": "323343"
  }
}`;


export const deviceDS = {
  [DeviceType.GENERIC_MODBUS_MASTER]: device_modbus_ds,
  [DeviceType.GENERIC_MODBUS_SLAVER]: device_modbus_ds,
  [DeviceType.GENERIC_HTTP_DEVICE]: device_http_ds,
  [DeviceType.SIEMENS_PLC]: device_siemens_ds,
  [DeviceType.GENERIC_SNMP]: device_snmp_ds,
  [DeviceType.GENERIC_BACNET_IP]: device_bacnet_ds,
  [DeviceType.BACNET_ROUTER_GW]: device_bacnet_ds,
  [DeviceType.DLT6452007_MASTER]: device_national_ds,
  [DeviceType.CJT1882004_MASTER]: device_national_ds,
  [DeviceType.SZY2062016_MASTER]: device_national_ds,
  [DeviceType.GENERIC_MBUS_EN13433_MASTER]: device_national_ds,
  [DeviceType.GENERIC_UART_RW]: device_uart_ds,
  [DeviceType.GENERIC_USER_PROTOCOL]: device_user_ds,
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: device_iothub_control_ds,
  [DeviceType.ITHINGS_IOTHUB_GATEWAY]: device_ithings_control_ds
};

export const multTestData = {
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: {
    'defaultDS': device_iothub_control_ds,
    'action': device_iothub_action_ds
  },
  [DeviceType.ITHINGS_IOTHUB_GATEWAY]: {
    'defaultDS': device_ithings_control_ds,
    'action': device_ithings_action_ds
  },
}
