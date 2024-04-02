import { getSettingsCtrlTree } from '@/services/rulex/wangluopeizhi';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

type OptionItem = {
  label: string;
  value: string;
};

const useSetting = () => {
  const [activeKey, setActiveKey] = useState<string>('netStatus');
  const [hasWifi, setwifi] = useState<boolean>(false);
  const [hasRoute, setRoute] = useState<boolean>(false);
  const [interfaceOption, setInterfaceOption] = useState<OptionItem[]>([]);

  useRequest(() => getSettingsCtrlTree(), {
    onSuccess: (res) => {
      if (!res) return;
      const { wlan, soft_router } = res;
      const newOption =
        res?.network && res?.network.length > 0
          ? res?.network?.map((item) => ({ label: item?.name || '', value: item?.name || '' }))
          : [];
      setwifi((wlan && wlan.length > 0) || false);
      setRoute((soft_router && soft_router.length > 0) || false);
      setInterfaceOption(newOption);
    },
  });

  return { activeKey, setActiveKey, hasWifi, hasRoute, interfaceOption };
};

export default useSetting;
