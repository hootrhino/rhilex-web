import { cn, IconFont } from '@/utils/utils';

import ColorPickerInput from '@/pages/Editor/components/ColorPickerInput';
import FormItem from '@/pages/Editor/components/FormItem';
import InputNumber from '@/pages/Editor/components/InputNumber';
import Slider from '@/pages/Editor/components/Slider';
import Tooltip from '@/pages/Editor/components/Tooltip';

import { Col, Image, Row, Space, Upload } from 'antd';

import { message } from '@/components/PopupHack';
import { CanvasBgColor } from '@/models/useEditor';
import { postVisualThumbnail, putVisualUpdate } from '@/services/rulex/dapingguanli';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, fallback } from '@/utils/constant';
import { useModel, useRequest } from '@umijs/max';
import type { RcFile } from 'antd/es/upload';
import { startsWith } from 'lodash';
import { useEffect, useState } from 'react';
import { ZoomTypeList } from './constants';
import { Update } from '@/pages/ScreenMgt/components/GroupDetail';

const CanvasSetting = () => {
  const { canvasConfig, setConfig, detail } = useModel('useEditor');
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);

  const handleOnChange = (key: string, value: number | string | CanvasBgColor) => {
    setConfig({ ...canvasConfig, [key]: value });
  };

  // 更新大屏缩略图
  const { run: update } = useRequest(
    (params: Update & { uuid: string }) => putVisualUpdate(params),
    {
      manual: true,
    },
  );

  // TODO 截取封面

  // 上传封面
  const { run: upload } = useRequest((file) => postVisualThumbnail({}, file), {
    manual: true,
    onSuccess: (res) => {
      const env = process.env.NODE_ENV;
      const host = env === 'development' ? '106.15.225.172' : window?.location?.hostname;

      if (res?.url) {
        const imageUrl = `http://${host}:2580/api/v1/visual/thumbnail?fileName=${res?.url}`;
        handleOnChange('thumbnail', imageUrl);
        update({...detail, thumbnail: imageUrl});
      }
    },
  });

  const handleOnBeforeUpload = (file: RcFile) => {
    const isImage = startsWith(file.type, 'image/');
    if (!isImage) {
      message.error('仅支持图片格式文件，请检查上传文件格式');
    }

    return isImage || Upload.LIST_IGNORE;
  };

 useEffect(() => {

  if (detail?.thumbnail) {
    console.log({...CanvasSetting, thumbnail: detail?.thumbnail});
   // setConfig({...CanvasSetting, thumbnail: detail?.thumbnail})
  }
 }, [detail])

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
            <InputNumber
              value={canvasConfig.width}
              min={0}
              addonBefore="W"
              padding={3}
              onChange={(value) => setWidth(Number(value))}
              onBlur={() => handleOnChange('width', width)}
            />
            <InputNumber
              value={canvasConfig.height}
              min={0}
              addonBefore="H"
              padding={3}
              onChange={(value) => setHeight(Number(value))}
              onBlur={() => handleOnChange('height', height)}
            />
          </Space>
        </FormItem>
        <FormItem label="不透明度" className="mb-[10px]">
          <Space align="center">
            <Slider
              min={0}
              max={1}
              className="w-[100px]"
              value={canvasConfig.opacity}
              step={0.1}
              onChange={(value) => {
                handleOnChange('opacity', value);
              }}
            />
            <InputNumber
              min={0}
              max={1}
              className="w-[65px]"
              value={canvasConfig.opacity}
              padding={3}
              step={0.1}
              onChange={(value) => handleOnChange('opacity', Number(value))}
            />
          </Space>
        </FormItem>
        <FormItem label="背景" className="mb-[10px]">
          <ColorPickerInput
            value={`rgb(${canvasConfig?.color?.r},${canvasConfig?.color?.g}, ${canvasConfig?.color?.b})`}
            onChange={(value) => {
              handleOnChange('color', value.toRgb() as CanvasBgColor);
            }}
          />
        </FormItem>
        <FormItem label="缩放方式" className="mb-[10px]">
          <div className="w-full h-[30px] bg-inputBg flex items-center justify-around rounded-[4px]">
            {ZoomTypeList.map((item) => (
              <Tooltip key={item.key} title={item.tooltip}>
                <IconFont
                  type={item.icon}
                  className={
                    item.key === canvasConfig.zoomType
                      ? 'bg-[#5C5C5C] h-[20px] px-[4px]'
                      : 'bg-transparent h-[20px] px-[4px]'
                  }
                  onClick={() => handleOnChange('zoomType', item.key)}
                />
              </Tooltip>
            ))}
          </div>
        </FormItem>
        <FormItem label="缩略图" className="mb-[10px]">
          <Space align="center">
            <div className="w-[88px] h-[24px] leading-[24px] bg-[#333] text-[#7a7a7a] text-base text-center cursor-not-allowed rounded-[4px]">
              截取封面
            </div>
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              beforeUpload={handleOnBeforeUpload}
              onChange={({ file }) => {
                if (file?.status === 'done') {
                  const blob = new Blob([file.originFileObj], { type: file.type });
                  upload(blob);
                }
              }}
            >
              <div className="w-[88px] h-[24px] leading-[24px] bg-[#474747] text-[#dbdbdb] text-base text-center cursor-pointer rounded-[4px] hover:bg-[#565656]">
                上传封面
              </div>
            </Upload>
          </Space>
        </FormItem>
        <Row>
          <Col span={16} offset={8}>
            <div className="w-full h-[90px] bg-inputBg">
              {canvasConfig?.thumbnail && (
                <Image
                  width="100%"
                  height="100%"
                  src={canvasConfig?.thumbnail}
                  fallback={fallback}
                />
              )}
            </div>
            <span className="text-[#7A7A7A] text-base">*封面缩略图</span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CanvasSetting;
