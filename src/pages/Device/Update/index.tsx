import { message } from '@/components/PopupHack';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rulex/shebeiguanli';
import { formatHeaders2Arr, formatHeaders2Obj, getPlayAddress, stringToBool } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useModel, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../columns';
import {
  defaultConfig,
  defaultInputModeConfig,
  defaultModelConfig,
  defaultOutputConfig,
} from './initialValues';

import PageContainer from '@/components/PageContainer';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import { DeviceMode, DeviceType, OutputMode } from '../enum';

const DefaultListUrl = '/device/list';

const filterData = (obj: Record<string, any>) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== undefined &&
      obj[key] !== '' &&
      (typeof obj[key] !== 'object' || Object.keys(obj[key]).length > 0)
    ) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { deviceId, groupId } = useParams();
  const { setActiveGroupKey } = useModel('useDevice');
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    type: DeviceType.GENERIC_PROTOCOL,
    gid: groupId,
    config: defaultConfig[DeviceType.GENERIC_PROTOCOL],
  };

  // 设备详情
  const { data: detail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = { ...values };
      let commonConfig = { ...params.config?.commonConfig };
      let httpConfig = { ...params.config?.httpConfig };
      let outputAddr = params?.config?.outputAddr;

      const { autoRequest, enableOptimize, enableGroup, mode, parseAis } = commonConfig;
      const type = params.type;
      const outputMode = params?.config?.outputMode;

      if (type === DeviceType.GENERIC_CAMERA) {
        outputAddr =
          outputMode === OutputMode.REMOTE_STREAM_SERVER
            ? outputAddr
            : getPlayAddress(params?.name, outputMode, 'push');
      } else {
        if (type === DeviceType.GENERIC_HTTP_DEVICE) {
          const newHeaders =
            httpConfig?.headers?.length > 0 ? formatHeaders2Obj(httpConfig?.headers) : {};
          httpConfig = {
            ...httpConfig,
            headers: newHeaders,
          };
        }
        const options = {
          autoRequest,
          enableOptimize,
          enableGroup,
          parseAis,
        };

        Object.keys(options).forEach((key) => {
          if (options[key]) {
            commonConfig[key] = stringToBool(options[key]);
          }
        });

        params = {
          ...params,
          schemaId: params?.schemaId || '',
          config: filterData({
            ...params.config,
            outputAddr,
            commonConfig,
            httpConfig,
            hostConfig: mode === DeviceMode.TCP ? params?.config?.hostConfig : undefined,
          }),
        };
      }

      if (deviceId) {
        await putDevicesUpdate({ ...params, uuid: deviceId });
        message.success('更新成功');
      } else {
        const { msg } = await postDevicesCreate(params);

        if (msg === 'Success') {
          message.success('创建成功');
          setActiveGroupKey(groupId ? groupId : 'DROOT');
        } else {
          const info = `创建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：${msg}`;
          message.warning(info);
        }
      }
      history.push(DefaultListUrl);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(DefaultListUrl);
      return false;
    }
  };

  const handleOnUpdateValue = ({ config, type }: any) => {
    let httpConfig = config.httpConfig;
    let commonConfig = config?.commonConfig;

    if (type === DeviceType.GENERIC_HTTP_DEVICE) {
      httpConfig = {
        ...httpConfig,
        headers: formatHeaders2Arr(config?.httpConfig?.headers),
      };
    }

    if (commonConfig) {
      const { autoRequest, enableOptimize, enableGroup, parseAis } = commonConfig;
      const options = {
        autoRequest,
        enableOptimize,
        enableGroup,
        parseAis,
      };

      Object.keys(options).forEach((key) => {
        if (options[key] !== undefined) {
          commonConfig[key] = options[key].toString();
        }
      });
    }

    return filterData({
      ...config,
      httpConfig,
      commonConfig,
    });
  };

  const handleOnReset = () => {
    if (deviceId && detail) {
      formRef.current?.setFieldsValue({
        ...detail,
        schemaId: detail?.schemaId || undefined,
        config: handleOnUpdateValue(detail),
      });
    } else {
      formRef.current?.setFieldsValue(initialValues);
    }
  };

  const handleOnValuesChange = (changedValue: any) => {
    const type = changedValue?.type;
    const model = changedValue?.config?.commonConfig?.model;
    const outputMode = changedValue?.config?.outputMode;
    const inputMode = changedValue?.config?.inputMode;

    if (type) {
      formRef.current?.setFieldsValue({
        config: defaultConfig[changedValue?.type],
      });
    }
    if (model) {
      formRef.current?.setFieldsValue({
        config: defaultModelConfig[model],
      });
    }
    if (outputMode) {
      formRef.current?.setFieldsValue({
        config: {
          ...defaultOutputConfig[outputMode],
        },
      });
    }
    if (inputMode) {
      formRef.current?.setFieldsValue({
        config:
          inputMode === detail?.config?.inputMode
            ? { inputAddr: detail?.config?.inputAddr }
            : defaultInputModeConfig[inputMode],
      });
    }
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer showExtra title={deviceId ? '编辑设备' : '新建设备'} backUrl={DefaultListUrl}>
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        columns={columns as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={handleOnReset}
        onValuesChange={handleOnValuesChange}
        rootClassName="device-form"
      />
    </PageContainer>
  );
};

export default UpdateForm;
