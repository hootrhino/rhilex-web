import { useEffect, useRef, useState } from 'react';
import { history, useParams } from 'umi';

import { luaGlobFuncs } from '@/components/LuaEditor/constant';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tooltip, Typography } from 'antd';
import omit from 'lodash/omit';
import { useModel, useRequest } from 'umi';
import { RuleType } from '.';

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
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        ...omit(values, ['sourceId', 'template']),
        fromSource: type === 'inends' ? [typeId] : [],
        fromDevice: type === 'device' ? [typeId] : [],
      };

      if (ruleId) {
        await putRules({ ...params, uuid: ruleId } as any);
        message.success('更新成功');
      } else {
        await postRules(params as any);
        message.success('新建成功');
      }
      history.push(DefaultListUrl);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const getSourceIdList = () => {
    return type === 'device'
      ? devices?.map((item) => ({ label: item?.name, value: item?.uuid }))
      : sources;
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

                    <Button key="submit" type="primary" onClick={submit} loading={loading}>
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
                placeholder="请输入规则名称"
                rules={[
                  {
                    required: true,
                    message: '请输入规则名称',
                  },
                ]}
                width="md"
              />
              <ProFormSelect
                label="数据来源"
                name="sourceId"
                options={getSourceIdList()}
                width="md"
                fieldProps={{
                  optionItemRender: (item) => (
                    <Typography.Paragraph
                      copyable={{ text: item?.value }}
                      style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Space>
                        <span>{item?.label}</span>
                        <span className="text-[12px] text-[#000000A6]">{item?.value}</span>
                      </Space>
                    </Typography.Paragraph>
                  ),
                }}
              />
              <ProFormSelect
                label="快捷模板"
                name="template"
                options={luaGlobFuncs?.map((item) => ({
                  label: item?.detail,
                  value: item?.apply,
                  desc: item?.label,
                }))}
                width="md"
                fieldProps={{
                  optionItemRender: (item) => (
                    <Tooltip
                      placement="right"
                      arrow={false}
                      title={<pre>{item.value}</pre>}
                      overlayInnerStyle={{ width: 400 }}
                    >
                      <Typography.Paragraph
                        copyable={{ text: item.value }}
                        style={{
                          marginBottom: 0,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Space>
                          <span>{item.label}</span>
                          <span className="text-[12px] text-[#000000A6]">{item.desc}</span>
                        </Space>
                      </Typography.Paragraph>
                    </Tooltip>
                  ),
                }}
              />
              <ProFormText label="备注" name="description" width="md" placeholder="请输入备注" />
            </ProForm.Group>
            <ProCodeEditor label="规则回调" name="actions" ref={formRef} required />
            <ProCodeEditor
              label="成功回调"
              name="success"
              ref={formRef}
              required
              defaultCollapsed
            />
            <ProCodeEditor label="失败回调" name="failed" ref={formRef} required defaultCollapsed />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
