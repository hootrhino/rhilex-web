import { useEffect, useRef, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import { message } from '@/components/PopupHack';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import useGoBack from '@/hooks/useGoBack';
import {
  getInendsDetail,
  postInendsCreate,
  putInendsUpdate,
} from '@/services/rulex/shuruziyuanguanli';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, PageContainer, ProCard } from '@ant-design/pro-components';
import { columns, defaultConfig } from './columns';
import type { InendsItem } from '.';

const DefaultListUrl = '/inends/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const defaultValue = { type: 'COAP', config: defaultConfig['COAP'] };

  // 获取详情
  const { data: detail } = useRequest(() => getInendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  // 新建&编辑
  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        config: values?.config?.[0],
      };
      if (uuid) {
        await putInendsUpdate({ ...params, uuid });
        message.success('更新成功');
      } else {
        const { msg } = await postInendsCreate(params);
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

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, config: [detail?.config] });
    } else {
      formRef.current?.setFieldsValue(defaultValue);
    }
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      header={{ title: uuid ? '编辑资源' : '新建资源' }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProCard>
        <BetaSchemaForm
          layoutType="Form"
          formRef={formRef}
          columns={columns as ProFormColumnsType<InendsItem>[]}
          onFinish={handleOnFinish}
          onValuesChange={(changedValue) => {
            if (!changedValue?.type) return;

            let config;
            if (changedValue?.type === 'GENERIC_IOT_HUB') {
              config = defaultConfig['GENERIC_IOT_HUB']?.map((item) => ({
                ...item,
                productId: `eekit${randomNumber}`,
                deviceName: `eekit${randomNumber}`,
                clientId: `eekit${randomNumber}`,
              }));
            } else {
              config = defaultConfig[changedValue?.type];
            }

            formRef.current?.setFieldsValue({
              config: changedValue?.type === detail?.type ? [detail?.config] : config,
            });
          }}
          submitter={{
            render: ({ reset, submit }) => (
              <ProFormSubmitter
                handleOnSubmit={submit}
                handleOnReset={() => {
                  reset();
                  formRef.current?.setFieldsValue(
                    uuid ? { ...detail, config: [detail?.config] } : defaultValue,
                  );
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
