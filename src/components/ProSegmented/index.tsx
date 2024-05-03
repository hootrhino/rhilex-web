import { useIntl } from '@umijs/max';
import type { SegmentedProps } from 'antd';
import { ConfigProvider, Segmented } from 'antd';

type ProSegmentedProps = Omit<SegmentedProps, 'options'> & {
  width: 'sm' | 'md' | 'xl' | 'xs' | 'lg';
};

const ProSegmented = ({ width, ...props }: ProSegmentedProps) => {
  const { formatMessage } = useIntl();

  const getWidth = () => {
    let w = 328;

    switch (width) {
      case 'xs':
        w = 104;
        break;
      case 'sm':
        w = 216;
        break;
      case 'md':
        w = 328;
        break;
      case 'xl':
        w = 440;
        break;
      case 'lg':
        w = 552;
        break;
      default:
        w = 328;
        break;
    }

    return w;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedColor: '#fff',
            itemSelectedBg: '#1890ff',
          },
        },
      }}
    >
      <Segmented
        block
        style={{ width: getWidth() }}
        options={[
          { label: formatMessage({ id: 'status.open' }), value: 'true' },
          { label: formatMessage({ id: 'status.close' }), value: 'false' },
        ]}
        {...props}
      />
    </ConfigProvider>
  );
};

export default ProSegmented;
