import CodeEditor, { Lang, Theme } from '@/components/CodeEditor';
import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import { getRulesDetail, postRulesCreate, putRulesUpdate } from '@/services/rulex/guizeguanli';
import { validateName } from '@/utils/regExp';
import { NotificationOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { FooterToolbar, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Alert, Button, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { RuleType } from '.';
import { deviceTypeOptions } from '../Devices/enum';
import { typeEnum as inendsTypeEnum } from '../Inends/enum';
import { device_ais_ds, device_ds } from './deviceDS';
import { inends_ds, inends_event_ds, links } from './inendsDS';
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
  deviceType?: string;
  inendsType?: string;
};

const initialValue = {
  actions: DefaultActions,
  success: DefaultSuccess,
  failed: DefaultFailed,
  name: '',
};

const UpdateForm = ({ type, typeId, deviceType, inendsType }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { ruleId, groupId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const DefaultListUrl = groupId ? `/${type}/${groupId}/${typeId}/rule` : `/${type}/${typeId}/rule`;
  const hasDeviceDS = deviceType && Object.keys(deviceTypeOptions).includes(deviceType);
  const hasInendsDS = inendsType && Object.keys(inendsTypeEnum).includes(inendsType);

  // 获取详情
  const { data: detail } = useRequest(() => getRulesDetail({ uuid: ruleId || '' }), {
    ready: !!ruleId,
  });

  const handleOnFinish = async (values: FormParams) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        fromSource: type === RuleType.Inends ? [typeId] : [],
        fromDevice: type === RuleType.Device ? [typeId] : [],
        success: DefaultSuccess,
        failed: DefaultFailed,
      };

      if (ruleId) {
        await putRulesUpdate({ ...params, uuid: ruleId });
        message.success('更新成功');
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
    if (deviceType === 'GENERIC_AIS_RECEIVER') {
      return device_ais_ds.map(({ key, title, json }) => (
        <div key={key} className="mb-[20px]">
          <div className="mb-[5px]">{title}</div>
          <CodeEditor lang={Lang.Json} readOnly value={json} theme={Theme.Light} />
        </div>
      ));
    } else {
      return (
        <CodeEditor
          lang={Lang.Json}
          readOnly
          value={deviceType ? device_ds[deviceType] : ''}
          theme={Theme.Light}
        />
      );
    }
  };

  // 获取南向资源数据结构
  const getInendsDS = () => {
    if (!inendsType) return;
    if (['COAP', 'HTTP', 'RULEX_UDP', 'GRPC', 'NATS_SERVER'].includes(inendsType)) {
      return (
        <CodeEditor
          lang={Lang.Json}
          readOnly
          value={inendsType ? inends_ds[inendsType] : ''}
          theme={Theme.Light}
        />
      );
    } else if (['GENERIC_IOT_HUB', 'GENERIC_MQTT'].includes(inendsType)) {
      let message: React.ReactNode =
        'Mqtt 消息来自 Publish 方，而此处规则只做原始数据转发，不对数据做任何更改，因此回调函数的参数就是原始的 Mqtt Message，其具体格式需要开发者自行决定。';
      if (inendsType === 'GENERIC_IOT_HUB') {
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
      return inends_event_ds.map(({ key, title, json }) => (
        <div key={key} className="mb-[20px]">
          <div className="mb-[5px]">{title}</div>
          <CodeEditor lang={Lang.Json} readOnly value={json} theme={Theme.Light} />
        </div>
      ));
    }
  };

  // 获取数据结构 title
  const getDSTitle = () => {
    if (type === RuleType.Device) {
      return `${hasDeviceDS ? deviceTypeOptions[deviceType] : '设备'} - 输出数据的结构及其示例`;
    }
    if (type === RuleType.Inends) {
      return `${hasInendsDS ? inendsTypeEnum[inendsType] : '资源'} - 输出数据的结构及其示例`;
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
                    validator: (_, value) => {
                      if (!value || validateName(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        '名称仅支持中文、字母、数字或下划线，长度在 6-14 个字符之间',
                      );
                    },
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
          {hasInendsDS && getInendsDS()}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
