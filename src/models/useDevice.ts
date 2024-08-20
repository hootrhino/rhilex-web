import { getDevicesList } from '@/services/rulex/shebeiguanli';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const useDevice = () => {
  const [detailConfig, setDeviceConfig] = useState<DetailModalConfig>({
    uuid: '',
    open: false,
  });

  const { data: allDeviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }));

  return {
    detailConfig,
    setDeviceConfig,
    allDeviceData,
  };
};

export default useDevice;
