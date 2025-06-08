import type { ActiveSchema } from '@/pages/DataSchema/typings';
import { getSchemaList } from '@/services/rhilex/shujumoxing';
import { useModel, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';

export const defaultActiveSchema = {
  uuid: '',
  name: '',
  published: false,
};

const useSchema = () => {
  const { changeTotal } = useModel('useCommon');
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>(defaultActiveSchema);
  const [activeDataCenterkey, setActiveDataCenterKey] = useState<string>('');

  const {
    run,
    data: schemaList,
    refresh,
  } = useRequest(() => getSchemaList(), {
    manual: true,
  });

  useEffect(() => {
    const defaultActiveItem = schemaList?.[0];

    if (defaultActiveItem && defaultActiveItem.uuid && defaultActiveItem.name) {
      setActiveSchema({
        uuid: defaultActiveItem.uuid,
        name: defaultActiveItem.name,
        published: defaultActiveItem?.published || false,
      });
    }
    changeTotal(schemaList?.length || 0);
  }, [schemaList]);

  return {
    run,
    refresh,
    schemaList,
    activeSchema,
    setActiveSchema,
    activeDataCenterkey,
    setActiveDataCenterKey,
  };
};

export default useSchema;
