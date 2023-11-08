import { useEffect, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import { message } from '@/components/PopupHack';
import SchemaForm from '@/components/SchemaForm';
import { getInendsDetail, postInends, putInends } from '@/services/rulex/shuruziyuanguanli';
import random from 'lodash/random';
import { columns } from './columns';
import {
  defaultCoapConfig,
  defaultGrpcConfig,
  defaultHttpConfig,
  defaultIothubConfig,
  defaultNatsConfig,
  defaultUdpConfig,
} from './initialValue';

// type Config = {
//   host?: string;
//   port?: number;
//   [key: string]: any;
// };
// type InendsFormItem<T extends any> = {
//   name: string;
//   type: string;
//   config: T;
// };

const DefaultListUrl = '/inends/list';

const UpdateForm = () => {
  const { id } = useParams();
  const randomNumber = random(1000, 9999);
  const [initialValue, setInitialValue] = useState<any>();

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
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getInendsDetailParams) => getInendsDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (detail) {
      setInitialValue({ ...detail, config: [detail?.config] });
    } else {
      setInitialValue({ type: 'COAP', config: defaultCoapConfig });
    }
  }, [detail]);

  useEffect(() => {
    if (id) {
      getDetail({ uuid: id });
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
        if (!changedValue?.type) return;

        let config;

        switch (changedValue?.type) {
          case 'COAP':
            config = defaultCoapConfig;

            break;
          case 'GENERIC_IOT_HUB':
            config = defaultIothubConfig(randomNumber);

            break;
          case 'RULEX_UDP':
            config = defaultUdpConfig;

            break;
          case 'HTTP':
            config = defaultHttpConfig;
            break;
          case 'NATS_SERVER':
            config = defaultNatsConfig;

            break;
          case 'GRPC':
            config = defaultGrpcConfig;
            break;
          default:
            config = defaultCoapConfig;
            break;
        }

        setInitialValue({ config });
      }}
    />
  );
};

export default UpdateForm;
