import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import type { Rule } from 'antd/es/form';

type ModbusCRCProps = ProFormProps;

const ModbusCRC = (props: ModbusCRCProps) => {
  const { formatMessage } = useIntl();

  return (
    <ProForm
      initialValues={{ name: 'crc16little', args: '010300000001', code: '1747' }}
      submitter={false}
      {...props}
    >
      <ProFormSelect
        name="name"
        label={formatMessage({ id: 'plugin.form.title.ca' })}
        options={[
          { value: 'crc16big', label: formatMessage({ id: 'plugin.ca.big' }) },
          { value: 'crc16little', label: formatMessage({ id: 'plugin.ca.little' }) },
        ]}
        allowClear={false}
      />
      <ProFormText
        name="args"
        label={formatMessage({ id: 'plugin.form.title.hex' })}
        tooltip={formatMessage({ id: 'plugin.tooltip.hex' })}
        rules={[
          {
            validator: (_rule: Rule, value: string) => {
              if (!value) return Promise.resolve();

              const hexPattern = /^[0-9a-fA-F]+$/;
              const isValidHex = hexPattern.test(value);

              return isValidHex
                ? Promise.resolve()
                : Promise.reject(formatMessage({ id: 'plugin.form.placeholder.hex' }));
            },
          },
        ]}
      />
      <ProFormText name="code" label={formatMessage({ id: 'plugin.form.title.cv' })} disabled />
    </ProForm>
  );
};

export default ModbusCRC;
