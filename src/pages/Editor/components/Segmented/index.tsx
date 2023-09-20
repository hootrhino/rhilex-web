import type { SegmentedProps } from 'antd';
import { ConfigProvider, Segmented } from 'antd';

import './index.less';

const EditorSegmented = ({ className, ...props }: Omit<SegmentedProps, 'ref'>) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedColor: '#F7F7F7',
            itemHoverColor: '#7A7A7A',
            itemSelectedBg: '#5C5C5C',
            itemHoverBg: 'rgba(255, 255, 255, 0.08)',
          },
        },
      }}
    >
      <Segmented size="small" className={className} {...props} />
    </ConfigProvider>
  );
};

export default EditorSegmented;
