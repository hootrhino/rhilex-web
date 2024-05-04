import { getIntl, getLocale } from '@umijs/max';
import { DeviceType } from '../../Device/enum';

const intl = getIntl(getLocale());

// GENERIC_PROTOCOL - 通用时间片中断串口采集网关
const device_protocol_ds = `{
  "in":"0001020304ABCDEF", // ${intl.formatMessage({ id: 'ruleConfig.ds.device.in' })}
  "out":"11220ABCDEF"      // ${intl.formatMessage({ id: 'ruleConfig.ds.device.out' })}
}`;

// GENERIC_MODBUS - 通用 modbus 采集网关
const device_modbus_ds = `{
  "tag":{
     "tag": "tag",    // ${intl.formatMessage({ id: 'ruleConfig.ds.device.tag' })}
     "function": 1,   // ${intl.formatMessage({ id: 'ruleConfig.ds.device.function' })}
     "slaverId": 1,   // ${intl.formatMessage({ id: 'ruleConfig.ds.device.slaverId' })}
     "address": 1,    // ${intl.formatMessage({ id: 'ruleConfig.ds.device.address' })}
     "quantity": 1,   // ${intl.formatMessage({ id: 'ruleConfig.ds.device.quantity' })}
     "value": "3.14"  // ${intl.formatMessage({ id: 'ruleConfig.ds.device.value' })}
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
      "tag": "tag",     // ${intl.formatMessage({ id: 'ruleConfig.ds.device.tag' })}
      "type": "DB",     // ${intl.formatMessage({ id: 'ruleConfig.ds.device.type' })}
      "frequency": 0,   // ${intl.formatMessage({ id: 'ruleConfig.ds.device.frequency' })}
      "address": 1,     // ${intl.formatMessage({ id: 'ruleConfig.ds.device.address' })}
      "start": 1,       // ${intl.formatMessage({ id: 'ruleConfig.ds.device.start' })}
      "size": 2,        // ${intl.formatMessage({ id: 'ruleConfig.ds.device.size' })}
      "value": "1"      // ${intl.formatMessage({ id: 'ruleConfig.ds.device.value' })}
  }
}`;

// GENERIC_CAMERA - 通用摄像机流处理网关
const device_camera_ds = `{
  "width": 1024,  // ${intl.formatMessage({ id: 'ruleConfig.ds.device.width' })}
  "height": 512,  // ${intl.formatMessage({ id: 'ruleConfig.ds.device.height' })}
  "extra": {}     // ${intl.formatMessage({ id: 'ruleConfig.ds.device.extra' })}
}`;

// GENERIC_AIS_RECEIVER - 通用船载 AIS 数据解析网关
// 原始数据
// const device_ais_origin_ds = `{
//   "ais_data": "!AIVDM..............."
// }`;
// RMC
// const device_ais_rmc_ds = `{
//   "type": "RMC",                     // 消息类型
//   "gwid": "HR0001",                  // 设备编号
//   "validity": "A",                   // 有效性
//   "latitude": 48.1173,               // 纬度
//   "longitude": 11.5167,              // 经度
//   "speed": 22.4,                     // 速度
//   "course": 84.4,                    // 路线
//   "date": "23-03-94 12:35:19.0000",  // 日期和时间
//   "nav_status": ""                   // 导航状态
// }`;

// VDM
// const device_ais_vdm_ds = `{
//   "type": "VDM",                     // 消息类型
//   "gwid": "HR0001",                  // 网关编号
//   "message_id": 19,                  // 消息 ID
//   "user_id": 413825345,              // 用户 ID
//   "name": "testship",                // 船舶名称
//   "sog": 3.2,                        // 地面航速（节）
//   "longitude": 114.347,              // 经度
//   "latitude": 30.62909,              // 纬度
//   "cog": 226.3,                      // 航向（度）
//   "true_heading": 511,               // 真航向
//   "timestamp": 35                    // 时间戳
// }`;

// GENERIC_SNMP - 通用 SNMP 协议采集网关
const device_snmp_ds = `[
  {
      "oid": ".1.3.6.1.2.1.1.7.0",   // ${intl.formatMessage({ id: 'ruleConfig.ds.device.oid' })}
      "tag": "SysServices",          // ${intl.formatMessage({ id: 'ruleConfig.ds.device.tag' })}
      "alias": "SysServices",        // ${intl.formatMessage({ id: 'ruleConfig.ds.device.alias' })}
      "value": 0                     // ${intl.formatMessage({ id: 'ruleConfig.ds.device.value' })}
  }
]`;

// SMART_HOME_CONTROLLER - 全屋智能家居中心控制网关
const device_smart_home_ds = `[
  {
      "event": "Input.Toggle",       // ${intl.formatMessage({ id: 'ruleConfig.ds.device.event' })}
      "mac": "AA:BB:CC:DD:EE",       // ${intl.formatMessage({ id: 'ruleConfig.ds.device.mac' })}
      "ip": "192.168.1.107",         // ${intl.formatMessage({ id: 'ruleConfig.ds.device.ip' })}
      "data": {}                     // ${intl.formatMessage({ id: 'ruleConfig.ds.device.data' })}
  }
]`;

export const device_ds = {
  [DeviceType.GENERIC_PROTOCOL]: device_protocol_ds,
  [DeviceType.GENERIC_MODBUS]: device_modbus_ds,
  [DeviceType.GENERIC_HTTP_DEVICE]: device_http_ds,
  [DeviceType.SIEMENS_PLC]: device_siemens_ds,
  [DeviceType.GENERIC_CAMERA]: device_camera_ds,
  [DeviceType.GENERIC_SNMP]: device_snmp_ds,
  [DeviceType.SMART_HOME_CONTROLLER]: device_smart_home_ds,
  // [DeviceType.GENERIC_AIS_RECEIVER]: device_ais_origin_ds,
};

// export const device_ais_ds = [
//   {
//     title: '原始 AIS 数据',
//     json: device_ais_origin_ds,
//     key: 'origin',
//   },
//   {
//     title: 'VDRMC 报文格式',
//     json: device_ais_rmc_ds,
//     key: 'rmc',
//   },
//   {
//     title: 'VDM/O 报文格式',
//     json: device_ais_vdm_ds,
//     key: 'vdm',
//   },
// ];
