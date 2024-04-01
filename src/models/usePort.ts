import { getHwifaceDetail, getHwifaceList } from '@/services/rulex/jiekouguanli';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const usePort = () => {
  const [detailConfig, setDetailConfig] = useState<DetailModalConfig>({
    open: false,
    uuid: '',
  });

  // 接口列表
  const { run, data } = useRequest(() => getHwifaceList(), {
    manual: true,
  });

  // 接口详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getHwifaceDetailParams) => getHwifaceDetail(params),
    {
      manual: true,
    },
  );

  return { run, data, getDetail, detail, detailConfig, setDetailConfig };
};

export default usePort;
