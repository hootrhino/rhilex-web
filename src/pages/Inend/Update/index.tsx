import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getInendsDetail,
  postInendsCreate,
  putInendsUpdate,
} from '@/services/rulex/shuruziyuanguanli';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns, defaultConfig } from '../columns';
import { InendType } from '../enum';

const DefaultListUrl = '/inend/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const defaultValue = { type: InendType.COAP, config: defaultConfig[InendType.COAP] };

  // 获取详情
  const { data: detail } = useRequest(() => getInendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  // 新建&编辑
  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = {
        ...values,
      };
      if (params.type === InendType.GENERIC_MQTT) {
        const newSubTopics = params?.config?.subTopics?.map(({ k }: { k: string }) => k);

        params = {
          ...params,
          config: {
            ...params.config,
            subTopics: newSubTopics,
          },
        };
      }

      if (uuid) {
        await putInendsUpdate({ ...params, uuid });
        message.success('更新成功');
      } else {
        const { msg } = await postInendsCreate(params);
        if (msg === 'Success') {
          message.success('新建成功');
        } else {
          message.warning(`新建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：${msg}`);
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

  const formatDetailConfig = () => {
    const newConfig =
      detail?.type === InendType.GENERIC_MQTT
        ? {
            ...detail?.config,
            subTopics: detail?.config?.subTopics?.map((topic: string) => ({ k: topic })),
          }
        : detail?.config;

    return newConfig;
  };

  const handleOnValuesChange = (changedValue: any) => {
    if (!changedValue?.type) return;

    let config;
    if (changedValue?.type === InendType.GENERIC_IOT_HUB) {
      config = {
        ...defaultConfig[InendType.GENERIC_IOT_HUB],
        productId: `rhilex${randomNumber}`,
        deviceName: `rhilex${randomNumber}`,
        clientId: `rhilex${randomNumber}`,
      };
    } else if (changedValue?.type === InendType.GENERIC_MQTT) {
      config = {
        ...defaultConfig[InendType.GENERIC_MQTT],
        clientId: `rhilex${randomNumber}`,
      };
    } else {
      config = defaultConfig[changedValue?.type];
    }

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? formatDetailConfig() : config,
    });
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, config: formatDetailConfig() });
    } else {
      formRef.current?.setFieldsValue(defaultValue);
    }
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer showExtra title={uuid ? '编辑资源' : '新建资源'} backUrl={DefaultListUrl}>
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        onValuesChange={handleOnValuesChange}
        columns={columns as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={() =>
          formRef.current?.setFieldsValue(
            uuid ? { ...detail, config: formatDetailConfig() } : defaultValue,
          )
        }
      />
    </PageContainer>
  );
};

export default UpdateForm;
