import { cn, IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useState } from 'react';
import pointImg2 from '@/assets/images/point/point2.png';

import './index.less';

const tabList = [
  {
    key: 'charts',
    icon: 'icon-charts',
    name: '图表',
  },
  {
    key: 'map',
    icon: 'icon-map',
    name: '地图',
  },
  {
    key: 'text',
    icon: 'icon-text',
    name: '信息',
  },
  {
    key: 'table',
    icon: 'icon-table',
    name: '表格',
  },
  {
    key: 'widget',
    icon: 'icon-widget',
    name: '控件',
  },
  {
    key: 'multimedia',
    icon: 'icon-multimedia',
    name: '媒体',
  },
  {
    key: 'other',
    icon: 'icon-other',
    name: '其他',
  },
];

const chartsList = [
  { key: 'all', value: '全部' },
  { key: 'interval', value: '柱状图' },
  { key: 'bar', value: '条形图' },
  { key: 'line', value: '折线图' },
  { key: 'area', value: '区域图' },
  { key: 'pie', value: '饼环图' },
  { key: 'scatterplot', value: '散点图' },
  { key: 'radar', value: '雷达图' },
  { key: 'relation', value: '关系图' },
  { key: 'other', value: '其他' },
];

const Charts = () => {
  const [activeTab, setTab] = useState<string>('charts');
  const [activeCharts, setCharts] = useState<string>('all');

  return (
    <div className="flex flex-1 h-full w-full bg-[#1A1A1A]">
      <div
        className={cn(
          'tab-wrapper',
          'flex flex-col justify-satrt bg-[#0F0F0F] w-[40px] items-center relative',
        )}
      >
        {tabList?.map((tab) => (
          <div
            key={tab.key}
            className={cn(
              'h-[48px] px-[4px] flex justify-center items-center',
              activeTab === tab.key && 'test',
            )}
            onClick={() => setTab(tab.key)}
          >
            <Tooltip title={tab.name} placement="left" color="#4281ff">
              <div className="w-[20px] h-[20px] flex justify-center items-center hover:bg-[#1a1a1a] cursor-pointer">
                <IconFont type={tab.icon} />
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
      <div className="w-[calc(100%-40px)] flex flex-1">
        <div className="flex flex-col py-[12px] ml-[8px] items-center">
          {chartsList?.map((item) => (
            <div
              key={item.key}
              className={cn('w-[50px] my-[10px] text-center rounded-[4px] p-[4px] bg-transparent text-[#7A7A7A] truncate cursor-pointer', activeCharts === item.key && 'bg-[#333] text-[#DBDBDB]')}
              onClick={() => setCharts(item.key)}
            >
              {item.value}
            </div>
          ))}
        </div>

          <ul className="p-[10px]">
            <li className='bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer'>
              <div className='h-[24px] text-[12px] w-full px-[8px] overflow-hidden leading-[24px] text-[#7a7a7a]'>气泡图</div>
              <div className='pt-0 pb-[4px] px-[8px] w-full h-[94px]'><img src={pointImg2} alt="气泡图" className='w-full h-full object-cover cursor-pointer' /></div>
            </li>
          </ul>

      </div>
    </div>
  );
};

export default Charts;
