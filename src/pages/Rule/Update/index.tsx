import CodeEditor, { Lang, Theme } from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import RuleLabel from '@/components/RuleLabel';
import { InendType } from '@/pages/Inend/enum';
import {
  getRulesDetail,
  postRulesCreate,
  postRulesFormatLua,
  putRulesUpdate,
} from '@/services/rulex/guizeguanli';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import { NotificationOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { FooterToolbar, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Button, Popconfirm } from 'antd';
import type { Rule } from 'antd/es/form';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import type { DSType } from '..';
import { dsData } from '../DS';
import { inend_event_ds, links } from '../DS/inend';

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
  const { ruleId, deviceId, inendId, groupId } = useParams();
  const { formatMessage } = useIntl();

  const [loading, setLoading] = useState<boolean>(false);
  const [dsType, setType] = useState<string>();

  const getBackUrl = () => {
    if (groupId && deviceId) {
      return `/device/${groupId}/${deviceId}/rule`;
    } else {
      return `/inend/${inendId}/rule`;
    }
  };

  useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
    onSuccess: (res) => {
      setType(res?.type);
    },
  });

  useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
    onSuccess: (res) => {
      setType(res?.type);
    },
  });

  // 获取详情
  const { data: detail } = useRequest(() => getRulesDetail({ uuid: ruleId || '' }), {
    ready: !!ruleId,
    refreshDeps: [ruleId],
  });

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

  // 代码格式化
  const handleOnFormatCode = async () => {
    const code = formRef.current?.getFieldValue('actions');
    const { data } = await postRulesFormatLua({ source: code });

    formRef.current?.setFieldsValue({ actions: data.source });
  };

  useEffect(() => {
    formRef.current?.setFieldsValue(detail ? detail : initialValue);
  }, [detail]);

  const renderDS = () => {
    if (dsType && [InendType.GENERIC_IOT_HUB, InendType.GENERIC_MQTT].includes(dsType as DSType)) {
      let message: React.ReactNode = formatMessage({ id: 'ruleConfig.message.mqtt' });

      if (dsType === InendType.GENERIC_IOT_HUB) {
        message = (
          <>
            <div>{formatMessage({ id: 'ruleConfig.message.iothub' })}</div>
            <ul className="list-disc">
              {links.map((l) => (
                <li key={l.key}>
                  <span>{l.label}</span>
                  <a href={l.link} target="_blank" rel="noreferrer">
                    {l.link}
                  </a>
                </li>
              ))}
            </ul>
          </>
        );
      }

      return (
        <Alert
          icon={<NotificationOutlined className="pt-[5px]" />}
          showIcon
          message={message}
          type="warning"
          className="flex items-start"
        />
      );
    }
    if (dsType === InendType.INTERNAL_EVENT) {
      // 内部事件源
      return inend_event_ds.map(({ key, title, json }) => (
        <div key={key} className="mb-[20px]">
          <div className="mb-[5px]">{title}</div>
          <CodeEditor lang={Lang.JSON} readOnly value={json} theme={Theme.LIGHT} />
        </div>
      ));
    }
    // TODO 暂时隐藏
    // if (dsType === 'GENERIC_AIS_RECEIVER') {
    //   return device_ais_ds.map(({ key, title, json }) => (
    //     <div key={key} className="mb-[20px]">
    //       <div className="mb-[5px]">{title}</div>
    //       <CodeEditor lang={Lang.JSON} readOnly value={json} theme={Theme.LIGHT} />
    //     </div>
    //   ));
    // }

    return (
      <CodeEditor
        lang={Lang.JSON}
        readOnly
        value={dsType ? dsData[dsType] : ''}
        theme={Theme.LIGHT}
      />
    );
  };

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
        <ProCard colSpan="60%">
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
          title={
            dsType
              ? `${dsType} - ${formatMessage({ id: 'ruleConfig.title.tpl' })}`
              : formatMessage({ id: 'ruleConfig.title.tpl' })
          }
        >
          {renderDS()}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
