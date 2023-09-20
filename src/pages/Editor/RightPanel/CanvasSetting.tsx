import { cn, IconFont } from '@/utils/utils';

import InputNumber from '@/pages/Editor/components/InputNumber';
import Slider from '@/pages/Editor/components/Slider';
import { Col, ColorPicker, Row, Space, Tooltip } from 'antd';
import { useState } from 'react';
import FormItem from './FormItem';
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
          'right-panel-tabs',
          'flex justify-center items-center h-[40px] text-[#dbdbdb] text-[12px]',
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
          <ColorPicker
            value="#262626"
            size="middle"
            showText
            className={cn(
              'canvas-color-picker',
              'w-full h-[30px] bg-[#333] border-[#333] justify-start rounded-[4px] hover:border-transparent hover:bg-[#434343]',
            )}
          />
        </FormItem>
        <FormItem label="缩放方式" className="mb-[10px]">
          <div className="w-full h-[30px] bg-[#333] flex items-center justify-around rounded-[4px]">
            {ZoomTypeList.map((item) => (
              <Tooltip key={item.key} title={item.tooltip} color="#1F6AFF">
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
            <div className="w-[88px] h-[24px] leading-[24px] bg-[#333] border-[#333] text-[#adadad] text-[12px] text-center cursor-pointer rounded-[4px] hover:bg-[#434343]">
              截取封面
            </div>
            <div className="w-[88px] h-[24px] leading-[24px] bg-[#333] border-[#333] text-[#adadad] text-[12px] text-center cursor-pointer rounded-[4px] hover:bg-[#434343]">
              上传封面
            </div>
          </Space>
        </FormItem>
        <Row>
          <Col span={16} offset={8}>
            <div className="w-full h-[90px] bg-[#333]"></div>
            <span className="text-[#7A7A7A] text-[12px]">*封面缩略图</span>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CanvasSetting;
