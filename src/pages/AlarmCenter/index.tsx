import PageContainer from '@/components/ProPageContainer';
import { useState } from 'react';
import AlarmLog from './Log';
import AlarmRule from './Rule';

const AlarmCenter = () => {
  const [tabActiveKey, setActiveKey] = useState<string>('alarm-log');

  return (
    <PageContainer
      tabActiveKey={tabActiveKey}
      onTabChange={setActiveKey}
      tabList={[
        {
          tab: '预警日志',
          key: 'alarm-log',
          children: <AlarmLog />,
        },
        {
          tab: '预警规则',
          key: 'alarm-rule',
          children: <AlarmRule />,
        },
      ]}
    />
  );
};

export default AlarmCenter;
