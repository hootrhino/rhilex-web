import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';

import './index.less';

const EditorInputNumber = (props: InputNumberProps) => {
  return <InputNumber size="small" bordered={false} rootClassName="editor-input" {...props} />;
};

export default EditorInputNumber;
