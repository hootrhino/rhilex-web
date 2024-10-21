import { message } from '@/components/PopupHack';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rhilex/shebeiguanli';
import {
  formatHeaders2Arr,
  formatHeaders2Obj,
  generateRandomId,
  stringToBool,
} from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useModel, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../Columns';
import { defaultConfig, defaultModelConfig } from './initialValues';

import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import { DeviceMode, DeviceType } from '../enum';

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

const convertBooleanOrString = (config: Record<string, any>) => {
  const formatConfig = JSON.parse(JSON.stringify(config));
  let formatCommonConfig = { ...formatConfig.commonConfig };
  let formatHttpConfig = { ...formatConfig.httpConfig };

  const { autoRequest, enableOptimize, enableGroup, autoScan, batchRequest } = formatCommonConfig;

  const options = {
    autoRequest,
    enableOptimize,
    enableGroup,
    autoScan,
    batchRequest,
  };

  Object.keys(options).forEach((key) => {
    if (options[key] && typeof options[key] === 'string') {
      formatCommonConfig[key] = stringToBool(options[key]);
    }
    if (options[key] !== 'undefined' && typeof options[key] === 'boolean') {
      formatCommonConfig[key] = options[key].toString();
    }
  });

  if (
    formatHttpConfig &&
    formatHttpConfig.headers &&
    typeof formatHttpConfig.headers === 'object'
  ) {
    const formatHeaders =
      formatHttpConfig.headers.length >= 0
        ? formatHeaders2Obj(formatHttpConfig.headers)
        : formatHeaders2Arr(formatHttpConfig.headers);

    formatHttpConfig = {
      ...formatHttpConfig,
      headers: formatHeaders,
    };
  }

  return filterData({
    ...formatConfig,
    commonConfig: formatCommonConfig,
    httpConfig: formatHttpConfig,
    hostConfig: formatCommonConfig.mode === DeviceMode.TCP ? formatConfig?.hostConfig : undefined,
  });
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { deviceId, groupId } = useParams();
  const { formatMessage } = useIntl();
  const { isFreeTrial } = useModel('useCommon');

  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    type: DeviceType.GENERIC_UART_RW,
    gid: groupId,
    name: `DEVICE_${generateRandomId()}`,
    config: defaultConfig[DeviceType.GENERIC_UART_RW],
  };

  // 设备详情
  const { data: detail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        config: convertBooleanOrString(values.config),
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

  const handleOnReset = () => {
    if (deviceId && detail) {
      formRef.current?.setFieldsValue({
        ...detail,
        config: convertBooleanOrString(detail.config),
      });
    } else {
      formRef.current?.setFieldsValue(initialValues);
    }
  };

  const handleOnValuesChange = (changedValue: any) => {
    const type = changedValue?.type;
    const model = changedValue?.config?.commonConfig?.model;

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
        columns={columns(isFreeTrial) as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={handleOnReset}
        onValuesChange={handleOnValuesChange}
        rootClassName="device-form"
      />
    </PageContainer>
  );
};

export default UpdateForm;
