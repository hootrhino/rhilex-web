import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import ProCodeEditor from '@/components/ProCodeEditor';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import { getAppDetail, postAppCreate, putAppUpdate } from '@/services/rulex/qingliangyingyong';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
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
              <ProCodeEditor
                label={formatMessage({ id: 'appStack.table.title.luaSource' })}
                name="luaSource"
                ref={formRef}
                required
                className="w-full"
              />
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
