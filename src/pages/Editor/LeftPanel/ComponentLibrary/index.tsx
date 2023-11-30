import { cn } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
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

import { useModel } from '@umijs/max';
import { useHover } from 'ahooks';
import Icon from '../../components/Icon';
import './index.less';
import QuickStyle from './QuickStyleContent';

type ComponentLibraryProps = {
  addNode: (e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>, isDrag: boolean) => void;
};

const ComponentLibrary = ({ addNode }: ComponentLibraryProps) => {
  const ref = useRef(null);
  const { setQuickStyleConfig } = useModel('useEditor');
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

  useHover(ref, {
    onLeave() {
      setQuickStyleConfig({ open: false, title: '' });
    },
  });

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
    <div className="flex flex-1 h-full w-full bg-panelBg">
      <div
        className={cn(
          'left-panel-tab-wrapper',
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
              <div className="w-[20px] h-[20px] flex justify-center items-center hover:bg-panelBg cursor-pointer">
                <Icon selected={activeTab === tab.key} type={tab.icon} />
              </div>
            </Tooltip>
          </div>
        ))}
      </div>

      <div className={cn(activeTab === 'charts' ? 'relative w-full flex flex-1' : 'w-full')}>
        {activeTab === 'charts' && (
          <div className="flex flex-col pb-[12px] pt-[2px] ml-[8px] items-center w-[52px] flex-none">
            {chartsTypeList?.map((item) => (
              <div
                key={item.key}
                className={cn(
                  'w-full my-[10px] text-center rounded-[4px] p-[4px] bg-transparent text-[#7A7A7A] truncate cursor-pointer hover:bg-[#333]',
                  activeType === item.key && 'bg-[#333] text-[#DBDBDB]',
                )}
                onClick={() => setType(item.key)}
              >
                {item.value}
              </div>
            ))}
          </div>
        )}

        <ul
          ref={ref}
          className={cn(
            'h-full overflow-y-auto w-full',
            'editor-scrollbar',
            activeTab === 'charts' ? 'py-[12px] px-[8px]' : 'p-[16px]',
          )}
        >
          {data?.map((chart) => (
            <ComponentItem data={chart} key={chart.key} addNode={addNode} datatype={chart.key} />
          ))}
          <QuickStyle addNode={addNode} />
        </ul>
      </div>
    </div>
  );
};

export default ComponentLibrary;
