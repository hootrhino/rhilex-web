import { message } from '@/components/PopupHack';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rulex/shebeiguanli';
import { formatHeaders2Arr, formatHeaders2Obj, processColumns } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ProCard, ProFormProps } from '@ant-design/pro-components';
import { history, useModel, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../columns';
import { defaultConfig, defaultInputModeConfig, defaultModelConfig, defaultOutputConfig } from './initialValues';
import CryptoJS from 'crypto-js';

import PageContainer from '@/components/PageContainer';
import './index.less';

const DefaultListUrl = '/device/list';

const UpdateForm = ({}: ProFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { deviceId, groupId } = useParams();
  const { setActiveGroupKey } = useModel('useDevice');
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    type: 'GENERIC_PROTOCOL',
    gid: groupId,
    config: defaultConfig['GENERIC_PROTOCOL'],
  };

  // 设备详情
  const { data: detail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = { ...values };
      const type = params.type;
      const mode = params.config.commonConfig?.mode;
      const outputMode = params?.config?.outputMode;
      const inputAddr = params?.config?.inputAddr;
      // const inputMode = params.config?.inputMode;

      if (type !== 'GENERIC_CAMERA') {
        params = {
          ...params,
          schemaId: params?.schemaId || '',
        };
      }

      if (outputMode !== 'REMOTE_STREAM_SERVER') {
        const hash = inputAddr && CryptoJS.MD5(inputAddr).toString();
        params = {
          ...params,
          config: {
            ...params.config,
            outputAddr: `http://${window?.location?.hostname}:9400/jpeg_stream/push?liveId=${hash}`,
          },
        };
      }

      // if (inputMode && Object.keys(inputModeEnum).includes(inputMode)) {
      //   if (inputMode === 'RTSP') {
      //     params = {
      //       ...params,
      //       config: {
      //         ...params?.config,
      //         device: '',
      //       },
      //     };
      //   } else {
      //     params = {
      //       ...params,
      //       config: {
      //         ...params?.config,
      //         rtspUrl: '',
      //       },
      //     };
      //   }
      // }

      if (mode === 'TCP') {
        const hostConfigParams = params?.config?.hostConfig;
        params = {
          ...params,
          config: {
            ...params?.config,
            hostConfig: hostConfigParams,
          },
        };
      }

      if (type === 'GENERIC_HTTP_DEVICE') {
        const httpConfig = params?.config?.httpConfig;
        const newHeaders =
          httpConfig?.headers?.length > 0 ? formatHeaders2Obj(httpConfig?.headers) : {};

        params = {
          ...params,
          config: {
            ...params?.config,
            httpConfig: {
              ...httpConfig,
              headers: newHeaders,
            },
          },
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
    let newConfig = {
      ...config,
    };

    if (type === 'GENERIC_HTTP_DEVICE') {
      newConfig = {
        ...config,
        httpConfig: {
          ...newConfig.httpConfig,
          headers: formatHeaders2Arr(newConfig?.httpConfig?.headers),
        },
      };
    }

    return newConfig;
  };

  const handleOnReset = () => {
    if (deviceId && detail) {
      formRef.current?.setFieldsValue({ ...detail, config: handleOnUpdateValue(detail) });
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
        config: inputMode === detail?.config?.inputMode ? {inputAddr: detail?.config?.inputAddr} : defaultInputModeConfig[inputMode]
      });
    }
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer showExtra title={deviceId ? '编辑设备' : '新建设备'} backUrl={DefaultListUrl}>
      <ProCard>
        <BetaSchemaForm
          layoutType="Form"
          formRef={formRef}
          columns={processColumns(columns)}
          onFinish={handleOnFinish}
          onValuesChange={handleOnValuesChange}
          rootClassName="device-form"
          submitter={{
            render: ({ reset, submit }) => (
              <ProFormSubmitter
                handleOnSubmit={submit}
                handleOnReset={() => {
                  reset();
                  handleOnReset();
                }}
                loading={loading}
              />
            ),
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
