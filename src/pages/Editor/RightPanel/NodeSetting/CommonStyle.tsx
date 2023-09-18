import Collapse from '@/components/Collapse';
import ColorOption from '@/components/ColorOption';
import InputNumber from '@/components/InputNumber';
import Segmented from '@/components/Segmented';
import Select from '@/components/Select';
import Slider from '@/components/Slider';
import { cn, IconFont } from '@/utils/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import FormItem from '../FormItem';

const colorOptions = [
  {
    label: (
      <ColorOption
        colors={['#85A5FF', '#597EF7', '#2F54EB', '#1D39C4', '#10239E', '#061178', '#030852']}
      />
    ),
    value: '1',
  },
  {
    label: (
      <ColorOption

        colors={['#5CDBD3', '#36CFC9', '#13C2C2', '#08979C', '#006D75', '#00474F', '#002329']}
      />
    ),
    value: '2',
  },
  {
    label: (
      <ColorOption
        colors={['#B37FEB', '#9254DE', '#722ED1', '#531DAB', '#391085', '#22075E', '#120338']}
      />
    ),
    value: '3',
  },
  {
    label: (
      <ColorOption
        colors={['#FFC069', '#FFA940', '#FA8C16', '#D46B08', '#AD4E00', '#873800', '#612500']}
      />
    ),
    value: '4',
  },
  {
    label: (
      <ColorOption
        colors={['#D4D2C5', '#76745D', '#A2B986', '#7E8949', '#506542', '#719077', '#8F918C']}
      />
    ),
    value: '5',
  },
  {
    label: (
      <ColorOption
        colors={['#A53A4C', '#AB9E8E', '#D7BA94', '#A2394B', '#AEA190', '#363439', '#F5D5C0']}
      />
    ),
    value: '6',
  },
  {
    label: (
      <ColorOption
        colors={['#D6E7EE', '#95C7D8', '#0187BA', '#014478', '#588998', '#53B6C3', '#031A44']}
      />
    ),
    value: '7',
  },
  {
    label: (
      <ColorOption
        colors={['#3B8282', '#F3634A', '#D1C0B2', '#326D8E', '#ED303C', '#FE9D59', '#FBD18A']}
      />
    ),
    value: '8',
  },
  {
    label: (
      <ColorOption
        colors={['#1C81FF', '#4FB656', '#F96801', '#3DFCD9', '#FBE947', '#1DCFFF', '#725CFA']}
      />
    ),
    value: '9',
  },
];

const CommonStyle = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between pt-[10px] pb-[12px] pl-[32px] pr-[24px]">
        <div className="text-[16px] text-[#F7F7F7]">
          <span>水波图</span>
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
        <div className="text-[#DBDBDB] w-[56px]">不透明度</div>
        <Slider min={0} max={1} className="w-[130px]" defaultValue={1} step={0.1} />
        <InputNumber min={0} max={1} className="w-[65px]" defaultValue={1} padding={3} />
      </Space>
      <Collapse
        items={[
          {
            key: '1',
            label: '快速样式',
            children: <p>111</p>,
          },
        ]}
        className="collapse-wrapper"
      />
      <div className={cn('chart-setting-wrapper', 'pl-[32px] pr-[24px]')}>
        <FormItem label="图表颜色" span={6} className="mt-[16px] mb-[12px]">
          <Select options={colorOptions} />
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
                options={[
                  {
                    label: (
                      <Tooltip title="更大" color="#4281ff">
                        111
                      </Tooltip>
                    ),
                    value: 'bigger',
                  },
                  {
                    label: (
                      <Tooltip title="更小" color="#4281ff">
                        222
                      </Tooltip>
                    ),
                    value: 'smaller',
                  },
                ]}
                className="w-[100px]"
                block
              />
              <div className="text-[#7A7A7A] text-[12px] mt-[-5px]">字号</div>
            </Space>
            <Space direction="vertical">
              <Segmented
                options={[
                  {
                    label: (
                      <Tooltip title="暗色" color="#4281ff">
                        111
                      </Tooltip>
                    ),
                    value: 'bigger',
                  },
                  {
                    label: (
                      <Tooltip title="亮色" color="#4281ff">
                        222
                      </Tooltip>
                    ),
                    value: 'smaller',
                  },
                ]}
                className="w-[100px]"
                block
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
