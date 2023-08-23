import { cn, IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useState } from 'react';
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

const Charts = () => {
  const [activeTab, setTab] = useState<string>('charts');

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
              activeTab === tab.key && 'test'
            )}
            onClick={() => setTab(tab.key)}
          >
            <Tooltip title={tab.name} placement="left" color="#4281ff">
              <div className='w-[20px] h-[20px] flex justify-center items-center hover:bg-[#1a1a1a]'>
              <IconFont type={tab.icon} />
              </div>

            </Tooltip>
          </div>
        ))}
      </div>
      <div className="w-[calc(100%-40px)]">{activeTab}</div>
    </div>
  );
};

export default Charts;
