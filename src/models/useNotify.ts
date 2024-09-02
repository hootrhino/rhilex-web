import { getNotifyPageList } from '@/services/rhilex/zhanneitongzhi';
import { useRequest } from '@umijs/max';

const useNotify = () => {
  const { run, data, refresh } = useRequest(() => getNotifyPageList({ current: 1, size: 3 }), {
    manual: true,
  });

  return {
    run,
    data,
    refresh,
  };
};

export default useNotify;
