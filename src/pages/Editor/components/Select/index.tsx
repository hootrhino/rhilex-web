import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';

import { cn } from '@/utils/utils';
import './index.less';

type EditorSelectProps = SelectProps & {
  paddingY?: number;
  optionHeight?: number;
};

const EditorSelect = ({ paddingY, optionHeight = 32, className, ...props }: EditorSelectProps) => {
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
            optionPadding: paddingY ? `${paddingY}px 12px` : '5px 12px',
            optionHeight: optionHeight,
          },
        },
      }}
    >
      <Select
        dropdownStyle={{ backgroundColor: '#333' }}
        className={cn('w-full h-full', className)}
        {...props}
      />
    </ConfigProvider>
  );
};

export default EditorSelect;
