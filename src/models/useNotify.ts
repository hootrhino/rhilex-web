import { getNotifyHeader } from '@/services/rulex/zhanneitongzhi';
import { useRequest } from '@umijs/max';

const useNotify = () => {
  const { data, run, refresh } = useRequest(() => getNotifyHeader(), {
    manual: true,
  });

  return { data, run, refresh };
};

export default useNotify;
