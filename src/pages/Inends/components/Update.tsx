import { useEffect, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import { message } from '@/components/PopupHack';
import SchemaForm from '@/components/SchemaForm';
import { getInends, postInends, putInends } from '@/services/rulex/shuruziyuanguanli';
import random from 'lodash/random';
import { columns } from './columns';

type Config = {
  host?: string;
  port?: number;
  [key: string]: any;
};
type InendsFormItem<T extends any> = {
  name: string;
  type: string;
  config: T;
};

const DefaultListUrl = '/inends/list';

const UpdateForm = () => {
  const { id } = useParams();
  const randomNumber = random(1000, 9999);
  const [initialValue, setInitialValue] = useState<InendsFormItem<Config[]>>({
    name: '',
    type: 'COAP',
    config: [{ host: '127.0.0.1', port: 2582 }],
  });

  const { run: addInends, loading: addLoading } = useRequest((data) => postInends(data), {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      history.push(DefaultListUrl);
    },
    onError: () => {
      history.push(DefaultListUrl);
    },
  });

  const { run: updateInends, loading: updateLoading } = useRequest((data) => putInends(data), {
    manual: true,
    onSuccess: () => {
      message.success('更新成功');
      history.push(DefaultListUrl);
    },
    onError: () => {
      history.push(DefaultListUrl);
    },
  });

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      const params = {
        ...values,
        config: values?.config?.[0],
      };
      if (id) {
        updateInends({ ...params, uuid: id });
      } else {
        addInends(params);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail } = useRequest(() => getInends({ params: { uuid: id } }), {
    manual: true,
    onSuccess: (res: any) => setInitialValue({ ...res, config: [res?.config] }),
  });

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '编辑资源' : '新建资源'}
      loading={addLoading || updateLoading}
      goBack={DefaultListUrl}
      columns={columns}
      initialValue={initialValue}
      onFinish={onFinish}
      onValuesChange={(changedValue) => {
        if (changedValue?.type) {
          let config: Config = {
            port: 2582,
          };

          switch (changedValue?.type) {
            case 'COAP':
              config = {
                port: 2582,
              };

              break;
            case 'GENERIC_IOT_HUB':
              config = {
                port: 1883,
                mode: 'DC',
                productId: `eekit${randomNumber}`,
                deviceName: `eekit${randomNumber}`,
                clientId: `eekit${randomNumber}`,
              };

              break;
            case 'RULEX_UDP':
              config = {
                port: 2583,
              };

              break;
            case 'HTTP':
              config = {
                port: 2584,
              };
              break;
            case 'NATS_SERVER':
              config = {
                port: 4222,
              };

              break;
            case 'GRPC':
              config = {
                port: 2585,
              };
              break;
            default:
              break;
          }
          setInitialValue({
            ...initialValue,
            type: changedValue?.type,
            config: [{ ...initialValue?.config?.[0], ...config, host: '127.0.0.1' }],
          });
        }
      }}
    />
  );
};

export default UpdateForm;
