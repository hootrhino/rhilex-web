import { useEffect, useState } from 'react';
import { mapList, mediaList, tableList, textList, widgetList } from '../constant';
import type { Item } from './Charts';

import { cn, IconFont } from '@/utils/utils';

import '../index.less';
import { Tooltip } from 'antd';

type OthersProps = {
  activeTab: string;
};

const Others = ({ activeTab }: OthersProps) => {
  const [data, setData] = useState<Item[]>([]);

  const getData = () => {
    let dataSource: Item[] = [];

    switch (activeTab) {
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

  return (
    <ul className={cn('charts-wrapper', 'custom-scrollbar', 'p-[18px] w-full')}>
      {data?.map((item) => (
        <li className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer" key={item.key}>
          <div className="h-[24px] text-[12px] w-full px-[8px] overflow-hidden leading-[24px] text-[#7a7a7a]">
            {item.title}
          </div>
          <div className="pt-0 pb-[4px] px-[8px] w-full h-[94px] relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover cursor-pointer"
            />
            {item?.disabled && (
              <span className="bg-black bg-opacity-60 w-full h-full text-center cursor-not-allowed absolute top-0 left-0 flex items-center justify-center">
                <Tooltip title='需要升级才可以使用当前组件包' color="#4281ff" overlayInnerStyle={{fontSize: 10, borderRadius: 4}}><IconFont type="icon-lock" className="text-[16px]" /></Tooltip>
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Others;
