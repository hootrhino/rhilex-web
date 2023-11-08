import { message } from '@/components/PopupHack';
import SchemaForm from '@/components/SchemaForm';

import { getOutendsDetail, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';

import { ProSkeleton } from '@ant-design/pro-components';
import { pick } from 'lodash';
import random from 'lodash/random';
import { useEffect, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns } from './columns';
import { defaultMongoConfig, defaultMqttConfig, defaultUdpConfig } from './initialValue';

// type Config = {
//   host?: string;
//   port?: number;
//   clientId?: string;
//   username?: string;
//   password?: string;
//   productId?: string;
//   deviceName?: string;
//   timeout?: number;
//   [key: string]: any;
// };

// type UpdateFormItem<T = any> = {
//   type: string;
//   name: string;
//   description?: string;
//   config?: T;
//   uuid?: string;
// };

const DefaultListUrl = '/outends/list';

const UpdateForm = () => {
  const { id } = useParams();
  const randomNumber = random(1000, 9999);
  const [initialValue, setValue] = useState<any>();
  const [formLoading, setLoading] = useState<boolean>(true);

  // 获取详情
  const {
    run: getDetail,
    data: detail,
    loading: detailLoading,
  } = useRequest((params: API.getOutendsDetailParams) => getOutendsDetail(params), {
    manual: true,
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

  const handleOnFinish = async ({ config, ...values }: any) => {
    try {
      let params = {
        ...values,
      };

      if (values?.type === 'MONGO_SINGLE') {
        params = {
          ...params,
          config: {
            ...pick(config?.[0], ['mongoUrl', 'database', 'collection']),
          },
        };
      }
      if (values?.type === 'MQTT') {
        params = {
          ...params,
          config: {
            ...pick(config?.[0], ['port', 'host', 'clientId', 'pubTopic', 'username', 'password']),
          },
        };
      }
      if (values?.type === 'UDP_TARGET') {
        params = {
          ...params,
          config: {
            ...pick(config?.[0], ['port', 'host', 'timeout']),
          },
        };
      }

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
    if (detail) {
      setValue({
        ...detail,
        config: [
          {
            ...detail?.config,
          },
        ],
      });
    } else {
      setValue({
        type: 'MONGO_SINGLE',
        config: defaultMongoConfig,
      });
    }
  }, [detail]);

  useEffect(() => {
    if (id) {
      getDetail({ uuid: id });
    }
  }, [id]);

  useEffect(() => {
    if (!detailLoading) {
      setLoading(false);
    }
  }, [detailLoading]);

  return formLoading ? (
    <ProSkeleton />
  ) : (
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
            config: detail?.type === 'UDP_TARGET' ? [detail?.config] : defaultUdpConfig,
          });
        }
        if (changedValue?.type === 'MQTT') {
          setValue({
            config: detail?.type === 'MQTT' ? [detail?.config] : defaultMqttConfig(randomNumber),
          });
        }
        if (changedValue?.type === 'MONGO_SINGLE') {
          setValue({
            config: detail?.type === 'MONGO_SINGLE' ? [detail?.config] : defaultMongoConfig,
          });
        }
      }}
    />
  );
};

export default UpdateForm;
