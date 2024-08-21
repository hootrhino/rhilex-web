import { useState } from 'react';

type DetailConfig = {
  open: boolean;
  uuid: string;
};

const defaultConfig = {
  uuid: '',
  open: false,
};

const useCommon = () => {
  const [detailConfig, setDetailConfig] = useState<DetailConfig>(defaultConfig);

  const changeConfig = (value: DetailConfig) => setDetailConfig(value);

  const initialConfig = () => setDetailConfig(defaultConfig);

  return {
    detailConfig,
    changeConfig,
    initialConfig,
  };
};

export default useCommon;
