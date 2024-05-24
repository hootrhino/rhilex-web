import { getNotifyPageList } from '@/services/rulex/zhanneitongzhi';
import { useRequest } from '@umijs/max';

const useNotify = () => {
  const { data, refresh } = useRequest(() => getNotifyPageList({ current: 1, size: 5 }));

  return {
    data,
    refresh,
  };
};

export default useNotify;
