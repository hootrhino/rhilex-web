import { useState } from 'react';

const useSetting = () => {
  const [activeKey, setActiveKey] = useState<string>('netStatus');

  return { activeKey, setActiveKey };
};

export default useSetting;
