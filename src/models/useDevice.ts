import { getDevices } from '@/services/rulex/shebeiguanli';
import { useRequest } from 'umi';

const useDevice = () => {
  const { data, run } = useRequest(() => getDevices(), {
    manual: true,
    formatResult: (res) =>
      res?.data?.map((item: Record<string, any>) => ({ label: item?.name, value: item?.uuid })),
  });

  return { data, run };
};

export default useDevice;
