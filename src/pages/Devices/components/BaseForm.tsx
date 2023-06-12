import { useEffect, useState } from 'react';

import { history, useParams } from 'umi';

import { useRequest } from 'ahooks';

import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

import { message } from '@/components/PopupHack';
import { getDevices, postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import SchemaForm from '@/components/SchemaForm';

import { columns } from './columns';
import { defaultValue } from './initialValue';

const BaseForm = () => {
  const { id } = useParams();
  const [initialValue, setValue] = useState<any>(defaultValue);

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = cloneDeep(values);
      const deviceConfigFormat = new Object();

      params?.config?.deviceConfig?.forEach((item: any) => {
        deviceConfigFormat[item?.name] = {
          ...item,
          autoRequest: item?.autoRequest === 'true' ? true : false,
          autoRequestGap: 0,
          timeSlice: [3, 4].includes(item?.type) ? item?.timeSlice : 0,
        };
      });

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
          uartConfig: params?.config?.uartConfig?.[0],
          rtuConfig: params?.config?.rtuConfig?.[0],
          tcpConfig: params?.config?.tcpConfig?.[0],
          registers: params?.config?.registers?.map((item: Record<string, any>) => ({
            ...item,
            value: '',
          })),
        },
      };

      if (id) {
        await putDevices({ ...params, uuid: id });
      } else {
        await postDevices(params);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/device/list');
      return true;
    } catch (error) {
      history.push('/device/list');
      return false;
    }
  };

  // 获取详情
  const { run: getDetail } = useRequest(() => getDevices({ params: { uuid: id } }), {
    manual: true,
    onSuccess: ({ data }: any) => {
      // const newConfig = Object.fromEntries(
      //   Object.entries(data?.config || {}).map(([key, value]) => {
      //     console.log(key, value);
      //     const newValue = Array.isArray(value) ? value : isEmpty(value) ? [] : [value];
      // return has(value, 'autoRequest')
      //   ? [key, [{ ...(value as any), autoRequest: (value as any)?.autoRequest.toString() }]]
      //   : [key, newValue];
      //   }),
      // );
      const newConfig = Object.fromEntries(
        Object.entries(data?.config || {}).map(([key, value]) => {
          let newValue;
          newValue = Array.isArray(value) ? value : isEmpty(value) ? [] : [value];

          Object.values(value as any)?.forEach((item) => {
            if (typeof item === 'object') {
              console.log(item);
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
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '编辑设备' : '新建设备'}
      goBack="/device/list"
      columns={columns}
      initialValue={initialValue}
      onFinish={async (values) => await onFinish(values)}
    />
  );
};

export default BaseForm;
