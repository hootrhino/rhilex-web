import CodeEditor, { Lang } from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import RuleExample from '@/components/RuleExample';
import {
  getRulesDetail,
  postRulesCreate,
  postRulesFormatLua,
  putRulesUpdate,
} from '@/services/rhilex/guizeguanli';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { FooterToolbar, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import type { Rule } from 'antd/es/form';
import { useEffect, useRef, useState } from 'react';
import { DefaultFailed, DefaultSuccess, initialValue } from '../initialValues';

export type FormParams = {
  name: string;
  description: string;
  actions: string;
  success: string;
  failed: string;
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId, deviceId, inendId, groupId } = useParams();
  const { formatMessage } = useIntl();

  const [loading, setLoading] = useState<boolean>(false);

  const getBackUrl = () => {
    if (groupId && deviceId) {
      return `/device/${groupId}/${deviceId}/rule`;
    } else {
      return `/inend/${inendId}/rule`;
    }
  };

  // 获取详情
  const { data: detail } = useRequest(() => getRulesDetail({ uuid: ruleId || '' }), {
    ready: !!ruleId,
    refreshDeps: [ruleId],
  });

  // 代码格式化
  const handleOnFormatCode = async () => {
    const code = formRef.current?.getFieldValue('actions');
    const { data } = await postRulesFormatLua({ source: code });

    formRef.current?.setFieldsValue({ actions: data.source });
  };

  // 新建&更新规则表单
  const handleOnFinish = async (values: FormParams) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        fromSource: inendId ? [inendId] : [],
        fromDevice: deviceId ? [deviceId] : [],
        success: DefaultSuccess,
        failed: DefaultFailed,
      };

      if (ruleId) {
        await putRulesUpdate({ ...params, uuid: ruleId });
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        await postRulesCreate(params);
        message.success(formatMessage({ id: 'message.success.new' }));
      }
      history.push(getBackUrl());
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
      showExtra
      title={formatMessage({ id: `ruleConfig.title.${ruleId ? 'edit' : 'new'}` })}
      backUrl={getBackUrl()}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          submitter={{
            render: ({ reset, submit }) => (
              <FooterToolbar>
                <Popconfirm
                  key="reset"
                  title={formatMessage({ id: 'ruleConfig.popconfirm.title.reset' })}
                  onConfirm={() => {
                    reset();
                    formRef.current?.setFieldsValue(detail ? detail : initialValue);
                  }}
                >
                  <Button>{formatMessage({ id: 'button.reset' })}</Button>
                </Popconfirm>

                <Button key="submit" type="primary" onClick={submit} loading={loading}>
                  {formatMessage({ id: 'button.submit' })}
                </Button>
              </FooterToolbar>
            ),
          }}
          onFinish={handleOnFinish}
        >
          <ProForm.Group>
            <ProFormText
              label={formatMessage({ id: 'form.title.name' })}
              name="name"
              placeholder={formatMessage({ id: 'form.placeholder.name' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'form.placeholder.name' }),
                },
                {
                  validator: (_rule: Rule, value: string) =>
                    validateFormItem(value, FormItemType.NAME),
                },
              ]}
              width="lg"
            />
            <ProFormText
              label={formatMessage({ id: 'table.title.desc' })}
              name="description"
              width="lg"
              placeholder={formatMessage({ id: 'form.placeholder.desc' })}
            />
          </ProForm.Group>
          <ProForm.Item
            rootClassName="rule-label"
            label={
              <RuleExample
                name={formatMessage({ id: 'ruleConfig.form.title.actions' })}
                handleOnFormatCode={handleOnFormatCode}
              />
            }
            name="actions"
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.input' },
                  { text: formatMessage({ id: 'ruleConfig.form.title.actions' }) },
                ),
              },
            ]}
          >
            <CodeEditor key="actions" minHeight="400px" lang={Lang.LUA} />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
