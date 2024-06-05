import type { ActiveSchema } from '@/pages/DataSchema';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

const useSchema = () => {
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>({
    uuid: '',
    name: '',
    published: false,
  });
  const [activeDataCenterkey, setActiveDataCenterKey] = useState<string>('');

  const {
    run,
    data: schemaList,
    refresh,
  } = useRequest(() => getSchemaList(), {
    manual: true,
    onSuccess: (res) => {
      if (!activeSchema.uuid) {
        const defaultActiveItem = res?.[0];
        setActiveSchema({
          uuid: defaultActiveItem?.uuid || '',
          name: defaultActiveItem?.name || '',
          published: defaultActiveItem?.published || false,
        });
      } else {
        const activeItem = res?.find((item) => item.uuid === activeSchema.uuid);
        setActiveSchema({
          ...activeSchema,
          published: activeItem?.published || false,
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
