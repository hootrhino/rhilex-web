import { message } from '@/components/PopupHack';

import ProCodeEditor from '@/components/ProCodeEditor';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import ProSegmented from '@/components/ProSegmented';
import useGoBack from '@/hooks/useGoBack';
import { getAppDetail, postAppCreate, putAppUpdate } from '@/services/rulex/qingliangyingyong';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';

const DefaultListUrl = '/app-stack/list';

const defaultValue = {
  name: '',
  version: '1.0.0',
  type: 'lua',
  autoStart: 'true',
  luaSource: '',
  description: '',
};

const UpdateForm = () => {
  const { uuid } = useParams();
  const { showModal } = useGoBack();
  const formRef = useRef<ProFormInstance>();
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { data: detail } = useRequest(() => getAppDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        type: 'lua',
      };
      if (uuid) {
        await putAppUpdate({ ...params, uuid });
        message.success('更新成功');
      } else {
        await postAppCreate(params);
        message.success('新建成功');
      }
      setLoading(false);
      history.push(DefaultListUrl);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue(detail);
    } else {
      formRef.current?.setFieldsValue(defaultValue);
    }
  }, [detail]);

  return (
    <PageContainer
      header={{ title: uuid ? '更新应用' : '新建应用' }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          onFinish={handleOnFinish}
          submitter={{
            render: ({ reset, submit }) => (
              <ProFormSubmitter
                handleOnSubmit={submit}
                handleOnReset={() => {
                  reset();
                  formRef.current?.setFieldsValue(
                    uuid ? { ...defaultValue, ...detail } : defaultValue,
                  );
                }}
                loading={loading}
              />
            ),
          }}
        >
          <ProForm.Group>
            <ProFormText
              label="APP 名称"
              name="name"
              width="md"
              placeholder="请输入 APP 名称"
              rules={[{ required: true, message: '请输入 APP 名称' }]}
            />
            <ProFormText
              label="APP 版本"
              name="version"
              width="md"
              placeholder="请输入 APP 版本"
              rules={[{ required: true, message: '请输入 APP 版本' }]}
            />
            <ProForm.Item
              label="是否自启"
              name="autoStart"
              required
              transform={(value: string) => ({ autoStart: Boolean(value) })}
              convertValue={(value: boolean) => value?.toString()}
            >
              <ProSegmented width="md" />
            </ProForm.Item>
            <ProFormText label="备注" name="description" width="md" placeholder="请输入备注" />
          </ProForm.Group>
          <ProFormDependency name={['type']}>
            {({ type }) => {
              if (type !== 'lua') return;
              return (
                uuid && <ProCodeEditor label="Lua 源码" name="luaSource" ref={formRef} required />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
