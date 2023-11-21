import { useEffect, useRef, useState } from 'react';
import { history, useParams } from 'umi';

import { DefaultActions, DefaultFailed, DefaultSuccess } from '@/components/LuaEditor/constant';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRulesCreate, putRulesUpdate } from '@/services/rulex/guizeguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRequest } from 'umi';
import { RuleType } from '.';

export type FormItem = {
  actions: string;
  description: string;
  failed: string;
  fromSource: string[];
  fromDevice: string[];
  name: string;
  success: string;
  uuid?: string;
};

type UpdateFormProps = {
  type: RuleType;
  typeId: string;
};

const UpdateForm = ({ type, typeId }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId, groupId } = useParams();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);
  const DefaultListUrl = groupId ? `/${type}/${groupId}/${typeId}/rule` : `/${type}/${typeId}/rule`;

  // 获取详情
  const { run: getDetail } = useRequest((uuid: string) => getRulesDetail({ uuid: uuid || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({ ...data });
    },
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        fromSource: type === 'inends' ? [typeId] : [],
        fromDevice: type === 'device' ? [typeId] : [],
      };

      if (ruleId) {
        await putRulesUpdate({ ...params, uuid: ruleId } as any);
        message.success('更新成功');
      } else {
        await postRulesCreate(params as any);
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
    if (ruleId) {
      getDetail(ruleId);
    } else {
      formRef.current?.setFieldsValue({
        actions: DefaultActions,
        success: DefaultSuccess,
        failed: DefaultFailed,
        name: '',
      });
    }
  }, [ruleId, typeId, type]);

  return (
    <PageContainer
      header={{ title: ruleId ? '编辑规则' : '新建规则' }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          submitter={{
            render: ({ reset, submit }) => {
              return (
                <FooterToolbar>
                  <Popconfirm
                    key="reset"
                    title="重置可能会丢失数据，确定要重置吗？"
                    onConfirm={reset}
                  >
                    <Button>重置</Button>
                  </Popconfirm>

                  <Button key="submit" type="primary" onClick={submit} loading={loading}>
                    提交
                  </Button>
                </FooterToolbar>
              );
            },
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
          <ProCodeEditor label="成功回调" name="success" ref={formRef} required defaultCollapsed />
          <ProCodeEditor label="失败回调" name="failed" ref={formRef} required defaultCollapsed />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
