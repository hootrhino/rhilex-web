import { useEffect, useRef, useState } from 'react';
import { history, useParams } from 'umi';

import type { Template } from '@/components/LuaEditor/constant';
import {
  DefaultActions,
  DefaultFailed,
  DefaultSuccess,
  luaTemplates,
} from '@/components/LuaEditor/constant';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import useGoBack from '@/hooks/useGoBack';
import { getRulesDetail, postRules, putRules } from '@/services/rulex/guizeguanli';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, FloatButton, Input, Modal, Popconfirm, Space, Typography } from 'antd';
import { useRequest } from 'umi';
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

const UpdateForm = ({ type, typeId }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId, groupId } = useParams();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);
  const DefaultListUrl = groupId ? `/${type}/${groupId}/${typeId}/rule` : `/${type}/${typeId}/rule`;
  const [open, setOpen] = useState<boolean>(false);
  const [templateData, setTplData] = useState<Template[]>([]);

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
        ...values,
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

  const filterData = (value: string) => {
    let filtered = [...luaTemplates];
    const regex = new RegExp(value, 'i');

    return filtered
      .map((item) => {
        let matchItem = { ...item };

        // 搜索标题
        if (matchItem.title.includes(value)) {
          return matchItem;
        }

        // 搜索内层
        matchItem.data = item.data.filter(
          (child) => child.label.match(regex) || child.detail.match(regex),
        );
        return matchItem.data?.length > 0 ? matchItem : null;
      })
      .filter((item) => item);
  };

  // 搜索快捷模板
  const handleOnSearch = (value: string) => {
    if (!value) {
      setTplData(luaTemplates);
    } else {
      const newData = filterData(value.toLowerCase());
      setTplData(newData as Template[]);
    }
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
    setTplData(luaTemplates);
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
                width="lg"
              />
              <ProFormText label="备注" name="description" width="lg" placeholder="请输入备注" />
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
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        className="right-[24px] bottom-[80px]"
        tooltip="查看快捷模板"
        onClick={() => setOpen(true)}
      />
      <Modal
        title={
          <Space className="w-full pr-[40px] justify-between">
            <span>快捷模板</span>
            <Input.Search
              placeholder="请输入模板名称进行查询"
              onSearch={handleOnSearch}
              onChange={(e) => {
                if (!e.target.value) {
                  setTplData(luaTemplates);
                }
              }}
              style={{ width: 300 }}
            />
          </Space>
        }
        width="45%"
        open={open}
        onCancel={() => setOpen(false)}
        centered
        destroyOnClose
        maskClosable={false}
        footer={
          <Button type="primary" key="close" onClick={() => setOpen(false)}>
            关闭
          </Button>
        }
      >
        <div className="h-[500px] overflow-y-auto">
          {templateData?.map((tpl) => (
            <>
              <ProDescriptions column={2} title={tpl.title} layout="vertical" key={tpl.key}>
                {tpl.data.map((item) => (
                  <ProDescriptions.Item
                    label={
                      <Typography.Paragraph
                        copyable={{ text: item.apply }}
                        style={{
                          marginBottom: 0,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Space>
                          <span>{item.detail}</span>
                          <span className="text-[12px] text-[#000000A6]">{item.label}</span>
                        </Space>
                      </Typography.Paragraph>
                    }
                    valueType="code"
                    key={item?.label}
                  >
                    {item?.apply}
                  </ProDescriptions.Item>
                ))}
              </ProDescriptions>
              <Divider />
            </>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default UpdateForm;
