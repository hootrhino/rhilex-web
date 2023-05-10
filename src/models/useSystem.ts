import { getSystem } from '@/services/rulex/xitongshuju';
import { useRequest } from 'umi';

const useSystem = () => {
  const { data } = useRequest(() => getSystem(), {
    formatResult: (res) => res.data,
  });

  return {data}
}

export default useSystem;
