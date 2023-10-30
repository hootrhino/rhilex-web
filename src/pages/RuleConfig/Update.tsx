import { useEffect, useRef } from 'react';
import { history, useParams } from 'umi';

import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import omit from 'lodash/omit';
import { useModel, useRequest } from 'umi';
import { RuleType } from '.';
import ProCodeEditor from './ProCodeEditor';

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

const DefaultActions = `Actions = {
  function(args)
    -- rulexlib:Debug(args)
    return true, args
  end
}`;

const DefaultSuccess = `function Success()
--rulexlib:log("success")
end`;

const DefaultFailed = `function Failed(error)
rulexlib:log(error)
end`;

const UpdateForm = ({ type, typeId }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId } = useParams();
  const DefaultListUrl = `/${type}/${typeId}/rule`;

  const { showModal } = useGoBack();

  const { data: sources } = useModel('useSource');
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

  // 新建
  const { run: add, loading: addLoading } = useRequest((params) => postRules(params), {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      history.push(DefaultListUrl);
    },
  });

  // 编辑
  const { run: update, loading: updateLoading } = useRequest((params) => putRules(params), {
    manual: true,
    onSuccess: () => {
      message.success('更新成功');
      history.push(DefaultListUrl);
    },
  });

  const handleOnFinish = async (values: any) => {
    try {
      const params = {
        ...omit(values, ['sourceType']),
        fromSource: values?.fromSource ? [values?.fromSource] : [],
        fromDevice: values?.fromDevice ? [values?.fromDevice] : [],
      };

      if (ruleId) {
        update({ ...params, uuid: ruleId });
      } else {
        add(params);
      }

      return true;
    } catch (err) {
      message.error(err as any);
      return false;
    }
  };

  useEffect(() => {
    if (ruleId) {
      getDetail(ruleId);
    } else {
      const isInends = type === 'inends';

      formRef.current?.setFieldsValue({
        actions: DefaultActions,
        success: DefaultSuccess,
        failed: DefaultFailed,
        sourceType: isInends ? 'fromSource' : 'fromDevice',
        name: '',
        fromSource: isInends ? typeId : '',
        fromDevice: !isInends ? typeId : '',
      });
    }
  }, [ruleId, typeId, type]);

  useEffect(() => {
    // getSources();
    getDevices();
  }, []);

  return (
    <>
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

                    <Button
                      key="submit"
                      type="primary"
                      onClick={submit}
                      loading={addLoading || updateLoading}
                    >
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
                rules={[
                  {
                    required: true,
                    message: '规则名称为必填项',
                  },
                ]}
                width="xl"
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
                width="xl"
                disabled
              />
            </ProForm.Group>
            <ProForm.Group>
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
                        width="xl"
                        disabled
                      />
                    );
                  } else {
                    return (
                      <ProFormSelect
                        label="输入资源"
                        name="fromDevice"
                        options={devices}
                        disabled
                        placeholder="请选择数据源"
                        rules={[{ required: true, message: '请选择数据源' }]}
                        width="xl"
                      />
                    );
                  }
                }}
              </ProFormDependency>
              <ProFormText label="备注信息" name="description" width="xl" />
            </ProForm.Group>
            <ProCodeEditor
              label="规则回调"
              name="actions"
              ref={formRef}
              rules={[{ required: true, message: '请输入规则回调' }]}
            />
            <ProCodeEditor
              label="成功回调"
              name="success"
              ref={formRef}
              rules={[{ required: true, message: '请输入成功回调' }]}
              defaultCollapsed
            />
            <ProCodeEditor
              label="失败回调"
              name="failed"
              ref={formRef}
              rules={[{ required: true, message: '请输入失败回调' }]}
              defaultCollapsed
            />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
