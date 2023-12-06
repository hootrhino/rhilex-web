import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { useState } from 'react';
import { useRequest } from 'umi';

const useSource = () => {
  const [detailConfig, setConfig] = useState<DetailModalConfig>({
    uuid: '',
    open: false,
  });

  const { data, run } = useRequest(() => getInendsList(), {
    formatResult: (res: any) =>
      res?.data?.map((item: Record<string, any>) => ({ label: item?.name, value: item?.uuid })),
  });

  return { data, run, detailConfig, setConfig };
};

export default useSource;
