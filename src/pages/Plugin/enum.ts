export enum PluginName {
  PING = 'ping',
  SCAN = 'scan',
  CLIENTS = 'clients',
  KICKOUT = 'kickout',
  START = 'start',
  STOP = 'stop',
  CRC = 'crc', // 非真实 name
  CONFIG = 'get_config',
  NGROKC = 'ngrokc',
}

// 插件类型
export enum PluginUUID {
  ICMP = 'ICMPSender',
  MQTT = 'RHILEX-MqttServer',
  SCANNER = 'MODBUS_SCANNER',
  CRC = 'MODBUS_CRC_CALCULATOR',
  TERMINAL = 'WEB_TTYD_TERMINAL',
  NGROKC = 'NGROKC',
  USB = 'USB_EVENT_MONITOR',
  HTTP = 'HTTP-API-SERVER',
}
