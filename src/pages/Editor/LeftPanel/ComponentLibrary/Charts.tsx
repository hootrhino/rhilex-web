import { IconFont, cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { chartsList, chartsTypeList } from '../constant';
import '../index.less';
import { Tooltip } from 'antd';

export type Item = {
  title: string;
  image: any;
  key: string;
  disabled?: boolean;
};

const Charts = ({}) => {
  const [activeType, setType] = useState<string>('all');
  const [charts, setCharts] = useState<Item[]>([]);

  useEffect(() => {
    if (activeType === 'all') {
      const allCharts: Item[] = [];
      chartsList?.forEach((item) => allCharts.push(...item.children));

      setCharts(allCharts);
    } else {
      const currentCharts = chartsList?.find((item) => item.group === activeType);
      setCharts(currentCharts?.children as Item[]);
    }
  }, [activeType]);

  return (
    <div className="w-full flex flex-1">
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

      <ul className={cn('charts-wrapper', 'custom-scrollbar', 'p-[12px]')}>
        {charts?.map((chart) => (
          <li className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer" key={chart.key}>
            <div className="h-[24px] text-[12px] w-full px-[8px] overflow-hidden leading-[24px] text-[#7a7a7a]">
              {chart.title}
            </div>
            <div className="pt-0 pb-[4px] px-[8px] w-full h-[94px] relative">
              <img
                src={chart.image}
                alt={chart.title}
                className="w-full h-full object-cover cursor-pointer"
              />
              {chart?.disabled && (
              <span className="bg-black bg-opacity-60 w-full h-full text-center cursor-not-allowed absolute top-0 left-0 flex items-center justify-center">
                <Tooltip title='需要升级才可以使用当前组件包' color="#4281ff" overlayInnerStyle={{fontSize: 10, borderRadius: 4}}><IconFont type="icon-lock" className="text-[16px]" /></Tooltip>
              </span>
            )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Charts;
