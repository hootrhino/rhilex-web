import Collapse from '@/pages/Editor/components/Collapse';
import ColorOption from '@/pages/Editor/components/ColorOption';
import FormItem from '@/pages/Editor/components/FormItem';
import InputNumber from '@/pages/Editor/components/InputNumber';
import Segmented from '@/pages/Editor/components/Segmented';
import Select from '@/pages/Editor/components/Select';
import Slider from '@/pages/Editor/components/Slider';
import { cn, IconFont } from '@/utils/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import type { SegmentedValue } from 'antd/es/segmented';
import { useState } from 'react';
import Tooltip from '../../components/Tooltip';
import { colorOptions, nodeTitle } from '../constants';

const fontWeightOptions = [
  { label: '超细体', value: '200' },
  { label: '细体', value: '300' },
  { label: '常规体', value: '400' },
  { label: '中等', value: '500' },
  { label: '粗体', value: '700' },
  { label: '黑体', value: '900' },
];

const fontFamilyOptions = [
  { label: '阿里巴巴普惠体', value: 'AlibabaPuHuiTi' },
  { label: '钉钉进步体', value: 'DingTalk JinBuTi ' },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  { label: '黑体', value: 'SimHei' },
  { label: '苹方', value: 'PingFangSC' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Helvetica', value: 'Helvetica' },
];

const CommonStyle = () => {
  const { activeNodeShape, activeNodeQuickStyle } = useModel('useEditor');
  const [fontTheme, setTheme] = useState<SegmentedValue>('light');
  const [fontSize, setSize] = useState<SegmentedValue>('');
  const [activeStyle, setStyle] = useState<string>('');

  const fontThemeOptions = [
    {
      label: (
        <Tooltip title="暗色">
          <IconFont type={fontTheme === 'dark' ? 'icon-font-dark-active' : 'icon-font-dark'} />
        </Tooltip>
      ),
      value: 'dark',
    },
    {
      label: (
        <Tooltip title="亮色">
          <IconFont type={fontTheme === 'light' ? 'icon-font-light-active' : 'icon-font-light'} />
        </Tooltip>
      ),
      value: 'light',
    },
  ];

  const fontSizeOptions = [
    {
      label: (
        <Tooltip title="更大">
          <IconFont type={fontSize === 'up' ? 'icon-font-up-active' : 'icon-font-up'} />
        </Tooltip>
      ),
      value: 'up',
    },
    {
      label: (
        <Tooltip title="更小">
          <IconFont type={fontSize === 'down' ? 'icon-font-down-active' : 'icon-font-down'} />
        </Tooltip>
      ),
      value: 'down',
    },
  ];

  const quickStyleOptions = [
    {
      key: 'quickStyle',
      label: '快速样式',
      children: (
        <div className="relative">
          <div className="flex flex-wrap pl-[32px]">
            {activeNodeQuickStyle?.map((item) => (
              <>
                <div
                  key={item.key}
                  className="w-[86px] h-[47px] bg-[#242424] mr-[9px] mb-[8px] hover:bg-[#363636]"
                  onClick={() => setStyle(item.key)}
                >
                  <img src={item.value} className="w-full h-full object-cover" />
                </div>
                {activeStyle === item.key && (
                  <div
                    className={cn(
                      'box-border-thin',
                      'editor-box-shadow-4',
                      'absolute right-[350px] top-[-130px] w-[322px] bg-inputBg rounded-[4px]',
                    )}
                  >
                    <div className="py-[16px] px-[20px]">
                      <div className="text-[#F7F7F7] text-[16px] mb-[12px]">
                        {nodeTitle[activeNodeShape]}快速样式
                      </div>
                      <div className="text-baseColor text-base my-[6px]">
                        使用默认数据绘制的组件样式如下
                      </div>
                      <img src={item.value} className="w-full h-[158px] object-cover" />
                      <div className="text-baseColor text-base my-[6px]">
                        是否新增一个以默认数据渲染的组件？
                      </div>
                      <Space align="center" className="flex justify-end mt-[24px]">
                        <div
                          className="flex items-center h-[28px] leading-[28px] px-[12px] bg-[#474747] text-[#dbdbdb] text-base rounded-[4px] cursor-pointer hover:bg-[#565656]"
                          onClick={() => setStyle('')}
                        >
                          取消
                        </div>
                        <div
                          className="flex items-center h-[28px] leading-[28px] px-[12px] bg-primary text-[#fff] text-base rounded-[4px] cursor-pointer hover:bg-[#4281ff]"
                          onClick={() => {
                            // TODO
                          }}
                        >
                          试一试
                        </div>
                      </Space>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between pt-[10px] pb-[12px] pl-[32px] pr-[24px]">
        <div className="text-[16px] text-[#F7F7F7]">
          <span>{nodeTitle[activeNodeShape]}</span>
          <Tooltip title="查看组件文档">
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
          <div className="w-[37px] h-[28px] bg-inputBg rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#434343]">
            <IconFont type="icon-flip-v" />
          </div>
          <div className="w-[37px] h-[28px] bg-inputBg rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#434343]">
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

      {activeNodeQuickStyle?.length > 0 && (
        <Collapse
          defaultActiveKey="quickStyle"
          items={quickStyleOptions}
          className={cn('editor-divider-t')}
        />
      )}

      <div
        className={cn(
          'editor-shadow-outer-t',
          'editor-box-shadow-5',
          'pl-[32px] pr-[24px] pt-[1px]',
        )}
      >
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
              <Select className="w-[100px]" options={fontFamilyOptions} />
              <div className="text-[#7A7A7A] text-base mt-[-5px]">字体</div>
            </Space>
            <Space direction="vertical">
              <Select className="w-[100px]" options={fontWeightOptions} />
              <div className="text-[#7A7A7A] text-base mt-[-5px]">粗细</div>
            </Space>
          </Space>
          <Space align="start" className="mb-[6px]">
            <Space direction="vertical">
              <Segmented
                block
                className="w-[100px]"
                value={fontSize}
                options={fontSizeOptions}
                onChange={(value) => setSize(value)}
              />
              <div className="text-[#7A7A7A] text-base mt-[-5px]">字号</div>
            </Space>
            <Space direction="vertical">
              <Segmented
                block
                value={fontTheme}
                className="w-[100px]"
                options={fontThemeOptions}
                onChange={(value) => setTheme(value)}
              />
              <div className="text-[#7A7A7A] text-base mt-[-5px]">颜色</div>
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
