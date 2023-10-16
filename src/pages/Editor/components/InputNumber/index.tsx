import type { InputNumberProps } from 'antd';
import { ConfigProvider, InputNumber } from 'antd';

const EditorInputNumber = ({ padding = 4, ...props }: InputNumberProps & { padding?: number }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            paddingBlock: padding,
          },
        },
      }}
    >
      <InputNumber size="middle" bordered={false} rootClassName="editor-input" {...props} />
    </ConfigProvider>
  );
};

export default EditorInputNumber;
