import Collapse from '@/components/Collapse';
import InputNumber from '@/components/InputNumber';
import Segmented from '@/components/Segmented';
import Slider from '@/components/Slider';
import { IconFont } from '@/utils/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';

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
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: '快速样式',
            children: <p>111</p>,
          },
        ]}
        className="collapse-wrapper"
      />
      <div className="chart-setting-wrapper">111</div>
    </div>
  );
};

export default CommonStyle;
