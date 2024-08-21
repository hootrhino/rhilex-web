import { getDevicesList } from '@/services/rulex/shebeiguanli';
import { useRequest } from '@umijs/max';

const useDevice = () => {
  const { data: allDeviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }));

  return {
    allDeviceData,
  };
};

export default useDevice;
