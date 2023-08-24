import { cn, IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { tabList } from '../constant';

import Charts from './Charts';
import Others from './Others';

import '../index.less';

const ComponentLibrary = () => {
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
      {activeTab === 'charts' ? <Charts /> : <Others activeTab={activeTab} />}
    </div>
  );
};

export default ComponentLibrary;
