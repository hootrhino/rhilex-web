import { cn, IconFont } from '@/utils/utils';
import type { ReactShapeConfig } from '@antv/x6-react-shape';
import { Tooltip } from 'antd';
import { forwardRef, useEffect, useState } from 'react';
import {
  chartsList,
  chartsTypeList,
  mapList,
  mediaList,
  tableList,
  tabList,
  textList,
  widgetList,
} from '../constant';
import type { Data } from './Item';
import ComponentItem from './Item';

import { isNil } from 'lodash';
import '../index.less';

type ComponentLibraryProps = {
  registerNode: (nodes: ReactShapeConfig[]) => void;
  createNode: () => void;
};

const ComponentLibrary = forwardRef<ComponentLibraryProps, any>(
  ({ registerNode, createNode }, ref) => {
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

    const handleStartDrag = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const dnd = (ref as any)?.current;
      // const target = e.currentTarget;
      const node = createNode();

      dnd.start(node, e.nativeEvent as any);
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

    useEffect(() => {
      const dnd = (ref as any)?.current;

      if (!isNil(dnd)) {
        const nodes = data?.map((item) => ({
          shape: item.key,
          width: 100,
          height: 60,
          component: <ComponentItem data={item} key={item.key} />,
        }));
        registerNode(nodes);
      }
    }, [(ref as any).current]);

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
                <ComponentItem data={chart} key={chart.key} onMouseDown={handleStartDrag} />
              ))}
            </ul>
          </div>
        ) : (
          <ul className={cn('charts-wrapper', 'custom-scrollbar', 'p-[18px] w-full')}>
            {data?.map((item) => (
              <ComponentItem data={item} key={item.key} onMouseDown={handleStartDrag} />
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default ComponentLibrary;
