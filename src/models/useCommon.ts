import { VersionType } from '@/utils/enum';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

export type DetailConfig = {
  open: boolean;
  uuid: string;
};

export const defaultConfig = {
  uuid: '',
  open: false,
};

const useCommon = () => {
  const [detailConfig, setDetailConfig] = useState<DetailConfig>(defaultConfig);
  const [isFreeTrial, setFreeTrial] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  const { initialState } = useModel('@@initialState');
  const { type } = initialState || {};

  const changeConfig = (value: DetailConfig) => setDetailConfig(value);

  const initialConfig = () => setDetailConfig(defaultConfig);

  const changeTotal = (value: number) => setTotal(value);

  useEffect(() => {
    setFreeTrial(type === VersionType.FREETRIAL);
  }, [type]);

  return {
    detailConfig,
    changeConfig,
    initialConfig,
    isFreeTrial,
    changeTotal,
    total,
  };
};

export default useCommon;
