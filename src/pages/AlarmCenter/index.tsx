import PageContainer from '@/components/ProPageContainer';
import { useIntl } from '@umijs/max';
import { useState } from 'react';
import AlarmLog from './Log';
import AlarmRule from './Rule';

const AlarmCenter = () => {
  const { formatMessage } = useIntl();
  const [tabActiveKey, setActiveKey] = useState<string>('alarm-log');

  return (
    <PageContainer
      tabActiveKey={tabActiveKey}
      onTabChange={setActiveKey}
      tabList={[
        {
          tab: formatMessage({ id: 'alarm.tab.log' }),
          key: 'alarm-log',
          children: <AlarmLog />,
        },
        {
          tab: formatMessage({ id: 'alarm.tab.rule' }),
          key: 'alarm-rule',
          children: <AlarmRule />,
        },
      ]}
    />
  );
};

export default AlarmCenter;
