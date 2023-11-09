import {
  getDevicesDetail,
  getDevicesGroup,
  getDevicesListByGroup,
} from '@/services/rulex/shebeiguanli';
import { useState } from 'react';
import { useRequest } from 'umi';

export type DeviceConfig = {
  uuid: string;
  open: boolean;
};

const defaultDeviceConfig = {
  uuid: '',
  open: false,
};

const useDevice = () => {
  const [detailConfig, setDeviceConfig] = useState<DeviceConfig>(defaultDeviceConfig);

  // 设备分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getDevicesGroup());

  // 设备列表
  const { data, run } = useRequest((params: API.getDevicesListByGroupParams) =>
    getDevicesListByGroup(params),
  );

  // 设备详情
  const {
    data: detail,
    run: getDetail,
    loading: detailLoading,
  } = useRequest((params: API.getDevicesDetailParams) => getDevicesDetail(params), {
    manual: true,
  });

  return {
    data,
    detail,
    run,
    groupList,
    getGroupList,
    getDetail,
    detailLoading,
    detailConfig,
    setDeviceConfig,
  };
};

export default useDevice;
