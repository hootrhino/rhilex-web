import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, ConfigProvider } from 'antd';

const EditorCollapse = (props: CollapseProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            contentBg: '#1A1A1A',
            contentPadding: 0,
            headerBg: '#1A1A1A',
            headerPadding: 0,
          },
        },
      }}
    >
      <Collapse
        bordered={false}
        expandIconPosition="end"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        {...props}
      />
    </ConfigProvider>
  );
};

export default EditorCollapse;
