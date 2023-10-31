import { getSiteDetail } from '@/services/rulex/zhandianpeizhi';
import { useModel, useRequest } from '@umijs/max';
import { useState } from 'react';

const useSetting = () => {
  const [activeKey, setActiveKey] = useState<string>('network');
  const { initialState, setInitialState } = useModel('@@initialState');

  const { data: siteDetail } = useRequest(() => getSiteDetail(), {
    onSuccess: res => setInitialState({...initialState, settings: {...initialState.settings, title: res?.appName}})
  });

  return { activeKey, setActiveKey, siteDetail };
};

export default useSetting;
