import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getOutendsDetail,
  postOutendsCreate,
  putOutendsUpdate,
} from '@/services/rulex/shuchuziyuanguanli';
import { formatHeaders2Arr, formatHeaders2Obj } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns, defaultConfig } from '../columns';

export type UpdateFormItem = {
  name: string;
  type: string;
  config: Record<string, any>[];
};

const DefaultListUrl = '/outends/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { data: detail } = useRequest(() => getOutendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);

    try {
      // const formatConfig = values?.config?.[0];
      let params = {
        ...values,
        // config: formatConfig,
      };

      if (params.type === 'HTTP') {
        params = {
          ...params,
          config: {
            ...params.config,
            headers: formatHeaders2Obj(params.config?.headers),
          },
        };
      }

      if (uuid) {
        await putOutendsUpdate({ ...params, uuid });
        message.success('更新成功');
      } else {
        const { msg } = await postOutendsCreate(params);
        if (msg === 'Success') {
          message.success('创建成功');
        } else {
          message.warning(`创建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：${msg}`);
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
      if (detail?.type === 'HTTP') {
        formRef.current?.setFieldsValue({
          ...detail,
          config: { ...detail?.config, headers: formatHeaders2Arr(detail?.config?.headers) },
        });
      } else {
        formRef.current?.setFieldsValue(detail);
      }
    } else {
      formRef.current?.setFieldsValue({
        type: 'MONGO_SINGLE',
        config: defaultConfig['MONGO_SINGLE'],
      });
    }
  };

  const handleOnValuesChange = (changedValue: UpdateFormItem) => {
    if (!changedValue?.type) return;
    let config: any = [];

    if (changedValue?.type === 'MQTT') {
      config = {
        ...defaultConfig['MQTT'],
        clientId: `eekit${randomNumber}`,
        pubTopic: `eekit${randomNumber}`,
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
    <PageContainer showExtra title={uuid ? '编辑资源' : '新建资源'} backUrl={DefaultListUrl}>
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        onValuesChange={handleOnValuesChange}
        columns={columns as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={handleOnReset}
      />
    </PageContainer>
  );
};

export default UpdateForm;
