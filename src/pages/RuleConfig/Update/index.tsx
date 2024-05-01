import CodeEditor, { Lang, Theme } from '@/components/CodeEditor';
import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import { getRulesDetail, postRulesCreate, putRulesUpdate } from '@/services/rulex/guizeguanli';
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
import { RuleType } from '..';
import { DeviceType } from '../../Device/enum';
import { InendType } from '../../Inend/enum';
import { device_ds } from './deviceDS';
import { inend_ds, inend_event_ds, links } from './inendDS';
import { DefaultActions, DefaultFailed, DefaultSuccess } from './initialValue';

type FormParams = {
  name: string;
  description: string;
  actions: string;
  success: string;
  failed: string;
};

type UpdateFormProps = {
  type: RuleType;
  typeId: string;
  deviceType?: DeviceType;
  inendType?: InendType;
};

const initialValue = {
  actions: DefaultActions,
  success: DefaultSuccess,
  failed: DefaultFailed,
  name: '',
};

const UpdateForm = ({ type, typeId, deviceType, inendType }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId, groupId } = useParams();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const DefaultListUrl = groupId ? `/${type}/${groupId}/${typeId}/rule` : `/${type}/${typeId}/rule`;
  const hasDeviceDS = deviceType && Object.keys(DeviceType).includes(deviceType);
  const hasInendDS = inendType && Object.keys(InendType).includes(inendType);

  // 获取详情
  const { data: detail } = useRequest(() => getRulesDetail({ uuid: ruleId || '' }), {
    ready: !!ruleId,
  });

  const handleOnFinish = async (values: FormParams) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        fromSource: type === RuleType.INEND ? [typeId] : [],
        fromDevice: type === RuleType.DEVICE ? [typeId] : [],
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
      history.push(DefaultListUrl);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  // 获取设备数据结构
  const getDeviceDS = () => {
    // if (deviceType === 'GENERIC_AIS_RECEIVER') {
    //   return device_ais_ds.map(({ key, title, json }) => (
    //     <div key={key} className="mb-[20px]">
    //       <div className="mb-[5px]">{title}</div>
    //       <CodeEditor lang={Lang.JSON} readOnly value={json} theme={Theme.LIGHT} />
    //     </div>
    //   ));
    // } else {
    //   return (
    //     <CodeEditor
    //       lang={Lang.JSON}
    //       readOnly
    //       value={deviceType ? device_ds[deviceType] : ''}
    //       theme={Theme.LIGHT}
    //     />
    //   );
    // }
    return (
      <CodeEditor
        lang={Lang.JSON}
        readOnly
        value={deviceType ? device_ds[deviceType] : ''}
        theme={Theme.LIGHT}
      />
    );
  };

  // 获取南向资源数据结构
  const getInendDS = () => {
    if (!inendType) return;
    if (
      [
        InendType.COAP,
        InendType.HTTP,
        InendType.RULEX_UDP,
        InendType.GRPC,
        InendType.NATS_SERVER,
      ].includes(inendType)
    ) {
      return (
        <CodeEditor
          lang={Lang.JSON}
          readOnly
          value={inendType ? inend_ds[inendType] : ''}
          theme={Theme.LIGHT}
        />
      );
    } else if ([InendType.GENERIC_IOT_HUB, InendType.GENERIC_MQTT].includes(inendType)) {
      let message: React.ReactNode = formatMessage({ id: 'ruleConfig.message.mqtt' });

      if (inendType === InendType.GENERIC_IOT_HUB) {
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
    } else {
      // 内部事件源
      return inend_event_ds.map(({ key, title, json }) => (
        <div key={key} className="mb-[20px]">
          <div className="mb-[5px]">{title}</div>
          <CodeEditor lang={Lang.JSON} readOnly value={json} theme={Theme.LIGHT} />
        </div>
      ));
    }
  };

  // 获取数据结构 title
  const getDSTitle = () => {
    if (type === RuleType.DEVICE) {
      return `${
        hasDeviceDS ? DeviceType[deviceType] : formatMessage({ id: 'ruleConfig.title.device' })
      } - ${formatMessage({ id: 'ruleConfig.title.tpl' })}`;
    }
    if (type === RuleType.INEND) {
      return `${
        hasInendDS ? InendType[inendType] : formatMessage({ id: 'ruleConfig.title.source' })
      } - ${formatMessage({ id: 'ruleConfig.title.tpl' })}`;
    }
    return null;
  };

  useEffect(() => {
    formRef.current?.setFieldsValue(detail ? detail : initialValue);
  }, [detail]);

  return (
    <PageContainer
      showExtra
      title={
        ruleId
          ? formatMessage({ id: 'ruleConfig.title.edit' })
          : formatMessage({ id: 'ruleConfig.title.new' })
      }
      backUrl={DefaultListUrl}
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
            <ProCodeEditor
              label={formatMessage({ id: 'ruleConfig.form.title.actions' })}
              name="actions"
              ref={formRef}
              required
            />
          </ProForm>
        </ProCard>
        <ProCard title={getDSTitle()}>
          {hasDeviceDS && getDeviceDS()}
          {hasInendDS && getInendDS()}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
