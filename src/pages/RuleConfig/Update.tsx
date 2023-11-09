import { useEffect, useRef } from 'react';
import { history, useParams } from 'umi';

import { luaGlobFuncs } from '@/components/LuaEditor/constant';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import type {  ProFormInstance } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tooltip, Typography } from 'antd';
import omit from 'lodash/omit';
import { useModel, useRequest } from 'umi';
import { RuleType } from '.';
import ProCodeEditor from '@/components/ProCodeEditor';

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
  const { ruleId, groupId } = useParams();
  const DefaultListUrl = groupId ? `/${type}/${groupId}/${typeId}/rule` : `/${type}/${typeId}/rule`;

  const { showModal } = useGoBack();

  const { data: sources, run: getSourceList } = useModel('useSource');
  const { data: devices, run: getDeviceList } = useModel('useDevice');

  // 获取详情
  const { run: getDetail } = useRequest((uuid: string) => getRulesDetail({ uuid: uuid || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({ ...data });
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

  const getSourceIdList = () => {
    console.log(sources);
    let data = type === 'inends' ? sources : devices;

    const options = data?.map((item: any) => ({
      label: (
        <Typography.Paragraph
          copyable={{ text: item?.uuid }}
          style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between' }}
        >
          <Space>
            <span>{item?.name || item?.label}</span>
            <span className="text-[12px] text-[#000000A6]">{item?.uuid || item?.value}</span>
          </Space>
        </Typography.Paragraph>
      ),
      value: item?.uuid,
    }));
    return options;
  };

  const getTemplateOptions = () => {
    const options = luaGlobFuncs?.map((item) => ({
      label: (
        <Tooltip
          placement="right"
          arrow={false}
          title={<pre>{item.apply}</pre>}
          overlayInnerStyle={{ width: 400 }}
        >
          <Typography.Paragraph
            copyable={{ text: item.apply }}
            style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between' }}
          >
            <Space>
              <span>{item.detail}</span>
              <span className="text-[12px] text-[#000000A6]">{item.label}</span>
            </Space>
          </Typography.Paragraph>
        </Tooltip>
      ),
      value: item?.apply,
    }));

    return options;
  };

  useEffect(() => {
    if (ruleId) {
      getDetail(ruleId);
    } else {
      formRef.current?.setFieldsValue({
        actions: DefaultActions,
        success: DefaultSuccess,
        failed: DefaultFailed,
        name: '',
      });
    }
  }, [ruleId, typeId, type]);

  useEffect(() => {
    if (!groupId) return;
    getDeviceList({ uuid: groupId });
  }, [groupId]);

  useEffect(() => {
    if (type === 'inends') {
      getSourceList();
    }
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
                width="md"
              />
              <ProFormSelect
                label="数据来源"
                name="sourceId"
                options={getSourceIdList()}
                width="md"
              />
              <ProFormSelect
                label="快捷模板"
                name="template"
                options={getTemplateOptions()}
                width="md"
              />
              <ProFormText label="备注" name="description" width="md" />
            </ProForm.Group>
            <ProCodeEditor
              label="规则回调"
              name="actions"
              ref={formRef}
              required
            />
            <ProCodeEditor
              label="成功回调"
              name="success"
              ref={formRef}
              required
              defaultCollapsed
            />
            <ProCodeEditor
              label="失败回调"
              name="failed"
              ref={formRef}
              required
              defaultCollapsed
            />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
