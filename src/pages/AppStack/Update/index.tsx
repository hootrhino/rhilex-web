import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import { getAppDetail, postAppCreate, putAppUpdate } from '@/services/rulex/qingliangyingyong';
import { processColumns } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ProCard } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { AppStackItem } from '..';
import { baseColumns } from '../columns';

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
  const formRef = useRef<ProFormInstance>();
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
                label="Lua 源码"
                name="luaSource"
                ref={formRef}
                required
                style={{ width: '100%' }}
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
        message.success('更新成功');
      } else {
        await postAppCreate(params);
        message.success('新建成功');
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
    <PageContainer showExtra title={uuid ? '更新应用' : '新建应用'} backUrl={DefaultListUrl}>
      <ProCard>
        <BetaSchemaForm
          layoutType="Form"
          formRef={formRef}
          columns={processColumns(columns) as ProFormColumnsType<AppStackItem>[]}
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
        />
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
