import { getNotifyList } from '@/services/rulex/zhanneitongzhi';
import { useRequest } from '@umijs/max';

const useNotify = () => {
  const { data, run, refresh } = useRequest(() => getNotifyList(), {
    manual: true,
  });

  return { data, run, refresh };
};

export default useNotify;
