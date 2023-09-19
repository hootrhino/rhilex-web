import Collapse from '@/components/Collapse';
import ColorOption from '@/components/ColorOption';
import InputNumber from '@/components/InputNumber';
import type { StyleItem } from '@/components/QuickStyleBox';
import QuickStyleBox from '@/components/QuickStyleBox';
import Segmented from '@/components/Segmented';
import Select from '@/components/Select';
import Slider from '@/components/Slider';
import { cn, IconFont } from '@/utils/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import type { SegmentedValue } from 'antd/es/segmented';
import { useEffect, useState } from 'react';
import { colorOptions, nodeTitle } from '../constants';
import FormItem from '../FormItem';
import charts from '../images';

type CommonStyleProps = {
  shape: string;
};

const CommonStyle = ({ shape }: CommonStyleProps) => {
  const [fontTheme, setTheme] = useState<SegmentedValue>('light');
  const [fontSize, setSize] = useState<SegmentedValue>('');
  const [styleOptions, setOptions] = useState<StyleItem[]>([]);

  useEffect(() => {
    setOptions(charts[shape]);
  }, [shape]);

  return (
    <div className="">
      <div className="flex items-center justify-between pt-[10px] pb-[12px] pl-[32px] pr-[24px]">
        <div className="text-[16px] text-[#F7F7F7]">
          <span>{nodeTitle[shape]}</span>
          <Tooltip title="查看组件文档" color="#1F6AFF">
            <FileTextOutlined style={{ fontSize: 14, paddingLeft: 5, cursor: 'pointer' }} />
          </Tooltip>
        </div>
        <Segmented options={['基础', '全量']} defaultValue="基础" />
      </div>
      <Space align="center" className="py-[6px] pl-[32px] pr-[24px]">
        <InputNumber addonBefore="X" padding={3} />
        <InputNumber addonBefore="Y" padding={3} />
        <InputNumber addonBefore="Z" padding={3} defaultValue={0} />
      </Space>
      <Space align="center" className="py-[6px] pl-[32px] pr-[24px]">
        <InputNumber addonBefore="W" padding={3} />
        <InputNumber addonBefore="H" padding={3} />
        <Space align="center">
          <div className="w-[37px] h-[28px] bg-[#333] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#434343]">
            <IconFont type="icon-flip-v" />
          </div>
          <div className="w-[37px] h-[28px] bg-[#333] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#434343]">
            <IconFont type="icon-flip-h" />
          </div>
        </Space>
      </Space>
      <Space align="center" className="py-[6px] pl-[32px] pr-[24px]">
        <FormItem label="不透明度" span={6}>
          <Space>
            <Slider min={0} max={1} className="w-[130px]" defaultValue={1} step={0.1} />
            <InputNumber min={0} max={1} className="w-[65px]" defaultValue={1} padding={3} />
          </Space>
        </FormItem>
      </Space>
      {styleOptions?.length > 0 && (
        <Collapse
          defaultActiveKey="quickStyle"
          items={[
            {
              key: 'quickStyle',
              label: '快速样式',
              children: <QuickStyleBox options={styleOptions} className="pl-[32px]" />,
            },
          ]}
          className="collapse-wrapper"
        />
      )}

      <div className={cn('chart-setting-wrapper', 'pl-[32px] pr-[24px]')}>
        <FormItem label="图表颜色" span={6} className="mt-[16px] mb-[12px]">
          <Select
            optionHeight={16}
            options={colorOptions?.map((item) => ({
              label: <ColorOption colors={item.colors} />,
              value: item.value,
            }))}
          />
        </FormItem>
        <FormItem label="图表文字" span={6} align="top">
          <Space align="start" className="mb-[12px]">
            <Space direction="vertical">
              <Select
                className="w-[100px]"
                options={[
                  { label: '微软雅黑', value: '1' },
                  { label: '黑体', value: '2' },
                  { label: 'Arial', value: '3' },
                ]}
              />
              <div className="text-[#7A7A7A] text-[12px] mt-[-5px]">字体</div>
            </Space>
            <Space direction="vertical">
              <Select
                className="w-[100px]"
                options={[
                  { label: '超细体', value: '1' },
                  { label: '细体', value: '2' },
                  { label: '常规体', value: '3' },
                  { label: '中等', value: '4' },
                  { label: '粗体', value: '5' },
                  { label: '黑体', value: '6' },
                ]}
              />
              <div className="text-[#7A7A7A] text-[12px] mt-[-5px]">粗细</div>
            </Space>
          </Space>
          <Space align="start" className="mb-[6px]">
            <Space direction="vertical">
              <Segmented
                block
                className="w-[100px]"
                value={fontSize}
                options={[
                  {
                    label: (
                      <Tooltip title="更大" color="#4281ff">
                        <IconFont
                          type={fontSize === 'up' ? 'icon-font-up-active' : 'icon-font-up'}
                        />
                      </Tooltip>
                    ),
                    value: 'up',
                  },
                  {
                    label: (
                      <Tooltip title="更小" color="#4281ff">
                        <IconFont
                          type={fontSize === 'down' ? 'icon-font-down-active' : 'icon-font-down'}
                        />
                      </Tooltip>
                    ),
                    value: 'down',
                  },
                ]}
                onChange={(value) => setSize(value)}
              />
              <div className="text-[#7A7A7A] text-[12px] mt-[-5px]">字号</div>
            </Space>
            <Space direction="vertical">
              <Segmented
                block
                value={fontTheme}
                className="w-[100px]"
                options={[
                  {
                    label: (
                      <Tooltip title="暗色" color="#4281ff">
                        <IconFont
                          type={fontTheme === 'dark' ? 'icon-font-dark-active' : 'icon-font-dark'}
                        />
                      </Tooltip>
                    ),
                    value: 'dark',
                  },
                  {
                    label: (
                      <Tooltip title="亮色" color="#4281ff">
                        <IconFont
                          type={
                            fontTheme === 'light' ? 'icon-font-light-active' : 'icon-font-light'
                          }
                        />
                      </Tooltip>
                    ),
                    value: 'light',
                  },
                ]}
                onChange={(value) => setTheme(value)}
              />
              <div className="text-[#7A7A7A] text-[12px] mt-[-5px]">颜色</div>
            </Space>
          </Space>
        </FormItem>
        <FormItem label="图表信息" span={6} className="mt-[6px]">
          <Segmented
            block
            options={['简单', '通用', '详细']}
            defaultValue="通用"
            className="w-full"
          />
        </FormItem>
      </div>
    </div>
  );
};

export default CommonStyle;
