import { getInends } from '@/services/rulex/shuruziyuanguanli';
import { useState } from 'react';
import { useRequest } from 'umi';

const useSource = () => {
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  const { data, run } = useRequest(() => getInends(), {
    formatResult: (res: any) =>
      res?.data?.map((item: Record<string, any>) => ({ label: item?.name, value: item?.uuid })),
  });

  return { data, run, detailConfig, setConfig };
};

export default useSource;
