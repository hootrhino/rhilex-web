import { useEffect, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

import { message } from '@/components/PopupHack';
import { getDevicesDetail, postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import SchemaForm from '@/components/SchemaForm';

import { useModel } from '@umijs/max';
import omit from 'lodash/omit';
import { columns } from './columns';
import {
  defaultAisConfig,
  defaultHostConfig,
  defaultModbusConfig,
  defaultProtocolCommonConfig,
  defaultRegistersConfig,
  defaultTcpConfig,
  defaultValue,
} from './initialValue';

const DefaultListUrl = '/device/list';

const BaseForm = () => {
  const { id } = useParams();
  const { activeGroupKey } = useModel('useGroup');
  const [initialValue, setValue] = useState<any>();

  // 新建
  const { run: add, loading: addLoading } = useRequest((params) => postDevices(params), {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      history.push(DefaultListUrl);
    },
  });

  // 编辑
  const { run: update, loading: updateLoading } = useRequest((params) => putDevices(params), {
    manual: true,
    onSuccess: () => {
      message.success('更新成功');
      history.push(DefaultListUrl);
    },
  });

  const handleOnFinish = async (values: any) => {
    console.log(values);
    try {
      let params = cloneDeep(values);

      const transport = params?.config?.commonConfig?.[0]?.transport;
      let hostConfig =
        transport === 'rawserial'
          ? initialValue?.config?.hostConfig?.[0]
          : params?.config?.hostConfig?.[0];

      params = {
        ...params,
        config: {
          ...params?.config,
          commonConfig: {
            ...params?.config?.commonConfig?.[0],
            autoRequest: params?.config?.commonConfig?.[0]?.autoRequest === 'true' ? true : false,
          },
          hostConfig,
          tcpConfig: params?.config?.tcpConfig?.[0],
          registers: params?.config?.registers?.map((item: Record<string, any>) => ({
            ...item,
            value: '',
          })),
        },
      };
      console.log(params);
      if (id) {
        update({ ...params, uuid: id });
      } else {
        add(params);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getDevicesDetail({ uuid: id || '' }), {
    manual: true,
    onSuccess: (data: any) => {
      const newConfig = Object.fromEntries(
        Object.entries(omit(data?.config, ['port', 'host']) || {}).map(([key, value]) => {
          let newValue;
          newValue = Array.isArray(value) ? value : isEmpty(value) ? [] : [value];

          Object.values(value as any)?.forEach((item) => {
            if (typeof item === 'object') {
              newValue = Object.values(value as any);
            }
          });

          return has(value, 'autoRequest')
            ? [key, [{ ...(value as any), autoRequest: (value as any)?.autoRequest.toString() }]]
            : [key, newValue];
        }),
      );

      setValue({
        ...data,
        config: { ...newConfig, port: data?.config?.port, host: data?.config?.host },
      });
    },
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      const defaultData = defaultValue(activeGroupKey);

      setValue(defaultData);
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '编辑设备' : '新建设备'}
      loading={addLoading || updateLoading}
      goBack={DefaultListUrl}
      columns={columns}
      initialValue={initialValue}
      onFinish={handleOnFinish}
      onValuesChange={(changedValue) => {
        let newData: any = { ...defaultValue };

        if (changedValue?.type === 'GENERIC_PROTOCOL') {
          newData = {
            config: {
              commonConfig: defaultProtocolCommonConfig,
            },
          };
        }
        if (changedValue?.config?.commonConfig) {
          const changedConfig = changedValue?.config?.commonConfig?.[0];

          if (changedConfig?.transport === 'rawtcp') {
            newData = {
              config: {
                commonConfig: [{ ...defaultProtocolCommonConfig?.[0], transport: 'rawtcp' }],
                hostConfig: defaultHostConfig,
              },
            };
          }
          if (changedConfig?.mode === 'TCP') {
            newData = {
              config: {
                commonConfig: [
                  {
                    ...defaultModbusConfig?.[0],
                    mode: 'TCP',
                  },
                ],
                tcpConfig: defaultTcpConfig,
                registers: defaultRegistersConfig,
              },
            };
          }
        }

        if (changedValue?.type === 'GENERIC_MODBUS') {
          newData = {
            config: {
              commonConfig: defaultModbusConfig,
              registers: defaultRegistersConfig,
            },
          };
        }
        if (changedValue?.type === 'GENERIC_AIS') {
          newData = {
            config: defaultAisConfig,
          };
        }
        if (changedValue?.type === detail?.type) {
          newData = {
            config: {
              ...newData?.config,
              ...detail?.config,
            },
          };
          console.log(newData, detail);
        }
        setValue(newData);
      }}
    />
  );
};

export default BaseForm;
