import type { BackgroundManager } from '@antv/x6';
import { useState } from 'react';

const useEditor = () => {
  const [bgSetting, setBgSetting] = useState<BackgroundManager.Options>({ color: '#F5F5F5' });

  return { bgSetting, setBgSetting };
};

export default useEditor;
