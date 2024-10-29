import { getSettingsCtrlTree } from '@/services/rhilex/wangluopeizhi';
import { getOsSystem } from '@/services/rhilex/xitongshuju';
import { useRequest } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';

const useSystem = () => {
  const [isCommon, setCommon] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('resource');

  const accessToken = localStorage.getItem('accessToken');

  // 获取设备树
  const { data: ifaceData } = useRequest(() => getSettingsCtrlTree());

  const { data, run, cancel } = useRequest(() => getOsSystem(), {
    manual: true,
    pollingInterval: 5000,
  });

  const dataSource = useMemo(() => data, [data]);

  useEffect(() => {
    if (!dataSource) return;
    const { hardWareInfo } = dataSource;

    setCommon(hardWareInfo.product === 'COMMON');
  }, [dataSource]);

  useEffect(() => {
    if (accessToken) {
      run();
    } else {
      cancel();
    }
  }, [accessToken]);

  return {
    dataSource,
    run,
    cancel,
    isCommon,
    activeKey,
    setActiveKey,
    ...ifaceData,
  };
};

export default useSystem;
