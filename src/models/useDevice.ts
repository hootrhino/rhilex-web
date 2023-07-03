import { getDevices } from '@/services/rulex/shebeiguanli';
import { useState } from 'react';
import { useRequest } from 'umi';

const useDevice = () => {
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  const { data, run } = useRequest(() => getDevices(), {
    manual: true,
    formatResult: (res) =>
      res?.data?.map((item: Record<string, any>) => ({ label: item?.name, value: item?.uuid })),
  });

  return { data, run, detailConfig, setConfig };
};

export default useDevice;
