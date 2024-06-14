import { getNotifyPageList } from '@/services/rulex/zhanneitongzhi';
import { useRequest } from '@umijs/max';
import { useEffect } from 'react';

const useNotify = () => {
  const {
    run: getNotify,
    data,
    refresh,
  } = useRequest(() => getNotifyPageList({ current: 1, size: 3 }), {
    manual: true,
  });

  useEffect(() => {
    getNotify();
  }, []);

  return {
    getNotify,
    data,
    refresh,
  };
};

export default useNotify;
