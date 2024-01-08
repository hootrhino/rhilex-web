import {
  getOutendsDetail,
  postOutendsCreate,
  putOutendsUpdate,
} from '@/services/rulex/shuchuziyuanguanli';

import Title from '@/components/FormTitle';
import { message } from '@/components/PopupHack';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import useGoBack from '@/hooks/useGoBack';
import { formatHeaders2Arr, formatHeaders2Obj, processColumns } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, PageContainer, ProCard } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import type { OutendsItem } from '..';
import { columns, defaultConfig } from '../columns';

type UpdateFormItem = {
  name: string;
  type: string;
  config: Record<string, any>[];
};

const DefaultListUrl = '/outends/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const { showModal } = useGoBack();
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { data: detail } = useRequest(() => getOutendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);

    try {
      const formatConfig = values?.config?.[0];
      let params = {
        ...values,
        config: formatConfig,
      };

      if (params.type === 'HTTP') {
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
          config: [{ ...detail?.config, headers: formatHeaders2Arr(detail?.config?.headers) }],
        });
      } else {
        formRef.current?.setFieldsValue({
          ...detail,
          config: [detail?.config],
        });
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
      config = defaultConfig['MQTT']?.map((item) => ({
        ...item,
        clientId: `eekit${randomNumber}`,
        pubTopic: `eekit${randomNumber}`,
      }));
    } else {
      config = defaultConfig[changedValue?.type];
    }

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? [detail?.config] : config,
    });
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      header={{ title: <Title title={uuid ? '编辑资源' : '新建资源'} /> }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProCard>
        <BetaSchemaForm
          layoutType="Form"
          formRef={formRef}
          columns={processColumns(columns) as ProFormColumnsType<OutendsItem>[]}
          onFinish={handleOnFinish}
          onValuesChange={handleOnValuesChange}
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
