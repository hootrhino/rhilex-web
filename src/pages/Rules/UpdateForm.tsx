import { useRef, useState } from 'react';

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
import { useRequest } from 'umi';

import { getDevices } from '@/services/rulex/shebeiguanli';
import { getInends } from '@/services/rulex/shuruziyuanguanli';

import FormFooter from '@/components/FromFooter';
import FullScreenEditor from '@/components/FullScreenEditor';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { postRules } from '@/services/rulex/guizeguanli';
import omit from 'lodash/omit';

export type FormItem = {
  actions: string;
  description: string;
  failed: string;
  fromSource: string[];
  fromDevice: string[];
  name: string;
  success: string;
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

  const [sources, setSources] = useState([]);

  // 输入资源列表
  const getSourceList = useRequest(() => getInends(), {
    formatResult: (res: any) => res?.data,
    onSuccess: (data) => {
      const options = data?.map((item: any) => ({ label: item?.name, value: item?.uuid }));
      setSources(options);
    },
  });

  // 设备列表
  const getDeviceList = useRequest(() => getDevices(), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      const options = data?.map((item: any) => ({ label: item?.name, value: item?.uuid }));
      setSources(options);
    },
  });

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = omit(values, ['type']);
      params = {
        ...params,
        fromSource: params?.fromSource ? [params?.fromSource] : [],
        fromDevice: params?.fromDevice ? [params?.fromDevice] : [],
      };

      if (id) {
        // TODO 编辑
        // await putInends({ ...values, uuid: id });
        // message.success('更新成功');
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
            initialValues={{
              actions: defaultActions,
              success: defaultSuccess,
              failed: defaultFailed,
              type: 'fromSource',
            }}
            onValuesChange={(changedValue) => {
              if (changedValue?.type === 'fromSource') {
                getSourceList?.run();
              } else if (changedValue?.type === 'fromDevice') {
                getDeviceList?.run();
              }
            }}
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
              name="type"
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
            <ProFormDependency name={['type']}>
              {({ type }) => {
                if (type === 'fromSource') {
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
                      options={sources}
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
