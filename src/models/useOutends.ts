import { getOutends } from '@/services/rulex/shuchuziyuanguanli';
import { useRequest } from 'umi';

const useOutends = () => {
  const { data, run } = useRequest(() => getOutends(), {
    formatResult: (res: any) =>
      res?.data?.map((item: Record<string, any>) => ({ label: item?.name, value: item?.uuid })),
  });

  return { data, run };
};

export default useOutends;
