import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProFormSegmented } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

type ProSegmentedProps = ProFormFieldProps;

const ProSegmented = (props: ProSegmentedProps) => {
  const { formatMessage } = useIntl();

  return (
    <ProFormSegmented
      valueEnum={{
        true: formatMessage({ id: 'status.enabled' }),
        false: formatMessage({ id: 'status.disabled' }),
      }}
      fieldProps={{ block: true, className: 'pro-form-segmented' }}
      {...props}
    />
  );
};

export default ProSegmented;
