import { cn } from '@/utils/utils';

import { Input, InputNumber, Slider, Space } from 'antd';
import FormItem from './FormItem';
import './index.less';

const CanvasSetting = () => {
  return (
    <div className="h-full w-[332px]">
      <div
        className={cn(
          'right-panel-tabs',
          'flex justify-center items-center h-[40px] text-[#dbdbdb] text-[12px]',
        )}
      >
        页面设置
      </div>
      <div className="pl-[32px] pr-[24px] pt-[16px]">
        <FormItem label="尺寸" className="mb-[10px]">
          <Space>
            <InputNumber
              defaultValue={1920}
              min={0}
              addonBefore="W"
              size="small"
              bordered={false}
              rootClassName="canvas-input"
            />
            <InputNumber
              defaultValue={1080}
              min={0}
              addonBefore="H"
              size="small"
              bordered={false}
              rootClassName="canvas-input"
            />
          </Space>
        </FormItem>
        <FormItem label="不透明度" className="mb-[10px]">
          <Space align="center">
            <Slider
              min={0}
              max={1}
              className="w-[100px]"
              defaultValue={1}
              step={0.1}
              railStyle={{ background: '#5C5C5C', height: 2 }}
              trackStyle={{ background: '#dbdbdb', height: 2 }}
            />

            <InputNumber
              min={0}
              max={1}
              size="small"
              className={cn('canvas-input', 'w-[65px]')}
              defaultValue={1}
            />
          </Space>
        </FormItem>
        <FormItem label="背景" className="mb-[10px]">
          <Input />
        </FormItem>
        <FormItem label="缩放方式" className="mb-[10px]">
          <Input />
        </FormItem>
        <FormItem label="缩略图" className="mb-[10px]">
          <Input />
        </FormItem>
      </div>
    </div>
  );
};
export default CanvasSetting;
