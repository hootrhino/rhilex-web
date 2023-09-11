import { cn, IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
  chartsList,
  chartsTypeList,
  ComponentTabList,
  mapList,
  mediaList,
  tableList,
  textList,
  widgetList,
} from '../constant';
import type { Data } from './Item';
import ComponentItem from './Item';

import '../index.less';

type ComponentLibraryProps = {
  addNode: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

const ComponentLibrary = ({ addNode }: ComponentLibraryProps) => {
  const [activeTab, setTab] = useState<string>('charts');
  const [activeType, setType] = useState<string>('all');
  const [data, setData] = useState<Data[]>([]);

  const getData = () => {
    let dataSource: Data[] = [];

    switch (activeTab) {
      case 'charts':
        chartsList?.forEach((item) => dataSource.push(...item.children));
        break;
      case 'map':
        dataSource = [...mapList];
        break;
      case 'text':
        dataSource = [...textList];
        break;
      case 'table':
        dataSource = [...tableList];
        break;
      case 'widget':
        dataSource = [...widgetList];
        break;
      case 'media':
        dataSource = [...mediaList];
        break;
      default:
        dataSource = [];
    }

    setData(dataSource);
  };

  useEffect(() => {
    getData();
  }, [activeTab]);

  useEffect(() => {
    if (activeType === 'all') {
      const allCharts: Data[] = [];
      chartsList?.forEach((item) => allCharts.push(...item.children));

      setData(allCharts);
    } else {
      const currentCharts = chartsList?.find((item) => item.group === activeType);
      setData(currentCharts?.children as Data[]);
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
        {ComponentTabList?.map((tab) => (
          <div
            key={tab.key}
            className={cn(
              'h-[48px] px-[4px] flex justify-center items-center',
              activeTab === tab.key && 'active-tab',
            )}
            onClick={() => setTab(tab.key)}
          >
            <Tooltip title={tab.name} placement="left" color="#4281ff">
              <div className="w-[20px] h-[20px] flex justify-center items-center hover:bg-[#1a1a1a] cursor-pointer">
                <IconFont type={activeTab === tab.key ? `${tab.icon}-active` : tab.icon} />
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
      {activeTab === 'charts' ? (
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
            {data?.map((chart) => (
              <ComponentItem
                data={chart}
                key={chart.key}
                onMouseDown={addNode}
                datatype={chart.key}
              />
            ))}
          </ul>
        </div>
      ) : (
        <ul className={cn('charts-wrapper', 'custom-scrollbar', 'p-[18px] w-full')}>
          {data?.map((item) => (
            <ComponentItem data={item} key={item.key} onMouseDown={addNode} datatype={item.key} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComponentLibrary;
