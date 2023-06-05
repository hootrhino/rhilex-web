import { useEffect } from 'react';

import { history, useParams } from 'umi';

import { useRequest } from 'ahooks';

import cloneDeep from 'lodash/cloneDeep';

import { message } from '@/components/PopupHack';
import { getDevices, postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import SchemaForm from '@/components/SchemaForm';
import { columns } from './columns';
import { initialValue } from './initialValue';

const BaseForm = () => {
  const { id } = useParams();

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = cloneDeep(values);
      const deviceConfigFormat = new Object();

      params?.config?.deviceConfig?.forEach((item: any) => {
        deviceConfigFormat[item?.name] = {
          ...item,
          autoRequest: Boolean(item?.autoRequest),
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
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getDevices({ params: { uuid: id } }), {
    manual: true,
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
      initialValue={id ? detail : initialValue}
      onFinish={async (values) => await onFinish(values)}
    />
  );
};

export default BaseForm;
