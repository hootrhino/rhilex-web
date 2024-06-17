import CodeEditor, { Lang } from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import RuleLabel from '@/components/RuleLabel';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import { postRulesFormatLua } from '@/services/rulex/guizeguanli';
import { getAppDetail, postAppCreate, putAppUpdate } from '@/services/rulex/qingliangyingyong';
import { ProForm, type ProFormColumnsType, type ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { AppStackItem } from '..';
import { baseColumns } from '../columns';

const DefaultListUrl = '/app/list';

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
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);

  // 代码格式化
  const handleOnFormatCode = async () => {
    const code = formRef.current?.getFieldValue('luaSource');
    const { data } = await postRulesFormatLua({ source: code });

    formRef.current?.setFieldsValue({ luaSource: data.source });
  };

  const columns = [
    {
      valueType: 'group',
      columns: baseColumns,
    },
    {
      valueType: 'dependency',
      name: ['type'],
      columns: ({ type }: any) => {
        if (type !== 'lua') return [];
        return [
          {
            title: '',
            dataIndex: 'luaSource',
            hideInForm: !uuid,
            renderFormItem: () => (
              <ProForm.Item
                name="luaSource"
                rootClassName="rule-label"
                label={
                  <RuleLabel
                    name={formatMessage({ id: 'appStack.table.title.luaSource' })}
                    handleOnFormatCode={handleOnFormatCode}
                  />
                }
                rules={[
                  {
                    required: true,
                    message: formatMessage(
                      { id: 'placeholder.input' },
                      { text: formatMessage({ id: 'ruleConfig.form.title.actions' }) },
                    ),
                  },
                ]}
                className="w-full"
              >
                <CodeEditor key="luaSource" minHeight="400px" lang={Lang.LUA} />
              </ProForm.Item>
            ),
          },
        ];
      },
    },
  ];

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
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        await postAppCreate(params);
        message.success(formatMessage({ id: 'message.success.new' }));
      }
      setLoading(false);
      history.push(DefaultListUrl);
      return true;
    } catch (error) {
      setLoading(false);
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

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      showExtra
      title={
        uuid
          ? formatMessage({ id: 'appStack.title.update' })
          : formatMessage({ id: 'appStack.title.new' })
      }
      backUrl={DefaultListUrl}
    >
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        columns={columns as ProFormColumnsType<AppStackItem>[]}
        loading={loading}
        handleOnReset={() =>
          formRef.current?.setFieldsValue(uuid ? { ...defaultValue, ...detail } : defaultValue)
        }
      />
    </PageContainer>
  );
};

export default UpdateForm;
