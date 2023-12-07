import { useState } from 'react';

const useSource = () => {
  const [detailConfig, setConfig] = useState<DetailModalConfig>({
    uuid: '',
    open: false,
  });

  return { detailConfig, setConfig };
};

export default useSource;
