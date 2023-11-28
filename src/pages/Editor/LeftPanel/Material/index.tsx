import { cn, IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { MaterialData, MaterialTabList } from '../constant';

import './index.less';

const Material = () => {
  const [activeTab, setTab] = useState<string>('temp');

  return (
    <div className="flex flex-1 h-full w-full bg-panelBg">
      <div
        className={cn(
          'left-panel-tab-wrapper',
          'flex flex-col justify-satrt bg-[#0F0F0F] w-[75px] items-center relative',
        )}
      >
        {MaterialTabList?.map((tab) => (
          <div key={tab.key} className="h-[72px] pt-[7px]">
            <div
              className={cn(
                'h-[50px] px-[4px] flex justify-center flex-col items-center hover:bg-panelBg',
                activeTab === tab.key && 'active-tab',
                tab.key === 'temp' ? 'cursor-pointer' : 'cursor-not-allowed',
              )}
              onClick={() => tab.key === 'temp' && setTab(tab.key)}
            >
              <div className="w-[20px] h-[20px] flex justify-center items-center">
                <IconFont type={activeTab === tab.key ? `${tab.icon}-active` : tab.icon} />
              </div>
              <div
                className={cn(
                  'title',
                  'truncate w-[48px] text-center',
                  activeTab === tab.key ? 'text-[#dbdbdb]' : 'text-baseColor',
                )}
              >
                {tab.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeTab === 'temp' && (
        <ul
          className={cn(
            'h-[calc(100%-60px)] overflow-y-auto',
            'editor-scrollbar',
            'p-[12px] w-full',
          )}
        >
          {MaterialData?.map((item) => (
            <li className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer" key={item.key}>
              <div className="pt-0 pb-[4px] w-full h-[115px] relative">
                <img
                  src={item.image}
                  alt="大屏模板"
                  className="w-full h-full object-cover cursor-pointer"
                />
                {item?.disabled && (
                  <span className="bg-black bg-opacity-60 w-full h-full text-center cursor-not-allowed absolute top-0 left-0 flex items-center justify-center">
                    <Tooltip
                      title="需要升级才可以使用当前大屏模板"
                      color="#4281ff"
                      overlayInnerStyle={{ fontSize: 10, borderRadius: 4 }}
                    >
                      <IconFont type="icon-lock" className="text-[16px]" />
                    </Tooltip>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Material;
