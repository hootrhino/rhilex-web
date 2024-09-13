import { modal } from '@/components/PopupHack';
import { getCronRebootConfig, postCronRebootUpdate } from '@/services/rhilex/dingshizhongqi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormSwitch } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { Alert, AutoComplete, message, Space } from 'antd';
import { useEffect, useRef } from 'react';

const ScheduledReboot = () => {
  const formRef = useRef<ProFormInstance>();
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);
  const { formatMessage } = useIntl();

  const alertMessage = formatMessage({ id: 'system.modal.content.cornExpr' });
  const tooltip = formatMessage({ id: 'system.tooltip.corn' });
  const cronRules = formatMessage({ id: 'system.form.rules.cronExpr' });

  // 获取配置
  const { data: detailConfig } = useRequest(() => getCronRebootConfig());

  useEffect(() => {
    if (detailConfig) {
      formRef.current?.setFieldsValue(detailConfig);
    }
  }, [detailConfig]);

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.reboot' })}
      headStyle={{ paddingBlock: 0 }}
      ref={sizeRef}
    >
      <Alert message={alertMessage} type="warning" showIcon className="mb-[24px]" />
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          try {
            modal.confirm({
              title: formatMessage({ id: 'system.tab.reboot' }),
              content: alertMessage,
              onOk: async () => {
                await postCronRebootUpdate(values);
                message.success(formatMessage({ id: 'system.message.success.scheduledReboot' }));
              },
              cancelText: formatMessage({ id: 'button.cancel' }),
              okText: formatMessage({ id: 'system.button.comfirmConfig' }),
            });
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
        }}
        layout={size && size?.width < 1000 ? 'vertical' : 'horizontal'}
        labelCol={size && size?.width < 1000 ? {} : { span: 3 }}
        initialValues={{ enable: false }}
        submitter={{
          render: (props, dom) => (
            <ProForm.Item
              labelCol={{ span: 3 }}
              label={<div className="invisible">action</div>}
              colon={false}
            >
              <div className="max-w-[552px] flex justify-end">
                <Space>{dom}</Space>
              </div>
            </ProForm.Item>
          ),
        }}
      >
        <ProFormSwitch
          name="enable"
          width="xl"
          label={formatMessage({ id: 'system.form.title.enableReboot' })}
          checkedChildren={formatMessage({ id: 'system.switch.checked' })}
          unCheckedChildren={formatMessage({ id: 'system.switch.unchecked' })}
          rules={[{ required: true }]}
        />
        <ProForm.Item
          name="cron_expr"
          label={formatMessage({ id: 'system.form.title.cronExpr' })}
          rules={[{ required: true, message: cronRules }]}
          tooltip={tooltip}
        >
          <AutoComplete
            options={[
              { label: formatMessage({ id: 'system.cronExpr.option1' }), value: '0 0 * * *' },
              { label: formatMessage({ id: 'system.cronExpr.option2' }), value: '33 3 * * *' },
              { label: formatMessage({ id: 'system.cronExpr.option3' }), value: '0 0 * * 0' },
              { label: formatMessage({ id: 'system.cronExpr.option4' }), value: '0 0 1 * *' },
              { label: formatMessage({ id: 'system.cronExpr.option5' }), value: '0 0 1 */3 *' },
            ]}
            style={{ width: 552 }}
            allowClear
            placeholder={cronRules}
          />
        </ProForm.Item>
      </ProForm>
    </ProCard>
  );
};

export default ScheduledReboot;
