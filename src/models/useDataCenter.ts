import { getDatacenterSecret } from '@/services/rulex/shujuzhongxin';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

const useDataCenter = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [key, setKey] = useState<string>();

  const { data: DataCenterSecret } = useRequest(() => getDatacenterSecret(), {
    ready: !!accessToken,
  });

  return {
    key,
    setKey,
    DataCenterSecret,
  };
};

export default useDataCenter;
