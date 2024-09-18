import { message } from '@/components/PopupHack';
import { getSettingsTime, postSettingsTime, putSettingsNtp } from '@/services/rhilex/shijianpeizhi';
import { SyncOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { Button, Space } from 'antd';
import { useRef } from 'react';

type UpdateParams = {
  sysTime: string;
  sysTimeZone: string;
  enableNtp: boolean;
};

const TimeConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);

  // 详情
  useRequest(() => getSettingsTime(), {
    onSuccess: (data) => {
      if (!data) {
        formRef.current?.setFieldsValue({
          sysTimeZone: 'Asia/Shanghai',
          enableNtp: false,
        });
      } else {
        formRef.current?.setFieldsValue({ ...data });
      }
    },
  });

  // 立即更新 NTP 时间
  const { run: updateNtp, loading } = useRequest(() => putSettingsNtp(), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'system.message.success.ntp' }));
    },
  });

  const handleOnFinish = async (values: UpdateParams) => {
    try {
      await postSettingsTime(values);
      message.success(formatMessage({ id: 'message.success.update' }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.time' })}
      headStyle={{ paddingBlock: 0 }}
      ref={sizeRef}
    >
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout={size && size?.width < 1200 ? 'vertical' : 'horizontal'}
        labelCol={size && size?.width < 1200 ? {} : { span: 2 }}
        submitter={{
          render: (props, dom) => (
            <ProForm.Item
              labelCol={{ span: 2 }}
              label={<div className="invisible">action</div>}
              colon={false}
            >
              <div className="max-w-[552px] flex justify-end">
                <Space>
                  {dom}
                  <Button
                    type="primary"
                    onClick={updateNtp}
                    icon={<SyncOutlined />}
                    loading={loading}
                  >
                    {formatMessage({ id: 'system.button.time.ntp' })}
                  </Button>
                </Space>
              </div>
            </ProForm.Item>
          ),
        }}
      >
        <ProFormSelect
          options={[
            { label: formatMessage({ id: 'system.option.shanghai' }), value: 'Asia/Shanghai' },
            { label: formatMessage({ id: 'system.option.tokyo' }), value: 'Asia/Tokyo' },
          ]}
          name="sysTimeZone"
          label={formatMessage({ id: 'system.table.title.sysTimeZone' })}
          width="xl"
          allowClear={false}
          placeholder={formatMessage({ id: 'system.form.placeholder.sysTimeZone' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'system.form.placeholder.sysTimeZone' }),
            },
          ]}
        />
        <ProFormDateTimePicker
          name="sysTime"
          label={formatMessage({ id: 'system.table.title.sysTime' })}
          width="xl"
          placeholder={formatMessage({ id: 'system.form.placeholder.sysTime' })}
          rules={[
            { required: true, message: formatMessage({ id: 'system.form.placeholder.sysTime' }) },
          ]}
        />
        <ProFormSwitch
          name="enableNtp"
          label={formatMessage({ id: 'system.table.title.enableNtp' })}
          checkedChildren={formatMessage({ id: 'system.switch.checked' })}
          unCheckedChildren={formatMessage({ id: 'system.switch.unchecked' })}
          rules={[{ required: true }]}
        />
      </ProForm>
    </ProCard>
  );
};

export default TimeConfig;
