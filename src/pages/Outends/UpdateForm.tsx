import { message } from '@/components/PopupHack';
import SchemaForm from '@/components/SchemaForm';

import { getOutends, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';

import random from 'lodash/random';
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

const DefaultListUrl = '/outends/list';

const UpdateForm = () => {
  const { id } = useParams();
  const randomNumber = random(1000, 9999);
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

  // 获取详情
  const { run: getDetail } = useRequest(() => getOutends({ params: { uuid: id } }), {
    manual: true,
    onSuccess: (res: any) => setValue({ ...res, config: [res?.config] }),
  });

  // 新建
  const { run: add, loading: addLoading } = useRequest((params) => postOutends(params), {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      history.push(DefaultListUrl);
    },
  });

  // 编辑
  const { run: update, loading: updateLoading } = useRequest((params) => putOutends(params), {
    manual: true,
    onSuccess: () => {
      message.success('更新成功');
      history.push(DefaultListUrl);
    },
  });

  const handleOnFinish = async (values: any) => {
    try {
      const params = {
        ...values,
        config: values?.config?.[0],
      };
      if (id) {
        update({ ...params, uuid: id } as any);
      } else {
        add(params as any);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '编辑目标' : '新建目标'}
      loading={addLoading || updateLoading}
      goBack={DefaultListUrl}
      columns={columns}
      initialValue={initialValue}
      onFinish={handleOnFinish}
      onValuesChange={(changedValue) => {
        if (changedValue?.type === 'UDP_TARGET') {
          setValue({
            ...initialValue,
            type: changedValue?.type,
            config: [{ ...initialValue?.config?.[0], port: 2599, host: '127.0.0.1' }],
          });
        }
        if (changedValue?.type === 'MQTT') {
          setValue({
            ...initialValue,
            type: changedValue?.type,
            config: [
              {
                ...initialValue?.config?.[0],
                port: 1883,
                host: '127.0.0.1',
                clientId: `eekit${randomNumber}`,
                pubTopic: `eekit${randomNumber}`,
              },
            ],
          });
        }
      }}
    />
  );
};

export default UpdateForm;
