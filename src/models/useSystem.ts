import { getSystem } from '@/services/rulex/xitongshuju';
import { useRequest } from 'umi';

const useSystem = () => {
  const { data, run } = useRequest(() => getSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
  });

  return { data, run };
};

export default useSystem;
