import { useEffect, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import cloneDeep from 'lodash/cloneDeep';

import { message } from '@/components/PopupHack';
import { postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import SchemaForm from '@/components/SchemaForm';

import { ProSkeleton } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { columns } from './columns';
import { defaultHostConfig, defaultValue } from './initialValue';

const DefaultListUrl = '/device/list';

const BaseForm = () => {
  const { id } = useParams();
  const { activeGroupKey } = useModel('useGroup');
  const { detail, getDetail, detailLoading } = useModel('useDevice');
  const [initialValue, setValue] = useState<any>();
  const [formLoading, setLoading] = useState<boolean>(true);

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
    if (id && detail) {
      const newData = handleOnUpdateValue(detail);
      setValue(newData);
    } else {
      const defaultData = defaultValue(activeGroupKey);
      setValue(defaultData);
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
