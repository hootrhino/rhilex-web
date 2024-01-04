import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE } from '@/utils/constant';
import { useState } from 'react';
import { useRequest } from 'umi';

const defaultDeviceConfig = {
  uuid: '',
  open: false,
};

const useDevice = () => {
  const [activeGroupKey, setActiveGroupKey] = useState<string>(DEFAULT_GROUP_KEY_DEVICE);
  const [detailConfig, setDeviceConfig] = useState<DetailModalConfig>(defaultDeviceConfig);

  // 设备分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getDevicesGroup());

  return {
    groupList,
    getGroupList,
    detailConfig,
    setDeviceConfig,
    activeGroupKey,
    setActiveGroupKey,
  };
};

export default useDevice;
