import { message } from '@/components/PopupHack';
import { getAlarmRuleDetail, postAlarmRuleTestRule } from '@/services/rhilex/yujingzhongxin';
import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useEffect, useRef } from 'react';

type TestRuleProps = ModalFormProps & {
  uuid: string;
};

const TestRule = ({ uuid, ...props }: TestRuleProps) => {
  const { formatMessage } = useIntl();
  const formRef = useRef<ProFormInstance>();

  // 告警详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getAlarmRuleDetailParams) => getAlarmRuleDetail(params),
    {
      manual: true,
      onSuccess: (res) =>
        formRef.current?.setFieldsValue({
          interval: formatMessage({ id: 'alarm.test.interval' }, { interval: res.interval }),
        }),
    },
  );

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  return (
    <ModalForm
      grid
      width="40%"
      formRef={formRef}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
      }}
      title={formatMessage({ id: 'alarm.rule.title.test' })}
      submitter={{
        searchConfig: {
          submitText: formatMessage({ id: 'alarm.rule.button.test' }),
        },
      }}
      onFinish={async (values) => {
        const { data } = await postAlarmRuleTestRule({
          expr: values.expr,
          data: JSON.parse(values.data),
        });
        if (data === 'SUCCESS') {
          message.success(data);
        } else {
          message.error(data);
        }

        return false;
      }}
      {...props}
    >
      <ProFormSelect
        required
        name="expr"
        label={`Expr ${formatMessage({ id: 'alarm.table.title.exprDefine.expr' })}`}
        placeholder={formatMessage({ id: 'alarm.form.placeholder.expr' })}
        fieldProps={{ allowClear: false }}
        options={detail?.exprDefine.map((item) => ({ label: item.eventType, value: item.expr }))}
      />
      <ProFormTextArea
        name="data"
        label={`JSON ${formatMessage({ id: 'alarm.table.title.testData' })}`}
        rules={[
          { required: true, message: formatMessage({ id: 'alarm.form.placeholder.testData' }) },
        ]}
      />
      <ProFormText
        readonly
        name="interval"
        label={formatMessage({ id: 'alarm.table.title.interval' })}
      />
    </ModalForm>
  );
};

export default TestRule;
