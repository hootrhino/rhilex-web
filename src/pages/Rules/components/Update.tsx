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

import LuaEditor from '@/components/LuaEditor';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import { CodeOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import omit from 'lodash/omit';
import luamin from 'lua-format';

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

const DefaultListUrl = '/rules/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();

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
    } catch (err) {
      message.error(err as any);
      return false;
    }
  };

  const handleOnFormatCode = (type: 'actions' | 'success' | 'failed') => {
    const code = formRef.current?.getFieldValue(type);
    const formatCode = luamin.Beautify(code[type], {
      RenameVariables: false,
      RenameGlobals: false,
      SolveMath: true,
    });
    let formattedCode = formatCode
      .toString()
      .replace(/--discord\.gg\/boronide, code generated using luamin\.js™\n?/g, '');

    formattedCode = formattedCode.replace(/^\s*\n/gm, '');
    formRef.current?.setFieldsValue({ [type]: formattedCode });
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
                        width="xl"
                      />
                    );
                  }
                }}
              </ProFormDependency>
              <ProFormText label="备注信息" name="description" width="xl" />
            </ProForm.Group>
            <ProCard
              title="规则回调"
              collapsible
              extra={
                <div
                  className="flex items-center h-[24px] bg-[#18f] text-[#fff] px-[10px] rounded-[2px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnFormatCode('actions');
                  }}
                >
                  <CodeOutlined className="pr-[8px]" />
                  <span>代码格式化</span>
                </div>
              }
            >
              <ProForm.Item
                label={false}
                name="actions"
                rules={[{ required: true, message: '请输入规则回调' }]}
              >
                <LuaEditor
                  // value={code.actions}
                  // onChange={(value) => setCode({ ...code, actions: value })}
                  key="action"
                />
              </ProForm.Item>
            </ProCard>
            <ProCard
              title="成功回调"
              collapsible
              defaultCollapsed
              extra={
                <div
                  className="flex items-center h-[24px] bg-[#18f] text-[#fff] px-[10px] rounded-[2px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnFormatCode('success');
                  }}
                >
                  <CodeOutlined className="pr-[8px]" />
                  <span>代码格式化</span>
                </div>
              }
            >
              <ProForm.Item
                label={false}
                name="success"
                rules={[{ required: true, message: '请输入成功回调' }]}
              >
                <LuaEditor
                  // value={code.success}
                  // onChange={(value) => setCode({ ...code, success: value })}
                  key="success"
                />
              </ProForm.Item>
            </ProCard>
            <ProCard
              title="失败回调"
              collapsible
              defaultCollapsed
              extra={
                <div
                  className="flex items-center h-[24px] bg-[#18f] text-[#fff] px-[10px] rounded-[2px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnFormatCode('failed');
                  }}
                >
                  <CodeOutlined className="pr-[8px]" />
                  <span>代码格式化</span>
                </div>
              }
            >
              <ProForm.Item
                label={false}
                name="failed"
                rules={[{ required: true, message: '请输入失败回调' }]}
              >
                <LuaEditor
                  // value={code.failed}
                  // onChange={(value) => setCode({ ...code, failed: value })}
                  key="failed"
                />
              </ProForm.Item>
            </ProCard>
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
