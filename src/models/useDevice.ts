import { DEFAULT_CONFIG, GroupConfig } from '@/pages/Device/Group';
import { getDevicesList } from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE } from '@/utils/constant';
import { useRequest } from '@umijs/max';
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

  const { data: allDeviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }));

  return {
    detailConfig,
    setDeviceConfig,
    activeGroupKey,
    setActiveGroupKey,
    title,
    setTitle,
    groupConfig,
    setGroupConfig,
    allDeviceData,
  };
};

export default useDevice;
