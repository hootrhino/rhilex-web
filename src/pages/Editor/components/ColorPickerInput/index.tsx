import type { ColorPickerProps } from 'antd';
import { ColorPicker } from 'antd';

type ColorPickerInputProps = ColorPickerProps;

const ColorPickerInput = ({ value, ...props }: ColorPickerInputProps) => {
  return (
    <ColorPicker
      value={value}
      size="middle"
      showText
      className="w-full h-[30px] bg-inputBg border-0 justify-start rounded-[4px] hover:border-transparent hover:bg-[#434343]"
      rootClassName="editor-color-picker"
      {...props}
    />
  );
};

export default ColorPickerInput;
