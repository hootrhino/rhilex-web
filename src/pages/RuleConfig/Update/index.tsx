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
import { device_ds } from '../deviceDS';
import { inend_ds, inend_event_ds, links } from '../inendDS';
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
      let message: React.ReactNode =
        'Mqtt 消息来自 Publish 方，而此处规则只做原始数据转发，不对数据做任何更改，因此回调函数的参数就是原始的 Mqtt Message，其具体格式需要开发者自行决定。';
      if (inendType === InendType.GENERIC_IOT_HUB) {
        message = (
          <>
            <div>
              不同的 IoTHub
              有不同的数据格式，而此处规则只做原始数据转发，不对数据做任何更改，因此回调函数的参数就是原始的
              IoTHub 协议 JSON，其具体格式可以参考对应的云服务商文档。
            </div>
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
      return `${hasDeviceDS ? DeviceType[deviceType] : '设备'} - 输出数据的结构及其示例`;
    }
    if (type === RuleType.INEND) {
      return `${hasInendDS ? InendType[inendType] : '资源'} - 输出数据的结构及其示例`;
    }
    return null;
  };

  useEffect(() => {
    formRef.current?.setFieldsValue(detail ? detail : initialValue);
  }, [detail]);

  return (
    <PageContainer showExtra title={ruleId ? '编辑规则' : '新建规则'} backUrl={DefaultListUrl}>
      <ProCard split="vertical">
        <ProCard colSpan="60%">
          <ProForm
            formRef={formRef}
            submitter={{
              render: ({ reset, submit }) => (
                <FooterToolbar>
                  <Popconfirm
                    key="reset"
                    title="重置可能会丢失数据，确定要重置吗？"
                    onConfirm={() => {
                      reset();
                      formRef.current?.setFieldsValue(detail ? detail : initialValue);
                    }}
                  >
                    <Button>重置</Button>
                  </Popconfirm>

                  <Button key="submit" type="primary" onClick={submit} loading={loading}>
                    提交
                  </Button>
                </FooterToolbar>
              ),
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
                  {
                    validator: (_rule: Rule, value: string) =>
                      validateFormItem(value, FormItemType.NAME),
                  },
                ]}
                width="lg"
              />
              <ProFormText label="备注" name="description" width="lg" placeholder="请输入备注" />
            </ProForm.Group>
            <ProCodeEditor label="规则回调" name="actions" ref={formRef} required />
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
