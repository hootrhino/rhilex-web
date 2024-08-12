import type { ActiveSchema } from '@/pages/DataSchema';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

export const defaultActiveSchema = {
  uuid: '',
  name: '',
  published: false,
};

const useSchema = () => {
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>(defaultActiveSchema);
  const [activeDataCenterkey, setActiveDataCenterKey] = useState<string>('');

  const {
    run,
    data: schemaList,
    refresh,
  } = useRequest(() => getSchemaList(), {
    manual: true,
    onSuccess: (res) => {
      const defaultActiveItem = res?.[0];

      if (defaultActiveItem && defaultActiveItem.uuid && defaultActiveItem.name) {
        setActiveSchema({
          uuid: defaultActiveItem.uuid,
          name: defaultActiveItem.name,
          published: defaultActiveItem?.published || false,
        });
      }
    },
  });

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
