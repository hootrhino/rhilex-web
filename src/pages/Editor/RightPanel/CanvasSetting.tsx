import { cn, IconFont } from '@/utils/utils';

import ColorPickerInput from '@/pages/Editor/components/ColorPickerInput';
import FormItem from '@/pages/Editor/components/FormItem';
import InputNumber from '@/pages/Editor/components/InputNumber';
import Slider from '@/pages/Editor/components/Slider';
import Tooltip from '@/pages/Editor/components/Tooltip';

import { Col, Row, Space } from 'antd';
import { useState } from 'react';

import './index.less';

const ZoomTypeList = [
  {
    icon: 'icon-fit-width',
    tooltip: '等比宽度铺满可滚动',
    key: 'fitWidth',
  },
  {
    icon: 'icon-fit-height',
    tooltip: '等比高度铺满居中',
    key: 'fitHeight',
  },
  {
    icon: 'icon-bg-full-screen',
    tooltip: '全屏铺满',
    key: 'fullScreen',
  },
  {
    icon: 'icon-scroll',
    tooltip: '等比高度铺满可滚动',
    key: 'scroll',
  },
  {
    icon: 'icon-center',
    tooltip: '居中',
    key: 'center',
  },
  {
    icon: 'icon-disabled',
    tooltip: '不缩放',
    key: 'none',
  },
];

const CanvasSetting = () => {
  const [zoomType, setZoomType] = useState<string>('fitWidth');

  return (
    <div className="h-full w-[332px]">
      <div
        className={cn(
          'editor-divider-b',
          'flex justify-center items-center h-[40px] text-[#dbdbdb] text-base',
        )}
      >
        页面设置
      </div>
      <div className="pl-[32px] pr-[24px] pt-[16px]">
        <FormItem label="尺寸" className="mb-[10px]">
          <Space>
            <InputNumber defaultValue={1920} min={0} addonBefore="W" padding={3} />
            <InputNumber defaultValue={1080} min={0} addonBefore="H" padding={3} />
          </Space>
        </FormItem>
        <FormItem label="不透明度" className="mb-[10px]">
          <Space align="center">
            <Slider min={0} max={1} className="w-[100px]" defaultValue={1} step={0.1} />
            <InputNumber min={0} max={1} className="w-[65px]" defaultValue={1} padding={3} />
          </Space>
        </FormItem>
        <FormItem label="背景" className="mb-[10px]">
          <ColorPickerInput value="#262626" />
        </FormItem>
        <FormItem label="缩放方式" className="mb-[10px]">
          <div className="w-full h-[30px] bg-inputBg flex items-center justify-around rounded-[4px]">
            {ZoomTypeList.map((item) => (
              <Tooltip key={item.key} title={item.tooltip}>
                <IconFont
                  type={item.icon}
                  className={
                    item.key === zoomType
                      ? 'bg-[#5C5C5C] h-[20px] px-[4px]'
                      : 'bg-transparent h-[20px] px-[4px]'
                  }
                  onClick={() => setZoomType(item.key)}
                />
              </Tooltip>
            ))}
          </div>
        </FormItem>
        <FormItem label="缩略图" className="mb-[10px]">
          <Space align="center">
            <div className="w-[88px] h-[24px] leading-[24px] bg-inputBg border-[#333] text-baseColor text-base text-center cursor-pointer rounded-[4px] hover:bg-[#434343]">
              截取封面
            </div>
            <div className="w-[88px] h-[24px] leading-[24px] bg-inputBg border-[#333] text-baseColor text-base text-center cursor-pointer rounded-[4px] hover:bg-[#434343]">
              上传封面
            </div>
          </Space>
        </FormItem>
        <Row>
          <Col span={16} offset={8}>
            <div className="w-full h-[90px] bg-inputBg"></div>
            <span className="text-[#7A7A7A] text-base">*封面缩略图</span>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CanvasSetting;
