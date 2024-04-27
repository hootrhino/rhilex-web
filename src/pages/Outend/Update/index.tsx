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
import { OutendType } from '../enum';

export type UpdateFormItem = {
  name: string;
  type: string;
  config: Record<string, any>[];
};

const DefaultListUrl = '/outend/list';

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
      let params = {
        ...values,
      };

      if (params.type === OutendType.HTTP) {
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

  const handleOnReset = () => {
    if (detail) {
      if (detail?.type === OutendType.HTTP) {
        formRef.current?.setFieldsValue({
          ...detail,
          config: { ...detail?.config, headers: formatHeaders2Arr(detail?.config?.headers) },
        });
      } else {
        formRef.current?.setFieldsValue(detail);
      }
    } else {
      formRef.current?.setFieldsValue({
        type: OutendType.MONGO_SINGLE,
        config: defaultConfig[OutendType.MONGO_SINGLE],
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
