import { useIntl } from '@umijs/max';
import { ConfigProvider, Segmented, SegmentedProps } from 'antd';

type ProSegmentedProps = Omit<SegmentedProps, 'options'>;

const ProSegmented = (props: ProSegmentedProps) => {
  const { formatMessage } = useIntl();

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: '#1890ff',
            itemSelectedColor: '#fff',
          },
        },
      }}
    >
      <Segmented
        {...props}
        options={[
          { label: formatMessage({ id: 'status.enabled' }), value: 'true' },
          { label: formatMessage({ id: 'status.disabled' }), value: 'false' },
        ]}
        block
      />
    </ConfigProvider>
  );
};

export default ProSegmented;
