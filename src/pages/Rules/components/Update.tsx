import { useEffect, useRef } from 'react';
import { history, useParams } from 'umi';

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
import { useModel, useRequest } from 'umi';

import FullScreenEditor from '@/components/FullScreenEditor';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import { Button, Popconfirm, Space } from 'antd';
import omit from 'lodash/omit';
import { CodeOutlined } from '@ant-design/icons';

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

const DefaultActions = `Actions = {
  function(data)
    -- rulexlib:Debug(data)
    return true, data
  end
}`;
const DefaultSuccess = `function Success()
--rulexlib:log("success")
end`;
const DefaultFailed = `function Failed(error)
  rulexlib:log(error)
end`;

const DefaultListUrl = '/rules/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const failRef = useRef(null);
  const actionRef = useRef(null);
  const successRef = useRef(null);
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

      if (id) {
        update({ ...params, uuid: id });
      } else {
        add(params);
      }

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
        actions: DefaultActions,
        success: DefaultSuccess,
        failed: DefaultFailed,
        sourceType: 'fromSource',
      });
    }
  }, [id]);

  useEffect(() => {
    // getSources();
    getDevices();
  }, []);

  return (
    <>
      <PageContainer
        header={{ title: id ? '编辑规则' : '新建规则' }}
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
              width='xl'
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
              width='xl'
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
                      width='xl'
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
                      width='xl'
                    />
                  );
                }
              }}
            </ProFormDependency>
            <ProFormText label="备注信息" name="description" width='xl'/>
            </ProForm.Group>

            <ProForm.Item
              label={<Space><span>规则回调</span><div className='w-[100px] h-full bg-[#18f] text-[#fff]'><CodeOutlined className='pr-[8px]' /><span>代码格式化</span></div></Space>}
              name="actions"
              rules={[{ required: true, message: '请输入规则回调' }]}
              // tooltip='从左至右分别是规则回调/成功回调/失败回调'
            >
              <FullScreenEditor />
            </ProForm.Item>
            {/* <ProForm.Item
              label="成功回调"
              name="success"
              rules={[{ required: true, message: '请输入成功回调' }]}
            >
              <FullScreenEditor ref={successRef} />
            </ProForm.Item>
            <ProForm.Item
              label="失败回调"
              name="failed"
              rules={[{ required: true, message: '请输入失败回调' }]}
            >
              <FullScreenEditor ref={failRef} />
            </ProForm.Item> */}

          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
