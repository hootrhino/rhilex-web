import { message } from '@/components/PopupHack';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rhilex/shebeiguanli';
import { convertConfig, filterUndefined, formatHeaders, generateRandomId } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useModel, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../Columns';
import {
  defaultConfig,
  defaultHostConfig,
  defaultModelSlot,
  defaultUartConfig,
} from './initialValues';

import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import { DEVICE_LIST } from '@/utils/constant';
import { DeviceMode, DeviceType } from '../enum';

const convertBooleanOrString = (config: Record<string, any>) => {
  const formatConfig = JSON.parse(JSON.stringify(config));

  const formatData = {
    ...formatConfig,
    commonConfig: convertConfig(formatConfig?.commonConfig),
    cellaConfig: convertConfig(formatConfig?.cellaConfig),
    gpsConfig: convertConfig(formatConfig?.gpsConfig),
    httpConfig: {
      ...formatConfig?.httpConfig,
      headers: formatHeaders(formatConfig?.httpConfig?.headers),
    },
  };

  return filterUndefined(formatData);
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

      history.push(DEVICE_LIST);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(DEVICE_LIST);
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
    const model = changedValue?.config?.s1200Config?.model;
    const mode = changedValue?.config?.commonConfig?.mode;

    if (type) {
      formRef.current?.setFieldsValue({
        config:
          type === detail?.type
            ? detail?.config && convertBooleanOrString(detail?.config)
            : defaultConfig[changedValue?.type],
      });
    }
    if (model) {
      formRef.current?.setFieldsValue({
        config: { s1200Config: { slot: defaultModelSlot[model] } },
      });
    }
    if (mode) {
      formRef.current?.setFieldsValue({
        config:
          mode === DeviceMode.TCP
            ? { hostConfig: detail?.config.hostConfig || defaultHostConfig }
            : { uartConfig: detail?.config.uartConfig || defaultUartConfig },
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
      title={formatMessage({ id: `device.title.${deviceId ? 'update' : 'new'}` })}
      backUrl={DEVICE_LIST}
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
