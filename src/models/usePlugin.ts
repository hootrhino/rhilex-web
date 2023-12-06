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
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<string[]>([]);

  // start
  const handleOnStart = () => {
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
  };

  // scan
  const handleOnScan = (error: Record<string, any>[]) => {
    if (!error || error?.length < 1) return;
    const outputErrorData = error.map((item) => {
      return Object.entries(item)
        .map(([key, val]) => {
          return `${key}:${val}`;
        })
        .join();
    });
    setErrorData(outputErrorData);
  };

  const { run, data, refresh } = useRequest(
    (params: PluginParams) => postPluginService({ ...params }),
    {
      manual: true,
      onSuccess: (res) => {
        switch (detailConfig.name) {
          case 'start':
            handleOnStart();
            break;
          case 'stop':
            message.success('停止成功');
            break;
          case 'ping':
            setDisabled(false);
            break;
          case 'scan':
            handleOnScan(res as any);
            break;
          case 'clients':
            break;
          case 'kickout':
            message.success('下线成功');
            refresh();
            break;
        }
      },
    },
  );

  return {
    detailConfig,
    setDetailConfig,
    run,
    data,
    loading,
    setLoading,
    disabled,
    setDisabled,
    errorData,
  };
};

export default usePlugin;
