import CodeEditor, { Lang } from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import ProLog from '@/components/ProLog';
import PageContainer from '@/components/ProPageContainer';
import RuleLabel from '@/components/RuleLabel';
import {
  getRulesDetail,
  postRulesCreate,
  postRulesFormatLua,
  postRulesTestDevice,
  putRulesUpdate,
} from '@/services/rulex/guizeguanli';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { FormItemType } from '@/utils/enum';
import { handleNewMessage, validateFormItem } from '@/utils/utils';
import { BugOutlined, FileSyncOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { FooterToolbar, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, Popconfirm, Space } from 'antd';
import type { Rule } from 'antd/es/form';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { debugData } from '../DS';

type FormParams = {
  name: string;
  description: string;
  actions: string;
  success: string;
  failed: string;
};

/** 规则默认值 **/
const DefaultActions = `Actions = {
  function(args)
    --Debug(args)
    return true, args
  end
}`;

const DefaultSuccess = `function Success()
--Debug("success")
end`;

const DefaultFailed = `function Failed(error)
Debug(error)
end`;

const initialValue = {
  actions: DefaultActions,
  success: DefaultSuccess,
  failed: DefaultFailed,
  name: '',
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const debugFormRef = useRef<ProFormInstance>();
  const { ruleId, deviceId, inendId, groupId } = useParams();
  const { latestMessage } = useModel('useWebsocket');
  const { formatMessage } = useIntl();

  const [loading, setLoading] = useState<boolean>(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [showLog, setShowLog] = useState<boolean>(false);
  const [ruleType, setType] = useState<string>();

  const getBackUrl = () => {
    if (groupId && deviceId) {
      return `/device/${groupId}/${deviceId}/rule`;
    } else {
      return `/inend/${inendId}/rule`;
    }
  };

  // 重置测试数据
  const handleOnReset = () => {
    setDebugLog([]);
    setShowLog(false);
    debugFormRef.current?.resetFields();
    debugFormRef.current?.setFieldsValue({ testData: ruleType ? debugData[ruleType] : '' });
  };

  // 测试
  const handleOnDebug = async () => {
    const inputData = debugFormRef.current?.getFieldValue('testData');
    if (inputData && deviceId) {
      const { code } = await postRulesTestDevice({
        testData: inputData,
        uuid: deviceId,
      });
      setShowLog(code === 200);
    }
  };

  useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
    onSuccess: (res) => setType(res?.type),
  });

  useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
    onSuccess: (res) => setType(res?.type),
  });

  // 获取详情
  const { data: detail } = useRequest(() => getRulesDetail({ uuid: ruleId || '' }), {
    ready: !!ruleId,
    refreshDeps: [ruleId],
  });

  // 代码格式化
  const handleOnFormatCode = async () => {
    const code = formRef.current?.getFieldValue('actions');
    const { data } = await postRulesFormatLua({ source: code });

    formRef.current?.setFieldsValue({ actions: data.source });
  };

  // 新建&更新规则表单
  const handleOnFinish = async (values: FormParams) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        fromSource: inendId ? [inendId] : [],
        fromDevice: deviceId ? [deviceId] : [],
        success: DefaultSuccess,
        failed: DefaultFailed,
      };

      if (ruleId) {
        await putRulesUpdate({ ...params, uuid: ruleId });
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        await postRulesCreate(params);
        message.success(formatMessage({ id: 'message.success.new' }));
      }
      history.push(getBackUrl());
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    const topic = `rule/log/test/${ruleId}`;
    const newData = handleNewMessage(debugLog, latestMessage?.data, topic);
    if (showLog) {
      setDebugLog(newData);
    }
  }, [latestMessage, ruleId, showLog]);

  useEffect(() => {
    formRef.current?.setFieldsValue(detail ? detail : initialValue);
  }, [detail]);

  useEffect(() => {
    handleOnReset();
  }, [ruleType]);

  return (
    <PageContainer
      showExtra
      title={
        ruleId
          ? formatMessage({ id: 'ruleConfig.title.edit' })
          : formatMessage({ id: 'ruleConfig.title.new' })
      }
      backUrl={getBackUrl()}
    >
      <ProCard split="vertical">
        <ProCard>
          <ProForm
            formRef={formRef}
            submitter={{
              render: ({ reset, submit }) => (
                <FooterToolbar>
                  <Popconfirm
                    key="reset"
                    title={formatMessage({ id: 'ruleConfig.popconfirm.title.reset' })}
                    onConfirm={() => {
                      reset();
                      formRef.current?.setFieldsValue(detail ? detail : initialValue);
                    }}
                  >
                    <Button>{formatMessage({ id: 'button.reset' })}</Button>
                  </Popconfirm>

                  <Button key="submit" type="primary" onClick={submit} loading={loading}>
                    {formatMessage({ id: 'button.submit' })}
                  </Button>
                </FooterToolbar>
              ),
            }}
            onFinish={handleOnFinish}
          >
            <ProForm.Group>
              <ProFormText
                label={formatMessage({ id: 'ruleConfig.form.title.name' })}
                name="name"
                placeholder={formatMessage({ id: 'ruleConfig.form.placeholder.name' })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'ruleConfig.form.placeholder.name' }),
                  },
                  {
                    validator: (_rule: Rule, value: string) =>
                      validateFormItem(value, FormItemType.NAME),
                  },
                ]}
                width="lg"
              />
              <ProFormText
                label={formatMessage({ id: 'table.desc' })}
                name="description"
                width="lg"
                placeholder={formatMessage({ id: 'placeholder.desc' })}
              />
            </ProForm.Group>
            <ProForm.Item
              rootClassName="rule-label"
              label={
                <RuleLabel
                  name={formatMessage({ id: 'ruleConfig.form.title.actions' })}
                  handleOnFormatCode={handleOnFormatCode}
                />
              }
              name="actions"
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    { id: 'placeholder.input' },
                    { text: formatMessage({ id: 'ruleConfig.form.title.actions' }) },
                  ),
                },
              ]}
            >
              <CodeEditor key="actions" minHeight="400px" lang={Lang.LUA} />
            </ProForm.Item>
          </ProForm>
        </ProCard>
        <ProCard
          title={formatMessage({ id: 'ruleConfig.title.test' })}
          className="h-full"
          colSpan="40%"
          extra={
            <Space>
              <Button key="reset" size="small" icon={<FileSyncOutlined />} onClick={handleOnReset}>
                {formatMessage({ id: 'button.reset' })}
              </Button>
              <Button
                ghost
                key="debug"
                type="primary"
                size="small"
                icon={<BugOutlined />}
                onClick={handleOnDebug}
              >
                {formatMessage({ id: 'button.test' })}
              </Button>
            </Space>
          }
        >
          <ProForm formRef={debugFormRef} submitter={false}>
            <ProForm.Item
              name="testData"
              label={formatMessage({ id: 'ruleConfig.form.title.testData' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'ruleConfig.form.placeholder.testData' }),
                },
              ]}
            >
              <CodeEditor autoFocus lang={Lang.SHELL} />
            </ProForm.Item>
            <ProForm.Item
              name="output"
              label={formatMessage({ id: 'ruleConfig.form.title.output' })}
              className="mb-0"
            >
              <ProLog
                hidePadding
                headStyle={{ paddingBlock: 0 }}
                topic={`rule/log/test/${ruleId}`}
                dataSource={debugLog}
                className="h-[290px]"
              />
            </ProForm.Item>
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
