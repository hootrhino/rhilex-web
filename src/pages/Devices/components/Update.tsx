import { useEffect, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

import { message } from '@/components/PopupHack';
import { getDevicesDetail, postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import SchemaForm from '@/components/SchemaForm';

import { useModel } from '@umijs/max';
import { columns } from './columns';
import { defaultValue } from './initialValue';

const DefaultListUrl = '/device/list';

const BaseForm = () => {
  const { id } = useParams();
  const { isWindows } = useModel('useSystem');
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
    try {
      let params = cloneDeep(values);
      const deviceConfigFormat = new Object();
      let uartConfig = params?.config?.uartConfig?.[0];
      let hostConfig = params?.config?.hostConfig?.[0];

      params?.config?.deviceConfig?.forEach((item: any) => {
        deviceConfigFormat[item?.name] = {
          ...item,
          autoRequest: item?.autoRequest === 'true' ? true : false,
          autoRequestGap: 0,
          timeSlice: [3, 4].includes(item?.type) ? item?.timeSlice : 0,
        };
      });

      if (params?.type === 'GENERIC_PROTOCOL') {
        const transport = params?.config?.commonConfig?.[0]?.transport;

        if (transport === 'rawserial') {
          uartConfig = {
            ...params?.config?.uartConfig?.[0],
          };
          hostConfig = {
            ...initialValue?.config?.hostConfig?.[0],
          };
        } else {
          uartConfig = {
            ...initialValue?.config?.uartConfig?.[0],
          };
          hostConfig = {
            ...params?.config?.hostConfig?.[0],
          };
        }
      }

      params = {
        ...params,
        config: {
          ...params?.config,
          commonConfig: {
            ...params?.config?.commonConfig?.[0],
            autoRequest: params?.config?.commonConfig?.[0]?.autoRequest === 'true' ? true : false,
          },
          snmpConfig: params?.config?.snmpConfig?.[0],
          deviceConfig: deviceConfigFormat,
          uartConfig,
          hostConfig,
          rtuConfig: params?.config?.rtuConfig?.[0],
          tcpConfig: params?.config?.tcpConfig?.[0],
          registers: params?.config?.registers?.map((item: Record<string, any>) => ({
            ...item,
            value: '',
          })),
        },
      };

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
  const { run: getDetail } = useRequest(() => getDevicesDetail({ uuid: id || '' }), {
    manual: true,
    onSuccess: (data: any) => {
      const newConfig = Object.fromEntries(
        Object.entries(data?.config || {}).map(([key, value]) => {
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

      setValue({ ...data, config: newConfig });
    },
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      const defaultData = defaultValue(isWindows, activeGroupKey);
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
    />
  );
};

export default BaseForm;
