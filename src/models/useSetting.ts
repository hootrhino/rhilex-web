import { getSiteDetail } from '@/services/rulex/zhandianpeizhi';
import { useModel, useRequest } from '@umijs/max';
import { useState } from 'react';

const useSetting = () => {
  const [activeKey, setActiveKey] = useState<string>('network');
  const { initialState, setInitialState } = useModel('@@initialState');

  // site setting
  const { data: siteDetail, run: getDetail } = useRequest(() => getSiteDetail(), {
    onSuccess: res => {
      setInitialState({
        ...initialState,
        settings: {
          ...initialState.settings,
          title: res?.appName,
          logo: res?.logo === '/logo.png' ? res?.logo : `${window?.location?.origin}/api/v1/site/logo`,
        },
      });
    }
  });

  return { activeKey, setActiveKey, siteDetail, getDetail };
};

export default useSetting;
