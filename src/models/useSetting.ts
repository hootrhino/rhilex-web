import { useState } from 'react';

const useSetting = () => {
  const [activeKey, setActiveKey] = useState<string>('network');

  return { activeKey, setActiveKey };
};

export default useSetting;
