import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';

import './index.less';

const EditorSelect = (props: SelectProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: '#333',
            colorBorder: '#333',
            optionSelectedBg: '#434343',
            optionSelectedColor: '#dbdbdb',
            optionFontSize: 12,
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
    >
      <Select dropdownStyle={{ backgroundColor: '#333' }} {...props} />
    </ConfigProvider>
  );
};

export default EditorSelect;
