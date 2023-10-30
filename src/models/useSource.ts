import { getInends } from '@/services/rulex/shuruziyuanguanli';
import { useRequest } from 'umi';

const useSource = () => {
  const { data, run } = useRequest(() => getInends(), {
    formatResult: (res: any) =>
      res?.data?.map((item: Record<string, any>) => ({ label: item?.name, value: item?.uuid })),
  });

  return { data, run };
};

export default useSource;
