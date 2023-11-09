import { useEffect, useState } from 'react';

import cloneDeep from 'lodash/cloneDeep';

import { message } from '@/components/PopupHack';
import { postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import SchemaForm from '@/components/SchemaForm';

import { ProSkeleton } from '@ant-design/pro-components';
import { history, useModel, useParams } from '@umijs/max';
import { columns } from './columns';
import { defaultHostConfig, defaultValue } from './initialValue';

const DefaultListUrl = '/device/list';

const BaseForm = () => {
  const { deviceId, groupId } = useParams();
  const { detail, getDetail, detailLoading } = useModel('useDevice');
  const [initialValue, setValue] = useState<any>();
  const [spin, setSpin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = cloneDeep(values);
      const commonConfigParams = params.config.commonConfig?.[0];
      const hostConfigParams = params?.config?.hostConfig?.[0];
      let newCommonConfig = {};

      if (params.type === 'GENERIC_AIS_RECEIVER') {
        newCommonConfig = {
          mode: commonConfigParams?.mode,
          parseAis: commonConfigParams?.parseAis === 'true' ? true : false,
        };
      }
      if (params.type === 'GENERIC_PROTOCOL') {
        newCommonConfig = {
          mode: commonConfigParams?.mode,
          retryTime: commonConfigParams?.retryTime,
        };
      }
      if (params.type === 'GENERIC_MODBUS') {
        newCommonConfig = {
          frequency: commonConfigParams?.frequency,
          mode: commonConfigParams?.mode,
          autoRequest: commonConfigParams?.autoRequest === 'true' ? true : false,
        };
      }
      if (commonConfigParams.mode === 'UART') {
        params = {
          ...params,
          config: {
            ...params.config,
            commonConfig: newCommonConfig,
          },
        };
      }
      if (commonConfigParams.mode === 'TCP') {
        if (params.type === 'GENERIC_MODBUS') {
          params = {
            ...params,
            config: {
              ...params.config,
              commonConfig: newCommonConfig,
              hostConfig: hostConfigParams,
              registers: params?.config?.registers?.map((item: Record<string, any>) => ({
                ...item,
                value: '',
              })),
            },
          };
        } else {
          params = {
            ...params,
            config: {
              ...params.config,
              commonConfig: newCommonConfig,
              hostConfig: hostConfigParams,
            },
          };
        }
      }

      if (deviceId) {
        await putDevices({ ...params, uuid: deviceId });
        message.success('更新成功');
      } else {
        const { msg } = await postDevices(params);

        if (msg) {
          const info = `创建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：${msg}`;
          message.warning(info);
        } else {
          message.success('创建成功');
        }
      }
      history.push(DefaultListUrl);
      setLoading(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOnUpdateValue = (data: any) => {
    const newCommonConfig = data?.config?.commonConfig;
    const newHostConfig = data?.config?.hostConfig;

    let newData = {
      ...data,
      config: {
        ...data?.config,
        commonConfig: [{ ...newCommonConfig, frequency: newCommonConfig?.frequency || 3000 }],
        hostConfig: newHostConfig ? [newHostConfig] : defaultHostConfig,
      },
    };

    if (data.type === 'GENERIC_MODBUS') {
      newData = {
        ...newData,
        config: {
          ...newData?.config,
          commonConfig: newData?.config?.commonConfig?.map((item: any) => ({
            ...item,
            autoRequest: item?.autoRequest.toString(),
          })),
        },
      };
    }
    if (data.type === 'GENERIC_AIS_RECEIVER') {
      newData = {
        ...newData,
        config: {
          ...newData?.config,
          commonConfig: newData?.config?.commonConfig?.map((item: any) => ({
            ...item,
            parseAis: item?.parseAis.toString(),
          })),
        },
      };
    }

    return newData;
  };

  useEffect(() => {
    if (deviceId && detail) {
      const newData = handleOnUpdateValue(detail);
      setValue(newData);
    } else {
      const defaultData = defaultValue(groupId || '');
      setValue(defaultData);
    }
  }, [detail]);

  useEffect(() => {
    if (deviceId) {
      getDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  useEffect(() => {
    if (!detailLoading) {
      setSpin(false);
    }
  }, [detailLoading]);

  return spin ? (
    <ProSkeleton />
  ) : (
    <SchemaForm
      title={deviceId ? '编辑设备' : '新建设备'}
      loading={loading}
      goBack={DefaultListUrl}
      columns={columns}
      initialValue={initialValue}
      onFinish={handleOnFinish}
    />
  );
};

export default BaseForm;
