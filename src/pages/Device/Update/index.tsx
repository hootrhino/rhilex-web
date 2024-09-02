import { message } from '@/components/PopupHack';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rhilex/shebeiguanli';
import { formatHeaders2Arr, formatHeaders2Obj, stringToBool } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useModel, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../Columns';
import { defaultConfig, defaultModelConfig } from './initialValues';

import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import { defaultDeviceType, DeviceMode, DeviceType } from '../enum';

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
  const { product } = useModel('useSystem');
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const defaultType = defaultDeviceType[product];

  const initialValues = {
    type: defaultType,
    gid: groupId,
    config: defaultConfig[defaultType],
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
      // let outputAddr = params?.config?.outputAddr;

      const { autoRequest, enableOptimize, enableGroup, mode, parseAis, autoScan, batchRequest } =
        commonConfig;
      const type = params.type;
      // const outputMode = params?.config?.outputMode;

      // if (type === DeviceType.GENERIC_CAMERA) {
      //   outputAddr =
      //     outputMode === OutputMode.REMOTE_STREAM_SERVER
      //       ? outputAddr
      //       : getPlayAddress(params?.name, outputMode, 'push');
      // }
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
        autoScan,
        batchRequest,
      };

      Object.keys(options).forEach((key) => {
        if (options[key]) {
          commonConfig[key] = stringToBool(options[key]);
        }
      });

      params = {
        ...params,
        config: filterData({
          ...params.config,
          // outputAddr,
          commonConfig,
          httpConfig,
          hostConfig: mode === DeviceMode.TCP ? params?.config?.hostConfig : undefined,
        }),
      };

      if (deviceId) {
        await putDevicesUpdate({ ...params, uuid: deviceId });
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        const { msg } = await postDevicesCreate(params);

        if (msg === 'Success') {
          message.success(formatMessage({ id: 'message.success.new' }));
        } else {
          const info = formatMessage({ id: 'device.message.error.new' }, { msg: msg });
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
      const { autoRequest, enableOptimize, enableGroup, parseAis, autoScan, batchRequest } =
        commonConfig;
      const options = {
        autoRequest,
        enableOptimize,
        enableGroup,
        parseAis,
        autoScan,
        batchRequest,
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
        config: handleOnUpdateValue(detail),
      });
    } else {
      formRef.current?.setFieldsValue(initialValues);
    }
  };

  const handleOnValuesChange = (changedValue: any) => {
    const type = changedValue?.type;
    const model = changedValue?.config?.commonConfig?.model;
    //  const outputMode = changedValue?.config?.outputMode;
    // const inputMode = changedValue?.config?.inputMode;

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

    // if (outputMode) {
    //   formRef.current?.setFieldsValue({
    //     config: {
    //       ...defaultOutputConfig[outputMode],
    //     },
    //   });
    // }
    // if (inputMode) {
    //   formRef.current?.setFieldsValue({
    //     config:
    //       inputMode === detail?.config?.inputMode
    //         ? { inputAddr: detail?.config?.inputAddr }
    //         : defaultInputModeConfig[inputMode],
    //   });
    // }
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      showExtra
      title={
        deviceId
          ? formatMessage({ id: 'device.title.update' })
          : formatMessage({ id: 'device.title.new' })
      }
      backUrl={DefaultListUrl}
    >
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        columns={columns(product) as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={handleOnReset}
        onValuesChange={handleOnValuesChange}
        rootClassName="device-form"
      />
    </PageContainer>
  );
};

export default UpdateForm;
