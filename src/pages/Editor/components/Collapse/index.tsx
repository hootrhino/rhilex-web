import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, ConfigProvider } from 'antd';

type EditorCollapseProps = CollapseProps & {
  headerPadding?: string;
  headerMarginRight?: number;
}

const EditorCollapse = ({headerPadding = '0px 0px 0px 0px', headerMarginRight = 0, ...props}: EditorCollapseProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            contentBg: '#1A1A1A',
            contentPadding: 0,
            headerBg: '#1A1A1A',
            headerPadding: headerPadding,
          },
        },
      }}
    >
      <Collapse
        bordered={false}
        expandIconPosition="end"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} style={{marginRight: headerMarginRight}} />}
        {...props}
      />
    </ConfigProvider>
  );
};

export default EditorCollapse;
