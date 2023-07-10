import { cn } from '@/utils/utils';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import BgSetting from './components/BgSetting';

type NodePanelProps = {
  className?: string;
};

const DetailPanel = ({ className }: NodePanelProps) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  return (
    <div
      className={cn(
        className,
        'w-[280px] h-full bg-white absolute top-[40px] bottom-0 transition-all duration-500 border-l-1 border-[#ccc]',
        { 'right-0': collapse, 'right-[-280px]': !collapse },
      )}
    >
      <div
        onClick={() => setCollapse(!collapse)}
        className={cn(
          'flex items-center justify-center absolute w-[24px] h-[24px] bg-white text-[#aaa] hover:text-[#2b84c0] text-center shadow-md top-[18px] border border-[#ccc]',
          {
            'rounded-full left-[-12px]': collapse,
            'rounded-rl-none rounded-bl-[50%] rounded-tl-[50%] rounded-br-none left-[-20px]':
              !collapse,
          },
        )}
      >
        {collapse ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
      <div>
        <div className="flex items-center justify-center h-[40px] shadow-md">
          <span>页面设置</span>
        </div>
        <BgSetting />
      </div>
    </div>
  );
};

export default DetailPanel;
