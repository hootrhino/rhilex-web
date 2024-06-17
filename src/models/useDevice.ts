import { DEFAULT_CONFIG, GroupConfig } from '@/pages/Device/Group';
import { DEFAULT_GROUP_KEY_DEVICE } from '@/utils/constant';
import { useState } from 'react';

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const useDevice = () => {
  const [activeGroupKey, setActiveGroupKey] = useState<string>(DEFAULT_GROUP_KEY_DEVICE);
  const [detailConfig, setDeviceConfig] = useState<DetailModalConfig>({
    uuid: '',
    open: false,
  });
  const [groupConfig, setGroupConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [title, setTitle] = useState<string>('');

  return {
    detailConfig,
    setDeviceConfig,
    activeGroupKey,
    setActiveGroupKey,
    title,
    setTitle,
    groupConfig,
    setGroupConfig,
  };
};

export default useDevice;
