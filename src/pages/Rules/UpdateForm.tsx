import { useEffect, useRef } from 'react';

import { history, useParams } from 'umi';

import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel, useRequest } from 'umi';

import FormFooter from '@/components/FromFooter';
import FullScreenEditor from '@/components/FullScreenEditor';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import omit from 'lodash/omit';

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

const defaultActions = `Actions = {
  function(data)
    --rulexlib:log(data)
    return true, data
  end
}`;
const defaultSuccess = `function Success()
--rulexlib:log("success")
end`;
const defaultFailed = `function Failed(error)
  rulexlib:log(error)
end`;

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const failRef = useRef(null);
  const actionRef = useRef(null);
  const successRef = useRef(null);
  const { showModal } = useGoBack();

  const { data: sources, run: getSources } = useModel('useSource');
  const { data: devices, run: getDevices } = useModel('useDevice');

  // 获取详情
  const { run: getDetail } = useRequest((uuid: string) => getRulesDetail({ uuid: uuid || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      let params = {};

      if (data?.fromDevice?.length > 0) {
        params = {
          sourceType: 'fromDevice',
          fromDevice: data?.fromDevice?.[0],
        };
      } else {
        params = {
          sourceType: 'fromSource',
          fromSource: data?.fromSource?.[0],
        };
      }
      formRef.current?.setFieldsValue({ ...data, ...params });
    },
  });

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = omit(values, ['sourceType']);
      params = {
        ...params,
        fromSource: params?.fromSource ? [params?.fromSource] : [],
        fromDevice: params?.fromDevice ? [params?.fromDevice] : [],
      };

      if (id) {
        await putRules({ ...(params as FormItem), uuid: id });
        message.success('更新成功');
      } else {
        await postRules(params as FormItem);
        message.success('新建成功');
      }

      history.push('/rules/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      formRef.current?.setFieldsValue({
        actions: defaultActions,
        success: defaultSuccess,
        failed: defaultFailed,
        sourceType: 'fromSource',
      });
    }
  }, [id]);

  useEffect(() => {
    getSources();
    getDevices();
  }, []);

  return (
    <>
      <PageContainer
        header={{ title: id ? '编辑规则' : '新建规则' }}
        onBack={() => showModal({ url: '/rules/list' })}
      >
        <ProCard>
          <ProForm
            formRef={formRef}
            submitter={{
              render: ({ reset, submit }) => {
                return <FormFooter onReset={reset} onSubmit={submit} />;
              },
            }}
            onFinish={onFinish}
          >
            <ProFormText
              label="规则名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '规则名称为必填项',
                },
              ]}
            />
            <ProFormRadio.Group
              name="sourceType"
              label="数据来源"
              options={[
                {
                  label: '输入资源',
                  value: 'fromSource',
                },
                {
                  label: '设备',
                  value: 'fromDevice',
                },
              ]}
            />
            <ProFormDependency name={['sourceType']}>
              {({ sourceType }) => {
                if (sourceType === 'fromSource') {
                  return (
                    <ProFormSelect
                      label="输入资源"
                      name="fromSource"
                      options={sources}
                      placeholder="请选择数据源"
                      rules={[{ required: true, message: '请选择数据源' }]}
                    />
                  );
                } else {
                  return (
                    <ProFormSelect
                      label="输入资源"
                      name="fromDevice"
                      options={devices}
                      placeholder="请选择数据源"
                      rules={[{ required: true, message: '请选择数据源' }]}
                    />
                  );
                }
              }}
            </ProFormDependency>
            <ProForm.Item
              label="规则回调"
              name="actions"
              rules={[{ required: true, message: '请输入规则回调' }]}
            >
              <FullScreenEditor defaultValue={defaultActions} ref={actionRef} />
            </ProForm.Item>
            <ProForm.Item
              label="成功回调"
              name="success"
              rules={[{ required: true, message: '请输入成功回调' }]}
            >
              <FullScreenEditor defaultValue={defaultSuccess} ref={successRef} />
            </ProForm.Item>
            <ProForm.Item
              label="失败回调"
              name="failed"
              rules={[{ required: true, message: '请输入失败回调' }]}
            >
              <FullScreenEditor defaultValue={defaultFailed} ref={failRef} />
            </ProForm.Item>
            <ProFormTextArea label="备注信息" name="description" />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
