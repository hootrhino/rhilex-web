import { getSettingsCtrlTree } from '@/services/rulex/wangluopeizhi';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

const useSetting = () => {
  const [activeKey, setActiveKey] = useState<string>('netStatus');
  const [hasWifi, setwifi] = useState<boolean>(false);
  const [hasRoute, setRoute] = useState<boolean>(false);

  useRequest(() => getSettingsCtrlTree(), {
    onSuccess: (res) => {
      if (!res) return;
      const { wlan, soft_router } = res;
      setwifi((wlan && wlan.length > 0) || false);
      setRoute((soft_router && soft_router.length > 0) || false);
    },
  });

  return { activeKey, setActiveKey, hasWifi, hasRoute };
};

export default useSetting;
