import { message } from '@/components/PopupHack';
import SchemaForm from '@/components/SchemaForm';

import { getOutends, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';

import { useEffect, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns } from './columns';

type Config = {
  host?: string;
  port?: number;
  clientId?: string;
  username?: string;
  password?: string;
  productId?: string;
  deviceName?: string;
  [key: string]: any;
};

type UpdateFormItem<T = any> = {
  type: string;
  name: string;
  description?: string;
  config?: T;
  uuid?: string;
};

const UpdateForm = () => {
  const { id } = useParams();
  const [initialValue, setValue] = useState<UpdateFormItem<Config[]>>({
    name: '',
    type: 'MONGO_SINGLE',
    config: [
      {
        mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
        database: 'rulexdb',
        collection: 'rulex',
      },
    ],
  });

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      const params = {
        ...values,
        config: values?.config?.[0],
      };
      if (id) {
        await putOutends({ ...params, uuid: id } as any);
      } else {
        await postOutends(params as any);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/outends/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail } = useRequest(() => getOutends({ params: { uuid: id } }), {
    manual: true,
    onSuccess: (res: any) => setValue({ ...res, config: [res?.config] }),
  });

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '编辑目标' : '新建目标'}
      goBack="/outends/list"
      columns={columns}
      initialValue={initialValue}
      onFinish={onFinish}
    />
  );
};

export default UpdateForm;
