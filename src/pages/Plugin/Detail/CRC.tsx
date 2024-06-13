import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { getIntl, getLocale } from '@umijs/max';
import type { Rule } from 'antd/es/form';

const intl = getIntl(getLocale());

const ModbusCRC = () => {
  return (
    <>
      <ProFormSelect
        name="name"
        label={intl.formatMessage({ id: 'plugin.form.title.ca' })}
        options={[
          { value: 'crc16big', label: intl.formatMessage({ id: 'plugin.ca.big' }) },
          { value: 'crc16little', label: intl.formatMessage({ id: 'plugin.ca.little' }) },
        ]}
        allowClear={false}
      />
      <ProFormText
        name="args"
        label={intl.formatMessage({ id: 'plugin.form.title.hex' })}
        tooltip={intl.formatMessage({ id: 'plugin.tooltip.hex' })}
        rules={[
          {
            validator: (_rule: Rule, value: string) => {
              if (!value) return Promise.resolve();

              const hexPattern = /^[0-9a-fA-F]+$/;
              const isValidHex = hexPattern.test(value);

              return isValidHex
                ? Promise.resolve()
                : Promise.reject(intl.formatMessage({ id: 'plugin.form.placeholder.hex' }));
            },
          },
        ]}
      />
      <ProFormText
        name="code"
        label={intl.formatMessage({ id: 'plugin.form.title.cv' })}
        disabled
      />
    </>
  );
};

export default ModbusCRC;
