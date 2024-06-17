import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

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

export type PluginParams = {
  uuid: string;
  name: string;
  args: any;
};

export type PluginConfig = {
  open: boolean;
  uuid: PluginUUID | undefined;
  name: PluginName | undefined;
  title?: string;
  args?: any;
};

export const defaultConfig = { open: false, name: undefined, uuid: undefined, args: '', title: '' };

const usePlugin = () => {
  const [detailConfig, setDetailConfig] = useState<PluginConfig>(defaultConfig);

  const { run, data, refresh } = useRequest(
    (params: PluginParams) => postPlugwareService({ ...params }),
    {
      manual: true,
    },
  );

  return {
    detailConfig,
    setDetailConfig,
    run,
    data,
    refresh,
  };
};

export default usePlugin;
