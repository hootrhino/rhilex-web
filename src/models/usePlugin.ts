import { message } from '@/components/PopupHack';
import { postPluginService } from '@/services/rulex/chajianguanli';
import { useRequest } from '@umijs/max';
import { isEmpty } from 'lodash';
import { useState } from 'react';

export type PluginName = 'ping' | 'scan' | 'clients' | 'kickout' | 'start' | 'stop' | '';

export type PluginParams = {
  uuid: string;
  name: string;
  args: any;
};

export type PluginConfig = {
  open: boolean;
  uuid: string;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { run, data, refresh } = useRequest(
    (params: PluginParams) => postPluginService({ ...params }),
    {
      manual: true,
      onSuccess: () => {
        if (detailConfig.name === 'start') {

if (isEmpty(detailConfig.args)) {
// 启动并打开终端
message.success('启动成功');
setTimeout(() => {
  setDetailConfig({ ...detailConfig, open: true });
}, 1000);
} else {
// 开始扫描
setLoading(false);
setDisabled(true);
}


        }
        if (detailConfig.name === 'stop') {
          setDisabled(false);
          message.success('停止成功');
        }
        if (detailConfig.name === 'kickout') {
          message.success('下线成功');
          refresh();
        }
        if (detailConfig.name === 'ping') {
          setDisabled(false);
        }
      },
    },
  );

  return {
    detailConfig,
    setDetailConfig,
    run,
    data,
    loading, setLoading,
    disabled, setDisabled
  };
};

export default usePlugin;
