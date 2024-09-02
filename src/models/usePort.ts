import { getHwifaceList } from '@/services/rhilex/jiekouguanli';
import { useRequest } from '@umijs/max';

const usePort = () => {
  // 接口列表
  const { run, data } = useRequest(() => getHwifaceList(), {
    manual: true,
  });

  return { run, data };
};

export default usePort;
