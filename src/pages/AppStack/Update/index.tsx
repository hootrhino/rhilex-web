import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import ProLuaEditor from '@/components/ProLuaEditor';
import PageContainer from '@/components/ProPageContainer';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import { getAppDetail, postAppCreate, putAppUpdate } from '@/services/rhilex/qingliangyingyong';
import { APP_LIST } from '@/utils/constant';
import { generateRandomId } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { AppStackItem } from '..';
import { baseColumns } from '../columns';

const defaultValue = {
  name: `APP_${generateRandomId()}`,
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

  const columns = [
    {
      valueType: 'group',
      columns: baseColumns,
    },
    {
      dataIndex: 'luaSource',
      hideInForm: !uuid,
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage(
              { id: 'placeholder.input' },
              { text: formatMessage({ id: 'ruleConfig.form.title.actions' }) },
            ),
          },
        ],
      },
      renderFormItem: () => (
        <ProLuaEditor
          label={formatMessage({ id: 'appStack.table.title.luaSource' })}
          minHeight="400px"
        />
      ),
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
      history.push(APP_LIST);
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
      title={formatMessage({ id: `appStack.title.${uuid ? 'update' : 'new'}` })}
      backUrl={APP_LIST}
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
