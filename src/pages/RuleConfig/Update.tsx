import { useEffect, useRef, useState } from 'react';
import { history, useParams } from 'umi';

import { DefaultActions, DefaultFailed, DefaultSuccess } from '@/components/LuaEditor/constant';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRulesCreate, putRulesUpdate } from '@/services/rulex/guizeguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from 'umi';
import { RuleType } from '.';

type FormParams = {
  name: string;
  description: string;
  actions: string;
  success: string;
  failed: string;
};

type UpdateFormProps = {
  type: RuleType;
  typeId: string;
};

const initialValue = {
  actions: DefaultActions,
  success: DefaultSuccess,
  failed: DefaultFailed,
  name: '',
};

const UpdateForm = ({ type, typeId }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId, groupId } = useParams();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);
  const DefaultListUrl = groupId ? `/${type}/${groupId}/${typeId}/rule` : `/${type}/${typeId}/rule`;

  // 获取详情
  const { data: detail } = useRequest(() => getRulesDetail({ uuid: ruleId || '' }), {
    ready: !!ruleId,
  });

  const handleOnFinish = async (values: FormParams) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        fromSource: type === 'inends' ? [typeId] : [],
        fromDevice: type === 'device' ? [typeId] : [],
        success: DefaultSuccess,
        failed: DefaultFailed,
      };

      if (ruleId) {
        await putRulesUpdate({ ...params, uuid: ruleId });
        message.success('更新成功');
      } else {
        await postRulesCreate(params);
        message.success('新建成功');
      }
      history.push(DefaultListUrl);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    formRef.current?.setFieldsValue(detail ? detail : initialValue);
  }, [detail]);

  return (
    <PageContainer
      header={{ title: ruleId ? '编辑规则' : '新建规则' }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          submitter={{
            render: ({ reset, submit }) => (
              <ProFormSubmitter
                handleOnSubmit={submit}
                handleOnReset={() => {
                  reset();
                  formRef.current?.setFieldsValue(detail ? detail : initialValue);
                }}
                loading={loading}
              />
            ),
          }}
          onFinish={handleOnFinish}
        >
          <ProForm.Group>
            <ProFormText
              label="规则名称"
              name="name"
              placeholder="请输入规则名称"
              rules={[
                {
                  required: true,
                  message: '请输入规则名称',
                },
              ]}
              width="lg"
            />
            <ProFormText label="备注" name="description" width="lg" placeholder="请输入备注" />
          </ProForm.Group>
          <ProCodeEditor label="规则回调" name="actions" ref={formRef} required />
          {/* <ProCodeEditor label="成功回调" name="success" ref={formRef} required defaultCollapsed />
          <ProCodeEditor label="失败回调" name="failed" ref={formRef} required defaultCollapsed /> */}
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
