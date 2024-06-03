import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';

type EnhancedProDescriptionsProps = ProDescriptionsProps & {
  labelWidth?: number;
};

export type EnhancedProDescriptionsItemProps = ProDescriptionsItemProps<Record<string, any>>;

const EnhancedProDescriptions = ({
  loading = false,
  column,
  labelWidth,
  ...props
}: EnhancedProDescriptionsProps) => {
  return (
    <ProDescriptions
      labelStyle={{ justifyContent: 'flex-end', minWidth: labelWidth ? labelWidth : 135 }}
      loading={loading}
      column={column || 1}
      {...props}
    />
  );
};

export default EnhancedProDescriptions;
