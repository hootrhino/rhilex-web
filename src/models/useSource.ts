import { useState } from 'react';

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const useSource = () => {
  const [detailConfig, setConfig] = useState<DetailModalConfig>({
    uuid: '',
    open: false,
  });

  return { detailConfig, setConfig };
};

export default useSource;
