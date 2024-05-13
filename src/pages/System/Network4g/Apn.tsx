import { message } from '@/components/PopupHack';
import { getMn4GApn, postMn4GApn } from '@/services/rulex/yidongwangluo4Gshezhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Space } from 'antd';
import { useEffect, useRef } from 'react';

type UpdateParams = {
  senceId: number;
  ptytpe: number;
  auth: number;
  cdmapwd: number;
  apn: string;
  apn_username: string;
  apn_password: string;
};

const initialValue = {
  senceId: 1,
  ptytpe: 1,
  auth: 0,
  cdmapwd: 0,
  apn_username: undefined,
  apn_password: undefined,
};

const APNConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { activeKey } = useModel('useSystem');

  const { data: detail } = useRequest(() => getMn4GApn(), {
    refreshDeps: [activeKey],
  });

  const handleOnFinish = async (values: UpdateParams) => {
    try {
      await postMn4GApn({ ...values });
      message.success(formatMessage({ id: 'message.success.update' }));
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail });
    } else {
      formRef.current?.setFieldsValue(initialValue);
    }
  }, [detail, activeKey]);

  return (
    <ProForm
      formRef={formRef}
      layout="horizontal"
      labelCol={{ span: 4 }}
      submitter={{
        render: (props, dom) => (
          <ProForm.Item wrapperCol={{ offset: 16 }}>
            <Space>{dom}</Space>
          </ProForm.Item>
        ),
      }}
      onFinish={handleOnFinish}
    >
      <ProFormSelect
        name="senceId"
        label={formatMessage({ id: 'system.form.title.senceId' })}
        options={[{ label: '场景1', value: 1 }]}
        placeholder={formatMessage({ id: 'system.form.placeholder.senceId' })}
        width="xl"
      />
      <ProFormSelect
        name="ptytpe"
        label={formatMessage({ id: 'system.form.title.ptytpe' })}
        options={[
          { label: 'IPv4', value: 1 },
          { label: 'IPv6', value: 2 },
          { label: `IPv4 ${formatMessage({ id: 'system.option.and' })} IPv6`, value: 3 },
        ]}
        placeholder={formatMessage({ id: 'system.form.placeholder.ptytpe' })}
        width="xl"
      />
      <ProFormText
        name="apn"
        label={formatMessage({ id: 'system.form.title.apn' })}
        placeholder={formatMessage({ id: 'system.form.placeholder.apn' })}
        width="xl"
      />
      <ProFormText
        name="apn_username"
        label={formatMessage({ id: 'system.form.title.username' })}
        placeholder={formatMessage({ id: 'system.form.placeholder.username' })}
        width="xl"
      />
      <ProFormText.Password
        name="apn_password"
        label={formatMessage({ id: 'system.form.title.password' })}
        placeholder={formatMessage({ id: 'system.form.placeholder.password' })}
        width="xl"
        allowClear
      />
      <ProFormSelect
        name="auth"
        label={formatMessage({ id: 'system.form.title.auth' })}
        options={[
          { label: 'NONE', value: 0 },
          { label: 'PAP', value: 1 },
          { label: 'CHAP', value: 2 },
          { label: `PAP ${formatMessage({ id: 'system.option.or' })} CHAP`, value: 3 },
        ]}
        placeholder={formatMessage({ id: 'system.form.placeholder.auth' })}
        width="xl"
      />
      <ProFormSelect
        name="cdmapwd"
        label={formatMessage({ id: 'system.form.title.cdmapwd' })}
        options={[
          { label: formatMessage({ id: 'system.option.unsave' }), value: 0 },
          { label: formatMessage({ id: 'system.option.save' }), value: 1 },
        ]}
        tooltip={formatMessage({ id: 'system.tooltip.cdmapwd' })}
        placeholder={formatMessage(
          { id: 'placeholder.select' },
          { text: formatMessage({ id: 'system.form.title.cdmapwd' }) },
        )}
        width="xl"
      />
    </ProForm>
  );
};

export default APNConfig;
