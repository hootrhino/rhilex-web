import { DEFAULT_GROUP_KEY_DEVICE } from '@/utils/constant';
import { useState } from 'react';

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const defaultDeviceConfig = {
  uuid: '',
  open: false,
};

const useDevice = () => {
  const [activeGroupKey, setActiveGroupKey] = useState<string>(DEFAULT_GROUP_KEY_DEVICE);
  const [detailConfig, setDeviceConfig] = useState<DetailModalConfig>(defaultDeviceConfig);

  return {
    detailConfig,
    setDeviceConfig,
    activeGroupKey,
    setActiveGroupKey,
  };
};

export default useDevice;
