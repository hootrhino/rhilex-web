import type { SliderSingleProps } from 'antd';
import { ConfigProvider, Slider } from 'antd';

const EditorSlider = (props: SliderSingleProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            handleColor: '#dbdbdb',
            handleActiveColor: '#dbdbdb',
            handleLineWidthHover: 2,
            handleSizeHover: 10,
            trackBg: '#dbdbdb',
            railBg: '#5C5C5C',
            railSize: 2,
            railHoverBg: 'none',
            trackHoverBg: 'none',
          },
        },
      }}
    >
      <Slider tooltip={{ open: false }} rootClassName="editor-slider" {...props} />
    </ConfigProvider>
  );
};

export default EditorSlider;
