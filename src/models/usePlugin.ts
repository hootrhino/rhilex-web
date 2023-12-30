import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

export type PluginName = 'ping' | 'scan' | 'clients' | 'kickout' | 'start' | 'stop' | '';

export type PluginParams = {
  uuid: string;
  name: string;
  args: any;
};

export type PluginConfig = DetailModalConfig & {
  name: PluginName;
  title?: string;
  args?: any;
};

const usePlugin = () => {
  const [detailConfig, setDetailConfig] = useState<PluginConfig>({
    open: false,
    uuid: '',
    name: '',
    title: '',
  });

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
