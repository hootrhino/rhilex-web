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
      labelWrap
      labelCol={{ span: 5 }}
      submitter={{
        render: (props, dom) => (
          <ProForm.Item
            labelCol={{ span: 5 }}
            label={<div className="invisible">action</div>}
            colon={false}
          >
            <div className="w-[552px] flex justify-end">
              <Space>{dom}</Space>
            </div>
          </ProForm.Item>
        ),
      }}
      onFinish={handleOnFinish}
    >
      <ProFormSelect
        name="senceId"
        label={formatMessage({ id: 'system.form.title.sceneId' })}
        options={[{ label: formatMessage({ id: 'system.scene.option1' }), value: 1 }]}
        placeholder={formatMessage({ id: 'system.form.placeholder.sceneId' })}
        width="xl"
        allowClear={false}
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
        allowClear={false}
      />
      <ProFormText
        name="apn"
        label={formatMessage({ id: 'system.form.title.apn' })}
        placeholder={formatMessage({ id: 'system.form.placeholder.apn' })}
        width="xl"
      />
      <ProFormText
        name="apn_username"
        label={formatMessage({ id: 'form.title.username' })}
        placeholder={formatMessage({ id: 'form.placeholder.username' })}
        width="xl"
      />
      <ProFormText.Password
        name="apn_password"
        label={formatMessage({ id: 'form.title.password' })}
        placeholder={formatMessage({ id: 'form.placeholder.password' })}
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
        allowClear={false}
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
        allowClear={false}
      />
    </ProForm>
  );
};

export default APNConfig;
