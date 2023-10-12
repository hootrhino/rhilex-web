import { cn, IconFont } from '@/utils/utils';

import ColorPickerInput from '@/pages/Editor/components/ColorPickerInput';
import FormItem from '@/pages/Editor/components/FormItem';
import InputNumber from '@/pages/Editor/components/InputNumber';
import Slider from '@/pages/Editor/components/Slider';
import Tooltip from '@/pages/Editor/components/Tooltip';

import { Col, Image, Row, Space } from 'antd';
import { useState } from 'react';

import { DEFAULT_CONFIG, ZoomTypeList } from './constants';

type CanvasConfig = {
  zoomType: string;
  thumbnail?: string;
  width: number;
  height: number;
  opacity: number;
  color: string;
};

const CanvasSetting = () => {
  const [canvasConfig, setConfig] = useState<CanvasConfig>(DEFAULT_CONFIG);

  // 截取封面
  const handleOnCapture = async () => {
    // TODO 截取封面
  };

  // 上传封面
  const handleOnUpload = () => {
    // TODO 上传封面
  };

  const handleOnChange = (key: string, value: number | string) => {
    setConfig({ ...canvasConfig, [key]: value });
  };

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
              onChange={(value) => handleOnChange('width', Number(value))}
            />
            <InputNumber
              value={canvasConfig.height}
              min={0}
              addonBefore="H"
              padding={3}
              onChange={(value) => handleOnChange('height', Number(value))}
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
              onChange={(value) => handleOnChange('opacity', value)}
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
            value={canvasConfig.color}
            onChange={(_, hex) => handleOnChange('color', hex)}
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
            <div
              className="w-[88px] h-[24px] leading-[24px] bg-inputBg border-[#333] text-baseColor text-base text-center cursor-pointer rounded-[4px] hover:bg-[#434343]"
              onClick={handleOnCapture}
            >
              截取封面
            </div>
            <div
              className="w-[88px] h-[24px] leading-[24px] bg-inputBg border-[#333] text-baseColor text-base text-center cursor-pointer rounded-[4px] hover:bg-[#434343]"
              onClick={handleOnUpload}
            >
              上传封面
            </div>
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
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
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
