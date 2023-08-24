import { cn, IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { chartsList, chartsTypeList, tabList } from './constant';

import '../index.less';

type ChartsItem = {
  title: string;
  image: any;
  key: string;
};

const Charts = () => {
  const [activeTab, setTab] = useState<string>('charts');
  const [activeType, setType] = useState<string>('all');
  const [charts, setCharts] = useState<ChartsItem[]>([]);
  // console.log(chartsList, charts);
  useEffect(() => {
    if (activeType === 'all') {
      const allCharts: ChartsItem[] = [];
      chartsList?.forEach((item) => allCharts.push(...item.children));

      setCharts(allCharts);
    } else {
      const currentCharts = chartsList?.find((item) => item.group === activeType);
      setCharts(currentCharts?.children as ChartsItem[]);
    }
  }, [activeType]);

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
          {chartsTypeList?.map((item) => (
            <div
              key={item.key}
              className={cn(
                'w-[50px] my-[10px] text-center rounded-[4px] p-[4px] bg-transparent text-[#7A7A7A] truncate cursor-pointer',
                activeType === item.key && 'bg-[#333] text-[#DBDBDB]',
              )}
              onClick={() => setType(item.key)}
            >
              {item.value}
            </div>
          ))}
        </div>

        <ul className="p-[10px]">
          {charts?.map((chart) => (
            <li className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer" key={chart.key}>
              <div className="h-[24px] text-[12px] w-full px-[8px] overflow-hidden leading-[24px] text-[#7a7a7a]">
                {chart.title}
              </div>
              <div className="pt-0 pb-[4px] px-[8px] w-full h-[94px]">
                <img
                  src={chart.image}
                  alt={chart.title}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Charts;
