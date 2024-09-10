import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getOutendsDetail,
  postOutendsCreate,
  putOutendsUpdate,
} from '@/services/rhilex/shuchuziyuanguanli';
import { formatHeaders2Arr, formatHeaders2Obj, stringToBool } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../Columns';
import { OutendType } from '../enum';
import { defaultConfig } from './initialValues';

export type UpdateFormItem = {
  name: string;
  type: string;
  config: Record<string, any>[];
};

const DefaultListUrl = '/outend/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const { formatMessage } = useIntl();
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { data: detail } = useRequest(() => getOutendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);

    try {
      let params = {
        ...values,
      };
      let formatConfig = params.config;

      const { cacheOfflineData, allowPing } = formatConfig;

      const options = {
        cacheOfflineData,
        allowPing,
      };

      Object.keys(options).forEach((key) => {
        if (options[key]) {
          formatConfig[key] = stringToBool(options[key]);
        }
      });

      if (params.type === OutendType.HTTP) {
        params = {
          ...params,
          config: {
            ...formatConfig,
            headers: formatHeaders2Obj(formatConfig?.headers),
          },
        };
      }

      if (uuid) {
        await putOutendsUpdate({ ...params, uuid });
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        const { msg } = await postOutendsCreate(params);
        if (msg === 'Success') {
          message.success(formatMessage({ id: 'message.success.new' }));
        } else {
          message.warning(formatMessage({ id: 'outend.message.warning.new' }, { msg: msg }));
        }
      }
      setLoading(false);
      history.push(DefaultListUrl);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(DefaultListUrl);
      return false;
    }
  };

  const handleOnReset = () => {
    if (detail) {
      if (!detail.config) return;
      const formatConfig = detail.config;
      const { cacheOfflineData, allowPing } = formatConfig;
      const options = {
        cacheOfflineData,
        allowPing,
      };

      Object.keys(options).forEach((key) => {
        if (options[key] !== undefined) {
          formatConfig[key] = options[key].toString();
        }
      });
      if (detail?.type === OutendType.HTTP) {
        formRef.current?.setFieldsValue({
          ...detail,
          config: { ...formatConfig, headers: formatHeaders2Arr(formatConfig?.headers) },
        });
      } else {
        formRef.current?.setFieldsValue({ ...detail, config: formatConfig });
      }
    } else {
      formRef.current?.setFieldsValue({
        type: OutendType.MQTT,
        config: defaultConfig[OutendType.MQTT],
      });
    }
  };

  const handleOnValuesChange = (changedValue: UpdateFormItem) => {
    if (!changedValue?.type) return;
    let config: any = [];

    if (changedValue?.type === OutendType.MQTT) {
      config = {
        ...defaultConfig[OutendType.MQTT],
        clientId: `rhilex${randomNumber}`,
        pubTopic: `rhilex${randomNumber}`,
      };
    } else {
      config = defaultConfig[changedValue?.type];
    }

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? detail?.config : config,
    });
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      showExtra
      title={
        uuid
          ? formatMessage({ id: 'outend.title.edit' })
          : formatMessage({ id: 'outend.title.new' })
      }
      backUrl={DefaultListUrl}
    >
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        onValuesChange={handleOnValuesChange}
        columns={columns as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={handleOnReset}
        rootClassName="outend-form"
      />
    </PageContainer>
  );
};

export default UpdateForm;
